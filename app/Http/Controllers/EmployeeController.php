<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Institution;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Employee::class, 'employee');
    }

    public function index(Request $request): Response
    {
        $employees = Employee::with('institution')->orderBy('created_at','desc')->paginate(10);

        return Inertia::render('employees/index', [
            'employees' => $employees,
        ]);
    }

    public function create(): Response
    {
        $institutions = Institution::all();
        return Inertia::render('employees/create', [
            'institutions' => $institutions,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'first_name' => ['required','string','max:255'],
            'last_name' => ['nullable','string','max:255'],
            'email' => ['nullable','email','max:255','unique:employees,email'],
            'phone' => ['nullable','string','max:50'],
            'position' => ['nullable','string','max:255'],
            'institution_id' => ['nullable','exists:institutions,id'],
        ]);

        Employee::create($data);

        return redirect()->route('employees.index')->with('success','Employee created.');
    }

    public function edit(Employee $employee): Response
    {
        $institutions = Institution::all();
        return Inertia::render('employees/edit', [
            'employee' => $employee,
            'institutions' => $institutions,
        ]);
    }

    public function update(Request $request, Employee $employee): RedirectResponse
    {
        $data = $request->validate([
            'first_name' => ['required','string','max:255'],
            'last_name' => ['nullable','string','max:255'],
            'email' => ['nullable','email','max:255','unique:employees,email,' . $employee->id],
            'phone' => ['nullable','string','max:50'],
            'position' => ['nullable','string','max:255'],
            'institution_id' => ['nullable','exists:institutions,id'],
        ]);

        $employee->update($data);

        return redirect()->route('employees.index')->with('success','Employee updated.');
    }

    public function destroy(Employee $employee): RedirectResponse
    {
        $employee->delete();

        return redirect()->route('employees.index')->with('success','Employee deleted.');
    }
}
