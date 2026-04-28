<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Explore Feed - Social Playground</title>
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
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #fff3fd; color: #3e2548; }
        .bubbly-glow { box-shadow: 0 20px 40px -10px rgba(129,38,207,0.1); }
        .active-bounce:active { transform: scale(0.95); transition: transform 0.1s ease-in-out; }
    </style>
</head>
<body class="bg-background text-on-background min-h-screen overflow-x-hidden">
<!-- SideNavBar Shell -->
<nav class="fixed left-0 top-0 h-full flex flex-col py-8 h-screen w-72 rounded-r-[3rem] border-r-0 bg-purple-50 dark:bg-slate-950 shadow-[30px_0_60px_-15px_rgba(129,38,207,0.06)] z-50">
<div class="px-8 mb-12">
<h1 class="text-2xl font-black tracking-tight text-purple-700 dark:text-purple-300">Playground</h1>
<p class="text-xs font-bold uppercase tracking-wider text-on-surface-variant mt-1">Event Hub</p>
</div>
<div class="flex-1 space-y-2">
<!-- Home: Inactive -->
<a class="flex items-center gap-4 px-6 py-4 text-purple-400 dark:text-slate-500 hover:text-purple-600 mx-4 hover:scale-105 transition-transform duration-200 ease-out" href="#">
<span class="material-symbols-outlined" data-icon="grid_view">grid_view</span>
<span class="font-bold">Home</span>
</a>
<!-- Events: Active -->
<a class="flex items-center gap-4 px-6 py-4 bg-purple-200 dark:bg-purple-900/40 text-purple-800 dark:text-purple-100 rounded-full mx-4 transition-all duration-300 hover:scale-105" href="#">
<span class="material-symbols-outlined" data-icon="event" style="font-variation-settings: 'FILL' 1;">event</span>
<span class="font-bold">Events</span>
</a>
<a class="flex items-center gap-4 px-6 py-4 text-purple-400 dark:text-slate-500 hover:text-purple-600 mx-4 hover:scale-105 transition-transform duration-200 ease-out" href="#">
<span class="material-symbols-outlined" data-icon="group">group</span>
<span class="font-bold">Community</span>
</a>
<a class="flex items-center gap-4 px-6 py-4 text-purple-400 dark:text-slate-500 hover:text-purple-600 mx-4 hover:scale-105 transition-transform duration-200 ease-out" href="#">
<span class="material-symbols-outlined" data-icon="monitoring">monitoring</span>
<span class="font-bold">Analytics</span>
</a>
<a class="flex items-center gap-4 px-6 py-4 text-purple-400 dark:text-slate-500 hover:text-purple-600 mx-4 hover:scale-105 transition-transform duration-200 ease-out" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-bold">Settings</span>
</a>
</div>
<div class="px-8 mt-auto">
<button class="w-full py-4 bg-primary text-on-primary rounded-full font-extrabold shadow-lg hover:scale-105 active:scale-95 transition-all">
                Create Event
            </button>
