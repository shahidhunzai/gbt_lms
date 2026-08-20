import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function FeeEdit({ fee, students }: any) {
    const { errors } = usePage().props as any;
    const [studentId, setStudentId] = useState(fee?.student_id || '');
    const [amount, setAmount] = useState(fee?.amount || '');

    const submit = (e: any) => {
        e.preventDefault();
        router.put(route('fees.update', fee.id), { student_id: studentId || null, amount });
    };

    return (
        <AppLayout>
            <Head title="Edit Fee" />
            <form onSubmit={submit} className="space-y-4 p-4">
                <div>
                    <label className="block text-sm font-medium">Student</label>
                    <select value={studentId} onChange={(e) => setStudentId(e.target.value)} className="w-full rounded-md border border-input px-3 py-2">
                        <option value="">-- Select Student --</option>
                        {students?.map((s: any) => (
                            <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>
                        ))}
                    </select>
                    {errors?.student_id && <p className="text-sm text-red-600">{errors.student_id}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Amount</label>
                    <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
                    {errors?.amount && <p className="text-sm text-red-600">{errors.amount}</p>}
                </div>
                <div>
                    <Button type="submit">Update</Button>
                </div>
            </form>
        </AppLayout>
    );
}
