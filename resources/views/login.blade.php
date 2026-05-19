<!DOCTYPE html>
<html class="light" lang="en">
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Login | AyoYok</title>
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
                        ambient: "0 20px 60px -28px rgba(94, 80, 176, 0.35)",
                        float: "0 24px 80px -30px rgba(94, 80, 176, 0.45)"
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
            background: rgba(255, 255, 255, 0.72);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
        }
        .scrapbook-shell {
            background-image:
                radial-gradient(circle at top left, rgba(200, 191, 255, 0.45), transparent 28%),
                radial-gradient(circle at top right, rgba(193, 233, 213, 0.32), transparent 24%),
                radial-gradient(circle at bottom right, rgba(245, 222, 206, 0.46), transparent 26%),
                linear-gradient(180deg, #fdf8ff 0%, #f8f1fb 100%);
        }
        .ambient-shadow {
            box-shadow: 0 24px 60px -28px rgba(94, 80, 176, 0.28);
        }
        .floating-note {
            box-shadow: 0 18px 40px -24px rgba(28, 27, 33, 0.35);
        }
        .input-focus:focus-within {
            box-shadow: 0 0 0 4px rgba(94, 80, 176, 0.12);
        }
    </style>
</head>
<body class="scrapbook-shell min-h-screen overflow-x-hidden bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-container">
    <div class="pointer-events-none fixed inset-0 overflow-hidden">
        <div class="absolute -left-20 top-10 h-56 w-56 rounded-full bg-primary-fixed/70 blur-3xl"></div>
        <div class="absolute right-0 top-24 h-72 w-72 rounded-full bg-secondary-container/60 blur-3xl"></div>
        <div class="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-tertiary-fixed/60 blur-3xl"></div>
    </div>

    <main class="relative px-5 py-6 md:px-8 lg:px-10">
        <div class="mx-auto grid min-h-[calc(100vh-3rem)] max-w-[1280px] overflow-hidden rounded-[36px] border border-white/60 bg-white/30 shadow-float md:grid-cols-[1.05fr_0.95fr]">
            <section class="relative hidden min-h-full overflow-hidden md:flex">
                <div class="absolute inset-0">
                    <img
                        alt="A dreamy evening social event with string lights and friends gathered around a beautifully styled table."
                        class="h-full w-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsvUXVxu44HydnsCT9G_0dbXgxflCMTVoPBZgizxnnQ04uY9yD0wdo_CQebdmo8GDtpg0uiyH5a24cJTVl6CU3cbF-60ZiMRIuY-hi8gzWKMk74NaPgNn7BlstVFhfONgmt4K7muwE6RyvCHzMQHl9L5tuDbfa21a1Dlws7hKUGjkqjiRUi9-YcMBX13M0avH7GxWA-W55mPb90Mg29qKYR6mG7m7nQiUyoCrXZtnps6diOAm0_0hjHwbFlhKFv4Lh-SMlkJRjWuOP"
                    >
                    <div class="absolute inset-0 bg-gradient-to-br from-[#1a1338]/55 via-[#5e50b0]/20 to-[#f5dece]/10"></div>
                </div>

                <div class="relative z-10 flex w-full flex-col justify-between p-10 lg:p-14">
                    <div class="flex items-center justify-between">
                        <a class="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-white backdrop-blur-md" href="{{ route('login') }}">
                            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-primary">AY</div>
                            <div>
                                <p class="editorial-display text-lg font-bold">AyoYok</p>
                                <p class="text-xs text-white/70">Social event platform</p>
                            </div>
                        </a>
                        <div class="glass-card rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">Scrapbook nights</div>
                    </div>

                    <div class="max-w-xl">
                        <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-md">
                            <span class="material-symbols-outlined text-base">auto_awesome</span>
                            Find your next unforgettable memory
                        </div>
                        <h1 class="editorial-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white lg:text-6xl">
                            Nights that start with a ticket and end as a story worth retelling.
                        </h1>
                        <p class="mt-6 max-w-lg text-base leading-8 text-white/82 lg:text-lg">
                            Step back into your event circle, pick up your plans, and keep the social momentum moving with every RSVP, playlist, and late-night memory.
                        </p>
                    </div>

                    <div class="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
                        <div class="glass-card floating-note rounded-[28px] p-6">
                            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Moodboard note</p>
                            <h2 class="editorial-display mt-3 text-2xl font-semibold text-on-surface">Discover your next favorite memory.</h2>
                            <p class="mt-3 text-sm leading-7 text-on-surface-variant">
                                Join a community of curators and explorers building warm, real-world connections through music nights, supper clubs, workshops, and intimate local scenes.
                            </p>
                        </div>

                        <div class="space-y-4">
                            <div class="glass-card floating-note rounded-[24px] p-4">
                                <div class="flex items-center gap-4">
                                    <img
                                        alt="Event collage snapshot"
                                        class="h-20 w-20 rounded-[18px] object-cover"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-35KYAX0MrPEsH1xRa_xNWMsKE7UDdbpwbRDiBo16DT6f6smDdGUXZSZcBxgiiDzFZiPoI7ppOog4aA1dG5pcJD21zXFfm1UNsBjshCnO8XtlRc8tF82HNfPQhY2HIueDJYyqVlWYI50cvRCk8-lsBu7VmFD2Vv25xvqbNYaP2XltBufwzCiK7XDOWzyaPRJbuHE0keTdkcO02_kuzesVYwfqV4FGFAEkZZfETYrTM-cQOIO2zJcIYGOEIhUuJMC8DXgDOvvIlYYr"
                                    >
                                    <div>
                                        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-outline">Saved vibe</p>
                                        <p class="mt-2 text-sm font-semibold text-on-surface">Botanical brunch, rooftop jazz, and people you actually want to meet.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="glass-card floating-note rounded-[24px] p-4 text-center">
                                    <p class="text-xs uppercase tracking-[0.2em] text-outline">Members</p>
                                    <p class="editorial-display mt-2 text-3xl font-bold text-primary">12k+</p>
                                </div>
                                <div class="glass-card floating-note rounded-[24px] p-4 text-center">
                                    <p class="text-xs uppercase tracking-[0.2em] text-outline">Weekly drops</p>
                                    <p class="editorial-display mt-2 text-3xl font-bold text-primary">48</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="relative flex items-center justify-center px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
                <div class="pointer-events-none absolute inset-0 overflow-hidden">
                    <div class="absolute left-8 top-10 h-16 w-16 rounded-[22px] bg-primary-fixed/70 blur-xl"></div>
                    <div class="absolute bottom-12 right-10 h-24 w-24 rounded-full bg-secondary-fixed/60 blur-2xl"></div>
                </div>

                <div class="relative z-10 w-full max-w-[470px]">
                    <div class="mb-6 md:hidden">
                        <div class="overflow-hidden rounded-[28px] border border-white/70 bg-white/55 shadow-ambient backdrop-blur-xl">
                            <img
                                alt="Friends gathered at a dreamy event table"
                                class="h-48 w-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsvUXVxu44HydnsCT9G_0dbXgxflCMTVoPBZgizxnnQ04uY9yD0wdo_CQebdmo8GDtpg0uiyH5a24cJTVl6CU3cbF-60ZiMRIuY-hi8gzWKMk74NaPgNn7BlstVFhfONgmt4K7muwE6RyvCHzMQHl9L5tuDbfa21a1Dlws7hKUGjkqjiRUi9-YcMBX13M0avH7GxWA-W55mPb90Mg29qKYR6mG7m7nQiUyoCrXZtnps6diOAm0_0hjHwbFlhKFv4Lh-SMlkJRjWuOP"
                            >
                            <div class="p-5">
                                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Welcome back</p>
                                <p class="mt-2 text-sm leading-7 text-on-surface-variant">Log in and jump straight back into the social calendar you were curating.</p>
                            </div>
                        </div>
                    </div>

                    <div class="glass-card ambient-shadow rounded-[32px] border border-white/70 p-6 sm:p-8 lg:p-10">
                        <div class="flex items-center justify-between">
                            <a class="inline-flex items-center gap-3" href="{{ route('login') }}">
                                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary">AY</div>
                                <div>
                                    <p class="editorial-display text-2xl font-bold tracking-[-0.02em] text-primary">AyoYok</p>
                                    <p class="text-xs text-outline">Dreamy social discovery</p>
                                </div>
                            </a>
                            <span class="rounded-full bg-primary-fixed px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-on-primary-container">Login</span>
                        </div>

                        <header class="mt-8 space-y-3">
                            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-outline">Social memories await</p>
                            <h2 class="editorial-display text-3xl font-bold leading-tight text-on-surface sm:text-4xl">Welcome back to your event scrapbook.</h2>
                            <p class="max-w-md text-sm leading-7 text-on-surface-variant sm:text-base">
                                Sign in to reopen your plans, tickets, and the moments you&apos;ve been saving for later.
                            </p>
                        </header>

                        @if (session('status'))
                            <div class="mt-6 rounded-[24px] border border-secondary-fixed-dim/70 bg-secondary-fixed/60 px-5 py-4 text-sm font-semibold text-on-secondary-container">
                                {{ session('status') }}
                            </div>
                        @endif

                        @if ($errors->any())
                            <div class="mt-6 rounded-[24px] border border-error/15 bg-error-container/70 px-5 py-4 text-sm text-on-error-container">
                                <p class="font-semibold uppercase tracking-[0.2em]">Login failed</p>
                                <ul class="mt-2 space-y-1 font-medium">
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif

                        <form action="{{ route('login.store') }}" class="mt-8 space-y-6" method="POST">
                            @csrf

                            <div class="space-y-2">
                                <label class="ml-1 text-xs font-semibold uppercase tracking-[0.22em] text-outline" for="email">Email Address</label>
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
                                <div class="ml-1 flex items-center justify-between gap-3">
                                    <label class="text-xs font-semibold uppercase tracking-[0.22em] text-outline" for="password">Password</label>
                                    <span class="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/75">Recovery soon</span>
                                </div>
                                <div class="input-focus relative rounded-[22px] transition-all">
                                    <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">lock</span>
                                    <input
                                        autocomplete="current-password"
                                        class="w-full rounded-[22px] border border-white/80 bg-surface-container-low px-12 py-4 text-[15px] text-on-surface placeholder:text-outline-variant focus:border-primary focus:outline-none focus:ring-0"
                                        id="password"
                                        name="password"
                                        placeholder="••••••••"
                                        required
                                        type="password"
                                    >
                                </div>
                                @error('password')
                                    <p class="ml-1 text-sm font-medium text-error">{{ $message }}</p>
                                @enderror
                            </div>

                            <div class="flex flex-col gap-4 rounded-[24px] border border-white/70 bg-white/55 p-4 sm:flex-row sm:items-center sm:justify-between">
                                <label class="inline-flex items-center gap-3 text-sm font-medium text-on-surface" for="remember">
                                    <input
                                        {{ old('remember') ? 'checked' : '' }}
                                        class="h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary/20"
                                        id="remember"
                                        name="remember"
                                        type="checkbox"
                                        value="1"
                                    >
                                    <span>Keep me signed in</span>
                                </label>
                                <p class="text-xs uppercase tracking-[0.2em] text-outline">Optional</p>
                            </div>

                            <button class="w-full rounded-[22px] bg-primary px-6 py-4 text-base font-semibold text-on-primary shadow-ambient transition hover:-translate-y-0.5 hover:bg-primary/90 active:scale-[0.99]" type="submit">
                                Sign In
                            </button>
                        </form>

                        <div class="mt-8">
                            <div class="relative flex items-center py-2">
                                <div class="h-px flex-1 bg-outline-variant/70"></div>
                                <span class="px-4 text-xs font-semibold uppercase tracking-[0.22em] text-outline">Or continue with</span>
                                <div class="h-px flex-1 bg-outline-variant/70"></div>
                            </div>

                            <div class="mt-4 grid grid-cols-2 gap-4">
                                <button class="rounded-[20px] border border-white/70 bg-white/65 px-4 py-3 text-sm font-semibold text-on-surface transition hover:bg-surface-container-low" type="button">
                                    Google
                                </button>
                                <button class="rounded-[20px] border border-white/70 bg-white/65 px-4 py-3 text-sm font-semibold text-on-surface transition hover:bg-surface-container-low" type="button">
                                    Apple
                                </button>
                            </div>
                        </div>

                        <footer class="mt-8 text-center text-sm text-on-surface-variant">
                            New to AyoYok?
                            <a class="ml-1 font-semibold text-primary hover:underline" href="{{ route('register') }}">Create an account</a>
                        </footer>
                    </div>

                    <p class="mt-6 text-center text-xs font-medium uppercase tracking-[0.24em] text-outline">© 2026 AyoYok. All rights reserved.</p>
                </div>
            </section>
        </div>
    </main>
</body>
</html>
