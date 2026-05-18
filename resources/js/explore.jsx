import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

import { BASE_DATE, CATEGORY_META, EVENTS, ORGANIZERS, SOCIAL_POSTS, compareEventDates, getEventById } from './social-hub/mockData';
import {
    classNames,
    EmptyState,
    EventCard,
    FilterChip,
    FloatingCreateButton,
    formatEventDate,
    Icon,
    OrganizerCard,
    SectionHeading,
    SocialPostCard,
    TopNavigation,
} from './social-hub/ui';

const { StrictMode, useEffect, useMemo, useRef, useState } = React;

const CATEGORY_OPTIONS = ['All', ...new Set(EVENTS.map((event) => event.category))];

function getWeekPreview() {
    return Array.from({ length: 7 }, (_, index) => {
        const date = new Date(BASE_DATE);
        date.setDate(BASE_DATE.getDate() + index);
        return date;
    });
}

function matchesEventQuery(event, query, categoryFilter) {
    const matchesQuery =
        query === '' ||
        [event.title, event.host, event.category, event.location, ...event.keywords].some((value) => value.toLowerCase().includes(query));
    const matchesCategory = categoryFilter === 'All' || event.category === categoryFilter;

    return matchesQuery && matchesCategory;
}

function CalendarPreview({ events, selectedDate, onSelectDate }) {
    const weekDays = getWeekPreview();

    return (
        <div className="panel p-6">
            <SectionHeading
                eyebrow="Calendar preview"
                title="Next seven days"
                description="A quick read on what is coming up before you dive into the feed."
            />

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
                {weekDays.map((date) => {
                    const dayEvents = events.filter((event) => new Date(event.date).toDateString() === date.toDateString());
                    const isSelected = selectedDate.toDateString() === date.toDateString();

                    return (
                        <button
                            key={date.toISOString()}
                            type="button"
                            onClick={() => onSelectDate(date)}
                            className={classNames(
                                'rounded-[24px] border px-4 py-4 text-left transition',
                                isSelected ? 'border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/15' : 'border-slate-200 bg-slate-50 hover:bg-white',
                            )}
                        >
                            <p className={classNames('text-xs font-semibold uppercase tracking-[0.24em]', isSelected ? 'text-slate-300' : 'text-slate-400')}>
                                {new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)}
                            </p>
                            <p className="dashboard-display mt-3 text-2xl font-bold">{date.getDate()}</p>
                                            <div className="mt-4 flex flex-wrap gap-1">
                                                {dayEvents.length === 0 ? (
                                                    <span className={classNames('text-xs', isSelected ? 'text-slate-400' : 'text-slate-500')}>No drops</span>
                                                ) : (
                                                    dayEvents.slice(0, 3).map((event) => (
                                                        <span key={event.id} className={classNames('h-2.5 w-2.5 rounded-full', CATEGORY_META[event.category].marker)} />
                                                    ))
                                                )}
                                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function HorizontalEventCard({ event, onJoin }) {
    return (
        <article className="min-w-[300px] rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)]">
            <img src={event.image} alt={event.title} className="h-44 w-full rounded-t-[28px] object-cover" />
            <div className="p-5">
                <h3 className="dashboard-display text-xl font-bold text-slate-950">{event.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{formatEventDate(event.date)}</p>
                <p className="mt-1 text-sm text-slate-500">{event.location}</p>
                <button
                    type="button"
                    onClick={() => onJoin(event)}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800"
                >
                    Join
                    <Icon name="arrow" className="h-4 w-4" />
                </button>
            </div>
        </article>
    );
}

function ExplorePage({ userName }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [visiblePosts, setVisiblePosts] = useState(4);
    const [selectedDate, setSelectedDate] = useState(BASE_DATE);
    const sentinelRef = useRef(null);

    const query = searchTerm.trim().toLowerCase();
    const sortedEvents = useMemo(() => EVENTS.slice().sort(compareEventDates), []);
    const upcomingEvents = sortedEvents.filter((event) => new Date(event.date) >= BASE_DATE);
    const feedEvents = upcomingEvents.slice(0, 8);

    const matchingEvents = sortedEvents.filter((event) => matchesEventQuery(event, query, categoryFilter));
    const matchingOrganizers = ORGANIZERS.filter((organizer) => {
        const haystack = [organizer.name, organizer.handle, organizer.bio, organizer.category].join(' ').toLowerCase();
        const matchesQuery = query === '' || haystack.includes(query);
        const matchesCategory = categoryFilter === 'All' || organizer.category === categoryFilter;
        return matchesQuery && matchesCategory;
    });

    const filteredPosts = SOCIAL_POSTS.filter((post) => {
        const event = getEventById(post.eventId);

        if (!event || !matchesEventQuery(event, query, categoryFilter)) {
            return false;
        }

        return query === '' || [post.userName, post.handle, post.caption, event.title, event.host].some((value) => value.toLowerCase().includes(query));
    });

    useEffect(() => {
        setVisiblePosts(4);
    }, [searchTerm, categoryFilter]);

    useEffect(() => {
        const node = sentinelRef.current;

        if (!node) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setVisiblePosts((current) => Math.min(current + 3, filteredPosts.length));
                }
            },
            { rootMargin: '160px' },
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [filteredPosts.length]);

    const selectedDateEvents = upcomingEvents.filter((event) => new Date(event.date).toDateString() === selectedDate.toDateString());

    function handleJoin(event) {
        window.location.href = `/payment/${event.id}`;
    }

    return (
        <div className="dashboard-shell min-h-screen">
            <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 sm:py-6">
                <TopNavigation
                    userName={userName}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    activePath="explore"
                    searchPlaceholder="Search by event name, organizer, category, or keyword"
                />

                <main className="mt-6 space-y-6">
                    <section className="panel-dark overflow-hidden p-6 sm:p-8">
                        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_420px]">
                            <div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                                        Explore feed
                                    </span>
                                    <span className="rounded-full bg-fuchsia-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-100">
                                        Social discovery
                                    </span>
                                </div>
                                <h1 className="dashboard-display mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                    Explore what people are joining, reviewing, and talking about right now.
                                </h1>
                                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                                    A calendar preview, scrollable event drops, organizer discovery, and a social feed all sit on one page.
                                </p>
                            </div>

                            <div className="rounded-[32px] border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">Search snapshot</p>
                                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                    <div className="rounded-[20px] bg-white/6 p-4">
                                        <p className="text-slate-400">Events</p>
                                        <p className="mt-2 text-2xl font-bold text-white">{matchingEvents.length}</p>
                                    </div>
                                    <div className="rounded-[20px] bg-white/6 p-4">
                                        <p className="text-slate-400">Organizers</p>
                                        <p className="mt-2 text-2xl font-bold text-white">{matchingOrganizers.length}</p>
                                    </div>
                                    <div className="rounded-[20px] bg-white/6 p-4">
                                        <p className="text-slate-400">Feed posts</p>
                                        <p className="mt-2 text-2xl font-bold text-white">{filteredPosts.length}</p>
                                    </div>
                                    <div className="rounded-[20px] bg-white/6 p-4">
                                        <p className="text-slate-400">Filter</p>
                                        <p className="mt-2 text-sm font-semibold text-white">{categoryFilter}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="panel p-6 sm:p-7">
                        <SectionHeading
                            eyebrow="Search system"
                            title="Advanced explore search"
                            description="Search across event names, organizer identities, categories, and event keywords without leaving the feed."
                        />

                        <div className="mt-6 flex flex-wrap gap-2">
                            {CATEGORY_OPTIONS.map((category) => (
                                <FilterChip
                                    key={category}
                                    label={category}
                                    active={categoryFilter === category}
                                    onClick={() => setCategoryFilter(category)}
                                />
                            ))}
                        </div>

                        <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
                            Showing <span className="font-semibold text-slate-950">{matchingEvents.length}</span> event results and{' '}
                            <span className="font-semibold text-slate-950">{matchingOrganizers.length}</span> organizer profiles for{' '}
                            <span className="font-semibold text-slate-950">{searchTerm || 'all searches'}</span>.
                        </div>
                    </section>

                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
                        <CalendarPreview events={upcomingEvents} selectedDate={selectedDate} onSelectDate={setSelectedDate} />

                        <section className="panel p-6">
                            <SectionHeading
                                eyebrow="Selected date"
                                title={new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(selectedDate)}
                                description="Tap a day in the preview calendar to see what is queued there."
                            />

                            <div className="mt-5 space-y-3">
                                {selectedDateEvents.length === 0 ? (
                                    <EmptyState
                                        title="Nothing scheduled here yet."
                                        description="Try another day in the preview to inspect that part of the week."
                                    />
                                ) : (
                                    selectedDateEvents.map((event) => (
                                        <button
                                            key={event.id}
                                            type="button"
                                            onClick={() => handleJoin(event)}
                                            className="w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:bg-white"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-950">{event.title}</p>
                                                    <p className="mt-1 text-sm text-slate-600">{formatEventDate(event.date)}</p>
                                                    <p className="mt-1 text-sm text-slate-500">{event.location}</p>
                                                </div>
                                                <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                                                    Join
                                                </span>
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>

                    <section className="panel p-6 sm:p-7">
                        <SectionHeading
                            eyebrow="Upcoming drops"
                            title="Horizontally scrollable event cards"
                            description="A quick swipeable strip of upcoming events with image, title, schedule, and fast join actions."
                        />

                        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
                            {feedEvents.map((event) => (
                                <HorizontalEventCard key={event.id} event={event} onJoin={handleJoin} />
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <SectionHeading
                            eyebrow="Result cards"
                            title="Event and organizer matches"
                            description="Search results include both public event cards and social organizer profiles."
                        />

                        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
                            <div className="space-y-4">
                                {matchingEvents.length === 0 ? (
                                    <EmptyState
                                        title="No event cards match that search."
                                        description="Try a broader keyword or switch categories to reopen the event feed."
                                    />
                                ) : (
                                    matchingEvents.slice(0, 6).map((event) => (
                                        <EventCard key={event.id} event={event} joined={event.joined} onPrimaryAction={() => handleJoin(event)} />
                                    ))
                                )}
                            </div>

                            <div className="space-y-4">
                                {matchingOrganizers.length === 0 ? (
                                    <EmptyState
                                        title="No organizer profiles match that search."
                                        description="Search by handle, host name, or category to find organizer profiles."
                                    />
                                ) : (
                                    matchingOrganizers.map((organizer) => <OrganizerCard key={organizer.id} organizer={organizer} />)
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <SectionHeading
                            eyebrow="Social feed"
                            title="Recent event reviews and social momentum"
                            description="An Instagram-style feed of event reactions, captions, and tagged public events."
                        />

                        <div className="grid gap-4 lg:grid-cols-2">
                            {filteredPosts.slice(0, visiblePosts).map((post) => (
                                <SocialPostCard key={post.id} post={post} />
                            ))}
                        </div>

                        {filteredPosts.length === 0 ? (
                            <EmptyState
                                title="No social feed posts match those filters."
                                description="Try another search term or reset the category chips to reload the social layer."
                            />
                        ) : null}

                        <div ref={sentinelRef} className="h-10" />

                        {visiblePosts < filteredPosts.length ? (
                            <div className="text-center text-sm font-semibold text-slate-500">Loading more social posts…</div>
                        ) : filteredPosts.length > 0 ? (
                            <div className="text-center text-sm font-semibold text-slate-500">You reached the end of the current social feed.</div>
                        ) : null}
                    </section>
                </main>
            </div>

            <FloatingCreateButton />
        </div>
    );
}

const mountNode = document.getElementById('ayoyok-explore-root');

if (mountNode) {
    createRoot(mountNode).render(
        <StrictMode>
            <ExplorePage userName={mountNode.dataset.userName || 'AyoYok User'} />
        </StrictMode>,
    );
}
