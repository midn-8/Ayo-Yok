export const studioNav = [
    { label: 'Dashboard', href: '/studio', key: 'dashboard' },
    { label: 'Create Event', href: '/studio/create-event', key: 'create-event' },
    { label: 'Boost Event', href: '/studio/boost-event', key: 'boost-event' },
    { label: 'Schedule Window', href: '/studio/schedule-window', key: 'schedule-window' },
    { label: 'Social Manager', href: '/studio/social-media-management', key: 'social-media-management' },
    { label: 'Planning', href: '/studio/planning', key: 'planning' },
    { label: 'Payment Config', href: '/studio/payment-configuration', key: 'payment' },
    { label: 'Organizer Profile', href: '/studio/organizer-profile', key: 'profile' },
];

export const dashboardStats = [
    { label: 'Revenue (30D)', value: 164500000, trend: 18, tone: 'emerald' },
    { label: 'Attendees', value: 28470, trend: 12, tone: 'sky' },
    { label: 'Active Campaigns', value: 9, trend: 4, tone: 'violet' },
    { label: 'Upcoming Events', value: 17, trend: 9, tone: 'amber' },
];

export const revenueTrend = [42, 55, 51, 62, 71, 66, 79, 84, 82, 93, 89, 104];
export const attendeeTrend = [18, 22, 19, 31, 37, 33, 44, 52, 48, 63, 58, 70];

export const activeEvents = [
    {
        id: 'evt-neo-bazaar',
        title: 'Neo Bazaar Vol.4',
        status: 'Live',
        date: '2026-06-12T18:30:00+07:00',
        location: 'Jakarta Convention Center',
        sold: 1280,
        cap: 1500,
        revenue: 96400000,
    },
    {
        id: 'evt-sunset-runners',
        title: 'Sunset Runners Social 10K',
        status: 'Selling',
        date: '2026-06-18T17:00:00+07:00',
        location: 'GBK Loop, Jakarta',
        sold: 860,
        cap: 1200,
        revenue: 48600000,
    },
    {
        id: 'evt-jazz-rooftop',
        title: 'Rooftop Jazz Sessions',
        status: 'Draft',
        date: '2026-07-01T19:00:00+07:00',
        location: 'Skye Rooftop, Jakarta',
        sold: 0,
        cap: 600,
        revenue: 0,
    },
];

export const recentActivity = [
    {
        id: 1,
        title: 'Campaign budget auto-adjusted for Neo Bazaar',
        timestamp: '2026-05-19T11:21:00+07:00',
        meta: 'Boost Engine',
    },
    {
        id: 2,
        title: 'Payout of Rp 23.400.000 processed successfully',
        timestamp: '2026-05-19T09:08:00+07:00',
        meta: 'Payments',
    },
    {
        id: 3,
        title: 'Collab invite accepted by @sonicdistrictstudio',
        timestamp: '2026-05-18T23:02:00+07:00',
        meta: 'Workspace',
    },
    {
        id: 4,
        title: 'Verification badge upgraded to Gold Organizer',
        timestamp: '2026-05-18T20:43:00+07:00',
        meta: 'Organizer Trust',
    },
];

export const createEventDraft = {
    title: 'AyoYok Studio: Builder Meetup',
    description:
        'An evening meetup for event creators, marketers, and venue operators focused on audience growth and recurring event playbooks.',
    category: 'Business Networking',
    location: 'District 8 Hall, Jakarta',
    date: '2026-06-28',
    time: '18:30',
    capacity: 420,
    ticketPrice: 195000,
};

export const boostRecommendations = [
    { label: 'Audience Match', value: 'High', note: '92% fit with previous attendees' },
    { label: 'Estimated Reach', value: '48K - 63K', note: 'Across Jakarta + Tangerang' },
    { label: 'Cost per Join', value: 'Rp 12.500', note: 'Based on last 4 campaigns' },
];

