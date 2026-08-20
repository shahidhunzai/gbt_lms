import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Pencil, Plus } from 'lucide-react';

export default function InstitutionsIndex({ institutions, flash }: any) {
    const handleDelete = (id: number) => {
        if (!confirm('Delete this institution?')) return;
        router.delete(route('institutions.destroy', id));
    };

    return (
        <AppLayout>
            <Head title="Institutions" />

            {flash?.success && <div className="mb-4 rounded bg-green-50 p-3">{flash.success}</div>}

            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-semibold">Institutions</h1>
                <Link href={route('institutions.create')}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Institution
                    </Button>
                </Link>
            </div>

            <div className="overflow-hidden rounded border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {institutions.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8">No institutions found.</TableCell>
                            </TableRow>
                        ) : (
                            institutions.data.map((inst: any) => (
                                <TableRow key={inst.id}>
                                    <TableCell>{inst.id}</TableCell>
                                    <TableCell>{inst.name}</TableCell>
                                    <TableCell>{inst.code}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('institutions.edit', inst.id)}>
                                            <Button variant="outline" size="sm">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(inst.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
