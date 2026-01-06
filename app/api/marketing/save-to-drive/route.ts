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

// Get or create folder
async function getOrCreateFolder(drive: any, folderName: string): Promise<string> {
    const searchResponse = await drive.files.list({
        q: `name='${folderName}' and '${MARKETING_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id, name)',
    });

    if (searchResponse.data.files?.length > 0) {
        return searchResponse.data.files[0].id;
    }

    const folder = await drive.files.create({
        requestBody: {
            name: folderName,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [MARKETING_FOLDER_ID],
        },
        fields: 'id',
    });

    return folder.data.id;
}

// Upload file
async function uploadFile(drive: any, folderId: string, fileName: string, mimeType: string, content: Buffer | string) {
    const buffer = typeof content === 'string' ? Buffer.from(content, 'base64') : content;

    // Check if file exists and delete it first
    const existingFiles = await drive.files.list({
        q: `name='${fileName}' and '${folderId}' in parents and trashed=false`,
        fields: 'files(id)',
    });

    for (const file of existingFiles.data.files || []) {
        await drive.files.delete({ fileId: file.id });
    }

    const response = await drive.files.create({
        requestBody: { name: fileName, parents: [folderId] },
        media: { mimeType, body: Readable.from(buffer) },
        fields: 'id, webViewLink',
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
        });

        const contentData: Record<string, any> = {};

        for (const folder of foldersResponse.data.files || []) {
            // Look for content.json in each folder
            const filesResponse = await drive.files.list({
                q: `name='content.json' and '${folder.id}' in parents and trashed=false`,
                fields: 'files(id)',
            });

            if (filesResponse.data.files && filesResponse.data.files.length > 0) {
                const fileId = filesResponse.data.files[0].id as string;
                const fileContent = await drive.files.get({
                    fileId,
                    alt: 'media',
                });

                // Map folder name back to headline
                if (!folder.name) continue;
                const headline = folder.name
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, (c: string) => c.toUpperCase());

                contentData[headline] = fileContent.data;
            }
        }

        return NextResponse.json({ success: true, data: contentData });

    } catch (error: any) {
        console.error('Load from Drive error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// POST - Save marketing content to Drive
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

        const folderId = await getOrCreateFolder(drive, folderName);
        const uploadedFiles: { type: string; link?: string }[] = [];

        // Save JSON metadata (text content without large binaries)
        const contentJson = {
            headline,
            text,
            hasImage: !!imageBase64,
            hasVoice: !!voiceBase64,
            hasVideo: !!videoUri,
            savedAt: new Date().toISOString(),
        };

        await uploadFile(drive, folderId, 'content.json', 'application/json', Buffer.from(JSON.stringify(contentJson, null, 2)));
        uploadedFiles.push({ type: 'metadata' });

        // Upload text content as markdown
        if (text) {
            const textContent = [
                `# ${headline}`,
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

            const textFile = await uploadFile(drive, folderId, 'content.md', 'text/markdown', Buffer.from(textContent));
            uploadedFiles.push({ type: 'text', link: textFile.webViewLink });
        }

        // Upload image
        if (imageBase64) {
            const imageFile = await uploadFile(drive, folderId, 'image.png', 'image/png', imageBase64);
            uploadedFiles.push({ type: 'image', link: imageFile.webViewLink });
        }

        // Upload voice
        if (voiceBase64) {
            const voiceFile = await uploadFile(drive, folderId, 'voiceover.mp3', 'audio/mpeg', voiceBase64);
            uploadedFiles.push({ type: 'voice', link: voiceFile.webViewLink });
        }

        return NextResponse.json({
            success: true,
            folderId,
            folderName,
            uploadedFiles,
            folderLink: `https://drive.google.com/drive/folders/${folderId}`,
        });

    } catch (error: any) {
        console.error('Save to Drive error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
