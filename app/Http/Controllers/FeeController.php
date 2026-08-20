<?php

namespace App\Http\Controllers;

use App\Models\Fee;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FeeController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Fee::class, 'fee');
    }

    public function index(Request $request): Response
    {
        $fees = Fee::with('student')->orderBy('created_at','desc')->paginate(10);

        return Inertia::render('student-accounting/fees/index', [
            'fees' => $fees,
        ]);
    }

    public function create(): Response
    {
        $students = Student::all();
        return Inertia::render('student-accounting/fees/create', [
            'students' => $students,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'student_id' => ['nullable','exists:students,id'],
            'amount' => ['required','numeric','min:0'],
            'description' => ['nullable','string'],
            'due_date' => ['nullable','date'],
        ]);

        Fee::create($data);

        return redirect()->route('fees.index')->with('success','Fee created.');
    }

    public function edit(Fee $fee): Response
    {
        $students = Student::all();
        return Inertia::render('student-accounting/fees/edit', [
            'fee' => $fee,
            'students' => $students,
        ]);
    }

    public function update(Request $request, Fee $fee): RedirectResponse
    {
        $data = $request->validate([
            'student_id' => ['nullable','exists:students,id'],
            'amount' => ['required','numeric','min:0'],
            'description' => ['nullable','string'],
            'due_date' => ['nullable','date'],
        ]);

        $fee->update($data);

        return redirect()->route('fees.index')->with('success','Fee updated.');
    }

    public function destroy(Fee $fee): RedirectResponse
    {
        $fee->delete();

        return redirect()->route('fees.index')->with('success','Fee deleted.');
    }
}
