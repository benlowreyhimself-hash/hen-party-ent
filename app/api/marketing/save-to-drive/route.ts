import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'stream';

// Parent folder for all marketing content
const MARKETING_FOLDER_ID = '1WXBgYqcqQs5yodiaxl0DYSsfFoZ9Sy40';

function getAuth() {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const keyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

    if (!email || !keyRaw) {
        throw new Error('Google service account not configured');
    }

    const key = keyRaw.replace(/\\n/g, '\n');

    return new google.auth.JWT({
        email,
        key,
        scopes: ['https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.readonly'],
    });
}

// Get existing folder or create new one
async function getOrCreateFolder(drive: any, folderName: string, parentId: string): Promise<string> {
    const searchResponse = await drive.files.list({
        q: `name='${folderName}' and '${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id, name)',
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
    });

    if (searchResponse.data.files && searchResponse.data.files.length > 0) {
        return searchResponse.data.files[0].id;
    }

    const folder = await drive.files.create({
        requestBody: {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [parentId],
        },
        fields: 'id',
        supportsAllDrives: true,
    });

    return folder.data.id;
}

// Get next version folder (v2, v3, etc)
async function getNextVersionFolder(drive: any, parentFolderId: string): Promise<{ folderId: string; version: number }> {
    // Check for existing version folders
    const versionsResponse = await drive.files.list({
        q: `'${parentFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and name contains 'v' and trashed=false`,
        fields: 'files(id, name)',
        orderBy: 'name desc',
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
    });

    let maxVersion = 1;
    for (const folder of versionsResponse.data.files || []) {
        const match = folder.name?.match(/^v(\d+)$/);
        if (match) {
            maxVersion = Math.max(maxVersion, parseInt(match[1]));
        }
    }

    // Check if v1 content already exists (files in root of segment folder)
    const rootFilesResponse = await drive.files.list({
        q: `'${parentFolderId}' in parents and mimeType!='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id)',
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
    });

    if (rootFilesResponse.data.files && rootFilesResponse.data.files.length > 0) {
        // Content exists, create next version folder
        const nextVersion = maxVersion + 1;
        const versionFolderId = await getOrCreateFolder(drive, `v${nextVersion}`, parentFolderId);
        return { folderId: versionFolderId, version: nextVersion };
    }

    // No existing content, use root folder (v1)
    return { folderId: parentFolderId, version: 1 };
}

// Upload file
async function uploadFile(drive: any, folderId: string, fileName: string, mimeType: string, content: Buffer | string) {
    const buffer = typeof content === 'string' ? Buffer.from(content, 'base64') : content;

    const response = await drive.files.create({
        requestBody: { name: fileName, parents: [folderId] },
        media: { mimeType, body: Readable.from(buffer) },
        fields: 'id, webViewLink',
        supportsAllDrives: true,
    });

    return response.data;
}

// GET - Load all marketing content from Drive
export async function GET() {
    try {
        const auth = getAuth();
        const drive = google.drive({ version: 'v3', auth });

        // List all folders in marketing folder
        const foldersResponse = await drive.files.list({
            q: `'${MARKETING_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
            fields: 'files(id, name)',
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        });

        const contentData: Record<string, any> = {};

        for (const folder of foldersResponse.data.files || []) {
            if (!folder.name || !folder.id) continue;

            // Look for content.json in the folder (or latest version subfolder)
            let targetFolderId = folder.id;

            // Check for version subfolders, use latest
            const versionsResponse = await drive.files.list({
                q: `'${folder.id}' in parents and mimeType='application/vnd.google-apps.folder' and name contains 'v' and trashed=false`,
                fields: 'files(id, name)',
                orderBy: 'name desc',
                supportsAllDrives: true,
                includeItemsFromAllDrives: true,
            });

            if (versionsResponse.data.files && versionsResponse.data.files.length > 0 && versionsResponse.data.files[0].id) {
                // Use latest version folder
                targetFolderId = versionsResponse.data.files[0].id;
            }

            // Get content.json
            const filesResponse = await drive.files.list({
                q: `name='content.json' and '${targetFolderId}' in parents and trashed=false`,
                fields: 'files(id)',
                supportsAllDrives: true,
                includeItemsFromAllDrives: true,
            });

            if (filesResponse.data.files && filesResponse.data.files.length > 0) {
                const fileId = filesResponse.data.files[0].id as string;
                const fileContent = await drive.files.get({
                    fileId,
                    alt: 'media',
                    supportsAllDrives: true,
                });

                const content = fileContent.data as any;

                // Fetch image if we have a fileId
                let imageBase64 = null;
                if (content.imageFileId) {
                    try {
                        const imageResponse = await drive.files.get({
                            fileId: content.imageFileId,
                            alt: 'media',
                            supportsAllDrives: true,
                        }, { responseType: 'arraybuffer' });
                        imageBase64 = Buffer.from(imageResponse.data as ArrayBuffer).toString('base64');
                    } catch (e) {
                        console.error('Failed to fetch image:', e);
                    }
                }

                // Fetch voice if we have a fileId
                let voiceBase64 = null;
                if (content.voiceFileId) {
                    try {
                        const voiceResponse = await drive.files.get({
                            fileId: content.voiceFileId,
                            alt: 'media',
                            supportsAllDrives: true,
                        }, { responseType: 'arraybuffer' });
                        voiceBase64 = Buffer.from(voiceResponse.data as ArrayBuffer).toString('base64');
                    } catch (e) {
                        console.error('Failed to fetch voice:', e);
                    }
                }

                // Map folder name back to headline
                const headline = folder.name
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, (c: string) => c.toUpperCase());

                contentData[headline] = {
                    ...content,
                    imageBase64,
                    voiceBase64,
                    folderId: folder.id,
                    folderLink: `https://drive.google.com/drive/folders/${folder.id}`,
                };
            }
        }

        return NextResponse.json({ success: true, data: contentData });

    } catch (error: any) {
        console.error('Load from Drive error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// POST - Save marketing content to Drive with versioning
export async function POST(req: NextRequest) {
    try {
        const { headline, text, imageBase64, voiceBase64, videoUri } = await req.json();

        if (!headline) {
            return NextResponse.json({ success: false, error: 'Headline is required' }, { status: 400 });
        }

        const auth = getAuth();
        const drive = google.drive({ version: 'v3', auth });

        // Create folder name from headline
        const folderName = headline
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .slice(0, 50);

        // Get or create the main segment folder
        const segmentFolderId = await getOrCreateFolder(drive, folderName, MARKETING_FOLDER_ID);

        // Get the target folder (root for new, or next version for updates)
        const { folderId: targetFolderId, version } = await getNextVersionFolder(drive, segmentFolderId);

        const uploadedFiles: { type: string; link?: string; fileId?: string }[] = [];
        let imageFileId: string | null = null;
        let voiceFileId: string | null = null;

        // Upload image first to get fileId
        if (imageBase64) {
            const imageFile = await uploadFile(drive, targetFolderId, 'image.png', 'image/png', imageBase64);
            imageFileId = imageFile.id;
            uploadedFiles.push({ type: 'image', link: imageFile.webViewLink, fileId: imageFile.id });
        }

        // Upload voice
        if (voiceBase64) {
            const voiceFile = await uploadFile(drive, targetFolderId, 'voiceover.mp3', 'audio/mpeg', voiceBase64);
            voiceFileId = voiceFile.id;
            uploadedFiles.push({ type: 'voice', link: voiceFile.webViewLink, fileId: voiceFile.id });
        }

        // Save JSON metadata with file IDs
        const contentJson = {
            headline,
            text,
            hasImage: !!imageBase64,
            hasVoice: !!voiceBase64,
            hasVideo: !!videoUri,
            imageFileId,
            voiceFileId,
            version,
            savedAt: new Date().toISOString(),
        };

        await uploadFile(drive, targetFolderId, 'content.json', 'application/json', Buffer.from(JSON.stringify(contentJson, null, 2)));
        uploadedFiles.push({ type: 'metadata' });

        // Upload text content as markdown
        if (text) {
            const textContent = [
                `# ${headline}`,
                version > 1 ? `\n_Version ${version}_\n` : '',
                '',
                '## Caption',
                text.caption || '',
                '',
                '## Hashtags',
                text.hashtags?.join(' ') || '',
                '',
                '## Best Time to Post',
                text.bestTimeToPost || '',
            ].join('\n');

            const textFile = await uploadFile(drive, targetFolderId, 'content.md', 'text/markdown', Buffer.from(textContent));
            uploadedFiles.push({ type: 'text', link: textFile.webViewLink });
        }

        return NextResponse.json({
            success: true,
            folderId: segmentFolderId,
            folderName,
            version,
            uploadedFiles,
            folderLink: `https://drive.google.com/drive/folders/${segmentFolderId}`,
        });

    } catch (error: any) {
        console.error('Save to Drive error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
