import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Newport';
const ZONES = 'City Centre • Caerleon • Maindee • Allt-yr-yn • Rogerstone • All Newport Areas';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? Book Ben for a fun, classy nude life drawing class. The perfect hen do activity for groups in Newport, South Wales. Mobile service.`,
    keywords: ['hen party Newport', 'life drawing Newport', 'hen do activities Newport', 'nude life drawing South Wales'],
};

export default function NewportPage() {
    const introText = (
        <>
            <p className="mb-4">
                Looking for <strong>unique hen party entertainment</strong> in {CITY}? You've found it!
                I travel to Newport and the surrounding South Wales area to bring the fun directly to you.
            </p>
            <p className="mb-4">
                Newport is perfectly positioned between Cardiff and Bristol, making it an ideal base for
                hen parties. Whether you're staying in a local Airbnb, hotel, or holiday cottage, I'll
                come to you with all the materials needed for an unforgettable <strong>life drawing session</strong>.
            </p>
            <p className="mb-4">
                My sessions are relaxed, hilarious, and completely tasteful. The perfect ice-breaker
                before heading out to explore Newport's growing nightlife scene!
            </p>
        </>
    );

    const whyChoose = "Newport offers fantastic value for hen weekends. Close to Cardiff for nightlife, near the stunning Welsh countryside for activities, and with great transport links from across the UK. An underrated gem for hen parties.";

    const activities = [
        {
            title: "Hen Party Life Drawing",
            description: "Start your celebration with a fun, creative activity that gets everyone laughing."
        },
        {
            title: "Caerleon Roman Fortress",
            description: "Explore ancient history with impressive Roman baths and amphitheatre ruins nearby."
        },
        {
            title: "Friars Walk Shopping",
            description: "Modern shopping centre with restaurants and cinema - perfect for pre-night out dining."
        },
        {
            title: "Day Trip to Cardiff",
            description: "Just 15 minutes by train to Cardiff for shopping, arcades, and legendary nightlife."
        },
        {
            title: "Tredegar House & Lakeside",
            description: "Beautiful 17th-century mansion with stunning grounds for memorable group photos."
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`Hen Party Life Drawing in ${CITY}`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
