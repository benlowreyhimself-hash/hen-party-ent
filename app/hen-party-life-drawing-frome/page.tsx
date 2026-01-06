import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Frome';
const ZONES = 'Town Centre • Mells • Nunney • Radstock • Shepton Mallet • All East Somerset';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? This trendy Somerset town is perfect for creative hen dos. Book Ben for a fun nude life drawing class. Mobile service across Somerset.`,
    keywords: ['hen party Frome', 'life drawing Frome', 'creative hen party ideas', 'hen weekend Somerset', 'artsy hen do'],
};

export default function FromePage() {
    const introText = (
        <>
            <p className="mb-4">
                {CITY} is one of the UK's coolest small towns - and it's becoming a hot spot for
                <strong> creative hen parties</strong>! This artsy Somerset gem is packed with
                independent shops, galleries, and great places to eat and drink.
            </p>
            <p className="mb-4">
                I love hosting life drawing sessions in Frome. The town's creative atmosphere means
                hen groups here really embrace the artistic side of the experience. It's always a
                brilliant, relaxed vibe.
            </p>
            <p className="mb-4">
                Whether you're in a converted mill apartment, a countryside cottage, or a boutique
                hotel, I'll travel to you with everything needed for an unforgettable session.
            </p>
        </>
    );

    const whyChoose = "Frome is officially one of the UK's coolest towns. Independent shops, amazing restaurants, and a creative community make it perfect for hen parties who want culture alongside the celebrations. Great value too!";

    const activities = [
        {
            title: "Hen Party Life Drawing",
            description: "The perfect activity for Frome's creative atmosphere - fun, artistic, and memorable."
        },
        {
            title: "Catherine Hill Independent Shops",
            description: "Gorgeous cobbled street with vintage shops, cafes, and galleries."
        },
        {
            title: "Rye Bakery Brunch",
            description: "Award-winning sourdough bakery - the perfect morning-after destination."
        },
        {
            title: "Wine Tasting at Griffin Inn",
            description: "Historic pub in nearby Mells - voted one of the best in the UK."
        },
        {
            title: "Nunney Castle Picnic",
            description: "Romantic medieval castle ruins just 3 miles away - great for group photos."
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`Creative Hen Party in ${CITY}`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
