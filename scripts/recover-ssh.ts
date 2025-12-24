import { Client } from 'ssh2';
import fs from 'fs';
import path from 'path';

const config = {
    host: 'pikkon-lon.krystal.uk',
    port: 22,
    username: 'benlowre',
    password: 'gS9O5JJEt?{OGqi&', // The password provided by user
};

const DB_USER = 'benlowre_ben';
const DB_PASS = "q~D[PZz4_@$u"; // From wp-config.php
const DB_NAME = 'benlowre_benlowrey';

const LOCAL_BACKUP_DIR = path.resolve(process.cwd(), 'legacy-wordpress-backup');
if (!fs.existsSync(LOCAL_BACKUP_DIR)) fs.mkdirSync(LOCAL_BACKUP_DIR, { recursive: true });

const conn = new Client();

conn.on('ready', () => {
    console.log('SSH Connection :: READY');

    // 1. Dump Database
    const dumpCmd = `mysqldump -u ${DB_USER} -p'${DB_PASS}' ${DB_NAME} > benlowrey_dump.sql`;
    console.log('Running database dump...');

    conn.exec(dumpCmd, (err, stream) => {
        if (err) throw err;
        stream.on('close', (code: any, signal: any) => {
            console.log('Database dump finished with code: ' + code);
            if (code === 0) downloadDatabase();
            else conn.end();
        }).on('data', (data: any) => {
            console.log('STDOUT: ' + data);
        }).stderr.on('data', (data: any) => {
            console.log('STDERR: ' + data);
        });
    });

}).connect(config);

function downloadDatabase() {
    console.log('Downloading database dump...');
    conn.sftp((err, sftp) => {
        if (err) throw err;

        const remotePath = 'benlowrey_dump.sql';
        const localPath = path.join(LOCAL_BACKUP_DIR, 'hen_party_ent_full_backup.sql');

        sftp.fastGet(remotePath, localPath, (err) => {
            if (err) {
                console.error('SFTP Error:', err);
                conn.end();
                return;
            }
            console.log('Database saved to:', localPath);
            tarAndDownloadImages(sftp);
        });
    });
}

function tarAndDownloadImages(sftp: any) {
    console.log('Compressing uploads folder (this may take a while)...');
    // Using tar to compress the uploads folder purely so we can download 1 file
    // Excluding cache/temp files if possible
    const tarCmd = 'tar -czf uploads_archive.tar.gz public_html/wp-content/uploads/20*'; // Get all years 20xx

    conn.exec(tarCmd, (err, stream) => {
        if (err) throw err;
        stream.on('close', (code: any, signal: any) => {
            console.log('Compression finished with code: ' + code);
            if (code === 0) {
                const remoteTar = 'uploads_archive.tar.gz';
                const localTar = path.join(LOCAL_BACKUP_DIR, 'uploads_archive.tar.gz');

                console.log('Downloading images archive (large file)...');
                sftp.fastGet(remoteTar, localTar, {
                    step: (total_transferred: any, chunk: any, total: any) => {
                        // progress bar logic could go here, but logs are fine
                        if (total_transferred % (1024 * 1024 * 10) === 0) { // Log every 10MB
                            console.log(`Transferred ${Math.round(total_transferred / 1024 / 1024)} MB`);
                        }
                    }
                }, (err: any) => {
                    if (err) console.error('Download Failed:', err);
                    else {
                        console.log('Images Archive Saved to:', localTar);
                        console.log('SUCCESS: All Assets Recovered.');

                        // Clean up remote files to be polite
                        conn.exec('rm benlowrey_dump.sql uploads_archive.tar.gz', () => {
                            conn.end();
                        });
                    }
                });
            } else {
                conn.end();
            }
        });
    });
}
