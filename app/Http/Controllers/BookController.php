<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Book::class, 'book');
    }

    public function index(Request $request): Response
    {
        $books = Book::orderBy('created_at','desc')->paginate(10);

        return Inertia::render('library/books/index', [
            'books' => $books,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('library/books/create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required','string','max:255'],
            'author' => ['nullable','string','max:255'],
            'isbn' => ['nullable','string','max:100','unique:books,isbn'],
            'publisher' => ['nullable','string','max:255'],
            'year' => ['nullable','integer'],
            'copies' => ['nullable','integer','min:0'],
        ]);

        Book::create($data);

        return redirect()->route('books.index')->with('success','Book created.');
    }

    public function edit(Book $book): Response
    {
        return Inertia::render('library/books/edit', [
            'book' => $book,
        ]);
    }

    public function update(Request $request, Book $book): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required','string','max:255'],
            'author' => ['nullable','string','max:255'],
            'isbn' => ['nullable','string','max:100','unique:books,isbn,' . $book->id],
            'publisher' => ['nullable','string','max:255'],
            'year' => ['nullable','integer'],
            'copies' => ['nullable','integer','min:0'],
        ]);

        $book->update($data);

        return redirect()->route('books.index')->with('success','Book updated.');
    }

    public function destroy(Book $book): RedirectResponse
    {
        $book->delete();

        return redirect()->route('books.index')->with('success','Book deleted.');
    }
}
