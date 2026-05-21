<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MembershipController extends Controller
{
    public function index()
    {
        return view('membership');
    }

    public function checkout($plan)
    {
        // Allowed plans
        $allowedPlans = ['plus', 'pro'];
        if (!in_array($plan, $allowedPlans)) {
            return redirect()->route('membership.index');
        }

        return view('membership-checkout', ['plan' => $plan]);
    }

    public function processCheckout(Request $request, $plan)
    {
        $allowedPlans = ['plus', 'pro'];
        if (!in_array($plan, $allowedPlans)) {
            return response()->json(['error' => 'Invalid plan'], 400);
        }

        $user = Auth::user();
        $user->membership_plan = $plan;
        
        // Also elevate role if Pro
        if ($plan === 'pro' && $user->role !== 'studio') {
            // Keep it customer but flag as pro, or change role depending on how AyoYok handles it.
            // We'll just rely on membership_plan for now.
        }
        
        $user->save();

        return response()->json(['success' => true]);
    }
}
