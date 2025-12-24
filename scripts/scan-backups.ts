import { execSync } from "child_process";
import fs from "fs";
import path from "path";
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

async function listFiles(dir: string) {
    // console.log(`Listing files in: ${dir}`);
    const endpoint = `${CPANEL_HOST}/execute/Fileman/list_files?dir=${encodeURIComponent(dir)}`;
    try {
        const cmd = `curl -s -H "Authorization: ${AUTH_HEADER}" "${endpoint}"`;
        const output = execSync(cmd).toString();
        const json = JSON.parse(output);

        if (json.errors && json.errors.length > 0) {
            // consoles.error(`Error listing ${dir}:`, json.errors);
            return [];
        }
        return json.data || [];
    } catch (error: any) {
        // console.error(`Exception listing ${dir}:`, error.message);
        return [];
    }
}

async function searchForBackups(startDir: string) {
    console.log(`Scanning ${startDir} for backup files (.zip, .sql, .wpress, .gz)...`);
    const items = await listFiles(startDir);

    for (const item of items) {
        if (item.type === "file") {
            if (item.file.match(/\.(zip|sql|wpress|gz|tar)$/i)) {
                console.log(`[FOUND BACKUP] ${item.fullpath} (${(item.size / 1024 / 1024).toFixed(2)} MB)`);
            }
        } else if (item.type === "dir") {
            if (["wp-content", "ai1wm-backups", "backups", "updraft"].includes(item.file)) {
                await searchForBackups(path.join(startDir, item.file));
            }
        }
    }
}

(async () => {
    // Check root, public_html, and common backup locations
    await searchForBackups("public_html/wp-content");
    await searchForBackups("backups");
    await searchForBackups("public_html");
})();
