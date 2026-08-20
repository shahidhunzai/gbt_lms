<?php

namespace App\Http\Controllers;

use App\Models\Institution;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InstitutionController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Institution::class, 'institution');
    }

    public function index(Request $request): Response
    {
        $institutions = Institution::orderBy('created_at','desc')->paginate(10);

        return Inertia::render('institutions/index', [
            'institutions' => $institutions,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('institutions/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required','string','max:255'],
            'code' => ['nullable','string','max:100','unique:institutions,code'],
            'address' => ['nullable','string','max:500'],
            'phone' => ['nullable','string','max:50'],
            'email' => ['nullable','email','max:255'],
        ]);

        Institution::create($data);

        return redirect()->route('institutions.index')->with('success','Institution created.');
    }

    public function edit(Institution $institution): Response
    {
        return Inertia::render('institutions/edit', [
            'institution' => $institution,
        ]);
    }

    public function update(Request $request, Institution $institution): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required','string','max:255'],
            'code' => ['nullable','string','max:100','unique:institutions,code,' . $institution->id],
            'address' => ['nullable','string','max:500'],
            'phone' => ['nullable','string','max:50'],
            'email' => ['nullable','email','max:255'],
        ]);

        $institution->update($data);

        return redirect()->route('institutions.index')->with('success','Institution updated.');
    }

    public function destroy(Institution $institution): RedirectResponse
    {
        $institution->delete();

        return redirect()->route('institutions.index')->with('success','Institution deleted.');
    }
}
