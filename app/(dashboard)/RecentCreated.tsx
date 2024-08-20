import { Suspense } from 'react';
import React from 'react';
import EntryList from './EntryList';



export default async function RecentCreated() {
    const data = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entries`,{
            method: "POST",
            cache: 'no-store',
            body: JSON.stringify({
                orderBy: 'createdAt',
                limit: 5,
                direction: 'desc',
            }),
        })
    ).json();

    return (
        <div>
            <h2 className='font-bold mb-4'>Recently Created</h2>
            <Suspense fallback={"loading..."}>
                <EntryList entries={data.entries} createdAt={true}></EntryList>
            </Suspense>          
        </div>
    );
}