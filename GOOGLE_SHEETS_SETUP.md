# Google Sheets Integration Setup

## Quick Setup (Easiest: API Key for Public Sheets)

### Step 1: Get Google Sheets API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **API Key**
5. Copy the API key
6. (Optional) Restrict the key to "Google Sheets API" for security

### Step 2: Enable Google Sheets API

1. Go to **APIs & Services** → **Library**
2. Search for "Google Sheets API"
3. Click **Enable**

### Step 3: Make Sheet Public (if using API Key)

1. Open your Google Sheet
2. Click **Share** button (top right)
3. Change access to **"Anyone with the link"** → **Viewer**
4. Copy the link

### Step 4: Add to .env.local

```bash
GOOGLE_SHEETS_API_KEY=your_api_key_here
```

### Step 5: Test Connection

```bash
npm run sheets:import
```

This will:
- List all sheets in the spreadsheet
- Display the first 5 rows
- Show total row count

## Alternative: Service Account (For Private Sheets)

If you want to keep the sheet private:

### Step 1: Create Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials**
3. Click **Create Credentials** → **Service Account**
4. Fill in name and click **Create**
5. Skip role assignment, click **Done**
6. Click on the service account you just created
7. Go to **Keys** tab
8. Click **Add Key** → **Create new key**
9. Choose **JSON** format
10. Download the JSON file

### Step 2: Share Sheet with Service Account

1. Open the JSON file you downloaded
2. Find the `client_email` field (e.g., `your-service@project.iam.gserviceaccount.com`)
3. Open your Google Sheet
4. Click **Share** button
5. Paste the service account email
6. Give it **Viewer** or **Editor** access
7. Click **Send**

### Step 3: Add to .env.local

Copy the entire JSON content and add to `.env.local`:

```bash
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
```

**Note**: Keep this secure! Never commit to git.

## Import Data to Database

Once you can read the sheet, you can import data to your Supabase database:

1. Edit `scripts/import-from-sheets.ts`
2. Uncomment the import section
3. Adjust column mapping based on your sheet structure
4. Run: `npm run sheets:import`

## Your Sheet

**Spreadsheet ID**: `1DG39vTTA52h62Y6Du7MT5v3bGeFeaozgIeJQ01U2y08`

**URL**: https://docs.google.com/spreadsheets/d/1DG39vTTA52h62Y6Du7MT5v3bGeFeaozgIeJQ01U2y08

## Troubleshooting

### "No authentication configured"
- Make sure `GOOGLE_SHEETS_API_KEY` or `GOOGLE_SERVICE_ACCOUNT_KEY` is in `.env.local`

### "Permission denied"
- For API Key: Make sure sheet is public or shared with "Anyone with the link"
- For Service Account: Make sure you shared the sheet with the service account email

### "API not enabled"
- Go to Google Cloud Console → APIs & Services → Library
- Enable "Google Sheets API"

## Security Notes

- ✅ API Key is safe for public sheets (read-only)
- ✅ Service Account is better for private sheets
- ✅ Never commit API keys or service account JSON to git
- ✅ `.env.local` is already in `.gitignore`

