'use client';
import { useState, useEffect } from 'react';
import { EntryType } from '@schema/entries';
import { Container } from '@mantine/core';
import Entry from './Entry';
import EntryForm from './EntryForm';
import './markdown.css';

export default function EntryPage({ params }: { params: { slug: string } }) {
    const [editing, setEditing] = useState(false);
    const [entry, setEntry] = useState<Partial<EntryType>>({
        title: '',
        body: '',
        slug: '',
        createdAt: '',
        updatedAt: '',
    });

    useEffect(() => {
        if (!params.slug || params.slug === 'new') {
            setEditing(true);
            return;
        }

        const entryFetch = async () => {
            const { entry } = await (
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${params.slug}`)
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
        <main>
            { editing 
                ? <Container>
                    <EntryForm 
                        entry={ entry }
                        setEntry={ setEntry }
                        setEditing={ setEditing }
                    /> 
                </Container>
                : <Entry 
                    { ...entry }
                    setEditing={ setEditing }
                />
            }   
        </main>
    );
}