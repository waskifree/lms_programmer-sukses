<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Content;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
       
       $search = $request->get('search');

       $contents = Content::with('user', 'category')
        ->when($search, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                  ->orWhere('description', 'LIKE', "%{$search}%")
                  ->orWhere('paragraph', 'LIKE', "%{$search}%")
                  // Pencarian berdasarkan nama user
                  ->orWhereHas('user', function ($userQuery) use ($search) {
                      $userQuery->where('name', 'LIKE', "%{$search}%");
                  })
                  // Pencarian berdasarkan nama kategori
                  ->orWhereHas('category', function ($categoryQuery) use ($search) {
                      $categoryQuery->where('name', 'LIKE', "%{$search}%");
                  });
            });
        })
        ->latest()
        ->get();
        return Inertia::render('Dashboard', [
        'contents' => $contents,
        'filters' => [
            'search' => $search
        ]
    ]);
    }

}