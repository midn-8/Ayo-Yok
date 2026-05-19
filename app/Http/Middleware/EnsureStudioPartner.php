<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureStudioPartner
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            abort(403, 'Unauthorized.');
        }

        if ($user->role !== 'admin' && !$user->is_studio_partner) {
            abort(403, 'Studio access is restricted to verified partner accounts.');
        }

        return $next($request);
    }
}
