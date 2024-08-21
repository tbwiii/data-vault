import { Suspense } from 'react';
import React from 'react';
import EntryList from './EntryList';
import api from '@helpers/api';

export default async function RecentCreated() {
    const data = await api.$get('/entry?orderBy=createdAt&limit=10&direction=desc');
    return (
        <div>
            <h2 className='font-bold mb-4'>Recently Created</h2>
            <Suspense fallback={"loading..."}>
                <EntryList entries={data.entries} createdAt={true}></EntryList>
            </Suspense>          
        </div>
    );
}