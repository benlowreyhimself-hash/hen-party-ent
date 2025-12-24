
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: ".env.local" });

const DB_HOST = 'pikkon-lon.krystal.uk';
const DB_USER = 'benlowre_ben';
const DB_PASS = 'q~D[PZz4_@$u';
const DB_NAME = 'benlowre_benlowrey';

async function testConnection() {
    console.log(`Connecting to ${DB_HOST}...`);
    try {
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASS,
            database: DB_NAME,
            connectTimeout: 10000
        });
        console.log("SUCCESS: Connected to old database!");

        // Let's list tables to confirm
        const [rows] = await connection.execute('SHOW TABLES');
        console.log(`Found ${rows.length} tables.`);

        await connection.end();
    } catch (e: any) {
        console.error("Database connection failed:", e.message);
        if (e.message.includes("ETIMEDOUT") || e.message.includes("ENOTFOUND")) {
            console.log("Likely firewall/port 3306 is blocked. We will need to use a PHP proxy script.");
        }
    }
}

testConnection();
