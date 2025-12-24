import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import https from "https";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const CPANEL_TOKEN = process.env.CPANEL_API_TOKEN;
const CPANEL_USER = process.env.CPANEL_USERNAME;
const CPANEL_HOST = process.env.CPANEL_HOST || "https://pikkon-lon.krystal.uk:2083";

if (!CPANEL_TOKEN || !CPANEL_USER) {
    console.error("Missing CPANEL_API_TOKEN or CPANEL_USERNAME in .env.local");
    process.exit(1);
}

const AUTH_HEADER = `cpanel ${CPANEL_USER}:${CPANEL_TOKEN}`;
const LOCAL_BACKUP_DIR = path.resolve(process.cwd(), "legacy-wordpress-backup");

// Ensure backup dir exists
if (!fs.existsSync(LOCAL_BACKUP_DIR)) {
    fs.mkdirSync(LOCAL_BACKUP_DIR, { recursive: true });
}

async function listFiles(dir: string) {
    console.log(`Listing files in: ${dir}`);
    const endpoint = `${CPANEL_HOST}/execute/Fileman/list_files?dir=${encodeURIComponent(dir)}`;
    try {
        const cmd = `curl -s -H "Authorization: ${AUTH_HEADER}" "${endpoint}"`;
        const output = execSync(cmd).toString();
        const json = JSON.parse(output);

        if (json.errors && json.errors.length > 0) {
            console.error(`Error listing ${dir}:`, json.errors);
            return [];
        }
        return json.data || [];
    } catch (error: any) {
        console.error(`Exception listing ${dir}:`, error.message);
        return [];
    }
}

async function downloadFile(remotePath: string, localPath: string) {
    console.log(`Downloading: ${remotePath} -> ${localPath}`);

    // cPanel API doesn't have a direct "download file" endpoint for unauthorized access easily,
    // but we can try to use the 'Fileman/download' or a public URL if it's in public_html.
    // HOWEVER, 'Fileman/download' is tricky via API.
    // A better approach often is to use the 'Fileman/get_file_content' for small files (like wp-config.php)
    // OR rely on public URL for images if the file permissions allow.

    // Strategy:
    // 1. If it's in public_html, try downloading via public URL first (fastest).
    // 2. If valid (checking status code), keep it.
    // 3. Fallback to API content retrieval (safe for wp-config.php).

    // Let's try the public URL approach for images first.
    let publicUrl = "";
    if (remotePath.startsWith("public_html/")) {
        publicUrl = `https://henpartyentertainment.co.uk/${remotePath.replace("public_html/", "")}`;
    } else if (remotePath.includes("/public_html/")) {
        const relative = remotePath.split("/public_html/")[1];
        publicUrl = `https://henpartyentertainment.co.uk/${relative}`;
    }

    // Ensure directory exists
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    if (publicUrl && !remotePath.includes("wp-config.php")) {
        return new Promise<void>((resolve) => {
            const file = fs.createWriteStream(localPath);
            https.get(publicUrl, (response) => {
                if (response.statusCode === 200) {
                    response.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        resolve();
                    });
                } else {
                    console.log(`Public download failed (${response.statusCode}), trying API workaround...`);
                    file.close();
                    fs.unlinkSync(localPath); // delete empty file
                    resolve(downloadViaApi(remotePath, localPath));
                }
            }).on('error', (err) => {
                console.error(`Network error: ${err.message}`);
                resolve(downloadViaApi(remotePath, localPath));
            });
        });
    } else {
        return downloadViaApi(remotePath, localPath);
    }
}

