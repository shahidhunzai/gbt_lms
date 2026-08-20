<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Book;
use Illuminate\Auth\Access\HandlesAuthorization;

class BookPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Book $book): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->hasRole(['librarian', 'admin', 'super-admin']);
    }

    public function update(User $user, Book $book): bool
    {
        return $user->hasRole(['librarian', 'admin', 'super-admin']);
    }

    public function delete(User $user, Book $book): bool
    {
        return $user->hasRole(['librarian', 'admin', 'super-admin']);
    }
}
