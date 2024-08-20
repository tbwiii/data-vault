import { Suspense } from 'react';
import React from 'react';
import EntryList from './EntryList';
import { $post } from '@helpers/api';

export default async function RecentCreated() {
    const data = await $post('/entries', {
        orderBy: 'createdAt',
        limit: 5,
        direction: 'desc',
    });

    return (
        <div>
            <h2 className='font-bold mb-4'>Recently Created</h2>
            <Suspense fallback={"loading..."}>
                <EntryList entries={data.entries} createdAt={true}></EntryList>
            </Suspense>          
        </div>
    );
}