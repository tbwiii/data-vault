"server only"
import { NextResponse } from 'next/server';
import { entries } from '@db';

export const GET = async (req:Request, { params }: { params: { slug: string } }) => {
    const entry = await entries.getEntryBySlug(params.slug);
    return NextResponse.json({ entry }, { status: 200 });
}
