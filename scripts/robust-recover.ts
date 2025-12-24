
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const IP = "185.194.90.23";
const BRIDGE_URL = `http://${IP}/bridge.php`;
const HOST_HEADER = "benlowrey.com"; // bridge is in public_html

const CPANEL_TOKEN = process.env.CPANEL_API_TOKEN;
const CPANEL_USER = process.env.CPANEL_USERNAME;
const CPANEL_HOST = "https://pikkon-lon.krystal.uk:2083";

const AUTH_HEADER = `cpanel ${CPANEL_USER}:${CPANEL_TOKEN}`;
const LOCAL_BACKUP_DIR = path.resolve(process.cwd(), "legacy-wordpress-backup", "wp-content", "uploads");

if (!fs.existsSync(LOCAL_BACKUP_DIR)) {
    fs.mkdirSync(LOCAL_BACKUP_DIR, { recursive: true });
}

async function listFiles(dir: string, retry = 0): Promise<any[]> {
    const endpoint = `${CPANEL_HOST}/execute/Fileman/list_files?dir=${encodeURIComponent(dir)}`;
    try {
        const tempFile = `.list-${Math.random().toString(36).slice(2)}.json`;
        const cmd = `curl -s -H "Authorization: ${AUTH_HEADER}" "${endpoint}" -o ${tempFile}`;
        execSync(cmd);
        const output = fs.readFileSync(tempFile, 'utf-8');
        fs.unlinkSync(tempFile);
        const json = JSON.parse(output);
        return json.data || [];
    } catch (e: any) {
        if (retry < 2) return listFiles(dir, retry + 1);
        return [];
    }
}

async function downloadFileViaBridge(remoteDir: string, fileName: string) {
    const ext = path.extname(fileName).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;
    if (fileName.match(/-[0-9]+x[0-9]+\.(jpg|jpeg|png|webp)$/)) return;

    // Full remote path relative to account root for bridge
    const fullRemotePath = remoteDir + "/" + fileName;

    // Extract local subpath (e.g. /2022/04)
    const localSubDir = remoteDir.split("wp-content/uploads")[1] || "";
    const localPath = path.join(LOCAL_BACKUP_DIR, localSubDir, fileName);

    const localDir = path.dirname(localPath);
    if (!fs.existsSync(localDir)) fs.mkdirSync(localDir, { recursive: true });

    // CHECK IF GOOD FILE ALREADY EXISTS
    if (fs.existsSync(localPath) && fs.statSync(localPath).size > 1000) {
        const buffer = fs.readFileSync(localPath, { encoding: null });
        const header = buffer.subarray(0, 4).toString('hex');
        if (header.startsWith('ffd8') || header.startsWith('89504e47')) {
            return; // Skip if already good
        }
    }

    console.log(`Downloading (Bridge): ${fullRemotePath} -> ${localPath}`);

    try {
        // Use bridge.php with ?file=...
        const cmd = `curl -s -L -H "Host: ${HOST_HEADER}" "${BRIDGE_URL}?file=${encodeURIComponent(fullRemotePath)}" -o "${localPath}"`;
        execSync(cmd);

        // VERIFY Header
        const buffer = fs.readFileSync(localPath, { encoding: null });
        if (buffer.length < 10) {
            console.error(`  ❌ Error: Empty file returned for ${fullRemotePath}`);
            return;
        }
        const header = buffer.subarray(0, 4).toString('hex');
        if (header.startsWith('ffd8') || header.startsWith('89504e47')) {
            console.log(`  ✅ Success: ${buffer.length} bytes`);
        } else {
            console.error(`  ❌ Error: Invalid Header (${header}) for ${fullRemotePath}`);
        }
    } catch (e: any) {
        console.error(`  ❌ Error downloading ${fileName}:`, e.message);
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
            await downloadFileViaBridge(dir, item.file);
        }
    }
}

(async () => {
    // Crawl all possible uploads locations
    const roots = [
        "public_html/wp-content/uploads",
        "henpartyentertainment.co.uk/wp-content/uploads"
    ];

    for (const root of roots) {
        await crawl(root);
    }
    console.log("Ultimate Bridge Recovery Complete.");
})();
