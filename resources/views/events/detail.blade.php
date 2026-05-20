<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $event['title'] }} | AyoYok</title>
    @vite(['resources/css/app.css', 'resources/js/event-detail.jsx'])
    <style>
        body {
            background-color: #fdf8ff;
        }

        .event-memory-shell {
            background-image:
                radial-gradient(circle at top left, rgba(200, 191, 255, 0.28), transparent 24%),
                radial-gradient(circle at top right, rgba(193, 233, 213, 0.22), transparent 20%),
                radial-gradient(circle at bottom right, rgba(245, 222, 206, 0.24), transparent 26%),
                linear-gradient(180deg, #fdf8ff 0%, #f7f2fb 55%, #fdf8ff 100%);
        }

        .hero-haze {
            box-shadow: 0 28px 80px -38px rgba(94, 80, 176, 0.34);
        }

        .scrapbook-tape::before {
            content: '';
            position: absolute;
            top: -12px;
            left: 50%;
            width: 86px;
            height: 26px;
            border-radius: 999px;
            transform: translateX(-50%) rotate(-4deg);
            background: rgba(229, 222, 255, 0.86);
            box-shadow: 0 6px 18px -14px rgba(28, 27, 33, 0.45);
        }

        .polaroid-card {
            box-shadow: 0 24px 54px -34px rgba(28, 27, 33, 0.28);
        }

        .story-frame {
            box-shadow: 0 28px 60px -34px rgba(94, 80, 176, 0.2);
        }
    </style>
</head>
<body>
    <div
        id="ayoyok-event-detail-root"
        data-user-name="{{ auth()->user()->name ?? 'AyoYok User' }}"
        data-user-username="{{ auth()->user()->username ? '@' . auth()->user()->username : '@ayoyok-user' }}"
        data-user-email="{{ auth()->user()->email ?? 'hello@ayoyok.app' }}"
        data-event-id="{{ $event['id'] }}"
        data-event-title="{{ $event['title'] }}"
        data-event-description="{{ $event['description'] }}"
        data-event-price="{{ $event['price'] }}"
        data-join-url="{{ route('event.join', ['id' => $event['id']]) }}"
        data-payment-url="{{ route('payment.show', ['id' => $event['id']]) }}"
        data-back-url="{{ url('/events/public') }}"
        data-csrf="{{ csrf_token() }}"
    ></div>
</body>
</html>
