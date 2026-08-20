<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Institution;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Student::class, 'student');
    }

    public function index(Request $request): Response
    {
        $students = Student::with('institution')->orderBy('created_at','desc')->paginate(10);

        return Inertia::render('students/index', [
            'students' => $students,
        ]);
    }

    public function create(): Response
    {
        $institutions = Institution::all();
        return Inertia::render('students/create', [
            'institutions' => $institutions,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'first_name' => ['required','string','max:255'],
            'last_name' => ['nullable','string','max:255'],
            'email' => ['nullable','email','max:255','unique:students,email'],
            'phone' => ['nullable','string','max:50'],
            'date_of_birth' => ['nullable','date'],
            'guardian_name' => ['nullable','string','max:255'],
            'guardian_phone' => ['nullable','string','max:50'],
            'institution_id' => ['nullable','exists:institutions,id'],
        ]);

        Student::create($data);

        return redirect()->route('students.index')->with('success','Student created.');
    }

    public function edit(Student $student): Response
    {
        $institutions = Institution::all();
        return Inertia::render('students/edit', [
            'student' => $student,
            'institutions' => $institutions,
        ]);
    }

    public function update(Request $request, Student $student): RedirectResponse
    {
        $data = $request->validate([
            'first_name' => ['required','string','max:255'],
            'last_name' => ['nullable','string','max:255'],
            'email' => ['nullable','email','max:255','unique:students,email,' . $student->id],
            'phone' => ['nullable','string','max:50'],
            'date_of_birth' => ['nullable','date'],
            'guardian_name' => ['nullable','string','max:255'],
            'guardian_phone' => ['nullable','string','max:50'],
            'institution_id' => ['nullable','exists:institutions,id'],
        ]);

        $student->update($data);

        return redirect()->route('students.index')->with('success','Student updated.');
    }

    public function destroy(Student $student): RedirectResponse
    {
        $student->delete();

        return redirect()->route('students.index')->with('success','Student deleted.');
    }
}
