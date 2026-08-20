<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Fee;
use Illuminate\Auth\Access\HandlesAuthorization;

class FeePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Fee $fee): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->hasRole(['admin', 'accounts', 'super-admin']);
    }

    public function update(User $user, Fee $fee): bool
    {
        return $user->hasRole(['admin', 'accounts', 'super-admin']);
    }

    public function delete(User $user, Fee $fee): bool
    {
        return $user->hasRole(['admin', 'super-admin']);
    }
}
