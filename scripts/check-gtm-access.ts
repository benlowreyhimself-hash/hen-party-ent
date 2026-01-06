import { google } from 'googleapis';

const KEY = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC797JUFOzGKVlO
GIgLgdIzzrkgZh/sH6KsTZUS572jur8uC2uC9ghOEInkbSjlHN6Coq99xPVOfjKu
HWR6Pg/3CWdtkdLt6pmHbD4prGSDKxbTUL8dAOjBI2cgW959uAaawEGKuHMf+oe8
1gzDUgLE36ThQYwama5Sqo5UdOgNHPIIcSIzQ5lPWXqc4/xLRBwypv+OloTiwx/h
XGkydQ26y09fsVPZ6spU/YfJLBM4FE1nFxP75JjiB+n7KaDob01XoLmn3Cva5K7e
riScsu02VNuHLWxxDL590s70Dg/kfLSd6jmOSlb1hVixYLs0Qnl5ti56Jv70FVRD
u51e3UGZAgMBAAECggEALyuhYm1f3/jXcvxAA9c/54Vsut82Cp0Dx0au7vAeDJ0c
RhNSlypj+ic3W44zUY/VnSXzcVYAk4Ki+EPjB7RUcFO5U2thahhSEASPcwjSroId
N8mPNFmaj4Fxa1Lyukz4x1QQ/p18Mp29+5sh19BYZoyTRX4cCT7g2tj3X+V4qHVY
9zW6ierCp5O5PhH2ABYMvBfMcycFP0MSkONj+EWkOZ+s6vMgxSIa/6Raat3Iv2Zx
uk6KLA6NHhoWS/bhcpa7w8b3Hq09IEnh1y9ASf0wtEkLxyDsOmzLs5obMSAKdHOh
bbifB+hPZWp1DbliZLrQm0cvZ4tdV0Ve1qkgY3zlawKBgQDycgIJtYVAsEibCfxO
uSp32b9gOyyXuyF8AeFW8rqtTxk7x+gFbiDSOiDcueoN+utg3uLEYCdtzcO10qWN
OPnbFdiA5hvNEamCApqpTvoRvGiwyTmcqPLjeuvjfADVEokUaGMNR2GZnM5iByNH
RQbvKNZO2fSq6s+EOUGx6L67cwKBgQDGefobvfxpuQQE2VQXaowRUepQhpAYSGJg
V5X0kBF5YEOjRvgL5bVnqO6FYytFACe7L2P5Jcl2YB9OmH4D9PDeUDc0yQ/MAnVB
n4g9YznwpVjCcRwNDt6mUsOysJMZxEKngv1T4h3OTz7MIwu6BlQm742/GQs8q4x+
k+fZ6M1jwwKBgG0oPZinfLZyaE49wbakEeXiSRMHsX0jSOEva4idQsVzHpZW3DVN
r0NX3qHipunidoWn9IucC0SZ5yr/C4C5DW3BuTfX4t6CvEIH8CCYqWjA3pXyE5lg
S/N1za0fkLReYw+oLCi3Yc8q1ZU3R3/4KTYWud7IrSsjC4mpydVTSETXAoGAWyUI
xlSo5aQhRFjJVTeIuyty/yfMZFpZUwTlyDmgzKx4YzLkFhKXC9N4Nakk5br8g+lv
b6r6qXHa7qz4sbh6JJ2RvJvYtUcrscchOY+nu+syp5hp2VVKyfaYCCcuZlbKhUKS
M0NTjLq3i+dMK1Fcs8Suw2Ms1d+x1S72+gr+xyECgYB7kiGmsQJkO9WU5an9Ht7x
tP0GoPEjyjf8It+/5OgmVhonj1HKAdi+cV15DFjBsgFf37hZrGOEVSnTffLYd3w+
2SwEvp5+RRFuEoKmi5pANoSai7LT1JyMWKZiHz+NUYhL0IJHU4s/fwLVtvfjiVs7
8/x+rQxfIXie2hfbxd9JbA==
-----END PRIVATE KEY-----
`;

const EMAIL = 'generic-service-account-for-mu@gen-lang-client-0483251061.iam.gserviceaccount.com';

async function main() {
    console.log('Authenticating with GTM...');
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: EMAIL,
            private_key: KEY,
        },
        scopes: ['https://www.googleapis.com/auth/tagmanager.edit.containers'],
    });

    const tagmanager = google.tagmanager({
        version: 'v2',
        auth,
    });

    try {
        console.log('Listing GTM Accounts...');
        const accountsRes = await tagmanager.accounts.list();
        const accounts = accountsRes.data.account || [];

        console.log(`Found ${accounts.length} GTM accounts accessible.`);

        for (const account of accounts) {
            console.log(`\nAccount: ${account.name} (ID: ${account.accountId})`);

            const containersRes = await tagmanager.accounts.containers.list({
                parent: account.path || undefined
            });
            const containers = containersRes.data.container || [];

            if (containers.length === 0) {
                console.log('  No containers found.');
            } else {
                containers.forEach(c => {
                    console.log(`  - Container: ${c.name} | ID: ${c.publicId} | Path: ${c.path}`);
                });
            }
        }
    } catch (err: any) {
        console.error('Error accessing GTM:', err.message);
        if (err.message && err.message.includes('403')) {
            console.log('\n❌ Service Account does NOT have access to Google Tag Manager.');
            console.log('Please add this email to GTM Admin > Account Settings > User Management:');
            console.log(EMAIL);
        }
    }
}

main().catch(console.error);
