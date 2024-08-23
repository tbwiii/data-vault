
import Entry from './Entry';
import { getEntryBySlug } from '@schema/entries';
import { Suspense } from 'react';
import './markdown.css';

export default async function EntryPage({ params }: { params: { slug: string } }) {
    const slug = params.slug.replace(/%20/g, '-');
    const inferredTitle = params.slug.replace(/%20/g, ' ');
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <Entry inferredTitle={inferredTitle} entry={await getEntryBySlug(slug)} />
            </Suspense>
        </main>
    );
}
