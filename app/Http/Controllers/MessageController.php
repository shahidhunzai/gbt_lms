<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Message::class, 'message');
    }

    public function index(Request $request): Response
    {
        $messages = Message::with('user')->orderBy('created_at','desc')->paginate(10);

        return Inertia::render('message/index', [
            'messages' => $messages,
        ]);
    }

    public function create(): Response
    {
        $users = User::all();
        return Inertia::render('message/create', [
            'users' => $users,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'user_id' => ['nullable','exists:users,id'],
            'subject' => ['nullable','string','max:255'],
            'body' => ['nullable','string'],
            'is_sent' => ['nullable','boolean'],
        ]);

        Message::create($data);

        return redirect()->route('messages.index')->with('success','Message created.');
    }

    public function edit(Message $message): Response
    {
        $users = User::all();
        return Inertia::render('message/edit', [
            'message' => $message,
            'users' => $users,
        ]);
    }

    public function update(Request $request, Message $message): RedirectResponse
    {
        $data = $request->validate([
            'user_id' => ['nullable','exists:users,id'],
            'subject' => ['nullable','string','max:255'],
            'body' => ['nullable','string'],
            'is_sent' => ['nullable','boolean'],
        ]);

        $message->update($data);

        return redirect()->route('messages.index')->with('success','Message updated.');
    }

    public function destroy(Message $message): RedirectResponse
    {
        $message->delete();

        return redirect()->route('messages.index')->with('success','Message deleted.');
    }
}
