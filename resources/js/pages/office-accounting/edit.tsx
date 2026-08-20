import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function OfficeAccountEdit({ account }: any) {
    const [name, setName] = useState(account?.name || '');
    const [balance, setBalance] = useState(account?.balance || '0');

    const submit = (e: any) => {
        e.preventDefault();
        router.put(route('office-accounts.update', account.id), { name, balance });
    };

    return (
        <AppLayout>
            <Head title="Edit Account" />
            <form onSubmit={submit} className="space-y-4 p-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium">Balance</label>
                    <Input value={balance} onChange={(e) => setBalance(e.target.value)} />
                </div>
                <div>
                    <Button type="submit">Update</Button>
                </div>
            </form>
        </AppLayout>
    );
}
