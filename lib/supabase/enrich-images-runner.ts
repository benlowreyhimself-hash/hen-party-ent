
import { enrichHouseImages } from './enrich-images';

async function main() {
    await enrichHouseImages();
}

main().catch(console.error);
