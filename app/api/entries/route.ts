"server only"
import { NextResponse } from 'next/server';
import { entries } from '@db';

export const POST = async (req:Request) => {
    const { limit, offset, orderBy, direction } = await req.json();
    const res = await entries.getEntreies({ limit, offset, orderBy, direction });
    return NextResponse.json({ entries: res }, { status: 200 });
}