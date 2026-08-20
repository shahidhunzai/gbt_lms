import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Pencil, Plus } from 'lucide-react';

export default function EventsIndex({ events, flash }: any) {
    const handleDelete = (id: number) => {
        if (!confirm('Delete this event?')) return;
        router.delete(route('events.destroy', id));
    };

    return (
        <AppLayout>
            <Head title="Events" />

            {flash?.success && <div className="mb-4 rounded bg-green-50 p-3">{flash.success}</div>}

            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-semibold">Events</h1>
                <Link href={route('events.create')}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Event
                    </Button>
                </Link>
            </div>

            <div className="overflow-hidden rounded border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Starts</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {events.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8">No events found.</TableCell>
                            </TableRow>
                        ) : (
                            events.data.map((ev: any) => (
                                <TableRow key={ev.id}>
                                    <TableCell>{ev.id}</TableCell>
                                    <TableCell>{ev.title}</TableCell>
                                    <TableCell>{ev.starts_at ? new Date(ev.starts_at).toLocaleString() : ''}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('events.edit', ev.id)}>
                                            <Button variant="outline" size="sm">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(ev.id)}>
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
