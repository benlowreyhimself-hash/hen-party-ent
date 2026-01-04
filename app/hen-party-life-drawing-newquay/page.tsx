import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Newquay';
const ZONES = 'Newquay • Fistral Beach • Watergate Bay • Crantock • Porth';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? Book a fun, classy, and tasteful naked life drawing class with Ben. Mobile service visiting Newquay & Cornwall.`,
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function NewquayPage() {
    const introText = (
        <>
            <p className="mb-4">
                Thinking of a hen party in {CITY}? It's a fantastic spot for sun, surf, and celebration!
            </p>
            <p className="mb-4">
                To balance out the outdoor adventures, why not book a private life drawing class? I travel to {CITY} to provide a fun, relaxed, and memorable activity that brings everyone together indoors (or outdoors if the weather is amazing!).
            </p>
            <p className="mb-4">
                It's a great way to have a laugh and try something new before heading out to enjoy the famous Newquay nightlife.
            </p>
        </>
    );

    const whyChoose = "The surf capital of the UK. If your bride loves the outdoors, wetsuits, and beach fires, Newquay is the unbeatable choice for an active hen weekend.";

    const activities = [
        {
            title: "Naked Life Drawing",
            description: "A creative break from the physical activities. Fun, relaxed, and tasteful."
        },
        {
            title: "Surf Lessons",
            description: "Get wet and wild with group lessons on the famous Fistral Beach."
        },
        {
            title: "Coasteering",
            description: "For the brave! Jumping off cliffs into the sea (safely guided, of course!)."
        },
        {
            title: "Silent Disco Beach Yoga",
            description: "Relaxing mindfulness by the ocean with headphones. Very Zen."
        },
        {
            title: "Cornish Cider Farm Tour",
            description: "Visit Healeys Cyder Farm for tastings of the local brew."
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`Surf, Sand & Art in ${CITY}`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
