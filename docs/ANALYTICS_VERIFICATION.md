# Google Analytics Verification Setup

To verify that your data is being received programmatically, we need to set up a **Service Account** with Google and give it access to your Analytics data.

## Step 1: Create a Service Account (If you haven't already for Sheets)

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/iam-admin/serviceaccounts).
2.  Select your project (or create a new one).
3.  Click **+ CREATE SERVICE ACCOUNT**.
    *   **Name**: `analytics-verifier`
    *   **ID**: `analytics-verifier`
    *   Click **Done**.
4.  Click on the newly created email address (e.g., `analytics-verifier@your-project.iam.gserviceaccount.com`).
5.  Go to the **Keys** tab.
6.  Click **Add Key** > **Create new key** > **JSON**.
7.  A file will download. Open it.

## Step 2: Enable the API
1.  Go to [APIs & Services > Library](https://console.cloud.google.com/apis/library).
2.  Search for **Google Analytics Data API**.
3.  Click **Enable**.

## Step 3: Configure Environment Variables
Open your `.env.local` file and add the following values from the JSON key file you downloaded:

```env
# The 'client_email' field from the JSON file
GOOGLE_SERVICE_ACCOUNT_EMAIL=analytics-verifier@your-project.iam.gserviceaccount.com

# The 'private_key' field from the JSON file
# IMPORTANT: Must be enclosed in quotes and keep the \n characters
GOOGLE_SERVICE_ACCOUNT_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCJKInit..."

# Your Google Analytics 4 Property ID
# Found in: Analytics Admin > Property Settings > Property Details (numeric ID)
GA_PROPERTY_ID=123456789
```

> **Note on Client-Side Tracking**: 
> To enable direct GA4 tracking (in addition to GTM), add your G- ID:
> `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX`

## Step 4: Grant Access
1.  Copy the `GOOGLE_SERVICE_ACCOUNT_EMAIL` address.
2.  Go to [Google Analytics Admin](https://analytics.google.com/analytics/web/#/admin).
3.  Select your property.
4.  Click **Property Access Management**.
5.  Click **+** (Top right) > **Add users**.
6.  Paste the email address.
7.  Select the **Viewer** role.
8.  Click **Add**.

## Step 5: Run the Verification Script
Once the variables are in `.env.local`, run:

```bash
npx tsx scripts/verify-analytics.ts
```

This will connect to Google and show you the active users in the last 30 minutes.
