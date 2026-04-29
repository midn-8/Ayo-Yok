import * as React from 'react';
import { createRoot } from 'react-dom/client';

const { StrictMode, useState } = React;

const BASE_DATE = new Date('2026-04-29T00:00:00');
const DATE_FILTERS = ['All Dates', 'This Week', 'This Month', 'Next Month'];

const CATEGORY_META = {
    Music: {
        emoji: '♪',
        soft: 'bg-fuchsia-100 text-fuchsia-700 ring-1 ring-inset ring-fuchsia-200',
        accent: 'from-fuchsia-500 to-rose-500',
    },
    Seminar: {
        emoji: '◎',
        soft: 'bg-sky-100 text-sky-700 ring-1 ring-inset ring-sky-200',
        accent: 'from-sky-500 to-cyan-500',
    },
    Sports: {
        emoji: '△',
        soft: 'bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200',
        accent: 'from-emerald-500 to-teal-500',
    },
    Food: {
        emoji: '◌',
        soft: 'bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-200',
        accent: 'from-amber-500 to-orange-500',
    },
    Arts: {
        emoji: '✦',
        soft: 'bg-violet-100 text-violet-700 ring-1 ring-inset ring-violet-200',
        accent: 'from-violet-500 to-indigo-500',
    },
    Community: {
        emoji: '◍',
        soft: 'bg-rose-100 text-rose-700 ring-1 ring-inset ring-rose-200',
        accent: 'from-rose-500 to-pink-500',
    },
};