</div>
</nav>
<!-- TopAppBar Shell -->
<header class="flex justify-between items-center px-12 ml-72 w-[calc(100%-18rem)] h-20 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
<div class="flex items-center gap-4">
<span class="text-xl font-extrabold text-purple-600 dark:text-purple-400">Social Playground</span>
</div>
<div class="flex items-center gap-6">
<div class="relative group">
<input class="bg-surface-container-low border-2 border-outline-variant focus:border-primary focus:ring-0 rounded-full px-6 py-2 w-64 transition-all text-on-surface placeholder-on-surface-variant/50" placeholder="Search vibes..." type="text"/>
<span class="material-symbols-outlined absolute right-4 top-2 text-on-surface-variant" data-icon="search">search</span>
</div>
<div class="flex items-center gap-3">
<button class="p-2 hover:bg-purple-50 dark:hover:bg-slate-900 rounded-full text-purple-600 transition-colors">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button class="p-2 hover:bg-purple-50 dark:hover:bg-slate-900 rounded-full text-purple-600 transition-colors">
<span class="material-symbols-outlined" data-icon="chat_bubble">chat_bubble</span>
</button>
<div class="w-10 h-10 rounded-full bg-primary-container border-2 border-primary overflow-hidden">
<img alt="User profile" data-alt="close-up portrait of a trendy young man with a playful smile wearing a colorful beanie in soft studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWqDDIHRMIQcprKT-MDKAKLH_VtJZ6NwLUr9hHMisjYwV3JYkpx-uho0ZtfVVDOxrd3869cQa1xXGkgdy9P-uEz-V8OI5E8HMd57LYyQ1aqd_9_GxfXOtyli5lPYHQjkjdSG311Tt7-lloSbk-lmlEuh71iSpJC1OAk6SWnHIXItQ4JvFFjJB6YKtYiaDD-U7gR5VXiEs32FtdT7gajxnLDJnPbCct8XH35odD_aMfw4mP84MFFC7XYDRcsKI2ji1Yt8NqhUQSeQJ9"/>
</div>
</div>
</div>
</header>
<!-- Main Content Canvas -->
<main class="ml-72 p-12 space-y-12">
<!-- Hero / Happening Now Section -->
<section>
<div class="flex items-end justify-between mb-8">
<div class="space-y-1">
<div class="flex items-center gap-3">
<h2 class="text-4xl font-extrabold tracking-tight text-on-surface">Happening Now</h2>
<div class="flex gap-1">
<span class="material-symbols-outlined text-secondary animate-bounce" data-icon="auto_awesome" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
<span class="material-symbols-outlined text-primary" data-icon="celebration" style="font-variation-settings: 'FILL' 1;">celebration</span>
</div>
</div>
<p class="text-on-surface-variant font-medium text-lg">Real-time local energy nearby!</p>
</div>
<button class="px-6 py-2 rounded-full border-2 border-outline text-on-surface font-bold hover:bg-surface-container transition-colors">See all</button>
</div>
<!-- Bento Grid of Active Vibes -->
<div class="grid grid-cols-12 gap-6">
<!-- Large Highlight Card -->
<div class="col-span-12 lg:col-span-8 relative h-[400px] rounded-xl overflow-hidden group shadow-xl">
<img class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="energetic crowd at a neon-lit music festival with purple and teal stage lights and confetti in the air" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRqEaDZk_iGnbjNgV5rMhkp6PuHuQ4KQehzhR70NMbam0wmDauPfG9MyIa1gp_Ied_AN-jQC4XF5zDui5RtggupgtW7WjTwB_H-sqrtVCHwl-btzJJ6Coe8N2JcDcopl7fQJ4_zYbf35jCO3VTnpWpPufg4fkdG4lx_kGqeYJl-_Wx5GhWV7wMAgtK6d4PREUdBYFQ5LsQ1LezJr5i7XPOxsxEvJgDpjAL2AzHW2tqSnZj1qgreZ1fBsfthoD8_A6kCxjxSWbwXbH6"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
<div class="absolute top-6 left-6 flex gap-2">
<span class="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Live Now</span>
<span class="bg-white/20 backdrop-blur-md text-white px-4 py-1 rounded-full text-xs font-bold">1.2k attending</span>
</div>
<div class="absolute bottom-8 left-8 right-8">
<h3 class="text-5xl font-black text-white mb-4 leading-tight">Neon Rhythm Nights: <br/>Downtown Rooftop</h3>
<div class="flex items-center justify-between">
<div class="flex -space-x-3">
<div class="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
<img data-alt="avatar of woman smiling" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlP03q4slbwO8yBxBseVE55Rb70_U6WzdvIXuqgJlG9gklMggz5x9FJ9P45Q0VjJ9bfRBX4QZptj4C5GPa5EcJ9NrkvCH2P9kztwl6glVOd4vxLuRJ-qxmMQcGWXh2Rt5y2SR3-vgNkPQ3-A2t5k1ZHbHLGUtrW7t7fJlCESnrwR-WaGZrWe8sKATG5K21E7uccame9IkCYmWa4tFRZz95KNpkFVUfPRcbaw5j--C6zZnt_4TJP59nolefR-CVjuldsE-8e4igoAyi"/>
</div>
<div class="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
<img data-alt="avatar of man with beard" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2c0hZlpfEVnOILKcGsIzElExA5w7vTQYdS-64XKcFe25AxhrE5sO1wYd5oUsm9LabHsqBvmcjJsPfsVwmRuwe9DEfYe_PvrNVSgt2EL51rmNTfhPkHe6x8j-xz8xjwR3MdCU-DFNuFYB2Hv0iJSVInsmo0fZzoyCmU6wVvVUTg2V_cgDIIurNd2PfV7NpV3oxBLYUtjiAlGI1Qqgoj-olJnUfI0SrBQVcdcGKIiUq_BWoqFtXjyBSS5NMaeP1cyZaO4ZnV1WNPnNA"/>
</div>
<div class="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
<img data-alt="avatar of smiling man" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1IuziTLopZ4tgLRGLH8-JJENy_Tt06vqQ26u3u8jGyINy9Batbp2wZJbj66CxEVHnORa15AC_4kG3uEunCdLD7HHrrzIAuQQXCFG7_X-gTcbAkJE3ZWMv5Rgj9ESAqFhH6XIc50UMo41V88uOW1PNrwG8YcDSFUgCMc_-xgwtE_eTVWYYsCLC9lTtUqiTs8NbFyrJzm4l4nRhp3kmEn5NokbqhrwEGHYQyrmjppIrQWxUlb-FXV7eW2AMbbXmk8oQIDTcsBdokTTm"/>
</div>
<div class="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] font-bold text-white">+84</div>
</div>
<button class="bg-primary hover:bg-primary-dim text-on-primary px-8 py-4 rounded-full font-black flex items-center gap-2 transform transition-transform hover:scale-105 active:scale-95">
                                Join Now
                                <span class="material-symbols-outlined" data-icon="rocket_launch">rocket_launch</span>
