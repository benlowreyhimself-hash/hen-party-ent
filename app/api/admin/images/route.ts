
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const dir = path.join(process.cwd(), 'public', 'temp_images');

    if (!fs.existsSync(dir)) {
        return NextResponse.json({ files: [] });
    }

    const filenames = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'));

    const files = filenames.map(name => ({
        name,
        size: fs.statSync(path.join(dir, name)).size,
        url: `/temp_images/${name}`
    }));

    return NextResponse.json({
        files,
        nextCursor: null
    });
}
