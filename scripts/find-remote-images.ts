import { Client } from 'ssh2';
import fs from 'fs';
import path from 'path';

const config = {
    host: 'pikkon-lon.krystal.uk',
    port: 722,
    username: 'benlowre',
    password: 'q$2Ld4yamUGFFQX',
    readyTimeout: 30000,
};

const conn = new Client();

conn.on('ready', () => {
    console.log('SSH Connection :: READY');

    // Search for images with "glasses" or "ben" in the name
    // limiting to jpg/png and max depth to avoid system files
    const cmd = 'find public_html/wp-content/uploads -type f \\( -iname "*glasses*" -o -iname "*ben*" \\) -a \\( -iname "*.jpg" -o -iname "*.png" -o -iname "*.jpeg" \\)';

    conn.exec(cmd, (err, stream) => {
        if (err) throw err;
        stream.on('close', (code: any, signal: any) => {
            conn.end();
        }).on('data', (data: any) => {
            console.log('STDOUT: ' + data);
        }).stderr.on('data', (data: any) => {
            console.log('STDERR: ' + data);
        });
    });

}).connect(config);
