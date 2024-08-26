
import Entry from './Entry';
import { auth } from '@lib/auth';
import { getEntryBySlug } from '@schema/entries';
import { Suspense } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import './markdown.css';

export default async function EntryPage({ params }: { params: { slug: string } }) {
    let session = await auth();
    let user = session?.user;

    const slug = params.slug.replace(/%20/g, '-');
    const inferredTitle = params.slug.replace(/%20/g, ' ');
    return (
        <main>
            <Suspense fallback={
                <div className="container m-auto mt-12 grid gap-8 opacity-60">
                    <Skeleton className='w-full h-40 roudned' />
                    <div className=''>
                        {Array.from({ length: 20 }).map((_, index) => (
                            <Skeleton key={index} className={`mb-3 w-1/2 h-5 rounded-full`} />
                        ))}
                    </div>
                </div>
            }>
                <Entry inferredTitle={inferredTitle} user={user} entry={await getEntryBySlug(slug)} />
            </Suspense>
        </main>
    );
}
