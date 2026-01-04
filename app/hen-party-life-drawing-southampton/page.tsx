import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Southampton';
const ZONES = 'Southampton • Portsmouth • New Forest • Winchester • Hampshire';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? Book a fun, classy, and tasteful naked life drawing class with Ben. Mobile service visiting Southampton & Hampshire.`,
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function SouthamptonPage() {
    const introText = (
        <>
            <p className="mb-4">
                Planning a hen party in {CITY} or the New Forest? A life drawing class is a classic hen do activity that everyone loves.
            </p>
            <p className="mb-4">
                I travel to {CITY} and across Hampshire to host fun, tasteful sessions. I come to your accommodation, bringing all the materials and modeling expertise needed for a fantastic event.
            </p>
            <p className="mb-4">
                I ensure the bride feels celebrated and the atmosphere is relaxed and fun. It's a great way to start your evening!
            </p>
        </>
    );

    const whyChoose = "A party hub on the south coast. Famous for its 'Bottomless Brunch' culture and Oxford Street’s run of independent bars and restaurants.";

    const activities = [
        {
            title: "Private Life Drawing",
            description: "The perfect pre-dinner activity to bond the group."
        },
        {
            title: "Titanic Trail",
            description: "Explore the fascinating history of the ill-fated liner."
        },
        {
            title: "Orange Rooms",
            description: "Famous for its retro decor and cocktail masterclasses."
        },
        {
            title: "Westquay Shopping",
            description: "Massive modern shopping centre for retail therapy."
        },
        {
            title: "Vaults & Vino Tour",
            description: "Wine tasting in the medieval underground vaults. Atmospheric and fun."
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`Classy Hen Party Entertainment in ${CITY}`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
