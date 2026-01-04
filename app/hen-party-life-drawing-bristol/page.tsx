import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Bristol';
const ZONES = 'Clifton • City Centre • Harbourside • Bishopston • Redland • All Bristol Areas';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? Book a fun, classy, and tasteful naked life drawing class with Ben. Mobile service visiting City Centre and surrounding areas.`,
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function BristolPage() {
    const introText = (
        <>
            <p className="mb-4">
                If you're organising a Hen Party in {CITY} for a friend, sister, or family member, you've come to the right place!
            </p>
            <p className="mb-4">
                I live in {CITY} and love hosting life drawing classes here. It's a fun and creative activity that sets the tone for a fantastic weekend in this vibrant city.
            </p>
            <p className="mb-4">
                I make sure the bride is made to feel special, and the whole group enjoys themselves. It's a great laugh before heading out to the glorious Bristol nightlife!
            </p>
        </>
    );

    const whyChoose = "The cool younger sister to Bath. Bristol is packed with street art, hidden speakeasies, and harbour-side dining. Ideal for groups who want a mix of activities and a great night out.";

    const activities = [
        {
            title: "Hen Party Life Drawing",
            description: "Fun, creative entertainment to start your evening. We come to your accommodation!"
        },
        {
            title: "Lido Bristol",
            description: "A restored Victorian outdoor swimming pool and tapas bar in trendy Clifton."
        },
        {
            title: "Boat Party on The Matthew",
            description: "Cruise around the famous harbour on a stunning historic ship replica."
        },
        {
            title: "Cocktail Masterclass at The Alchemist",
            description: "Theatrical drinks with smoke and mirrors - perfect for photos."
        },
        {
            title: "Graffiti Workshop",
            description: "Learn street art skills in the home of Banksy. Creative and edgy."
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`The Perfect ${CITY} Hen Activity`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
