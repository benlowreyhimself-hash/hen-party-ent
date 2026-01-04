import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Swansea';
const ZONES = 'Swansea • The Mumbles • Gower Peninsula • Langland • Caswell Bay';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY} or The Mumbles? Book a fun, classy, and tasteful naked life drawing class with Ben. Mobile service visiting Swansea & Gower.`,
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function SwanseaPage() {
    const introText = (
        <>
            <p className="mb-4">
                Heading to {CITY} or the beautiful Gower for a hen do? Excellent choice!
            </p>
            <p className="mb-4">
                A life drawing class is the perfect entertainment for a coastal getaway. I can travel to your holiday cottage in The Mumbles or accommodation in the city centre.
            </p>
            <p className="mb-4">
                It's a creative, fun activity that works brilliantly as a pre-dinner event or a relaxed afternoon session.
            </p>
        </>
    );

    const whyChoose = "The gateway to the Gower Peninsula. Stay in the Mumbles for cute boutiques and ice cream, then head into Swansea for a big night out on Wind Street.";

    const activities = [
        {
            title: "Hen Party Life Drawing",
            description: "Creative fun in your holiday cottage or apartment."
        },
        {
            title: "The Mumbles Mile",
            description: "A famous stretch of pubs along the seafront. A classic pub crawl!"
        },
        {
            title: "Gower Surfing/Paddleboarding",
            description: "Explore Langland or Caswell Bay on a board."
        },
        {
            title: "Joe’s Ice Cream Parlour",
            description: "A mandatory stop for the famous vanilla whip. Delicious!"
        },
        {
            title: "360 Beach & Watersports",
            description: "Cafe and activity centre right on Swansea Bay."
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`Seaside Fun in ${CITY}`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
