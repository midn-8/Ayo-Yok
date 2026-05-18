<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>AyoYok Payment</title>
    @vite(['resources/css/app.css', 'resources/js/payment.jsx'])
</head>
<body>
    <div
        id="ayoyok-payment-root"
        data-user-name="{{ auth()->user()->name ?? 'AyoYok User' }}"
        data-event-id="{{ $eventId }}"
    ></div>
</body>
</html>
