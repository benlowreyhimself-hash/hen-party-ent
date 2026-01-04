import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Cheltenham';
const ZONES = 'Cheltenham • The Cotswolds • Gloucester • Stroud • Tewkesbury';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? Book a fun, classy, and tasteful naked life drawing class with Ben. Mobile service visiting Cheltenham & The Cotswolds.`,
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function CheltenhamPage() {
    const introText = (
        <>
            <p className="mb-4">
                {CITY} is famous for its festivals and Regency architecture, making it a sophisticated choice for a hen party.
            </p>
            <p className="mb-4">
                A naked life drawing class fits perfectly with a classy Cheltenham weekend. I travel to you, bringing a professional and fun atmosphere to your accommodation.
            </p>
            <p className="mb-4">
                Whether you are renting a townhouse in Montpellier or a cottage in the nearby Cotswolds, I can ensure a memorable and fun event for the bride-to-be.
            </p>
        </>
    );

    const whyChoose = "The gateway to the Cotswolds. Cheltenham is famous for its horse racing and shopping. It’s an upscale choice with incredible wine bars and boutique hotels.";

    const activities = [
        {
            title: "Life Drawing Experience",
            description: "A memorable and giggly activity for the whole group in your accommodation."
        },
        {
            title: "Day at the Races",
            description: "Dress up for ladies' day at the world-famous Cheltenham Racecourse."
        },
        {
            title: "Cotswold Wine Tasting",
            description: "Visit nearby vineyards like Woodchester Valley for delicious local wines."
        },
        {
            title: "Pittville Park Boating",
            description: "Rent rowboats on the historic lake for some relaxing fun."
        },
        {
            title: "Perfume Making Workshop",
            description: "Design a signature scent for the wedding day - a lovely keepsake."
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`Classy Hen Parties in ${CITY}`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
