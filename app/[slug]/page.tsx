'use client';
import { useState, useEffect, Suspense } from 'react';
import { EntryType } from '@schema/entries';
import { Container } from '@mantine/core';
import Entry from './Entry';
import EntryForm from './EntryForm';
import api from '@/helpers/api';
import './markdown.css';

const getEntry = async (slug: string|null) => {
    const { entry } = await api.$get(`/${slug}`);
    return entry;
}

export default function EntryPage({ params }: { params: { slug: string|null } }) {
    const [editing, setEditing] = useState(params.slug === 'new');
    const [entry, setEntry] = useState<Partial<EntryType>>({
        title: '',
        body: '',
        slug: '',
        createdAt: '',
        updatedAt: '',
    });

    useEffect(() => {
        getEntry(params.slug).then(setEntry);
    }, [params.slug]);

    return (
        <main>
            <Suspense fallback={"loading..."}>
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
            </Suspense>
        </main>
    );
}