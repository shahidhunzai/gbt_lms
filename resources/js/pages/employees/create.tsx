import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function EmployeeCreate({ institutions }: any) {
    const { errors } = usePage().props as any;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [position, setPosition] = useState('');
    const [institutionId, setInstitutionId] = useState('');

    const submit = (e: any) => {
        e.preventDefault();
        router.post(route('employees.store'), { first_name: firstName, last_name: lastName, position, institution_id: institutionId || null });
    };

    return (
        <AppLayout>
            <Head title="Create Employee" />
            <form onSubmit={submit} className="space-y-4 p-4">
                <div>
                    <label className="block text-sm font-medium">First Name</label>
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    {errors?.first_name && <p className="text-sm text-red-600">{errors.first_name}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Last Name</label>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    {errors?.last_name && <p className="text-sm text-red-600">{errors.last_name}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Position</label>
                    <Input value={position} onChange={(e) => setPosition(e.target.value)} />
                    {errors?.position && <p className="text-sm text-red-600">{errors.position}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Institution (optional)</label>
                    <select value={institutionId} onChange={(e) => setInstitutionId(e.target.value)} className="w-full rounded-md border border-input px-3 py-2">
                        <option value="">-- Select Institution --</option>
                        {institutions?.map((inst: any) => (
                            <option key={inst.id} value={inst.id}>{inst.name}</option>
                        ))}
                    </select>
                    {errors?.institution_id && <p className="text-sm text-red-600">{errors.institution_id}</p>}
                </div>
                <div>
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </AppLayout>
    );
}
