<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;

// ======================
// PUBLIC ROUTES
// ======================
Route::get('/', function () {
    return view('welcome');
});

// AUTH
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register'])->name('register.store');

Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.store');

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

// ======================
// PROTECTED ROUTES (LOGIN DULU)
// ======================
Route::middleware('auth')->group(function () {

    // HOME (INI PENTING BUAT REDIRECT)
    Route::get('/home', [AuthController::class, 'home'])->name('home');

    Route::get('/dashboard', [AuthController::class, 'dashboard'])->name('dashboard');

    // EVENT
    Route::get('/event/create', [EventController::class,'createEvent']);
    Route::post('/event/store', [EventController::class,'storeEvent']);

    Route::get('/events/public', [EventController::class,'publicEvents']);
    Route::get('/event/{id}', [EventController::class,'eventDetail']);

    Route::post('/event/{id}/join', [EventController::class,'joinEvent']);

    Route::get('/event/private/{token}', [EventController::class,'joinPrivate']);
});
