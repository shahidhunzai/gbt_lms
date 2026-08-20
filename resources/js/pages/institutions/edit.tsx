import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function InstitutionEdit({ institution }: any) {
    const [name, setName] = useState(institution?.name || '');
    const [code, setCode] = useState(institution?.code || '');

    const submit = (e: any) => {
        e.preventDefault();
        router.put(route('institutions.update', institution.id), { name, code });
    };

    return (
        <AppLayout>
            <Head title="Edit Institution" />
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
                    <Button type="submit">Update</Button>
                </div>
            </form>
        </AppLayout>
    );
}