</button>
</div>
</div>
</div>
<!-- Small Secondary Highlight -->
<div class="col-span-12 lg:col-span-4 bg-tertiary-container rounded-xl p-8 flex flex-col justify-between relative overflow-hidden">
<div class="relative z-10">
<div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
<span class="material-symbols-outlined text-4xl text-tertiary" data-icon="palette">palette</span>
</div>
<h3 class="text-3xl font-black text-on-tertiary-container leading-tight mb-2">Street Art Safari</h3>
<p class="text-on-tertiary-container/80 font-semibold mb-6">A curated walk through the secret murals of the East Side.</p>
<div class="bg-white/50 backdrop-blur rounded-2xl p-4 flex items-center gap-4">
<div class="text-center">
<p class="text-[10px] font-black uppercase text-tertiary">Vibe</p>
<p class="text-xl font-bold text-on-tertiary-container">98%</p>
</div>
<div class="h-8 w-px bg-tertiary/20"></div>
<div>
<p class="text-[10px] font-black uppercase text-tertiary">Leader</p>
<p class="text-sm font-bold text-on-tertiary-container">Arturo V.</p>
</div>
</div>
</div>
<!-- Decorative blob character -->
<div class="absolute -bottom-4 -right-4 w-32 h-32 bg-on-tertiary-container/10 rounded-full blur-2xl"></div>
<div class="absolute bottom-0 right-0 p-4 opacity-20">
<span class="material-symbols-outlined text-9xl text-on-tertiary-container" data-icon="brush">brush</span>
</div>
</div>
</div>
</section>
<!-- Explore Feed Section -->
<section>
<div class="flex items-center gap-6 mb-12 overflow-x-auto pb-4 no-scrollbar">
<button class="bg-primary text-on-primary px-8 py-3 rounded-full font-bold shadow-lg whitespace-nowrap">All Events</button>
<button class="bg-surface-container text-on-surface-variant px-8 py-3 rounded-full font-bold hover:bg-surface-container-high transition-colors whitespace-nowrap">Music &amp; Arts</button>
<button class="bg-surface-container text-on-surface-variant px-8 py-3 rounded-full font-bold hover:bg-surface-container-high transition-colors whitespace-nowrap">Outdoor Adventure</button>
<button class="bg-surface-container text-on-surface-variant px-8 py-3 rounded-full font-bold hover:bg-surface-container-high transition-colors whitespace-nowrap">Tech &amp; Gaming</button>
<button class="bg-surface-container text-on-surface-variant px-8 py-3 rounded-full font-bold hover:bg-surface-container-high transition-colors whitespace-nowrap">Foodies</button>
</div>
<!-- Feed Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
<!-- Event Card 1 -->
<div class="bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(129,38,207,0.1)] group flex flex-col h-full border-2 border-transparent hover:border-primary/10">
<div class="relative h-64 rounded-lg overflow-hidden mb-6">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="overhead view of a community garden workshop with people planting saplings in sunlight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxwkmgcwRXiLj0p2NxWG40hsl1JSc_kb9E-yFR-lqWmaa1zXp0XmaTJt5pn750_hZM7g4Wt7_v_XO-zAJxTnjcAd5ykJC32pccn0BCikQ48dCKRp-uUKnnvuZzi7iBI_y6kHjghGzP-Ov90VT28z06VF2rJ_5RwHx5iqSxWeAyqK394Zo4Zb1L0gIm045571JzIs8A3JODjJ2K0cDLYeiyE-03d8p7IRRIQ-1mu5-6oT6tScDFlOVM92pESnm4toafTKX2BOf1_ryi"/>
<div class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-2 px-4 text-center shadow-md">
<p class="text-[10px] font-black uppercase text-primary tracking-tighter">June</p>
<p class="text-xl font-black text-on-surface">12</p>
</div>
<button class="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-colors">
<span class="material-symbols-outlined" data-icon="favorite">favorite</span>
</button>
</div>
<div class="flex-1 space-y-4">
<div class="flex items-center gap-2">
<span class="bg-primary-container/30 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase">Workshop</span>
<span class="text-on-surface-variant text-xs font-semibold flex items-center gap-1">
<span class="material-symbols-outlined text-sm" data-icon="location_on">location_on</span>
                                Green Valley
                            </span>