async function downloadViaApi(remotePath: string, localPath: string) {
    // There is no clean "download" endpoint that returns a stream in UAPI easily without session.
    // We will use a trick: `Fileman::get_file_content` returns content in JSON.
    // Ideally only for text files. For binary, this might corrupt.
    // 
    // ALTERNATIVE: Use `curl` to POST to `/execute/Fileman/download_files`? No, that returns a zip.
    // 
    // SAFEST API METHOD FOR BINARY:
    // UAPI Fileman::list_files is what we have.
    // Actually, cPanel API doesn't expose a simple "GET /path/to/file" for binary files easily.
    // 
    // Let's try to grab `wp-config.php` specifically using get_file_content (since it is text).

    if (remotePath.endsWith(".php") || remotePath.endsWith(".txt") || remotePath.endsWith(".html")) {
        console.log(`Fetching text content via API: ${remotePath}`);
        const endpoint = `${CPANEL_HOST}/execute/Fileman/get_file_content?dir=${encodeURIComponent(path.dirname(remotePath))}&file=${encodeURIComponent(path.basename(remotePath))}`;
        try {
            // We need to properly encode the path logic.
            // The API expects 'dir' (relative to home) and 'file'.
            // remotePath usually comes as full path /home/user/... or relative.
            // We need to parse it. 

            // Check if remotePath is absolute
            let dirParam = path.dirname(remotePath);
            let fileParam = path.basename(remotePath);

            // Remove /home/user/ prefix if present to make it relative for safety if needed, 
            // but usually full path is fine or relative to home.
            // The API docs say: "The directory that contains the file... relative to the user's home directory."

            if (dirParam.startsWith("/home/" + CPANEL_USER)) {
                dirParam = dirParam.replace("/home/" + CPANEL_USER + "/", "");
            }
            if (dirParam.startsWith("/home/" + CPANEL_USER)) { // Exact match of home dir
                dirParam = "";
            }

            const cmd = `curl -s -H "Authorization: ${AUTH_HEADER}" "${CPANEL_HOST}/execute/Fileman/get_file_content?dir=${encodeURIComponent(dirParam)}&file=${encodeURIComponent(fileParam)}"`;
            const output = execSync(cmd).toString();
            const json = JSON.parse(output);

            if (json.status === 1 && json.data) {
                fs.writeFileSync(localPath, json.data.content);
                console.log("Saved.");
            } else {
                console.error("Failed to get content:", json.errors);
            }

        } catch (e: any) {
            console.error("API download error:", e.message);
        }
    } else {
        console.warn(`Skipping binary file API download for now: ${remotePath}`);
    }
}

async function processDirectory(relativePath: string) {
    // relativePath is relative to user home, e.g., "public_html/wp-content/uploads"
    const fullRemotePath = `/home/${CPANEL_USER}/${relativePath}`; // Approximate
    // Actually, list_files 'dir' param can be relative.

    const items = await listFiles(relativePath);

    for (const item of items) {
        if (item.type === "dir") {
            if (item.file === "." || item.file === "..") continue;
            // Recursive
            const nextDir = path.join(relativePath, item.file);
            await processDirectory(nextDir);
        } else if (item.type === "file") {
            // Only interest in verifying we can see files.
            // We specifically want images from uploads.
            if (relativePath.includes("uploads") || item.file === "wp-config.php") {
                const localFilePath = path.join(LOCAL_BACKUP_DIR, relativePath.replace("public_html/", ""), item.file);
                await downloadFile(path.join(relativePath, item.file), localFilePath);
            }
        }
    }
}

// MAIN EXECUTION
(async () => {
    console.log("Starting Recovery...");

    // 1. Recover wp-config.php (Critical for DB password)
    // It sits in public_html usually.
    await downloadFile("public_html/wp-config.php", path.join(LOCAL_BACKUP_DIR, "wp-config.php"));

    // 2. Recover Uploads (2018, 2019, 2020 are usually key years)
    // We will list the uploads directory.
    console.log("Scanning uploads...");
    // We'll target public_html/wp-content/uploads
    // Due to time, let's just list the root of uploads and then pick a recent year to test.
    await processDirectory("public_html/wp-content/uploads/2020");
    await processDirectory("public_html/wp-content/uploads/2021");
    // You can add more years here.

    console.log("Done.");
})();
