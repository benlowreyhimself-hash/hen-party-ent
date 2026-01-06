# 🚨 Google Cloud Project Consolidation Guide

This guide details exactly how to safely consolidate your keys into the **Ben Lowrey Software** project so you can delete the "Hen Party Ent", "Phantom Finance", and "Soul Link" Google Cloud projects without breaking your apps.

---

## Phase 1: Create New Keys in "Ben Lowrey Software"

1.  Open [Google Cloud Console](https://console.cloud.google.com/).
2.  Switch to the **Ben Lowrey Software** project (`gen-lang-client-0483251061`).
3.  Go to **APIs & Services > Credentials**.
4.  Click **Create Credentials > API Key**.
5.  Create **3 separate API Keys** (recommended for clarity) and name them:
    *   `Master Gemini Key`
    *   `Master Sheets Key`
    *   `Master Search & Maps Key`

*(Note: Ensure you have enabled the "Google Sheets API", "Custom Search API", and "Gemini API" in the "Ben Lowrey Software" project library).*

---

## Phase 2: Update Your Local Projects

You need to replace the old keys (which will disappear when you delete the old projects) with your **New Keys**.

### 1. Hen Party Entertainment
**File:** `/Users/benlowrey/Documents/app_builds/hen-party-ent/.env.local`

*   `GEMINI_API_KEY` → Replace with **New Master Gemini Key**
*   `GOOGLE_SHEETS_API_KEY` → Replace with **New Master Sheets Key**
*   `GOOGLE_CUSTOM_SEARCH_API_KEY` → Replace with **New Master Search Key**

### 2. Phantom Finance
**File:** `/Users/benlowrey/Documents/app_builds/phantom-finance/.env.local`

*   `GEMINI_API_KEY` → Replace with **New Master Gemini Key**
*   `GOOGLE_CUSTOM_SEARCH_API_KEY` → Replace with **New Master Search Key**
*   *(Note: Your Service Account credentials here are already correct and do not need changing).*

### 3. Soul Link
**File:** `/Users/benlowrey/Documents/app_builds/soul-link/.env.local`

*   `GEMINI_API_KEY` → Replace with **New Master Gemini Key**
*   `GOOGLE_CUSTOM_SEARCH_API_KEY` → Replace with **New Master Search Key**

---

## Phase 3: Update Vercel (Production)

Your live websites use copies of these keys hosted on Vercel. You must update them there too.

1.  Go to the [Vercel Dashboard](https://vercel.com/dashboard).
2.  For each project (`hen-party-ent`, `phantom-finance`, `soul-link`):
    *   Go to **Settings > Environment Variables**.
    *   Find the keys listed above (`GEMINI_API_KEY`, etc.).
    *   Edit them and paste the **New Keys**.
3.  **Redeploy** the latest commit for the changes to take effect (or wait for your next push).

---

## Phase 4: Delete Old Projects

**Only proceed after you have updated Vercel and confirmed your apps still work.**

1.  Go to [Google Cloud Console > Manage Resources](https://console.cloud.google.com/cloud-resource-manager).
2.  Select **Hen Party Ent**, **Phantom Finance**, and **Soul Link**.
3.  Click **Delete**.

✅ **Done!** You are now running 100% on "Ben Lowrey Software".
