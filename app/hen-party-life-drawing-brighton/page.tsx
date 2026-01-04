import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Brighton';
const ZONES = 'Brighton City Centre • Hove • Kemptown • Seafront • All Brighton Areas';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? Book a fun, classy, and tasteful naked life drawing class with Ben. Mobile service visiting Brighton & Hove.`,
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function BrightonPage() {
    const introText = (
        <>
            <p className="mb-4">
                {CITY} is the ultimate seaside hen party destination, famous for its vibrant atmosphere and nightlife!
            </p>
            <p className="mb-4">
                A life drawing class is the perfect addition to a Brighton hen do. It's creative, tasteful, and absolutely hilarious. I travel to Brighton to run sessions for groups in hotels, AirBnBs, and private townhouses.
            </p>
            <p className="mb-4">
                I make sure the bride is made to feel special, and the whole group enjoys themselves. It's the perfect pre-drinks activity!
            </p>
        </>
    );

    const whyChoose = "London by the sea. Brighton is the UK’s most inclusive and vibrant party town, famous for The Lanes shopping and its iconic Pier.";

    const activities = [
        {
            title: "Nude Life Drawing",
            description: "Fits perfectly with Brighton's artistic vibe. Fun and tasteful."
        },
        {
            title: "British Airways i360",
            description: "Sip champagne 450ft in the air with stunning coastal views."
        },
        {
            title: "Drag Brunch",
            description: "Brighton is world-famous for its drag entertainment. Don't miss it!"
        },
        {
            title: "Vintage Makeovers",
            description: "Get a 1950s look before hitting the town for the night."
        },
        {
            title: "Pier Rides & Fish and Chips",
            description: "The classic seaside experience on the iconic Palace Pier."
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`The Ultimate ${CITY} Hen Do Activity`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
