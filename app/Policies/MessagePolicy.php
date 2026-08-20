<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Message;
use Illuminate\Auth\Access\HandlesAuthorization;

class MessagePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Message $message): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->hasRole(['admin', 'communication', 'super-admin']);
    }

    public function update(User $user, Message $message): bool
    {
        return $user->hasRole(['admin', 'communication', 'super-admin']);
    }

    public function delete(User $user, Message $message): bool
    {
        return $user->hasRole(['admin', 'super-admin']);
    }
}
