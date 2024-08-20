import { Button, Card, Title, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { EntryType } from '@schema/entries';
import api from '@helpers/api';
import slugOMatic from '@helpers/slugOMatic';

const saveEntry = async (values:Partial<EntryType>) => {
    return api.$post('/entries', {
        orderBy: 'createdAt',
        limit: 5,
        direction: 'desc',
    });
    return fetch(`/api/entry/${values.entryId ? values.entryId : 'new'}`, { 
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
     });
}

type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export default function EntryForm  (
    { entry, setEditing, setEntry }
    :{ 
        entry: Partial<EntryType>,
        setEditing: SetState<boolean>,
        setEntry: SetState<Partial<EntryType>> 
    }
) {
    const form = useForm({
        initialValues : entry,
    });

    const submit = async (values: Partial<EntryType>) => {
        setEditing(false);
        try {
            const res = await saveEntry(values);
            const { data } =  await res?.json() ?? [];
            setEntry(data[0]);
        } catch (error) {
            console.error(error);
        }
    }

    const slugPlaceholder = slugOMatic(form.values?.title);

    return (
        <form onSubmit={form.onSubmit((values) => submit(values))}>
            <div className="grid gap-4">
                <div className="flex">
                    <TextInput
                        className='grow'
                        placeholder='Title'
                        key="title"
                        {...form.getInputProps('title')}
                    />
                    <div className='flex gap-2'>
                        <Button
                            type="submit"
                            color="blue"
                            disabled={ !form.isDirty() }
                        >
                            Save
                        </Button>
                        <Button
                            type="submit"
                            color="gray"
                            onClick={ () => setEditing(false) }
                        >
                            Cancel
                        </Button>
                    </div>
                </div>

                <div>
                    <Textarea
                        variant="unstyled"
                        placeholder='content'
                        key="content"
                        autosize={true}
                        {...form.getInputProps('body')}
                    />
                </div>

                <Card
                    shadow="xs"
                    padding="md"
                    radius="md"
                >
                    <div className='grid gap-3'>
                        <Title order={3}>Metadata</Title>
                        <TextInput
                            placeholder={slugPlaceholder}
                            key="slug"
                            {...form.getInputProps('slug')}
                        />
                    </div>
                </Card>
            </div>
        </form>
    )
}