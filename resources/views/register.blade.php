<!DOCTYPE html>
<html class="light" lang="en">
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Register | AyoYok</title>
    <link href="https://fonts.googleapis.com" rel="preconnect">
    <link crossorigin href="https://fonts.gstatic.com" rel="preconnect">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        background: "#fdf8ff",
                        surface: "#fdf8ff",
                        "surface-container-low": "#f7f2fb",
                        "surface-container": "#f1ecf5",
                        "surface-container-high": "#ebe6ef",
                        "surface-container-highest": "#e5e1ea",
                        "surface-container-lowest": "#ffffff",
                        primary: "#5e50b0",
                        "primary-container": "#a294f9",
                        "primary-fixed": "#e5deff",
                        "primary-fixed-dim": "#c8bfff",
                        secondary: "#426656",
                        "secondary-container": "#c1e9d5",
                        "secondary-fixed": "#c4ebd8",
                        "secondary-fixed-dim": "#a8cfbc",
                        tertiary: "#6c5b4f",
                        "tertiary-container": "#b29e90",
                        "tertiary-fixed": "#f5dece",
                        "tertiary-fixed-dim": "#d8c2b3",
                        outline: "#797583",
                        "outline-variant": "#c9c4d3",
                        error: "#ba1a1a",
                        "error-container": "#ffdad6",
                        "on-background": "#1c1b21",
                        "on-surface": "#1c1b21",
                        "on-surface-variant": "#484552",
                        "on-primary": "#ffffff",
                        "on-primary-container": "#372687",
                        "on-secondary-container": "#466a5a",
                        "on-error-container": "#93000a"
                    },
                    fontFamily: {
                        display: ["Montserrat"],
                        body: ["Plus Jakarta Sans"]
                    },
                    boxShadow: {
                        ambient: "0 22px 70px -32px rgba(94, 80, 176, 0.35)",
                        float: "0 28px 90px -38px rgba(94, 80, 176, 0.42)"
                    }
                }
            }
        }
    </script>
    <style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .editorial-display {
            font-family: 'Montserrat', sans-serif;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.74);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
        }
        .scrapbook-shell {
            background-image:
                radial-gradient(circle at top left, rgba(200, 191, 255, 0.42), transparent 28%),
                radial-gradient(circle at 85% 18%, rgba(193, 233, 213, 0.34), transparent 22%),
                radial-gradient(circle at bottom right, rgba(245, 222, 206, 0.48), transparent 24%),
                linear-gradient(180deg, #fdf8ff 0%, #f6f0fb 100%);
        }
        .ambient-shadow {
            box-shadow: 0 24px 60px -30px rgba(94, 80, 176, 0.24);
        }
        .floating-card {
            box-shadow: 0 24px 70px -32px rgba(28, 27, 33, 0.28);
        }
        .input-focus:focus-within {
            box-shadow: 0 0 0 4px rgba(94, 80, 176, 0.12);
        }
    </style>
</head>
<body class="scrapbook-shell min-h-screen overflow-x-hidden bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-container">
    <div class="pointer-events-none fixed inset-0 overflow-hidden">
        <div class="absolute left-0 top-0 h-72 w-72 rounded-full bg-primary-fixed/65 blur-3xl"></div>
        <div class="absolute right-0 top-28 h-80 w-80 rounded-full bg-secondary-container/55 blur-3xl"></div>
        <div class="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-tertiary-fixed/55 blur-3xl"></div>
    </div>

    <main class="relative px-5 py-6 md:px-8 lg:px-10">
        <div class="mx-auto max-w-[1320px] overflow-hidden rounded-[38px] border border-white/60 bg-white/28 shadow-float lg:grid lg:grid-cols-[0.98fr_1.02fr]">
            <section class="relative overflow-hidden border-b border-white/40 md:min-h-[380px] lg:min-h-screen lg:border-b-0 lg:border-r">
                <div class="absolute inset-0 bg-gradient-to-br from-[#20183f] via-[#5e50b0]/55 to-[#f5dece]/40"></div>
                <div class="absolute inset-0">
                    <img
                        alt="An editorial collage of stylish event moments and community energy."
                        class="h-full w-full object-cover mix-blend-soft-light opacity-80"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5XJykBEcrFdT0RKIBAq8FNeKvX1kk-VTZe_zHtuBGtn5bsvW53XnAk8XaH0Mhkc2DdXdTurcrOzaBEGmSbCMWvyn1a-MjYP4SqNjLyV9h8LpO1aHLEWmomNebMxGoWXlzA_ylXTvrgIq2UcoeJSNwlK6UEzNvY61B0HbTJaX-D4rJ3FAlhSrgn1jnvrHma9O5Gcggj72NL9d1ErHf0lYVZO1b29vLv6w0s0RSYeVIjYRWd-KRg215gTHVFGQiUKzh1ig01duutPC-"
                    >
                </div>

                <div class="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8 lg:p-12">
                    <div class="flex items-center justify-between">
                        <a class="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-white backdrop-blur-md" href="{{ route('register') }}">
                            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-primary">AY</div>
                            <div>
                                <p class="editorial-display text-lg font-bold">AyoYok</p>
                                <p class="text-xs text-white/72">Welcome to the circle</p>
                            </div>
                        </a>
                        <div class="glass-card rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Join the community</div>
                    </div>

                    <div class="mt-10 lg:mt-0">
                        <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-md">
                            <span class="material-symbols-outlined text-base">favorite</span>
                            Build your social event identity
                        </div>
                        <h1 class="editorial-display max-w-xl text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                            Start your scrapbook of city nights, new circles, and unforgettable plans.
                        </h1>
                        <p class="mt-6 max-w-xl text-base leading-8 text-white/82 sm:text-lg">
                            Create your account, personalize your presence, and step into a platform made for discovering warm, aesthetic, high-energy experiences with people who get your vibe.
                        </p>
                    </div>

                    <div class="mt-10 grid gap-5 sm:grid-cols-2">
                        <div class="glass-card floating-card rounded-[28px] p-5">
                            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Memory wall</p>
                            <div class="mt-4 grid grid-cols-2 gap-3">
                                <img
                                    alt="Dreamy dinner event"
                                    class="h-28 w-full rotate-[-4deg] rounded-[20px] object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh0DFh8GLZBp3m7aJw5XbmwfRGHhw90FrixMdCsKvktESAY-JtlmE8SfjvYKCjgMxXFGc6hcEjzt0Ef7Y7DxVXQAfY2bzG0D6cPiikwYjTvwVGVeBzvZqFRIltqoNsrNDYyxaW3ho60XOyQnH6TjcEPZIFYpbz30SXynzsy2XI30cMJuibwAEuBtMFTLFPubNT4gZEIcVcjwCsFMWUR5I0Hs0vJieHkvp8LCWxlk_7HPWcXEhdI_lJHpl_EJ0PdJqrk9ZAG4hl6H7q"
                                >
                                <img
                                    alt="Community picnic"
                                    class="mt-5 h-28 w-full rotate-[5deg] rounded-[20px] object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgfvvgLU4R5y2sDWHMvutHNFawkejZ1i0I08W8mQmLgkCarF4a4ypV7NnTQ1YKec05IJvG5ler6k4uUMlutWh3v7SLmS_vmvTjaN2aOIe3loJrNw0p2RKNfgHP6OJC7inS3vA1shhfGL8uxYlj5Y9ad4YqZahsDT1_0Ay2NNAA5Bv-944tOe_qALCkl7TWyAFbU2KRGHNTE_TOSFemUBGPgD6QO0dnzA8rm7jgbGm1YOBodFvOwr_rofuqCo0szAH79ffj9Lj4BM_Y"
                                >
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div class="glass-card floating-card rounded-[24px] p-5">
                                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-outline">What you unlock</p>
                                <ul class="mt-4 space-y-3 text-sm leading-7 text-on-surface-variant">
                                    <li>Save and revisit the events that fit your scene.</li>
                                    <li>Keep your joined plans and tickets in one visual flow.</li>
                                    <li>Meet communities built around shared taste, not noise.</li>
                                </ul>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="glass-card floating-card rounded-[24px] p-4 text-center">
                                    <p class="text-xs uppercase tracking-[0.2em] text-outline">Curated drops</p>
                                    <p class="editorial-display mt-2 text-3xl font-bold text-primary">Weekly</p>
                                </div>
                                <div class="glass-card floating-card rounded-[24px] p-4 text-center">
                                    <p class="text-xs uppercase tracking-[0.2em] text-outline">Vibe first</p>
                                    <p class="editorial-display mt-2 text-3xl font-bold text-primary">Always</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="relative px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
                <div class="pointer-events-none absolute inset-0 overflow-hidden">
                    <div class="absolute right-10 top-16 h-20 w-20 rounded-full bg-primary-fixed/55 blur-2xl"></div>
                    <div class="absolute bottom-16 left-6 h-16 w-16 rounded-[24px] bg-secondary-fixed/60 blur-xl"></div>
                </div>

                <div class="relative z-10 mx-auto max-w-[640px]">
                    <div class="mb-6 lg:hidden">
                        <div class="overflow-hidden rounded-[28px] border border-white/70 bg-white/55 shadow-ambient backdrop-blur-xl">
                            <div class="p-5">
                                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Playful onboarding</p>
                                <p class="mt-3 text-sm leading-7 text-on-surface-variant">
                                    Set up your account and step into an event platform that feels more like a personal moodboard than a form.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="glass-card ambient-shadow rounded-[32px] border border-white/70 p-6 sm:p-8 lg:p-10">
                        <div class="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p class="text-xs font-semibold uppercase tracking-[0.28em] text-outline">Create your profile</p>
                                <h2 class="editorial-display mt-3 text-3xl font-bold leading-tight text-on-surface sm:text-4xl">Join the AyoYok community.</h2>
                            </div>
                            <span class="rounded-full bg-primary-fixed px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-on-primary-container">Register</span>
                        </div>

                        <p class="mt-4 max-w-xl text-sm leading-7 text-on-surface-variant sm:text-base">
                            This keeps your existing registration flow exactly the same, but wraps it in a softer, more immersive onboarding experience.
                        </p>

                        @if (session('status'))
                            <div class="mt-6 rounded-[24px] border border-secondary-fixed-dim/70 bg-secondary-fixed/60 px-5 py-4 text-sm font-semibold text-on-secondary-container">
                                {{ session('status') }}
                            </div>
                        @endif

                        @if ($errors->any())
                            <div class="mt-6 rounded-[24px] border border-error/15 bg-error-container/70 px-5 py-4 text-sm text-on-error-container">
                                <p class="font-semibold uppercase tracking-[0.2em]">Please review your details</p>
                                <ul class="mt-2 space-y-1 font-medium">
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif

                        <form action="{{ route('register.store') }}" class="mt-8 space-y-5" method="POST">
                            @csrf

                            <div class="grid gap-5 sm:grid-cols-2">
                                <div class="space-y-2">
                                    <label class="ml-1 text-xs font-semibold uppercase tracking-[0.22em] text-outline" for="name">Full Name</label>
                                    <div class="input-focus relative rounded-[22px] transition-all">
                                        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">person</span>
                                        <input
                                            autocomplete="name"
                                            class="w-full rounded-[22px] border border-white/80 bg-surface-container-low px-12 py-4 text-[15px] text-on-surface placeholder:text-outline-variant focus:border-primary focus:outline-none focus:ring-0"
                                            id="name"
                                            name="name"
                                            placeholder="Alex Rivera"
                                            required
                                            type="text"
                                            value="{{ old('name') }}"
                                        >
                                    </div>
                                    @error('name')
                                        <p class="ml-1 text-sm font-medium text-error">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div class="space-y-2">
                                    <label class="ml-1 text-xs font-semibold uppercase tracking-[0.22em] text-outline" for="username">Username</label>
                                    <div class="input-focus relative rounded-[22px] transition-all">
                                        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">alternate_email</span>
                                        <input
                                            autocomplete="username"
                                            class="w-full rounded-[22px] border border-white/80 bg-surface-container-low px-12 py-4 text-[15px] text-on-surface placeholder:text-outline-variant focus:border-primary focus:outline-none focus:ring-0"
                                            id="username"
                                            name="username"
                                            placeholder="alexafterdark"
                                            required
                                            type="text"
                                            value="{{ old('username') }}"
                                        >
                                    </div>
                                    @error('username')
                                        <p class="ml-1 text-sm font-medium text-error">{{ $message }}</p>
                                    @enderror
                                </div>
                            </div>

                            <div class="grid gap-5 sm:grid-cols-2">
                                <div class="space-y-2">
                                    <label class="ml-1 text-xs font-semibold uppercase tracking-[0.22em] text-outline" for="email">Email</label>
                                    <div class="input-focus relative rounded-[22px] transition-all">
                                        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">mail</span>
                                        <input
                                            autocomplete="email"
                                            class="w-full rounded-[22px] border border-white/80 bg-surface-container-low px-12 py-4 text-[15px] text-on-surface placeholder:text-outline-variant focus:border-primary focus:outline-none focus:ring-0"
                                            id="email"
                                            name="email"
                                            placeholder="alex@example.com"
                                            required
                                            type="email"
                                            value="{{ old('email') }}"
                                        >
                                    </div>
                                    @error('email')
                                        <p class="ml-1 text-sm font-medium text-error">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div class="space-y-2">
                                    <label class="ml-1 text-xs font-semibold uppercase tracking-[0.22em] text-outline" for="phone_number">Phone Number</label>
                                    <div class="input-focus relative rounded-[22px] transition-all">
                                        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">call</span>
                                        <input
                                            autocomplete="tel"
                                            class="w-full rounded-[22px] border border-white/80 bg-surface-container-low px-12 py-4 text-[15px] text-on-surface placeholder:text-outline-variant focus:border-primary focus:outline-none focus:ring-0"
                                            id="phone_number"
                                            name="phone_number"
                                            placeholder="+62 812 3456 7890"
                                            required
                                            type="text"
                                            value="{{ old('phone_number') }}"
                                        >
                                    </div>
                                    @error('phone_number')
                                        <p class="ml-1 text-sm font-medium text-error">{{ $message }}</p>
                                    @enderror
                                </div>
                            </div>

                            <div class="grid gap-5 sm:grid-cols-2">
                                <div class="space-y-2">
                                    <label class="ml-1 text-xs font-semibold uppercase tracking-[0.22em] text-outline" for="password">Password</label>
                                    <div class="input-focus relative rounded-[22px] transition-all">
                                        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
                                        <input
                                            autocomplete="new-password"
                                            class="w-full rounded-[22px] border border-white/80 bg-surface-container-low px-12 py-4 text-[15px] text-on-surface placeholder:text-outline-variant focus:border-primary focus:outline-none focus:ring-0"
                                            id="password"
                                            name="password"
                                            placeholder="Minimum 8 characters"
                                            required
                                            type="password"
                                        >
                                    </div>
                                    @error('password')
                                        <p class="ml-1 text-sm font-medium text-error">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div class="space-y-2">
                                    <label class="ml-1 text-xs font-semibold uppercase tracking-[0.22em] text-outline" for="password_confirmation">Confirm Password</label>
                                    <div class="input-focus relative rounded-[22px] transition-all">
                                        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">verified_user</span>
                                        <input
                                            autocomplete="new-password"
                                            class="w-full rounded-[22px] border border-white/80 bg-surface-container-low px-12 py-4 text-[15px] text-on-surface placeholder:text-outline-variant focus:border-primary focus:outline-none focus:ring-0"
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            placeholder="Repeat your password"
                                            required
                                            type="password"
                                        >
                                    </div>
                                </div>
                            </div>

                            <div class="rounded-[24px] border border-white/70 bg-white/55 p-4 text-sm leading-7 text-on-surface-variant">
                                Your account will still use the same Laravel validation, auth flow, and redirect behavior after sign-up.
                            </div>

                            <button class="w-full rounded-[22px] bg-primary px-6 py-4 text-base font-semibold text-on-primary shadow-ambient transition hover:-translate-y-0.5 hover:bg-primary/90 active:scale-[0.99]" type="submit">
                                Create Account
                            </button>
                        </form>

                        <footer class="mt-8 flex flex-col items-center gap-3 text-center text-sm text-on-surface-variant sm:flex-row sm:justify-between sm:text-left">
                            <p>Already have an account? <a class="font-semibold text-primary hover:underline" href="{{ route('login') }}">Login</a></p>
                            <p class="text-xs uppercase tracking-[0.22em] text-outline">Dreamy, social, immersive</p>
                        </footer>
                    </div>

                    <p class="mt-6 text-center text-xs font-medium uppercase tracking-[0.24em] text-outline">© 2026 AyoYok. Welcome to the circle.</p>
                </div>
            </section>
        </div>
    </main>
</body>
</html>
