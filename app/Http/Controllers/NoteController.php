<?php

namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        $contents = Content::with(['user', 'category'])
            ->where('created_by', Auth::id())
            ->where('visibility', 'private')
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      ->orWhere('paragraph', 'like', "%{$search}%")
                      ->orWhereHas('category', function ($category) use ($search) {
                          $category->where('name', 'like', "%{$search}%");
                      });
                });
            })
            ->latest()
            ->get();

        return Inertia::render('Notes/Index', [
            'contents' => $contents,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }
}