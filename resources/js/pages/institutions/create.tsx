import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function InstitutionCreate() {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    const submit = (e: any) => {
        e.preventDefault();
        router.post(route('institutions.store'), { name, code });
    };

    return (
        <AppLayout>
            <Head title="Create Institution" />
            <form onSubmit={submit} className="space-y-4 p-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium">Code</label>
                    <Input value={code} onChange={(e) => setCode(e.target.value)} />
                </div>
                <div>
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </AppLayout>
    );
}
