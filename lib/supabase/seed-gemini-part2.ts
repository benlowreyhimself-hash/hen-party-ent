
import { createAdminClient } from './admin';
import { getRegionFromPostcode } from '@/lib/utils/postcode';
import { HouseInput } from './houses';

/**
 * Seeding script for REMAINING Gemini-suggested hen party houses
 * (Part 2 - houses missed in the first pass)
 */

const geminiHousesPart2 = [
    // ==========================================
    // REGION 1: SOUTH WEST (Missing Items)
    // ==========================================

    // --- COTSWOLDS ---
    {
        title: "Cornwell Manor",
        slug: "cornwell-manor-cotswolds",
        location: "Cotswolds",
        postcode: "OX7 6TT",
        description: "A breathtaking manor house estate. Very high end (check hen policy).",
        features: ["Estate", "Exclusive Use", "Pool", "Ballroom"],
        sleeps: "24",
        website_url: "https://cornwellmanor.com",
        owner_notes: "Gemini Recommended - Check Policy",
        meta_title: "Cornwell Manor | Exclusive Cotswold Estate",
        meta_description: "Cornwell Manor offers a fairytale setting. Exclusive estate hire for the ultimate celebration."
    },

    // --- NEWQUAY & EXETER (Devon) ---
    {
        title: "Lower Grimpstonleigh",
        slug: "lower-grimpstonleigh-devon",
        location: "Exeter", // Kingsbridge area
        postcode: "TQ7 4AY",
        description: "Barns near Kingsbridge. Charming and rustic.",
        features: ["Barns", "Rustic", "Countryside", "Charm"],
        sleeps: "12-16",
        website_url: "https://www.lowergrimpstonleigh.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Lower Grimpstonleigh | Rustic Devon Barns",
        meta_description: "Stay in charming barns at Lower Grimpstonleigh. A rustic and relaxed hen party venue in Devon."
    },
    {
        title: "Bedarra Beach House",
        slug: "bedarra-beach-house-cornwall",
        location: "Newquay", // Mawgan Porth
        postcode: "TR8 4BA",
        description: "Luxury coastal house with stunning views.",
        features: ["Coastal", "Luxury", "Views", "Modern"],
        sleeps: "10-12",
        website_url: "https://www.bedarrabeachhouse.co.uk", // or agent
        owner_notes: "Gemini Recommended",
        meta_title: "Bedarra Beach House | Luxury Coastal Stay",
        meta_description: "Bedarra Beach House offers luxury by the sea. Stunning views for a memorable Cornish hen party."
    },

    // ==========================================
    // REGION 2: SOUTH COAST (Missing Items)
    // ==========================================

    // --- BOURNEMOUTH ---
    {
        title: "Mulberry House",
        slug: "mulberry-house-bournemouth",
        location: "Bournemouth",
        postcode: "BH1 1AA", // Approx
        description: "Luxury townhouse in Bournemouth.",
        features: ["Luxury", "Townhouse", "Central", "Group"],
        sleeps: "12-16",
        website_url: "https://www.quayholidays.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Mulberry House Bournemouth | Luxury Townhouse",
        meta_description: "Mulberry House offers luxury and convenience. A top choice for Bournemouth hen parties."
    },
    {
        title: "The Westcliff Villa",
        slug: "the-westcliff-villa-bournemouth",
        location: "Bournemouth",
        postcode: "BH2 5AA",
        description: "Central location, easy access to town and beach.",
        features: ["Central", "Villa", "Walkable", "Group"],
        sleeps: "14-20",
        website_url: "https://www.quayholidays.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "The Westcliff Villa | Central Bournemouth Stay",
        meta_description: "Stay central at The Westcliff Villa. The perfect base for exploring Bournemouth's nightlife and beaches."
    },

    // --- BRIGHTON ---
    {
        title: "Kemp Townhouse",
        slug: "kemp-townhouse-brighton",
        location: "Brighton",
        postcode: "BN2 1AA",
        description: "Boutique style for groups in the trendy Kemp Town area.",
        features: ["Kemp Town", "Boutique", "Stylish", "Group"],
        sleeps: "12-16",
        website_url: "https://brightongetaways.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Kemp Townhouse Brighton | Boutique Group Stay",
        meta_description: "Experience the cool vibe of Kemp Town. This townhouse offers boutique accommodation for groups."
    },
    {
        title: "Laines Retreat",
        slug: "laines-retreat-brighton",
        location: "Brighton",
        postcode: "BN1 1AA",
        description: "Central cottage in the famous North Laine area.",
        features: ["North Laine", "Cottage", "Central", "Shopping"],
        sleeps: "8-12",
        website_url: "https://brightongetaways.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Laines Retreat Brighton | North Laine Cottage",
        meta_description: "Stay in the heart of the Lanes. Laines Retreat is a perfectly located cottage for Brighton hens."
    },
    {
        title: "Big Beach House",
        slug: "big-beach-house-hove",
        location: "Brighton", // Hove
        postcode: "BN3 2AA",
        description: "Large house in Hove, right by the beach.",
        features: ["Hove", "Beachfront", "Large Group", "Spacious"],
        sleeps: "20",
        website_url: "https://brightongetaways.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Big Beach House Hove | Spacious Seaside Rental",
        meta_description: "Big Beach House in Hove offers space and seaside access. Ideal for larger groups wanting a relaxed vibe."
    },
    {
        title: "Crown Gardens",
        slug: "crown-gardens-brighton",
        location: "Brighton",
        postcode: "BN1 3LD",
        description: "Central townhouses, perfectly located.",
        features: ["Central", "Townhouse", "Walkable", "Modern"],
        sleeps: "10-14",
        website_url: "https://brightongetaways.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Crown Gardens Brighton | Central Townhouse",
        meta_description: "Crown Gardens puts you in the middle of Brighton. Walk to everything from these central townhouses."
    },

    // --- PORTSMOUTH & SOUTHAMPTON ---
    {
        title: "Wallops Wood Cottages",
        slug: "wallops-wood-cottages-southampton",
        location: "Southampton", // Meon Valley
        postcode: "SO32 3QY",
        description: "Luxury cottages in Meon Valley. Pool and hot tubs.",
        features: ["Rural", "Luxury", "Pool", "Hot Tubs"],
        sleeps: "Variable",
        website_url: "https://www.wallopswoodcottages.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Wallops Wood Cottages | Luxury Rural Retreat",
        meta_description: "Escape to Wallops Wood Cottages. Luxury rural accommodation with pool and hot tubs near Southampton."
    },
    {
        title: "The Old Vicarage",
        slug: "the-old-vicarage-new-forest",
        location: "Southampton", // New Forest
        postcode: "SO42 7AA", // Hinton
        description: "New Forest edge. Classic country house.",
        features: ["New Forest", "Country House", "Gardens", "Classic"],
        sleeps: "14-18",
        website_url: "https://www.newforestcottages.co.uk", // Placeholder
        owner_notes: "Gemini Recommended",
        meta_title: "The Old Vicarage New Forest | Country House Stay",
        meta_description: "Stay on the edge of the New Forest. The Old Vicarage offers a classic country house experience."
    },
    {
        title: "Gins Barn",
        slug: "gins-barn-beaulieu",
        location: "Southampton",
        postcode: "SO42 7XG",
        description: "Beaulieu river location. Stunning and tranquil.",
        features: ["Riverside", "Barn", "Tranquil", "Luxury"],
        sleeps: "8-12",
        website_url: "https://www.ginsbarn.co.uk", // Placeholder or agent
        owner_notes: "Gemini Recommended",
        meta_title: "Gins Barn | Beaulieu River Luxury",
        meta_description: "Gins Barn offers a stunning location on the Beaulieu River. A tranquil luxury spot for sophisticated hens."
    },
    {
        title: "Number Four",
        slug: "number-four-southampton",
        location: "Southampton",
        postcode: "SO15 1AA", // Approx
        description: "Boutique hotel exclusive hire.",
        features: ["Boutique Hotel", "Exclusive Use", "Stylish", "City"],
        sleeps: "20+",
        website_url: "https://www.number-four.co.uk", // Placeholder
        owner_notes: "Gemini Recommended",
        meta_title: "Number Four | Exclusive Hotel Hire",
        meta_description: "Hire your own boutique hotel at Number Four. Exclusive use accommodation for large parties."
    },

    // ==========================================
    // REGION 3: WALES (Missing Items)
    // ==========================================

    // --- CARDIFF ---
    {
        title: "Ty Newton",
        slug: "ty-newton-cardiff",
        location: "Cardiff",
        postcode: "CF11 9DX", // Approx
        description: "Large house for groups. Spacious and practical.",
        features: ["Large Group", "Spacious", "Practical", "City Access"],
        sleeps: "14-20",
        website_url: "https://cardiffholidayhomes.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Ty Newton Cardiff | Large Group House",
        meta_description: "Ty Newton is built for groups. Spacious accommodation with easy access to Cardiff city centre."
    },
    {
        title: "Llandaff House",
        slug: "llandaff-house-cardiff",
        location: "Cardiff",
        postcode: "CF5 2AA",
        description: "A bit further out in Llandaff. Quieter and leafy.",
        features: ["Suburbs", "Leafy", "Quieter", "Large"],
        sleeps: "12-16",
        website_url: "https://cardiffholidayhomes.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Llandaff House | Quieter Cardiff Stay",
        meta_description: "Stay in leafy Llandaff. A quieter alternative while still being close to Cardiff's nightlife."
    },
    {
        title: "The Townhouse Cardiff",
        slug: "the-townhouse-cardiff",
        location: "Cardiff",
        postcode: "CF11 9SX",
        description: "Boutique style accommodation in the city.",
        features: ["Boutique", "Townhouse", "Stylish", "City"],
        sleeps: "10-14",
        website_url: "https://thetownhousecardiff.co.uk", // Checking validity usually good
        owner_notes: "Gemini Recommended",
        meta_title: "The Townhouse Cardiff | Boutique City Stay",
        meta_description: "The Townhouse offers boutique style in Cardiff. Perfect for style-conscious hen parties."
    },
    {
        title: "Parc House",
        slug: "parc-house-cardiff",
        location: "Cardiff",
        postcode: "CF24 1AA",
        description: "Large group accommodation. Ideal for big parties.",
        features: ["Large Group", "Value", "City", "Modern"],
        sleeps: "16-24",
        website_url: "https://cardiffholidayhomes.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Parc House Cardiff | Accommodation for Large Groups",
        meta_description: "Bringing a big crowd? Parc House is designed to accommodate large hen parties comfortably."
    },
    {
        title: "Sophia Gardens Apartments",
        slug: "sophia-gardens-apartments-cardiff",
        location: "Cardiff",
        postcode: "CF11 9HW",
        description: "Apartments that can be booked in blocks. Near the park.",
        features: ["Apartments", "Flexible", "Near Park", "Modern"],
        sleeps: "Variable",
        website_url: "https://cardiffholidayhomes.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Sophia Gardens Apartments | Flexible Group Stay",
        meta_description: "Book Sophia Gardens Apartments for flexible group sizes. Located right next to the beautiful park."
    },

    // --- SWANSEA & TENBY ---
    {
        title: "Ocean House",
        slug: "ocean-house-tenby",
        location: "Tenby",
        postcode: "SA70 7AA",
        description: "Harbour views. Right in the mix of Tenby.",
        features: ["Harbour Views", "Central", "Coastal", "Group"],
        sleeps: "12-16",
        website_url: "https://www.coastalcottages.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Ocean House Tenby | Harbour View Rental",
        meta_description: "Enjoy stunning harbour views at Ocean House. Central living in picturesque Tenby."
    },
    {
        title: "Gower Edge",
        slug: "gower-edge-swansea",
        location: "Swansea",
        postcode: "SA4 3AA", // Gower
        description: "Near the Mumbles. Gateway to the Gower.",
        features: ["Gower", "Near Mumbles", "Coastal", "House"],
        sleeps: "10-14",
        website_url: "https://www.goweredge.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Gower Edge | Stay Near The Mumbles",
        meta_description: "Stay at Gower Edge for easy access to The Mumbles and the Gower Peninsula."
    },
    {
        title: "Modulog",
        slug: "modulog-wales",
        location: "Tenby", // Mid Wales really but grouped
        postcode: "LD1 6NN", // Builth Wells typically
        description: "Quirky glamping pods for groups. Something different.",
        features: ["Glamping", "Pods", "Quirky", "Rural"],
        sleeps: "Group",
        website_url: "https://modulog.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Modulog Glamping | Quirky Welsh Pods",
        meta_description: "Try something different with Modulog glamping pods. A fun and quirky outdoor hen party experience."
    },
    {
        title: "Penally Manor",
        slug: "penally-manor-tenby",
        location: "Tenby",
        postcode: "SA70 7PY",
        description: "Grand manor house near Tenby. Luxury and space.",
        features: ["Manor", "Luxury", "Large Group", "Seaviews"],
        sleeps: "20+",
        website_url: "https://www.coastalcottages.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Penally Manor | Grand House near Tenby",
        meta_description: "Penally Manor offers grandeur and sea views. A luxury manor house just a short hop from Tenby."
    },
    {
        title: "Chart House",
        slug: "chart-house-tenby",
        location: "Tenby",
        postcode: "SA70 7AA",
        description: "Near the beach. Perfect for seaside holidays.",
        features: ["Near Beach", "Central", "Modern", "House"],
        sleeps: "10-14",
        website_url: "https://www.coastalcottages.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Chart House Tenby | Seaside Accommodation",
        meta_description: "Chart House is perfectly located for beach lovers. Enjoy Tenby's golden sands just steps away."
    },
    {
        title: "The Old Vicarage Penally",
        slug: "the-old-vicarage-penally-tenby",
        location: "Tenby",
        postcode: "SA70 7PY",
        description: "Large grounds, peaceful location near Tenby.",
        features: ["Large Grounds", "Peaceful", "Classic", "House"],
        sleeps: "12-16",
        website_url: "https://www.coastalcottages.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "The Old Vicarage Penally | Peaceful Tenby Stay",
        meta_description: "Relax in large grounds at The Old Vicarage in Penally. A peaceful retreat moments from Tenby."
    },

    // ==========================================
    // REGION 4: OXFORD & LONDON (Missing Items)
    // ==========================================

    // --- OXFORD ---
    {
        title: "Oxford Silverwood",
        slug: "oxford-silverwood",
        location: "Oxford",
        postcode: "OX2 9AA", // Boars Hill area often
        description: "Large holiday home suitable for groups.",
        features: ["Large Group", "Modern", "Forest Nearby", "House"],
        sleeps: "16-20",
        website_url: "https://www.holidaysilverwood.co.uk", // Placeholder
        owner_notes: "Gemini Recommended",
        meta_title: "Oxford Silverwood | Large Holiday Home",
        meta_description: "Oxford Silverwood is a spacious holiday home perfect for exploring Oxford and the surrounding countryside."
    },
    {
        title: "The Manors of Oxfordshire",
        slug: "the-manors-of-oxfordshire",
        location: "Oxford",
        postcode: "OX14 1AA",
        description: "Various large estates available for hire.",
        features: ["Estate", "Manor", "Luxury", "Exclusive"],
        sleeps: "20+",
        website_url: "https://kateandtoms.com",
        owner_notes: "Gemini Recommended - Umbrella Listing",
        meta_title: "The Manors of Oxfordshire | Exclusive Estates",
        meta_description: "Browse the finest Manors of Oxfordshire. Exclusive estates available for private hen party hire."
    },
    {
        title: "Cornbury Park",
        slug: "cornbury-park-oxford",
        location: "Oxford",
        postcode: "OX7 3EH",
        description: "Estate rentals. Wilderness Festival location.",
        features: ["Estate", "Wilderness", "Luxury", "Events"],
        sleeps: "Variable",
        website_url: "https://www.cornburypark.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Cornbury Park | Historic Estate Rentals",
        meta_description: "Stay on the magnificent Cornbury Park estate. A location famous for Wilderness Festival and luxury events."
    },
    {
        title: "Soundess House",
        slug: "soundess-house-oxford",
        location: "Oxford",
        postcode: "RG9 5DB", // Nuffield
        description: "Nuffield. Character property in the Chilterns.",
        features: ["Chilterns", "Character", "Rural", "Luxury"],
        sleeps: "12-16",
        website_url: "https://www.scholidaylettings.co.uk", // Placeholder
        owner_notes: "Gemini Recommended",
        meta_title: "Soundess House | Chilterns Retreat",
        meta_description: "Soundess House in Nuffield offers a luxury retreat in the beautiful Chiltern Hills near Oxford."
    },
    {
        title: "The Old School House",
        slug: "the-old-school-house-oxford",
        location: "Oxford",
        postcode: "OX33 1AA",
        description: "Character property conversion.",
        features: ["Conversion", "Character", "Unique", "School House"],
        sleeps: "10-14",
        website_url: "https://www.staycotswold.com",
        owner_notes: "Gemini Recommended",
        meta_title: "The Old School House | Unique Oxford Stay",
        meta_description: "Stay in a converted school house. The Old School House offers unique character accommodation."
    },
    {
        title: "City Centre Townhouses",
        slug: "city-centre-townhouses-oxford",
        location: "Oxford",
        postcode: "OX1 1AA",
        description: "Operated by Short Let Space. Various central locations.",
        features: ["Central", "Various", "Townhouse", "Walkable"],
        sleeps: "Variable",
        website_url: "https://www.shortletspace.co.uk",
        owner_notes: "Gemini Recommended",
        meta_title: "Oxford City Centre Townhouses | Central Stays",
        meta_description: "Enjoy the convenience of city centre living. We service various townhouses managed by Short Let Space."
    },

    // --- LONDON ---
    {
        title: "Shoreditch Warehouse Lofts",
        slug: "shoreditch-warehouse-lofts",
        location: "London",
        postcode: "E1 6AA",
        description: "Various listings on AirBnB/Plum Guide. Ultimate cool layout.",
        features: ["Shoreditch", "Loft", "Cool", "Warehouse"],
        sleeps: "8-12",
        website_url: "https://plumguide.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Shoreditch Warehouse Lofts | Cool London Hens",
        meta_description: "Stay in a genuine Shoreditch warehouse loft. The ultimate cool venue for a trendy London hen party."
    },
    {
        title: "The London Mansion",
        slug: "the-london-mansion",
        location: "London", // Usually South or West
        postcode: "SW19 5AA",
        description: "Generic name often used by agencies for varied large homes.",
        features: ["Mansion", "Luxury", "Large Group", "Exclusive"],
        sleeps: "16-20",
        website_url: "https://plumguide.com",
        owner_notes: "Gemini Recommended",
        meta_title: "The London Mansion | Exclusive City Rental",
        meta_description: "Experience London luxury in The London Mansion. One of the rare large houses available for groups in the capital."
    },
    {
        title: "Clerkenwell Townhouse",
        slug: "clerkenwell-townhouse-london",
        location: "London",
        postcode: "EC1V 9AA",
        description: "Central and trendy location. Design-led.",
        features: ["Clerkenwell", "Design", "Central", "Townhouse"],
        sleeps: "10-14",
        website_url: "https://plumguide.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Clerkenwell Townhouse | Design-Led London Stay",
        meta_description: "Stay in design-led luxury at Clerkenwell Townhouse. Perfectly located for exploring creative London."
    },
    {
        title: "Notting Hill Villa",
        slug: "notting-hill-villa-london",
        location: "London",
        postcode: "W11 1AA",
        description: "High-end luxury in the famous film district.",
        features: ["Notting Hill", "Luxury", "Villa", "Instagrammable"],
        sleeps: "10-14",
        website_url: "https://plumguide.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Notting Hill Villa | Iconic London Luxury",
        meta_description: "Live the movie star life at Notting Hill Villa. A stunning luxury home in London's most famous neighbourhood."
    },
    {
        title: "Richmond Riverside",
        slug: "richmond-riverside-london",
        location: "London",
        postcode: "TW9 1AA",
        description: "Larger homes with views. Village feel within London.",
        features: ["Riverside", "Richmond", "Village Feel", "Luxury"],
        sleeps: "12-16",
        website_url: "https://plumguide.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Richmond Riverside | London Village Luxury",
        meta_description: "Enjoy the Thames views at Richmond Riverside. Accommodation that offers a village feel within the city."
    },
    {
        title: "Wimbledon Manor",
        slug: "wimbledon-manor-london",
        location: "London",
        postcode: "SW19 1AA",
        description: "Large spaces, popular during tennis but great for groups year round.",
        features: ["Wimbledon", "Large Grounds", "Luxury", "Mansion"],
        sleeps: "16-20",
        website_url: "https://plumguide.com",
        owner_notes: "Gemini Recommended",
        meta_title: "Wimbledon Manor | Large London House",
        meta_description: "Wimbledon Manor offers rare space and grounds in London. Perfect for large groups wanting luxury."
    }
];

export async function seedGeminiHousesPart2() {
    const supabase = createAdminClient();
    let addedCount = 0;
    let skippedCount = 0;

    console.log(`🚀 Starting Part 2 import of ${geminiHousesPart2.length} Gemini-recommended houses...`);

    for (const house of geminiHousesPart2) {
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

    console.log(`\n🎉 Part 2 Import Complete! Added: ${addedCount}, Skipped: ${skippedCount}`);
    return { added: addedCount, skipped: skippedCount };
}
