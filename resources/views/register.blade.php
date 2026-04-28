<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(180deg, #f6f0ff 0%, #eef6ff 100%);
            color: #1f2937;
        }
        .container {
            width: min(420px, calc(100vw - 32px));
            margin: 48px auto;
            padding: 32px;
            background: rgba(255, 255, 255, 0.96);
            border-radius: 20px;
            box-shadow: 0 24px 60px -30px rgba(15, 23, 42, 0.35);
        }
        h2 {
            margin: 0 0 8px;
            font-size: 32px;
        }
        p {
            margin: 0 0 20px;
            color: #6b7280;
        }
        label {
            display: block;
            margin-bottom: 6px;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #6b7280;
        }
        input {
            width: 100%;
            box-sizing: border-box;
            padding: 14px 16px;
            margin: 0 0 16px;
            border: 1px solid #d1d5db;
            border-radius: 12px;
            background: #fff;
            font-size: 15px;
        }
        input:focus {
            outline: none;
            border-color: #7c3aed;
            box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.12);
        }
        button {
            width: 100%;
            padding: 14px 16px;
            border: none;
            border-radius: 999px;
            background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
            color: #fff;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
        }
        button:hover {
            filter: brightness(1.03);
        }
        a {
            color: #7c3aed;
            font-weight: 700;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .error {
            margin-bottom: 16px;
            padding: 12px 14px;
            border-radius: 12px;
            background: #fef2f2;
            color: #b91c1c;
            border: 1px solid #fecaca;
        }
        .hint {
            margin-top: 20px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Create Account</h2>
        <p>Register to access the event dashboard and purchase flow.</p>

        @if ($errors->any())
            <div class="error">
                @foreach ($errors->all() as $error)
                    <div>{{ $error }}</div>
                @endforeach
            </div>
        @endif

        <form method="POST" action="/register">
            @csrf

            <label for="name">Full Name</label>
            <input id="name" type="text" name="name" placeholder="Full Name" value="{{ old('name') }}" required>

            <label for="username">Username</label>
            <input id="username" type="text" name="username" placeholder="Username" value="{{ old('username') }}" required>

            <label for="email">Email</label>
            <input id="email" type="email" name="email" placeholder="Email" value="{{ old('email') }}" required>

            <label for="phone_number">Phone Number</label>
            <input id="phone_number" type="text" name="phone_number" placeholder="Phone Number" value="{{ old('phone_number') }}" required>

            <label for="password">Password</label>
            <input id="password" type="password" name="password" placeholder="Password" required>

            <label for="password_confirmation">Confirm Password</label>
            <input id="password_confirmation" type="password" name="password_confirmation" placeholder="Confirm Password" required>

            <button type="submit">Register</button>
        </form>

        <p class="hint">Already have an account? <a href="/login">Login</a></p>
    </div>
</body>
</html>
