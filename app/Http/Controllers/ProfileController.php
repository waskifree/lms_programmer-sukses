<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class ProfileController extends Controller
{
    

    public function index(Request $request)
{
    $search = $request->get('search');

    $users = User::query()
        ->when($search, function ($query, $search) {
            $query->where('name', 'LIKE', "%{$search}%")
                  ->orWhere('username', 'LIKE', "%{$search}%")
                  ->orWhere('email', 'LIKE', "%{$search}%");
        })
        ->latest()
        ->paginate(12);   // tambahkan pagination agar tidak berat


        return Inertia::render('Profile/Index', [
        'users' => $users,
        'filters' => [
            'search' => $search,
        ]
    ]);
}

    public function show(User $user): Response
    {
        $contents = $user->contents()
            ->with('category')
            ->latest()
            ->get();

        $user->loadCount(['followers', 'following']);

        return Inertia::render('Profile/Show', [
            'user' => $user->only(['id', 'name', 'username', 'email', 'avatar']) + [
                'followers_count' => $user->followers_count,
                'following_count' => $user->following_count,
                'is_following' => Auth::check() ? Auth::user()->isFollowing($user) : false,
            ],
            'contents' => $contents,
            'isOwnProfile' => Auth::id() === $user->id,
        ]);
    }
            public function toggleFollow(User $user)
    {
        $follower = Auth::user();

        if (!$follower) {
            return redirect()->route('login');
        }

        if ($follower->id === $user->id) {
            return back()->with('error', 'Tidak bisa follow diri sendiri');
        }

        $isFollowing = $follower->isFollowing($user);

        if ($isFollowing) {
            $follower->following()->detach($user->id);
        } else {
            $follower->following()->attach($user->id);
        }

        // Reload counts
        $user->loadCount(['followers', 'following']);

        return back()->with([
            'success' => $isFollowing 
                ? 'Berhenti mengikuti ' . $user->name 
                : 'Berhasil mengikuti ' . $user->name,
        ]);
    }
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
