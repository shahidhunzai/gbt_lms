import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function CourseEdit({ course, institutions }: any) {
    const { errors } = usePage().props as any;
    const [title, setTitle] = useState(course?.title || '');
    const [code, setCode] = useState(course?.code || '');
    const [description, setDescription] = useState(course?.description || '');
    const [institutionId, setInstitutionId] = useState(course?.institution_id || '');

    const submit = (e: any) => {
        e.preventDefault();
        router.put(route('content.courses.update', course.id), { title, code, description, institution_id: institutionId || null });
    };

    return (
        <AppLayout>
            <Head title="Edit Course" />
            <form onSubmit={submit} className="space-y-4 p-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                    {errors?.title && <p className="text-sm text-red-600">{errors.title}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Code</label>
                    <Input value={code} onChange={(e) => setCode(e.target.value)} />
                    {errors?.code && <p className="text-sm text-red-600">{errors.code}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-md border border-input px-3 py-2" rows={4} />
                    {errors?.description && <p className="text-sm text-red-600">{errors.description}</p>}
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