</div>
<h4 class="text-2xl font-black text-on-surface group-hover:text-primary transition-colors">Urban Gardening 101</h4>
<p class="text-on-surface-variant text-sm font-medium line-clamp-2">Learn how to grow your own mini-oasis in the heart of the concrete jungle. Tools provided!</p>
</div>
<div class="mt-8 flex items-center justify-between">
<div class="flex -space-x-2">
<img class="w-8 h-8 rounded-full border-2 border-white object-cover" data-alt="avatar of young woman" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNF1Oap9dprZj51KpPAx1vlgidGgrrKYegW_ZsAJa4nWhu5k5Z1PjQipF4hXJSn9RLpnsmWmi90TSpBm9Svj44FWWvZSNMDV6qkxqmdMFWwxOIfIH325CcWRZXYGVGwrV88ItaK08NAQr1cYg57IzpDoin9zUacLjX5SoIPz5G5B567-tWc3TmW3B3yUq1Siuhfja9Iq7wZAUUM_50iwBeXATKhWMNVfnaR8fxUxchIaVXKFI3RQMgi2uwWrAAC7D8K0yBXIkKc4LL"/>
<img class="w-8 h-8 rounded-full border-2 border-white object-cover" data-alt="avatar of man smiling" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFkCwW4JtJNqFlSzGeIowfZuTid9PczbT3tnj_SCoNW3lMtZxOm_EOcdVial6EEsjqflAOR-gGxGu_MYvzp6PgrydHuHpIjrjzI9530cBHVSjp6X_Fg5N82h6qGypIHBMIXT36tLnCDaABTSRQOvtJ_14eLuBvLPGgUhqxl3Kp_HaegLf6hDTUXBHypl4VEqZlAGYxjiTmDR96E0AjT9NUSUKxje5asVRrCV4DoST7eE2Y59VmVEMo_qqUTusFmKYVGX4QISUtg2Gg"/>
<div class="w-8 h-8 rounded-full bg-surface-container-high border-2 border-white flex items-center justify-center text-[8px] font-bold">+12</div>
</div>
<button class="bg-secondary text-on-secondary px-6 py-3 rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-all">Join</button>
</div>
</div>
<!-- Event Card 2 -->
<div class="bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(129,38,207,0.1)] group flex flex-col h-full border-2 border-transparent hover:border-primary/10">
<div class="relative h-64 rounded-lg overflow-hidden mb-6">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="aesthetic setup of vintage video game consoles and neon lights in a cozy dark room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_4Wlb99vAfikavEia4QvDitXV1LI3tUpToZoNu2CRZJeZcy4O_xHjLRyAXucCllEa7jn-pTuFJfD7gUBWEXodKjlrl9h5H8-eTV2L7gEdn7DXuME2LK0EM1zPKCjCuQp1VPbht9tYkN_N_3P_2is_JqSmq2L2h9i-KnvZVYTaAofmTEMuhKowpi2MLOLaeujiTkhN5SyOh7fdsCpcDE0dTSSAGLWwJ1KM_jcKnvHKRBOjnIri5eHuDabJBFHLq5614e9-Sem4Fyz-"/>
<div class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-2 px-4 text-center shadow-md">
<p class="text-[10px] font-black uppercase text-primary tracking-tighter">June</p>
<p class="text-xl font-black text-on-surface">15</p>
</div>
<button class="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-colors">
<span class="material-symbols-outlined" data-icon="favorite">favorite</span>
</button>
</div>
<div class="flex-1 space-y-4">
<div class="flex items-center gap-2">
<span class="bg-primary-container/30 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase">Social</span>
<span class="text-on-surface-variant text-xs font-semibold flex items-center gap-1">
<span class="material-symbols-outlined text-sm" data-icon="location_on">location_on</span>
                                Retro Arcade Bar
                            </span>
