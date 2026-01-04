import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'Bath';
const ZONES = 'Bath City Centre • Camden • Lansdown • Combe Down • Batheaston • All Bath Areas';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? Book a fun, classy, and tasteful naked life drawing class with Ben. Mobile service visiting City Centre and surrounding areas.`,
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function BathPage() {
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

    const whyChoose = "The ultimate destination for a classy hen do. Famous for its honey-coloured architecture and natural thermal spas, Bath offers a slower, more indulgent pace than nearby Bristol.";

    const activities = [
        {
            title: "Mobile Life Drawing (The Classy Choice)",
            description: "A tasteful art class in your rental property. Friendly, fun, and memorable."
        },
        {
            title: "Thermae Bath Spa",
            description: "The only natural thermal spa in Britain with a stunning rooftop pool overlooking the city."
        },
        {
            title: "Afternoon Tea at The Pump Room",
            description: "Enjoy a Bridgerton-style fine dining experience in a beautiful historic setting."
        },
        {
            title: "Jane Austen Centre Tour",
            description: "Perfect for literary lovers and period drama fans visiting the city."
        },
        {
            title: "Gin Making at The Canary Gin Bar",
            description: "Create your own custom botanical blends in this famous Bath gin bar."
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
