import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

import {
    BASE_DATE,
    CATEGORY_META,
    EVENTS,
    SOCIAL_POSTS,
    compareEventDates,
    getEventById,
    getFeaturedEvents,
    getHostedEvents,
    getInitials,
    getJoinedEvents,
    getOrganizerById,
    getRecommendedEvents,
    getRecentlyViewedEvents,
    getTrendingEvents,
} from './social-hub/mockData';
import { classNames, formatDateChip, formatEventDate, formatPrice, Icon } from './social-hub/ui';

const { StrictMode, useEffect, useMemo, useRef, useState } = React;

const DATE_FILTERS = ['All Dates', 'This Week', 'This Month', 'Next Month'];
const CATEGORY_OPTIONS = ['All', ...new Set(EVENTS.map((event) => event.category))];

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

function getLoopedEvents(events, startIndex, count, excludedIds = []) {
    if (events.length === 0 || count <= 0) {
        return [];
    }

    const seen = new Set(excludedIds);
    const result = [];

    for (let offset = 0; offset < events.length && result.length < count; offset += 1) {
        const event = events[(startIndex + offset) % events.length];

        if (!seen.has(event.id)) {
            seen.add(event.id);
            result.push(event);
        }
    }

    return result;
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);

    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

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

function SectionTitle({ title, description, action }) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
                <h2 className="editorial-display text-[28px] font-semibold leading-[1.2] text-[#1c1b21] md:text-[32px]">{title}</h2>
                {description ? <p className="mt-2 max-w-2xl text-base leading-7 text-[#484552]">{description}</p> : null}
            </div>
            {action}
        </div>
    );
}

function EditorialEmptyState({ title, description, action }) {
    return (
        <div className="glass-card ambient-shadow rounded-[28px] border border-white/70 px-6 py-12 text-center">
            <h3 className="editorial-display text-2xl font-semibold text-[#1c1b21]">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#484552]">{description}</p>
            {action ? <div className="mt-5">{action}</div> : null}
        </div>
    );
}

function AvatarStack({ event }) {
    const organizer = getOrganizerById(event.organizerId);
    const relatedPosts = SOCIAL_POSTS.filter((post) => post.eventId === event.id).slice(0, 2);
    const avatars = [];

    if (organizer) {
        avatars.push({ src: organizer.avatar, label: organizer.name });
    }

    relatedPosts.forEach((post) => {
        if (!avatars.some((avatar) => avatar.src === post.avatar)) {
            avatars.push({ src: post.avatar, label: post.userName });
        }
    });

    return (
        <div className="flex -space-x-2">
            {avatars.slice(0, 2).map((avatar) => (
                <img
                    key={`${event.id}-${avatar.label}`}
                    alt={avatar.label}
                    className="h-8 w-8 rounded-full border-2 border-[#fdf8ff] object-cover"
                    src={avatar.src}
                />
            ))}
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#fdf8ff] bg-[#e5deff] text-[10px] font-bold text-[#372687]">
                +{Math.min(Math.max(Math.round(event.attendees / 40), 3), 99)}
            </div>
        </div>
    );
}

function CompactAgendaItem({ event, label, onOpen }) {
    return (
        <button
            type="button"
            onClick={onOpen}
            className="flex w-full items-center gap-4 rounded-[24px] border border-white/70 bg-white/80 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-[0_20px_42px_-28px_rgba(94,80,176,0.45)]"
        >
            <img alt={event.title} className="h-20 w-20 rounded-[20px] object-cover" src={event.image} />
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#f1ecf5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5e50b0]">
                        {label}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#797583]">{formatDateChip(event.date)}</span>
                </div>
                <h3 className="editorial-display mt-3 truncate text-lg font-semibold text-[#1c1b21]">{event.title}</h3>
                <p className="mt-1 truncate text-sm text-[#484552]">{event.location}</p>
            </div>
            <MaterialIcon name="arrow_forward" className="text-[#797583]" />
        </button>
    );
}

function SupportingVibeCard({ event, label, onOpen }) {
    return (
        <button
            type="button"
            onClick={onOpen}
            className="ambient-shadow ambient-shadow-hover relative h-full min-h-[220px] overflow-hidden rounded-[28px] text-left"
        >
            <img alt={event.title} className="h-full w-full object-cover" src={event.image} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="mb-2 inline-flex rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-[#534438]">
                    {label}
                </span>
                <h3 className="editorial-display text-xl font-semibold text-white">{event.title}</h3>
                <p className="mt-2 text-sm text-white/80">{formatEventDate(event.date)}</p>
            </div>
        </button>
    );
}

