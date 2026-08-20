<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Institution;
use App\Models\Student;
use App\Models\Employee;
use App\Models\Book;
use App\Models\Course;
use App\Models\Event;
use App\Models\Message;
use App\Models\Fee;
use App\Models\OfficeAccount;
use App\Policies\InstitutionPolicy;
use App\Policies\StudentPolicy;
use App\Policies\EmployeePolicy;
use App\Policies\BookPolicy;
use App\Policies\CoursePolicy;
use App\Policies\EventPolicy;
use App\Policies\MessagePolicy;
use App\Policies\FeePolicy;
use App\Policies\OfficeAccountPolicy;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register model policies
        Gate::policy(Institution::class, InstitutionPolicy::class);
        Gate::policy(Student::class, StudentPolicy::class);
        Gate::policy(Employee::class, EmployeePolicy::class);
        Gate::policy(Book::class, BookPolicy::class);
        Gate::policy(Course::class, CoursePolicy::class);
        Gate::policy(Event::class, EventPolicy::class);
        Gate::policy(Message::class, MessagePolicy::class);
        Gate::policy(Fee::class, FeePolicy::class);
        Gate::policy(OfficeAccount::class, OfficeAccountPolicy::class);
    }
}
