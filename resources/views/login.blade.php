<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Social Playground - Login</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "outline-variant": "#c4a2cd",
              "inverse-on-surface": "#b392bc",
              "tertiary": "#00675c",
              "primary": "#8126cf",
              "surface-container-high": "#f8d8ff",
              "inverse-primary": "#b76dff",
              "background": "#fff3fd",
              "on-secondary-container": "#6f391b",
              "on-secondary-fixed": "#57260a",
              "on-primary-container": "#360061",
              "secondary-dim": "#794023",
              "tertiary-dim": "#005a50",
              "surface-tint": "#8126cf",
              "surface-container": "#fbdfff",
              "secondary": "#874c2d",
              "on-tertiary-fixed-variant": "#00695e",
              "primary-dim": "#740ec2",
              "primary-fixed-dim": "#b971ff",
              "outline": "#8b6c94",
              "on-primary-fixed": "#000000",
              "secondary-fixed-dim": "#ffb28d",
              "on-secondary": "#fff0ea",
              "surface-container-highest": "#f6d0ff",
              "on-primary-fixed-variant": "#430076",
              "on-tertiary": "#c1fff2",
              "tertiary-container": "#65fde6",
              "tertiary-fixed-dim": "#54eed8",
              "on-tertiary-container": "#005e54",
              "on-error": "#ffefef",
              "secondary-container": "#ffc5aa",
              "surface-bright": "#fff3fd",
              "surface": "#fff3fd",
              "on-surface": "#3e2548",
              "tertiary-fixed": "#65fde6",
              "primary-fixed": "#c284ff",
              "on-background": "#3e2548",
              "surface-container-lowest": "#ffffff",
              "inverse-surface": "#1b0425",
              "on-surface-variant": "#6e5177",
              "on-secondary-fixed-variant": "#7a4124",
              "on-error-container": "#510017",
              "error-dim": "#a70138",
              "error": "#b41340",
              "secondary-fixed": "#ffc5aa",
              "on-tertiary-fixed": "#004a41",
              "on-primary": "#fbefff",
              "surface-dim": "#f2c5ff",
              "error-container": "#f74b6d",
              "surface-container-low": "#feebff",
              "primary-container": "#c284ff",
              "surface-variant": "#f6d0ff"
            },
            fontFamily: {
              "headline": ["Plus Jakarta Sans"],
              "body": ["Plus Jakarta Sans"],
              "label": ["Plus Jakarta Sans"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .bubbly-bg {
            background-color: #fff3fd;
            background-image: 
                radial-gradient(circle at 10% 20%, #fbdfff 0%, transparent 20%),
                radial-gradient(circle at 90% 80%, #ffc5aa 0%, transparent 25%),
                radial-gradient(circle at 50% 50%, #65fde6 0%, transparent 30%),
                radial-gradient(circle at 80% 10%, #c284ff 0%, transparent 20%);
            background-attachment: fixed;
        }
    </style>
</head>
<body class="bubbly-bg min-h-screen flex items-center justify-center p-6 overflow-hidden">
<!-- Abstract Floating Shapes (The "Joyous Orbit") -->
<div class="fixed inset-0 pointer-events-none z-0">
<div class="absolute top-[-10%] left-[-5%] w-96 h-96 bg-secondary-container rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
<div class="absolute bottom-[-5%] right-[-5%] w-[30rem] h-[30rem] bg-tertiary-container rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
<div class="absolute top-[20%] right-[10%] w-64 h-64 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
</div>
<!-- Main Content Canvas -->
<main class="relative z-10 w-full max-w-lg">
<!-- Login Card -->
<div class="bg-surface-container-lowest/80 backdrop-blur-2xl rounded-xl p-12 shadow-[30px_0_60px_-15px_rgba(129,38,207,0.06)] border-[3px] border-surface-container-high relative overflow-visible">
<!-- Character Mascot - Overlapping the edge -->
<div class="absolute -top-16 -right-12 w-40 h-40 transform rotate-12 drop-shadow-xl">
<img alt="Friendly purple blob character with simple dot eyes and a big smile waving hello" class="w-full h-full object-contain" data-alt="A cute purple organic blob character with simple dot eyes and a happy expression, vibrant soft shading, playful mascot design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQjiuw0qCXN1o7Obha-FCDsSl0-bECO7-h1z1ie8q9aQ_MILo7G3Eg-KmK93CzonlNOShF4108dbuVrR3zblKjlBItiRwLAZ7acpe9BU0yLPYRC8-xjXdYqAbozsOGM5ACHF5HhnRQ3mx9_p1ebWoDWyoVaMoXMNDmbBbS3Mj-FwWuGY9GCHHuYL9Gh49vOLb3SgHnAIEwEC54vzqqwgstXe-BuxzvkMCJ84Cm1HPUPVPFDzF4aemxKpuYC4eBDf0wf7TsmtQFxtNd"/>
</div>
<!-- Header Section -->
<div class="mb-10 text-center">
<div class="inline-flex items-center gap-2 mb-4">
<span class="text-3xl font-black tracking-tight text-primary">Social Playground</span>
</div>
<h1 class="text-5xl font-extrabold text-on-surface tracking-tight mb-2">Welcome Back!</h1>
<p class="text-on-surface-variant text-lg">Your creative community is waiting for you.</p>
</div>
@if ($errors->any())
<div class="mb-6 rounded-[2rem] border-2 border-error/20 bg-error/10 px-6 py-4 text-left text-sm font-semibold text-error">
    <p class="uppercase tracking-wider">Login failed</p>
    <p class="mt-1 normal-case tracking-normal">{{ $errors->first() }}</p>
</div>
@endif
<!-- Login Form -->
<form action="/login" class="space-y-6" method="POST">
@csrf
<!-- Email Input -->
<div class="space-y-2">
<label class="text-xs font-bold uppercase tracking-wider text-outline px-4" for="email">Email Address</label>
<div class="relative">
<input autocomplete="email" class="w-full h-16 bg-surface-container-low border-2 border-outline/20 rounded-full px-8 text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg font-medium" id="email" name="email" placeholder="hello@playground.com" required type="email" value="{{ old('email') }}"/>
<span class="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-outline">alternate_email</span>
</div>
@error('email')
<p class="px-4 text-sm font-semibold text-error">{{ $message }}</p>
@enderror
</div>
<!-- Password Input -->
<div class="space-y-2">
<div class="flex justify-between items-center px-4">
<label class="text-xs font-bold uppercase tracking-wider text-outline" for="password">Password</label>
<a class="text-xs font-bold uppercase tracking-wider text-secondary hover:text-on-secondary-container transition-colors" href="#">Forgot Password?</a>
</div>
<div class="relative">
<input autocomplete="current-password" class="w-full h-16 bg-surface-container-low border-2 border-outline/20 rounded-full px-8 text-on-surface placeholder:text-outline-variant focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg font-medium" id="password" name="password" placeholder="••••••••" required type="password"/>
<span class="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-outline">lock</span>
</div>
@error('password')
<p class="px-4 text-sm font-semibold text-error">{{ $message }}</p>
@enderror
</div>
<!-- Action Button Cluster -->
<div class="pt-4 flex flex-col items-center gap-6 relative">
<!-- Enter Button -->
<button class="group relative w-full h-20 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full text-2xl font-black tracking-tight shadow-[0_8px_0_0_#430076] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3" type="submit">
                        Enter
                        <span class="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform">arrow_forward</span>
</button>
<!-- Secondary Options -->
<div class="flex items-center gap-4 w-full">
<div class="h-[2px] flex-grow bg-surface-container-high"></div>
<span class="text-outline text-sm font-bold uppercase tracking-widest">or hop in with</span>
<div class="h-[2px] flex-grow bg-surface-container-high"></div>
</div>
<div class="grid grid-cols-2 gap-4 w-full">
<button class="h-14 bg-surface-container-highest/50 border-2 border-outline/10 rounded-full flex items-center justify-center gap-2 font-bold text-on-surface hover:bg-surface-container-highest transition-colors" type="button">
<span class="material-symbols-outlined text-primary">google</span>
                            Google
                        </button>
<button class="h-14 bg-surface-container-highest/50 border-2 border-outline/10 rounded-full flex items-center justify-center gap-2 font-bold text-on-surface hover:bg-surface-container-highest transition-colors" type="button">
<span class="material-symbols-outlined text-primary">ios</span>
                            Apple
                        </button>
</div>
</div>
</form>
<!-- Bottom Registration Link -->
<div class="mt-12 text-center">
<p class="text-on-surface-variant font-medium">
                    Not part of the playground yet? 
                    <a class="text-primary font-extrabold hover:underline underline-offset-4 ml-1" href="/register">Create an account</a>
</p>
</div>
<!-- Bubbly Accents -->
<div class="absolute -bottom-6 -left-6 w-16 h-16 bg-tertiary-container rounded-full z-[-1]"></div>
<div class="absolute -bottom-10 right-20 w-8 h-8 bg-secondary-container rounded-full z-[-1]"></div>
</div>
<!-- Footer Credits -->
<footer class="mt-8 text-center text-outline/60 text-sm font-bold uppercase tracking-widest">
            © 2024 SOCIAL PLAYGROUND • JOYOUS ORBIT
        </footer>
</main>
<!-- Contextual "Joyous" Accents (Floating UI Blobs) -->
<div class="fixed top-20 left-20 w-12 h-12 rounded-full border-4 border-tertiary/20 opacity-40"></div>
<div class="fixed bottom-40 right-20 w-24 h-24 rounded-full border-[6px] border-secondary/10 opacity-30"></div>
<div class="fixed top-1/2 left-10 w-4 h-4 bg-primary/20 rounded-full"></div>
</body></html>
