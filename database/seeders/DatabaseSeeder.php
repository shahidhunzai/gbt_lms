<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // User management
            'view users',
            'create users',
            'edit users',
            'delete users',
            // Role management
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',
            // Permission management
            'view permissions',
            'assign permissions',
            // Course management
            'view courses',
            'create courses',
            'edit courses',
            'delete courses',
            // Lesson management
            'view lessons',
            'create lessons',
            'edit lessons',
            'delete lessons',
            // Category management
            'view categories',
            'create categories',
            'edit categories',
            'delete categories',
            // Settings
            'view settings',
            'edit settings',
            // Dashboard
            'view dashboard',
            'view reports',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission, 'guard_name' => 'web']);
        }

        // Create super-admin role and assign all permissions
        $superAdminRole = Role::create(['name' => 'super-admin', 'guard_name' => 'web']);
        $superAdminRole->givePermissionTo(Permission::all());

        // Create admin user
        $admin = User::create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin@123'),
            'email_verified_at' => now(),
        ]);

        // Assign super-admin role to admin user
        $admin->assignRole('super-admin');
    }
}
