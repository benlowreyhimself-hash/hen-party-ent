import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Taunton';
const ZONES = 'Town Centre • Bishop\'s Hull • Norton Fitzwarren • Wellington • Bridgwater • All Somerset Areas';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY} or Somerset? Book Ben for a tasteful nude life drawing class. Perfect hen do entertainment for groups. Mobile service across Somerset.`,
    keywords: ['hen party Taunton', 'life drawing Somerset', 'hen do activities Taunton', 'hen weekend Somerset'],
};

export default function TauntonPage() {
    const introText = (
        <>
            <p className="mb-4">
                Looking for <strong>hen party entertainment in Somerset</strong>? I travel to {CITY}
                and the surrounding area to bring you a fun, classy life drawing experience.
            </p>
            <p className="mb-4">
                Taunton is the heart of Somerset - a beautiful county town surrounded by rolling
                countryside, cider orchards, and charming villages. It's becoming increasingly popular
                for <strong>hen weekends</strong> thanks to its mix of rural charm and good nightlife.
            </p>
            <p className="mb-4">
                Whether you're staying in a countryside cottage, a town centre hotel, or a luxury
                farmhouse B&B, I'll bring everything needed for an unforgettable session. No stress,
                just laughs!
            </p>
        </>
    );

    const whyChoose = "Somerset offers the perfect blend of countryside charm and hen party fun. Great value accommodation, stunning scenery, and close to both Bristol and Exeter for night out options. Ideal for groups who want a relaxed vibe.";

    const activities = [
        {
            title: "Hen Party Life Drawing",
            description: "A unique, creative activity that's guaranteed to break the ice and create memories."
        },
        {
            title: "Cider Farm Tours",
            description: "Somerset is cider country! Visit local producers for tastings and tours."
        },
        {
            title: "Vivary Park & Town Centre",
            description: "Historic market town with boutique shops, cafes, and great restaurants."
        },
        {
            title: "Hot Tub & Spa",
            description: "Many Somerset cottages feature hot tubs - perfect for a pamper evening."
        },
        {
            title: "Trip to Glastonbury",
            description: "Just 25 minutes away - explore the mystical town, Tor, and quirky shops."
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`Hen Party Life Drawing in ${CITY} & Somerset`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
