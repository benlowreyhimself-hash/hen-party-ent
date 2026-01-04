import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'The Cotswolds';
const ZONES = 'Cotswolds • Cirencester • Stow-on-the-Wold • Bourton-on-the-Water • Chipping Norton';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? Book a fun, classy, and tasteful naked life drawing class with Ben. Mobile service visiting barns and cottages across the Cotswolds.`,
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function CotswoldsPage() {
    const introText = (
        <>
            <p className="mb-4">
                {CITY} is the perfect location for a relaxing, high-end hen party weekend in a beautiful country house.
            </p>
            <p className="mb-4">
                My mobile life drawing service is ideal for this kind of getaway. I come to your rented barn or cottage, so you don't even need to leave the house!
            </p>
            <p className="mb-4">
                It's a wonderful way to spend an afternoon or evening, enjoying some creativity and laughter with your friends in stunning surroundings.
            </p>
        </>
    );

    const whyChoose = "The 'Hen Party in a House' destination. Instead of hitting clubs, this is about renting a massive barn conversion with a hot tub and having the entertainment come to you.";

    const activities = [
        {
            title: "Mobile Life Drawing (Ideally suited here)",
            description: "We come to your barn/cottage. No transport needed!"
        },
        {
            title: "Private Chef Hire",
            description: "Have a 3-course meal cooked in your kitchen for ultimate luxury."
        },
        {
            title: "Mobile Spa Treatments",
            description: "Massages and facials by the fire. Pure relaxation."
        },
        {
            title: "Clay Pigeon Shooting",
            description: "A classic country sport experience for the adventurous."
        },
        {
            title: "Yoga on the Lawn",
            description: "A Morning wellness session in the garden to clear the head."
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`Country House Hen Parties in ${CITY}`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
