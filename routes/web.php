<?php

use App\Http\Controllers\PermissionManagementController;
use App\Http\Controllers\RoleManagementController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\InstitutionController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\FeeController;
use App\Http\Controllers\OfficeAccountController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // User Management Routes
    Route::prefix('user-management')->name('users.')->group(function () {
        Route::get('users', [UserController::class, 'index'])->name('index');
        Route::get('users/create', [UserController::class, 'create'])->name('create');
        Route::post('users', [UserController::class, 'store'])->name('store');
        Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('edit');
        Route::put('users/{user}', [UserController::class, 'update'])->name('update');
        Route::delete('users/{user}', [UserController::class, 'destroy'])->name('destroy');
    });

    // Role Management Routes
    Route::prefix('user-management')->name('roles.')->group(function () {
        Route::get('roles', [RoleManagementController::class, 'index'])->name('index');
        Route::get('roles/create', [RoleManagementController::class, 'create'])->name('create');
        Route::post('roles', [RoleManagementController::class, 'store'])->name('store');
        Route::get('roles/{role}/edit', [RoleManagementController::class, 'edit'])->name('edit');
        Route::put('roles/{role}', [RoleManagementController::class, 'update'])->name('update');
        Route::delete('roles/{role}', [RoleManagementController::class, 'destroy'])->name('destroy');
    });

    // Permission Management Routes
    Route::prefix('user-management')->name('permissions.')->group(function () {
        Route::get('permissions', [PermissionManagementController::class, 'index'])->name('index');
        Route::get('permissions/create', [PermissionManagementController::class, 'create'])->name('create');
        Route::post('permissions', [PermissionManagementController::class, 'store'])->name('store');
        Route::get('permissions/{permission}/edit', [PermissionManagementController::class, 'edit'])->name('edit');
        Route::put('permissions/{permission}', [PermissionManagementController::class, 'update'])->name('update');
        Route::delete('permissions/{permission}', [PermissionManagementController::class, 'destroy'])->name('destroy');
    });

    // Institutions
    Route::prefix('institutions')->name('institutions.')->group(function () {
        Route::get('/', [InstitutionController::class, 'index'])->name('index');
        Route::get('create', [InstitutionController::class, 'create'])->name('create');
        Route::post('/', [InstitutionController::class, 'store'])->name('store');
        Route::get('{institution}/edit', [InstitutionController::class, 'edit'])->name('edit');
        Route::put('{institution}', [InstitutionController::class, 'update'])->name('update');
        Route::delete('{institution}', [InstitutionController::class, 'destroy'])->name('destroy');
    });

    // Students
    Route::prefix('student-details')->name('students.')->group(function () {
        Route::get('/', [StudentController::class, 'index'])->name('index');
        Route::get('create', [StudentController::class, 'create'])->name('create');
        Route::post('/', [StudentController::class, 'store'])->name('store');
        Route::get('{student}/edit', [StudentController::class, 'edit'])->name('edit');
        Route::put('{student}', [StudentController::class, 'update'])->name('update');
        Route::delete('{student}', [StudentController::class, 'destroy'])->name('destroy');
    });

    // Employees
    Route::prefix('employee')->name('employees.')->group(function () {
        Route::get('/', [EmployeeController::class, 'index'])->name('index');
        Route::get('create', [EmployeeController::class, 'create'])->name('create');
        Route::post('/', [EmployeeController::class, 'store'])->name('store');
        Route::get('{employee}/edit', [EmployeeController::class, 'edit'])->name('edit');
        Route::put('{employee}', [EmployeeController::class, 'update'])->name('update');
        Route::delete('{employee}', [EmployeeController::class, 'destroy'])->name('destroy');
    });

    // Library books
    Route::prefix('library')->name('library.')->group(function () {
        Route::get('books', [BookController::class, 'index'])->name('books.index');
        Route::get('books/create', [BookController::class, 'create'])->name('books.create');
        Route::post('books', [BookController::class, 'store'])->name('books.store');
        Route::get('books/{book}/edit', [BookController::class, 'edit'])->name('books.edit');
        Route::put('books/{book}', [BookController::class, 'update'])->name('books.update');
        Route::delete('books/{book}', [BookController::class, 'destroy'])->name('books.destroy');
    });

    // Content management - courses
    Route::prefix('content-management')->name('content.')->group(function () {
        Route::get('courses', [CourseController::class, 'index'])->name('courses.index');
        Route::get('courses/create', [CourseController::class, 'create'])->name('courses.create');
        Route::post('courses', [CourseController::class, 'store'])->name('courses.store');
        Route::get('courses/{course}/edit', [CourseController::class, 'edit'])->name('courses.edit');
        Route::put('courses/{course}', [CourseController::class, 'update'])->name('courses.update');
        Route::delete('courses/{course}', [CourseController::class, 'destroy'])->name('courses.destroy');
    });

    // Events
    Route::prefix('events')->name('events.')->group(function () {
        Route::get('/', [EventController::class, 'index'])->name('index');
        Route::get('create', [EventController::class, 'create'])->name('create');
        Route::post('/', [EventController::class, 'store'])->name('store');
        Route::get('{event}/edit', [EventController::class, 'edit'])->name('edit');
        Route::put('{event}', [EventController::class, 'update'])->name('update');
        Route::delete('{event}', [EventController::class, 'destroy'])->name('destroy');
    });

    // Messages
    Route::prefix('message')->name('messages.')->group(function () {
        Route::get('/', [MessageController::class, 'index'])->name('index');
        Route::get('create', [MessageController::class, 'create'])->name('create');
        Route::post('/', [MessageController::class, 'store'])->name('store');
        Route::get('{message}/edit', [MessageController::class, 'edit'])->name('edit');
        Route::put('{message}', [MessageController::class, 'update'])->name('update');
        Route::delete('{message}', [MessageController::class, 'destroy'])->name('destroy');
    });

    // Student Accounting - Fees
    Route::prefix('student-accounting')->name('fees.')->group(function () {
        Route::get('fees', [FeeController::class, 'index'])->name('index');
        Route::get('fees/create', [FeeController::class, 'create'])->name('create');
        Route::post('fees', [FeeController::class, 'store'])->name('store');
        Route::get('fees/{fee}/edit', [FeeController::class, 'edit'])->name('edit');
        Route::put('fees/{fee}', [FeeController::class, 'update'])->name('update');
        Route::delete('fees/{fee}', [FeeController::class, 'destroy'])->name('destroy');
    });

    // Office Accounting
    Route::prefix('office-accounting')->name('office-accounts.')->group(function () {
        Route::get('/', [OfficeAccountController::class, 'index'])->name('index');
        Route::get('create', [OfficeAccountController::class, 'create'])->name('create');
        Route::post('/', [OfficeAccountController::class, 'store'])->name('store');
        Route::get('{account}/edit', [OfficeAccountController::class, 'edit'])->name('edit');
        Route::put('{account}', [OfficeAccountController::class, 'update'])->name('update');
        Route::delete('{account}', [OfficeAccountController::class, 'destroy'])->name('destroy');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
