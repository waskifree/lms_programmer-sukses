<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\MyContentController;
use App\Http\Controllers\CategoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use Inertia\Inertia;
use Inertia\Response;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



// Dashboard dengan Controller
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
     // Profil Publik
    Route::get('/profile/{user:username}', [ProfileController::class, 'show'])
         ->name('profile.show');

    // 2. Route Daftar User 
    Route::get('/users', [ProfileController::class, 'index'])
         ->name('users.index');

    // 3. Route Edit Profil Breeze 
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // 4. Route Follow/Unfollow
    Route::post('/profile/{user:username}/follow', [ProfileController::class, 'follow'])->name('profile.follow');
    Route::post('/profile/{user:username}/unfollow', [ProfileController::class, 'unfollow'])->name('profile.unfollow');
    route::post('/profile/{user:username}/toggle-follow', [ProfileController::class, 'toggleFollow'])->name('profile.toggle-follow');

    Route::post('/content/{content:slug}/like', [ContentController::class, 'like'])->name('content.like');
    Route::post('/content/{content:slug}/comment', [ContentController::class, 'comment'])->name('content.comment');

   
   
});


Route::middleware(['auth' => 'role:admin'])->group(function () {
    Route::resource('content', ContentController::class)->except(['show']); 
    Route::resource('category', CategoryController::class);
    Route::get('/category/{category:slug}', [CategoryController::class, 'show'])->name('category.show');
});

Route::get('/content/{slug}', [ContentController::class, 'show'])
        ->name('content.show');

Route::middleware(['auth' => 'role:user'])->group(function () {
    Route::resource('mycontent', MyContentController::class); 
});

require __DIR__.'/auth.php';
