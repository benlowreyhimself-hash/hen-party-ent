
import { seedGeminiHouses } from './seed-gemini';
import { seedGeminiHousesPart2 } from './seed-gemini-part2';

async function main() {
    console.log('Running Seed Part 1...');
    await seedGeminiHouses();

    console.log('\nRunning Seed Part 2...');
    await seedGeminiHousesPart2();
}

main().catch(console.error);
