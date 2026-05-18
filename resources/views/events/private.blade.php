<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>AyoYok Invitation</title>
    @vite(['resources/css/app.css', 'resources/js/private-invite.jsx'])
</head>
<body>
    <div
        id="ayoyok-invitation-root"
        data-token="{{ $token }}"
        data-theme="{{ $theme }}"
        data-authenticated="{{ auth()->check() ? 'true' : 'false' }}"
        data-viewer-name="{{ auth()->user()->name ?? 'Guest Viewer' }}"
    ></div>
</body>
</html>
