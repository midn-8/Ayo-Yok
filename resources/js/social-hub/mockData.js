export const BASE_DATE = new Date('2026-05-18T21:30:00');

export const CATEGORY_META = {
    Music: {
        emoji: '♪',
        soft: 'bg-fuchsia-100 text-fuchsia-700 ring-1 ring-inset ring-fuchsia-200',
        accent: 'from-fuchsia-500 to-rose-500',
        marker: 'bg-fuchsia-500',
    },
    Seminar: {
        emoji: '◎',
        soft: 'bg-sky-100 text-sky-700 ring-1 ring-inset ring-sky-200',
        accent: 'from-sky-500 to-cyan-500',
        marker: 'bg-sky-500',
    },
    Sports: {
        emoji: '△',
        soft: 'bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200',
        accent: 'from-emerald-500 to-teal-500',
        marker: 'bg-emerald-500',
    },
    Food: {
        emoji: '◌',
        soft: 'bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-200',
        accent: 'from-amber-500 to-orange-500',
        marker: 'bg-amber-500',
    },
    Arts: {
        emoji: '✦',
        soft: 'bg-violet-100 text-violet-700 ring-1 ring-inset ring-violet-200',
        accent: 'from-violet-500 to-indigo-500',
        marker: 'bg-violet-500',
    },
    Community: {
        emoji: '◍',
        soft: 'bg-rose-100 text-rose-700 ring-1 ring-inset ring-rose-200',
        accent: 'from-rose-500 to-pink-500',
        marker: 'bg-rose-500',
    },
};