</div>
<h4 class="text-2xl font-black text-on-surface group-hover:text-primary transition-colors">8-Bit Game Night</h4>
<p class="text-on-surface-variant text-sm font-medium line-clamp-2">Classic tournaments and high-score battles. Pixel art stickers for everyone who makes the leaderboard!</p>
</div>
<div class="mt-8 flex items-center justify-between">
<div class="flex -space-x-2">
<img class="w-8 h-8 rounded-full border-2 border-white object-cover" data-alt="avatar of young woman with cool makeup" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6zaQUxnCvVSGTWHBhRETIW098mKpYSRS3lYxcQXyxkgGb5bzvcysuQgzJ57nk7CEkKkyFlWPqCcLT0ri_rTq55rXyG35TZ3REPhXYkv_8-DEAc9yTNH6_Wl_35ShTBAxF9V-TcS_11Fzvq-hSXLuNIGkGWa0ijfnDpkGWlBuNdisQkXY-bIEj_oDO46hF5IZotxho1vendK2U-NGhbHnHO39IUqYJmukggZ_6rOSZUougCBDu6WWfciid8rMoEoa7Stan0H972u5o"/>
<img class="w-8 h-8 rounded-full border-2 border-white object-cover" data-alt="avatar of man with glasses" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlRf8VYgURWAIFEIypB7s6aKoEpfm2PoMB8dsVTGh0HnrMDn_drRBj4GbRxrACatKtBUaA5eyOJw3dsHIJDZAfXWK-v0lb31yvBwz29DZVOglMn3nMIFUoYX-4MN1LlGHz2AWlfhjZTINNzOGnzw1BWMGTKB5VMaPmE-mW92ZkbWZjkUIse4ivrATvi49LiR7J69NCRVy8BY00dgoJoMd1_KMaQYR-9Fv7M1GMQmhMQzhErlfvQvmJxuLpKAbR24o4d7cUcnrsSlWo"/>
<div class="w-8 h-8 rounded-full bg-surface-container-high border-2 border-white flex items-center justify-center text-[8px] font-bold">+45</div>
</div>
<button class="bg-secondary text-on-secondary px-6 py-3 rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-all">Join</button>
</div>
</div>
<!-- Empty State / Character Card -->
<div class="bg-secondary-container/20 rounded-xl p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
<!-- Cute Character SVG implementation using organic shapes -->
<div class="relative w-32 h-32 mb-6">
<div class="absolute inset-0 bg-secondary-container rounded-full animate-pulse opacity-50"></div>
<div class="absolute inset-4 bg-secondary rounded-full flex items-center justify-center">
<div class="flex gap-4">
<div class="w-2 h-2 bg-on-secondary rounded-full"></div>
<div class="w-2 h-2 bg-on-secondary rounded-full"></div>
</div>
</div>
<div class="absolute -bottom-2 -right-2 bg-tertiary-container w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform">
<span class="material-symbols-outlined text-on-tertiary-container text-2xl" data-icon="add">add</span>
</div>
</div>
<h4 class="text-xl font-black text-on-secondary-container mb-2">Can't find your vibe?</h4>
<p class="text-on-secondary-fixed-variant text-sm font-semibold mb-8 max-w-[200px]">Create your own event and gather the community!</p>
<button class="bg-secondary-container border-4 border-secondary text-on-secondary-container px-8 py-3 rounded-full font-black text-sm hover:bg-secondary hover:text-white transition-all shadow-md">
                        Start Something
                    </button>
