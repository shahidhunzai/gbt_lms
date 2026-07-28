import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, FormEvent } from 'react';
import { ArrowLeft, Save } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: '/user-management/roles',
    },
    {
        title: 'Roles',
        href: '/user-management/roles',
    },
    {
        title: 'Edit',
        href: '/user-management/roles/edit',
    },
];

interface EditRoleProps {
    role: {
        id: number;
        name: string;
        guard_name: string;
        permissions: string[];
    };
    permissions: string[];
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function EditRole({ role, permissions, flash }: EditRoleProps) {
    const [formData, setFormData] = useState({
        name: role.name,
    });
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>(role.permissions || []);
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

    const handlePermissionToggle = (permission: string) => {
        setSelectedPermissions((prev) =>
            prev.includes(permission)
                ? prev.filter((p) => p !== permission)
                : [...prev, permission]
        );
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});

        router.put(route('roles.update', role.id), {
            name: formData.name,
            permissions: selectedPermissions,
        }, {
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
            <Head title={`Edit ${role.name}`} />

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
                        <h1 className="text-2xl font-bold tracking-tight">Edit Role</h1>
                        <p className="text-sm text-muted-foreground">Update role information and permissions.</p>
                    </div>
                    <Link href={route('roles.index')}>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Roles
                        </Button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Role Information</CardTitle>
                            <CardDescription>Update the details for this role.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">Role Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="e.g., editor, moderator"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>

                            {/* Guard Name (read-only) */}
                            <div className="space-y-2">
                                <Label htmlFor="guard_name">Guard</Label>
                                <Input
                                    id="guard_name"
                                    name="guard_name"
                                    value={role.guard_name}
                                    disabled
                                    className="bg-neutral-100 dark:bg-neutral-800"
                                />
                            </div>

                            {/* Permissions */}
                            <div className="space-y-3">
                                <Label>Permissions</Label>
                                {permissions.length === 0 ? (
                                    <p className="text-sm text-neutral-500">
                                        No permissions available.
                                    </p>
                                ) : (
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 max-h-80 overflow-y-auto border rounded-lg p-4">
                                        {permissions.map((permission) => (
                                            <div key={permission} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`permission-${permission}`}
                                                    checked={selectedPermissions.includes(permission)}
                                                    onCheckedChange={() => handlePermissionToggle(permission)}
                                                />
                                                <Label
                                                    htmlFor={`permission-${permission}`}
                                                    className="text-sm font-normal cursor-pointer"
                                                >
                                                    {permission}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-6 flex justify-end gap-4">
                        <Link href={route('roles.index')}>
                            <Button variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={submitting}>
                            <Save className="mr-2 h-4 w-4" />
                            {submitting ? 'Updating...' : 'Update Role'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

