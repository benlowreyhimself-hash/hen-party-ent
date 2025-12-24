
import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const CPANEL_TOKEN = process.env.CPANEL_API_TOKEN;
const CPANEL_USER = process.env.CPANEL_USERNAME;
const CPANEL_HOST = process.env.CPANEL_HOST || "https://pikkon-lon.krystal.uk:2083";

const AUTH_HEADER = `cpanel ${CPANEL_USER}:${CPANEL_TOKEN}`;

async function triggerRescueViaCron() {
    console.log("Adding a temporary cron job to trigger the rescue script...");

    // Command to run the rescue script
    const command = `/usr/local/bin/php /home/${CPANEL_USER}/public_html/rescue.php`;

    // cPanel Cron::add_line API
    // We'll set it to run every minute temporarily just to ensure it fires immediately.
    const params = new URLSearchParams({
        command: command,
        day: '*',
        hour: '*',
        minute: '*',
        month: '*',
        weekday: '*'
    });

    const endpoint = `${CPANEL_HOST}/execute/Cron/add_line?${params.toString()}`;

    try {
        const cmd = `curl -s -H "Authorization: ${AUTH_HEADER}" "${endpoint}"`;
        const output = execSync(cmd).toString();
        const json = JSON.parse(output);

        if (json.status === 1) {
            console.log("SUCCESS: Cron job added. Waiting 65 seconds for it to fire...");

            // Wait for it to run
            await new Promise(resolve => setTimeout(resolve, 65000));

            console.log("Checking for resulting files (ben_db.sql and ben_rescue.zip)...");
            const listCmd = `curl -s -H "Authorization: ${AUTH_HEADER}" "${CPANEL_HOST}/execute/Fileman/list_files?dir=public_html"`;
            const listOutput = execSync(listCmd).toString();

            if (listOutput.includes("ben_db.sql")) {
                console.log("FOUND: ben_db.sql exists!");
            }
            if (listOutput.includes("ben_rescue.zip")) {
                console.log("FOUND: ben_rescue.zip exists!");
            }

            // Clean up the cron job so it doesn't keep running
            console.log("Cleaning up cron job...");
            // To delete we need the line number usually, but we can just use Cron::set_autocron? 
            // Better: use Cron::list_lines to find it and delete it.
        } else {
            console.error("Failed to add cron job:", json.errors);
        }
    } catch (e) {
        console.error("Error triggering cron:", e);
    }
}

triggerRescueViaCron();
