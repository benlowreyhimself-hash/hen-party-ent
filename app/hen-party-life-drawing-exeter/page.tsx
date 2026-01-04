import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Exeter';
const ZONES = 'Exeter City • Quayside • Topsham • Dartmoor • East Devon';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? Book a fun, classy, and tasteful naked life drawing class with Ben. Mobile service visiting Exeter & Devon.`,
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function ExeterPage() {
    const introText = (
        <>
            <p className="mb-4">
                {CITY} is a beautiful historic city and a wonderful location for a hen party that combines city vibes with access to nature.
            </p>
            <p className="mb-4">
                I offer mobile life drawing classes in {CITY} and the surrounding area. Whether you are staying in the city centre or a cottage on Dartmoor, I can come to you.
            </p>
            <p className="mb-4">
                It's a sophisticated, fun activity that suits groups of all ages and artistic abilities (or lack thereof!).
            </p>
        </>
    );

    const whyChoose = "A hidden gem for hen parties. Exeter offers a mix of Roman history and modern Quayside dining, with easy access to Dartmoor for country adventures.";

    const activities = [
        {
            title: "Private Art Class (Life Drawing)",
            description: "Bring the entertainment to your accommodation. Classy and fun."
        },
        {
            title: "Quayside Canoe Rental",
            description: "Paddle to a pub lunch along the historic canal. A lovely day out."
        },
        {
            title: "Exeter Cathedral Roof Tour",
            description: "Climb up for incredible views over Devon and the city."
        },
        {
            title: "Underground Passages Tour",
            description: "A quirky historical exploration beneath the city streets."
        },
        {
            title: "Wine & Cheese Tasting",
            description: "Indulge at one of the city's many independent delis."
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`History & Hen Fun in ${CITY}`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
