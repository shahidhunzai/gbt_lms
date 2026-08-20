<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Employee;
use Illuminate\Auth\Access\HandlesAuthorization;

class EmployeePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Employee $employee): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->hasRole(['admin', 'hr', 'super-admin']);
    }

    public function update(User $user, Employee $employee): bool
    {
        return $user->hasRole(['admin', 'hr', 'super-admin']);
    }

    public function delete(User $user, Employee $employee): bool
    {
        return $user->hasRole(['admin', 'super-admin']);
    }
}
