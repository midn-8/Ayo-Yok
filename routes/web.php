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
});
