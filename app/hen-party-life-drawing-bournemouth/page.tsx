import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Bournemouth';
const ZONES = 'Bournemouth • Poole • Christchurch • Sandbanks • Dorset Coast';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? Book a fun, classy, and tasteful naked life drawing class with Ben. Mobile service visiting all Bournemouth & Poole areas.`,
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function BournemouthPage() {
    const introText = (
        <>
            <p className="mb-4">
                {CITY} is one of the South Coast's premier hen party locations, with its stunning beaches and lively nightlife.
            </p>
            <p className="mb-4">
                I provide a mobile life drawing service that comes to you. Whether you've rented a seaside apartment or a large house in the suburbs, I can turn your living room into an art studio for an hour or two of fun!
            </p>
            <p className="mb-4">
                It's a tasteful, fun, and memorable activity that fits perfectly into a weekend by the sea.
            </p>
        </>
    );

    const whyChoose = "Sun, sea, and sand. Bournemouth has seven miles of award-winning beaches and a 'holiday' atmosphere that makes it feel like you’ve gone abroad without the flight.";

    const activities = [
        {
            title: "Private Life Drawing Class",
            description: "A fun ice-breaker before hitting the town. We bring the fun to you."
        },
        {
            title: "Beach Picnic / Glamping",
            description: "Hire a luxury beach pod for the day and soak up the sun."
        },
        {
            title: "West End Show at the BIC",
            description: "Catch a top touring musical or comedy show at the big events centre."
        },
        {
            title: "Zip Wire Pier to Shore",
            description: "For the adrenaline-junkie hens - fly over the waves!"
        },
        {
            title: "Bottomless Brunch at Turtle Bay",
            description: "Caribbean vibes and unlimited cocktails to get the party started."
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`Sun, Sea & Life Drawing in ${CITY}`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
