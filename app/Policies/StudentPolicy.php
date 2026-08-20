<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Student;
use Illuminate\Auth\Access\HandlesAuthorization;

class StudentPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Student $student): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->hasRole(['admin', 'staff', 'super-admin']);
    }

    public function update(User $user, Student $student): bool
    {
        return $user->hasRole(['admin', 'staff', 'super-admin']);
    }

    public function delete(User $user, Student $student): bool
    {
        return $user->hasRole(['admin', 'super-admin']);
    }
}