function makeEventImage(title, accentA, accentB, glyph) {
    const safeTitle = title.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
            <defs>
                <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stop-color="${accentA}" />
                    <stop offset="100%" stop-color="${accentB}" />
                </linearGradient>
                <radialGradient id="glow" cx="50%" cy="35%" r="55%">
                    <stop offset="0%" stop-color="rgba(255,255,255,0.7)" />
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
            <text x="90" y="664" fill="rgba(255,255,255,0.82)" font-size="28" font-family="Arial, sans-serif">AyoYok live experiences</text>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const EVENTS = [
    {
        id: 'evt-101',
        title: 'Moonlight Rooftop Sessions',
        category: 'Music',
        date: '2026-05-02T19:30:00',
        location: 'Senayan Rooftop, Jakarta',
        price: 180000,
        featured: true,
        joined: true,
        hostedByUser: false,
        host: 'AyoYok Music',
        attendees: 1240,
        highlight: 'Live DJ sets with skyline views',
        description:
            'An open-air rooftop concert with indie bands, sunset cocktails, and a curated social lounge for new connections.',
        perks: ['Digital ticket with QR entry', 'Welcome drink', 'Priority lounge access'],
        image: makeEventImage('Moonlight Rooftop', '#7c3aed', '#ec4899', '♪'),
    },
    {
        id: 'evt-102',
        title: 'Startup Storytelling Sprint',
        category: 'Seminar',
        date: '2026-05-05T18:00:00',
        location: 'Kuningan Commons, Jakarta',
        price: 85000,
        featured: true,
        joined: false,
        hostedByUser: true,
        host: 'You and Product Circle',
        attendees: 320,
        highlight: 'Pitch decks, growth stories, and networking',
        description:
            'A fast-paced evening for founders, marketers, and creators who want sharper storytelling for launches, demos, and community building.',
        perks: ['Speaker notes pack', 'Networking session', 'After-event discussion room'],
        image: makeEventImage('Storytelling Sprint', '#0ea5e9', '#22d3ee', '◎'),
    },
    {
        id: 'evt-103',
        title: 'Sunrise Fun Run Collective',
        category: 'Sports',
        date: '2026-04-30T06:15:00',
        location: 'GBK Loop, Jakarta',
        price: 0,
        featured: false,
        joined: true,
        hostedByUser: false,
        host: 'Stride Club',
        attendees: 540,
        highlight: 'Free morning social run with recovery snacks',
        description:
            'Start the day with a community-paced 5K run, a stretch circle, and a casual post-run meetup for runners of all levels.',
        perks: ['Free entry', 'Hydration station', 'Community badge'],
        image: makeEventImage('Sunrise Fun Run', '#10b981', '#14b8a6', '△'),
    },
    {
        id: 'evt-104',
        title: 'Clay and Coffee Studio Night',
        category: 'Arts',
        date: '2026-05-08T17:30:00',
        location: 'Kemang Atelier, Jakarta',
        price: 150000,
        featured: true,
        joined: false,
        hostedByUser: false,
        host: 'Studio Pagi',
        attendees: 88,
        highlight: 'Wheel throwing, music, and slow coffee',
        description:
            'Create your own ceramic cup while a local barista serves rotating brews and a jazz duo plays through the evening.',
        perks: ['All materials included', 'Kiln firing', 'Coffee pairing'],
        image: makeEventImage('Clay and Coffee', '#8b5cf6', '#6366f1', '✦'),
    },
    {
        id: 'evt-105',
        title: 'Street Food Passport Night',
        category: 'Food',
        date: '2026-05-10T18:30:00',
        location: 'Pantai Indah Kapuk Market',
        price: 45000,
        featured: false,
        joined: false,
        hostedByUser: false,
        host: 'AyoYok Eats',
        attendees: 760,
        highlight: 'Tasting trail across 12 local stalls',
        description:
            'A guided social tasting route with chef recommendations, creator meetups, and a live ranking board for favorite bites.',
        perks: ['Tasting passport', 'Exclusive discount stalls', 'Shareable foodie badge'],
        image: makeEventImage('Food Passport', '#f59e0b', '#f97316', '◌'),
    },
    {
        id: 'evt-106',
        title: 'Community Garden Sunday',
        category: 'Community',
        date: '2026-05-03T09:00:00',
        location: 'Tebet Eco Park, Jakarta',
        price: 0,
        featured: false,
        joined: false,
        hostedByUser: true,
        host: 'You and Urban Roots',
        attendees: 112,
        highlight: 'Planting session and brunch picnic',
        description:
            'A relaxed community meetup to plant herbs, exchange seeds, and turn a public green space into a social Sunday ritual.',
        perks: ['Free entry', 'Starter seed kit', 'Volunteer certificate'],
        image: makeEventImage('Garden Sunday', '#fb7185', '#f43f5e', '◍'),
    },
    {
        id: 'evt-107',
        title: 'Beach Volley Social Cup',
        category: 'Sports',
        date: '2026-05-14T16:00:00',
        location: 'Ancol Sand Court, Jakarta',
        price: 95000,
        featured: false,
        joined: false,
        hostedByUser: false,
        host: 'Volley Wave',
        attendees: 196,
        highlight: 'Mixed teams, warmup drills, and sunset finals',
        description:
            'A casual social tournament with beginner-friendly brackets, coaching stations, and a post-match beach hangout.',
        perks: ['Court access', 'Team placement', 'Locker area'],
        image: makeEventImage('Volley Social Cup', '#22c55e', '#06b6d4', '△'),
    },
    {
        id: 'evt-108',
        title: 'Creator Circle Demo Night',
        category: 'Seminar',
        date: '2026-05-12T19:00:00',
        location: 'Thamrin Lab, Jakarta',
        price: 65000,
        featured: true,
        joined: false,
        hostedByUser: false,
        host: 'Creator Circle',
        attendees: 410,
        highlight: 'New product demos and feedback sessions',
        description:
            'Creators and indie builders gather to demo what they are shipping, collect feedback, and meet future collaborators.',
        perks: ['Demo floor access', 'Feedback cards', 'After-hours mixer'],
        image: makeEventImage('Demo Night', '#38bdf8', '#3b82f6', '◎'),
    },
    {
        id: 'evt-109',
        title: 'City Soundwave Festival',
        category: 'Music',
        date: '2026-05-20T18:30:00',
        location: 'ICE BSD Open Ground',
        price: 250000,
        featured: true,
        joined: false,
        hostedByUser: false,
        host: 'Soundwave Asia',
        attendees: 5200,
        highlight: 'Multi-stage music festival with creator village',
        description:
            'A large-scale city festival mixing breakout artists, immersive installations, and community meetups throughout the night.',
        perks: ['Festival wristband', 'Access to creator village', 'Night shuttle pass'],
        image: makeEventImage('City Soundwave', '#ec4899', '#f97316', '♪'),
    },
    {
        id: 'evt-110',
        title: 'Indie Film Rooftop Premiere',
        category: 'Arts',
        date: '2026-05-18T20:00:00',
        location: 'SCBD Skyline Deck',
        price: 120000,
        featured: false,
        joined: true,
        hostedByUser: false,
        host: 'Screen Social',
        attendees: 276,
        highlight: 'Film screening followed by cast Q and A',
        description:
            'Watch a new independent release under the stars, then stay for a live conversation with the director, cast, and audience.',
        perks: ['Reserved screening seat', 'Q and A access', 'Digital poster'],
        image: makeEventImage('Film Premiere', '#6366f1', '#8b5cf6', '✦'),
    },
];

const CATEGORY_OPTIONS = ['All', ...new Set(EVENTS.map((event) => event.category))];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function formatEventDate(dateString) {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(dateString));
}

