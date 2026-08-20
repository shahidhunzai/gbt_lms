<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Event;
use Illuminate\Auth\Access\HandlesAuthorization;

class EventPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Event $event): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->hasRole(['admin', 'super-admin', 'events-manager']);
    }

    public function update(User $user, Event $event): bool
    {
        return $user->hasRole(['admin', 'super-admin', 'events-manager']);
    }

    public function delete(User $user, Event $event): bool
    {
        return $user->hasRole(['admin', 'super-admin']);
    }
}
