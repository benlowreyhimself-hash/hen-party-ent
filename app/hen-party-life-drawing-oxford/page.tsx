import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Oxford';
const ZONES = 'Oxford City Centre • Cowley • Headington • Summertown • Jericho • All Oxford Areas';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? Book a fun, classy, and tasteful naked life drawing class with Ben. Mobile service visiting City Centre and surrounding areas.`,
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function OxfordPage() {
    const introText = (
        <>
            <p className="mb-4">
                If you're organising a Hen Party in {CITY} for a friend, sister, or family member, you've come to the right place!
            </p>
            <p className="mb-4">
                I travel to {CITY} regularly to host life drawing classes. It's a classy and memorable activity that fits perfectly with the historic and sophisticated vibe of the city.
            </p>
            <p className="mb-4">
                I make sure the bride is made to feel special, and the whole group enjoys themselves. It's a great ice-breaker before a nice dinner or night out in {CITY}.
            </p>
        </>
    );

    const whyChoose = "For a grown-up, magical hen party. The 'City of Dreaming Spires' offers punting on the river and drinking in pubs older than some countries.";

    const activities = [
        {
            title: "Mobile Life Drawing",
            description: "Classy entertainment for your Airbnb or hotel suite."
        },
        {
            title: "Punting on the River Cherwell",
            description: "Hire a chauffeured punt with strawberries and champagne."
        },
        {
            title: "Harry Potter Walking Tour",
            description: "See the filming locations of Hogwarts in the historic colleges."
        },
        {
            title: "Rooftop Cocktails at The Varsity Club",
            description: "Enjoy the best views of the spires with a drink in hand."
        },
        {
            title: "Botanical Gardens Picnic",
            description: "Relax in Britain's oldest botanic garden."
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
