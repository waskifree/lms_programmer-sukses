<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class ShareUserData
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()) {
            Inertia::share([
                'auth' => [
                    'user' => $request->user()->only([
                        'id', 'name', 'username', 'email', 'bio', 'avatar'
                    ])
                ]
            ]);
        }

        return $next($request);
    }
}