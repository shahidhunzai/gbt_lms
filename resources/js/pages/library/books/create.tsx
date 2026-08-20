import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function BookCreate() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');

    const submit = (e: any) => {
        e.preventDefault();
        router.post(route('books.store'), { title, author });
    };

    return (
        <AppLayout>
            <Head title="Create Book" />
            <form onSubmit={submit} className="space-y-4 p-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium">Author</label>
                    <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </AppLayout>
    );
}
