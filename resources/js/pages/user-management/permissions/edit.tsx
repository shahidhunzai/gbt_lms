import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useState, FormEvent } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/user-management/permissions',
    },
    {
        title: 'Permissions',
        href: '/user-management/permissions',
    },
    {
        title: 'Edit',
        href: '/user-management/permissions/edit',
    },
];

interface EditPermissionProps {
    permission: {
        id: number;
        name: string;
        guard_name: string;
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function EditPermission({ permission, flash }: EditPermissionProps) {
    const [formData, setFormData] = useState({
        name: permission.name,
        guard_name: permission.guard_name,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});

        router.put(route('permissions.update', permission.id), formData, {
            onSuccess: () => {
                setSubmitting(false);
            },
            onError: (errors) => {
                setErrors(errors);
                setSubmitting(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${permission.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        {flash.error}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Edit Permission</h1>
                        <p className="text-sm text-muted-foreground">Update permission information.</p>
                    </div>
                    <Link href={route('permissions.index')}>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Permissions
                        </Button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Permission Information</CardTitle>
                            <CardDescription>Update the details for this permission.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Permission Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="e.g., view reports, edit settings"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            {/* Guard Name */}
                            <div className="space-y-2">
                                <Label htmlFor="guard_name">Guard Name</Label>
                                <Input
                                    id="guard_name"
                                    name="guard_name"
                                    placeholder="web"
                                    value={formData.guard_name}
                                    onChange={handleChange}
                                    className={errors.guard_name ? 'border-red-500' : ''}
                                />
                                {errors.guard_name && (
                                    <p className="text-sm text-red-500">{errors.guard_name}</p>
                                )}
                                <p className="text-xs text-neutral-500">
                                    Default is "web". Change only if using a different auth guard.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-6 flex justify-end gap-4">
                        <Link href={route('permissions.index')}>
                            <Button variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={submitting}>
                            <Save className="mr-2 h-4 w-4" />
                            {submitting ? 'Updating...' : 'Update Permission'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

