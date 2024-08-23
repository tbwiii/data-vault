'use client';
import Link from 'next/link';
import { IconClockEdit, IconCalendar, IconNotes } from '@tabler/icons-react';
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
        setHydratedEntries(entries.map((entry:EntryType) => {
            return {
                ...entry,
                createdAt: relativeTimeOTron(entry.createdAt),
                updatedAt: relativeTimeOTron(entry.updatedAt)
            }
        })
    )})
    
    return (
      <div className='grid gap-1'>
        {hydratedEntries.map((entry:EntryType) => (
            <Link href={`/${entry.slug}`} key={entry.title}>
                <div className='p-4 rounded
                        bg-neutral-900
                        shadow-md
                        group
                        relative
                        grid gap-2'
                >
                    <span className='absolute
                        bottom-0
                        left-0
                        w-0
                        h-0.5
                        bg-sky-700
                        group-hover:w-full
                        transition-all'
                    >
                    </span>
                    <h2 className='flex gap-2 items-center group-hover:text-sky-600'><IconNotes size="18" />{entry.title}</h2>
                    <div className='text-xs text-gray-500'>
                        {entry.createdAt && <span className='flex gap-2 items-center'>
                            <IconCalendar size='16' /> 
                            {entry.createdAt}
                        </span>}
                        {entry.updatedAt && <span className='flex gap-2 items-center'>
                            <IconClockEdit size='16' />
                            {entry.updatedAt}
                        </span>}
                    </div>
                </div>
            </Link>
        ))}
      </div>
    );
  };

  export default EntryList;