</div>
<!-- Event Card 3 -->
<div class="bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(129,38,207,0.1)] group flex flex-col h-full border-2 border-transparent hover:border-primary/10">
<div class="relative h-64 rounded-lg overflow-hidden mb-6">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="calm yoga session in a bright studio with large windows and soft morning light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrSZ8pI4pdxFGFWcnSx3Bhi5xZmYvKaDsCgRgHkbeOIgNz6_2Iq6J4PBTHfx8UwfCo4v255FapgmRUJtRFqOq8i5ntsByqPTKDSmq4Iiom4VnZAwSiNWX0SvbX0MAe7xj2iyeyQPBQZ_UWuNx0L0niVfCigMbkXQF6nAmMhPGi-KJVdNIj90vW7YXHDddqm7CzVmi3ZuIvt6iTJhmEr3ZuAh_1jvUN6dZftg6TJAfILJ4x7Z6HkjgJ6Hy5Thinw3bjY1kkAXmS4cok"/>
<div class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-2 px-4 text-center shadow-md">
<p class="text-[10px] font-black uppercase text-primary tracking-tighter">June</p>
<p class="text-xl font-black text-on-surface">18</p>
</div>
<button class="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-colors">
<span class="material-symbols-outlined" data-icon="favorite">favorite</span>
</button>
</div>
<div class="flex-1 space-y-4">
<div class="flex items-center gap-2">
<span class="bg-tertiary-container/30 text-tertiary text-[10px] font-black px-3 py-1 rounded-full uppercase">Wellness</span>
<span class="text-on-surface-variant text-xs font-semibold flex items-center gap-1">
<span class="material-symbols-outlined text-sm" data-icon="location_on">location_on</span>
                                Sky Studio
                            </span>