function sanitizeSvgText(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function getInitials(name) {
    return name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

function makeEventImage(title, accentA, accentB, glyph, subtitle = 'AyoYok live experiences') {
    const safeTitle = sanitizeSvgText(title);
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
            <defs>
                <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stop-color="${accentA}" />
                    <stop offset="100%" stop-color="${accentB}" />
                </linearGradient>
                <radialGradient id="glow" cx="50%" cy="35%" r="55%">
                    <stop offset="0%" stop-color="rgba(255,255,255,0.72)" />
                    <stop offset="100%" stop-color="rgba(255,255,255,0)" />
                </radialGradient>
            </defs>
            <rect width="1200" height="800" fill="#0f172a" rx="40" />
            <rect width="1200" height="800" fill="url(#bg)" rx="40" opacity="0.92" />
            <circle cx="250" cy="180" r="240" fill="url(#glow)" opacity="0.8" />
            <circle cx="1010" cy="620" r="220" fill="rgba(255,255,255,0.12)" />
            <circle cx="980" cy="180" r="90" fill="rgba(255,255,255,0.22)" />
            <path d="M0 640C180 560 320 560 460 640C600 720 760 730 1200 580V800H0Z" fill="rgba(15,23,42,0.18)" />
            <text x="90" y="165" fill="rgba(255,255,255,0.9)" font-size="84" font-family="Arial, sans-serif" font-weight="700">${glyph}</text>
            <text x="90" y="600" fill="#ffffff" font-size="74" font-family="Arial, sans-serif" font-weight="700">${safeTitle}</text>
            <text x="90" y="664" fill="rgba(255,255,255,0.82)" font-size="28" font-family="Arial, sans-serif">${sanitizeSvgText(subtitle)}</text>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function makeAvatarImage(name, accentA = '#fb923c', accentB = '#d946ef') {
    const safeName = sanitizeSvgText(name);
    const initials = getInitials(name);
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
            <defs>
                <linearGradient id="avatar-bg" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stop-color="${accentA}" />
                    <stop offset="100%" stop-color="${accentB}" />
                </linearGradient>
            </defs>
            <rect width="320" height="320" rx="68" fill="#0f172a" />
            <rect width="320" height="320" rx="68" fill="url(#avatar-bg)" opacity="0.95" />
            <circle cx="85" cy="78" r="78" fill="rgba(255,255,255,0.18)" />
            <circle cx="260" cy="248" r="90" fill="rgba(15,23,42,0.12)" />
            <text x="160" y="178" fill="#ffffff" font-size="116" font-family="Arial, sans-serif" font-weight="700" text-anchor="middle">${initials}</text>
            <text x="160" y="232" fill="rgba(255,255,255,0.86)" font-size="22" font-family="Arial, sans-serif" text-anchor="middle">${safeName}</text>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const ORGANIZERS = [
    {
        id: 'org-soundwave',
        name: 'Soundwave Asia',
        handle: '@soundwaveasia',
        bio: 'Festival curation with creator villages, after-dark stages, and large-scale social energy.',
        category: 'Music',
        followers: 42100,
        eventsHosted: 18,
        verified: true,
        avatar: makeAvatarImage('Soundwave Asia', '#ec4899', '#f97316'),
    },
    {
        id: 'org-creator-circle',
        name: 'Creator Circle',
        handle: '@creatorcircle',
        bio: 'Demo nights, maker meetups, and high-signal feedback rooms for product-minded communities.',
        category: 'Seminar',
        followers: 12340,
        eventsHosted: 11,
        verified: true,
        avatar: makeAvatarImage('Creator Circle', '#38bdf8', '#3b82f6'),
    },
    {
        id: 'org-stride-club',
        name: 'Stride Club',
        handle: '@strideclub',
        bio: 'Social fitness routes and beginner-friendly outdoor sessions with real community momentum.',
        category: 'Sports',
        followers: 9300,
        eventsHosted: 14,
        verified: false,
        avatar: makeAvatarImage('Stride Club', '#10b981', '#14b8a6'),
    },
    {
        id: 'org-studio-pagi',
        name: 'Studio Pagi',
        handle: '@studiopagi',
        bio: 'Slow creative rituals, clay nights, and tactile workshops built around conversation.',
        category: 'Arts',
        followers: 8700,
        eventsHosted: 9,
        verified: false,
        avatar: makeAvatarImage('Studio Pagi', '#8b5cf6', '#6366f1'),
    },
    {
        id: 'org-ayoyok-eats',
        name: 'AyoYok Eats',
        handle: '@ayoyokeats',
        bio: 'Guided food trails, chef-hosted tastings, and social discovery through local stalls.',
        category: 'Food',
        followers: 15620,
        eventsHosted: 7,
        verified: true,
        avatar: makeAvatarImage('AyoYok Eats', '#f59e0b', '#f97316'),
    },
    {
        id: 'org-urban-roots',
        name: 'Urban Roots',
        handle: '@urbanroots',
        bio: 'Community gatherings around green spaces, volunteering, and slower weekend rituals.',
        category: 'Community',
        followers: 6100,
        eventsHosted: 12,
        verified: false,
        avatar: makeAvatarImage('Urban Roots', '#fb7185', '#f43f5e'),
    },
];

export const EVENTS = [
    {
        id: 'evt-101',
        organizerId: 'org-soundwave',
        title: 'Moonlight Rooftop Sessions',
        category: 'Music',
        date: '2026-05-22T19:30:00',
        endsAt: '2026-05-22T23:45:00',
        location: 'Senayan Rooftop, Jakarta',
        price: 180000,
        featured: true,
        trending: true,
        joined: true,
        hostedByUser: false,
        recentlyViewed: true,
        host: 'Soundwave Asia',
        attendees: 1240,
        ticketStatus: 'Paid ticket',
        highlight: 'Live DJ sets with skyline views and a late-night social lounge.',
        description:
            'An open-air rooftop concert with indie bands, sunset cocktails, and a curated social lounge for new connections.',
        perks: ['Digital ticket with QR entry', 'Welcome drink', 'Priority lounge access'],
        keywords: ['dj', 'rooftop', 'nightlife', 'concert', 'music'],
        image: makeEventImage('Moonlight Rooftop', '#7c3aed', '#ec4899', '♪'),
    },
    {
        id: 'evt-102',
        organizerId: 'org-creator-circle',
        title: 'Startup Storytelling Sprint',
        category: 'Seminar',
        date: '2026-05-25T18:00:00',
        endsAt: '2026-05-25T21:15:00',
        location: 'Kuningan Commons, Jakarta',
        price: 85000,
        featured: true,
        trending: false,
        joined: false,
        hostedByUser: true,
        recentlyViewed: false,
        host: 'You and Creator Circle',
        attendees: 320,
        ticketStatus: 'Host badge',
        highlight: 'Pitch decks, growth stories, and a serious networking room.',
        description:
            'A fast-paced evening for founders, marketers, and creators who want sharper storytelling for launches, demos, and community building.',
        perks: ['Speaker notes pack', 'Networking session', 'After-event discussion room'],
        keywords: ['startup', 'pitch', 'founder', 'product', 'networking'],
        image: makeEventImage('Storytelling Sprint', '#0ea5e9', '#22d3ee', '◎'),
    },
    {
        id: 'evt-103',
        organizerId: 'org-stride-club',
        title: 'Sunrise Fun Run Collective',
        category: 'Sports',
        date: '2026-05-19T06:15:00',
        endsAt: '2026-05-19T08:45:00',
        location: 'GBK Loop, Jakarta',
        price: 0,
        featured: false,
        trending: true,
        joined: true,
        hostedByUser: false,
        recentlyViewed: false,
        host: 'Stride Club',
        attendees: 540,
        ticketStatus: 'RSVP confirmed',
        highlight: 'Free morning social run with recovery snacks and a stretch circle.',
        description:
            'Start the day with a community-paced 5K run, a stretch circle, and a casual post-run meetup for runners of all levels.',
        perks: ['Free entry', 'Hydration station', 'Community badge'],
        keywords: ['run', 'fitness', 'free', 'morning', 'community'],
        image: makeEventImage('Sunrise Fun Run', '#10b981', '#14b8a6', '△'),
    },
    {
        id: 'evt-104',
        organizerId: 'org-studio-pagi',
        title: 'Clay and Coffee Studio Night',
        category: 'Arts',
        date: '2026-05-24T17:30:00',
        endsAt: '2026-05-24T21:00:00',
        location: 'Kemang Atelier, Jakarta',
        price: 150000,
        featured: true,
        trending: false,
        joined: false,
        hostedByUser: false,
        recentlyViewed: true,
        host: 'Studio Pagi',
        attendees: 88,
        ticketStatus: 'Available',
        highlight: 'Wheel throwing, music, and slow coffee with a jazz duo.',
        description:
            'Create your own ceramic cup while a local barista serves rotating brews and a jazz duo plays through the evening.',
        perks: ['All materials included', 'Kiln firing', 'Coffee pairing'],
        keywords: ['pottery', 'coffee', 'creative', 'workshop', 'jazz'],
        image: makeEventImage('Clay and Coffee', '#8b5cf6', '#6366f1', '✦'),
    },
    {
        id: 'evt-105',
        organizerId: 'org-ayoyok-eats',
        title: 'Street Food Passport Night',
        category: 'Food',
        date: '2026-05-28T18:30:00',
        endsAt: '2026-05-28T22:00:00',
        location: 'Pantai Indah Kapuk Market',
        price: 45000,
        featured: false,
        trending: true,
        joined: false,
        hostedByUser: false,
        recentlyViewed: true,
        host: 'AyoYok Eats',
        attendees: 760,
        ticketStatus: 'Available',
        highlight: 'Tasting trail across twelve local stalls and chef picks.',
        description:
            'A guided social tasting route with chef recommendations, creator meetups, and a live ranking board for favorite bites.',
        perks: ['Tasting passport', 'Exclusive discount stalls', 'Shareable foodie badge'],
        keywords: ['food', 'culinary', 'market', 'night', 'tasting'],
        image: makeEventImage('Food Passport', '#f59e0b', '#f97316', '◌'),
    },
    {
        id: 'evt-106',
        organizerId: 'org-urban-roots',
        title: 'Community Garden Sunday',
        category: 'Community',
        date: '2026-05-23T09:00:00',
        endsAt: '2026-05-23T13:30:00',
        location: 'Tebet Eco Park, Jakarta',
        price: 0,
        featured: false,
        trending: false,
        joined: false,
        hostedByUser: true,
        recentlyViewed: false,
        host: 'You and Urban Roots',
        attendees: 112,
        ticketStatus: 'Host badge',
        highlight: 'Planting session, brunch picnic, and a seed-swap circle.',
        description:
            'A relaxed community meetup to plant herbs, exchange seeds, and turn a public green space into a social Sunday ritual.',
        perks: ['Free entry', 'Starter seed kit', 'Volunteer certificate'],
        keywords: ['garden', 'volunteer', 'community', 'brunch', 'park'],
        image: makeEventImage('Garden Sunday', '#fb7185', '#f43f5e', '◍'),
    },
    {
        id: 'evt-107',
        organizerId: 'org-stride-club',
        title: 'Beach Volley Social Cup',
        category: 'Sports',
        date: '2026-05-30T16:00:00',
        endsAt: '2026-05-30T20:00:00',
        location: 'Ancol Sand Court, Jakarta',
        price: 95000,
        featured: false,
        trending: false,
        joined: false,
        hostedByUser: false,
        recentlyViewed: false,
        host: 'Stride Club',
        attendees: 196,
        ticketStatus: 'Available',
        highlight: 'Mixed teams, warmup drills, and sunset finals on the sand.',
        description:
            'A casual social tournament with beginner-friendly brackets, coaching stations, and a post-match beach hangout.',
        perks: ['Court access', 'Team placement', 'Locker area'],
        keywords: ['volley', 'sports', 'beach', 'sunset', 'tournament'],
        image: makeEventImage('Volley Social Cup', '#22c55e', '#06b6d4', '△'),
    },
    {
        id: 'evt-108',
        organizerId: 'org-creator-circle',
        title: 'Creator Circle Demo Night',
        category: 'Seminar',
        date: '2026-06-02T19:00:00',
        endsAt: '2026-06-02T22:00:00',
        location: 'Thamrin Lab, Jakarta',
        price: 65000,
        featured: true,
        trending: true,
        joined: false,
        hostedByUser: false,
        recentlyViewed: false,
        host: 'Creator Circle',
        attendees: 410,
        ticketStatus: 'Available',
        highlight: 'New product demos and feedback sessions with builders.',
        description:
            'Creators and indie builders gather to demo what they are shipping, collect feedback, and meet future collaborators.',
        perks: ['Demo floor access', 'Feedback cards', 'After-hours mixer'],
        keywords: ['demo', 'creator', 'builder', 'feedback', 'product'],
        image: makeEventImage('Demo Night', '#38bdf8', '#3b82f6', '◎'),
    },
    {
        id: 'evt-109',
        organizerId: 'org-soundwave',
        title: 'City Soundwave Festival',
        category: 'Music',
        date: '2026-06-06T18:30:00',
        endsAt: '2026-06-07T00:30:00',
        location: 'ICE BSD Open Ground',
        price: 250000,
        featured: true,
        trending: true,
        joined: false,
        hostedByUser: false,
        recentlyViewed: true,
        host: 'Soundwave Asia',
        attendees: 5200,
        ticketStatus: 'Available',
        highlight: 'Multi-stage festival with creator village and after-dark installations.',
        description:
            'A large-scale city festival mixing breakout artists, immersive installations, and community meetups throughout the night.',
        perks: ['Festival wristband', 'Access to creator village', 'Night shuttle pass'],
        keywords: ['festival', 'concert', 'creator', 'nightlife', 'music'],
        image: makeEventImage('City Soundwave', '#ec4899', '#f97316', '♪'),
    },
    {
        id: 'evt-110',
        organizerId: 'org-studio-pagi',
        title: 'Indie Film Rooftop Premiere',
        category: 'Arts',
        date: '2026-05-18T20:00:00',
        endsAt: '2026-05-18T22:30:00',
        location: 'SCBD Skyline Deck',
        price: 120000,
        featured: false,
        trending: false,
        joined: true,
        hostedByUser: false,
        recentlyViewed: false,
        host: 'Studio Pagi',
        attendees: 276,
        ticketStatus: 'Paid ticket',
        highlight: 'Film screening followed by a live cast and director conversation.',
        description:
            'Watch a new independent release under the stars, then stay for a live conversation with the director, cast, and audience.',
        perks: ['Reserved screening seat', 'Q and A access', 'Digital poster'],
        keywords: ['film', 'cinema', 'rooftop', 'indie', 'premiere'],
        image: makeEventImage('Film Premiere', '#6366f1', '#8b5cf6', '✦'),
    },
    {
        id: 'evt-111',
        organizerId: 'org-urban-roots',
        title: 'Neon Picnic Social',
        category: 'Community',
        date: '2026-05-17T17:00:00',
        endsAt: '2026-05-17T21:00:00',
        location: 'Hutan Kota by Plataran',
        price: 0,
        featured: false,
        trending: false,
        joined: true,
        hostedByUser: false,
        recentlyViewed: false,
        host: 'Urban Roots',
        attendees: 224,
        ticketStatus: 'RSVP confirmed',
        highlight: 'Blanket lounge setups, acoustic sets, and a glow-in-the-dark picnic.',
        description:
            'An easy-going community picnic with shared snacks, live acoustic music, and enough room for new groups to form naturally.',
        perks: ['Glow kit', 'Acoustic set', 'Picnic map'],
        keywords: ['picnic', 'community', 'park', 'social', 'music'],
        image: makeEventImage('Neon Picnic', '#fb7185', '#f43f5e', '◍'),
    },
    {
        id: 'evt-112',
        organizerId: 'org-studio-pagi',
        title: 'Weekend Pottery Brunch',
        category: 'Arts',
        date: '2026-06-08T10:00:00',
        endsAt: '2026-06-08T13:00:00',
        location: 'Menteng Clay House',
        price: 140000,
        featured: true,
        trending: false,
        joined: false,
        hostedByUser: false,
        recentlyViewed: false,
        host: 'Studio Pagi',
        attendees: 148,
        ticketStatus: 'Available',
        highlight: 'Hands-on ceramic session with a warm brunch table after class.',
        description:
            'Shape your own tableware, swap playlists with other guests, and stay for a slow brunch hosted by local makers.',
        perks: ['Brunch set', 'Studio apron', 'Ceramic glazing'],
        keywords: ['pottery', 'brunch', 'creative', 'weekend', 'maker'],
        image: makeEventImage('Pottery Brunch', '#7c3aed', '#fb7185', '✦'),
    },
];

export const USER_EVENT_BADGES = [
    { id: 'badge-01', name: 'Front Row Energy', note: 'Joined 4 live shows', accent: 'bg-fuchsia-100 text-fuchsia-700' },
    { id: 'badge-02', name: 'Weekend Wanderer', note: 'Active across 3 categories', accent: 'bg-amber-100 text-amber-700' },
    { id: 'badge-03', name: 'Social Connector', note: '12 comments and 38 likes', accent: 'bg-sky-100 text-sky-700' },
];

export const RANK_TIERS = [
    { name: 'Newbie Partier', minEvents: 0, minActivity: 0 },
    { name: 'Weekend Wanderer', minEvents: 3, minActivity: 4 },
    { name: 'Festival Addict', minEvents: 5, minActivity: 10 },
    { name: 'Concert Maniac', minEvents: 7, minActivity: 14 },
    { name: 'Elite Explorer', minEvents: 9, minActivity: 18 },
];

export const SOCIAL_POSTS = [
    {
        id: 'post-201',
        userName: 'Nadia Hart',
        handle: '@nadiahart',
        eventId: 'evt-111',
        caption: 'The glow picnic felt weirdly intimate in the best way. Found two new brunch friends before the acoustic set even started.',
        likes: 284,
        comments: 16,
        timeAgo: '3h ago',
        avatar: makeAvatarImage('Nadia Hart', '#fb923c', '#ec4899'),
    },
    {
        id: 'post-202',
        userName: 'Rafi Pramana',
        handle: '@rafiruns',
        eventId: 'evt-103',
        caption: 'Stride Club still knows how to make a 6AM run feel social instead of painful. Coffee table after the finish was packed.',
        likes: 198,
        comments: 10,
        timeAgo: '7h ago',
        avatar: makeAvatarImage('Rafi Pramana', '#0ea5e9', '#10b981'),
    },
    {
        id: 'post-203',
        userName: 'Sasha Lee',
        handle: '@sashawanders',
        eventId: 'evt-101',
        caption: 'Moonlight Rooftop keeps getting better. The skyline, the set list, and the tiny corners where strangers actually talk.',
        likes: 421,
        comments: 28,
        timeAgo: '9h ago',
        avatar: makeAvatarImage('Sasha Lee', '#ec4899', '#8b5cf6'),
    },
    {
        id: 'post-204',
        userName: 'Arka Wijaya',
        handle: '@arka.builds',
        eventId: 'evt-108',
        caption: 'Demo Night energy is exactly what the local builder scene needed. Fewer lectures, more shipping and feedback.',
        likes: 160,
        comments: 12,
        timeAgo: '12h ago',
        avatar: makeAvatarImage('Arka Wijaya', '#38bdf8', '#3b82f6'),
    },
    {
        id: 'post-205',
        userName: 'Mina Chen',
        handle: '@minacoffee',
        eventId: 'evt-104',
        caption: 'Clay + coffee + quiet music is such an unfairly good combination. I left with a crooked mug and zero regrets.',
        likes: 242,
        comments: 19,
        timeAgo: '1d ago',
        avatar: makeAvatarImage('Mina Chen', '#8b5cf6', '#6366f1'),
    },
    {
        id: 'post-206',
        userName: 'Bayu Adi',
        handle: '@bayueats',
        eventId: 'evt-105',
        caption: 'The passport trail is dangerous if you arrive hungry. Best stop tonight: charred satay with lime and chilli salt.',
        likes: 307,
        comments: 21,
        timeAgo: '1d ago',
        avatar: makeAvatarImage('Bayu Adi', '#f59e0b', '#f97316'),
    },
    {
        id: 'post-207',
        userName: 'Luna Maulani',
        handle: '@lunamaulani',
        eventId: 'evt-110',
        caption: 'Rooftop premiere nights need to stay in rotation. The Q and A after the screening made the whole ticket worth it.',
        likes: 188,
        comments: 14,
        timeAgo: '2d ago',
        avatar: makeAvatarImage('Luna Maulani', '#6366f1', '#8b5cf6'),
    },
    {
        id: 'post-208',
        userName: 'Aldo H.',
        handle: '@aldosocial',
        eventId: 'evt-109',
        caption: 'Soundwave festival map dropped and it already looks like an entire weekend plan.',
        likes: 530,
        comments: 31,
        timeAgo: '2d ago',
        avatar: makeAvatarImage('Aldo H', '#ec4899', '#f97316'),
    },
    {
        id: 'post-209',
        userName: 'Ghea Putri',
        handle: '@gheaputri',
        eventId: 'evt-112',
        caption: 'Booked the pottery brunch before my coffee even cooled down. This one is going to sell out.',
        likes: 147,
        comments: 7,
        timeAgo: '3d ago',
        avatar: makeAvatarImage('Ghea Putri', '#7c3aed', '#fb7185'),
    },
];

export const USER_REVIEW_POSTS = [
    {
        id: 'review-301',
        eventId: 'evt-111',
        caption: 'Neon Picnic Social did the simple things right: enough space, low-pressure conversation, and a genuinely warm host circle.',
        likes: 48,
        comments: 9,
        createdAt: '2026-05-18T08:30:00',
    },
    {
        id: 'review-302',
        eventId: 'evt-110',
        caption: 'The rooftop screening looked great after dark. Strong crowd, clean audio, and the cast Q and A never dragged.',
        likes: 29,
        comments: 4,
        createdAt: '2026-05-18T21:10:00',
    },
];

export const USER_STORIES = [
    { id: 'story-1', label: 'Rooftops', eventId: 'evt-101', accent: 'from-fuchsia-500 to-rose-500' },
    { id: 'story-2', label: 'Run Club', eventId: 'evt-103', accent: 'from-emerald-500 to-teal-500' },
    { id: 'story-3', label: 'Picnic', eventId: 'evt-111', accent: 'from-rose-500 to-pink-500' },
];

export const MESSAGE_THREADS = [
    {
        id: 'thread-01',
        userName: 'Luna Hart',
        handle: '@lunahart',
        role: 'Host • Soundwave Asia',
        unread: 2,
        avatar: makeAvatarImage('Luna Hart', '#ec4899', '#f97316'),
        eventId: 'evt-101',
        lastMessage: 'VIP gate opens at 6:45 PM if you want the rooftop photo line before the crowd.',
        messages: [
            { id: 'm1', sender: 'them', text: 'We just released the set times for Moonlight Rooftop.', time: '18:10' },
            { id: 'm2', sender: 'self', text: 'Perfect. Is rooftop check-in still on level 8?', time: '18:14' },
            { id: 'm3', sender: 'them', text: 'Yes. VIP gate opens at 6:45 PM if you want the rooftop photo line before the crowd.', time: '18:16' },
        ],
    },
    {
        id: 'thread-02',
        userName: 'Maya Anindita',
        handle: '@mayaanindita',
        role: 'Friend invite',
        unread: 1,
        avatar: makeAvatarImage('Maya Anindita', '#8b5cf6', '#d946ef'),
        eventId: 'evt-110',
        invitation: { status: 'Waiting on you', type: 'Private dinner afterparty' },
        lastMessage: 'Sent you a private afterparty invite for next Friday. Open it from here if you are in.',
        messages: [
            { id: 'm4', sender: 'them', text: 'Sent you a private afterparty invite for next Friday. Open it from here if you are in.', time: '09:05' },
            { id: 'm5', sender: 'self', text: 'Looking now. Theme still black and silver?', time: '09:10' },
        ],
    },
    {
        id: 'thread-03',
        userName: 'Rafi Pramana',
        handle: '@rafiruns',
        role: 'Run club',
        unread: 0,
        avatar: makeAvatarImage('Rafi Pramana', '#10b981', '#06b6d4'),
        eventId: 'evt-103',
        lastMessage: 'We are stretching near the west gate this time.',
        messages: [
            { id: 'm6', sender: 'them', text: 'We are stretching near the west gate this time.', time: '06:52' },
            { id: 'm7', sender: 'self', text: 'Nice. I should get there five minutes early.', time: '06:55' },
        ],
    },
];

export const INVITE_CONTACTS = [
    { id: 'contact-1', name: 'Maya Anindita', handle: '@mayaanindita', address: 'maya@ayoyok.app', hasAccount: true },
    { id: 'contact-2', name: 'Rafi Pramana', handle: '@rafiruns', address: 'rafi@ayoyok.app', hasAccount: true },
    { id: 'contact-3', name: 'Ghea Putri', handle: '', address: 'ghea@gmail.com', hasAccount: false },
    { id: 'contact-4', name: 'Evan K', handle: '@evank', address: 'evan@ayoyok.app', hasAccount: true },
    { id: 'contact-5', name: 'Clara Wang', handle: '', address: 'clarawang@yahoo.com', hasAccount: false },
];

export const INVITATION_TEMPLATES = [
    {
        id: 'elegant-night',
        name: 'Elegant Night',
        blurb: 'Black-tie dinner mood with warm metallic contrast.',
        previewAccent: 'from-slate-950 via-zinc-800 to-amber-600',
        defaultMessage: 'Dress sharp, arrive on time, and stay late enough for the after-dinner playlist.',
    },
    {
        id: 'minimal-modern',
        name: 'Minimal Modern',
        blurb: 'Editorial white-space layout with soft monochrome balance.',
        previewAccent: 'from-slate-100 via-white to-slate-300',
        defaultMessage: 'A clean, intimate gathering with good design, good people, and no unnecessary noise.',
    },
    {
        id: 'party-neon',
        name: 'Party Neon',
        blurb: 'High-energy invite with nightlife gradients and glowing accents.',
        previewAccent: 'from-fuchsia-500 via-violet-500 to-cyan-400',
        defaultMessage: 'Come loud, come playful, and bring enough energy for a proper after-hours memory.',
    },
];

export const PRIVATE_EVENT_LIMITS = {
    plan: 'Free',
    maxPrivateEventsPerMonth: 2,
    remainingPrivateEventsThisMonth: 1,
    maxInvitees: 8,
};

export const PAYMENT_METHODS = [
    { id: 'virtual-account', label: 'Virtual Account', note: 'BCA, Mandiri, BNI, BRI' },
    { id: 'ewallet', label: 'E-Wallet', note: 'GoPay, OVO, DANA, ShopeePay' },
    { id: 'credit-card', label: 'Credit Card', note: 'Visa, Mastercard, JCB' },
];

export function compareEventDates(left, right) {
    return new Date(left.date) - new Date(right.date);
}

export function isUpcomingEvent(event) {
    return new Date(event.endsAt || event.date) >= BASE_DATE;
}

export function isPastOrOngoingEvent(event) {
    return new Date(event.date) <= BASE_DATE;
}

export function getEventById(eventId) {
    return EVENTS.find((event) => event.id === eventId);
}

export function getOrganizerById(organizerId) {
    return ORGANIZERS.find((organizer) => organizer.id === organizerId);
}

export function getJoinedEvents() {
    return EVENTS.filter((event) => event.joined).sort(compareEventDates);
}

export function getUpcomingJoinedEvents() {
    return getJoinedEvents().filter(isUpcomingEvent);
}

export function getRecentlyViewedEvents() {
    return EVENTS.filter((event) => event.recentlyViewed).sort(compareEventDates);
}

export function getHostedEvents() {
    return EVENTS.filter((event) => event.hostedByUser).sort(compareEventDates);
}

export function getFeaturedEvents() {
    return EVENTS.filter((event) => event.featured).sort(compareEventDates);
}

export function getTrendingEvents() {
    return EVENTS.filter((event) => event.trending).sort(compareEventDates);
}

export function getRecommendedEvents() {
    const joinedCategories = new Set(getJoinedEvents().map((event) => event.category));

    return EVENTS.filter((event) => !event.joined)
        .sort((left, right) => {
            const leftScore = (joinedCategories.has(left.category) ? 2 : 0) + (left.featured ? 1 : 0) + (left.trending ? 1 : 0);
            const rightScore = (joinedCategories.has(right.category) ? 2 : 0) + (right.featured ? 1 : 0) + (right.trending ? 1 : 0);
            return rightScore - leftScore || compareEventDates(left, right);
        })
        .slice(0, 6);
}

export function canReviewEvent(event) {
    return event.joined && isPastOrOngoingEvent(event);
}

export function getUserRank(joinedCount, socialActivity) {
    let selectedTier = RANK_TIERS[0];

    for (const tier of RANK_TIERS) {
        if (joinedCount >= tier.minEvents && socialActivity >= tier.minActivity) {
            selectedTier = tier;
        }
    }

    return selectedTier.name;
}

export function buildInvitationLink(token, theme) {
    return `/invite/${token}?theme=${theme}`;
}

export function buildInvitationPayload({ title, date, theme, message, host }) {
    const template = INVITATION_TEMPLATES.find((item) => item.id === theme) || INVITATION_TEMPLATES[0];
    const normalizedTitle = title?.trim() || 'Private Celebration';
    const normalizedHost = host?.trim() || 'AyoYok Host';

    return {
        theme: template.id,
        title: normalizedTitle,
        date: date || '2026-06-14T19:00:00',
        host: normalizedHost,
        message: message?.trim() || template.defaultMessage,
    };
}

export function getInvitationPreviewByToken(token) {
    const normalized = String(token || '').toLowerCase();

    if (normalized.includes('minimal')) {
        return buildInvitationPayload({
            title: 'Gallery Loft Dinner',
            date: '2026-06-21T19:30:00',
            theme: 'minimal-modern',
            host: 'Maya Anindita',
            message: 'An intimate dinner after the gallery walk. Clean lines, low light, and a short guest list.',
        });
    }

    if (normalized.includes('neon')) {
        return buildInvitationPayload({
            title: 'After Hours Birthday Circuit',
            date: '2026-06-26T21:00:00',
            theme: 'party-neon',
            host: 'Luna Hart',
            message: 'One rule: do not arrive low energy. The playlist starts hard and stays that way.',
        });
    }

    return buildInvitationPayload({
        title: 'Skyline Supper Club',
        date: '2026-06-14T19:00:00',
        theme: 'elegant-night',
        host: 'Sasha Lee',
        message: 'Join us for a private supper with a dressed-up table, a tight guest list, and a late-night vinyl set.',
    });
}

export { getInitials, makeAvatarImage, makeEventImage };
