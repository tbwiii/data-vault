import { Suspense } from 'react';
import React from 'react';
import EntryList from './EntryList';
import { getEntreies } from '@schema/entries';

export default async function RecentCreated() {
    const { entries } = await getEntreies({ orderBy: 'createdAt', limit: 10, direction: 'desc' });
    return (
        <div>
            <h2 className='font-bold mb-4'>Recently Created</h2>
            <Suspense fallback={"loading..."}>
                <EntryList entries={entries} createdAt={true}></EntryList>
            </Suspense>          
        </div>
    );
}