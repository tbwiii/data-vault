import { Container } from '@mantine/core';
import { EntryType } from '@schema/entries';
import { IconEdit, IconClockEdit, IconCalendar } from '@tabler/icons-react';
import relativeTimeOTron from "@/helpers/relativeTimeOTron";
import Markdown from 'react-markdown'
type SetState<T> = React.Dispatch<React.SetStateAction<T>>

const Entry = ({ title, body, createdAt, updatedAt, setEditing }: Partial<EntryType|null> & { setEditing: SetState<boolean> }) => {
    return (
        <div
            className=''
        >
            <div className='bg-neutral-900 relative group hover:cursor-pointer' onClick={ () => setEditing(true) }>
                <span className='absolute
                    bottom-0
                    left-0
                    w-full
                    h-0.5
                    bg-stone-700'
                ></span>
                <Container className='h-48 flex items-center'>
                    <h1 
                        className='text-4xl font-bold relative'
                    >
                        { title }
                    </h1>
                </Container>
                <span className='
                    absolute
                    flex
                    items-center
                    justify-center
                    bottom-0
                    left-0
                    w-full
                    h-full
                    bg-black
                    bg-opacity-40
                    opacity-0
                    transition-all
                    group-hover:opacity-100'
                >
                    <IconEdit size={100}/>
                </span>
            </div>
            <div>
                <Container className="grid gap-8 py-8">
                    <Markdown className='markdown-body text-gray-300'>{ body }</Markdown>
                    <aside>
                        <span className='flex gap-2 items-center'>
                            <IconCalendar size='16' />
                            { createdAt ? relativeTimeOTron(createdAt!) : "" }
                        </span>
                        <span className='flex gap-2 items-center'>
                            <IconClockEdit size='16' />
                            { updatedAt ? relativeTimeOTron(updatedAt!) : ""}
                        </span>
                    </aside>
                </Container>
            </div>
        </div>
    );
}

export default Entry;