# ⚠️ OUTDATED - See MASTER_PLAN.md

**This file is outdated. Please refer to `MASTER_PLAN.md` for the current, comprehensive plan and progress summary.**

---

# Complete Implementation Plan Summary (ARCHIVED)

## Overview
This plan covers:
1. **AI-Powered Property Enrichment System** - Automated crawling, photo extraction, contact discovery
2. **Enhanced Contact Form System** - Multiple contact options with tracking
3. **Admin Panel Improvements** - Inline editing, batch operations
4. **Homepage Recreation** - Complete audit and rebuild with all original content
5. **SEO & Public Pages** - Region grouping, service promotion, static generation

**Note:** Many features from this plan have been completed or modified. See `MASTER_PLAN.md` for current status.

---

## Part 1: AI-Powered Property Enrichment

### What It Does
- Automatically crawls booking platforms (Airbnb, Booking.com, VRBO)
- Extracts property photos, descriptions, contact info
- Uses Gemini AI to structure and enrich data
- Refreshes/recrawls data to keep it current
- Preserves manual edits during refresh

### Key Features
- Multi-platform crawler (Airbnb, Booking.com, VRBO, generic websites)
- Photo extraction and management (selects best 3 photos)
- Contact information discovery
- AI-powered content generation
- Refresh system with change detection
- Batch processing for multiple properties

### New Database Fields
- `contact_phone`, `contact_email`, `contact_website`
- `booking_platforms` (JSONB array)
- `pricing_info`, `amenities`, `reviews_count`, `rating`
- `last_crawled_at`, `crawl_status`, `crawl_error`
- `photos_raw`, `photos_selected` (JSONB)

---

## Part 2: Contact Form System

### Contact Method Options (3 Ways to Contact)

#### Option 1: Call Now (07747571426)
- Shows phone number prominently
- Modal appears: "Would you like us to text/email you a template?"
- Sub-options:
  - **Text me a template** → Collects phone, sends SMS with fillable form
  - **Email me a template** → Collects email, sends email with fillable form
  - **I'll just call** → Tracks call intent, shows phone number
- All interactions tracked in GTM

#### Option 2: Email Directly
- Opens mailto: link with pre-filled subject
- Tracks email click in GTM

#### Option 3: Fill Out Form
- Full booking form with all Master sheet fields
- All fields below

### Full Form Fields (Matching Master Sheet)
1. Name
2. Email (required)
3. Phone number (optional)
4. Relation (dropdown: Sister's, Friend's, etc.)
5. Occasion (dropdown: Hen Party, Hen Do, 50th Birthday, etc.)
6. Region (dropdown: from database)
7. Group Size (number)
8. Duration (60 mins, 90 mins, TBC)
9. Start Time (text: "3:30pm", "Afternoon")
10. Event Date (date picker)
11. Enquiry Date (auto-filled)
12. Venue (text: "AirBnB", "Own House", etc.)
13. Full Address (textarea)
14. Source (hidden: "Website Contact Form")
15. Method (hidden: "email", "phone", or "form")
16. Message/Notes (textarea)

### Email & SMS System
- Email sent to: ben@henpartyentertainment.co.uk
- SMS template (if requested) - concise, fillable format
- Email template - matches Google Sheets structure for easy copy-paste
- Both templates include all booking fields

### Google Ads Conversion Tracking
- Conversion ID: `971873050`
- Conversion Label: `-I6MCM2UwLsBEJq2ts8D`
- Tracks: form submissions, call clicks, email clicks, template requests

---

## Part 3: Admin Panel Enhancements

### Clerk Authentication
- Discreet login button in Header (top-right)
- UserButton when authenticated
- Sign In link when not authenticated

### Inline Editing
- Edit all fields directly in the table
- No page reloads
- Visual feedback for unsaved changes
- Batch save button (saves all changes at once)
- Delete with confirmation

### Enrichment Controls
- "Enrich" button per property
- "Refresh" button for enriched properties
- Batch enrichment for multiple properties
- Progress indicators
- Error reporting

---

## Part 4: Public Pages & SEO

### Property Template Enhancement
- Service promotion banner (above fold, after hero)
- Display all booking platform links
- Show verified Google address
- Structured data (JSON-LD) for SEO
- All pages statically generated

### Accommodation Page Improvements
- Group properties by region (using verified postcode)
- Region navigation at top
- Filter/search functionality
- Better visual layout

### Homepage Recreation
- **Complete audit** of all images from original site
- Extract all image URLs from network requests
- Compare with current implementation
- Add missing images in correct positions
- Match exact layout and order from original
- Preserve all original text content
- Improve architecture while maintaining content

---

## Files to Create/Modify

### New Files (36 total)
- Enrichment: 22 files (crawlers, APIs, admin UI)
- Contact Form: 10 files (components, email/SMS, templates)
- Admin: 4 files (inline editing, batch operations)

### Modified Files (10 total)
- Database schema
- Admin pages
- Contact page
- Header component
- Accommodation pages
- Homepage

---

## Dependencies to Install
- `puppeteer` or `playwright` - JavaScript-rendered content
- `cheerio` - HTML parsing
- `axios` - HTTP requests
- `sharp` - Image processing
- `resend` or `nodemailer` - Email sending
- `twilio` or `aws-sdk` (SNS) - SMS sending (optional)
- `@react-email/components` - Email templates (optional)

---

## Questions for Clarification

### 1. SMS Service
- Do you want SMS template functionality? (requires Twilio or AWS SNS setup)
- Or should we skip SMS and only offer email templates?

### 2. Email Service
- Which email service do you prefer?
  - **Resend** (recommended, easy setup)
  - **SendGrid** (more features)
  - **Nodemailer** (SMTP, requires email server)

### 3. Crawler Priority
- Should we start with crawler system or contact form first?
- Or build both in parallel?

### 4. Homepage Images
- I found additional images in network requests:
  - `unnamed.gif`
  - `30D34E69-E24C-403A-876B-3028330107F3_1_201_a.jpeg`
  - `0374AD0B-770A-4F85-B2AF-EC71E410CF05.png`
- Where should these be placed on the homepage?

### 5. Template Format
- For SMS template: Should it be a simple text list or formatted for easy copy-paste?
- For Email template: Should it match Google Sheets column structure exactly?

### 6. Enrichment Frequency
- How often should properties be refreshed automatically?
- Daily, weekly, or manual only?

### 7. Manual Override
- When refreshing, should manual edits always be preserved?
- Or should admins choose what to preserve?

---

## Implementation Order Recommendation

### Phase 1: Foundation (Week 1)
1. Homepage complete recreation (all images, content, layout)
2. Clerk login button in Header
3. Contact form with 3 options (Call/Email/Form)
4. Email sending system

### Phase 2: Contact System (Week 1-2)
5. Template request system (SMS/Email)
6. Google Ads conversion tracking
7. GTM event tracking for all contact methods

### Phase 3: Admin Enhancements (Week 2)
8. Inline editing with batch save
9. Delete functionality
10. Enrichment UI (basic)

### Phase 4: Enrichment System (Week 2-3)
11. Basic crawler framework
12. Photo extraction
13. Contact extraction
14. Gemini AI integration

### Phase 5: Polish (Week 3)
15. Refresh/recrawl system
16. Scheduled refresh
17. Region grouping improvements
18. Service banner on property pages

---

## Ready to Proceed?

Once you answer the clarification questions, I'll begin implementation starting with:
1. **Homepage complete recreation** (your priority)
2. **Contact form system** (high value)
3. **Admin improvements** (workflow efficiency)

Let me know your preferences and I'll start building! 🚀

