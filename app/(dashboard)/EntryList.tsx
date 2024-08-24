'use client';
import Link from 'next/link';
import {Card, CardHeader, CardTitle, CardContent} from '@components/ui/card';
import { Pencil2Icon, CalendarIcon, FileTextIcon } from '@radix-ui/react-icons'

import { EntryType } from '@schema/entries';
import relativeTimeOTron from '@util/relativeTimeOTron';
import { useState, useEffect } from 'react';

interface EntryListProps {
    entries: EntryType[];
    createdAt?: boolean;
    updatedAt?: boolean;
}

const EntryList: React.FC<EntryListProps> = ({ entries, createdAt, updatedAt }) => {

    const [hydratedEntries, setHydratedEntries] = useState<EntryType[]>([]);

    useEffect(() => {
        setHydratedEntries(entries.map((entry: EntryType) => {
            return {
                ...entry,
                createdAt: relativeTimeOTron(entry.createdAt),
                updatedAt: relativeTimeOTron(entry.updatedAt)
            };
        }));
    }, [entries]);
    
    return (
      <div className='grid gap-1'>
        {hydratedEntries.map((entry:EntryType) => (
            <Link href={`/${entry.slug}`} key={entry.title}>
                <Card className='group relative px-3 py-3 grid gap-2 overflow-hidden'>
                    <CardTitle>
                        <FileTextIcon />{entry.title}
                    </CardTitle>
                    <div className=' flex gap-3 text-xs'>
                        {entry.createdAt && <span className='flex gap-2 items-center'>
                            <CalendarIcon /> 
                            {entry.createdAt}
                        </span>}
                        {entry.updatedAt && <span className='flex gap-2 items-center'>
                            <Pencil2Icon />
                            {entry.updatedAt}
                        </span>}
                    </div>
                    <span className='absolute
                            bottom-0
                            left-0
                            w-0
                            h-0.5
                            bg-azure-700
                            group-hover:w-full
                            transition-all'
                        >
                        </span>
                </Card>
            </Link>
        ))}
      </div>
    );
  };

  export default EntryList;