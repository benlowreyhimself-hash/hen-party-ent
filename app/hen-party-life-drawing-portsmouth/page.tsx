import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Portsmouth';
const ZONES = 'Portsmouth • Southsea • Gunwharf Quays • Gosport • Havant';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? Book a fun, classy, and tasteful naked life drawing class with Ben. Mobile service visiting Portsmouth & Southsea.`,
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function PortsmouthPage() {
    const introText = (
        <>
            <p className="mb-4">
                {CITY} is a great choice for a hen weekend, offering history, shopping, and nightlife by the sea.
            </p>
            <p className="mb-4">
                I offer mobile life drawing classes that come to you. It's a fun addition to your itinerary, perfect for an afternoon activity or evening entertainment in your apartment or hotel.
            </p>
            <p className="mb-4">
                I bring everything needed, so you can just relax and enjoy the drawing (and the giggles!).
            </p>
        </>
    );

    const whyChoose = "Great for shopping and sailing. Gunwharf Quays offers discount designer shopping by day and harbour-side bars by night.";

    const activities = [
        {
            title: "Life Drawing Session",
            description: "Fun entertainment for your hotel suite or apartment."
        },
        {
            title: "Gunwharf Quays Shopping",
            description: "Shop till you drop with designer brands at outlet prices."
        },
        {
            title: "Spinnaker Tower High Tea",
            description: "Tea and cakes 100m up with views across the Solent."
        },
        {
            title: "Hovercraft Trip to Isle of Wight",
            description: "A unique 10-minute flight across the water."
        },
        {
            title: "Gin Distillery Tour",
            description: "Visit the nearby Bombay Sapphire distillery for a classy tour."
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`Fun in ${CITY} & Southsea`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
