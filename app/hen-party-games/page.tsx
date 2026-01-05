import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Top 10 Hen Party Games | Fun & Classy Ideas (2025)',
    description: 'Curated list of the best hen party games that are classy, fun, and inclusive. Perfect for ice-breaking without the cringe. Activities for all ages.',
};

export default function HenPartyGamesPage() {
    const games = [
        {
            title: "1. The Mr. & Mrs. Quiz (The Classic)",
            description: "The ultimate test of how well the bride really knows her fiancé. This is the #1 most popular hen party game for a reason.",
            need: "A list of 15-20 questions sent to the groom in advance (record his answers on video if possible!).",
            play: 'Sit the bride in the centre of the room. Ask her a question (e.g., "What is his most annoying habit?" or "Who is the better driver?"). If she matches the groom\'s answer, she’s safe. If she gets it wrong, she takes a sip of her drink or does a forfeit.',
            fun: "It puts the spotlight on the bride and usually reveals some hilarious secrets about the couple.",
            tip: "Play this just after dinner to get the energy back up before the evening entertainment starts."
        },
        {
            title: "2. Prosecco Pong",
            description: "A classy twist on the American college classic \"Beer Pong.\"",
            need: "A ping pong table (or dining table), plastic prosecco coupes (or standard plastic cups), ping pong balls, and plenty of fizz.",
            play: "Split the group into two teams at opposite ends of the table. Arrange 6 cups in a triangle at each end. Teams take turns throwing a ball into the opponent's cups. If it lands in, the opponent drinks the glass. The first team to clear the table wins.",
            fun: "It’s active, competitive, and gets everyone cheering.",
            tip: "If you are in a rental house, this is a great garden game if the weather is nice."
        },
        {
            title: "3. Draw The Groom (The Artistic Challenge)",
            description: "Since you’re booking a life drawing class, this is the perfect warm-up!",
            need: "Cheap paper plates and pens.",
            play: "Everyone places a paper plate on top of their own head. Without looking, they have 60 seconds to draw a portrait of the groom. The results will be terrible and hilarious. The bride picks the winner.",
            fun: "It levels the playing field—even artists will struggle to draw on top of their own heads!",
            tip: "Keep the best drawings to show the real life model when he arrives—or stick them on the fridge for the weekend."
        },
        {
            title: "4. The \"Toilet Paper Couture\" Challenge",
            description: "Don’t roll your eyes—this classic can be genuinely high-fashion if you add a competitive edge.",
            need: "10+ rolls of cheap toilet paper and some sticky tape.",
            play: "Split the group into teams of 3 or 4. Pick one person per team to be the model. The teams have 10 minutes to create a \"Couture Wedding Dress\" using only toilet paper. Put on some runway music and have a fashion show at the end.",
            fun: "It forces people to work together and get creative. You’ll be surprised at how competitive it gets!",
        },
        {
            title: "5. \"Guess the Memory\"",
            description: "A sentimental ice-breaker that connects the group.",
            need: "Post-it notes (or small cards), pens, and a bowl.",
            play: "Everyone writes down a short, funny, or sweet memory they have with the bride (e.g., \"The time we got lost in Barcelona\" or \"School chemistry lessons\"). Fold them up and put them in a bowl. The bride reads them out one by one and has to guess who wrote it.",
            fun: "It’s a lovely way to introduce friends from different parts of the bride's life (e.g., school friends vs. work colleagues).",
        }
    ];

    const gamesPart2 = [
        {
            title: "6. Pass the Parcel (The Hen Edition)",
            description: "Nostalgic fun with a grown-up twist.",
            need: "A prize wrapped in multiple layers of paper. Between each layer, write a dare or a forfeit.",
            play: "Just like the kids' version—play music and pass the parcel. When the music stops, unwrap a layer and do the dare (e.g., \"Do an impression of the groom\" or \"Make a toast to the bride\").",
            fun: "Everyone knows the rules, and it builds suspense. Make the final prize something nice, like a mini bottle of gin or a face mask.",
        },
        {
            title: "7. Two Truths and a Lie",
            description: "The perfect game for groups who don’t know each other well.",
            need: "Nothing! Just drinks.",
            play: "Go around the circle. Each person states three \"facts\" about themselves—two are true, one is a lie. The group votes on which one is the lie.",
            fun: "It’s a great conversation starter and you learn fascinating things about the other guests.",
        },
        {
            title: "8. The \"Date Night\" Jar",
            description: "A gift that keeps on giving after the wedding.",
            need: "A mason jar, wooden lolly sticks (or nice cardstock), and pens.",
            play: "Ask every hen to write a date night idea on a stick. It can be simple (\"Cook a meal together\") or adventurous (\"Go rock climbing\"). Put them all in the jar for the bride to take home.",
            fun: "It’s a creative, low-pressure activity that leaves the bride with a meaningful keepsake.",
        },
        {
            title: "9. Gin Tasting Challenge (DIY)",
            description: "A sophisticated activity that saves money compared to hiring a pro.",
            need: "3 or 4 different bottles of gin (decant them into plain jugs so nobody sees the labels), tonic, and garnishes.",
            play: "Blind taste test! Pour a small measure of each for everyone. Have the group rate them and try to guess which is the \"expensive\" craft gin and which is the supermarket brand.",
            fun: "It feels fancy but is actually very easy to set up in an Airbnb.",
        },
        {
            title: "10. Scavenger Hunt (The Photo Challenge)",
            description: "Get everyone out of the house and interacting with the locals.",
            need: "A printed list of photo challenges.",
            play: "Split into teams. They have one hour to capture photos of items on the list. Classy examples: \"A photo with a man in a uniform,\" \"The group posing like Charlie’s Angels,\" \"A stranger giving marriage advice.\"",
            fun: "It creates an album of photos from the weekend that aren't just selfies.",
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-gray-900">
                The 10 Best Hen Party Games <span className="text-primary block text-3xl mt-2">(Fun & Classy Ideas)</span>
            </h1>

            <p className="text-lg text-gray-700 leading-relaxed text-center max-w-2xl mx-auto mb-16">
                Planning a hen do can be stressful, but the entertainment doesn't have to be. We’ve curated the top 10 hen party games that strike the perfect balance between fun, creative, and classy. Whether you are breaking the ice or ramping up the energy, these games are guaranteed crowd-pleasers.
            </p>

            {/* Part 1 */}
            <div className="space-y-12">
                {games.map((game, index) => (
                    <GameCard key={index} game={game} />
                ))}
            </div>

            {/* Mid-Article CTA */}
            <div className="my-16 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Looking for the ultimate Hen Party activity?</h3>
                <p className="text-lg text-gray-700 mb-6">Book Ben for a classy, fun Life Drawing class that’s perfect for breaking the ice.</p>
                <Link
                    href="/contact"
                    className="inline-block bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    Check Availability
                </Link>
            </div>

            {/* Part 2 */}
            <div className="space-y-12">
                {gamesPart2.map((game, index) => (
                    <GameCard key={index} game={game} />
                ))}
            </div>

            {/* Final CTA */}
            <div className="mt-20 bg-gray-900 text-white rounded-3xl p-10 md:p-16 text-center shadow-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Plan the Perfect Weekend</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    From life drawing to games, make it a celebration to remember.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/contact"
                        className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors text-lg"
                    >
                        Check Availability
                    </Link>
                    <Link
                        href="/prices"
                        className="bg-white/10 text-white border border-white/20 font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors text-lg"
                    >
                        View Prices
                    </Link>
                </div>
            </div>
        </div>
    );
}

function GameCard({ game }: { game: any }) {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{game.title}</h2>
            <p className="text-gray-600 italic mb-6 text-lg">{game.description}</p>

            <div className="space-y-4">
                <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">What you need:</h4>
                    <p className="text-gray-700">{game.need}</p>
                </div>

                <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">How to play:</h4>
                    <p className="text-gray-700">{game.play}</p>
                </div>

                <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Why it's fun:</h4>
                    <p className="text-gray-700">{game.fun}</p>
                </div>

                {game.tip && (
                    <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                        <p className="text-gray-800">
                            <span className="font-bold">💡 Ben’s Pro Tip:</span> {game.tip}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
