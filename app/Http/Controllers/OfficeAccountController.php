<?php

namespace App\Http\Controllers;

use App\Models\OfficeAccount;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OfficeAccountController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(OfficeAccount::class, 'account');
    }

    public function index(Request $request): Response
    {
        $accounts = OfficeAccount::orderBy('created_at','desc')->paginate(10);

        return Inertia::render('office-accounting/index', [
            'accounts' => $accounts,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('office-accounting/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required','string','max:255'],
            'balance' => ['nullable','numeric'],
            'currency' => ['nullable','string','max:10'],
        ]);

        OfficeAccount::create($data);

        return redirect()->route('office-accounts.index')->with('success','Account created.');
    }

    public function edit(OfficeAccount $account): Response
    {
        return Inertia::render('office-accounting/edit', [
            'account' => $account,
        ]);
    }

    public function update(Request $request, OfficeAccount $account): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required','string','max:255'],
            'balance' => ['nullable','numeric'],
            'currency' => ['nullable','string','max:10'],
        ]);

        $account->update($data);

        return redirect()->route('office-accounts.index')->with('success','Account updated.');
    }

    public function destroy(OfficeAccount $account): RedirectResponse
    {
        $account->delete();

        return redirect()->route('office-accounts.index')->with('success','Account deleted.');
    }
}
