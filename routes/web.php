<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\SocialController;

// ======================
// PUBLIC ROUTES
// ======================
Route::get('/', function () {
    return redirect()->route('dashboard');
})->name('root');

// AUTH
Route::middleware('guest')->group(function () {
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.store');

    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.store');
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

// ======================
// PROTECTED ROUTES (LOGIN DULU)
// ======================
Route::middleware('auth')->group(function () {

    // HOME (INI PENTING BUAT REDIRECT)
    Route::get('/home', [AuthController::class, 'home'])->name('home');

    Route::get('/dashboard', [AuthController::class, 'dashboard'])->name('dashboard');
    Route::get('/explore', [SocialController::class, 'explore'])->name('explore');
    Route::get('/schedule', [SocialController::class, 'schedule'])->name('schedule');
    Route::get('/profile', [SocialController::class, 'profile'])->name('profile');

    // MEMBERSHIP
    Route::get('/membership', [\App\Http\Controllers\MembershipController::class, 'index'])->name('membership.index');
    Route::get('/membership/checkout/{plan}', [\App\Http\Controllers\MembershipController::class, 'checkout'])->name('membership.checkout');
    Route::post('/membership/checkout/{plan}', [\App\Http\Controllers\MembershipController::class, 'processCheckout'])->name('membership.process');

    // EVENT
    Route::get('/event/create', [EventController::class, 'createPrivateEvent'])->name('event.create');
    Route::get('/events/private/create', [EventController::class, 'createPrivateEvent'])->name('events.private.create');
    Route::post('/event/store', [EventController::class, 'storeEvent'])->name('event.store');
    Route::post('/events/private/store', [EventController::class, 'storePrivateEvent'])->name('events.private.store');

    Route::get('/events/public', [EventController::class, 'publicEvents']);
    Route::get('/events/{id}', [EventController::class, 'eventDetail'])->name('events.show');
    Route::get('/event/{id}', [EventController::class, 'eventDetail'])->name('event.show');
    Route::get('/invite/{token}', [EventController::class, 'joinPrivate'])->name('invite.show');
    Route::get('/event/private/{token}', [EventController::class, 'joinPrivate'])->name('events.private.invitation');

    Route::post('/event/{id}/join', [EventController::class, 'joinEvent'])->name('event.join');
    Route::get('/payment/{id}', [EventController::class, 'payment'])->name('payment.show');
    Route::post('/payment/{id}/confirm', [EventController::class, 'confirmPayment'])->name('payment.confirm');

    // STUDIO (ORGANIZER PLATFORM)
    Route::middleware('studio.partner')->group(function () {
        Route::get('/studio', function () {
            return view('studio.app', [
                'studioPage' => 'dashboard',
                'studioTitle' => 'AyoYok Studio Dashboard',
            ]);
        })->name('studio.dashboard');

        Route::get('/studio/create-event', function () {
            return view('studio.app', [
                'studioPage' => 'create-event',
                'studioTitle' => 'AyoYok Studio Create Event',
            ]);
        })->name('studio.create-event');

        Route::get('/studio/boost-event', function () {
            return view('studio.app', [
                'studioPage' => 'boost-event',
                'studioTitle' => 'AyoYok Studio Boost Event',
            ]);
        })->name('studio.boost-event');

        Route::get('/studio/schedule-window', function () {
            return view('studio.app', [
                'studioPage' => 'schedule-window',
                'studioTitle' => 'AyoYok Studio Schedule Window',
            ]);
        })->name('studio.schedule-window');

        Route::get('/studio/social-media-management', function () {
            return view('studio.app', [
                'studioPage' => 'social-media-management',
                'studioTitle' => 'AyoYok Studio Social Media Management',
            ]);
        })->name('studio.social-media-management');

        Route::get('/studio/social-preview', function () {
            return view('studio.app', [
                'studioPage' => 'social-preview',
                'studioTitle' => 'AyoYok Studio Social Preview',
            ]);
        })->name('studio.social-preview');

        Route::get('/studio/planning', function () {
            return view('studio.app', [
                'studioPage' => 'planning',
                'studioTitle' => 'AyoYok Studio Planning',
            ]);
        })->name('studio.planning');

        Route::get('/studio/payment-configuration', function () {
            return view('studio.app', [
                'studioPage' => 'payment-configuration',
                'studioTitle' => 'AyoYok Studio Payment Configuration',
            ]);
        })->name('studio.payment-configuration');

        Route::get('/studio/organizer-profile', function () {
            return view('studio.app', [
                'studioPage' => 'organizer-profile',
                'studioTitle' => 'AyoYok Studio Organizer Profile',
            ]);
        })->name('studio.organizer-profile');
    });
});
