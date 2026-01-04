import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Cardiff';
const ZONES = 'Cardiff City Centre • Cardiff Bay • Pontcanna • Penarth • All Cardiff Areas';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? Book a fun, classy, and tasteful naked life drawing class with Ben. Visiting City Centre, The Bay, and all Cardiff areas.`,
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function CardiffPage() {
    const introText = (
        <>
            <p className="mb-4">
                {CITY} is one of the most popular hen party destinations in the UK, and for good reason!
            </p>
            <p className="mb-4">
                I frequently travel across the bridge to host life drawing sessions in {CITY}. It's a fantastic, fun activity that gets everyone laughing and relaxed before hitting the amazing nightlife {CITY} has to offer.
            </p>
            <p className="mb-4">
                Whether you are staying in the City Centre, down at the Bay, or in a large house on the outskirts, I can bring the life drawing class to you.
            </p>
        </>
    );

    const whyChoose = "Cardiff is legendary for hen parties. It’s compact, walkable, and offers everything from white water rafting to high-end cocktail bars in Cardiff Bay.";

    const activities = [
        {
            title: "Mobile Life Drawing",
            description: "A hilarious and tasteful start to the weekend. We come to you!"
        },
        {
            title: "Cardiff International White Water",
            description: "Exciting rafting right in the city. Wet and wild fun!"
        },
        {
            title: "Cardiff Castle Banquet",
            description: "A full medieval dining experience with entertainment."
        },
        {
            title: "Bottomless Prosecco Brunch",
            description: "Popular at venues like Las Iguanas or The Botanist."
        },
        {
            title: "Escape Rooms",
            description: "Cardiff has some of the best-rated escape games in the UK."
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`Fun & Classy Hen Parties in ${CITY}`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
