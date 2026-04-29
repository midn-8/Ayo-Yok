<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>AyoYok Profile</title>
    @vite(['resources/css/app.css', 'resources/js/profile.jsx'])
</head>
<body>
    <div
        id="ayoyok-profile-root"
        data-user-name="{{ auth()->user()->name ?? 'AyoYok User' }}"
        data-user-username="{{ auth()->user()->username ? '@' . auth()->user()->username : '@ayoyok-user' }}"
        data-user-email="{{ auth()->user()->email ?? 'hello@ayoyok.app' }}"
        data-user-bio="Always chasing events with good energy, better playlists, and people worth meeting."
    ></div>
</body>
</html>
