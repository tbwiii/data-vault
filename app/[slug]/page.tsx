
import Entry from './Entry';
import { auth } from '@lib/auth';
import { getEntryBySlug } from '@schema/entries';
import { Suspense } from 'react';
import './markdown.css';

export default async function EntryPage({ params }: { params: { slug: string } }) {
    let session = await auth();
    let user = session?.user;

    const slug = params.slug.replace(/%20/g, '-');
    const inferredTitle = params.slug.replace(/%20/g, ' ');
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <Entry inferredTitle={inferredTitle} user={user} entry={await getEntryBySlug(slug)} />
            </Suspense>
        </main>
    );
}
