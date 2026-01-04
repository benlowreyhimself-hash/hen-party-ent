import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Swindon';
const ZONES = 'Swindon • Wiltshire • Chippenham • Cirencester • Marlborough';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? Book a fun, classy, and tasteful naked life drawing class with Ben. Mobile service visiting Swindon & Wiltshire.`,
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function SwindonPage() {
    const introText = (
        <>
            <p className="mb-4">
                If you're hosting a hen party in {CITY} or the beautiful Wiltshire countryside, I'd love to be your life drawing model!
            </p>
            <p className="mb-4">
                I'm based nearby and can easily travel to your venue. Whether you're in a town centre hotel or a converted barn in the country, I bring the entertainment to you.
            </p>
            <p className="mb-4">
                My sessions are known for being friendly, professional, and great fun for groups of all ages.
            </p>
        </>
    );

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`Fun Life Drawing in ${CITY}`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
        />
    );
}
