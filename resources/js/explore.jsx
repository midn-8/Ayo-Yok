import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

import {
    CATEGORY_META,
    EVENTS,
    compareEventDates,
    getInitials,
} from './social-hub/mockData';
import { classNames, formatEventDate, formatPrice, Icon, FloatingCreateButton } from './social-hub/ui';

const { StrictMode, useEffect, useMemo, useState } = React;

const NAV_ITEMS = [
    { id: 'dashboard', label: 'Home', href: '/dashboard' },
    { id: 'explore', label: 'Explore', href: '/explore' },
    { id: 'schedule', label: 'Schedule', href: '/schedule' },
    { id: 'profile', label: 'Profile', href: '/profile' },
];

const CATEGORY_OPTIONS = ['All', ...new Set(EVENTS.map((event) => event.category))];
const INITIAL_VISIBLE_EVENTS = 6;
const LOAD_MORE_STEP = 6;

function MaterialIcon({ name, className = '' }) {
    return (
        <span aria-hidden="true" className={classNames('material-symbols-outlined leading-none', className)}>
            {name}
        </span>
    );
}

function FilterPill({ label, active, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={classNames(
                'rounded-full border px-4 py-2 text-sm font-semibold transition',
                active
                    ? 'border-[#5e50b0] bg-[#5e50b0] text-white shadow-[0_14px_30px_-18px_rgba(94,80,176,0.65)]'
                    : 'border-white/70 bg-white/70 text-[#484552] hover:border-[#c8bfff] hover:text-[#5e50b0]',
            )}
        >
            {label}
        </button>
    );
}

function formatMonthShort(dateString) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
    }).format(new Date(dateString));
}

function formatDayNumber(dateString) {
    return new Date(dateString).getDate();
}

function matchesEventQuery(event, query, categoryFilter) {
    const matchesQuery =
        query === '' ||
        [event.title, event.host, event.category, event.location, ...event.keywords].some((value) => value.toLowerCase().includes(query));
    const matchesCategory = categoryFilter === 'All' || event.category === categoryFilter;

    return matchesQuery && matchesCategory;
}

