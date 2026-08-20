import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Pencil, Plus } from 'lucide-react';

export default function OfficeAccountsIndex({ accounts, flash }: any) {
    const handleDelete = (id: number) => {
        if (!confirm('Delete this account?')) return;
        router.delete(route('office-accounts.destroy', id));
    };

    return (
        <AppLayout>
            <Head title="Office Accounts" />

            {flash?.success && <div className="mb-4 rounded bg-green-50 p-3">{flash.success}</div>}

            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-semibold">Office Accounts</h1>
                <Link href={route('office-accounts.create')}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Account
                    </Button>
                </Link>
            </div>

            <div className="overflow-hidden rounded border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Balance</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {accounts.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8">No accounts found.</TableCell>
                            </TableRow>
                        ) : (
                            accounts.data.map((a: any) => (
                                <TableRow key={a.id}>
                                    <TableCell>{a.id}</TableCell>
                                    <TableCell>{a.name}</TableCell>
                                    <TableCell>{a.balance}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={route('office-accounts.edit', a.id)}>
                                            <Button variant="outline" size="sm">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(a.id)}>
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
