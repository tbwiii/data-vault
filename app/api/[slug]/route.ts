"server only"
import { NextResponse } from 'next/server';
import { entries } from '@db';

export const GET = async (req:Request, { params }: { params: { slug: string } }) => {
    const slug = params.slug.replace(/%20/g, '-');
    const entry = await entries.getEntryBySlug(slug);
    return NextResponse.json({ entry }, { status: 200 });
}