function ExploreNavigation({ userName, searchTerm, onSearchChange }) {
    const [isHeaderSearchFocused, setIsHeaderSearchFocused] = useState(false);
    const displayHandle = `@${String(userName || 'ayoyok-user').trim().toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/55 bg-[rgba(253,248,255,0.78)] backdrop-blur-md shadow-[0_12px_30px_-24px_rgba(94,80,176,0.35)]">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-4 lg:px-8">
                <div className="flex items-center gap-8">
                    <a href="/dashboard" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5e50b0] text-white shadow-[0_16px_28px_-18px_rgba(94,80,176,0.85)]">
                            <span className="editorial-display text-base font-bold">AY</span>
                        </div>
                        <div>
                            <p className="editorial-display text-[24px] font-bold tracking-[-0.02em] text-[#5e50b0]">AyoYok</p>
                            <p className="hidden text-xs text-[#797583] sm:block">Explore events worth showing up for.</p>
                        </div>
                    </a>

                    <nav className="hidden items-center gap-6 md:flex">
                        {NAV_ITEMS.map((item) => {
                            const isActive = item.id === 'explore';

                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={classNames(
                                        'text-sm font-semibold transition-colors',
                                        isActive
                                            ? 'border-b-2 border-[#5e50b0] pb-1 text-[#5e50b0]'
                                            : 'text-[#484552] hover:text-[#5e50b0]',
                                    )}
                                >
                                    {item.label}
                                </a>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <div
                        className={classNames(
                            'glass-card hidden items-center rounded-full border border-white/70 px-4 py-2 transition-all duration-200 lg:flex',
                            isHeaderSearchFocused ? 'w-80' : 'w-64',
                        )}
                    >
                        <MaterialIcon name="search" className="text-[#797583]" />
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) => onSearchChange(event.target.value)}
                            onFocus={() => setIsHeaderSearchFocused(true)}
                            onBlur={() => setIsHeaderSearchFocused(false)}
                            placeholder="Search events..."
                            className="ml-2 w-full border-none bg-transparent p-0 text-sm text-[#1c1b21] outline-none placeholder:text-[#797583]"
                        />
                    </div>

                    <button
                        type="button"
                        aria-label="Notifications"
                        className="rounded-full p-2 text-[#484552] transition hover:bg-white/80 hover:text-[#5e50b0]"
                    >
                        <MaterialIcon name="notifications" />
                    </button>
                    <button
                        type="button"
                        aria-label="Favorites"
                        className="rounded-full p-2 text-[#484552] transition hover:bg-white/80 hover:text-[#5e50b0]"
                    >
                        <MaterialIcon name="favorite" />
                    </button>
                    <a
                        href="/profile"
                        className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#c8bfff] bg-white text-sm font-bold text-[#5e50b0]"
                        title={`${userName} ${displayHandle}`}
                    >
                        {getInitials(userName)}
                    </a>
                </div>
            </div>
        </header>
    );
}

function EventCard({ event }) {
    const meta = CATEGORY_META[event.category];
    const eventDate = new Date(event.date);

    return (
        <article className="ambient-shadow ambient-shadow-hover overflow-hidden rounded-[28px] border border-white/70 bg-white/88 transition">
            <a href={`/events/${event.id}`} className="relative block h-64 overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 right-4 date-tile">
                    <span className="text-xl font-bold text-[#5e50b0]">{eventDate.getDate()}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#797583]">
                        {eventDate.toLocaleString('en-US', { month: 'short' })}
                    </span>
                </div>
                <div className="absolute bottom-4 left-4">
                    <span className={classNames('rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]', meta.soft)}>
                        {event.category}
                    </span>
                </div>
            </a>
            <div className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                    <span className={classNames('rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em]', meta.soft)}>{event.category}</span>
                    <span className="text-xs font-medium text-[#797583]">• {formatEventDate(event.date)}</span>
                </div>
                <a href={`/events/${event.id}`} className="transition-colors hover:text-[#5e50b0]">
                    <h3 className="editorial-display mt-4 text-[24px] font-semibold leading-[1.25] text-[#1c1b21]">{event.title}</h3>
                </a>
                <p className="mt-3 line-clamp-2 text-sm leading-7 text-[#484552]">{event.description}</p>

                <div className="mt-6 flex items-center justify-between border-t border-[#e5e1ea] pt-4">
                    <div className="flex items-center gap-2 text-sm text-[#484552]">
                        <MaterialIcon name="location_on" className="text-[18px] text-[#797583]" />
                        <span className="font-medium">{event.location}</span>
                    </div>
                    <span className="editorial-display text-xl font-bold text-[#5e50b0]">{formatPrice(event.price)}</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                    <a
                        href={`/events/${event.id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-[#c9c4d3] px-4 py-2 text-sm font-semibold text-[#484552] transition hover:border-[#5e50b0] hover:text-[#5e50b0]"
                    >
                        Open details
                        <Icon name="arrow" className="h-4 w-4" />
                    </a>
                    <a
                        href={event.price === 0 ? `/events/${event.id}` : `/payment/${event.id}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[#5e50b0] px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02] hover:shadow-[0_18px_36px_-24px_rgba(94,80,176,0.9)]"
                    >
                        {event.price === 0 ? 'Join Event' : 'Buy Ticket'}
                        <Icon name="ticket" className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </article>
    );
}

function EmptyState() {
    return (
        <div className="glass-card ambient-shadow rounded-[28px] border border-white/70 px-6 py-12 text-center md:col-span-2 xl:col-span-3">
            <h3 className="editorial-display text-2xl font-semibold text-[#1c1b21]">No events match that search.</h3>
            <p className="mt-3 text-sm leading-7 text-[#484552]">Try another keyword or switch the category filter to reveal more events.</p>
        </div>
    );
}

function ExplorePage({ userName, userUsername, userEmail }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_EVENTS);

    const sortedEvents = useMemo(() => EVENTS.slice().sort(compareEventDates), []);
    const query = searchTerm.trim().toLowerCase();

    const matchingEvents = useMemo(
        () => sortedEvents.filter((event) => matchesEventQuery(event, query, categoryFilter)),
        [sortedEvents, query, categoryFilter],
    );

    const visibleEvents = useMemo(() => matchingEvents.slice(0, visibleCount), [matchingEvents, visibleCount]);
    const hasMore = visibleCount < matchingEvents.length;

    useEffect(() => {
        document.title = 'AyoYok | Explore Events';
    }, []);

    useEffect(() => {
        setVisibleCount(INITIAL_VISIBLE_EVENTS);
    }, [searchTerm, categoryFilter]);

    return (
        <div
            className="editorial-shell editorial-copy min-h-screen bg-[#fdf8ff] pb-28 text-[#1c1b21] selection:bg-[#e5deff] selection:text-[#372687] md:pb-0"
            style={{ backgroundColor: '#fdf8ff' }}
        >
            <ExploreNavigation userName={userName} searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <main className="pt-24">
                {/* Hero Section */}
                <section className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-8">
                    <div className="text-center">
                        <span className="mb-4 inline-flex rounded-full bg-[#c1e9d5]/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#002116]">
                            Discover
                        </span>
                        <h1 className="editorial-display text-[42px] font-bold leading-[1.08] tracking-[-0.02em] text-[#1c1b21] sm:text-[54px]">
                            Discover what&apos;s happening.
                        </h1>
                        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#484552] sm:text-lg">
                            Hand-picked events and community gatherings curated for you.
                        </p>
                    </div>
                </section>

                {/* Filters */}
                <section className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-8">
                    <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 p-6 sm:p-8">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <h2 className="editorial-display text-[28px] font-semibold text-[#1c1b21]">Refine the vibe</h2>
                                <p className="mt-2 max-w-2xl text-sm leading-7 text-[#484552]">
                                    Filter by category to find the perfect events for your next adventure.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm('');
                                    setCategoryFilter('All');
                                }}
                                className="inline-flex items-center justify-center rounded-full bg-[#5e50b0] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
                            >
                                Reset filters
                            </button>
                        </div>

                        <div className="mt-6 space-y-5">
                            {/* Mobile search */}
                            <div className="lg:hidden">
                                <div className="glass-card flex items-center rounded-full border border-white/70 px-4 py-3">
                                    <MaterialIcon name="search" className="text-[#797583]" />
                                    <input
                                        type="search"
                                        value={searchTerm}
                                        onChange={(event) => setSearchTerm(event.target.value)}
                                        placeholder="Search events..."
                                        className="ml-2 w-full border-none bg-transparent p-0 text-sm text-[#1c1b21] outline-none placeholder:text-[#797583]"
                                    />
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#797583]">Category</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {CATEGORY_OPTIONS.map((category) => (
                                        <FilterPill
                                            key={category}
                                            label={category}
                                            active={categoryFilter === category}
                                            onClick={() => setCategoryFilter(category)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Stats row */}
                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            <div className="rounded-[24px] bg-white/80 p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#797583]">Total events</p>
                                <p className="editorial-display mt-3 text-[32px] font-semibold text-[#1c1b21]">{EVENTS.length}</p>
                            </div>
                            <div className="rounded-[24px] bg-white/80 p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#797583]">Matching</p>
                                <p className="editorial-display mt-3 text-[32px] font-semibold text-[#1c1b21]">{matchingEvents.length}</p>
                            </div>
                            <div className="rounded-[24px] bg-white/80 p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#797583]">Categories</p>
                                <p className="editorial-display mt-3 text-[32px] font-semibold text-[#1c1b21]">{CATEGORY_OPTIONS.length - 1}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Event Grid */}
                <section id="explore-events" className="bg-[#f7f2fb] py-20">
                    <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <h2 className="editorial-display text-[28px] font-semibold leading-[1.2] text-[#1c1b21] md:text-[32px]">Upcoming Events</h2>
                                <p className="mt-2 max-w-2xl text-base leading-7 text-[#484552]">Hand-picked experiences coming your way soon.</p>
                            </div>
                        </div>

                        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {visibleEvents.length === 0 ? (
                                <EmptyState />
                            ) : (
                                visibleEvents.map((event) => (
                                    <EventCard key={event.id} event={event} />
                                ))
                            )}
                        </div>

                        {hasMore ? (
                            <div className="mt-16 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => setVisibleCount((current) => Math.min(current + LOAD_MORE_STEP, matchingEvents.length))}
                                    className="inline-flex items-center gap-2 rounded-full border border-[#c9c4d3] bg-white/80 px-10 py-4 text-sm font-semibold text-[#5e50b0] transition hover:border-[#5e50b0] hover:shadow-[0_18px_36px_-28px_rgba(94,80,176,0.28)]"
                                >
                                    Load more events
                                    <MaterialIcon name="expand_more" />
                                </button>
                            </div>
                        ) : null}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-[#e5e1ea] bg-[#ebe6ef] py-16">
                <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
                    <div className="grid gap-12 md:grid-cols-4">
                        <div className="md:col-span-2">
                            <a href="/dashboard" className="inline-flex items-center gap-3">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5e50b0] text-white">
                                    <span className="editorial-display text-lg font-bold">AY</span>
                                </div>
                                <div>
                                    <p className="editorial-display text-[28px] font-bold tracking-[-0.02em] text-[#5e50b0]">AyoYok</p>
                                    <p className="text-sm text-[#797583]">Curating the city&apos;s most beautiful moments.</p>
                                </div>
                            </a>
                            <p className="mt-6 max-w-md text-sm leading-7 text-[#484552]">
                                Discover events, meet people, and collect moments that matter.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1c1b21]">Navigate</h4>
                            <ul className="mt-6 space-y-4 text-sm text-[#484552]">
                                <li><a className="transition-colors hover:text-[#5e50b0]" href="/dashboard">Home</a></li>
                                <li><a className="transition-colors hover:text-[#5e50b0]" href="/explore">Explore</a></li>
                                <li><a className="transition-colors hover:text-[#5e50b0]" href="/schedule">Schedule</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1c1b21]">Connect</h4>
                            <ul className="mt-6 space-y-4 text-sm text-[#484552]">
                                <li><a className="transition-colors hover:text-[#5e50b0]" href="/profile">{userUsername}</a></li>
                                <li><a className="transition-colors hover:text-[#5e50b0]" href="/events/private/create">Host a private event</a></li>
                                <li className="break-all">{userEmail}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col gap-6 border-t border-[#d8d2de] pt-8 md:flex-row md:items-center md:justify-between">
                        <p className="text-sm text-[#797583]">© {new Date().getFullYear()} AyoYok. All rights reserved.</p>
                        <div className="flex gap-6 text-[#797583]">
                            <span className="transition-colors hover:text-[#5e50b0]">
                                <MaterialIcon name="language" />
                            </span>
                            <span className="transition-colors hover:text-[#5e50b0]">
                                <MaterialIcon name="help" />
                            </span>
                        </div>
                    </div>
                </div>
            </footer>

            <FloatingCreateButton />

            {/* Mobile bottom nav */}
            <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-[22px] border-t border-white/60 bg-[rgba(247,242,251,0.92)] px-4 py-3 shadow-[0_-8px_30px_-18px_rgba(94,80,176,0.28)] backdrop-blur-lg md:hidden">
                <a href="/dashboard" className="flex flex-col items-center justify-center px-5 py-1 text-[#484552]">
                    <MaterialIcon name="home" />
                    <span className="text-[11px] font-semibold">Home</span>
                </a>
                <a href="/explore" className="flex flex-col items-center justify-center rounded-full bg-[#e5deff] px-5 py-1 text-[#372687]">
                    <MaterialIcon name="explore" />
                    <span className="text-[11px] font-semibold">Explore</span>
                </a>
                <a href="/schedule" className="flex flex-col items-center justify-center px-5 py-1 text-[#484552]">
                    <MaterialIcon name="calendar_today" />
                    <span className="text-[11px] font-semibold">Calendar</span>
                </a>
                <a href="/profile" className="flex flex-col items-center justify-center px-5 py-1 text-[#484552]">
                    <MaterialIcon name="person" />
                    <span className="text-[11px] font-semibold">Profile</span>
                </a>
            </nav>
        </div>
    );
}

const mountNode = document.getElementById('ayoyok-explore-root');

if (mountNode) {
    createRoot(mountNode).render(
        <StrictMode>
            <ExplorePage
                userEmail={mountNode.dataset.userEmail || 'hello@ayoyok.app'}
                userName={mountNode.dataset.userName || 'AyoYok User'}
                userUsername={mountNode.dataset.userUsername || '@ayoyok-user'}
            />
        </StrictMode>,
    );
}
