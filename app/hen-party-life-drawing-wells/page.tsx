import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Wells';
const ZONES = 'City Centre • Cheddar • Glastonbury • Shepton Mallet • Wookey Hole • All Somerset';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? England's smallest city is perfect for intimate celebrations. Book Ben for a classy nude life drawing class. Mobile service across Somerset.`,
    keywords: ['hen party Wells', 'life drawing Wells Somerset', 'hen weekend Somerset', 'classy hen do', 'intimate hen party'],
};

export default function WellsPage() {
    const introText = (
        <>
            <p className="mb-4">
                {CITY} is England's smallest city - but it's absolutely stunning! The magnificent
                cathedral, medieval Bishop's Palace, and charming market square make it a perfect
                backdrop for a <strong>classy hen weekend</strong>.
            </p>
            <p className="mb-4">
                I travel to Wells and the surrounding Somerset area for life drawing sessions.
                This is a great choice for groups who want a more <strong>intimate, sophisticated
                    celebration</strong> without sacrificing the fun.
            </p>
            <p className="mb-4">
                Whether you're staying in a city centre B&B, a nearby country cottage, or have
                booked a group accommodation, I'll bring everything needed for a brilliant session.
            </p>
        </>
    );

    const whyChoose = "Wells offers timeless English charm at its finest. The stunning cathedral, medieval streets, and nearby Cheddar Gorge make it ideal for hen parties who want Instagram-worthy backdrops and a relaxed pace.";

    const activities = [
        {
            title: "Hen Party Life Drawing",
            description: "A classy, fun activity that's perfect for Wells' sophisticated atmosphere."
        },
        {
            title: "Wells Cathedral",
            description: "Stunning medieval architecture and peaceful grounds for group photos."
        },
        {
            title: "Bishop's Palace & Gardens",
            description: "Historic palace with moat, swans, and beautiful gardens to explore."
        },
        {
            title: "Cheddar Gorge Adventure",
            description: "Spectacular cliffs, caves, and cliff-top walks just 20 minutes away."
        },
        {
            title: "Wookey Hole Caves",
            description: "Magical underground caves with the legendary Witch of Wookey legend."
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`Classy Hen Party in ${CITY}`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
