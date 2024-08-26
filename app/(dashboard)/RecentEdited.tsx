import { Suspense } from 'react';
import { getEntreies } from '@schema/entries';
import EntryList from './EntryList';

export default async function RecentCreated() {
    const { entries } = await getEntreies({ orderBy: 'updatedAt', limit: 10, direction: 'desc', where: { private: false } });

    return (
        <div>
            <h2 className='font-bold mb-4'>Recently Edited</h2>
            <Suspense fallback={"loading..."}>
                <EntryList entries={entries} updatedAt={true}></EntryList>
            </Suspense>          
        </div>
    );
}