import { Suspense } from 'react';
import EntryList from './EntryList';
import api from '@helpers/api';

export default async function RecentCreated() {
    const data = await api.$get('/entry?orderBy=updatedAt&limit=10&direction=desc');

    return (
        <div>
            <h2 className='font-bold mb-4'>Recently Edited</h2>
            <Suspense fallback={"loading..."}>
                <EntryList entries={data.entries} updatedAt={true}></EntryList>
            </Suspense>          
        </div>
    );
}