</div>
<h4 class="text-2xl font-black text-on-surface group-hover:text-primary transition-colors">Zen Morning Flow</h4>
<p class="text-on-surface-variant text-sm font-medium line-clamp-2">Start your Saturday with intention. Open level Vinyasa followed by freshly pressed juices.</p>
</div>
<div class="mt-8 flex items-center justify-between">
<div class="flex -space-x-2">
<img class="w-8 h-8 rounded-full border-2 border-white object-cover" data-alt="avatar of young woman smiling" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzV6QKp5TmpcKEaA12qMhajTSSm2Bd00kYLPK_x2sa8gqBAs8DI-NdT1Ixd200SolVTmGG-NI5SWxgSRM27YPpecdbwAoAntk2aRKlNmEKLJlpycXw92ccWbjUuk4e-d4cN3TfTDhmEVoUCdna0FOzkUeQfu2WcozuHweK189T7Cbr_W_nsugg2LSSdWWacQ8ppOaAJ8jDSDAu6Ot6hXt_DKcbE61ieu5LJmpDWKpSmgWaMowreFlyXG6LGbAJGidsfKFU6jQvbOcA"/>
<img class="w-8 h-8 rounded-full border-2 border-white object-cover" data-alt="avatar of young man" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPmFdpoWuBMm1lh0XU8fZn7hlc8ylxPIAWxuQd--yu9uTNNPgVZao61eItWb4jexU6SNvgOcTE22vky0WZsWqyJIVvh1smT0oAgv9bULfP1w_bJ2FQDWCqglibcsuVXpWO62kXLowMxVU4lGrw_lxl-ZQW8_qTZQcGAKZVsxC2Tcxmz7AyFyRibWHGAjbt0aSxVIvNhrhkt5k2ssj8DyM9vPsjUYO3ZDsOvXQmPU1oAr3PpPw5qd1Q4vafPntKSDKqOsFT9ug6oJdI"/>
<div class="w-8 h-8 rounded-full bg-surface-container-high border-2 border-white flex items-center justify-center text-[8px] font-bold">+8</div>
</div>
<button class="bg-secondary text-on-secondary px-6 py-3 rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-all">Join</button>
</div>
</div>
<!-- Event Card 4 -->
<div class="bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(129,38,207,0.1)] group flex flex-col h-full border-2 border-transparent hover:border-primary/10">
<div class="relative h-64 rounded-lg overflow-hidden mb-6">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="coding setup with dual monitors showing colorful code in a modern bright workspace" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHQQRVlWzcz_3X1_yu1pMLDIpyNPNTrUfD9Imf0KSFiOlAPE4ep1q7gYJ1uZ9xp1QIhCGxL9tk7juddiQ_j_176Ub2sQIbU9qfXbiei4cnVg0qpGK6J0UCWmQ2YoykR4g-G2U9f6Bnxh0ZBpSUkZ2GczJf86byGMsddElvnPTkCBQ3XtblfME3pIzPYBm9nxNgL5LbR6E6vh87mxnpVpa4g_HJqbAiomPN0kHENFlvY9EAmpgZLkBRulZueo7PDmUcncydfCkswYwn"/>
<div class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-2 px-4 text-center shadow-md">
<p class="text-[10px] font-black uppercase text-primary tracking-tighter">June</p>
<p class="text-xl font-black text-on-surface">20</p>
</div>
<button class="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-colors">
<span class="material-symbols-outlined" data-icon="favorite">favorite</span>
</button>
</div>
<div class="flex-1 space-y-4">
<div class="flex items-center gap-2">
<span class="bg-primary-container/30 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase">Hackathon</span>
<span class="text-on-surface-variant text-xs font-semibold flex items-center gap-1">
<span class="material-symbols-outlined text-sm" data-icon="location_on">location_on</span>
                                Tech Hub
                            </span>
</div>
<h4 class="text-2xl font-black text-on-surface group-hover:text-primary transition-colors">Social Impact Jam</h4>
<p class="text-on-surface-variant text-sm font-medium line-clamp-2">Building tools for social good. Teams of 4, 12 hours, unlimited pizza and coffee. Let's build!</p>
</div>
<div class="mt-8 flex items-center justify-between">
<div class="flex -space-x-2">
<img class="w-8 h-8 rounded-full border-2 border-white object-cover" data-alt="avatar of man with a kind face" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYIm-oM48o4YIhd-lc4CZQsPAWsdS4pqGAzruQnI4pePmC_EwxGlT6qwQUKujhDT_vp46bKt7MrEN2gqU_6L6o3X1ALRz5GLbhgo1ER0Mn3VLgVfO_uujQpUTw_t3vu9hcvkI0j5DttGG_f-RpYqW-iDkcBkbt-i9ieL5HIISKSpOUsaHHVjYJQoRClUH6mRCRUv_Ifg30xV2zqimK1s-hlIJO39t1j2O8HGrTa2T6ypKNRcS5K14RJBNXRVqXfbtDb4s_EbcgYgcE"/>
<img class="w-8 h-8 rounded-full border-2 border-white object-cover" data-alt="avatar of smiling young woman" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMApYmYSMx0ycT-bzIvsdfvkxSfl8FlyCNQbOFuFD-yVGM_O359WxsR_Cu85_e_W-UXSILZs3HNYV54cCkWeiG8z_64OlEmBEBlWE9EjrWhz4mqqIosLe3mCG7lfU6ZFecpexG_i7o8_o9RdHH7H4KF_SYntcZLq4sVei11nwzhZ-9cdv17dWfBaOi9WUmDyToxXVEaCRawXZ-HaIPO1ttFj3bybsOM2xl4wq7G2OAYj3JRwSHRsA1bqdbfr0a_G0BIEFIR7XlElsP"/>
<div class="w-8 h-8 rounded-full bg-surface-container-high border-2 border-white flex items-center justify-center text-[8px] font-bold">+28</div>
</div>
<button class="bg-secondary text-on-secondary px-6 py-3 rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-all">Join</button>
</div>
</div>
<!-- Event Card 5 -->
<div class="bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(129,38,207,0.1)] group flex flex-col h-full border-2 border-transparent hover:border-primary/10">
<div class="relative h-64 rounded-lg overflow-hidden mb-6">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="close-up of colorful cocktails and gourmet tapas on a wooden table at sunset" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBcmK_J7BW0x20uZwENd0EUul-2nKEOI5hUdWICf2955KEqmxIDLOlAhnOPumyXaodkIVbm1o1nwqrZYOAhcipiloAZb4Myi78E5qHF2hDIuBi-bQpvAJ-_F-E-FcTmq_RcGl_IFye443lk9K4eb6dKF0VXBFcTX1kmmL0ENLyciMHUBn4f1ouGYEQPw1sLIDz7QllExT3H_ZfFbQgojp-vIPNqJhq49iIVuEh2CxNGbJ029Ds0EDs2icGgWumE6QxyBUQ9VWEZxil"/>
<div class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-2 px-4 text-center shadow-md">
<p class="text-[10px] font-black uppercase text-primary tracking-tighter">June</p>
<p class="text-xl font-black text-on-surface">22</p>
</div>
<button class="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-colors">
<span class="material-symbols-outlined" data-icon="favorite">favorite</span>
</button>
</div>
<div class="flex-1 space-y-4">
<div class="flex items-center gap-2">
<span class="bg-secondary-container/30 text-secondary text-[10px] font-black px-3 py-1 rounded-full uppercase">Food</span>
<span class="text-on-surface-variant text-xs font-semibold flex items-center gap-1">
<span class="material-symbols-outlined text-sm" data-icon="location_on">location_on</span>
                                The Bistro Rooftop
                            </span>
