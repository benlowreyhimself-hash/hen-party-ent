import { Metadata } from 'next';
import LocationPageTemplate from '@/components/LocationPageTemplate';

const CITY = 'London';
const ZONES = 'Central London • Shoreditch • Soho • Clapham • Camden • All London Boroughs';

export const metadata: Metadata = {
    title: `Hen Party Life Drawing ${CITY} | Mobile Model Ben`,
    description: `Planning a hen party in ${CITY}? Book a fun, classy, and tasteful naked life drawing class with Ben. Visiting Shoreditch, Soho, and all London areas.`,
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function LondonPage() {
    const introText = (
        <>
            <p className="mb-4">
                Organising a hen party in {CITY} requires entertainment that stands out!
            </p>
            <p className="mb-4">
                My life drawing classes are a popular choice for groups visiting the capital. I travel to apartments and hotels across London, from Shoreditch to Kensington.
            </p>
            <p className="mb-4">
                It's a fantastic way to bring the group together for some focused fun before heading out to enjoy London's world-class nightlife.
            </p>
        </>
    );

    const whyChoose = "The city that has it all. Whether you want a wild night in Soho or a hipster brunch in Shoreditch, London is the ultimate playground.";

    const activities = [
        {
            title: "Life Drawing Class",
            description: "A private escape from the busy city streets. Fun and creative."
        },
        {
            title: "West End Musical",
            description: "Mamma Mia or Magic Mike Live are absolute hen favourites."
        },
        {
            title: "Ballie Ballerson",
            description: "A giant adult ball pit cocktail bar in Shoreditch. Unique fun!"
        },
        {
            title: "Afternoon Tea at The Shard",
            description: "Unbeatable views of the capital with luxury dining."
        },
        {
            title: "Thames Speedboat Experience",
            description: "See the sights at 30mph - James Bond style!"
        }
    ];

    return (
        <LocationPageTemplate
            city={CITY}
            introTitle={`Stylish Hen Parties in ${CITY}`}
            introText={introText}
            zones={ZONES}
            metaDescription={metadata.description as string}
            whyChoose={whyChoose}
            activities={activities}
        />
    );
}
