<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Models\User;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('studio:grant-partner {email : User email} {--suffix=.ayoyok-partner : Partner username suffix}', function () {
    $email = (string) $this->argument('email');
    $suffix = (string) $this->option('suffix');

    /** @var User|null $user */
    $user = User::query()->where('email', $email)->first();

    if (!$user) {
        $this->error("User with email {$email} was not found.");
        return self::FAILURE;
    }

    if (!str_ends_with($user->username, $suffix)) {
        $candidate = "{$user->username}{$suffix}";
        $exists = User::query()->where('username', $candidate)->where('id', '!=', $user->id)->exists();

        if ($exists) {
            $this->error("Cannot apply suffix. Username {$candidate} is already in use.");
            return self::FAILURE;
        }

        $user->username = $candidate;
    }

    $user->is_studio_partner = true;
    $user->studio_partner_approved_at = now();
    $user->save();

    $this->info("Studio partner granted to {$user->email} ({$user->username}).");
    return self::SUCCESS;
})->purpose('Grant Studio access to a user and append partner username suffix.');

Artisan::command('studio:revoke-partner {email : User email} {--suffix=.ayoyok-partner : Partner username suffix}', function () {
    $email = (string) $this->argument('email');
    $suffix = (string) $this->option('suffix');

    /** @var User|null $user */
    $user = User::query()->where('email', $email)->first();

    if (!$user) {
        $this->error("User with email {$email} was not found.");
        return self::FAILURE;
    }

    if (str_ends_with($user->username, $suffix)) {
        $candidate = substr($user->username, 0, -strlen($suffix));
        $exists = User::query()->where('username', $candidate)->where('id', '!=', $user->id)->exists();

        if ($exists) {
            $this->warn("Suffix retained because username {$candidate} is already used by another account.");
        } else {
            $user->username = $candidate;
        }
    }

    $user->is_studio_partner = false;
    $user->studio_partner_approved_at = null;
    $user->save();

    $this->info("Studio partner revoked for {$user->email} ({$user->username}).");
    return self::SUCCESS;
})->purpose('Revoke Studio access from a user and remove partner username suffix when present.');
