import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

import {
    BASE_DATE,
    CATEGORY_META,
    EVENTS,
    compareEventDates,
    getFeaturedEvents,
    getHostedEvents,
    getJoinedEvents,
    getRecommendedEvents,
    getRecentlyViewedEvents,
    getTrendingEvents,
} from './social-hub/mockData';
import {
    classNames,
    CompactEventItem,
    EmptyState,
    EventCard,
    FilterChip,
    FloatingCreateButton,
    formatDateChip,
    formatEventDate,
    formatPrice,
    Icon,
    SectionHeading,
    StatCard,
    TopNavigation,
} from './social-hub/ui';

const { StrictMode, useMemo, useState } = React;

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

function CategoryButton({ category, active, onClick }) {
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
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {EVENTS.filter((event) => event.category === category).length} events
                </span>
            </div>
            <h3 className="dashboard-display mt-4 text-xl font-bold text-slate-950">{category}</h3>
            <p className="mt-2 text-sm text-slate-600">Recommended moments and strong social traction around {category.toLowerCase()}.</p>
        </button>
    );
}

function TrendingCarousel({ events, activeIndex, onPrev, onNext, onOpen, onPrimaryAction, joinedEventIds }) {
    const activeEvent = events[activeIndex] || events[0];

    if (!activeEvent) {
        return (
            <div className="panel p-8 text-center text-sm text-slate-500">
                Trending events will appear here once your social feed has more activity.
            </div>
        );
    }

    return (
        <section className="panel-dark overflow-hidden p-6 sm:p-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div className="max-w-2xl">
                    <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                            Trending right now
                        </span>
                        <span className="rounded-full bg-fuchsia-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-100">
                            Crowd favorite
                        </span>
                    </div>
                    <h2 className="dashboard-display mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">{activeEvent.title}</h2>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{activeEvent.description}</p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => onOpen(activeEvent.id)}
                            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-slate-100"
                        >
                            Open details
                            <Icon name="arrow" className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => onPrimaryAction(activeEvent)}
                            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            {joinedEventIds.includes(activeEvent.id) ? 'View ticket' : activeEvent.price === 0 ? 'Join event' : 'Buy ticket'}
                            <Icon name="ticket" className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="w-full max-w-[420px] rounded-[32px] border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                    <img src={activeEvent.image} alt={activeEvent.title} className="h-56 w-full rounded-[24px] object-cover" />
                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-[20px] bg-white/6 p-4">
                            <p className="text-slate-400">Date</p>
                            <p className="mt-2 font-semibold text-white">{formatDateChip(activeEvent.date)}</p>
                        </div>
                        <div className="rounded-[20px] bg-white/6 p-4">
                            <p className="text-slate-400">Price</p>
                            <p className="mt-2 font-semibold text-white">{formatPrice(activeEvent.price)}</p>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-slate-300">{activeEvent.attendees.toLocaleString()} people are watching this event.</p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onPrev}
                                className="rounded-full border border-white/15 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                Prev
                            </button>
                            <button
                                type="button"
                                onClick={onNext}
                                className="rounded-full border border-white/15 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
                Back to your hub
            </button>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                <article className="panel overflow-hidden">
                    <img src={event.image} alt={event.title} className="h-80 w-full object-cover sm:h-[420px]" />
                    <div className="space-y-6 p-6 sm:p-8">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className={classNames('rounded-full px-3 py-1 text-xs font-semibold', categoryMeta.soft)}>{event.category}</span>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Hosted by {event.host}</span>
                            {joined ? (
                                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                                    Ticket ready
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
                            {joined
                                ? 'Your access is already locked in and visible from your schedule.'
                                : event.price === 0
                                  ? 'Reserve a free spot and add it to your personal calendar.'
                                  : 'Move to payment to secure your ticket and save it to your schedule.'}
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
                            {joined ? 'Open schedule' : event.price === 0 ? 'Join Event' : 'Continue to Payment'}
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
    const [flashMessage, setFlashMessage] = useState('');
    const [joinedEventIds, setJoinedEventIds] = useState(getJoinedEvents().map((event) => event.id));
    const [recentlyViewedIds, setRecentlyViewedIds] = useState(getRecentlyViewedEvents().map((event) => event.id));
    const [trendingIndex, setTrendingIndex] = useState(0);

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
        setFlashMessage('');
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

    const heroEvent = trendingEvents[activeTrendingIndex] || upcomingEvents[0] || sortedEvents[0];

    return (
        <div className="dashboard-shell min-h-screen">
            <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 sm:py-6">
                <TopNavigation
                    userName={userName}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    activePath="dashboard"
                    searchPlaceholder="Search your hub, organizers, or event keywords"
                />

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
                            onJoinOrBuy={() => handleDetailAction(selectedEvent)}
                            onOpenRelated={openEvent}
                        />
                    ) : (
                        <>
                            <section className="panel-dark overflow-hidden p-6 sm:p-8">
                                <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_380px] xl:items-center">
                                    <div>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                                                Personalized Hub
                                            </span>
                                            <span className="rounded-full bg-fuchsia-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-100">
                                                Social event ecosystem
                                            </span>
                                        </div>
                                        <h1 className="dashboard-display mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                            Your week now has a live event pulse, a social memory, and a next move.
                                        </h1>
                                        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                                            Recommendations, joined tickets, upcoming plans, trending crowd picks, and recent event rabbit holes all live in one place.
                                        </p>

                                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                            <div className="rounded-[24px] bg-white/8 px-4 py-4">
                                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Joined events</p>
                                                <p className="mt-2 text-2xl font-bold text-white">{joinedEvents.length}</p>
                                            </div>
                                            <div className="rounded-[24px] bg-white/8 px-4 py-4">
                                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Recommendations</p>
                                                <p className="mt-2 text-2xl font-bold text-white">{recommendedEvents.length}</p>
                                            </div>
                                            <div className="rounded-[24px] bg-white/8 px-4 py-4">
                                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Recently viewed</p>
                                                <p className="mt-2 text-2xl font-bold text-white">{recentlyViewedEvents.length}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-[32px] border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                                        <img src={heroEvent.image} alt={heroEvent.title} className="h-52 w-full rounded-[24px] object-cover" />
                                        <div className="mt-5">
                                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">Tonight’s momentum</p>
                                            <h2 className="dashboard-display mt-3 text-2xl font-bold text-white">{heroEvent.title}</h2>
                                            <p className="mt-2 text-sm leading-6 text-slate-300">{heroEvent.highlight}</p>
                                            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                                <div className="rounded-[20px] bg-white/6 p-4">
                                                    <p className="text-slate-400">Date</p>
                                                    <p className="mt-2 font-semibold text-white">{formatDateChip(heroEvent.date)}</p>
                                                </div>
                                                <div className="rounded-[20px] bg-white/6 p-4">
                                                    <p className="text-slate-400">Host</p>
                                                    <p className="mt-2 font-semibold text-white">{heroEvent.host}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="grid gap-4 md:grid-cols-3">
                                <StatCard label="Upcoming Plans" value={upcomingJoinedEvents.length} note="Events already locked into your personal schedule." />
                                <StatCard label="Hosting" value={hostedEvents.length} note="Your creator-side events, private moments, and hosted social rooms." />
                                <StatCard label="Trending Watchlist" value={trendingEvents.length} note="Crowd heat from this week’s fastest-moving public events." />
                            </section>

                            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                                <div className="space-y-6">
                                    <section className="space-y-4">
                                        <SectionHeading
                                            eyebrow="Browse by vibe"
                                            title="Categories that already match your social pattern"
                                            description="Jump into the scenes that fit how you actually spend your week, then keep filtering from there."
                                        />
                                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                            {CATEGORY_OPTIONS.filter((category) => category !== 'All').map((category) => (
                                                <CategoryButton
                                                    key={category}
                                                    category={category}
                                                    active={categoryFilter === category}
                                                    onClick={() => setCategoryFilter(category)}
                                                />
                                            ))}
                                        </div>
                                    </section>

                                    <section className="panel p-6 sm:p-7">
                                        <SectionHeading
                                            eyebrow="Hub controls"
                                            title="Refine your dashboard"
                                            description="Filter the feed without losing the discovery layout you already have."
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

                                    <TrendingCarousel
                                        events={trendingEvents}
                                        activeIndex={activeTrendingIndex}
                                        onPrev={() => setTrendingIndex((current) => (current - 1 + trendingEvents.length) % Math.max(trendingEvents.length, 1))}
                                        onNext={() => setTrendingIndex((current) => (current + 1) % Math.max(trendingEvents.length, 1))}
                                        onOpen={openEvent}
                                        onPrimaryAction={handlePrimaryAction}
                                        joinedEventIds={joinedEventIds}
                                    />

                                    <section id="recommended-events" className="space-y-4">
                                        <SectionHeading
                                            eyebrow="Personalized picks"
                                            title="Recommended for your current event taste"
                                            description="These lean toward the categories and hosts you already show up for."
                                        />
                                        <div className="grid gap-4 lg:grid-cols-2">
                                            {recommendedEvents.length === 0 ? (
                                                <EmptyState
                                                    title="No recommendations match those filters."
                                                    description="Reset your filters or search another keyword to reopen the recommendation feed."
                                                />
                                            ) : (
                                                recommendedEvents.map((event) => (
                                                    <EventCard
                                                        key={event.id}
                                                        event={event}
                                                        joined={joinedEventIds.includes(event.id)}
                                                        onOpen={() => openEvent(event.id)}
                                                        onPrimaryAction={() => handlePrimaryAction(event)}
                                                        badgeLabel="Recommended"
                                                    />
                                                ))
                                            )}
                                        </div>
                                    </section>

                                    <section id="featured-events" className="space-y-4">
                                        <SectionHeading
                                            eyebrow="Featured events"
                                            title="High-traction public events"
                                            description="The discovery layer remains intact here, now sitting inside the personal hub."
                                        />
                                        <div className="grid gap-4 lg:grid-cols-2">
                                            {featuredEvents.length === 0 ? (
                                                <EmptyState
                                                    title="No featured events match the current filters."
                                                    description="Try another category or date range to bring featured listings back."
                                                />
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
                                            eyebrow="Upcoming events"
                                            title="What’s next in your discovery feed"
                                            description="Fresh listings across music, sports, seminars, food, arts, and community."
                                        />
                                        <div className="grid gap-4 lg:grid-cols-2">
                                            {upcomingEvents.length === 0 ? (
                                                <EmptyState
                                                    title="No upcoming events match the current filters."
                                                    description="Broaden the search or reset the date chips to see more upcoming options."
                                                />
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
                                                <p className="text-slate-400">Recent</p>
                                                <p className="mt-2 text-xl font-bold text-white">{recentlyViewedEvents.length}</p>
                                            </div>
                                            <div className="rounded-[20px] bg-white/8 p-4">
                                                <p className="text-slate-400">Trending</p>
                                                <p className="mt-2 text-xl font-bold text-white">{trendingEvents.length}</p>
                                            </div>
                                        </div>
                                    </section>

                                    <section id="joined-events" className="panel p-6">
                                        <SectionHeading eyebrow="Joined events" title="Tickets already in your pocket" />
                                        <div className="mt-5 space-y-3">
                                            {joinedEvents.map((event) => (
                                                <CompactEventItem
                                                    key={event.id}
                                                    event={event}
                                                    badge={event.ticketStatus}
                                                    actionLabel={formatEventDate(event.date)}
                                                    onOpen={() => openEvent(event.id)}
                                                />
                                            ))}
                                        </div>
                                    </section>

                                    <section id="upcoming-joined" className="panel p-6">
                                        <SectionHeading eyebrow="Upcoming" title="Your next confirmations" />
                                        <div className="mt-5 space-y-3">
                                            {upcomingJoinedEvents.length === 0 ? (
                                                <EmptyState
                                                    title="No upcoming joined events."
                                                    description="Free joins and paid tickets will appear here as soon as you add them."
                                                />
                                            ) : (
                                                upcomingJoinedEvents.map((event) => (
                                                    <CompactEventItem
                                                        key={event.id}
                                                        event={event}
                                                        badge="On your schedule"
                                                        actionLabel={event.location}
                                                        onOpen={() => openEvent(event.id)}
                                                    />
                                                ))
                                            )}
                                        </div>
                                    </section>

                                    <section id="recently-viewed" className="panel p-6">
                                        <SectionHeading eyebrow="Recently viewed" title="Events you circled back to" />
                                        <div className="mt-5 space-y-3">
                                            {recentlyViewedEvents.map((event) => (
                                                <CompactEventItem
                                                    key={event.id}
                                                    event={event}
                                                    badge="Recent view"
                                                    actionLabel={event.host}
                                                    onOpen={() => openEvent(event.id)}
                                                />
                                            ))}
                                        </div>
                                    </section>

                                    <section id="my-events" className="panel p-6">
                                        <SectionHeading eyebrow="Hosting" title="Events you are organizing" />
                                        <div className="mt-5 space-y-3">
                                            {hostedEvents.map((event) => (
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
                                </aside>
                            </div>
                        </>
                    )}
                </main>
            </div>

            <FloatingCreateButton />
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