export const subscriptionTiers = [
    {
        name: 'Starter',
        price: 'Rp 0',
        blurb: 'For solo organizers validating their first concepts.',
        features: ['2 active events', 'Basic analytics', 'Standard payout cadence'],
        active: false,
    },
    {
        name: 'Scale',
        price: 'Rp 1.490.000 / month',
        blurb: 'For teams growing recurring and paid events.',
        features: ['Unlimited events', 'Boost automation', '2 collaborator seats', 'Revenue intelligence'],
        active: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        blurb: 'For agencies and large organizers with multiple brands.',
        features: ['Multi-brand workspaces', 'API integrations', 'Dedicated success manager'],
        active: false,
    },
];

export const billingHistory = [
    { id: 'INV-4832', item: 'Scale Plan - May 2026', amount: 1490000, status: 'Paid', date: '2026-05-01' },
    { id: 'INV-4755', item: 'Boost Credit Top-Up', amount: 3000000, status: 'Paid', date: '2026-04-20' },
    { id: 'INV-4622', item: 'Scale Plan - Apr 2026', amount: 1490000, status: 'Paid', date: '2026-04-01' },
];

export const payoutMethods = [
    { type: 'Bank Transfer', value: 'BCA •••• 8891', primary: true },
    { type: 'E-Wallet', value: 'GoPay Biz •••• 124', primary: false },
];

export const transactions = [
    { id: 'TRX-9124', event: 'Neo Bazaar Vol.4', gross: 32500000, fee: 1625000, net: 30875000, status: 'Settled' },
    { id: 'TRX-9039', event: 'Sunset Runners Social 10K', gross: 28400000, fee: 1420000, net: 26980000, status: 'Settled' },
    { id: 'TRX-8988', event: 'Creative Founder Night', gross: 12900000, fee: 645000, net: 12255000, status: 'In Review' },
];

export const paymentGatewayMethods = [
    {
        id: 'gw-gopay',
        name: 'GoPay',
        type: 'E-Wallet',
        status: 'Active',
        fee: '1.8% + Rp 1.000',
        settlement: 'T+1',
    },
    {
        id: 'gw-va-bca',
        name: 'BCA Virtual Account',
        type: 'Virtual Account',
        status: 'Active',
        fee: 'Rp 4.000 / txn',
        settlement: 'T+1',
    },
    {
        id: 'gw-va-mandiri',
        name: 'Mandiri Virtual Account',
        type: 'Virtual Account',
        status: 'Active',
        fee: 'Rp 4.500 / txn',
        settlement: 'T+1',
    },
    {
        id: 'gw-qris',
        name: 'QRIS',
        type: 'QR Payment',
        status: 'Active',
        fee: '0.7% MDR',
        settlement: 'T+1',
    },
    {
        id: 'gw-card',
        name: 'Credit / Debit Card',
        type: 'Card',
        status: 'Review',
        fee: '2.9% + Rp 2.000',
        settlement: 'T+2',
    },
];

export const checkoutFlow = [
    { step: 'Customer selects event ticket', owner: 'Consumer App', status: 'Live' },
    { step: 'Gateway payment method list shown (GoPay, VA, QRIS, Card)', owner: 'Checkout API', status: 'Live' },
    { step: 'Payment authorization + callback', owner: 'Gateway Provider', status: 'Live' },
    { step: 'Webhook updates transaction + ticket issuance', owner: 'AyoYok Backend', status: 'Live' },
    { step: 'Net revenue settled to organizer payout account', owner: 'Finance Service', status: 'Live' },
];

export const organizerStats = [
    { label: 'Followers', value: 124800 },
    { label: 'Events Hosted', value: 138 },
    { label: 'Avg Event Rating', value: 4.8 },
    { label: 'Response Time', value: '19m' },
];

export const organizerProfileDefaults = {
    name: 'AyoYok Originals',
    bio: 'We design social-first events for founders, creators, and modern communities across Indonesia.',
    instagram: 'https://instagram.com/ayoyok',
    tiktok: 'https://tiktok.com/@ayoyok',
};

