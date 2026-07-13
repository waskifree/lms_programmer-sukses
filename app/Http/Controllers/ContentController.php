<?php

namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ContentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contents = Content::with('user', 'category')->latest()->get();

        return Inertia::render('Content/Index', [
            'contents' => $contents,
            'categories' => Category::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Content/Create', [
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
            'visibility' => 'required|in:public,followers,private',
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
        $content->visibility = $request->visibility;
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

        return redirect()->route('content.index')->with('success', 'Content created successfully.');
    }

    /**
     * Display the specified resource.
     */
   public function show($slug)
{
    $content = Content::where('slug', $slug)->with('user', 'category', 'comments.user')->firstOrFail();
    
    return Inertia::render('Content/Show', [
        'content' => $content
    ]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Content $content)
    {
        $categories = Category::all();
        return Inertia::render('Content/Edit', [
        'contents' => $content,
        'categories' => $categories
    ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Content $content)
    {
        
        $request->validate([
        'title'       => 'required|string|max:255',
        'visibility'  => 'required|in:public,followers,private',
        'description' => 'nullable|string',
        'paragraph'   => 'required|string',
        'category_id' => 'nullable|exists:categories,id',
    ]);


    $content->title = $request->title;
    $content->visibility = $request->visibility;
    $content->category_id = $request->category_id;
    $content->description = $request->description;
    $content->paragraph = $request->paragraph;
    $content->save();

    return redirect()->route('content.index')
                     ->with('success', 'Konten berhasil diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Content $content)
    {
        
    // hapus gambar jika ada
    if ($content->image && Storage::exists($content->image)) {
        Storage::delete($content->image);
    }

    // hapus data content
    $content->forceDelete();

    return redirect()->back()->with('success', 'Konten berhasil dihapus');
    }

    /**
 * Toggle Like
 */
public function like(Content $content)
{
    $userId = Auth::id();

    // Cek apakah user sudah like konten ini
    $existingLike = $content->likes()->where('user_id', $userId)->first();

    if ($existingLike) {
        // Jika sudah like, hapus like tersebut (unlike)
        $existingLike->delete();
        $content->decrement('likes');
        return back()->with('success', 'Anda telah membatalkan like pada konten ini.');
    } else {
        // Jika belum like, buat like baru
        $content->likes()->create(['user_id' => $userId]);
        $content->increment('likes');
        return back()->with('success', 'Anda telah menyukai konten ini.');
    }
}

/**
 * Simpan Komentar
 */
public function comment(Request $request, Content $content)
{
    $request->validate([
        'comment' => 'required|string|max:500',
    ]);
    
    $content->comments()->create([
        'user_id' => Auth::id(),
        'comment' => $request->comment,
    ]);

    return back()->with('success', 'Komentar berhasil ditambahkan');
}

    
}
