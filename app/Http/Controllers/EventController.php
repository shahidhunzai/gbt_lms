<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Event::class, 'event');
    }

    public function index(Request $request): Response
    {
        $events = Event::orderBy('starts_at','desc')->paginate(10);

        return Inertia::render('events/index', [
            'events' => $events,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('events/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required','string','max:255'],
            'description' => ['nullable','string'],
            'starts_at' => ['nullable','date'],
            'ends_at' => ['nullable','date'],
        ]);

        Event::create($data);

        return redirect()->route('events.index')->with('success','Event created.');
    }

    public function edit(Event $event): Response
    {
        return Inertia::render('events/edit', [
            'event' => $event,
        ]);
    }

    public function update(Request $request, Event $event): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required','string','max:255'],
            'description' => ['nullable','string'],
            'starts_at' => ['nullable','date'],
            'ends_at' => ['nullable','date'],
        ]);

        $event->update($data);

        return redirect()->route('events.index')->with('success','Event updated.');
    }

    public function destroy(Event $event): RedirectResponse
    {
        $event->delete();

        return redirect()->route('events.index')->with('success','Event deleted.');
    }
}
