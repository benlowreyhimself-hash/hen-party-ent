
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
const LOCAL_BACKUP_DIR = path.resolve(process.cwd(), 'legacy-wordpress-backup');

async function run() {
    console.log("1. Triggering ZIP via cPanel API...");

    // Command: Fileman::compress_files
    // compress_files(files=[...], destination=..., type=zip)

    const zipPath = "/home/benlowre/public_html/recovered_assets.zip";
    // We want database too if possible, but let's start with uploads + wp-config

    // First, let's just zip wp-content/uploads
    // We need to pass arguments.
    // UAPI is tricky with arrays in GET/POST.
    // curl -G ... --data-urlencode "files=public_html/wp-content/uploads" ...

    try {
        const zipCmd = `curl -s -X POST -H "Authorization: ${AUTH_HEADER}" ` +
            `--data-urlencode "files=public_html/wp-content/uploads" ` +
            `--data-urlencode "destination=${zipPath}" ` +
            `--data-urlencode "type=zip" ` +
            `"${CPANEL_HOST}/execute/Fileman/compress_files"`;

        console.log("Running compression...");
        const output = execSync(zipCmd).toString();
        const json = JSON.parse(output);

        if (json.status === 1) {
            console.log("Compression Success:", json.messages);
        } else {
            console.error("Compression Failed:", json.errors);
            // It might fail if file exists, let's assume it might exist or continue
        }
    } catch (e) {
        console.error("Zip error:", (e as any).message);
    }

    console.log("2. Downloading ZIP via HTTP fallback...");
    // Since temporary URL failed, we try to use the 'Fileman::download_files' API?
    // No, that usually requires session.

    // TRICK: We will try to copy the ZIP to a name that we can access, 
    // OR we will use a "Chunked Read" via API.
    // UAPI has 'Fileman::get_file_content'. 
    // For a 1GB zip, this will crash V8 if we try to load it all in string.

    // Let's try to verify it exists first.
    const listCmd = `curl -s -H "Authorization: ${AUTH_HEADER}" "${CPANEL_HOST}/execute/Fileman/list_files?dir=public_html"`;
    const listOut = execSync(listCmd).toString();
    if (listOut.includes("recovered_assets.zip")) {
        console.log("confirmed: recovered_assets.zip exists on server.");

        // Final Attempt at Download:
        // Use a PHP script (upload it again) that chunks the file out?
        // Yes. `download.php`

        const downloadPhp = `<?php
            $file = '/home/benlowre/public_html/recovered_assets.zip';
            if (file_exists($file)) {
                header('Content-Description: File Transfer');
                header('Content-Type: application/zip');
                header('Content-Disposition: attachment; filename="'.basename($file).'"');
                header('Expires: 0');
                header('Cache-Control: must-revalidate');
                header('Pragma: public');
                header('Content-Length: ' . filesize($file));
                readfile($file);
                exit;
            } else {
                echo "File not found";
            }
        ?>`;

        fs.writeFileSync("download_proxy.php", downloadPhp);

        // Upload download_proxy.php
        const uploadBody = `dir=public_html&file=download_proxy.php&content=${encodeURIComponent(downloadPhp)}`;
        execSync(`curl -s -X POST -H "Authorization: ${AUTH_HEADER}" -d "${uploadBody}" "${CPANEL_HOST}/execute/Fileman/save_file_content"`);

        console.log("3. Downloading via Proxy Script...");
        const dest = path.join(LOCAL_BACKUP_DIR, "recovered_assets.zip");

        // We call the php file via the TEMP URL.
        // Wait, temp URL failed (404). This means ~benlowre is disabled.
        // We need to call the PHP file via... CLI?
        // No, we can call it via API 'execute/Fileman/list_files' ?? No.

        // What if we use the API to run a PERL/Python script that cat's the file?
        // `execute/ExternalAuth/...` no.

        // OK, we must fix SSH. It's the only stable way for large files without HTTP.

    } else {
        console.error("Zip creation failed silently?");
    }
}

run();
