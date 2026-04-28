<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showLogin()
    {
        return view('login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->route('home');
        }

        return back()->with('error', 'Email atau password salah');
    }

    public function showRegister()
    {
        return view('register');
    }

    // ======================
    // REGISTER LOGIC - FIXED
    // ======================
    public function register(Request $request)
{
    // 1. Validation
    $validatedData = $request->validate([
        'name'         => 'required|string|max:255',
        'username'     => 'required|string|max:255|unique:users',
        'email'        => 'required|string|email|max:255|unique:users',
        'phone_number' => 'required|string|max:20',
        'password'     => 'required|string|min:8',
    ]);

    // 2. Create User
    $user = User::create([
        'name'         => $validatedData['name'],
        'username'     => $validatedData['username'],
        'email'        => $validatedData['email'],
        'phone_number' => $validatedData['phone_number'],
        'password'     => Hash::make($validatedData['password']),
        'role'         => 'customer', 
    ]);

    // 3. Login & Redirect
        Auth::login($user);
        return redirect()->route('home')->with('success', 'Welcome to the Playground!');
    }

        // 3. Log the user in immediately
        // Auth::login($user);

        // 4. Redirect home
        return redirect()->route('home')->with('success', 'Account created successfully!');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}