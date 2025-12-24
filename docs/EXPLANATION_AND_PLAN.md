# Project Status Explanation

## 1. Why are there only ~100 accommodations instead of 800?

**Current Count: 121 Accommodations**

The import script (`scripts/import-accommodations.ts`) uses strict logic to ensure data quality. It likely skipped many rows or entire sheets for the following reasons:

1.  **Missing "Full Address" Column**: The script looks specifically for a column header containing "Full address" (case-insensitive). If a sheet uses "Address" or "Venue Address", it is **skipped entirely**.
2.  **Missing/Short Data**: Rows where the address is empty or shorter than 5 characters are skipped.
3.  **Deduplication**: If multiple rows have the same address (after lowercasing and trimming), they are merged into a single accommodation record (to capture multiple visit dates).

**Next Step to Fix**: I will adjust the script to be more flexible, accepting "Address", "Venue", or "Location" as valid address columns. This should recover the missing ~700 entries.

## 2. The "Ben with Glasses" Photo

**The Problem**: 
- I incorrectly used the low-quality screenshot you provided as the actual image.
- Since the live site (`henpartyentertainment.co.uk`) is now running the *new* code, I cannot find the "old" image there anymore.
- The original high-quality image exists in your Supabase Storage (in the `hen-party-media` bucket), likely named `IMG_xxxx.jpg` or similar, buried among 4,000+ other files.

**Next Step to Fix**:
- I cannot visual identify the photo.
- I will create a temporary "Image Browser" page in your Admin area (`/admin/images`) that displays all `IMG_*.jpg` files from storage.
- You can browse this page, find the correct photo, and click "Select". This will rename it to `ben-with-glasses-final.jpg` and update the homepage automatically.

## 3. Supabase Cleanup

**The Problem**:
- There are thousands of unused images in your storage bucket.
- My previous "cleanup" tasks were only about organizing, not deleting, which was misleading.

**Next Step to Fix**:
- Once we identify the correct "Ben" photo and ensure all accommodations have their correct images, I will run a script to **DELETE** any file in `originals/` that is not referenced in the `houses` table or the website code.
