<?php

namespace App\Http\Controllers;

use App\Models\Content;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class MyContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index(Request $request)
    {
        $search = $request->get('search');

        $contents = Content::with('user', 'category')
            ->where('created_by', Auth::id())
            ->latest();

        if ($search) {
            $contents->where(function ($query) use ($search) {
                $query->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%")
                    ->orWhere('paragraph', 'LIKE', "%{$search}%")
                    ->orWhereHas('user', function ($q) use ($search) {
                        $q->where('name', 'LIKE', "%{$search}%");
                    })
                    ->orWhereHas('category', function ($q) use ($search) {
                        $q->where('name', 'LIKE', "%{$search}%");
                    });
            });
        }

        $contents = $contents->get();

        $categories = Category::all();

        return Inertia::render('MyContent/Index', [
            'contents' => $contents,
            'categories' => $categories,
            'filters' => [
                'search' => $search
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('MyContent/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'paragraph' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'type' => 'required|string|in:video,text,quiz,pdf',
            'is_published' => 'boolean',
            'order' => 'integer',
        ]);

        $content = new Content();
        $content->title = $request->title;
        $content->category_id = $request->category_id;
        $content->description = $request->description;
        $content->paragraph = $request->paragraph;
        $content->created_by = Auth::id();
        $content->type = $request->type;
        $content->is_published = $request->is_published ?? false;
        $content->order = $request->order ?? 0;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/images');
            $content->image = basename($path);
        }

        $content->save();

        return redirect()->route('mycontent.index')->with('success', 'Content created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $content = Content::with('user', 'category')
            ->where('slug', $slug)
            ->where('created_by', Auth::id())
            ->firstOrFail();

        return Inertia::render('MyContent/Show', [
            'contents' => $content
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($slug)
    {
        $content = Content::where('slug', $slug)
            ->where('created_by', Auth::id())
            ->firstOrFail();

        $categories = Category::all();

        return Inertia::render('MyContent/Edit', [
            'content' => $content,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $slug)
    {
        $content = Content::where('slug', $slug)
            ->where('created_by', Auth::id())
            ->firstOrFail();

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'paragraph' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
        ]);
        $content->title = $request->title;
        $content->description = $request->description;
        $content->paragraph = $request->paragraph;
        $content->category_id = $request->category_id;

         if ($request->hasFile('image')) {
            // hapus gambar lama jika ada
            if ($content->image && Storage::exists($content->image)) {
                Storage::delete($content->image);
            }
            // simpan gambar baru
            $path = $request->file('image')->store('public/images');
            $content->image = basename($path);
        }

        $content->save();

        return redirect()
            ->route('mycontent.index')
            ->with('success', 'Konten berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($slug)
    {
        $content = Content::where('slug', $slug)
            ->where('created_by', Auth::id())
            ->firstOrFail();

    // hapus gambar jika ada
    if ($content->image && Storage::exists($content->image)) {
        Storage::delete($content->image);
    }

    // hapus data content
    $content->forceDelete();

    return redirect()->back()->with('success', 'Konten berhasil dihapus');
    }

    
}