export const scheduleWindowEvents = [
    {
        id: 'SCH-401',
        eventName: 'Neo Bazaar Vol.4',
        date: '2026-06-12',
        time: '18:30',
        location: 'Jakarta Convention Center',
        stage: 'Live',
        task: 'Finalize onsite sponsor booth placements',
    },
    {
        id: 'SCH-402',
        eventName: 'Sunset Runners Social 10K',
        date: '2026-06-18',
        time: '17:00',
        location: 'GBK Loop, Jakarta',
        stage: 'Promotion',
        task: 'Publish final route map + hydration station story',
    },
    {
        id: 'SCH-403',
        eventName: 'Rooftop Jazz Sessions',
        date: '2026-07-01',
        time: '19:00',
        location: 'Skye Rooftop, Jakarta',
        stage: 'Draft',
        task: 'Approve performer lineup announcement post',
    },
    {
        id: 'SCH-404',
        eventName: 'Creator Commerce Night',
        date: '2026-07-08',
        time: '18:00',
        location: 'SCBD Hub, Jakarta',
        stage: 'Planning',
        task: 'Open early-bird ticket campaign',
    },
];

export const socialAdPosts = [
    {
        id: 'AD-301',
        eventName: 'Neo Bazaar Vol.4',
        caption: 'Flash sale tonight. Last 220 tickets before final tier pricing.',
        channel: 'Instagram + TikTok',
        status: 'Scheduled',
        publishAt: '2026-05-21T19:30:00+07:00',
    },
    {
        id: 'AD-302',
        eventName: 'Sunset Runners Social 10K',
        caption: 'Training run preview + crew reveal. Build momentum before race day.',
        channel: 'Instagram Reels',
        status: 'Published',
        publishAt: '2026-05-19T18:15:00+07:00',
    },
];

export const storyDrafts = [
    {
        id: 'ST-88',
        eventName: 'Neo Bazaar Vol.4',
        headline: 'Behind the scenes loading dock prep.',
        status: 'Draft',
        slot: '2026-05-20 20:00',
    },
    {
        id: 'ST-89',
        eventName: 'Sunset Runners Social 10K',
        headline: 'Pacer introduction story set.',
        status: 'Scheduled',
        slot: '2026-05-21 06:30',
    },
];

export const attendeeMemories = [
    {
        id: 'MEM-710',
        userName: 'Naya Putri',
        handle: '@naya.mov',
        eventName: 'Neo Bazaar Vol.4',
        caption: 'Met three new collaborators and discovered amazing local brands tonight.',
        postedAt: '2026-05-19T20:10:00+07:00',
        image:
            'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'MEM-711',
        userName: 'Raka Wijaya',
        handle: '@rakawj',
        eventName: 'Sunset Runners Social 10K',
        caption: 'The vibe and crowd support made the route feel short. Signing up for next month.',
        postedAt: '2026-05-19T07:42:00+07:00',
        image:
            'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'MEM-712',
        userName: 'Tasya M',
        handle: '@tasyaframes',
        eventName: 'Creative Founder Night',
        caption: 'This panel unlocked so many growth ideas. Thank you for organizing this.',
        postedAt: '2026-05-18T23:16:00+07:00',
        image:
            'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 'MEM-713',
        userName: 'Lukman Z',
        handle: '@lukmanjourneys',
        eventName: 'Neo Bazaar Vol.4',
        caption: 'Captured this moment right before the headline session started.',
        postedAt: '2026-05-18T21:30:00+07:00',
        image:
            'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=900&q=80',
    },
];

export const collaborationQueue = [
    { id: 'COL-51', user: '@naya.mov', eventName: 'Neo Bazaar Vol.4', permission: 'Auto-approved for profile feed', status: 'Approved' },
    { id: 'COL-52', user: '@rakawj', eventName: 'Sunset Runners Social 10K', permission: 'Awaiting organizer review', status: 'Review' },
    { id: 'COL-53', user: '@tasyaframes', eventName: 'Creative Founder Night', permission: 'Auto-approved for profile feed', status: 'Approved' },
];
