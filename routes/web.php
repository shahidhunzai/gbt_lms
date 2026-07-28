<?php

use App\Http\Controllers\PermissionManagementController;
use App\Http\Controllers\RoleManagementController;
use App\Http\Controllers\UserController;
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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
