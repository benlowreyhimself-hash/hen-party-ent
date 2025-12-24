
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const IP = "185.194.90.23";
const HOST_HEADER = "henpartyentertainment.co.uk";
const CPANEL_TOKEN = process.env.CPANEL_API_TOKEN;
const CPANEL_USER = process.env.CPANEL_USERNAME;
const CPANEL_HOST = "https://pikkon-lon.krystal.uk:2083";

const AUTH_HEADER = `cpanel ${CPANEL_USER}:${CPANEL_TOKEN}`;
const LOCAL_BACKUP_DIR = path.resolve(process.cwd(), "legacy-wordpress-backup", "wp-content", "uploads");

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

async function downloadFile(remoteDir: string, fileName: string) {
    const ext = path.extname(fileName).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

    // SMART FILTER: Skip thumbnails (names like image-150x150.jpg)
    if (fileName.match(/-[0-9]+x[0-9]+\.(jpg|jpeg|png|webp)$/)) {
        // console.log(`  Skipping thumbnail: ${fileName}`);
        return;
    }

    const webPath = remoteDir.split("henpartyentertainment.co.uk")[1] + "/" + fileName;
    const localDirSuffix = remoteDir.split("wp-content/uploads")[1] || "";
    const localPath = path.join(LOCAL_BACKUP_DIR, localDirSuffix, fileName);

    const localDir = path.dirname(localPath);
    if (!fs.existsSync(localDir)) fs.mkdirSync(localDir, { recursive: true });

    if (fs.existsSync(localPath) && fs.statSync(localPath).size > 1000) {
        return;
    }

    console.log(`Downloading Original: ${webPath}...`);

    try {
        const cmd = `curl -s -L -H "Host: ${HOST_HEADER}" -o "${localPath}" "http://${IP}${webPath}"`;
        execSync(cmd);
        const size = fs.statSync(localPath).size;
        console.log(`  Success: ${size} bytes`);
    } catch (e: any) {
        console.error(`  Error downloading ${fileName}:`, e.message);
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
    console.log("Starting SMART Original-Only Image Recovery...");
    const baseDir = "henpartyentertainment.co.uk/wp-content/uploads";
    const years = ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];
    for (const year of years) {
        await crawl(`${baseDir}/${year}`);
    }
    console.log("Smart Recovery Complete.");
})();
