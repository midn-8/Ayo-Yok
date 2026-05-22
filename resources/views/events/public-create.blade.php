<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>AyoYok Public Event</title>
    @vite(['resources/css/app.css', 'resources/js/private-event.jsx'])
</head>
<body>
    <div
        id="ayoyok-private-event-root"
        data-event-mode="{{ $eventMode ?? 'public' }}"
        data-user-name="{{ auth()->user()->name ?? 'AyoYok User' }}"
        data-user-email="{{ auth()->user()->email ?? 'hello@ayoyok.app' }}"
        data-user-username="{{ auth()->user()->username ?? 'ayoyok-user' }}"
        data-user-plan="Free"
    ></div>
</body>
</html>
