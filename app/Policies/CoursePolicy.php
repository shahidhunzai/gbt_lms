<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Course;
use Illuminate\Auth\Access\HandlesAuthorization;

class CoursePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Course $course): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->hasRole(['admin', 'super-admin', 'teacher']);
    }

    public function update(User $user, Course $course): bool
    {
        return $user->hasRole(['admin', 'super-admin', 'teacher']);
    }

    public function delete(User $user, Course $course): bool
    {
        return $user->hasRole(['admin', 'super-admin']);
    }
}
