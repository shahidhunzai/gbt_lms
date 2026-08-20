import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function EventEdit({ event }: any) {
    const [title, setTitle] = useState(event?.title || '');
    const [description, setDescription] = useState(event?.description || '');
    const [startsAt, setStartsAt] = useState(event?.starts_at || '');
    const [endsAt, setEndsAt] = useState(event?.ends_at || '');

    const submit = (e: any) => {
        e.preventDefault();
        router.put(route('events.update', event.id), { title, description, starts_at: startsAt, ends_at: endsAt });
    };

    return (
        <AppLayout>
            <Head title="Edit Event" />
            <form onSubmit={submit} className="space-y-4 p-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium">Starts At</label>
                    <Input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium">Ends At</label>
                    <Input type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} />
                </div>
                <div>
                    <Button type="submit">Update</Button>
                </div>
            </form>
        </AppLayout>
    );
}
