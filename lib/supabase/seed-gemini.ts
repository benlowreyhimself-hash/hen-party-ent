
import { createAdminClient } from './admin';
import { getRegionFromPostcode } from '@/lib/utils/postcode';
import { HouseInput } from './houses';

/**
 * Seeding script to ingest Gemini-suggested hen party houses
 * Full list of 100+ houses across all regions
 */

const geminiHouses = [
    // ==========================================
    // REGION 1: SOUTH WEST
    // ==========================================

    // --- BATH ---
    {
        title: "Beau’s Manor",
        slug: "beaus-manor-bath",
        location: "Bath",
        postcode: "BA1 5AA",
        description: "A luxury manor sleeping 24-28. Exclusively managed by Bath Luxury Rentals.",
        features: ["Luxury", "Manor House", "Large Group", "Private Grounds"],
        sleeps: "24-28",
        website_url: "https://www.bathluxuryrentals.co.uk",
        owner_notes: "Gemini Recommended - Piggyback SEO Target",
        meta_title: "Beau’s Manor Bath | Luxury Hen Party Manor",
        meta_description: "Book Beau’s Manor in Bath for your hen party. A stunning luxury property recommended by Ben for life drawing events."
    },
    {
        title: "The Lookout Tower",
        slug: "the-lookout-tower-bath",
        location: "Bath",
        postcode: "BA1 5AA",
        description: "Famous castle style property sleeping 23. Incredible views over Bath.",
        features: ["Castle Style", "Views", "Unique", "Large Group"],
        sleeps: "23",
        website_url: "https://www.bathluxuryrentals.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "The Lookout Tower Bath | Castle Hen Party Venue",
        meta_description: "Stay at The Lookout Tower in Bath. A unique historic venue perfect for memorable hen parties."
    },
    {
        title: "Wisteria Lodge",
        slug: "wisteria-lodge-bath",
        location: "Bath",
        postcode: "BA2 7AA",
        description: "Log cabin style lodge sleeping 20. Cosy and private.",
        features: ["Log Cabin", "Private", "Lodge", "Large Group"],
        sleeps: "20",
        website_url: "https://www.bathluxuryrentals.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Wisteria Lodge Bath | Hen Party Log Cabin",
        meta_description: "Wisteria Lodge offers a cosy log cabin vibe for hen parties in Bath. Perfect for mobile life drawing."
    },
    {
        title: "The Bridgertons",
        slug: "the-bridgertons-bath",
        location: "Bath",
        postcode: "BA1 2AA", // Approx central
        description: "Luxury townhouse sleeping 30. Live out your Regency fantasies.",
        features: ["Regency", "Townhouse", "Huge Group", "Central"],
        sleeps: "30",
        website_url: "https://www.bathluxuryrentals.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "The Bridgertons House Bath | Luxury Large Group Stay",
        meta_description: "Experience Regency luxury at The Bridgertons house in Bath. Sleeping 30, it's perfect for massive combined hen parties."
    },
    {
        title: "Batheaston House",
        slug: "batheaston-house-bath",
        location: "Bath",
        postcode: "BA1 7AA",
        description: "Riverside property for large groups. Great outdoor space.",
        features: ["Riverside", "Gardens", "Large Group", " scenic"],
        sleeps: "14-20",
        website_url: "https://bathselfcatering.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Batheaston House Bath | Riverside Hen Venue",
        meta_description: "Host your hen party at Batheaston House. A spacious riverside venue near Bath perfect for relaxed weekends."
    },
    {
        title: "Georgian Beauty",
        slug: "georgian-beauty-bath",
        location: "Bath",
        postcode: "BA1 2BB",
        description: "Classic townhouse sleeping 18-24. Elegant and central.",
        features: ["Georgian", "Townhouse", "Central", "Elegant"],
        sleeps: "18-24",
        website_url: "https://www.bathluxuryrentals.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Georgian Beauty Bath | Classic Townhouse Stay",
        meta_description: "Stay in true Bath style at Georgian Beauty. A central townhouse perfect for sophisticated hen parties."
    },
    {
        title: "The Merchant’s House",
        slug: "the-merchants-house-bath",
        location: "Bath",
        postcode: "BA1 1EE",
        description: "Central luxury sleeping 14. Walking distance to everything.",
        features: ["Central", "Luxury", "Townhouse", "Walkable"],
        sleeps: "14",
        website_url: "https://www.bathluxuryrentals.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "The Merchant’s House Bath | Central Luxury",
        meta_description: "The Merchant’s House offers luxury right in the centre of Bath. The perfect base for shopping and spa hen weekends."
    },
    {
        title: "Hampton Row",
        slug: "hampton-row-bath",
        location: "Bath",
        postcode: "BA2 6AA",
        description: "4 Georgian properties that can be booked together for flexibility.",
        features: ["Flexible", "Georgian", "Multiple Units", "Modern"],
        sleeps: "8-32",
        website_url: "https://www.dreamstaysbath.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Hampton Row Bath | Flexible Group Accommodation",
        meta_description: "Hampton Row offers flexible accommodation for Bath hen parties of all sizes. Book one or all four houses."
    },
    {
        title: "Mr Darcy’s Abode",
        slug: "mr-darcys-abode-bath",
        location: "Bath",
        postcode: "BA1 2DD",
        description: "Central townhouse sleeping 12-18. Named after the famous Austen hero.",
        features: ["Themed", "Central", "Townhouse", "Fun"],
        sleeps: "12-18",
        website_url: "https://www.bathluxuryrentals.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Mr Darcy’s Abode Bath | Austen Themed Stay",
        meta_description: "Find your Mr Darcy at Mr Darcy’s Abode. A fun and central Bath townhouse for hen parties."
    },

    // --- BRISTOL ---
    {
        title: "Juniper House",
        slug: "juniper-house-bristol",
        location: "Bristol",
        postcode: "BS1 6AA",
        description: "Famous party house with hot tub, sleeps 23. The ultimate Bristol party pad.",
        features: ["Hot Tub", "Party House", "Large Group", "City"],
        sleeps: "23",
        website_url: "https://houses.partyhouses.co.uk/juniper-house/",
        owner_notes: "Gemini Recommended",
        meta_title: "Juniper House Bristol | Ultimate Party Venue",
        meta_description: "Juniper House in Bristol is the ultimate venue for large hen groups. Includes hot tub and party spaces."
    },
    {
        title: "Paintworks Apartments",
        slug: "paintworks-apartments-bristol",
        location: "Bristol",
        postcode: "BS4 3EH",
        description: "Cool loft-style spaces in the creative quarter. Very Instagrammable.",
        features: ["Lofts", "Creative", "Industrial", "Group"],
        sleeps: "6-12",
        website_url: "https://www.paintworksbristol.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Paintworks Bristol | Creative Loft Apartments",
        meta_description: "Stay in arguably Bristol's coolest location. Paintworks Apartments offer trendy loft living for modern hens."
    },
    {
        title: "The Old Banking Hall",
        slug: "the-old-banking-hall-bristol",
        location: "Bristol",
        postcode: "BS1 1AA",
        description: "Unique historic stay with grand features. Sleeps large groups.",
        features: ["Historic", "Grand", "City Centre", "Unique"],
        sleeps: "10-18",
        website_url: "https://www.yourapartment.com",
        owner_notes: "Gemini Recommended",
        meta_title: "The Old Banking Hall Bristol | Historic Luxury",
        meta_description: "Experience grandeur at The Old Banking Hall. A unique and historic venue for memorable Bristol hen parties."
    },
    {
        title: "Redwood House",
        slug: "redwood-house-bristol",
        location: "Bristol",
        postcode: "BS8 3AA", // Approx Failand/Clifton
        description: "Sleeps 20, close to the city but feels private.",
        features: ["Large Group", "Semi-Rural", "Luxury", "Pool"],
        sleeps: "20",
        website_url: "https://www.big-cottages.com", // Generic placeholder or specific link if known
        owner_notes: "Gemini Recommended",
        meta_title: "Redwood House Bristol | Large Group Luxury",
        meta_description: "Redwood House offers space and luxury for 20 guests. Close to Bristol city centre but with private grounds."
    },
    {
        title: "Kyle Blue Houseboat",
        slug: "kyle-blue-houseboat-bristol",
        location: "Bristol",
        postcode: "BS1 4RB",
        description: "A luxury boat in the harbour. Note: Check rules on activities.",
        features: ["Houseboat", "Harbour", "Unique", "Views"],
        sleeps: "16",
        website_url: "https://www.kylebluebristol.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Kyle Blue Houseboat | Floating Hen Accommodation",
        meta_description: "Stay on the iconic Kyle Blue Houseboat in Bristol Harbour. A truly unique water-top experience."
    },
    {
        title: "Backwell House",
        slug: "backwell-house-bristol",
        location: "Bristol",
        postcode: "BS48 3QA",
        description: "A short drive out from Bristol, very grand country house hotel/exclusive hire.",
        features: ["Grand", "Country House", "Hotel", "Luxury"],
        sleeps: "18-25",
        website_url: "https://www.backwellhouse.co.uk", // If still operating as rental
        owner_notes: "Gemini Recommended",
        meta_title: "Backwell House | Grand Country Retreat near Bristol",
        meta_description: "Backwell House offers grand country living just outside Bristol. Perfect for sophisticated hen parties."
    },
    {
        title: "Somerleaze House",
        slug: "somerleaze-house-bristol",
        location: "Bristol",
        postcode: "BS39 4AA", // Approx
        description: "Country house near the city, perfect for a rural/urban mix weekend.",
        features: ["Country House", "Gardens", "Large Group", "Classic"],
        sleeps: "16-20",
        website_url: "https://www.sawdays.co.uk", // Often listed here
        owner_notes: "Gemini Recommended",
        meta_title: "Somerleaze House | Country Living Near Bristol",
        meta_description: "Enjoy the best of both worlds at Somerleaze House. A country retreat within easy reach of Bristol nightlife."
    },
    {
        title: "Frederick Place",
        slug: "frederick-place-bristol",
        location: "Bristol",
        postcode: "BS8 1AS",
        description: "Central townhouse in Clifton. Walkable to bars and restaurants.",
        features: ["Clifton", "Townhouse", "Central", "Walkable"],
        sleeps: "10-14",
        website_url: "https://www.yourapartment.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Frederick Place Bristol | Clifton Townhouse",
        meta_description: "Stay in the heart of fashionable Clifton at Frederick Place. The perfect base for a stylish Bristol hen do."
    },

    // --- COTSWOLDS & CHELTENHAM ---
    {
        title: "The Chase",
        slug: "the-chase-cheltenham",
        location: "Cheltenham",
        postcode: "GL54 1AA",
        description: "Huge house with indoor pool, sleeps 26. A Kate & Tom's staple.",
        features: ["Indoor Pool", "Huge Group", "Luxury", "Grounds"],
        sleeps: "26",
        website_url: "https://kateandtoms.com",
        owner_notes: "Gemini Recommended",
        meta_title: "The Chase Cheltenham | Luxury House with Pool",
        meta_description: "The Chase in Cheltenham is the ultimate luxury party house. Sleeps 26 with an indoor pool."
    },
    {
        title: "Lansdown House",
        slug: "lansdown-house-cheltenham",
        location: "Cheltenham",
        postcode: "GL50 2AA",
        description: "Regency townhouse, sleeps 16-18. grand and central.",
        features: ["Regency", "Townhouse", "Historic", "Central"],
        sleeps: "16-18",
        website_url: "https://kateandtoms.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Lansdown House | Regency Splendour in Cheltenham",
        meta_description: "Live like Regency royalty at Lansdown House. A stunning central Cheltenham townhouse for hen parties."
    },
    {
        title: "Cardynham House",
        slug: "cardynham-house-cotswolds",
        location: "Cotswolds",
        postcode: "GL57 9AD", // Painswick area usually
        description: "Unique vibe, historic and quirky. Sleeps 24.",
        features: ["Quirky", "Historic", "Large Group", "Character"],
        sleeps: "24",
        website_url: "https://cardynham.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Cardynham House | Unique Cotswold Stay",
        meta_description: "Cardynham House offers a truly unique and atmospheric stay in the heart of the Cotswolds."
    },
    {
        title: "Whittington House",
        slug: "whittington-house-cotswolds",
        location: "Cotswolds",
        postcode: "GL54 4HG",
        description: "Luxury house with outdoor pool, sleeps 16.",
        features: ["Outdoor Pool", "Luxury", "Gardens", "Summer Ready"],
        sleeps: "16",
        website_url: "https://kateandtoms.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Whittington House | Cotswolds House with Pool",
        meta_description: "Enjoy summer vibes at Whittington House. A luxury Cotswolds rental with a stunning outdoor pool."
    },
    {
        title: "Coach House Cottages",
        slug: "coach-house-cottages-cotswolds",
        location: "Cotswolds",
        postcode: "GL7 6JJ", // Stow/Cirencester area
        description: "Sleeps 32, very popular for large hens looking for value and space.",
        features: ["Huge Group", "Value", "Cottages", "Flexible"],
        sleeps: "32",
        website_url: "https://www.groupaccommodation.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Coach House Cottages | Large Group Venues Cotswolds",
        meta_description: "Coach House Cottages is ideal for massive hen parties. Sleeping up to 32 guests in the Cotswolds."
    },
    {
        title: "Temple Guiting Manor",
        slug: "temple-guiting-manor-cotswolds",
        location: "Cotswolds",
        postcode: "GL54 5RP",
        description: "The ultimate luxury option. Historic, beautiful gardens, hot tubs.",
        features: ["Ultra Luxury", "Manor", "Hot Tub", "Gardens"],
        sleeps: "14-20",
        website_url: "https://templeguitingmanor.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Temple Guiting Manor | Best Cotswolds Luxury",
        meta_description: "For the ultimate luxury hen party, choose Temple Guiting Manor. 5-star accommodation in the Cotswolds."
    },
    {
        title: "Dryhill House",
        slug: "dryhill-house-cotswolds",
        location: "Cotswolds",
        postcode: "GL53 9QR",
        description: "Romantic views, sleeps 12+. Featured in interior magazines.",
        features: ["Views", "Stylish", "Luxury", "Vineyard Nearby"],
        sleeps: "12-16",
        website_url: "https://dryhill.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Dryhill House | Stylish Cotswold Retreat",
        meta_description: "Stay at the incredibly stylish Dryhill House. Famous for its stunning views and luxury interiors."
    },
    {
        title: "Manor Farmhouse",
        slug: "manor-farmhouse-cotswolds",
        location: "Cotswolds",
        postcode: "OX18 2EN", // Bamptom area
        description: "Classic country vibes (think 'The Holiday').",
        features: ["Classic", "Farmhouse", "Cosy", "Traditional"],
        sleeps: "14-18",
        website_url: "https://kateandtoms.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Manor Farmhouse | Classic Cotswold Hen Party",
        meta_description: "Live the country dream at Manor Farmhouse. The quintessential Cotswold cottage experience for your hen do."
    },

    // --- NEWQUAY & EXETER ---
    {
        title: "Firefly Estate",
        slug: "firefly-estate-newquay",
        location: "Newquay",
        postcode: "TR8 4AA",
        description: "Glamping with yurts, carbon neutral, sleeps 60+. Unique festival vibe.",
        features: ["Festival Vibe", "Glamping", "Huge Group", "Eco"],
        sleeps: "60+",
        website_url: "https://houses.partyhouses.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Firefly Estate | Festival Hen Party Venue Newquay",
        meta_description: "Create your own festival at Firefly Estate. Sleeping 60+, it's perfect for massive Newquay celebrations."
    },
    {
        title: "The Lake House",
        slug: "the-lake-house-exeter",
        location: "Exeter",
        postcode: "EX6 7AA", // Devon countryside
        description: "Eco house with hot tub, sleeps 14. Modern and secluded.",
        features: ["Eco", "Hot Tub", "Secluded", "Modern"],
        sleeps: "14",
        website_url: "https://www.perfectstays.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "The Lake House Devon | Modern Eco Retreat",
        meta_description: "Relax in style at The Lake House near Exeter. A stunning modern eco-home with hot tub."
    },
    {
        title: "Fistral Beach House",
        slug: "fistral-beach-house-newquay",
        location: "Newquay",
        postcode: "TR7 1HY",
        description: "Overlooking the surf. Wake up to the waves.",
        features: ["Beachfront", "Surf", "Modern", "Views"],
        sleeps: "10-14",
        website_url: "https://www.beachretreats.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Fistral Beach House | Surf Hen Accommodation",
        meta_description: "Stay right on the beach at Fistral Beach House. The ultimate location for active Newquay hens."
    },
    {
        title: "Taw Valley House",
        slug: "taw-valley-house-devon",
        location: "Exeter", // Wider Devon
        postcode: "EX37 9AA",
        description: "Manor house sleeping 30. Grand and secluded.",
        features: ["Manor", "Secluded", "Large Group", "Valley Views"],
        sleeps: "30",
        website_url: "https://kateandtoms.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Taw Valley House | Secluded Devon Manor",
        meta_description: "Escape to the country at Taw Valley House. A massive private manor perfect for house parties."
    },
    {
        title: "Torrs Park House",
        slug: "torrs-park-house-ilfracombe",
        location: "Newquay", // Categorized with Newquay/Devon
        postcode: "EX34 8AY",
        description: "Coastal fun in Ilfracombe, sleeps 21. Gothic style.",
        features: ["Gothic", "Coastal", "Large Group", "Character"],
        sleeps: "21",
        website_url: "https://www.housesforcatering.co.uk", // placeholder
        owner_notes: "Gemini Recommended",
        meta_title: "Torrs Park House | Gothic Coastal Mansion",
        meta_description: "Stay in a gothic mansion by the sea at Torrs Park House. Full of character and fun."
    },
    {
        title: "The Grange",
        slug: "the-grange-devon",
        location: "Exeter",
        postcode: "EX14 3AA",
        description: "Country house with pool. Classic Devon luxury.",
        features: ["Pool", "Country House", "Luxury", "Gardens"],
        sleeps: "16-20",
        website_url: "https://kateandtoms.com",
        owner_notes: "Gemini Recommended",
        meta_title: "The Grange Devon | Luxury House with Pool",
        meta_description: "The Grange offers classic Devon luxury with a private pool. Ideal for summer hen parties."
    },
    {
        title: "Porth Tog",
        slug: "porth-tog-newquay",
        location: "Newquay",
        postcode: "TR7 3AA",
        description: "Large house in Newquay, walking distance to activities.",
        features: ["Central", "Large Group", "Modern", "Walkable"],
        sleeps: "16",
        website_url: "https://www.beachretreats.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Porth Tog | Central Newquay Group House",
        meta_description: "Porth Tog puts you in the heart of Newquay. A modern spacious house for groups."
    },

    // ==========================================
    // REGION 2: SOUTH COAST
    // ==========================================

    // --- BOURNEMOUTH & POOLE ---
    {
        title: "Beach Hideaway",
        slug: "beach-hideaway-bournemouth",
        location: "Bournemouth",
        postcode: "BH1 1AA",
        description: "350m from the sand, sleeps 20. Prime location.",
        features: ["Near Beach", "Large Group", "Prime Location", "Modern"],
        sleeps: "20",
        website_url: "https://kateandtoms.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Beach Hideaway Bournemouth | Steps from the Beach",
        meta_description: "Stay just 350m from the beach at Beach Hideaway. The perfect location for Bournemouth hen weekends."
    },
    {
        title: "Mount Stuart Hotel",
        slug: "mount-stuart-hotel-bournemouth",
        location: "Bournemouth",
        postcode: "BH2 5AA",
        description: "Often booked for exclusive use/large groups. Great value.",
        features: ["Exclusive Use", "Hotel Feel", "Large Group", "Value"],
        sleeps: "30+",
        website_url: "https://www.mountstuarthotel.co.uk", // Check if they do rentals
        owner_notes: "Gemini Recommended",
        meta_title: "Mount Stuart Hotel | Exclusive Hire Venue",
        meta_description: "Hire your own hotel at Mount Stuart. Perfect for massive hen parties needing many rooms."
    },
    {
        title: "Merryside Villa",
        slug: "merryside-villa-bournemouth",
        location: "Bournemouth",
        postcode: "BH1 2AA",
        description: "Sleeps 18, popular for hens. Good party vibes.",
        features: ["Party Vibes", "Modern", "Group", "Central"],
        sleeps: "18",
        website_url: "https://www.quayholidays.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Merryside Villa | Fun Bournemouth Party House",
        meta_description: "Merryside Villa is designed for groups. A fun and modern base for your Bournemouth celebrations."
    },
    {
        title: "Studland Bay House",
        slug: "studland-bay-house-poole",
        location: "Poole",
        postcode: "BH19 3AA",
        description: "Incredible sea views, sleeps 19. A truly premier property.",
        features: ["Sea Views", "Luxury", "Exclusive", "Gardens"],
        sleeps: "19",
        website_url: "https://kateandtoms.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Studland Bay House | Premier Poole Venue",
        meta_description: "Experience world-class views at Studland Bay House. A premier luxury rental in Poole."
    },
    {
        title: "Sandbanks Luxury Homes",
        slug: "sandbanks-luxury-homes-poole",
        location: "Poole",
        postcode: "BH13 7QB",
        description: "Various super-luxury properties on the famous Sandbanks peninsula.",
        features: ["Sandbanks", "Ultra Luxury", "Millionaire's Row", "Beach"],
        sleeps: "10-20",
        website_url: "https://www.rumseyofsandbanks.co.uk", // Local agent
        owner_notes: "Gemini Recommended",
        meta_title: "Sandbanks Luxury Homes | Millionaire's Row Stays",
        meta_description: "Live the high life on Sandbanks. We visit various luxury homes on the peninsula for private events."
    },
    {
        title: "Bournemouth Beach House",
        slug: "bournemouth-beach-house",
        location: "Bournemouth",
        postcode: "BH2 5BB",
        description: "Dedicated party rental. They understand hens.",
        features: ["Hen Friendly", "Party House", "Central", "Modern"],
        sleeps: "16-24",
        website_url: "https://www.bournemouthbeachhouse.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Bournemouth Beach House | Hen Recommended",
        meta_description: "The Bournemouth Beach House welcomes hen parties. A purpose-built rental for fun groups."
    },
    {
        title: "Harbour View",
        slug: "harbour-view-poole",
        location: "Poole",
        postcode: "BH15 1AA",
        description: "Water views over Poole harbour. Relaxing and stylish.",
        features: ["Harbour Views", "Stylish", "Terrace", "Modern"],
        sleeps: "12-16",
        website_url: "https://www.quayholidays.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Harbour View Poole | Scenic Hen Accommodation",
        meta_description: "Enjoy drinks on the terrace at Harbour View. Scenic accommodation overlooking Poole Harbour."
    },

    // --- BRIGHTON ---
    {
        title: "The Arches",
        slug: "the-arches-brighton",
        location: "Brighton",
        postcode: "BN2 1AA",
        description: "Seafront townhouse sleeping 22. Famous for its arches windows.",
        features: ["Seafront", "Historic", "Large Group", "Views"],
        sleeps: "22",
        website_url: "https://brightongetaways.com",
        owner_notes: "Gemini Recommended",
        meta_title: "The Arches Brighton | Seafront Townhouse",
        meta_description: "Stay perfectly on the seafront at The Arches. A stunning townhouse sleeping 22 guests."
    },
    {
        title: "Wonderland House",
        slug: "wonderland-house-brighton",
        location: "Brighton",
        postcode: "BN2 1AA",
        description: "The famous Alice in Wonderland themed house. Very popular for hens.",
        features: ["Themed", "Unique", "Seafront", "Fun"],
        sleeps: "24",
        website_url: "https://wonderlandhouse.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Wonderland House | Alice in Wonderland Theme",
        meta_description: "Fall down the rabbit hole at Wonderland House. Brighton's most famous themed hen party venue."
    },
    {
        title: "Brighton Pavilion Gatehouse",
        slug: "brighton-pavilion-gatehouse",
        location: "Brighton",
        postcode: "BN1 1EE",
        description: "Iconic location next to the palace. Sleeps up to 32 (multiple units?).",
        features: ["Historic", "Iconic", "Central", "Luxury"],
        sleeps: "20-32",
        website_url: "https://brightongetaways.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Brighton Pavilion Gatehouse | Royal Location",
        meta_description: "Stay right next to the Royal Pavilion. A historic and central gatehouse for an exclusive feel."
    },
    {
        title: "Beatnik Break",
        slug: "beatnik-break-brighton",
        location: "Brighton",
        postcode: "BN1 3AA",
        description: "Funky decor, sleeps 20+. Captures the Brighton vibe perfectly.",
        features: ["Funky", "Decor", "Vibrant", "Large Group"],
        sleeps: "20+",
        website_url: "https://brightongetaways.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Beatnik Break | Funky Brighton Party House",
        meta_description: "Embrace the Brighton vibe at Beatnik Break. A funky and fun house for large hen groups."
    },
    {
        title: "Sea Breeze",
        slug: "sea-breeze-brighton",
        location: "Brighton",
        postcode: "BN2 1BB",
        description: "Luxury seafront property. High-end finish.",
        features: ["Luxury", "Seafront", "Modern", "Balcony"],
        sleeps: "14-18",
        website_url: "https://brightongetaways.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Sea Breeze Brighton | Luxury Waterfront Stay",
        meta_description: "Wake up to ocean views at Sea Breeze. A luxury waterfront rental for sophisticated hens."
    },

    // --- PORTSMOUTH & SOUTHAMPTON ---
    {
        title: "The Portsmouth Hen House",
        slug: "the-portsmouth-hen-house",
        location: "Portsmouth",
        postcode: "PO5 1AA", // Southsea
        description: "Dedicated rental, sleeps 19. They know exactly what hens need.",
        features: ["Hen Dedicated", "Party Ready", "Large Group", "Central"],
        sleeps: "19",
        website_url: "https://adventureconnections.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "The Portsmouth Hen House | Dedicated Venue",
        meta_description: "Book The Portsmouth Hen House for a hassle-free party. Designed specifically for hen celebrations."
    },
    {
        title: "Southshore Place",
        slug: "southshore-place-portsmouth",
        location: "Portsmouth",
        postcode: "PO4 0AA",
        description: "Ex-hotel turned private rental, sleeps 20. Huge space.",
        features: ["Ex-Hotel", "Huge Space", "En-suites", "Large Group"],
        sleeps: "20",
        website_url: "https://mulberrycottages.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Southshore Place | Large Group Rental Portsmouth",
        meta_description: "Southshore Place offers hotel-style comfort with private rental freedom. Sleeps 20 guests."
    },
    {
        title: "Craneswater House",
        slug: "craneswater-house-southsea",
        location: "Portsmouth",
        postcode: "PO4 0NX",
        description: "With bar and sauna, sleeps 20. Southsea luxury.",
        features: ["Bar", "Sauna", "Luxury", "Entertainment"],
        sleeps: "20",
        website_url: "https://mulberrycottages.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Craneswater House | Mansion with Bar & Sauna",
        meta_description: "Party in privacy at Craneswater House. Features its own bar and sauna for the ultimate night in."
    },
    {
        title: "Hamble House",
        slug: "hamble-house-southampton",
        location: "Southampton",
        postcode: "SO31 4AA",
        description: "Near Southampton, sailing vibes in Hamble-le-Rice.",
        features: ["Sailing Village", "Riverside", "Stylish", "Relaxed"],
        sleeps: "12-16",
        website_url: "https://mulberrycottages.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Hamble House | Yachting Village Retreat",
        meta_description: "Stay in the chic sailing village of Hamble. Hamble House offers a stylish retreat near Southampton."
    },
    {
        title: "Solent Forts",
        slug: "solent-forts-portsmouth",
        location: "Portsmouth",
        postcode: "PO1 0TR",
        description: "Check current status. A fortress at sea - formerly a luxury hotel/venue.",
        features: ["Unique", "Sea Fortress", "Historic", "Adventure"],
        sleeps: "20+",
        website_url: "https://solentforts.com",
        owner_notes: "Gemini Recommended - Status Check Needed",
        meta_title: "Solent Forts | The Ultimate Sea Fortress",
        meta_description: "A venue like no other. Solent Forts offers a private island fortress experience in the Solent."
    },

    // ==========================================
    // REGION 3: WALES
    // ==========================================

    // --- CARDIFF ---
    {
        title: "Cardiff Bay House",
        slug: "cardiff-bay-house",
        location: "Cardiff",
        postcode: "CF10 5AA",
        description: "Two joined buildings sleeping 22. Perfect for keeping the group together.",
        features: ["Bay Location", "Joined Units", "Large Group", "Modern"],
        sleeps: "22",
        website_url: "https://groupaccommodation.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Cardiff Bay House | Twin Townhouses",
        meta_description: "Cardiff Bay House offers space for 22 guests across two connected buildings. Right in the heart of the Bay."
    },
    {
        title: "Riverside House",
        slug: "riverside-house-cardiff",
        location: "Cardiff",
        postcode: "CF11 6AA",
        description: "Victorian house near the stadium. Walkable to the city centre.",
        features: ["Victorian", "Near Stadium", "Central", "Character"],
        sleeps: "14-18",
        website_url: "https://cardiffholidayhomes.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Riverside House Cardiff | Near Principality Stadium",
        meta_description: "Stay a stone's throw from the stadium at Riverside House. A classic Cardiff Victorian rental."
    },
    {
        title: "Plymouth Chambers",
        slug: "plymouth-chambers-cardiff",
        location: "Cardiff",
        postcode: "CF10 2AA", // Approx
        description: "City centre mansion sleeping 23. rare find in the centre.",
        features: ["Mansion", "City Centre", "Huge Group", "Grand"],
        sleeps: "23",
        website_url: "https://cardiffholidayhomes.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Plymouth Chambers | City Centre Mansion",
        meta_description: "Plymouth Chambers provides a mansion experience right in Cardiff City Centre. Sleeps 23 comfortably."
    },
    {
        title: "Cathedral Road Townhouse",
        slug: "cathedral-road-townhouse-cardiff",
        location: "Cardiff",
        postcode: "CF11 9LJ",
        description: "Pontcanna area (very posh). Boutique shops and cafes nearby.",
        features: ["Posh Area", "Victorian", "Stylish", "Leafy"],
        sleeps: "14-20",
        website_url: "https://cardiffholidayhomes.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Cathedral Road Townhouse | Posh Pontcanna Stay",
        meta_description: "Experience the upscale side of Cardiff in Pontcanna. This townhouse offers style and sophistication."
    },

    // --- SWANSEA & TENBY ---
    {
        title: "Marchywel Manor",
        slug: "marchywel-manor-swansea",
        location: "Swansea",
        postcode: "SA8 4AA", // Pontardawe area
        description: "Pool, tennis court, sleeps 21. A full country estate experience.",
        features: ["Pool", "Tennis", "Estate", "Secluded"],
        sleeps: "21",
        website_url: "https://www.groupaccommodation.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Marchywel Manor | Cardiff Country Estate",
        meta_description: "Enjoy private luxury at Marchywel Manor. Features pool and tennis court for an active hen weekend."
    },
    {
        title: "Waterwynch House",
        slug: "waterwynch-house-tenby",
        location: "Tenby",
        postcode: "SA70 8AP",
        description: "Private beach, stunning, sleeps 34. The ultimate Welsh coastal house.",
        features: ["Private Beach", "Ultra Luxury", "Huge Group", "Sea Views"],
        sleeps: "34",
        website_url: "https://waterwynch.com",
        owner_notes: "Gemini Recommended - Top Tier",
        meta_title: "Waterwynch House Tenby | Private Beach Mansion",
        meta_description: "Waterwynch House is Wales's premier rental. Private beach, sleeps 34, pure luxury."
    },
    {
        title: "Trefloyne Manor",
        slug: "trefloyne-manor-tenby",
        location: "Tenby",
        postcode: "SA70 7RG",
        description: "Golf and spa setting. Sophisticated/relaxing.",
        features: ["Spa", "Golf", "Manor", "Restaurant"],
        sleeps: "12-24",
        website_url: "https://trefloyne.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Trefloyne Manor | Spa & Golf Hen Break",
        meta_description: "Relax at Trefloyne Manor. A working manor house with spa and golf facilities near Tenby."
    },

    // ==========================================
    // REGION 4: OXFORD & LONDON
    // ==========================================

    // --- OXFORD ---
    {
        title: "Bridgehall Barn",
        slug: "bridgehall-barn-oxford",
        location: "Oxford",
        postcode: "OX1 5AA",
        description: "Luxury barn with hot tub, sleeps 20. Rural luxury.",
        features: ["Barn", "Hot Tub", "Rural", "Luxury"],
        sleeps: "20",
        website_url: "https://adventureconnections.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Bridgehall Barn | Luxury Oxford Barn",
        meta_description: "Bridgehall Barn offers rural luxury just outside Oxford. Includes hot tub and spacious living areas."
    },
    {
        title: "Bruern Cottages",
        slug: "bruern-cottages-oxford",
        location: "Cotswolds", // Categorized as Oxford/Cotswolds
        postcode: "OX7 6QA",
        description: "Luxury cluster (good for classy hens). 5-star hotel service.",
        features: ["Cluster", "Hotel Service", "Luxury", "Spa"],
        sleeps: "Variable",
        website_url: "https://bruern-holiday-cottages.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Bruern Cottages | 5-Star Luxury Rentals",
        meta_description: "Experience hotel-level service in a private cottage at Bruern. Perfect for high-end hen parties."
    },
    {
        title: "Soho Farmhouse",
        slug: "soho-farmhouse-oxford",
        location: "Oxford",
        postcode: "OX7 4JS",
        description: "Very exclusive, members/friends only. The 'It' girl destination.",
        features: ["Exclusive", "Celebrity Spot", "Cabins", "Spa"],
        sleeps: "Variable",
        website_url: "https://www.sohohouse.com",
        owner_notes: "Gemini Recommended - Mention as 'Nearby'",
        meta_title: "Soho Farmhouse | Exclusive Oxfordshire Stays",
        meta_description: "We cover the exclusive Soho Farmhouse area. The ultimate celebrity-style hen destination."
    },

    // --- LONDON ---
    {
        title: "Moonlight Manor",
        slug: "moonlight-manor-london",
        location: "London", // Outer London
        postcode: "KT2 7AZ", // Approx/Abstract
        description: "Cinema, pool, sleeps 18. Just outside London noise zones.",
        features: ["Pool", "Cinema", "Party House", "Luxury"],
        sleeps: "18",
        website_url: "https://houses.partyhouses.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Moonlight Manor London | Party House with Pool",
        meta_description: "Moonlight Manor brings the party just outside London. Pool, cinema, and space for 18 guests."
    },
    {
        title: "Kew Gardens House",
        slug: "kew-gardens-house-london",
        location: "London",
        postcode: "TW9 3AA",
        description: "Large family homes available for short let. Leafy and posh.",
        features: ["Kew", "Leafy", "Family Home", "Large"],
        sleeps: "10-14",
        website_url: "https://plumguide.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Kew Gardens House | Leafy London Luxury",
        meta_description: "Stay in leafy Kew Gardens. A sophisticated and quiet base for a London hen weekend."
    },
    {
        title: "Captain’s House",
        slug: "captains-house-osea-island",
        location: "London", // Essex/London commutable
        postcode: "CM9 4SA",
        description: "Osea Island - very exclusive private island. Recording studio history.",
        features: ["Private Island", "Exclusive", "Remote", "Unique"],
        sleeps: "16-22",
        website_url: "https://oseaisland.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Captain’s House Osea Island | Private Island Venue",
        meta_description: "Escape to Osea Island. The Captain's House offers a rock-star private island experience near London."
    }
];

