<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Neon Nightlife - Event Details</title>
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
        .bubbly-connector {
            background-image: radial-gradient(circle at 50% 50%, #8126cf 20%, transparent 20%);
            background-size: 8px 16px;
        }
    </style>
</head>
<body class="bg-background text-on-surface">
<!-- SideNavBar (JSON Derived) -->
<aside class="fixed left-0 top-0 h-full flex flex-col py-8 h-screen w-72 rounded-r-[3rem] border-r-0 bg-purple-50 dark:bg-slate-950 shadow-[30px_0_60px_-15px_rgba(129,38,207,0.06)] z-50">
<div class="px-8 mb-12">
<span class="text-2xl font-black tracking-tight text-purple-700 dark:text-purple-300">Playground</span>
<p class="text-xs font-bold uppercase tracking-wider text-purple-400 mt-1">Event Hub</p>
</div>
<nav class="flex-1 space-y-2">
<div class="flex items-center gap-4 px-6 py-4 text-purple-400 dark:text-slate-500 hover:text-purple-600 mx-4 hover:scale-105 transition-transform duration-200 ease-out cursor-pointer group">
<span class="material-symbols-outlined" data-icon="grid_view">grid_view</span>
<span class="font-bold">Home</span>
</div>
<!-- Active State: Events -->
<div class="flex items-center gap-4 px-6 py-4 bg-purple-200 dark:bg-purple-900/40 text-purple-800 dark:text-purple-100 rounded-full mx-4 transition-all duration-300 scale-95 cursor-pointer hover:rotate-1">
<span class="material-symbols-outlined" data-icon="event" style="font-variation-settings: 'FILL' 1;">event</span>
<span class="font-bold">Events</span>
</div>
<div class="flex items-center gap-4 px-6 py-4 text-purple-400 dark:text-slate-500 hover:text-purple-600 mx-4 hover:scale-105 transition-transform duration-200 ease-out cursor-pointer">
<span class="material-symbols-outlined" data-icon="group">group</span>
<span class="font-bold">Community</span>
</div>
<div class="flex items-center gap-4 px-6 py-4 text-purple-400 dark:text-slate-500 hover:text-purple-600 mx-4 hover:scale-105 transition-transform duration-200 ease-out cursor-pointer">
<span class="material-symbols-outlined" data-icon="monitoring">monitoring</span>
<span class="font-bold">Analytics</span>
</div>
<div class="flex items-center gap-4 px-6 py-4 text-purple-400 dark:text-slate-500 hover:text-purple-600 mx-4 hover:scale-105 transition-transform duration-200 ease-out cursor-pointer">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-bold">Settings</span>
</div>
</nav>
<div class="px-8 mt-auto pt-8 border-t border-purple-100/50">
<button class="w-full py-4 bg-primary text-on-primary rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
                Create Event
            </button>
<div class="mt-8 flex items-center gap-3">
<img class="w-12 h-12 rounded-full border-2 border-primary-container" data-alt="portrait of a young woman with a creative professional look, warm natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGqcmjHq-fnpkD64d5F-J2XNJIx0xoPXJ37R5pDE8uKudLbYQ-EAlBK8RX_DSR_8nd11h4m80iQfGMLLJ-k3dx8CvESgt96yYBNUXw6vky0hzNhxh67qmQwgaTTJY9y1MuUXACJHJpP0GzbUaIXDs3Bve6Ksv5Ig4ZUl0iWhxbKeMLGANe4RNRCWMfJnRA4btTH1Aqw64v9rCROy20jMtpKI3MQByhuawpfXWUszBH7NE0-wuiJRWadRVMmy87qoynKu2mPSwG7K3u"/>
<div>
<p class="text-sm font-bold">User avatar</p>
<p class="text-xs text-on-surface-variant">Premium Member</p>
</div>
</div>
</div>
</aside>
<!-- Main Content Canvas -->
<main class="ml-72 min-h-screen p-12">
<!-- Header (TopAppBar style but custom for details) -->
<header class="flex justify-between items-center mb-12">
<div>
<h1 class="text-5xl font-extrabold tracking-tight text-on-surface">Neon Nightlife</h1>
<p class="text-on-surface-variant mt-2 text-lg">Urban Social Hub • Downtown Arts District</p>
</div>
<div class="flex gap-4">
<div class="p-3 bg-surface-container-highest rounded-full text-primary hover:scale-110 transition-transform cursor-pointer">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</div>
<div class="p-3 bg-surface-container-highest rounded-full text-primary hover:scale-110 transition-transform cursor-pointer">
<span class="material-symbols-outlined" data-icon="chat_bubble">chat_bubble</span>
</div>
</div>
</header>
<!-- Content Grid -->
<div class="grid grid-cols-12 gap-12">
<!-- Left Column: Details & Timeline -->
<div class="col-span-8 space-y-12">
<!-- Hero Image -->
<div class="relative group">
<img class="w-full h-[450px] object-cover rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]" data-alt="vibrant nightlife scene with neon lights, a dancing crowd in a stylish club setting, futuristic atmosphere" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC82kI_56sER0XF8J93OeU95FCtbAdGbCn2fINMy61ofRVe5b2iHJhurNAkq1S1kKXJnFIk881sC2Qi4vtyeWcokQTxa8mHlTf0b8Z8QZ62hZf3f_Ux2PSKdrbVTrj-JiiBjkZbQtcjOBJGFt_MLw_DvE4MLzG4bJoNdFoVKhUTWomsF9wBclrxy0ML4sJz5sSzrm3TQTaiKh8rHXruDb-ZEF1TpHHgupnTzqGbHgMFgg58juVJ14cWuTMifRltbtbjKQACuriDVncd"/>
<div class="absolute top-6 left-6 flex gap-2">
<span class="px-6 py-2 bg-primary text-on-primary rounded-full font-bold text-sm shadow-xl">TRENDING</span>
<span class="px-6 py-2 bg-tertiary-container text-on-tertiary-container rounded-full font-bold text-sm shadow-xl">MUSIC</span>
</div>
</div>
<!-- Event Timeline Section -->
<section class="bg-surface-container p-10 rounded-xl">
<h2 class="text-3xl font-extrabold mb-8 flex items-center gap-3">
<span class="material-symbols-outlined text-primary" data-icon="schedule" style="font-variation-settings: 'FILL' 1;">schedule</span>
                        Event Flow
                    </h2>
<div class="relative pl-12 space-y-12">
<!-- Connector Line -->
<div class="absolute left-[20px] top-4 bottom-4 w-1 bubbly-connector"></div>
<!-- Item 1 -->
<div class="relative">
<div class="absolute -left-[52px] top-1 w-10 h-10 bg-primary-container rounded-full flex items-center justify-center border-4 border-background z-10">
<span class="material-symbols-outlined text-primary text-sm" data-icon="login">login</span>
</div>
<div class="bg-surface-container-lowest p-6 rounded-lg shadow-sm border-b-4 border-primary/20">
<span class="text-primary font-black text-sm uppercase tracking-widest">08:00 PM</span>
<h3 class="text-xl font-bold mt-1">Doors Open &amp; Welcome Drinks</h3>
<p class="text-on-surface-variant mt-2">Kick off the night with our signature neon cocktails and ambient synth-wave sets.</p>
</div>
</div>
<!-- Item 2 -->
<div class="relative">
<div class="absolute -left-[52px] top-1 w-10 h-10 bg-tertiary-container rounded-full flex items-center justify-center border-4 border-background z-10">
<span class="material-symbols-outlined text-tertiary text-sm" data-icon="music_note">music_note</span>
</div>
<div class="bg-surface-container-lowest p-6 rounded-lg shadow-sm border-b-4 border-tertiary/20">
<span class="text-tertiary font-black text-sm uppercase tracking-widest">10:30 PM</span>
<h3 class="text-xl font-bold mt-1">Main Stage: Orbital Beats</h3>
<p class="text-on-surface-variant mt-2">The legendary DJ Pulse takes over for a 3-hour journey through deep house and techno.</p>
</div>
</div>
<!-- Item 3 -->
<div class="relative">
<div class="absolute -left-[52px] top-1 w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center border-4 border-background z-10">
<span class="material-symbols-outlined text-secondary text-sm" data-icon="celebration">celebration</span>
</div>
<div class="bg-surface-container-lowest p-6 rounded-lg shadow-sm border-b-4 border-secondary/20">
<span class="text-secondary font-black text-sm uppercase tracking-widest">02:00 AM</span>
<h3 class="text-xl font-bold mt-1">Light Show Finale</h3>
<p class="text-on-surface-variant mt-2">A synchronized laser and fireworks display to close out the Neon Nightlife experience.</p>
</div>
</div>
</div>
</section>
<!-- Comments Section -->
<section>
<h2 class="text-3xl font-extrabold mb-8">Community Hype</h2>
<div class="space-y-6">
<!-- Comment 1 -->
<div class="flex gap-4 items-start">
<img class="w-12 h-12 rounded-full border-2 border-white" data-alt="portrait of a man with a friendly smile, outdoor lighting, casual style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKXb_psITK9VtiXh_BgNh_HOjA3Rh2ASHw6yUlZ67IzPWfj576fWgQqrqIfiGxtqTuAJRmkIXYHXemqLzb2eHyMApNU64gcV4cic8QAC_qjbHMJ5d3GAKmGX-5lvzKeBO8TdhEnFw6gXaG-4qc2XfSYKerDbb698Mf55WskPO3-GiYo-HaRWrayRueMsUmcmS-gJlMoJCF8cu-NlHvotRExzUnHZPhxVS16qD4iY88LdSoUJXgKV0o3ugi-AtwYlXw5OKlI3a1RiJH"/>
<div class="bg-tertiary-container/30 p-6 rounded-xl rounded-tl-none flex-1">
<div class="flex justify-between items-center mb-2">
<span class="font-bold text-on-tertiary-container">Marco V.</span>
<span class="text-xs text-on-tertiary-fixed-variant font-bold">2H AGO</span>
</div>
<p class="text-on-tertiary-container">Last year's show was absolutely insane! Can't wait to see DJ Pulse back on the decks. 🎧</p>
</div>
</div>
<!-- Comment 2 -->
<div class="flex gap-4 items-start flex-row-reverse">
<img class="w-12 h-12 rounded-full border-2 border-white" data-alt="close up portrait of a woman with vibrant energy and a bright smile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmBOEoKuUeBG9-yzHqe5CbO6b0mOTlcS-O_wuYz_EQMBw0CO0f4H99BtUPHBOiBv_4CRvUooq4hJIwuOq1sGvbymwLqoigj7dkMR3yJiIDJn57xotb48XYguOv8x7-qRvNwVGgrPPN7WdO7yBs5KTgqlGVUjNVfemZTxeolIn3WEIYTbfPO9j9d_GoReB8-RLzJfA5n7y4SOUtg02hNHu431BttMSKy68Qm3AkqKdO9gs58cJz2JEt69aLEc5kuBj_dZm1JG-gv5sG"/>
<div class="bg-tertiary-container/30 p-6 rounded-xl rounded-tr-none flex-1 text-right">
<div class="flex justify-between items-center mb-2 flex-row-reverse">
<span class="font-bold text-on-tertiary-container">Sarah L.</span>
<span class="text-xs text-on-tertiary-fixed-variant font-bold">5M AGO</span>
</div>
<p class="text-on-tertiary-container">Just booked my ticket! Who else is going from the creative hub group? ✨</p>
</div>
</div>
<!-- Add Comment -->
<div class="bg-surface-container-high p-4 rounded-full flex items-center gap-4 border-2 border-outline/20 focus-within:border-primary transition-all">
<div class="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center">
<span class="material-symbols-outlined text-primary" data-icon="add">add</span>
</div>
<input class="bg-transparent border-none focus:ring-0 flex-1 text-on-surface placeholder:text-on-surface-variant font-medium" placeholder="Share the hype..." type="text"/>
<button class="bg-primary text-on-primary p-3 rounded-full hover:scale-105 active:scale-95 transition-all">
<span class="material-symbols-outlined" data-icon="send">send</span>
</button>
</div>
</div>
</section>
</div>
<!-- Right Column: Side Panel Booking -->
<div class="col-span-4">
<div class="sticky top-8 space-y-6">
<div class="bg-white p-8 rounded-xl shadow-[0_20px_50px_rgba(129,38,207,0.1)] border-t-8 border-primary">
<div class="flex justify-between items-start mb-6">
<h3 class="text-2xl font-black">Tickets</h3>
<div class="text-right">
<p class="text-primary font-black text-3xl">$45.00</p>
<p class="text-xs text-on-surface-variant font-bold">EARLY BIRD</p>
</div>
</div>
<div class="space-y-4 mb-8">
<div class="flex items-center gap-4 p-4 bg-surface-container-low rounded-lg">
<span class="material-symbols-outlined text-primary" data-icon="calendar_month">calendar_month</span>
<div>
<p class="text-xs font-bold text-on-surface-variant uppercase">DATE</p>
<p class="font-bold">Friday, Oct 24th</p>
</div>
</div>
<div class="flex items-center gap-4 p-4 bg-surface-container-low rounded-lg">
<span class="material-symbols-outlined text-primary" data-icon="location_on">location_on</span>
<div>
<p class="text-xs font-bold text-on-surface-variant uppercase">LOCATION</p>
<p class="font-bold">The Orbit Arena, TX</p>
</div>
</div>
</div>
<div class="space-y-4 mb-8">
<p class="font-bold text-sm">Select Quantity</p>
<div class="flex items-center justify-between p-2 bg-surface-container-highest rounded-full">
<button class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary font-black hover:bg-primary-container transition-colors shadow-sm">-</button>
<span class="font-black text-xl">2</span>
<button class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-black hover:bg-primary-dim transition-colors shadow-sm">+</button>
</div>
</div>
<button class="w-full py-5 bg-[#FFD700] text-on-secondary-fixed font-black text-xl rounded-full shadow-[0_8px_0_#D4AF37] hover:translate-y-[-2px] hover:shadow-[0_10px_0_#D4AF37] active:translate-y-[4px] active:shadow-none transition-all duration-75 uppercase tracking-tight">
                            Book Tickets
                        </button>
<p class="text-center text-xs font-bold text-on-surface-variant mt-6 uppercase tracking-widest">NO REFUNDS WITHIN 48H</p>
</div>
<!-- Host Info Card -->
<div class="bg-secondary-container/20 p-8 rounded-xl border-l-8 border-secondary flex items-center gap-4">
<img class="w-14 h-14 rounded-full object-cover" data-alt="professional male portrait with a bright friendly expression, studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG60RTE5vkJjCnVh93_5VlRj8S3WtPvbxBj-3x2YuzRoArQt95U3FR5DNDVb0uRPmdXE2fb70HBOcDyFf9KZMqhVLOOGKsgiC6M7SCJGFYBomfr92_w8CMCHJe8K-P_ebrC-WBKxvy-M4SD0yPpD1p35QAUdWG0kC2mIA4EKS0NI8dXL8vShgb48NY0H9rOO8sMrGfKqInjtwLEvYQMlcp22Aeq7sPeJFMNf85TJA-JVcT7BLcb_kbB9XasaWAs5lsAkGcp39r7kYA"/>
<div>
<p class="text-xs font-black text-secondary uppercase">ORGANIZED BY</p>
<p class="text-lg font-bold">Orbit Collective</p>
<div class="flex gap-1 mt-1">
<span class="material-symbols-outlined text-secondary text-xs" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-secondary text-xs" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-secondary text-xs" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-secondary text-xs" data-icon="star" style="font-variation-settings: 'FILL' 1;">star</span>
<span class="material-symbols-outlined text-secondary text-xs" data-icon="star_half">star_half</span>
</div>
</div>
</div>
<!-- Asymmetric Decorative Blob -->
<div class="relative overflow-hidden bg-primary p-8 rounded-xl text-on-primary h-48 flex flex-col justify-end">
<div class="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
<div class="absolute top-4 right-4 w-20 h-20 border-4 border-white/10 rounded-full"></div>
<p class="text-xs font-black uppercase tracking-widest opacity-70">INSIDER ACCESS</p>
<h4 class="text-2xl font-black leading-tight mt-1">Join the VIP Circle for backstage passes.</h4>
</div>
</div>
</div>
</div>
</main>
</body></html>