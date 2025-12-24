import { Client } from 'ssh2';
import fs from 'fs';
import path from 'path';

const config = {
    host: 'pikkon-lon.krystal.uk',
    port: 22,
    username: 'benlowre',
    privateKey: fs.readFileSync("/Users/benlowrey/Documents/app_builds/hen-party-ent/id_rsa_ben"),
    // passphrase: '', // Explicit empty string just in case, though usually undefined works
};

const DB_USER = 'benlowre_ben';
const DB_PASS = "q~D[PZz4_@$u";
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
        stream.on('close', (code, signal) => {
            console.log('Database dump finished with code: ' + code);
            if (code === 0) downloadDatabase();
            else {
                console.error("Database dump failed. Trying download anyway...");
                // downloadDatabase(); // Fail soft?
                conn.end();
            }
        }).on('data', (data) => {
            console.log('STDOUT: ' + data);
        }).stderr.on('data', (data) => {
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
                console.error('SFTP Error (DB):', err);
                // conn.end();
                // return;
            } else {
                console.log('Database saved to:', localPath);
            }
            tarAndDownloadImages(sftp);
        });
    });
}

function tarAndDownloadImages(sftp: any) {
    console.log('Compressing uploads folder (this may take a while)...');

    // NOTE: This assumes 'tar' is available on the server (standard Linux hosting always has it)
    const tarCmd = 'tar -czf uploads_archive.tar.gz public_html/wp-content/uploads/20*';

    conn.exec(tarCmd, (err, stream) => {
        if (err) throw err;
        stream.on('close', (code, signal) => {
            console.log('Compression finished with code: ' + code);
            if (code === 0) {
                const remoteTar = 'uploads_archive.tar.gz';
                const localTar = path.join(LOCAL_BACKUP_DIR, 'uploads_archive.tar.gz');

                console.log('Downloading images archive (large file)...');
                sftp.fastGet(remoteTar, localTar, {
                    step: (total_transferred, chunk, total) => {
                        if (total_transferred % (1024 * 1024 * 10) === 0) {
                            console.log(`Transferred ${Math.round(total_transferred / 1024 / 1024)} MB`);
                        }
                    }
                }, (err: any) => {
                    if (err) console.error('Download Failed:', err);
                    else {
                        console.log('Images Archive Saved to:', localTar);
                        console.log('SUCCESS: All Assets Recovered.');

                        // Clean up
                        conn.exec('rm benlowrey_dump.sql uploads_archive.tar.gz', () => {
                            conn.end();
                        });
                    }
                });
            } else {
                console.error('Compression failed');
                conn.end();
            }
        });
    });
}

conn.on('error', (err) => {
    console.error('SSH Connection Error:', err);
});
