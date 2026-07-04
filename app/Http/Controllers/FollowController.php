<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    public function follow(User $user)
    {
        $follower = Auth::user();   // Pakai Facade Auth

        if (!$follower) {
            return redirect()->route('login');
        }

        if ($follower->id === $user->id) {
            return back()->with('error', 'Tidak bisa follow diri sendiri');
        }

        $follower->following()->syncWithoutDetaching($user->id);

        return back()->with('success', 'Berhasil mengikuti ' . $user->name);
    }

    public function unfollow(User $user)
    {
        $follower = Auth::user();

        if (!$follower) {
            return redirect()->route('login');
        }

        $follower->following()->detach($user->id);

        return back()->with('success', 'Berhenti mengikuti ' . $user->name);
    }

    // Versi API (rekomendasi untuk Inertia/React)
    public function toggleFollow(User $user)
    {
        $follower = Auth::user();

        if (!$follower) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if ($follower->id === $user->id) {
            return response()->json(['error' => 'Cannot follow yourself'], 400);
        }

        $isFollowing = $follower->isFollowing($user);

        if ($isFollowing) {
            $follower->following()->detach($user->id);
        } else {
            $follower->following()->attach($user->id);
        }

        $user->loadCount('followers');

        return response()->json([
            'success' => true,
            'is_following' => !$isFollowing,
            'followers_count' => $user->followers_count,
        ]);
    }
}