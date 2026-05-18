<?php

namespace App\Http\Controllers;

class SocialController extends Controller
{
    public function explore()
    {
        return view('explore');
    }

    public function schedule()
    {
        return view('schedule');
    }

    public function profile()
    {
        return view('profile');
    }
}
