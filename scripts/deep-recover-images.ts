
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const CPANEL_TOKEN = process.env.CPANEL_API_TOKEN;
const CPANEL_USER = process.env.CPANEL_USERNAME;
const CPANEL_HOST = process.env.CPANEL_HOST || "https://pikkon-lon.krystal.uk:2083";

if (!CPANEL_TOKEN || !CPANEL_USER) process.exit(1);

const AUTH_HEADER = `cpanel ${CPANEL_USER}:${CPANEL_TOKEN}`;
const LOCAL_BACKUP_DIR = path.resolve(process.cwd(), "legacy-wordpress-backup", "wp-content", "uploads");

// Ensure backup dir exists
if (!fs.existsSync(LOCAL_BACKUP_DIR)) {
    fs.mkdirSync(LOCAL_BACKUP_DIR, { recursive: true });
}

async function listFiles(dir: string): Promise<any[]> {
    const endpoint = `${CPANEL_HOST}/execute/Fileman/list_files?dir=${encodeURIComponent(dir)}`;
    try {
        const cmd = `curl -s -H "Authorization: ${AUTH_HEADER}" "${endpoint}"`;
        const output = execSync(cmd).toString();
        const json = JSON.parse(output);
        return json.data || [];
    } catch (e) {
        return [];
    }
}

function decodeCpanelContent(content: string): Buffer {
    // cPanel returns binary as a string where each byte is either a literal char OR \uXXXX
    // Actually, JSON.parse already handles the \uXXXX decoding into a JS string.
    // We just need to convert that JS string into a Buffer using 'binary' or manual charCode mapping.
    return Buffer.from(content, 'binary');
}

async function downloadFile(remoteDir: string, fileName: string) {
    const ext = path.extname(fileName).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.gif', '.ico', '.webp'].includes(ext)) return;

    const localPath = path.join(LOCAL_BACKUP_DIR, remoteDir.replace("public_html/wp-content/uploads", ""), fileName);
    const localDir = path.dirname(localPath);
    if (!fs.existsSync(localDir)) fs.mkdirSync(localDir, { recursive: true });

    if (fs.existsSync(localPath) && fs.statSync(localPath).size > 1000) {
        console.log(`Skipping existing: ${fileName}`);
        return;
    }

    console.log(`Fetching: ${fileName}...`);
    const endpoint = `${CPANEL_HOST}/execute/Fileman/get_file_content?dir=${encodeURIComponent(remoteDir)}&file=${encodeURIComponent(fileName)}`;

    try {
        const cmd = `curl -s -H "Authorization: ${AUTH_HEADER}" "${endpoint}"`;
        const output = execSync(cmd).toString();
        const json = JSON.parse(output);

        if (json.status === 1 && json.data && json.data.content) {
            // The magic: JSON.parse has turned \u0000 into actual JS string characters.
            // We convert that string to a Buffer using 'binary' encoding which maps 0-255 characters.
            const buffer = Buffer.from(json.data.content, 'binary');
            fs.writeFileSync(localPath, buffer);
            console.log(`Saved ${fileName} (${buffer.length} bytes)`);
        } else {
            console.error(`Failed to fetch ${fileName}:`, json.errors);
        }
    } catch (e: any) {
        console.error(`Error fetching ${fileName}:`, e.message);
    }
}

async function crawl(dir: string) {
    console.log(`Scanning: ${dir}`);
    const items = await listFiles(dir);
    for (const item of items) {
        if (item.type === 'dir') {
            if (item.file === '.' || item.file === '..') continue;
            await crawl(path.join(dir, item.file));
        } else if (item.type === 'file') {
            await downloadFile(dir, item.file);
        }
    }
}

(async () => {
    console.log("Starting Deep Asset Recovery...");
    // We'll target the main uploads years
    const years = ['2018', '2019', '2020', '2021', '2022'];
    for (const year of years) {
        await crawl(`public_html/wp-content/uploads/${year}`);
    }
    console.log("Deep Recovery Complete.");
})();
