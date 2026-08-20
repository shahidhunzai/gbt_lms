import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function StudentEdit({ student, institutions }: any) {
    const { errors } = usePage().props as any;
    const [firstName, setFirstName] = useState(student?.first_name || '');
    const [lastName, setLastName] = useState(student?.last_name || '');
    const [email, setEmail] = useState(student?.email || '');
    const [institutionId, setInstitutionId] = useState(student?.institution_id || '');

    const submit = (e: any) => {
        e.preventDefault();
        router.put(route('students.update', student.id), { first_name: firstName, last_name: lastName, email, institution_id: institutionId || null });
    };

    return (
        <AppLayout>
            <Head title="Edit Student" />
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
                    <label className="block text-sm font-medium">Email</label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors?.email && <p className="text-sm text-red-600">{errors.email}</p>}
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
                    <Button type="submit">Update</Button>
                </div>
            </form>
        </AppLayout>
    );
}