</div>
<h4 class="text-2xl font-black text-on-surface group-hover:text-primary transition-colors">Tapas &amp; Tales</h4>
<p class="text-on-surface-variant text-sm font-medium line-clamp-2">A social dinner focused on storytelling and community. Bring a friend, leave with many more!</p>
</div>
<div class="mt-8 flex items-center justify-between">
<div class="flex -space-x-2">
<img class="w-8 h-8 rounded-full border-2 border-white object-cover" data-alt="avatar of professional woman smiling" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbshwb40ifUb-YJzTFRuL1YYjyf-YZKOxZRys2ju7a59P1R3a23Ao7I_RpOHlKfLpyhLsgEId28x78sbQV6MztoR77QSY0P7oeM_jBxAPG8uMkzMUU_bAUP_mhZ_UnZlnYWcoJUlO-hk38RYmtvKK1r3OjpMS9yGcO8Jhe6gcEK5nFJpp9f6lUawPuur7alwsHkK0rP_suvbuIsPTD7O_szBkXZAPT4j6GzPEpmdkc9w75fc4gPzQg9foWytEZNmfIVwAgptkiJiTp"/>
<img class="w-8 h-8 rounded-full border-2 border-white object-cover" data-alt="avatar of man in suit" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAivBpMX5Om5rQBEqy0wkQB-2X5cU7Wr7epODq0cjR1RCIJTC2QLc7N16GQKUZY9WEGz4Mty8Z1soKu_Jdt7UStgU7MYYtk8wSgI1uS8lbkEwnq4vurT7-lZZwsdhEWiPSq4KPRxbX3A7oTl9TQdCPjkWPQgV_vPRVi1Sf4VrBCb7iXG74ks5C5nsSdFjGHzuP4THnp6LFP6W4wXEpWenB-nPtx4gWzsyJeLvf5zhb6gG5gHaiK6T59MbM0BiGUEi-1-ljS72vRrl2O"/>
<div class="w-8 h-8 rounded-full bg-surface-container-high border-2 border-white flex items-center justify-center text-[8px] font-bold">+15</div>
</div>
<button class="bg-secondary text-on-secondary px-6 py-3 rounded-full font-black text-sm hover:scale-105 active:scale-95 transition-all">Join</button>
</div>
</div>
</div>
</section>
</main>
<!-- Floating Action Button for Events -->
<button class="fixed bottom-10 right-10 w-20 h-20 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50 group">
<span class="material-symbols-outlined text-4xl group-hover:rotate-90 transition-transform duration-300" data-icon="add">add</span>
</button>
</body></html> 