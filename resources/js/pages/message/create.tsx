import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function MessageCreate({ users }: any) {
    const { errors } = usePage().props as any;
    const [userId, setUserId] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const submit = (e: any) => {
        e.preventDefault();
        router.post(route('messages.store'), { user_id: userId || null, subject, body });
    };

    return (
        <AppLayout>
            <Head title="Create Message" />
            <form onSubmit={submit} className="space-y-4 p-4">
                <div>
                    <label className="block text-sm font-medium">Recipient</label>
                    <select value={userId} onChange={(e) => setUserId(e.target.value)} className="w-full rounded-md border border-input px-3 py-2">
                        <option value="">-- Select User (optional) --</option>
                        {users?.map((u: any) => (
                            <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                        ))}
                    </select>
                    {errors?.user_id && <p className="text-sm text-red-600">{errors.user_id}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Subject</label>
                    <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
                    {errors?.subject && <p className="text-sm text-red-600">{errors.subject}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Body</label>
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} className="w-full rounded-md border border-input px-3 py-2" rows={6} />
                    {errors?.body && <p className="text-sm text-red-600">{errors.body}</p>}
                </div>
                <div>
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </AppLayout>
    );
}
