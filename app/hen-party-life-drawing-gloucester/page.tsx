import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Gloucester';
const ZONES = 'Gloucester • The Docks • Cheltenham • Stroud • Forest of Dean • All Gloucestershire Areas';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY} or the Cotswolds? Book a fun, classy, and tasteful naked life drawing class with Ben. Mobile service.`,
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function GloucesterPage() {
    const introText = (
        <>
            <p className="mb-4">
                If you're planning a hen party in {CITY} or the surrounding countryside, a life drawing class is a wonderful idea.
            </p>
            <p className="mb-4">
                I'm based very nearby so I can easily travel to your accommodation in {CITY}, Cheltenham, or the beautiful Cotswolds villages nearby. It's a classy and fun activity that suits groups of all ages.
            </p>
            <p className="mb-4">
                The session is relaxed and full of laughter, making it a great way to bond with the group.
            </p>
        </>
    );

    return (
        <LocationPageTemplate
            city={CITY}
            faqLocation="Gloucester & Cheltenham"
            introTitle={`Life Drawing in ${CITY} & The Cotswolds`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
        />
    );
}
