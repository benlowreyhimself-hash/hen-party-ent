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
const RESCUE_FILE = "rescue.php";

async function run() {
    console.log("1. Uploading rescue script...");

    // cPanel UAPI Fileman::upload_files is complex via curl with multipart/form-data.
    // Easier hack: Use Fileman::save_file_content since it's a text file.

    const content = fs.readFileSync(RESCUE_FILE, 'utf8');
    const endpoint = `${CPANEL_HOST}/execute/Fileman/save_file_content`;

    // We must pass parameters carefully
    // dir: public_html, file: rescue.php, content: ...
    // content needs to be URI encoded fully.

    const body = `dir=public_html&file=rescue.php&content=${encodeURIComponent(content)}`;

    try {
        const cmd = `curl -s -X POST -H "Authorization: ${AUTH_HEADER}" -d "${body}" "${endpoint}"`;
        const output = execSync(cmd).toString();
        // console.log("Upload response:", output);
    } catch (e) {
        console.error("Upload failed");
    }

    console.log("2. Executing rescue script...");
    // We can't "execute" php via API directly unless we use Cron or a web request.
    // Since domain is down, we try temporary URL.
    // URL: http://pikkon-lon.krystal.uk/~benlowre/rescue.php

    try {
        const execCmd = `curl -L "http://pikkon-lon.krystal.uk/~benlowre/rescue.php"`;
        console.log(`Calling: ${execCmd}`);
        const result = execSync(execCmd).toString();
        console.log("Result:", result);

        if (result.includes("Zip Creation: OK")) {
            console.log("3. Downloading Rescue Zip...");
            const zipUrl = "http://pikkon-lon.krystal.uk/~benlowre/ben_rescue.zip";
            const zipDest = path.join(process.cwd(), "legacy-wordpress-backup", "ben_rescue.zip");
            execSync(`curl -L -o "${zipDest}" "${zipUrl}"`);
            console.log(`Saved to ${zipDest}`);
            console.log("Unzipping...");
            execSync(`unzip -o "${zipDest}" -d legacy-wordpress-backup/`);
            console.log("DONE!");
        } else {
            console.log("Rescue script execution didn't return OK. Trying Cron method...");
            // Fallback: Create a cron job to run it, then wait.
        }

    } catch (e) {
        console.error("Execution failed:", e.message);
    }
}

run();
