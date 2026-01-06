import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Glastonbury';
const ZONES = 'Town Centre • Street • Shepton Mallet • Wells • All Glastonbury Festival Area';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a unique hen party in ${CITY}? Book Ben for a fun, spiritual life drawing experience. Perfect for alternative hen dos in this magical Somerset town. Mobile service.`,
    keywords: ['hen party Glastonbury', 'unique hen do ideas', 'alternative hen party', 'life drawing Somerset', 'spiritual hen weekend'],
};

export default function GlastonburyPage() {
    const introText = (
        <>
            <p className="mb-4">
                Looking for a <strong>truly unique hen party experience</strong>? Glastonbury is one of
                the most magical places in the UK - and what better way to celebrate than with a
                fun life drawing class?
            </p>
            <p className="mb-4">
                This mystical town is famous for the Tor, the Abbey, and of course the festival. It
                attracts free spirits, creative souls, and anyone looking for something different.
                My <strong>nude life drawing sessions</strong> fit perfectly with Glastonbury's
                alternative vibe.
            </p>
            <p className="mb-4">
                Whether you're staying in a bohemian B&B, a shepherd's hut, or a luxury cottage,
                I'll travel to you with all materials. Get creative, have a laugh, then explore
                the town's crystal shops and veggie cafes!
            </p>
        </>
    );

    const whyChoose = "For the bride who wants something different. Glastonbury offers spiritual experiences, alternative shops, and a mystical atmosphere. Perfect for creative, free-spirited hen parties who want meaning alongside the fun.";

    const activities = [
        {
            title: "Hen Party Life Drawing",
            description: "A creative, liberating activity that matches Glastonbury's free-spirited energy."
        },
        {
            title: "Glastonbury Tor Sunrise/Sunset",
            description: "Climb the iconic hill for breathtaking views and mystical energy."
        },
        {
            title: "Sound Bath & Meditation",
            description: "Numerous healers offer relaxing group experiences - unique and memorable."
        },
        {
            title: "Crystal Shopping & Readings",
            description: "Explore the High Street's spiritual shops - everyone finds something special."
        },
        {
            title: "Chalice Well Gardens",
            description: "Beautiful peaceful gardens around the legendary healing spring."
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`Unique Hen Party in ${CITY}`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
