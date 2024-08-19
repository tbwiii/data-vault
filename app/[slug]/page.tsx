'use client';

import { useState, useEffect } from 'react';
import Markdown from 'react-markdown'
import './markdown.css';
import { Entry } from '@schema/entries';
import EntryForm from './EntryForm';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>

const Content = ({ title, body, createdAt, setEditing }: Partial<Entry|null> & { setEditing: SetState<boolean> }) => {
    return (
        <div
            className='grid gap-3'
        >
            <h1 
                className='text-4xl font-bold'
                onClick={ () => setEditing(true) }
            >{ title }</h1>
            <span>{ createdAt }</span>
            <div onClick={ () => setEditing(true) }>
                <Markdown className='markdown-body text-gray-300'>{ body }</Markdown>
            </div>
        </div>
    );
}

export default function EntryPage({ params }: { params: { slug: string } }) {
    const [editing, setEditing] = useState(false);
    const [entry, setEntry] = useState<Partial<Entry>>({
        title: '',
        body: '',
        slug: '',
        createdAt: '',
    });

    useEffect(() => {
        if (!params.slug || params.slug === 'new') {
            setEditing(true);
            return;
        }

        const entryFetch = async () => {
            const { entry } = await (
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entry/11`)
            ).json();
            
            setEntry(entry);
        };

        try {
            entryFetch()
        } catch (error) {
            console.error(error); 
        }

    }, []);

    return (
        <div className='p-8'>
            { 
                editing 
                    ? <EntryForm 
                        entry={ entry }
                        setEntry={ setEntry }
                        setEditing={ setEditing }
                    /> 
                    : <Content 
                        title={entry?.title}
                        body={entry?.body}
                        setEditing={ setEditing }
                    />
            }   
        </div>
    );
}