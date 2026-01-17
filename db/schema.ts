import { pgTable, text, boolean, timestamp, uuid, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const houses = pgTable('houses', {
  id: uuid('id').defaultRandom().primaryKey(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),

  // Basic Information
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  postcode: text('postcode').notNull(),
  region: text('region'), // Will be auto-calculated from postcode
  location: text('location').notNull(), // e.g., "Bath", "Cotswolds", "Stratford-upon-Avon"
  address: text('address'),

  // Raw & Verified Address Data
  raw_address: text('raw_address'), // Original address from Google Sheets
  verified_address: text('verified_address'), // Google-verified official address
  google_place_id: text('google_place_id'), // Google Places API ID

  // Description & Content
  description: text('description'),
  content: text('content'), // Full sales content about hen party services
  features: text('features').array(), // Array of features
  sleeps: text('sleeps'), // Number of people the property sleeps (e.g., "8", "10-12")

  // Images
  image_url: text('image_url'), // Main image
  photo_1_url: text('photo_1_url'),
  photo_2_url: text('photo_2_url'),
  photo_3_url: text('photo_3_url'),

  // Booking Links
  website_url: text('website_url'), // Official property website
  airbnb_url: text('airbnb_url'),
  booking_com_url: text('booking_com_url'),
  vrbo_url: text('vrbo_url'),
  other_booking_url: text('other_booking_url'), // JSON array of other booking platforms

  // SEO
  meta_title: text('meta_title'),
  meta_description: text('meta_description'),

  // Status
  is_published: boolean('is_published').default(true),
  is_featured: boolean('is_featured').default(false),

  // Enrichment Status
  address_verified: boolean('address_verified').default(false),
  booking_links_found: boolean('booking_links_found').default(false),
  photos_extracted: boolean('photos_extracted').default(false),
  photos_stored_in_blob: boolean('photos_stored_in_blob').default(false), // Track if photos are in Blob vs external URLs
  content_generated: boolean('content_generated').default(false),
  enrichment_complete: boolean('enrichment_complete').default(false),

  // Links
  google_maps_url: text('google_maps_url'),
  affiliate_link: text('affiliate_link'), // Manual affiliate link override
  contact_email: text('contact_email'), // Specific venue email for enquiries

  // Venue History & Relationships
  ben_visited_dates: text('ben_visited_dates').array(), // Array of dates when Ben provided service (YYYY-MM-DD format)
  has_affiliate_relationship: boolean('has_affiliate_relationship').default(false), // Track affiliate partnerships
  owner_approved: boolean('owner_approved').default(false), // Owner has approved listing
  owner_contact_info: text('owner_contact_info'), // Owner email/phone for approval tracking
  owner_notes: text('owner_notes'), // Notes about owner relationship/approval
});

// Form Submissions Table
export const formSubmissions = pgTable('form_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),

  // Contact Information
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),

  // Booking Details
  house_id: uuid('house_id').references(() => houses.id), // Link to specific house
  tracking_id: text('tracking_id'), // Affiliate/Campaign tracking
  relation: text('relation'),
  occasion: text('occasion'),
  region: text('region'),
  group_size: text('group_size'),
  duration: text('duration'),
  start_time: text('start_time'),
  event_date: text('event_date'),
  venue_type: text('venue_type'),
  full_address: text('full_address'),
  message: text('message'),

  // Metadata
  source: text('source'), // 'form', 'email', 'sms'
  method: text('method'), // 'form_submission', 'template_request'
  enquiry_date: text('enquiry_date'),

  // Tracking Data (Added Jan 2026)
  ip_address: text('ip_address'),
  country: text('country'),
  city: text('city'),
  user_agent: text('user_agent'),
  gclid: text('gclid'), // Google Click ID for ad tracking
});

// Export types
export type House = typeof houses.$inferSelect;
export type NewHouse = typeof houses.$inferInsert;
export type FormSubmission = typeof formSubmissions.$inferSelect;
export type NewFormSubmission = typeof formSubmissions.$inferInsert;
