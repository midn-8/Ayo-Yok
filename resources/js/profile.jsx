import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

const { StrictMode, useState } = React;

const BASE_DATE = new Date('2026-04-29T00:00:00');

const CATEGORY_META = {
    Music: {
        emoji: '♪',
        soft: 'bg-fuchsia-100 text-fuchsia-700 ring-1 ring-inset ring-fuchsia-200',
    },
    Seminar: {
        emoji: '◎',
        soft: 'bg-sky-100 text-sky-700 ring-1 ring-inset ring-sky-200',
    },
    Sports: {
        emoji: '△',
        soft: 'bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200',
    },
    Food: {
        emoji: '◌',
        soft: 'bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-200',
    },
    Arts: {
        emoji: '✦',
        soft: 'bg-violet-100 text-violet-700 ring-1 ring-inset ring-violet-200',
    },
    Community: {
        emoji: '◍',
        soft: 'bg-rose-100 text-rose-700 ring-1 ring-inset ring-rose-200',
    },
};

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function getInitials(name) {
    return name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

function sanitizeSvgText(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

function makeEventImage(title, accentA, accentB, glyph) {
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
            <text x="90" y="664" fill="rgba(255,255,255,0.82)" font-size="28" font-family="Arial, sans-serif">AyoYok social events</text>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function makeAvatarImage(name) {
    const safeName = sanitizeSvgText(name);
    const initials = getInitials(name);
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
            <defs>
                <linearGradient id="avatar-bg" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stop-color="#fb923c" />
                    <stop offset="100%" stop-color="#d946ef" />
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

function formatEventDate(dateString) {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(dateString));
}

function formatShortDate(dateString) {
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

function isUpcomingEvent(event) {
    return new Date(event.date) >= BASE_DATE;
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
        case 'spark':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
                    <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
                </svg>
            );
        case 'user':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="8.75" r="3.25" />
                    <path d="M5 19a7 7 0 0114 0" />
                </svg>
            );
        case 'edit':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 20h4.5L19 9.5a2.12 2.12 0 10-3-3L5.5 17H4v3z" />
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
    const navLinkClass = 'rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100';

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
                            placeholder="Search your events, cities, or communities"
                            className="h-12 w-full rounded-full border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-3 xl:justify-end">
                        <nav className="hidden items-center gap-2 lg:flex">
                            <a href="/dashboard" className={navLinkClass}>
                                Dashboard
                            </a>
                            <a href="#profile-events" className={navLinkClass}>
                                My Events
                            </a>
                            <a href="#profile-edit" className={navLinkClass}>
                                Edit Profile
                            </a>
                            <a
                                href="/profile"
                                aria-current="page"
                                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/15"
                            >
                                Profile
                            </a>
                        </nav>

                        <a href="/profile" className="flex items-center gap-3 rounded-full bg-slate-950 px-3 py-2 text-white shadow-lg shadow-slate-950/15">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
                                {getInitials(userName)}
                            </span>
                            <div className="pr-2">
                                <p className="text-sm font-semibold">{userName}</p>
                                <p className="text-xs text-slate-300">Your event identity</p>
                            </div>
                        </a>
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

function StatCard({ label, value, note }) {
    return (
        <article className="panel p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{label}</p>
            <p className="dashboard-display mt-4 text-4xl font-bold text-slate-950">{value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{note}</p>
        </article>
    );
}

function TabButton({ label, count, active, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={classNames(
                'rounded-full px-4 py-2 text-sm font-semibold transition',
                active
                    ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/15'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
            )}
        >
            {label} <span className={classNames('ml-2 rounded-full px-2 py-0.5 text-xs', active ? 'bg-white/12 text-white' : 'bg-white text-slate-500')}>{count}</span>
        </button>
    );
}

function ProfileEventCard({ event, onAction }) {
    const meta = CATEGORY_META[event.category];
    const statusLabel = event.hostedByUser ? 'Hosting' : event.joined ? 'Joined' : 'Saved';

    return (
        <article className="panel overflow-hidden">
            <img src={event.image} alt={event.title} className="h-56 w-full object-cover" />
            <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                    <span className={classNames('rounded-full px-3 py-1 text-xs font-semibold', meta.soft)}>{event.category}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">{statusLabel}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">{event.ticketLabel}</span>
                </div>

                <h3 className="dashboard-display mt-4 text-2xl font-bold text-slate-950">{event.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{event.highlight}</p>

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
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Ticket</p>
                        <p className="mt-1 text-lg font-bold text-slate-950">{formatPrice(event.price)}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => onAction(event)}
                        className={classNames(
                            'inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition',
                            event.joined || event.hostedByUser
                                ? 'bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200 hover:bg-emerald-200'
                                : 'bg-slate-950 text-white shadow-lg shadow-slate-950/15 hover:bg-slate-800',
                        )}
                    >
                        {event.joined || event.hostedByUser ? 'Joined' : 'View'}
                    </button>
                </div>
            </div>
        </article>
    );
}

const PROFILE_EVENTS = [
    {
        id: 'prf-201',
        title: 'Rooftop Jazz Circle',
        category: 'Music',
        date: '2026-05-03T19:00:00',
        location: 'Senayan Skyline Terrace, Jakarta',
        price: 175000,
        joined: true,
        saved: false,
        hostedByUser: false,
        ticketLabel: 'Paid ticket',
        highlight: 'Golden-hour live set, social tables, and late-night city views.',
        image: makeEventImage('Rooftop Jazz Circle', '#7c3aed', '#ec4899', '♪'),
    },
    {
        id: 'prf-202',
        title: 'Saturday Design Walk',
        category: 'Arts',
        date: '2026-05-11T09:30:00',
        location: 'Kota Tua Creative District',
        price: 0,
        joined: true,
        saved: false,
        hostedByUser: true,
        ticketLabel: 'Host badge',
        highlight: 'Gallery hopping, coffee stops, and an easy social route through the city.',
        image: makeEventImage('Design Walk', '#8b5cf6', '#6366f1', '✦'),
    },
    {
        id: 'prf-203',
        title: 'Startup Mixer After Hours',
        category: 'Seminar',
        date: '2026-04-18T19:30:00',
        location: 'Mega Kuningan Commons',
        price: 65000,
        joined: true,
        saved: false,
        hostedByUser: false,
        ticketLabel: 'Paid ticket',
        highlight: 'Founder stories, demo tables, and a relaxed networking lounge.',
        image: makeEventImage('Startup Mixer', '#0ea5e9', '#22d3ee', '◎'),
    },
    {
        id: 'prf-204',
        title: 'Community Garden Brunch',
        category: 'Community',
        date: '2026-04-12T08:00:00',
        location: 'Tebet Eco Park',
        price: 0,
        joined: true,
        saved: false,
        hostedByUser: false,
        ticketLabel: 'RSVP confirmed',
        highlight: 'Planting session, brunch picnic, and a seed-swap corner.',
        image: makeEventImage('Garden Brunch', '#fb7185', '#f43f5e', '◍'),
    },
    {
        id: 'prf-205',
        title: 'Midnight Street Food Run',
        category: 'Food',
        date: '2026-05-16T20:00:00',
        location: 'Pantai Indah Kapuk',
        price: 95000,
        joined: false,
        saved: true,
        hostedByUser: false,
        ticketLabel: 'Saved idea',
        highlight: 'A curated tasting trail across favorite late-night stalls.',
        image: makeEventImage('Street Food Run', '#f59e0b', '#f97316', '◌'),
    },
    {
        id: 'prf-206',
        title: 'Sunrise Paddle Session',
        category: 'Sports',
        date: '2026-05-21T06:00:00',
        location: 'Ancol Beach Club',
        price: 120000,
        joined: false,
        saved: true,
        hostedByUser: false,
        ticketLabel: 'Saved idea',
        highlight: 'Beginner-friendly coaching, beach coffee, and a sunrise session.',
        image: makeEventImage('Paddle Session', '#22c55e', '#06b6d4', '△'),
    },
    {
        id: 'prf-207',
        title: 'City Soundwave Festival',
        category: 'Music',
        date: '2026-06-02T18:30:00',
        location: 'ICE BSD Open Ground',
        price: 250000,
        joined: true,
        saved: false,
        hostedByUser: false,
        ticketLabel: 'Paid ticket',
        highlight: 'Large-scale festival energy with creator booths and community meetups.',
        image: makeEventImage('City Soundwave', '#ec4899', '#f97316', '♪'),
    },
];

function ProfilePage({ initialProfile }) {
    const [profile, setProfile] = useState(initialProfile);
    const [draftProfile, setDraftProfile] = useState(initialProfile);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedImageName, setSelectedImageName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('My Events');
    const [flashMessage, setFlashMessage] = useState('');

    const joinedEvents = PROFILE_EVENTS.filter((event) => event.joined).sort(compareEventDates);
    const upcomingEvents = joinedEvents.filter(isUpcomingEvent);
    const pastEvents = joinedEvents
        .filter((event) => !isUpcomingEvent(event))
        .sort((left, right) => new Date(right.date) - new Date(left.date));
    const savedEvents = PROFILE_EVENTS.filter((event) => event.saved).sort(compareEventDates);
    const hostedEvents = PROFILE_EVENTS.filter((event) => event.hostedByUser);
    const ticketsPurchased = joinedEvents.filter((event) => event.price > 0);
    const nextUpcomingEvent = upcomingEvents[0] || savedEvents[0] || PROFILE_EVENTS[0];

    const tabs = [
        { label: 'My Events', events: joinedEvents },
        { label: 'Upcoming Events', events: upcomingEvents },
        { label: 'Past Events', events: pastEvents },
        { label: 'Saved Events', events: savedEvents },
    ];

    const query = searchTerm.trim().toLowerCase();
    const currentTab = tabs.find((tab) => tab.label === activeTab) || tabs[0];
    const visibleEvents = currentTab.events.filter((event) => {
        if (query === '') {
            return true;
        }

        return [event.title, event.location, event.category].some((value) => value.toLowerCase().includes(query));
    });

    function openEditor() {
        setDraftProfile(profile);
        setSelectedImageName('');
        setIsEditing(true);

        if (typeof window !== 'undefined') {
            window.setTimeout(() => {
                document.getElementById('profile-edit')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        }
    }

    function cancelEditing() {
        setDraftProfile(profile);
        setSelectedImageName('');
        setIsEditing(false);
    }

    function handleSaveProfile(event) {
        event.preventDefault();
        setProfile(draftProfile);
        setIsEditing(false);
        setFlashMessage('Profile details updated locally for the current demo session.');
    }

    function handleEventAction(event) {
        if (event.joined || event.hostedByUser) {
            setFlashMessage(`${event.title} is already on your event profile.`);
            return;
        }

        setFlashMessage(`${event.title} is saved. You can connect this button to a detail page or ticket flow next.`);
    }

    return (
        <div className="dashboard-shell min-h-screen">
            <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 sm:py-6">
                <TopNavigation userName={profile.name} searchTerm={searchTerm} onSearchChange={setSearchTerm} />

                {flashMessage ? (
                    <div className="mt-4 flex items-center justify-between gap-4 rounded-[24px] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
                        <span>{flashMessage}</span>
                        <button type="button" onClick={() => setFlashMessage('')} className="text-emerald-700 transition hover:text-emerald-900">
                            Dismiss
                        </button>
                    </div>
                ) : null}

                <main className="mt-6 space-y-6">
                    <section id="profile-overview" className="panel-dark relative overflow-hidden p-6 sm:p-8">
                        <div className="absolute inset-0 panel-grid opacity-10" />
                        <div className="absolute -left-12 top-8 h-36 w-36 rounded-full bg-orange-400/18 blur-3xl" />
                        <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-fuchsia-400/14 blur-3xl" />

                        <div className="relative flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                <img
                                    src={makeAvatarImage(profile.name)}
                                    alt={profile.name}
                                    className="h-28 w-28 rounded-[32px] border border-white/15 object-cover shadow-lg shadow-slate-950/25"
                                />

                                <div className="max-w-2xl">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                                            Profile
                                        </span>
                                        <span className="rounded-full bg-fuchsia-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-100">
                                            {profile.username}
                                        </span>
                                    </div>
                                    <h1 className="dashboard-display mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">{profile.name}</h1>
                                    <p className="mt-3 text-base font-medium text-slate-200">{profile.email}</p>
                                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{profile.bio}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 xl:items-end">
                                <button
                                    type="button"
                                    onClick={openEditor}
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-slate-100"
                                >
                                    <Icon name="edit" className="h-4 w-4" />
                                    Edit Profile
                                </button>
                                <div className="grid w-full gap-3 sm:grid-cols-2 xl:w-[320px] xl:grid-cols-1">
                                    <div className="rounded-[24px] bg-white/8 px-4 py-4">
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Next event</p>
                                        <p className="mt-2 text-sm font-semibold text-white">{nextUpcomingEvent.title}</p>
                                        <p className="mt-1 text-sm text-slate-300">{formatShortDate(nextUpcomingEvent.date)}</p>
                                    </div>
                                    <div className="rounded-[24px] bg-white/8 px-4 py-4">
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Social pulse</p>
                                        <p className="mt-2 text-sm font-semibold text-white">{joinedEvents.length} active event memories in one place.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-4 md:grid-cols-3">
                        <StatCard
                            label="Events Joined"
                            value={joinedEvents.length}
                            note="Your current profile footprint across concerts, communities, and meetups."
                        />
                        <StatCard
                            label="Events Hosted"
                            value={hostedEvents.length}
                            note="A future-ready slot for creator activity and hosted gatherings."
                        />
                        <StatCard
                            label="Tickets Purchased"
                            value={ticketsPurchased.length}
                            note="Paid experiences already locked in and ready for the next weekend."
                        />
                    </section>

                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                        <section id="profile-events" className="panel p-6 sm:p-7">
                            <SectionHeading
                                eyebrow="Your Event Archive"
                                title={activeTab}
                                description="Browse the events tied to your social identity, from future plans to past check-ins."
                            />

                            <div className="mt-6 flex flex-wrap gap-2">
                                {tabs.map((tab) => (
                                    <TabButton
                                        key={tab.label}
                                        label={tab.label}
                                        count={tab.events.length}
                                        active={activeTab === tab.label}
                                        onClick={() => setActiveTab(tab.label)}
                                    />
                                ))}
                            </div>

                            <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
                                Showing <span className="font-semibold text-slate-950">{visibleEvents.length}</span> events in{' '}
                                <span className="font-semibold text-slate-950">{activeTab}</span> for{' '}
                                <span className="font-semibold text-slate-950">{searchTerm || 'all searches'}</span>.
                            </div>

                            <div className="mt-6 grid gap-4 lg:grid-cols-2">
                                {visibleEvents.length === 0 ? (
                                    <div className="panel-grid rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                                        <p className="dashboard-display text-2xl font-bold text-slate-950">Nothing matches that search yet.</p>
                                        <p className="mt-3 text-sm leading-6 text-slate-600">
                                            Try another keyword or switch tabs to see a different part of your event history.
                                        </p>
                                    </div>
                                ) : (
                                    visibleEvents.map((event) => <ProfileEventCard key={event.id} event={event} onAction={handleEventAction} />)
                                )}
                            </div>
                        </section>

                        <aside className="space-y-6">
                            <section className="panel-dark p-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Calendar spotlight</p>
                                <h2 className="dashboard-display mt-3 text-2xl font-bold text-white">{nextUpcomingEvent.title}</h2>
                                <div className="mt-5 overflow-hidden rounded-[24px]">
                                    <img src={nextUpcomingEvent.image} alt={nextUpcomingEvent.title} className="h-44 w-full object-cover" />
                                </div>
                                <div className="mt-5 space-y-3 rounded-[24px] bg-white/6 p-4 text-sm text-slate-200">
                                    <div className="flex items-center gap-3">
                                        <Icon name="calendar" className="h-4 w-4" />
                                        <span>{formatEventDate(nextUpcomingEvent.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Icon name="map" className="h-4 w-4" />
                                        <span>{nextUpcomingEvent.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Icon name="ticket" className="h-4 w-4" />
                                        <span>{nextUpcomingEvent.ticketLabel}</span>
                                    </div>
                                </div>
                            </section>

                            <section id="profile-edit" className="panel p-6">
                                <SectionHeading
                                    eyebrow="Edit Profile"
                                    title={isEditing ? 'Update your public card' : 'Keep your profile fresh'}
                                    description="Name, email, bio, and image upload UI are ready here without changing the auth flow."
                                    action={
                                        !isEditing ? (
                                            <button
                                                type="button"
                                                onClick={openEditor}
                                                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800"
                                            >
                                                Edit Profile
                                            </button>
                                        ) : null
                                    }
                                />

                                {isEditing ? (
                                    <form onSubmit={handleSaveProfile} className="mt-6 space-y-5">
                                        <label className="block">
                                            <span className="text-sm font-semibold text-slate-700">Name</span>
                                            <input
                                                type="text"
                                                value={draftProfile.name}
                                                onChange={(event) => setDraftProfile((current) => ({ ...current, name: event.target.value }))}
                                                className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100"
                                                required
                                            />
                                        </label>

                                        <label className="block">
                                            <span className="text-sm font-semibold text-slate-700">Email</span>
                                            <input
                                                type="email"
                                                value={draftProfile.email}
                                                onChange={(event) => setDraftProfile((current) => ({ ...current, email: event.target.value }))}
                                                className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100"
                                                required
                                            />
                                        </label>

                                        <label className="block">
                                            <span className="text-sm font-semibold text-slate-700">Bio</span>
                                            <textarea
                                                rows="5"
                                                value={draftProfile.bio}
                                                onChange={(event) => setDraftProfile((current) => ({ ...current, bio: event.target.value }))}
                                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100"
                                                placeholder="Tell people what kind of events you love and what communities you show up for."
                                            />
                                        </label>

                                        <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-4 py-5">
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-700">Profile image</p>
                                                    <p className="mt-1 text-sm text-slate-600">
                                                        {selectedImageName ? `Selected: ${selectedImageName}` : 'No image selected yet.'}
                                                    </p>
                                                </div>
                                                <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-inset ring-slate-200 transition hover:bg-slate-100">
                                                    Choose file
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="sr-only"
                                                        onChange={(event) => setSelectedImageName(event.target.files?.[0]?.name || '')}
                                                    />
                                                </label>
                                            </div>
                                            <p className="mt-3 text-xs leading-5 text-slate-500">
                                                Upload UI is included for now. Hook this field into storage when you are ready to persist avatars.
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            <button
                                                type="submit"
                                                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800"
                                            >
                                                Save Changes
                                            </button>
                                            <button
                                                type="button"
                                                onClick={cancelEditing}
                                                className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="mt-6 rounded-[24px] bg-slate-50 px-5 py-5 text-sm leading-6 text-slate-600">
                                        <div className="flex items-start gap-3">
                                            <span className="mt-0.5 text-slate-400">
                                                <Icon name="user" className="h-5 w-5" />
                                            </span>
                                            <div>
                                                <p className="font-semibold text-slate-950">Public profile summary</p>
                                                <p className="mt-2">{profile.bio}</p>
                                                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{profile.username}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </section>
                        </aside>
                    </div>
                </main>
            </div>
        </div>
    );
}

const mountNode = document.getElementById('ayoyok-profile-root');

if (mountNode) {
    const initialProfile = {
        name: mountNode.dataset.userName || 'AyoYok User',
        username: mountNode.dataset.userUsername || '@ayoyok-user',
        email: mountNode.dataset.userEmail || 'hello@ayoyok.app',
        bio: mountNode.dataset.userBio || 'Always chasing events with good energy, better playlists, and people worth meeting.',
    };

    createRoot(mountNode).render(
        <StrictMode>
            <ProfilePage initialProfile={initialProfile} />
        </StrictMode>,
    );
}
