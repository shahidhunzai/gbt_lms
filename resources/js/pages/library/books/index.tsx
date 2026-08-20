import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Pencil, Plus } from 'lucide-react';

export default function BooksIndex({ books, flash }: any) {
    const handleDelete = (id: number) => {
        if (!confirm('Delete this book?')) return;
        router.delete(route('books.destroy', id));
    };

    return (
        <AppLayout>
            <Head title="Books" />

            {flash?.success && <div className="mb-4 rounded bg-green-50 p-3">{flash.success}</div>}

            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-semibold">Books</h1>
                <Link href={route('books.create')}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Book
                    </Button>
                </Link>
            </div>

            <div className="overflow-hidden rounded border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {books.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8">No books found.</TableCell>
                            </TableRow>
                        ) : (
                            books.data.map((b: any) => (
                                <TableRow key={b.id}>
                                    <TableCell>{b.id}</TableCell>
                                    <TableCell>{b.title}</TableCell>
                                    <TableCell>{b.author}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('books.edit', b.id)}>
                                            <Button variant="outline" size="sm">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(b.id)}>
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
