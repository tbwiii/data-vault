'use client';
import { EntryType } from '@schema/entries';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { 
    IconEdit,
    IconLink,
    IconClockEdit,
    IconCalendar,
    IconTrash,
    IconCancel,
    IconDeviceFloppy,
    IconStack2 } from '@tabler/icons-react';
import {
        EntryForm,
        EntryFormTitle,
        EntryFormBody} from './EntryForm'
import MenuBar from './menu-bar'
import { MenuButtonType } from './menu-bar';
import Markdown from 'react-markdown';
import BlurFade from "@/components/magicui/blur-fade";
import HyperText from "@/components/magicui/hyper-text";
import relativeTimeOTron from "@util/relativeTimeOTron";
import slugOMatic from "@util/slugOMatic";
import Meta from './Meta'
import remarkGfm from 'remark-gfm';
import api from '@lib/api';

type EntryPropsType = {
    entry: EntryType;
    inferredTitle: string;
}

const confirmDelete = async (entryId:number) => {    
    if (!confirm('Are you sure you want to delete this entry?')) {
        console.log('cancelled');
        return
    }

    try {
        await api.$delete(`/entry/`, { entryId });
        window.location.href = '/';
    } catch (error) {
        console.error(error);
    }
}

const Entry = (props:EntryPropsType) => {
    const [editing, setEditing] = useState(!props.entry?.entryId);
    const [metaVisible, setMetaVisible] = useState(false);
    const [entry, setEntry] = useState(props.entry);

    const saveEntry = async (values:Partial<EntryType>) => {
        if (!values.entryId) {  
            return await api.$post('/entry', values);
        } else {                
            return await api.$put(`/entry`, values);
        }
    }
    
    const entryFormObj = useForm({
        initialValues : props.entry?.entryId ? entry : { title: props.inferredTitle, body: ''},
    });

    const submit = async (values: Partial<EntryType>) => {
        try {
            const { entry } = await saveEntry(values);
            setEntry(entry);
            setEditing(false);
        } catch (error) {
            console.error(error);
        }
    }

    const buttons:MenuButtonType[] = [
        { 
            label: 'Edit',
            icon: IconEdit,
            classes: 'hover:bg-sky-900 hover:text-sky-200',
            visible: !editing,
            onClick: () => setEditing(true)
        },
        { 
            label: 'Save',
            icon: IconDeviceFloppy,
            classes: 'hover:bg-sky-900 hover:text-sky-200',
            visible: editing,
            disabled: !entryFormObj.isDirty(),
            type: 'submit'
        },
        { 
            label: 'Meta',
            icon: IconStack2,
            classes: '',
            visible: true,
            onClick: () => setMetaVisible(!metaVisible)
        },
        { 
            label: 'Cancel',
            icon: IconCancel,
            classes: 'hover:bg-orange-900 hover:text-orange-200',
            visible: editing,
            onClick: () => setEditing(false)
        },
        { 
            label: 'Delete',
            icon: IconTrash,
            classes: 'hover:bg-red-900 hover:text-red-200',
            visible: editing,
            onClick: () => confirmDelete(entry.entryId)
        },
    ];
    const slugPlaceholder = slugOMatic(entryFormObj.values?.title) ?? null;

    const metadataArr = [
        { label: 'Slug', value: entry?.slug ?? slugPlaceholder, icon: <IconLink size="16" /> },
        { label: 'Created', value: relativeTimeOTron(entry?.createdAt) || '--', icon: <IconCalendar size="16" /> },
        { label: 'Updated', value: relativeTimeOTron(entry?.updatedAt) || '--', icon: <IconClockEdit size="16" /> }
    ]

    return (
        <div>
            <EntryForm form={entryFormObj} submit={ submit }>
                <div className='bg-neutral-900 relative flex items-center min-h-48 py-12'>
                    <div className='container m-auto items-center'>
                        { !editing && (
                            <HyperText
                                text={entry.title ?? "New Entry"}
                                className="text-4xl font-bold text-gray-200"
                            />)
                        }                       
                        { editing && (
                            <BlurFade delay={0.15} yOffset={-6} inView>
                                <EntryFormTitle form={entryFormObj} />
                            </BlurFade>
                        )}
                    </div>
                </div>
                <div className='grid gap-8 mb-8'>
                    <MenuBar buttons={buttons} />
                    {metaVisible && (
                        <BlurFade delay={0.15} yOffset={-6} inView>
                            <div className='container m-auto'>
                                <Meta className="p-8  bg-stone-900 border-stone-400 rounded text-stone-400" metadataArr={metadataArr} />
                            </div>
                        </BlurFade>
                    )}
                </div>
                <div>
                    <div className={`container m-auto grid gap-8 py-8 transition-all ${editing ? '' : '-translate-x-1/2' }`}>
                        <div className='grid gap-10 grid-cols-2'>
                            <EntryFormBody className={`bg-white bg-opacity-5  ${editing ? '' : 'opacity-0' }`} form={entryFormObj} />
                            <Markdown 
                                className='markdown-body text-gray-200'
                                remarkPlugins={[remarkGfm]}
                            >
                                { entryFormObj.values.body }
                            </Markdown>
                        </div>
                    </div>
                </div>
            </EntryForm>
        </div>
    );
}

export default Entry;