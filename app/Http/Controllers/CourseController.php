<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Institution;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Course::class, 'course');
    }

    public function index(Request $request): Response
    {
        $courses = Course::with('institution')->orderBy('created_at','desc')->paginate(10);

        return Inertia::render('content-management/courses/index', [
            'courses' => $courses,
        ]);
    }

    public function create(): Response
    {
        $institutions = Institution::all();
        return Inertia::render('content-management/courses/create', [
            'institutions' => $institutions,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required','string','max:255'],
            'code' => ['nullable','string','max:100','unique:courses,code'],
            'description' => ['nullable','string'],
            'institution_id' => ['nullable','exists:institutions,id'],
        ]);

        Course::create($data);

        return redirect()->route('courses.index')->with('success','Course created.');
    }

    public function edit(Course $course): Response
    {
        $institutions = Institution::all();
        return Inertia::render('content-management/courses/edit', [
            'course' => $course,
            'institutions' => $institutions,
        ]);
    }

    public function update(Request $request, Course $course): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required','string','max:255'],
            'code' => ['nullable','string','max:100','unique:courses,code,' . $course->id],
            'description' => ['nullable','string'],
            'institution_id' => ['nullable','exists:institutions,id'],
        ]);

        $course->update($data);

        return redirect()->route('courses.index')->with('success','Course updated.');
    }

    public function destroy(Course $course): RedirectResponse
    {
        $course->delete();

        return redirect()->route('courses.index')->with('success','Course deleted.');
    }
}