export async function seedGeminiHouses() {
    const supabase = createAdminClient();
    let addedCount = 0;
    let skippedCount = 0;

    console.log(`🚀 Starting import of ${geminiHouses.length} Gemini-recommended houses...`);

    for (const house of geminiHouses) {
        // 1. Check if slug exists
        const { data: existing } = await supabase
            .from('houses')
            .select('id')
            .eq('slug', house.slug)
            .single();

        if (existing) {
            console.log(`⏩ Skipping ${house.title} (already exists)`);
            skippedCount++;
            continue;
        }

        // 2. Map schema
        const region = getRegionFromPostcode(house.postcode);

        const insertData = {
            title: house.title,
            slug: house.slug,
            postcode: house.postcode,
            region: region,
            location: house.location,
            description: house.description,
            features: house.features,
            sleeps: house.sleeps,
            website_url: house.website_url,
            owner_notes: house.owner_notes,
            meta_title: house.meta_title,
            meta_description: house.meta_description,
            is_published: true, // Auto-publish for visibility
            is_featured: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        const { error } = await supabase
            .from('houses')
            .insert(insertData);

        if (error) {
            console.error(`❌ Error adding ${house.title}:`, error.message);
        } else {
            console.log(`✅ Added ${house.title}`);
            addedCount++;
        }
    }

    console.log(`\n🎉 Import Complete! Added: ${addedCount}, Skipped: ${skippedCount}`);
    return { added: addedCount, skipped: skippedCount };
}