function formatDateChip(dateString) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
    }).format(new Date(dateString));
}

function formatPrice(price) {
    if (price === 0) {
        return 'Free';
    }

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(price);
}

function compareEventDates(left, right) {
    return new Date(left.date) - new Date(right.date);
}

function getInitials(name) {
    return name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

function isSameMonth(dateA, dateB) {
    return dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth();
}

function matchesDateFilter(dateString, filter) {
    if (filter === 'All Dates') {
        return true;
    }

    const eventDate = new Date(dateString);

    if (filter === 'This Week') {
        const weekEnd = new Date(BASE_DATE);
        weekEnd.setDate(BASE_DATE.getDate() + 7);
        return eventDate >= BASE_DATE && eventDate <= weekEnd;
    }

    if (filter === 'This Month') {
        return isSameMonth(eventDate, BASE_DATE);
    }

    if (filter === 'Next Month') {
        const nextMonth = new Date(BASE_DATE.getFullYear(), BASE_DATE.getMonth() + 1, 1);
        return isSameMonth(eventDate, nextMonth);
    }

    return true;
}

function Icon({ name, className = 'h-5 w-5' }) {
    switch (name) {
        case 'search':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="11" cy="11" r="6.5" />
                    <path d="M16 16l4.5 4.5" />
                </svg>
            );
        case 'calendar':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" />
                    <path d="M7.5 3.5v4M16.5 3.5v4M3.5 9.5h17" />
                </svg>
            );
        case 'map':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 20s6-5.27 6-10a6 6 0 10-12 0c0 4.73 6 10 6 10z" />
                    <circle cx="12" cy="10" r="2.5" />
                </svg>
            );
        case 'ticket':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 7.5A2.5 2.5 0 017.5 5H17a2 2 0 002 2 2 2 0 002 2v6a2 2 0 00-2 2 2 2 0 00-2 2H7.5A2.5 2.5 0 015 18.5V7.5z" />
                    <path d="M9.5 8v8M14.5 8v8" strokeDasharray="2.5 2.5" />
                </svg>
            );
        case 'people':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M16.5 19a4.5 4.5 0 00-9 0" />
                    <circle cx="12" cy="9" r="3.25" />
                    <path d="M19.5 18a3.5 3.5 0 00-2.5-3.35" />
                    <path d="M17.25 5.8a3 3 0 010 5.4" />
                </svg>
            );
        case 'spark':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
                    <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
                </svg>
            );
        case 'arrow':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                </svg>
            );
        case 'back':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M19 12H5" />
                    <path d="M11 6l-6 6 6 6" />
                </svg>
            );
        default:
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="8.5" />
                </svg>
            );
    }
}

function TopNavigation({ userName, searchTerm, onSearchChange }) {
    return (
        <header className="panel sticky top-4 z-30 px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-950/20">
                        <Icon name="spark" className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="dashboard-display text-2xl font-bold text-slate-950">AyoYok</p>
                        <p className="text-sm text-slate-500">Discover events, meet people, collect moments.</p>
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-3 xl:max-w-3xl xl:flex-row xl:items-center xl:justify-end">
                    <div className="relative w-full xl:max-w-xl">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <Icon name="search" className="h-5 w-5" />
                        </span>
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) => onSearchChange(event.target.value)}
                            placeholder="Search events, artists, communities"
                            className="h-12 w-full rounded-full border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-3 xl:justify-end">
                        <nav className="hidden items-center gap-2 lg:flex">
                            <a href="#featured-events" className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
                                Featured
                            </a>
                            <a href="#upcoming-events" className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
                                Upcoming
                            </a>
                            <a href="#joined-events" className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
                                Joined
                            </a>
                        </nav>

                        <div className="flex items-center gap-3 rounded-full bg-slate-950 px-3 py-2 text-white shadow-lg shadow-slate-950/15">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
                                {getInitials(userName)}
                            </span>
                            <div className="pr-2">
                                <p className="text-sm font-semibold">{userName}</p>
                                <p className="text-xs text-slate-300">Ready to go out</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

