"server only"
import { NextResponse } from 'next/server';
import { entries } from '@db';

export const POST = async (req:Request) => {
    const entry = await req.json();
    const data = await entries.createEntry(entry);
    return NextResponse.json({ data }, { status: 200 });
}