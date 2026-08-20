import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Pencil, Plus } from 'lucide-react';

export default function StudentsIndex({ students, flash }: any) {
    const handleDelete = (id: number) => {
        if (!confirm('Delete this student?')) return;
        router.delete(route('students.destroy', id));
    };

    return (
        <AppLayout>
            <Head title="Students" />

            {flash?.success && <div className="mb-4 rounded bg-green-50 p-3">{flash.success}</div>}

            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-semibold">Students</h1>
                <Link href={route('students.create')}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Student
                    </Button>
                </Link>
            </div>

            <div className="overflow-hidden rounded border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8">No students found.</TableCell>
                            </TableRow>
                        ) : (
                            students.data.map((s: any) => (
                                <TableRow key={s.id}>
                                    <TableCell>{s.id}</TableCell>
                                    <TableCell>{s.first_name} {s.last_name}</TableCell>
                                    <TableCell>{s.email}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('students.edit', s.id)}>
                                            <Button variant="outline" size="sm">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(s.id)}>
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
