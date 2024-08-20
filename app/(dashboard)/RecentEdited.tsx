import { Suspense } from 'react';
import EntryList from './EntryList';
import { $post } from '@helpers/api';

export default async function RecentCreated() {
    
    const data = await $post('/entries', {
        orderBy: 'updatedAt',
        limit: 5,
        direction: 'desc',
    });

    return (
        <div>
            <h2 className='font-bold mb-4'>Recently Edited</h2>
            <Suspense fallback={"loading..."}>
                <EntryList entries={data.entries} updatedAt={true}></EntryList>
            </Suspense>          
        </div>
    );
}