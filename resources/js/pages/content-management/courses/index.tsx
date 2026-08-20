import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Pencil, Plus } from 'lucide-react';

export default function CoursesIndex({ courses, flash }: any) {
    const handleDelete = (id: number) => {
        if (!confirm('Delete this course?')) return;
        router.delete(route('content.courses.destroy', id));
    };

    return (
        <AppLayout>
            <Head title="Courses" />

            {flash?.success && <div className="mb-4 rounded bg-green-50 p-3">{flash.success}</div>}

            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-semibold">Courses</h1>
                <Link href={route('content.courses.create')}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Course
                    </Button>
                </Link>
            </div>

            <div className="overflow-hidden rounded border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8">No courses found.</TableCell>
                            </TableRow>
                        ) : (
                            courses.data.map((c: any) => (
                                <TableRow key={c.id}>
                                    <TableCell>{c.id}</TableCell>
                                    <TableCell>{c.title}</TableCell>
                                    <TableCell>{c.code}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('content.courses.edit', c.id)}>
                                            <Button variant="outline" size="sm">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(c.id)}>
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
