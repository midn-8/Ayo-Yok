<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Membership - AyoYok</title>
    @vite(['resources/css/app.css', 'resources/js/membership.jsx'])
</head>
<body class="bg-[#fdf8ff] text-[#1c1b21] antialiased selection:bg-[#c8bfff] selection:text-[#372687]">
    <div
        id="ayoyok-membership-root"
        data-user-name="{{ auth()->user()->name ?? 'AyoYok User' }}"
        data-user-username="{{ auth()->user()->username ? '@' . auth()->user()->username : '@ayoyok-user' }}"
        data-user-email="{{ auth()->user()->email ?? 'hello@ayoyok.app' }}"
        data-current-plan="{{ auth()->user()->membership_plan ?? 'free' }}"
    ></div>
</body>
</html>
