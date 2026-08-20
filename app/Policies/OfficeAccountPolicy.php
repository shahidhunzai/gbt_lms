<?php

namespace App\Policies;

use App\Models\User;
use App\Models\OfficeAccount;
use Illuminate\Auth\Access\HandlesAuthorization;

class OfficeAccountPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, OfficeAccount $account): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->hasRole(['admin', 'accounts', 'super-admin']);
    }

    public function update(User $user, OfficeAccount $account): bool
    {
        return $user->hasRole(['admin', 'accounts', 'super-admin']);
    }

    public function delete(User $user, OfficeAccount $account): bool
    {
        return $user->hasRole(['admin', 'super-admin']);
    }
}
