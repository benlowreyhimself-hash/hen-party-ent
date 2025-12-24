# Google Services API Access Guide

This guide explains how to enable API access for Google's marketing services. Note that for standard website integration (tracking tags), you typically do **not** need API access—you only need the Container ID (GTM), Measurement ID (GA4), or Conversion ID (Ads). API access is only required for programmatic configuration or automated reporting tools.

## 1. Google Analytics Data API (GA4)

**Purpose**: To programmatically read report data or manage property settings.

1.  **Go to Google Cloud Console**: [https://console.cloud.google.com/](https://console.cloud.google.com/)
2.  **Create a Project**: Select "New Project" and name it (e.g., "Hen Party Analytics").
3.  **Enable API**:
    *   Go to **APIs & Services** > **Library**.
    *   Search for "Google Analytics Data API".
    *   Click **Enable**.
4.  **Create Credentials**:
    *   Go to **APIs & Services** > **Credentials**.
    *   Click **Create Credentials** > **Service Account**.
    *   Fill in details and click **Create**.
    *   Click on the newly created Service Account email.
    *   Go to the **Keys** tab > **Add Key** > **Create new key** > **JSON**.
    *   **Save this file** securely.
5.  **Grant Access**:
    *   Copy the Service Account email address (e.g., `analytics-bot@project-123.iam.gserviceaccount.com`).
    *   Go to [Google Analytics Admin](https://analytics.google.com/analytics/web/#/admin).
    *   Property Settings > **Property Access Management**.
    *   Add the Service Account email as a user with **Viewer** role.

## 2. Google Tag Manager API

**Purpose**: To automatically create tags, triggers, or variables.

1.  **Google Cloud Console**: Open the same project used above.
2.  **Enable API**:
    *   Library > Search for "Google Tag Manager API" > **Enable**.
3.  **Credentials**:
    *   You can reuse the same Service Account from Step 1, or create an OAuth 2.0 Client ID if the application needs to run as *you* (the user).
    *   For automated scripts: Reuse the Service Account.
4.  **Grant Access**:
    *   Go to [Google Tag Manager](https://tagmanager.google.com/).
    *   Admin > **User Management** (Account level or Container level).
    *   Add the Service Account email with **User** permissions (and **Publish** if needed).

## 3. Google Ads API

**Purpose**: To manage campaigns, budgets, or read detailed conversion data programmatically.
*Note: This is the most complex API to access and requires a developer token application.*

1.  **Google Cloud Console**: Open project.
2.  **Enable API**:
    *   Library > Search for "Google Ads API" > **Enable**.
3.  **Developer Token** (Required):
    *   Go to [Google Ads Manager Account](https://ads.google.com/).
    *   Tools & Settings > Setup > **API Center**.
    *   *Note: If you cannot find "API Center" in the menu, type "API Center" or "Google Ads API" into the top search bar of the Google Ads dashboard.*
    *   Apply for a **Basic Access** token. (Pending approval, you can only use it with *test* accounts).
4.  **OAuth Credentials**:
    *   In Cloud Console > Credentials > Create **OAuth 2.0 Client ID**.
    *   You will need to authorize this client to generate a Refresh Token.

---

### **Summary of Identifiers (What specific tools usually need)**

If you are just setting up this website, you likely simply need these IDs, not the full API access above:

*   **Google Analytics 4**: Measurement ID (Format: `G-XXXXXXXXXX`)
*   **Google Tag Manager**: Container ID (Format: `GTM-XXXXXX`)
*   **Google Ads**: Conversion ID (Format: `AW-XXXXXXXXX`)
