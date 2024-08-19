"server only"
import { NextResponse } from 'next/server';
import { entries } from '@db';

export const GET = async (req:Request, { params }: { params: { entryId: string } }) => {
    const entry = await entries.getEntry(params.entryId);
    return NextResponse.json({ entry }, { status: 200 });
}


export const POST = async (req:Request) => {
    const entry = await req.json();
    const data = await entries.updateEntry(entry);
    return NextResponse.json({ data }, { status: 200 });
}