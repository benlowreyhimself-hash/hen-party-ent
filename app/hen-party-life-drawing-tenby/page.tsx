import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Tenby';
const ZONES = 'Tenby • Saundersfoot • Pembrokeshire Coast • Narberth';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? Book a fun, classy, and tasteful naked life drawing class with Ben. Mobile service visiting Tenby & Pembrokeshire.`,
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function TenbyPage() {
    const introText = (
        <>
            <p className="mb-4">
                {CITY} is Wales's premier seaside town and a stunning location for a hen weekend.
            </p>
            <p className="mb-4">
                I regularly travel to Pembrokeshire to run life drawing classes for hen parties. It's a fantastic activity that fits well with the relaxed, holiday vibe of the town.
            </p>
            <p className="mb-4">
                Whether you have a large townhouse overlooking the harbour or a cottage nearby, I bring the art class to you!
            </p>
        </>
    );

    const whyChoose = "Wales's most iconic seaside town. With its pastel-coloured houses and sandy beaches, it’s a beautiful backdrop for hen party photos.";

    const activities = [
        {
            title: "Life Drawing Class",
            description: "Perfect activity groups renting large townhouses together."
        },
        {
            title: "Boat Trip to Caldey Island",
            description: "See seals involved and visit the monastery on a lovely boat trip."
        },
        {
            title: "Ghost Walk",
            description: "Explore the spooky history of the ancient town walls."
        },
        {
            title: "Beach Horse Riding",
            description: "Available on nearby beaches like Druidston. Truly magical."
        },
        {
            title: "Harbour Brewery Tour",
            description: "Sample local Welsh ales right by the sea."
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`The Perfect ${CITY} Hen Do`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