function UpcomingEventCard({ event, joined, onOpen, onPrimaryAction }) {
    const meta = CATEGORY_META[event.category];
    const eventDate = new Date(event.date);
    const primaryLabel = joined ? 'View Ticket' : event.price === 0 ? 'Join Event' : 'Buy Ticket';

    return (
        <article className="ambient-shadow ambient-shadow-hover overflow-hidden rounded-[28px] border border-white/70 bg-white/88 transition">
            <div className="relative h-64 overflow-hidden">
                <img alt={event.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" src={event.image} />
                <div className="absolute top-4 right-4 date-tile">
                    <span className="text-xl font-bold text-[#5e50b0]">{eventDate.getDate()}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#797583]">
                        {eventDate.toLocaleString('en-US', { month: 'short' })}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                    <span className={classNames('rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em]', meta.soft)}>{event.category}</span>
                    <span className="text-xs font-medium text-[#797583]">• {formatEventDate(event.date)}</span>
                </div>
                <h3 className="editorial-display mt-4 text-[24px] font-semibold leading-[1.25] text-[#1c1b21]">{event.title}</h3>
                <p className="mt-3 line-clamp-2 text-sm leading-7 text-[#484552]">{event.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-[#e5e1ea] pt-4">
                    <AvatarStack event={event} />
                    <span className="text-sm font-semibold text-[#5e50b0]">{formatPrice(event.price)}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={onOpen}
                        className="inline-flex items-center gap-2 rounded-full border border-[#c9c4d3] px-4 py-2 text-sm font-semibold text-[#484552] transition hover:border-[#5e50b0] hover:text-[#5e50b0]"
                    >
                        Open details
                        <Icon name="arrow" className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={onPrimaryAction}
                        className="inline-flex items-center gap-2 rounded-full bg-[#5e50b0] px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02] hover:shadow-[0_18px_36px_-24px_rgba(94,80,176,0.9)]"
                    >
                        {primaryLabel}
                        <Icon name="ticket" className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </article>
    );
}

function StoryCard({ post }) {
    const event = getEventById(post.eventId);

    if (!event) {
        return null;
    }

    return (
        <article className="group flex gap-6 rounded-[28px] border border-transparent p-2 transition hover:border-white/60 hover:bg-white/50">
            <div className="h-40 w-40 shrink-0 overflow-hidden rounded-[24px]">
                <img alt={event.title} className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" src={event.image} />
            </div>
            <div className="flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em]">
                    <span className="text-[#5e50b0]">{event.category}</span>
                    <span className="h-1 w-1 rounded-full bg-[#797583]" />
                    <span className="text-[#797583]">{post.timeAgo}</span>
                </div>
                <h3 className="editorial-display mt-3 text-[24px] font-semibold leading-[1.25] text-[#1c1b21] transition-colors group-hover:text-[#5e50b0]">
                    {event.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#484552]">{post.caption}</p>
                <div className="mt-5 flex items-center gap-3">
                    <img alt={post.userName} className="h-10 w-10 rounded-full object-cover" src={post.avatar} />
                    <div>
                        <p className="text-sm font-semibold text-[#1c1b21]">{post.userName}</p>
                        <p className="text-xs text-[#797583]">{post.handle}</p>
                    </div>
                </div>
            </div>
        </article>
    );
}

function EditorialDetailView({ event, joined, relatedEvents, onBack, onJoinOrBuy, onOpenRelated, onOpenExplore }) {
    const meta = CATEGORY_META[event.category];

    return (
        <div className="space-y-10">
            <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-5 py-3 text-sm font-semibold text-[#484552] transition hover:border-[#5e50b0] hover:text-[#5e50b0]"
            >
                <Icon name="back" className="h-4 w-4" />
                Back to the homepage
            </button>

            <section className="relative overflow-hidden rounded-[32px]">
                <img alt={event.title} className="h-[420px] w-full object-cover" src={event.image} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
                    <div className="max-w-3xl">
                        <div className="flex flex-wrap gap-2">
                            <span className={classNames('rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]', meta.soft)}>{event.category}</span>
                            <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                                Hosted by {event.host}
                            </span>
                            {joined ? (
                                <span className="rounded-full bg-[#c1e9d5]/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#002116]">
                                    Ticket ready
                                </span>
                            ) : null}
                        </div>
                        <h1 className="editorial-display mt-6 text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[52px]">{event.title}</h1>
                        <p className="mt-4 max-w-2xl text-base leading-8 text-white/88">{event.description}</p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <button
                                type="button"
                                onClick={onJoinOrBuy}
                                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1c1b21] transition hover:bg-[#f1ecf5]"
                            >
                                {joined ? 'Open Schedule' : event.price === 0 ? 'Join Event' : 'Continue to Payment'}
                                <Icon name="ticket" className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={onOpenExplore}
                                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/18"
                            >
                                More events
                                <Icon name="arrow" className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                <article className="glass-card ambient-shadow rounded-[32px] border border-white/70 p-6 sm:p-8">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-[24px] bg-white/80 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#797583]">Date and time</p>
                            <p className="mt-3 text-sm font-semibold text-[#1c1b21]">{formatEventDate(event.date)}</p>
                        </div>
                        <div className="rounded-[24px] bg-white/80 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#797583]">Location</p>
                            <p className="mt-3 text-sm font-semibold text-[#1c1b21]">{event.location}</p>
                        </div>
                        <div className="rounded-[24px] bg-white/80 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#797583]">Crowd</p>
                            <p className="mt-3 text-sm font-semibold text-[#1c1b21]">{event.attendees.toLocaleString()} people</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="editorial-display text-[28px] font-semibold text-[#1c1b21]">What to expect</h2>
                        <p className="mt-3 text-base leading-8 text-[#484552]">{event.highlight}</p>
                    </div>

                    <div className="mt-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#797583]">Included with your access</p>
                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            {event.perks.map((perk) => (
                                <div key={perk} className="rounded-[24px] border border-[#e5e1ea] bg-white/85 px-4 py-4 text-sm font-semibold text-[#484552]">
                                    {perk}
                                </div>
                            ))}
                        </div>
                    </div>
                </article>

                <aside className="space-y-6">
                    <div className="overflow-hidden rounded-[32px] bg-[#312f36] p-6 text-white shadow-[0_24px_60px_-32px_rgba(49,47,54,0.65)]">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">Ticket</p>
                        <p className="editorial-display mt-3 text-[36px] font-bold leading-none">{formatPrice(event.price)}</p>
                        <p className="mt-3 text-sm leading-7 text-white/72">
                            {joined
                                ? 'You already have access. Your schedule keeps the confirmation and next event details together.'
                                : event.price === 0
                                  ? 'Reserve your free place and keep it attached to your event schedule.'
                                  : 'Move into the existing payment flow without changing any backend route or auth behavior.'}
                        </p>

                        <div className="mt-6 space-y-4 rounded-[24px] bg-white/8 p-4">
                            <div className="flex items-center gap-3 text-sm text-white/82">
                                <Icon name="calendar" className="h-4 w-4" />
                                <span>{formatEventDate(event.date)}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/82">
                                <Icon name="map" className="h-4 w-4" />
                                <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/82">
                                <Icon name="people" className="h-4 w-4" />
                                <span>{event.attendees.toLocaleString()} people watching</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 p-6">
                        <h3 className="editorial-display text-[24px] font-semibold text-[#1c1b21]">Related moments</h3>
                        <div className="mt-5 space-y-3">
                            {relatedEvents.length === 0 ? (
                                <EditorialEmptyState
                                    title="No related events yet"
                                    description="This category currently stands on its own, but the homepage still keeps the rest of your discovery feed available."
                                />
                            ) : (
                                relatedEvents.map((relatedEvent) => (
                                    <CompactAgendaItem
                                        key={relatedEvent.id}
                                        event={relatedEvent}
                                        label={relatedEvent.category}
                                        onOpen={() => onOpenRelated(relatedEvent.id)}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function Dashboard({ userName, userUsername, userEmail }) {
    const heroImageRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [dateFilter, setDateFilter] = useState('All Dates');
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [joinedEventIds] = useState(getJoinedEvents().map((event) => event.id));
    const [recentlyViewedIds, setRecentlyViewedIds] = useState(getRecentlyViewedEvents().map((event) => event.id));
    const [trendingIndex, setTrendingIndex] = useState(0);
    const [isHeaderSearchFocused, setIsHeaderSearchFocused] = useState(false);

    const sortedEvents = useMemo(() => EVENTS.slice().sort(compareEventDates), []);
    const query = searchTerm.trim().toLowerCase();

    const filteredEvents = sortedEvents.filter((event) => {
        const matchesQuery =
            query === '' ||
            [event.title, event.location, event.host, event.category, ...event.keywords].some((value) => value.toLowerCase().includes(query));
        const matchesCategory = categoryFilter === 'All' || event.category === categoryFilter;
        const matchesDate = matchesDateFilter(event.date, dateFilter);

        return matchesQuery && matchesCategory && matchesDate;
    });

    const featuredEvents = filteredEvents.filter((event) => getFeaturedEvents().some((item) => item.id === event.id));
    const recommendedEvents = filteredEvents.filter((event) => getRecommendedEvents().some((item) => item.id === event.id));
    const trendingEvents = filteredEvents.filter((event) => getTrendingEvents().some((item) => item.id === event.id));
    const upcomingEvents = filteredEvents.filter((event) => new Date(event.date) >= BASE_DATE).slice(0, 6);
    const joinedEvents = sortedEvents.filter((event) => joinedEventIds.includes(event.id));
    const upcomingJoinedEvents = joinedEvents.filter((event) => new Date(event.date) >= BASE_DATE);
    const recentlyViewedEvents = sortedEvents.filter((event) => recentlyViewedIds.includes(event.id));
    const hostedEvents = getHostedEvents();
    const selectedEvent = selectedEventId ? sortedEvents.find((event) => event.id === selectedEventId) : null;
    const relatedEvents = selectedEvent
        ? sortedEvents.filter((event) => event.category === selectedEvent.category && event.id !== selectedEvent.id).slice(0, 3)
        : [];
    const activeTrendingIndex = trendingEvents.length === 0 ? 0 : trendingIndex % trendingEvents.length;
    const activeTrendingEvent = trendingEvents[activeTrendingIndex] || null;
    const heroEvent = activeTrendingEvent || recommendedEvents[0] || upcomingEvents[0] || sortedEvents[0];

    const supportingTrendingEvents = (() => {
        const primarySupport = getLoopedEvents(trendingEvents, activeTrendingIndex + 1, 2, activeTrendingEvent ? [activeTrendingEvent.id] : []);

        if (primarySupport.length === 2) {
            return primarySupport;
        }

        const fallbackPool = [...featuredEvents, ...recommendedEvents, ...upcomingEvents];

        return [
            ...primarySupport,
            ...fallbackPool.filter(
                (event) =>
                    event.id !== activeTrendingEvent?.id && !primarySupport.some((item) => item.id === event.id),
            ),
        ].slice(0, 2);
    })();

    const filteredEventIds = new Set(filteredEvents.map((event) => event.id));
    const communityStories = SOCIAL_POSTS.filter((post) => filteredEventIds.has(post.eventId)).slice(0, 2);
    const visibleStories = communityStories.length > 0 ? communityStories : SOCIAL_POSTS.slice(0, 2);
    const displayHandle = userUsername || `@${String(userName || 'ayoyok-user').trim().toLowerCase().replace(/\s+/g, '-')}`;

    useEffect(() => {
        function handleScroll() {
            if (!heroImageRef.current || selectedEvent) {
                return;
            }

            const scrollAmount = Math.min(window.pageYOffset * 0.15, 48);
            heroImageRef.current.style.transform = `translateY(${scrollAmount}px) scale(1.06)`;
        }

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [selectedEvent]);

    function registerRecentView(eventId) {
        setRecentlyViewedIds((currentIds) => [eventId, ...currentIds.filter((id) => id !== eventId)].slice(0, 5));
    }

    function openEvent(eventId) {
        setSelectedEventId(eventId);
        registerRecentView(eventId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function closeEvent() {
        setSelectedEventId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function goToPayment(event) {
        window.location.href = `/payment/${event.id}`;
    }

    function handlePrimaryAction(event) {
        if (joinedEventIds.includes(event.id)) {
            openEvent(event.id);
            return;
        }

        goToPayment(event);
    }

    function handleDetailAction(event) {
        if (joinedEventIds.includes(event.id)) {
            window.location.href = '/schedule';
            return;
        }

        goToPayment(event);
    }

    function resetFilters() {
        setSearchTerm('');
        setCategoryFilter('All');
        setDateFilter('All Dates');
    }

    return (
        <div
            className="editorial-shell editorial-copy min-h-screen bg-[#fdf8ff] pb-28 text-[#1c1b21] selection:bg-[#e5deff] selection:text-[#372687] md:pb-0"
            style={{
                backgroundColor: '#fdf8ff',
            }}
        >
            <header className="fixed inset-x-0 top-0 z-50 border-b border-white/55 bg-[rgba(253,248,255,0.78)] backdrop-blur-md shadow-[0_12px_30px_-24px_rgba(94,80,176,0.35)]">
                <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-4 lg:px-8">
                    <div className="flex items-center gap-8">
                        <a href="/dashboard" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5e50b0] text-white shadow-[0_16px_28px_-18px_rgba(94,80,176,0.85)]">
                                <span className="editorial-display text-base font-bold">AY</span>
                            </div>
                            <div>
                                <p className="editorial-display text-[24px] font-bold tracking-[-0.02em] text-[#5e50b0]">AyoYok</p>
                                <p className="hidden text-xs text-[#797583] sm:block">Experience Beautiful Moments</p>
                            </div>
                        </a>

                        <nav className="hidden items-center gap-6 md:flex">
                            <a className="border-b-2 border-[#5e50b0] pb-1 text-sm font-semibold text-[#5e50b0]" href="/dashboard">
                                Home
                            </a>
                            <a className="text-sm font-semibold text-[#484552] transition-colors hover:text-[#5e50b0]" href="/explore">
                                Explore
                            </a>
                            <a className="text-sm font-semibold text-[#484552] transition-colors hover:text-[#5e50b0]" href="/schedule">
                                Schedule
                            </a>
                            <a className="text-sm font-semibold text-[#484552] transition-colors hover:text-[#5e50b0]" href="/profile">
                                Profile
                            </a>
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
                                onChange={(event) => setSearchTerm(event.target.value)}
                                onFocus={() => setIsHeaderSearchFocused(true)}
                                onBlur={() => setIsHeaderSearchFocused(false)}
                                placeholder="Find vibes..."
                                className="ml-2 w-full border-none bg-transparent p-0 text-sm text-[#1c1b21] outline-none placeholder:text-[#797583]"
                            />
                        </div>

                        <button
                            type="button"
                            aria-label="Open schedule"
                            onClick={() => {
                                window.location.href = '/schedule';
                            }}
                            className="rounded-full p-2 text-[#484552] transition hover:bg-white/80 hover:text-[#5e50b0]"
                        >
                            <MaterialIcon name="notifications" />
                        </button>
                        <button
                            type="button"
                            aria-label="Jump to recommended events"
                            onClick={() => scrollToSection('upcoming-events')}
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

            <main className="pt-24">
                {selectedEvent ? (
                    <section className="mx-auto max-w-[1200px] px-5 py-8 lg:px-8">
                        <EditorialDetailView
                            event={selectedEvent}
                            joined={joinedEventIds.includes(selectedEvent.id)}
                            relatedEvents={relatedEvents}
                            onBack={closeEvent}
                            onJoinOrBuy={() => handleDetailAction(selectedEvent)}
                            onOpenRelated={openEvent}
                            onOpenExplore={() => {
                                setSelectedEventId(null);
                                requestAnimationFrame(() => {
                                    requestAnimationFrame(() => {
                                        scrollToSection('upcoming-events');
                                    });
                                });
                            }}
                        />
                    </section>
                ) : (
                    <>
                        <section className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-8">
                            <div className="relative overflow-hidden rounded-[32px]">
                                <img
                                    ref={heroImageRef}
                                    alt={heroEvent.title}
                                    className="h-[560px] w-full object-cover transition-transform duration-700"
                                    src={heroEvent.image}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
                                    <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-end">
                                        <div className="max-w-3xl">
                                            <span className="mb-4 inline-flex rounded-full bg-[#c1e9d5]/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#002116]">
                                                Curated for you
                                            </span>
                                            <h1 className="editorial-display text-[42px] font-bold leading-[1.08] tracking-[-0.02em] text-white sm:text-[54px]">
                                                Experience Beautiful Moments
                                            </h1>
                                            <p className="mt-5 max-w-2xl text-base leading-8 text-white/88 sm:text-lg">
                                                Discover a world where every event is an invitation to something extraordinary. This week starts with{' '}
                                                <span className="font-semibold text-white">{heroEvent.title}</span>, plus a discovery feed that already keeps your routes, payments, and schedule intact.
                                            </p>
                                            <div className="mt-8 flex flex-wrap gap-4">
                                                <a
                                                    href="/explore"
                                                    className="inline-flex items-center justify-center rounded-full bg-[#5e50b0] px-8 py-4 text-sm font-semibold text-white transition hover:scale-[1.02] hover:shadow-[0_24px_42px_-26px_rgba(94,80,176,0.95)]"
                                                >
                                                    Explore Events
                                                </a>
                                                <button
                                                    type="button"
                                                    onClick={() => scrollToSection('community-stories')}
                                                    className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/18"
                                                >
                                                    How it works
                                                </button>
                                            </div>
                                        </div>

                                        <div className="hidden rounded-[28px] border border-white/25 bg-[rgba(18,16,28,0.28)] p-6 text-white shadow-[0_24px_60px_-32px_rgba(18,16,28,0.55)] backdrop-blur-md xl:block">
                                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Tonight&apos;s momentum</p>
                                            <h2 className="editorial-display mt-3 text-[28px] font-semibold leading-[1.2]">{heroEvent.title}</h2>
                                            <p className="mt-3 text-sm leading-7 text-white/80">{heroEvent.highlight}</p>
                                            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                                                <div className="rounded-[20px] bg-white/10 p-4">
                                                    <p className="text-white/60">Date</p>
                                                    <p className="mt-2 font-semibold">{formatDateChip(heroEvent.date)}</p>
                                                </div>
                                                <div className="rounded-[20px] bg-white/10 p-4">
                                                    <p className="text-white/60">Price</p>
                                                    <p className="mt-2 font-semibold">{formatPrice(heroEvent.price)}</p>
                                                </div>
                                            </div>
                                            <div className="mt-5 flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.2em] text-white/55">Profile</p>
                                                    <p className="mt-1 text-sm font-semibold">{displayHandle}</p>
                                                </div>
                                                <a
                                                    href="/profile"
                                                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-sm font-bold"
                                                >
                                                    {getInitials(userName)}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mx-auto max-w-[1200px] px-5 pb-20 lg:px-8">
                            <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 p-6 sm:p-8">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                                    <div>
                                        <h2 className="editorial-display text-[28px] font-semibold text-[#1c1b21]">Refine the vibe</h2>
                                        <p className="mt-2 max-w-2xl text-sm leading-7 text-[#484552]">
                                            The search, category filters, and date filters from the existing dashboard stay intact. They now sit inside the new glassmorphism editorial layer.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={resetFilters}
                                        className="inline-flex items-center justify-center rounded-full bg-[#5e50b0] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
                                    >
                                        Reset filters
                                    </button>
                                </div>

                                <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
                                    <div className="space-y-5">
                                        <div className="lg:hidden">
                                            <div className="glass-card flex items-center rounded-full border border-white/70 px-4 py-3">
                                                <MaterialIcon name="search" className="text-[#797583]" />
                                                <input
                                                    type="search"
                                                    value={searchTerm}
                                                    onChange={(event) => setSearchTerm(event.target.value)}
                                                    placeholder="Find vibes..."
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

                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#797583]">Date</p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {DATE_FILTERS.map((filter) => (
                                                    <FilterPill
                                                        key={filter}
                                                        label={filter}
                                                        active={dateFilter === filter}
                                                        onClick={() => setDateFilter(filter)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                                        <div className="rounded-[24px] bg-white/80 p-5">
                                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#797583]">Joined events</p>
                                            <p className="editorial-display mt-3 text-[32px] font-semibold text-[#1c1b21]">{joinedEvents.length}</p>
                                        </div>
                                        <div className="rounded-[24px] bg-white/80 p-5">
                                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#797583]">Recommended</p>
                                            <p className="editorial-display mt-3 text-[32px] font-semibold text-[#1c1b21]">{recommendedEvents.length}</p>
                                        </div>
                                        <div className="rounded-[24px] bg-white/80 p-5">
                                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#797583]">Showing now</p>
                                            <p className="editorial-display mt-3 text-[32px] font-semibold text-[#1c1b21]">{filteredEvents.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="trending-vibes" className="mx-auto max-w-[1200px] px-5 pb-20 lg:px-8">
                            <SectionTitle
                                title="Trending Vibes"
                                description="The most talked-about experiences this week."
                                action={
                                    <div className="flex items-center gap-3">
                                        <div className="hidden items-center gap-2 md:flex">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setTrendingIndex((current) => (current - 1 + Math.max(trendingEvents.length, 1)) % Math.max(trendingEvents.length, 1))
                                                }
                                                className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-[#484552] transition hover:text-[#5e50b0]"
                                            >
                                                Prev
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setTrendingIndex((current) => (current + 1) % Math.max(trendingEvents.length, 1))}
                                                className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-[#484552] transition hover:text-[#5e50b0]"
                                            >
                                                Next
                                            </button>
                                        </div>
                                        <a href="/explore" className="inline-flex items-center gap-2 text-sm font-semibold text-[#5e50b0] transition hover:gap-3">
                                            View all vibes
                                            <MaterialIcon name="arrow_forward" />
                                        </a>
                                    </div>
                                }
                            />

                            <div className="mt-10">
                                {activeTrendingEvent ? (
                                    <div className="grid grid-cols-12 gap-6 lg:min-h-[500px]">
                                        <div className="ambient-shadow ambient-shadow-hover relative col-span-12 overflow-hidden rounded-[32px] lg:col-span-7">
                                            <img alt={activeTrendingEvent.title} className="h-full w-full object-cover" src={activeTrendingEvent.image} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                                            <div className="absolute left-6 top-6 flex flex-wrap gap-2">
                                                <span className="rounded-full bg-[#5e50b0]/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white">
                                                    Featured
                                                </span>
                                                <span className={classNames('rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em]', CATEGORY_META[activeTrendingEvent.category].soft)}>
                                                    {activeTrendingEvent.category}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                                <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">{formatEventDate(activeTrendingEvent.date)}</p>
                                                <h3 className="editorial-display mt-3 text-[30px] font-semibold leading-[1.15] text-white sm:text-[36px]">
                                                    {activeTrendingEvent.title}
                                                </h3>
                                                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/82">{activeTrendingEvent.highlight}</p>
                                                <div className="mt-6 flex flex-wrap gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => openEvent(activeTrendingEvent.id)}
                                                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1c1b21] transition hover:bg-[#f1ecf5]"
                                                    >
                                                        Open details
                                                        <Icon name="arrow" className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handlePrimaryAction(activeTrendingEvent)}
                                                        className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/18"
                                                    >
                                                        {joinedEventIds.includes(activeTrendingEvent.id)
                                                            ? 'View ticket'
                                                            : activeTrendingEvent.price === 0
                                                              ? 'Join event'
                                                              : 'Buy ticket'}
                                                        <Icon name="ticket" className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-12 grid gap-6 md:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:grid-rows-2">
                                            {supportingTrendingEvents.map((event, index) => (
                                                <SupportingVibeCard
                                                    key={event.id}
                                                    event={event}
                                                    label={index === 0 ? 'Next up' : 'Worth watching'}
                                                    onOpen={() => openEvent(event.id)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <EditorialEmptyState
                                        title="No trending vibes match the current filters."
                                        description="Broaden the search or reset the date/category filters to bring the carousel back."
                                        action={
                                            <button
                                                type="button"
                                                onClick={resetFilters}
                                                className="rounded-full bg-[#5e50b0] px-5 py-3 text-sm font-semibold text-white"
                                            >
                                                Reset filters
                                            </button>
                                        }
                                    />
                                )}
                            </div>
                        </section>

                        <section id="upcoming-events" className="bg-[#f7f2fb] py-20">
                            <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
                                <SectionTitle
                                    title="Upcoming Events"
                                    description="Hand-picked experiences coming your way soon."
                                />

                                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                                    {upcomingEvents.length === 0 ? (
                                        <div className="md:col-span-2 xl:col-span-3">
                                            <EditorialEmptyState
                                                title="No upcoming events match these filters."
                                                description="The event data is still intact. Adjust the search or filters to reveal more of the current feed."
                                            />
                                        </div>
                                    ) : (
                                        upcomingEvents.map((event) => (
                                            <UpcomingEventCard
                                                key={event.id}
                                                event={event}
                                                joined={joinedEventIds.includes(event.id)}
                                                onOpen={() => openEvent(event.id)}
                                                onPrimaryAction={() => handlePrimaryAction(event)}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </section>

                        <section id="joined-events" className="mx-auto max-w-[1200px] px-5 py-20 lg:px-8">
                            <SectionTitle
                                title="Your Week at a Glance"
                                description="Joined tickets, recent looks, and hosted moments stay visible without the old SaaS shell."
                            />

                            <div className="mt-12 grid gap-6 xl:grid-cols-3">
                                <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 p-6">
                                    <h3 className="editorial-display text-[24px] font-semibold text-[#1c1b21]">Upcoming agenda</h3>
                                    <div className="mt-5 space-y-3">
                                        {upcomingJoinedEvents.length === 0 ? (
                                            <EditorialEmptyState
                                                title="Nothing joined yet"
                                                description="Free joins and paid tickets will surface here as soon as you add them."
                                            />
                                        ) : (
                                            upcomingJoinedEvents.slice(0, 3).map((event) => (
                                                <CompactAgendaItem
                                                    key={event.id}
                                                    event={event}
                                                    label="On your schedule"
                                                    onOpen={() => openEvent(event.id)}
                                                />
                                            ))
                                        )}
                                    </div>
                                </div>

                                <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 p-6">
                                    <h3 className="editorial-display text-[24px] font-semibold text-[#1c1b21]">Recently viewed</h3>
                                    <div className="mt-5 space-y-3">
                                        {recentlyViewedEvents.slice(0, 3).map((event) => (
                                            <CompactAgendaItem
                                                key={event.id}
                                                event={event}
                                                label="Recent view"
                                                onOpen={() => openEvent(event.id)}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 p-6">
                                    <h3 className="editorial-display text-[24px] font-semibold text-[#1c1b21]">Hosting</h3>
                                    <div className="mt-5 space-y-3">
                                        {hostedEvents.slice(0, 3).map((event) => (
                                            <CompactAgendaItem
                                                key={event.id}
                                                event={event}
                                                label="Hosted by you"
                                                onOpen={() => openEvent(event.id)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="community-stories" className="mx-auto max-w-[1200px] px-5 pb-20 lg:px-8">
                            <div className="text-center">
                                <h2 className="editorial-display text-[32px] font-semibold leading-[1.2] text-[#1c1b21]">Community Stories</h2>
                                <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#484552]">
                                    Voices from the existing community data about their recent discoveries and shared moments.
                                </p>
                            </div>

                            <div className="mt-16 grid gap-12 md:grid-cols-2">
                                {visibleStories.map((post) => (
                                    <StoryCard key={post.id} post={post} />
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </main>

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
                                The editorial homepage is now mounted on the existing Laravel dashboard root, while discovery, payment, profile, and schedule routes stay exactly where the app already expects them.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1c1b21]">Navigate</h4>
                            <ul className="mt-6 space-y-4 text-sm text-[#484552]">
                                <li>
                                    <a className="transition-colors hover:text-[#5e50b0]" href="/dashboard">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a className="transition-colors hover:text-[#5e50b0]" href="/explore">
                                        Explore
                                    </a>
                                </li>
                                <li>
                                    <a className="transition-colors hover:text-[#5e50b0]" href="/schedule">
                                        Schedule
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1c1b21]">Connect</h4>
                            <ul className="mt-6 space-y-4 text-sm text-[#484552]">
                                <li>
                                    <a className="transition-colors hover:text-[#5e50b0]" href="/profile">
                                        {displayHandle}
                                    </a>
                                </li>
                                <li>
                                    <a className="transition-colors hover:text-[#5e50b0]" href="/events/private/create">
                                        Host a private event
                                    </a>
                                </li>
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

            <div className="fixed bottom-24 right-6 z-40 md:hidden">
                <a
                    href="/events/private/create"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5e50b0] text-white shadow-[0_24px_46px_-24px_rgba(94,80,176,0.9)] transition active:scale-95"
                >
                    <MaterialIcon name="add" />
                </a>
            </div>

            <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-[22px] border-t border-white/60 bg-[rgba(247,242,251,0.92)] px-4 py-3 shadow-[0_-8px_30px_-18px_rgba(94,80,176,0.28)] backdrop-blur-lg md:hidden">
                <a href="/dashboard" className="flex flex-col items-center justify-center rounded-full bg-[#e5deff] px-5 py-1 text-[#372687]">
                    <MaterialIcon name="home" />
                    <span className="text-[11px] font-semibold">Home</span>
                </a>
                <a href="/explore" className="flex flex-col items-center justify-center px-5 py-1 text-[#484552]">
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

const mountNode = document.getElementById('ayoyok-event-root');

if (mountNode) {
    createRoot(mountNode).render(
        <StrictMode>
            <Dashboard
                userEmail={mountNode.dataset.userEmail || 'hello@ayoyok.app'}
                userName={mountNode.dataset.userName || 'AyoYok User'}
                userUsername={mountNode.dataset.userUsername || '@ayoyok-user'}
            />
        </StrictMode>,
    );
}
