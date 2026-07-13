<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Content;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
{
    $search = $request->search;

    $contents = Content::with(['user', 'category'])
        ->where('visibility', 'public')
        ->when($search, function ($query) use ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('paragraph', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($user) use ($search) {
                        $user->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('category', function ($category) use ($search) {
                        $category->where('name', 'like', "%{$search}%");
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
    public function DashFriends(Request $request)
{
    $search = $request->search;
    $user = Auth::user();

    $following = $user->following()->get();
    $followers = $user->followers()->get();

    $contents = Content::with(['user', 'category'])
        ->where('visibility', 'followers')

        // hanya konten milik orang yang saya follow
        ->whereHas('user.followers', function ($query) use ($user) {
            $query->where('follower_id', $user->id);
        })

        ->when($search, function ($query) use ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('paragraph', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($user) use ($search) {
                        $user->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('category', function ($category) use ($search) {
                        $category->where('name', 'like', "%{$search}%");
                    });
            });
        })

        ->latest()
        ->get();

    return Inertia::render('DashFriends', [
        'following' => $following,
        'followers' => $followers,
        'contents' => $contents,
        'filters' => [
            'search' => $search,
        ],
    ]);
}
}