function SectionHeading({ eyebrow, title, description, action }) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{eyebrow}</p>
                <h2 className="dashboard-display mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">{title}</h2>
                {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p> : null}
            </div>
            {action}
        </div>
    );
}

function CategoryCard({ category, count, active, onClick }) {
    const meta = CATEGORY_META[category];

    return (
        <button
            type="button"
            onClick={onClick}
            className={classNames(
                'panel group p-5 text-left transition hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-28px_rgba(15,23,42,0.45)]',
                active && 'ring-2 ring-fuchsia-300',
            )}
        >
            <div className="flex items-start justify-between gap-3">
                <span className={classNames('inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-bold text-white', meta.accent)}>
                    {meta.emoji}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{count} events</span>
            </div>
            <h3 className="dashboard-display mt-4 text-xl font-bold text-slate-950">{category}</h3>
            <p className="mt-2 text-sm text-slate-600">Fresh meetups, moments, and people around {category.toLowerCase()}.</p>
        </button>
    );
}

function FilterChip({ label, active, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={classNames(
                'rounded-full px-4 py-2 text-sm font-semibold transition',
                active
                    ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/15'
                    : 'bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50',
            )}
        >
            {label}
        </button>
    );
}

function EventCard({ event, joined, onOpen, onPrimaryAction }) {
    const categoryMeta = CATEGORY_META[event.category];

    return (
        <article className="panel overflow-hidden">
            <img src={event.image} alt={event.title} className="h-56 w-full object-cover" />
            <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                    <span className={classNames('rounded-full px-3 py-1 text-xs font-semibold', categoryMeta.soft)}>{event.category}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                        {event.attendees.toLocaleString()} going
                    </span>
                    {joined ? (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                            Joined
                        </span>
                    ) : null}
                </div>

                <h3 className="dashboard-display mt-4 text-2xl font-bold text-slate-950">{event.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{event.highlight}</p>

                <div className="mt-5 space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-3">
                        <span className="text-slate-400">
                            <Icon name="calendar" className="h-4 w-4" />
                        </span>
                        <span>{formatEventDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-slate-400">
                            <Icon name="map" className="h-4 w-4" />
                        </span>
                        <span>{event.location}</span>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Price</p>
                        <p className="mt-1 text-lg font-bold text-slate-950">{formatPrice(event.price)}</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onOpen}
                            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Details
                        </button>
                        <button
                            type="button"
                            onClick={onPrimaryAction}
                            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800"
                        >
                            {joined ? 'View Ticket' : event.price === 0 ? 'Join Event' : 'Buy Ticket'}
                            <Icon name="arrow" className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

function CompactEventItem({ event, badge, actionLabel, onOpen }) {
    return (
        <button
            type="button"
            onClick={onOpen}
            className="flex w-full items-start gap-4 rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg"
        >
            <img src={event.image} alt={event.title} className="h-20 w-20 rounded-2xl object-cover" />
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{badge}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{formatDateChip(event.date)}</span>
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-950">{event.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{event.location}</p>
                <p className="mt-3 text-sm font-semibold text-fuchsia-600">{actionLabel}</p>
            </div>
        </button>
    );
}

function EventDetailView({ event, joined, relatedEvents, onBack, onJoinOrBuy, onOpenRelated }) {
    const categoryMeta = CATEGORY_META[event.category];

    return (
        <div className="space-y-6">
            <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-200 transition hover:bg-slate-50"
            >
                <Icon name="back" className="h-4 w-4" />
                Back to events
            </button>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                <article className="panel overflow-hidden">
                    <img src={event.image} alt={event.title} className="h-80 w-full object-cover sm:h-[420px]" />
                    <div className="space-y-6 p-6 sm:p-8">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className={classNames('rounded-full px-3 py-1 text-xs font-semibold', categoryMeta.soft)}>{event.category}</span>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                Hosted by {event.host}
                            </span>
                            {joined ? (
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                                    Ticket added
                                </span>
                            ) : null}
                        </div>

                        <div>
                            <h1 className="dashboard-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{event.title}</h1>
                            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{event.description}</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-[24px] bg-slate-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Date and Time</p>
                                <p className="mt-3 text-sm font-semibold text-slate-950">{formatEventDate(event.date)}</p>
                            </div>
                            <div className="rounded-[24px] bg-slate-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Location</p>
                                <p className="mt-3 text-sm font-semibold text-slate-950">{event.location}</p>
                            </div>
                            <div className="rounded-[24px] bg-slate-50 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Attendees</p>
                                <p className="mt-3 text-sm font-semibold text-slate-950">{event.attendees.toLocaleString()} people</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">What you get</p>
                            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                {event.perks.map((perk) => (
                                    <div key={perk} className="rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-700">
                                        {perk}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </article>

                <aside className="space-y-6">
                    <div className="panel-dark p-6 xl:sticky xl:top-24">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Ticket</p>
                        <p className="dashboard-display mt-3 text-4xl font-bold text-white">{formatPrice(event.price)}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                            {event.price === 0
                                ? 'Reserve a free spot and get a digital pass instantly.'
                                : 'Secure your spot now and receive your QR ticket in the app.'}
                        </p>

                        <div className="mt-6 space-y-4 rounded-[24px] bg-white/6 p-4">
                            <div className="flex items-center gap-3 text-sm text-slate-200">
                                <Icon name="calendar" className="h-4 w-4" />
                                <span>{formatEventDate(event.date)}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-200">
                                <Icon name="map" className="h-4 w-4" />
                                <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-200">
                                <Icon name="people" className="h-4 w-4" />
                                <span>{event.attendees.toLocaleString()} people are in</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onJoinOrBuy}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-slate-100"
                        >
                            {joined ? 'Ticket Added' : event.price === 0 ? 'Join Event' : 'Buy Ticket'}
                            <Icon name="ticket" className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="panel p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Related events</p>
                        <div className="mt-4 space-y-3">
                            {relatedEvents.map((relatedEvent) => (
                                <CompactEventItem
                                    key={relatedEvent.id}
                                    event={relatedEvent}
                                    badge={relatedEvent.category}
                                    actionLabel={formatPrice(relatedEvent.price)}
                                    onOpen={() => onOpenRelated(relatedEvent.id)}
                                />
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function Dashboard({ userName }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [dateFilter, setDateFilter] = useState('All Dates');
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [joinedEventIds, setJoinedEventIds] = useState(EVENTS.filter((event) => event.joined).map((event) => event.id));
    const [flashMessage, setFlashMessage] = useState('');

    const sortedEvents = EVENTS.slice().sort(compareEventDates);
    const query = searchTerm.trim().toLowerCase();

    const filteredEvents = sortedEvents.filter((event) => {
        const matchesQuery = query === '' || event.title.toLowerCase().includes(query);
        const matchesCategory = categoryFilter === 'All' || event.category === categoryFilter;
        const matchesDate = matchesDateFilter(event.date, dateFilter);

        return matchesQuery && matchesCategory && matchesDate;
    });

    const featuredEvents = filteredEvents.filter((event) => event.featured);
    const upcomingEvents = filteredEvents;
    const heroEvent = featuredEvents[0] || sortedEvents[0];
    const selectedEvent = selectedEventId ? EVENTS.find((event) => event.id === selectedEventId) : null;
    const joinedEvents = sortedEvents.filter((event) => joinedEventIds.includes(event.id));
    const myEvents = sortedEvents.filter((event) => event.hostedByUser);

    function openEvent(eventId) {
        setSelectedEventId(eventId);

        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function closeEvent() {
        setSelectedEventId(null);
        setFlashMessage('');

        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function joinEvent(event) {
        if (!joinedEventIds.includes(event.id)) {
            setJoinedEventIds((currentIds) => [...currentIds, event.id]);
            setFlashMessage(`${event.title} is now in your joined events.`);
        } else {
            setFlashMessage(`Your ticket for ${event.title} is already ready.`);
        }
    }

    function handlePrimaryAction(event) {
        if (joinedEventIds.includes(event.id)) {
            openEvent(event.id);
            return;
        }

        if (event.price === 0) {
            joinEvent(event);
            openEvent(event.id);
            return;
        }

        openEvent(event.id);
    }

    const relatedEvents = selectedEvent
        ? sortedEvents.filter((event) => event.category === selectedEvent.category && event.id !== selectedEvent.id).slice(0, 3)
        : [];

    return (
        <div className="dashboard-shell min-h-screen">
            <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 sm:py-6">
                <TopNavigation userName={userName} searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                {flashMessage ? (
                    <div className="mt-4 flex items-center justify-between gap-4 rounded-[24px] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
                        <span>{flashMessage}</span>
                        <button type="button" onClick={() => setFlashMessage('')} className="text-emerald-700 transition hover:text-emerald-900">
                            Dismiss
                        </button>
                    </div>
                ) : null}

                <main className="mt-6 space-y-6">
                    {selectedEvent ? (
                        <EventDetailView
                            event={selectedEvent}
                            joined={joinedEventIds.includes(selectedEvent.id)}
                            relatedEvents={relatedEvents}
                            onBack={closeEvent}
                            onJoinOrBuy={() => joinEvent(selectedEvent)}
                            onOpenRelated={openEvent}
                        />
                    ) : (
                        <>
                            <section className="panel-dark overflow-hidden p-6 sm:p-8">
                                <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_380px] xl:items-center">
                                    <div>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                                                Event Discovery
                                            </span>
                                            <span className="rounded-full bg-fuchsia-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-100">
                                                Social platform
                                            </span>
                                        </div>
                                        <h1 className="dashboard-display mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                            Find events worth leaving home for, then meet the right people there.
                                        </h1>
                                        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                                            AyoYok brings together concerts, seminars, sports, food pop-ups, and local communities in one
                                            personalized event feed.
                                        </p>

                                        <div className="mt-6 flex flex-wrap gap-3">
                                            <a
                                                href="#upcoming-events"
                                                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-slate-100"
                                            >
                                                Explore events
                                                <Icon name="arrow" className="h-4 w-4" />
                                            </a>
                                            <a
                                                href="#joined-events"
                                                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                                            >
                                                Joined events
                                                <Icon name="ticket" className="h-4 w-4" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="rounded-[32px] border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                                        <img src={heroEvent.image} alt={heroEvent.title} className="h-52 w-full rounded-[24px] object-cover" />
                                        <div className="mt-5">
                                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">Spotlight tonight</p>
                                            <h2 className="dashboard-display mt-3 text-2xl font-bold text-white">{heroEvent.title}</h2>
                                            <p className="mt-2 text-sm leading-6 text-slate-300">{heroEvent.highlight}</p>
                                            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                                <div className="rounded-[20px] bg-white/6 p-4">
                                                    <p className="text-slate-400">Date</p>
                                                    <p className="mt-2 font-semibold text-white">{formatDateChip(heroEvent.date)}</p>
                                                </div>
                                                <div className="rounded-[20px] bg-white/6 p-4">
                                                    <p className="text-slate-400">Price</p>
                                                    <p className="mt-2 font-semibold text-white">{formatPrice(heroEvent.price)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                                <div className="space-y-6">
                                    <section className="space-y-4">
                                        <SectionHeading
                                            eyebrow="Categories"
                                            title="Browse by vibe"
                                            description="Jump straight into the scenes that match how you want to spend your week."
                                        />
                                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                            {CATEGORY_OPTIONS.filter((category) => category !== 'All').map((category) => (
                                                <CategoryCard
                                                    key={category}
                                                    category={category}
                                                    count={EVENTS.filter((event) => event.category === category).length}
                                                    active={categoryFilter === category}
                                                    onClick={() => setCategoryFilter(category)}
                                                />
                                            ))}
                                        </div>
                                    </section>

                                    <section className="panel p-6 sm:p-7">
                                        <SectionHeading
                                            eyebrow="Search and Filter"
                                            title="Refine your event feed"
                                            description="Use categories and date ranges to narrow the feed without leaving the discovery page."
                                            action={
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSearchTerm('');
                                                        setCategoryFilter('All');
                                                        setDateFilter('All Dates');
                                                    }}
                                                    className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800"
                                                >
                                                    Reset
                                                </button>
                                            }
                                        />

                                        <div className="mt-6 space-y-5">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Category</p>
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {CATEGORY_OPTIONS.map((category) => (
                                                        <FilterChip
                                                            key={category}
                                                            label={category}
                                                            active={categoryFilter === category}
                                                            onClick={() => setCategoryFilter(category)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Date</p>
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {DATE_FILTERS.map((filter) => (
                                                        <FilterChip
                                                            key={filter}
                                                            label={filter}
                                                            active={dateFilter === filter}
                                                            onClick={() => setDateFilter(filter)}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
                                                Showing <span className="font-semibold text-slate-950">{filteredEvents.length}</span> events for{' '}
                                                <span className="font-semibold text-slate-950">{searchTerm || 'all searches'}</span>.
                                            </div>
                                        </div>
                                    </section>

                                    <section id="featured-events" className="space-y-4">
                                        <SectionHeading
                                            eyebrow="Featured Events"
                                            title="Crowd favorites this week"
                                            description="Handpicked social moments with strong turnout and standout hosts."
                                        />
                                        <div className="grid gap-4 lg:grid-cols-2">
                                            {featuredEvents.length === 0 ? (
                                                <div className="panel p-8 text-center text-sm text-slate-500">No featured events match the current filters.</div>
                                            ) : (
                                                featuredEvents.map((event) => (
                                                    <EventCard
                                                        key={event.id}
                                                        event={event}
                                                        joined={joinedEventIds.includes(event.id)}
                                                        onOpen={() => openEvent(event.id)}
                                                        onPrimaryAction={() => handlePrimaryAction(event)}
                                                    />
                                                ))
                                            )}
                                        </div>
                                    </section>

                                    <section id="upcoming-events" className="space-y-4">
                                        <SectionHeading
                                            eyebrow="Upcoming Events"
                                            title="Your live feed of what is next"
                                            description="Fresh listings across music, sports, seminars, and local community gatherings."
                                        />
                                        <div className="grid gap-4 lg:grid-cols-2">
                                            {upcomingEvents.length === 0 ? (
                                                <div className="panel p-8 text-center text-sm text-slate-500">No upcoming events match the current filters.</div>
                                            ) : (
                                                upcomingEvents.map((event) => (
                                                    <EventCard
                                                        key={event.id}
                                                        event={event}
                                                        joined={joinedEventIds.includes(event.id)}
                                                        onOpen={() => openEvent(event.id)}
                                                        onPrimaryAction={() => handlePrimaryAction(event)}
                                                    />
                                                ))
                                            )}
                                        </div>
                                    </section>
                                </div>

                                <aside className="space-y-6">
                                    <section className="panel-dark p-6">
                                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Your event pulse</p>
                                        <h2 className="dashboard-display mt-3 text-2xl font-bold text-white">Ready for the week</h2>
                                        <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                                            <div className="rounded-[20px] bg-white/8 p-4">
                                                <p className="text-slate-400">Joined</p>
                                                <p className="mt-2 text-xl font-bold text-white">{joinedEvents.length}</p>
                                            </div>
                                            <div className="rounded-[20px] bg-white/8 p-4">
                                                <p className="text-slate-400">Hosting</p>
                                                <p className="mt-2 text-xl font-bold text-white">{myEvents.length}</p>
                                            </div>
                                            <div className="rounded-[20px] bg-white/8 p-4">
                                                <p className="text-slate-400">Featured</p>
                                                <p className="mt-2 text-xl font-bold text-white">{EVENTS.filter((event) => event.featured).length}</p>
                                            </div>
                                        </div>
                                    </section>

                                    <section id="my-events" className="panel p-6">
                                        <SectionHeading eyebrow="My Events" title="Events you are hosting" />
                                        <div className="mt-5 space-y-3">
                                            {myEvents.map((event) => (
                                                <CompactEventItem
                                                    key={event.id}
                                                    event={event}
                                                    badge="Hosting"
                                                    actionLabel={`${event.attendees.toLocaleString()} guests interested`}
                                                    onOpen={() => openEvent(event.id)}
                                                />
                                            ))}
                                        </div>
                                    </section>

                                    <section id="joined-events" className="panel p-6">
                                        <SectionHeading eyebrow="Joined Events" title="Tickets already in your pocket" />
                                        <div className="mt-5 space-y-3">
                                            {joinedEvents.map((event) => (
                                                <CompactEventItem
                                                    key={event.id}
                                                    event={event}
                                                    badge={event.price === 0 ? 'RSVP confirmed' : 'Ticket paid'}
                                                    actionLabel={formatEventDate(event.date)}
                                                    onOpen={() => openEvent(event.id)}
                                                />
                                            ))}
                                        </div>
                                    </section>
                                </aside>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}

const mountNode = document.getElementById('ayoyok-event-root');

if (mountNode) {
    createRoot(mountNode).render(
        <StrictMode>
            <Dashboard userName={mountNode.dataset.userName || 'AyoYok User'} />
        </StrictMode>,
    );
}
