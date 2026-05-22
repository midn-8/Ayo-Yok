import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

import { EVENTS, ORGANIZERS, SOCIAL_POSTS, compareEventDates, getEventById, getInitials, getOrganizerById } from './social-hub/mockData';
import { classNames, formatEventDate, formatPrice, Icon } from './social-hub/ui';
import { logoAyoyok } from './brand-assets';

const { StrictMode, useEffect, useMemo, useRef } = React;

const HERO_FALLBACK_IMAGE =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC7pN8MowN9_EOkZuKYceGz0XWunuXHIYyD6Kb4Bwwvpfh1uOKkt0ZMz-8fD03XBxoOsoX55EC1N926nvX7quzvS4HlRpcx_6f8IobIwFTmYeVjiuV58W94cU5Y5NLnY8dkd5rhWtnQHFsMh4WwGw1HKcIYP4pz94n3xzOJBRDdo8sN4hVDBPT_FfKuLqkTK6UeKxJE-Zn2D4RUJVgMcUByIv__Ot57UhYriU5MyGR8cupImUIU2N2kAhSypBAkG8ii9Q6V3H-19UPc';

const GALLERY_IMAGES = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC7pN8MowN9_EOkZuKYceGz0XWunuXHIYyD6Kb4Bwwvpfh1uOKkt0ZMz-8fD03XBxoOsoX55EC1N926nvX7quzvS4HlRpcx_6f8IobIwFTmYeVjiuV58W94cU5Y5NLnY8dkd5rhWtnQHFsMh4WwGw1HKcIYP4pz94n3xzOJBRDdo8sN4hVDBPT_FfKuLqkTK6UeKxJE-Zn2D4RUJVgMcUByIv__Ot57UhYriU5MyGR8cupImUIU2N2kAhSypBAkG8ii9Q6V3H-19UPc',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDsvUXVxu44HydnsCT9G_0dbXgxflCMTVoPBZgizxnnQ04uY9yD0wdo_CQebdmo8GDtpg0uiyH5a24cJTVl6CU3cbF-60ZiMRIuY-hi8gzWKMk74NaPgNn7BlstVFhfONgmt4K7muwE6RyvCHzMQHl9L5tuDbfa21a1Dlws7hKUGjkqjiRUi9-YcMBX13M0avH7GxWA-W55mPb90Mg29qKYR6mG7m7nQiUyoCrXZtnps6diOAm0_0hjHwbFlhKFv4Lh-SMlkJRjWuOP',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDh0DFh8GLZBp3m7aJw5XbmwfRGHhw90FrixMdCsKvktESAY-JtlmE8SfjvYKCjgMxXFGc6hcEjzt0Ef7Y7DxVXQAfY2bzG0D6cPiikwYjTvwVGVeBzvZqFRIltqoNsrNDYyxaW3ho60XOyQnH6TjcEPZIFYpbz30SXynzsy2XI30cMJuibwAEuBtMFTLFPubNT4gZEIcVcjwCsFMWUR5I0Hs0vJieHkvp8LCWxlk_7HPWcXEhdI_lJHpl_EJ0PdJqrk9ZAG4hl6H7q',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAgfvvgLU4R5y2sDWHMvutHNFawkejZ1i0I08W8mQmLgkCarF4a4ypV7NnTQ1YKec05IJvG5ler6k4uUMlutWh3v7SLmS_vmvTjaN2aOIe3loJrNw0p2RKNfgHP6OJC7inS3vA1shhfGL8uxYlj5Y9ad4YqZahsDT1_0Ay2NNAA5Bv-944tOe_qALCkl7TWyAFbU2KRGHNTE_TOSFemUBGPgD6QO0dnzA8rm7jgbGm1YOBodFvOwr_rofuqCo0szAH79ffj9Lj4BM_Y',
];

const CATEGORY_TO_ORGANIZER = {
    Music: 'org-soundwave',
    Seminar: 'org-creator-circle',
    Sports: 'org-stride-club',
    Food: 'org-ayoyok-eats',
    Arts: 'org-studio-pagi',
    Community: 'org-urban-roots',
};

const CATEGORY_TAG_STYLES = {
    Music: 'bg-[#1a2742] text-[#9fb3ff]',
    Seminar: 'bg-[#1c3559] text-[#9fd8ff]',
    Sports: 'bg-[#173728] text-[#8fe0b3]',
    Food: 'bg-[#2d2116] text-[#f5b586]',
    Arts: 'bg-[#251a35] text-[#ceb0ff]',
    Community: 'bg-[#2b1825] text-[#ff9db9]',
};

const LOCATION_BY_CATEGORY = {
    Music: 'The Glass Atrium, Senayan Gardens',
    Seminar: 'Kuningan Commons, Jakarta',
    Sports: 'GBK Pavilion, Jakarta',
    Food: 'Pantai Indah Social Hall, Jakarta',
    Arts: 'Kemang Atelier House, Jakarta',
    Community: 'Urban Roots Hall, Jakarta',
};

function selectVisualImage(event, fallbackIndex = 0) {
    if (event?.image && !String(event.image).startsWith('data:image/svg+xml')) {
        return event.image;
    }

    return GALLERY_IMAGES[fallbackIndex % GALLERY_IMAGES.length] || HERO_FALLBACK_IMAGE;
}

function MaterialIcon({ name, className = '' }) {
    return (
        <span aria-hidden="true" className={classNames('material-symbols-outlined leading-none', className)}>
            {name}
        </span>
    );
}

function inferCategoryFromText(text) {
    const normalized = String(text || '').toLowerCase();

    if (normalized.includes('music') || normalized.includes('jazz') || normalized.includes('concert')) {
        return 'Music';
    }

    if (normalized.includes('seminar') || normalized.includes('tech') || normalized.includes('talk')) {
        return 'Seminar';
    }

    if (normalized.includes('sport') || normalized.includes('run') || normalized.includes('fitness')) {
        return 'Sports';
    }

    if (normalized.includes('food') || normalized.includes('dinner') || normalized.includes('culinary')) {
        return 'Food';
    }

    if (normalized.includes('art') || normalized.includes('gallery') || normalized.includes('film')) {
        return 'Arts';
    }

    return 'Community';
}

function buildFallbackEvent(rawEvent) {
    const category = inferCategoryFromText(`${rawEvent.title} ${rawEvent.description}`);
    const organizerId = CATEGORY_TO_ORGANIZER[category];
    const organizer = getOrganizerById(organizerId) || ORGANIZERS[0];
    const location = LOCATION_BY_CATEGORY[category] || 'The Glass Atrium, Jakarta';

    return {
        id: String(rawEvent.id || 'fallback-event'),
        title: rawEvent.title || 'City Afterglow Gathering',
        description: rawEvent.description || 'A curated social evening built for conversation, warm light, and a memorable shared atmosphere.',
        price: Number(rawEvent.price) || 0,
        category,
        date: '2026-06-24T19:00:00',
        endsAt: '2026-06-24T23:30:00',
        location,
        attendees: category === 'Music' ? 120 : 84,
        featured: true,
        trending: true,
        joined: false,
        hostedByUser: false,
        recentlyViewed: false,
        host: organizer?.name || 'AyoYok Host Circle',
        organizerId: organizer?.id || ORGANIZERS[0]?.id,
        highlight: rawEvent.description || 'Big outdoor concert',
        perks: ['Digital access pass', 'Curated welcome drink', 'Community memory wall'],
        keywords: [category.toLowerCase(), 'social', 'community', 'curated'],
        image: HERO_FALLBACK_IMAGE,
    };
}

function resolveEvent(rawEvent) {
    const normalizedId = String(rawEvent.id || '');
    const byId = getEventById(normalizedId);

    const hasValidPrice = rawEvent.price !== null && rawEvent.price !== undefined && rawEvent.price !== '' && Number.isFinite(Number(rawEvent.price));

    if (byId) {
        return {
            ...byId,
            title: rawEvent.title && rawEvent.title !== 'Music Festival' ? rawEvent.title : byId.title,
            description: rawEvent.description && rawEvent.description !== 'Big outdoor concert' ? rawEvent.description : byId.description,
            price: hasValidPrice ? Number(rawEvent.price) : byId.price,
        };
    }

    const byTitle = EVENTS.find((event) => event.title.toLowerCase() === String(rawEvent.title || '').toLowerCase());

    if (byTitle) {
        return {
            ...byTitle,
            price: hasValidPrice ? Number(rawEvent.price) : byTitle.price,
            description: rawEvent.description || byTitle.description,
        };
    }

    return buildFallbackEvent(rawEvent);
}

function buildAttendeePreview(event, organizer, storyPosts) {
    const attendeeMap = new Map();

    if (organizer) {
        attendeeMap.set(`organizer-${organizer.id}`, {
            id: `organizer-${organizer.id}`,
            name: organizer.name,
            handle: organizer.handle,
            avatar: organizer.avatar,
            tag: 'Host circle',
        });
    }

    storyPosts.forEach((post) => {
        attendeeMap.set(post.id, {
            id: post.id,
            name: post.userName,
            handle: post.handle,
            avatar: post.avatar,
            tag: 'Story drop',
        });
    });

    ORGANIZERS.filter((item) => item.id !== organizer?.id)
        .slice(0, 3)
        .forEach((item, index) => {
            attendeeMap.set(`guest-${item.id}-${index}`, {
                id: `guest-${item.id}-${index}`,
                name: item.name,
                handle: item.handle,
                avatar: item.avatar,
                tag: 'Mutual vibe',
            });
        });

    return Array.from(attendeeMap.values()).slice(0, 6);
}

function SectionHeader({ eyebrow, title, description, action }) {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7e8eaa]">{eyebrow}</p>
                <h2 className="editorial-display mt-3 text-[30px] font-semibold leading-[1.15] text-[#e8eefc] sm:text-[36px]">{title}</h2>
                {description ? <p className="mt-3 max-w-2xl text-sm leading-7 text-[#a8b4cc] sm:text-base">{description}</p> : null}
            </div>
            {action}
        </div>
    );
}

function StoryCard({ post, event }) {
    const visual = selectVisualImage(event, 2);

    return (
        <article className="story-frame overflow-hidden rounded-[30px] border border-[#25324d]/70 bg-[#111b31]/80">
            <img alt={event.title} className="h-56 w-full object-cover" src={visual} />
            <div className="space-y-4 p-6">
                <div className="flex items-center gap-3">
                    <img alt={post.userName} className="h-12 w-12 rounded-full object-cover" src={post.avatar} />
                    <div>
                        <p className="text-sm font-semibold text-[#e8eefc]">{post.userName}</p>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#7e8eaa]">{post.timeAgo}</p>
                    </div>
                </div>
                <p className="text-sm leading-7 text-[#a8b4cc]">{post.caption}</p>
                <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7e8eaa]">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#101a30] px-3 py-2">
                        <Icon name="heart" className="h-4 w-4" />
                        {post.likes}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#101a30] px-3 py-2">
                        <Icon name="comment" className="h-4 w-4" />
                        {post.comments}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#101a30] px-3 py-2">
                        <Icon name="calendar" className="h-4 w-4" />
                        {event.category}
                    </span>
                </div>
            </div>
        </article>
    );
}

function RelatedEventCard({ event }) {
    const visual = selectVisualImage(event, 1);

    return (
        <a
            href={`/events/${event.id}`}
            className="group block min-w-[290px] overflow-hidden rounded-[28px] border border-[#25324d]/70 bg-[#101a30]/82 transition hover:-translate-y-1 hover:shadow-[0_28px_60px_-34px_rgba(94,80,176,0.28)]"
        >
            <img alt={event.title} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" src={visual} />
            <div className="p-5">
                <div className="flex items-center justify-between gap-4">
                    <span className={classNames('rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]', CATEGORY_TAG_STYLES[event.category] || CATEGORY_TAG_STYLES.Community)}>
                        {event.category}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7e8eaa]">{formatPrice(event.price)}</span>
                </div>
                <h3 className="editorial-display mt-4 text-[24px] font-semibold leading-[1.2] text-[#e8eefc]">{event.title}</h3>
                <p className="mt-2 text-sm text-[#a8b4cc]">{formatEventDate(event.date)}</p>
                <p className="mt-1 text-sm text-[#7e8eaa]">{event.location}</p>
            </div>
        </a>
    );
}

function EventDetailPage({ userName, userUsername, userEmail, rawEvent, joinUrl, paymentUrl, backUrl, csrfToken }) {
    const joinFormRef = useRef(null);

    const event = useMemo(() => resolveEvent(rawEvent), [rawEvent]);
    const organizer = useMemo(() => getOrganizerById(event.organizerId) || ORGANIZERS[0], [event.organizerId]);
    const organizerEvents = useMemo(
        () => EVENTS.filter((item) => item.organizerId === organizer?.id && item.id !== event.id).sort(compareEventDates).slice(0, 3),
        [event.id, organizer?.id],
    );

    const storyPosts = useMemo(() => {
        const exactMatches = SOCIAL_POSTS.filter((post) => post.eventId === event.id);

        if (exactMatches.length > 0) {
            return exactMatches.slice(0, 3);
        }

        const categoryMatches = SOCIAL_POSTS.filter((post) => {
            const postEvent = getEventById(post.eventId);
            return postEvent?.category === event.category;
        });

        return categoryMatches.length > 0 ? categoryMatches.slice(0, 3) : SOCIAL_POSTS.slice(0, 3);
    }, [event.category, event.id]);

    const attendeePreview = useMemo(() => buildAttendeePreview(event, organizer, storyPosts), [event, organizer, storyPosts]);

    const relatedEvents = useMemo(() => {
        const sameCategory = EVENTS.filter((item) => item.id !== event.id && item.category === event.category).sort(compareEventDates);

        if (sameCategory.length >= 4) {
            return sameCategory.slice(0, 4);
        }

        const fallback = EVENTS.filter((item) => item.id !== event.id && !sameCategory.some((sameItem) => sameItem.id === item.id)).sort(compareEventDates);
        return [...sameCategory, ...fallback].slice(0, 4);
    }, [event.category, event.id]);

    const heroVisual = selectVisualImage(event, 0);
    const galleryImages = [heroVisual, event.image, ...GALLERY_IMAGES].filter(Boolean).slice(0, 4);
    const mutualCount = Math.max(Math.round(event.attendees / 24), 6);
    const remainingSeats = Math.max(Math.round(event.attendees / 10), 12);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;
    const displayHandle = userUsername || `@${String(userName || 'ayoyok-user').trim().toLowerCase().replace(/\s+/g, '-')}`;
    const aboutCopy = [
        event.description,
        `${event.host} is shaping this experience around ${event.category.toLowerCase()} energy, tactile atmosphere, and the kind of social pacing that feels curated instead of crowded.`,
    ];

    useEffect(() => {
        document.title = `${event.title} | AyoYok`;
    }, [event.title]);

    function scrollToStories() {
        const element = document.getElementById('event-stories');

        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function triggerJoin() {
        joinFormRef.current?.requestSubmit();
    }

    return (
        <div className="event-memory-shell editorial-copy min-h-screen bg-[#050b17] pb-28 text-[#e8eefc] selection:bg-[#1a2742] selection:text-[#9fb3ff] md:pb-0">
            <header className="fixed inset-x-0 top-0 z-50 border-b border-[#25324d]/55 bg-[rgba(8,13,27,0.82)] backdrop-blur-md shadow-[0_12px_30px_-24px_rgba(94,80,176,0.35)]">
                <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-4 lg:px-8">
                    <div className="flex items-center gap-8">
                        <a href="/dashboard" className="flex items-center gap-3">
                            <img
                                src={logoAyoyok}
                                alt="AyoYok"
                                className="h-11 w-auto rounded-xl border border-[#25324d]/75 bg-[#111b31]/90 p-1 shadow-[0_16px_28px_-18px_rgba(94,80,176,0.65)]"
                            />
                            <p className="hidden text-xs text-[#7e8eaa] sm:block">Event memory page</p>
                        </a>

                        <nav className="hidden items-center gap-6 md:flex">
                            <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/dashboard">
                                Home
                            </a>
                            <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/explore">
                                Explore
                            </a>
                            <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/schedule">
                                Calendar
                            </a>
                            <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/profile">
                                Profile
                            </a>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href={backUrl}
                            className="hidden rounded-full border border-[#25324d]/70 bg-[#111b31]/75 px-4 py-2 text-sm font-semibold text-[#a8b4cc] transition hover:border-[#8ea2ff] hover:text-[#8ea2ff] md:inline-flex"
                        >
                            Back to public events
                        </a>
                        <a
                            href="/profile"
                            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#3e5996] bg-[#101a30] text-sm font-bold text-[#8ea2ff]"
                            title={`${userName} ${displayHandle}`}
                        >
                            {getInitials(userName)}
                        </a>
                    </div>
                </div>
            </header>

            <main className="pt-24">
                <div className="mx-auto max-w-[1240px] px-5 pb-16 lg:px-8">
                    <section className="hero-haze relative overflow-hidden rounded-[36px]">
                        <img alt={event.title} className="h-[640px] w-full object-cover" src={heroVisual} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute right-6 top-6 rounded-[24px] bg-[#111b31]/88 p-4 text-center shadow-[0_18px_36px_-24px_rgba(28,27,33,0.45)] sm:right-8 sm:top-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8ea2ff]">
                                {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(event.date))}
                            </p>
                            <p className="editorial-display mt-1 text-[32px] font-bold leading-none text-[#e8eefc]">
                                {new Date(event.date).getDate()}
                            </p>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10 lg:p-12">
                            <div className="max-w-4xl">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className={classNames('rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]', CATEGORY_TAG_STYLES[event.category] || CATEGORY_TAG_STYLES.Community)}>
                                        {event.category}
                                    </span>
                                    <span className="rounded-full bg-[#101a30]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                                        Curated memory page
                                    </span>
                                    <span className="rounded-full bg-[#101a30]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                                        Hosted by {event.host}
                                    </span>
                                </div>

                                <h1 className="editorial-display mt-6 text-[42px] font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-[56px] lg:text-[68px]">
                                    {event.title}
                                </h1>
                                <p className="mt-5 max-w-2xl text-base leading-8 text-white/86 sm:text-lg">{event.highlight || event.description}</p>

                                <div className="mt-7 grid gap-4 sm:grid-cols-3">
                                    <div className="glass-card rounded-[24px] border border-[#25324d]/20 p-4 text-white">
                                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Date & time</p>
                                        <p className="mt-2 text-sm font-semibold">{formatEventDate(event.date)}</p>
                                    </div>
                                    <div className="glass-card rounded-[24px] border border-[#25324d]/20 p-4 text-white">
                                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Location</p>
                                        <p className="mt-2 text-sm font-semibold">{event.location}</p>
                                    </div>
                                    <div className="glass-card rounded-[24px] border border-[#25324d]/20 p-4 text-white">
                                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">Attendees</p>
                                        <p className="mt-2 text-sm font-semibold">{event.attendees.toLocaleString()} in the room</p>
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-wrap gap-4">
                                    <button
                                        type="button"
                                        onClick={triggerJoin}
                                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8ea2ff] px-8 py-4 text-sm font-semibold text-white shadow-[0_24px_48px_-26px_rgba(94,80,176,0.95)] transition hover:-translate-y-0.5 hover:bg-[#5343a8]"
                                    >
                                        Join & continue
                                        <Icon name="ticket" className="h-4 w-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={scrollToStories}
                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25324d]/30 bg-[#101a30]/12 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-[#172742]/65"
                                    >
                                        See guest memories
                                        <Icon name="arrow" className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
                        <div className="space-y-14">
                            <section id="event-vibe-gallery" className="space-y-8">
                                <SectionHeader
                                    eyebrow="Event vibe gallery"
                                    title="An editorial collage of what this night is meant to feel like."
                                    description="Layered frames, ambient memory previews, and a scrapbook rhythm that lets the event breathe before the ticket step."
                                />

                                <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
                                    <div className="polaroid-card scrapbook-tape relative rounded-[30px] bg-[#101a30] p-4">
                                        <img alt={event.title} className="h-[380px] w-full rounded-[24px] object-cover" src={galleryImages[0]} />
                                        <div className="px-3 pb-2 pt-5">
                                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7e8eaa]">Pinned to the moodboard</p>
                                            <p className="mt-2 max-w-xl text-sm leading-7 text-[#a8b4cc]">
                                                Warm light, slow entrances, an art-directed crowd, and just enough mystery to make the room feel cinematic.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                                        {galleryImages.slice(1).map((image, index) => (
                                            <div
                                                key={image}
                                                className={classNames(
                                                    'polaroid-card relative rounded-[28px] bg-[#101a30] p-3',
                                                    index === 0 ? 'rotate-[-2deg]' : index === 1 ? 'rotate-[2deg]' : 'rotate-[-1deg]',
                                                )}
                                            >
                                                <div className="scrapbook-tape absolute inset-x-0 top-0 z-10" />
                                                <img alt={`${event.title} memory ${index + 1}`} className="h-40 w-full rounded-[22px] object-cover sm:h-48" src={image} />
                                                <div className="px-2 pb-1 pt-4">
                                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8ea2ff]">
                                                        {index === 0 ? 'Arrival frame' : index === 1 ? 'Detail capture' : 'Afterglow'}
                                                    </p>
                                                    <p className="mt-2 text-sm leading-6 text-[#a8b4cc]">
                                                        {index === 0
                                                            ? 'Guests settle in before the room starts humming.'
                                                            : index === 1
                                                              ? 'Textures, tablescapes, and the little moments people post first.'
                                                              : 'The kind of scene that ends up living in everyone’s camera roll.'}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            <section id="about-event" className="space-y-8">
                                <SectionHeader
                                    eyebrow="About the event"
                                    title="Social storytelling, not just logistics."
                                    description="This section keeps the event information intact while presenting it with more emotional pacing and editorial whitespace."
                                />

                                <div className="grid gap-6 lg:grid-cols-[1fr_0.82fr]">
                                    <div className="glass-card rounded-[32px] border border-[#25324d]/70 p-7">
                                        <div className="space-y-5 text-base leading-8 text-[#a8b4cc]">
                                            {aboutCopy.map((paragraph) => (
                                                <p key={paragraph}>{paragraph}</p>
                                            ))}
                                        </div>
                                        <div className="mt-8 flex flex-wrap gap-3">
                                            {event.perks.map((perk) => (
                                                <span
                                                    key={perk}
                                                    className="rounded-full border border-[#d9d2e3] bg-[#111b31]/80 px-4 py-2 text-sm font-semibold text-[#a8b4cc]"
                                                >
                                                    {perk}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid gap-4">
                                        <div className="rounded-[28px] bg-[#312f36] p-6 text-white shadow-[0_24px_60px_-34px_rgba(49,47,54,0.65)]">
                                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">Memory cue</p>
                                            <p className="editorial-display mt-3 text-[28px] font-semibold leading-[1.18]">{event.highlight}</p>
                                        </div>
                                        <div className="glass-card rounded-[28px] border border-[#25324d]/70 p-6">
                                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7e8eaa]">Quick details</p>
                                            <div className="mt-4 space-y-4">
                                                <div className="flex items-center gap-3 text-sm text-[#a8b4cc]">
                                                    <Icon name="calendar" className="h-4 w-4 text-[#8ea2ff]" />
                                                    <span>{formatEventDate(event.date)}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-[#a8b4cc]">
                                                    <Icon name="map" className="h-4 w-4 text-[#8ea2ff]" />
                                                    <span>{event.location}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-[#a8b4cc]">
                                                    <Icon name="people" className="h-4 w-4 text-[#8ea2ff]" />
                                                    <span>{mutualCount}+ mutual attendees in adjacent circles</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section id="attendee-preview" className="space-y-8">
                                <SectionHeader
                                    eyebrow="Attendee preview"
                                    title="The people layer gives the page its social gravity."
                                    description="Profile circles, mutual faces, and a soft hint of the community already gathering around the event."
                                />

                                <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
                                    <div className="glass-card rounded-[32px] border border-[#25324d]/70 p-6">
                                        <div className="flex -space-x-4">
                                            {attendeePreview.slice(0, 5).map((attendee) => (
                                                <img
                                                    key={attendee.id}
                                                    alt={attendee.name}
                                                    className="h-16 w-16 rounded-full border-4 border-[#050b17] object-cover"
                                                    src={attendee.avatar}
                                                />
                                            ))}
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#050b17] bg-[#1a2742] text-sm font-bold text-[#9fb3ff]">
                                                +{mutualCount}
                                            </div>
                                        </div>
                                        <h3 className="editorial-display mt-6 text-[26px] font-semibold text-[#e8eefc]">A room with familiar energy.</h3>
                                        <p className="mt-3 text-sm leading-7 text-[#a8b4cc]">
                                            {mutualCount} mutual or adjacent attendees overlap with the kinds of events you already join, save, and talk about.
                                        </p>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                        {attendeePreview.map((attendee) => (
                                            <article key={attendee.id} className="rounded-[26px] border border-[#25324d]/70 bg-[#101a30]/82 p-5">
                                                <img alt={attendee.name} className="h-14 w-14 rounded-full object-cover" src={attendee.avatar} />
                                                <p className="mt-4 text-sm font-semibold text-[#e8eefc]">{attendee.name}</p>
                                                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#7e8eaa]">{attendee.handle}</p>
                                                <span className="mt-4 inline-flex rounded-full bg-[#101a30] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8ea2ff]">
                                                    {attendee.tag}
                                                </span>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            <section id="event-stories" className="space-y-8">
                                <SectionHeader
                                    eyebrow="Reviews & stories"
                                    title="Social posts, reactions, and the memory trail around the event."
                                    description="An Instagram-style layer pulled from the existing social post data, styled to feel closer to a memory journal than a utility feed."
                                />

                                <div className="grid gap-6 lg:grid-cols-3">
                                    {storyPosts.map((post) => (
                                        <StoryCard key={post.id} post={post} event={getEventById(post.eventId) || event} />
                                    ))}
                                </div>
                            </section>

                            <section id="organizer-section" className="space-y-8">
                                <SectionHeader
                                    eyebrow="Organizer"
                                    title="Who is shaping the room."
                                    description="Organizer identity, follower scale, and a quick look at what else they are curating."
                                />

                                <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
                                    <div className="glass-card rounded-[32px] border border-[#25324d]/70 p-7">
                                        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                                            <img alt={organizer.name} className="h-24 w-24 rounded-[28px] object-cover shadow-[0_20px_40px_-24px_rgba(28,27,33,0.3)]" src={organizer.avatar} />
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <h3 className="editorial-display text-[30px] font-semibold text-[#e8eefc]">{organizer.name}</h3>
                                                    {organizer.verified ? (
                                                        <span className="rounded-full bg-[#312f36] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                                                            Verified
                                                        </span>
                                                    ) : null}
                                                </div>
                                                <p className="mt-2 text-sm font-semibold text-[#8ea2ff]">{organizer.handle}</p>
                                                <p className="mt-4 text-sm leading-7 text-[#a8b4cc]">{organizer.bio}</p>
                                            </div>
                                        </div>

                                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                            <div className="rounded-[24px] bg-[#111b31]/80 p-5 text-center">
                                                <p className="text-xs uppercase tracking-[0.18em] text-[#7e8eaa]">Followers</p>
                                                <p className="editorial-display mt-2 text-[28px] font-semibold text-[#e8eefc]">{organizer.followers.toLocaleString()}</p>
                                            </div>
                                            <div className="rounded-[24px] bg-[#111b31]/80 p-5 text-center">
                                                <p className="text-xs uppercase tracking-[0.18em] text-[#7e8eaa]">Hosted</p>
                                                <p className="editorial-display mt-2 text-[28px] font-semibold text-[#e8eefc]">{organizer.eventsHosted}</p>
                                            </div>
                                            <div className="rounded-[24px] bg-[#111b31]/80 p-5 text-center">
                                                <p className="text-xs uppercase tracking-[0.18em] text-[#7e8eaa]">Focus</p>
                                                <p className="editorial-display mt-2 text-[28px] font-semibold text-[#e8eefc]">{organizer.category}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-[32px] border border-[#25324d]/70 bg-[#101a30]/82 p-6">
                                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7e8eaa]">Other drops from this organizer</p>
                                        <div className="mt-5 space-y-4">
                                            {organizerEvents.map((organizerEvent) => (
                                                <a
                                                    key={organizerEvent.id}
                                                    href={`/events/${organizerEvent.id}`}
                                                    className="flex items-center gap-4 rounded-[24px] border border-[#25324d]/70 bg-[#111b31]/70 p-4 transition hover:-translate-y-0.5 hover:shadow-[0_22px_44px_-28px_rgba(94,80,176,0.35)]"
                                                >
                                                    <img alt={organizerEvent.title} className="h-20 w-20 rounded-[20px] object-cover" src={organizerEvent.image} />
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-semibold text-[#e8eefc]">{organizerEvent.title}</p>
                                                        <p className="mt-1 text-sm text-[#a8b4cc]">{formatEventDate(organizerEvent.date)}</p>
                                                        <p className="mt-1 truncate text-xs uppercase tracking-[0.18em] text-[#7e8eaa]">{organizerEvent.location}</p>
                                                    </div>
                                                    <MaterialIcon name="arrow_forward" className="text-[#7e8eaa]" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section id="related-events" className="space-y-8">
                                <SectionHeader
                                    eyebrow="Related events"
                                    title="If this is your vibe, these should already be on your radar."
                                    description="Horizontal immersive cards with the same editorial tone, still linking back into the existing event and payment flow."
                                />

                                <div className="flex gap-5 overflow-x-auto pb-3">
                                    {relatedEvents.map((relatedEvent) => (
                                        <RelatedEventCard key={relatedEvent.id} event={relatedEvent} />
                                    ))}
                                </div>
                            </section>
                        </div>

                        <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
                            <section className="glass-card rounded-[34px] border border-[#25324d]/70 p-7 shadow-[0_30px_70px_-40px_rgba(94,80,176,0.55)]">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8ea2ff]">Join / ticket</p>
                                <div className="mt-4 flex items-end gap-2">
                                    <p className="editorial-display text-[48px] font-bold leading-none text-[#e8eefc]">{formatPrice(event.price)}</p>
                                    <p className="pb-2 text-sm text-[#7e8eaa]">per person</p>
                                </div>

                                <div className="mt-6 grid gap-3">
                                    <div className="rounded-[24px] bg-[#111b31]/80 p-4">
                                        <p className="text-xs uppercase tracking-[0.18em] text-[#7e8eaa]">Attendee count</p>
                                        <p className="mt-2 text-sm font-semibold text-[#e8eefc]">{event.attendees.toLocaleString()} already interested</p>
                                    </div>
                                    <div className="rounded-[24px] bg-[#111b31]/80 p-4">
                                        <p className="text-xs uppercase tracking-[0.18em] text-[#7e8eaa]">Availability</p>
                                        <p className="mt-2 text-sm font-semibold text-[#e8eefc]">{remainingSeats} spots left in the current release</p>
                                    </div>
                                </div>

                                <form ref={joinFormRef} action={joinUrl} className="mt-6 space-y-3" method="POST">
                                    <input type="hidden" name="_token" value={csrfToken} />
                                    <button
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8ea2ff] px-5 py-4 text-sm font-semibold text-white shadow-[0_20px_44px_-26px_rgba(94,80,176,0.9)] transition hover:-translate-y-0.5 hover:bg-[#5343a8]"
                                        type="submit"
                                    >
                                        {event.price === 0 ? 'Join Event' : 'Join & Continue to Payment'}
                                        <Icon name="ticket" className="h-4 w-4" />
                                    </button>
                                </form>

                                <a
                                    href={paymentUrl}
                                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d1cbdb] bg-[#111b31]/80 px-5 py-4 text-sm font-semibold text-[#a8b4cc] transition hover:border-[#8ea2ff] hover:text-[#8ea2ff]"
                                >
                                    Open payment page
                                    <Icon name="arrow" className="h-4 w-4" />
                                </a>

                                <div className="mt-6 rounded-[24px] bg-[#312f36] p-5 text-white">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Authenticated checkout</p>
                                    <p className="mt-3 text-sm leading-7 text-white/78">
                                        The join form still posts to the existing protected Laravel route, and the payment flow continues through the same payment screen.
                                    </p>
                                </div>
                            </section>

                            <section className="overflow-hidden rounded-[34px] border border-[#25324d]/70 bg-[#101a30]/82">
                                <a href={mapUrl} target="_blank" rel="noreferrer" className="block">
                                    <div className="relative h-56 overflow-hidden">
                                        <img alt={event.location} className="h-full w-full object-cover" src={GALLERY_IMAGES[1]} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#8ea2ff]/45 to-transparent" />
                                        <div className="absolute bottom-4 left-4 rounded-full bg-[#101a30]/86 px-4 py-2 text-sm font-semibold text-[#8ea2ff] shadow-[0_16px_28px_-18px_rgba(28,27,33,0.4)]">
                                            Get directions
                                        </div>
                                    </div>
                                </a>
                                <div className="p-5">
                                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7e8eaa]">Venue mood</p>
                                    <p className="mt-2 text-sm font-semibold text-[#e8eefc]">{event.location}</p>
                                    <p className="mt-2 text-sm leading-7 text-[#a8b4cc]">
                                        Save the route, plan the entrance, and keep the night feeling intentional from the moment you leave home.
                                    </p>
                                </div>
                            </section>
                        </aside>
                    </div>
                </div>
            </main>

            <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-[22px] border-t border-[#25324d]/60 bg-[rgba(10,17,34,0.92)] px-4 py-3 shadow-[0_-8px_30px_-18px_rgba(94,80,176,0.28)] backdrop-blur-lg md:hidden">
                <a href="/dashboard" className="flex flex-col items-center justify-center px-5 py-1 text-[#a8b4cc]">
                    <MaterialIcon name="home" />
                    <span className="text-[11px] font-semibold">Home</span>
                </a>
                <a href="/explore" className="flex flex-col items-center justify-center rounded-full bg-[#1a2742] px-5 py-1 text-[#9fb3ff]">
                    <MaterialIcon name="explore" />
                    <span className="text-[11px] font-semibold">Explore</span>
                </a>
                <a href="/schedule" className="flex flex-col items-center justify-center px-5 py-1 text-[#a8b4cc]">
                    <MaterialIcon name="calendar_today" />
                    <span className="text-[11px] font-semibold">Calendar</span>
                </a>
                <a href="/profile" className="flex flex-col items-center justify-center px-5 py-1 text-[#a8b4cc]">
                    <MaterialIcon name="person" />
                    <span className="text-[11px] font-semibold">Profile</span>
                </a>
            </nav>

            <footer className="px-5 pb-16 pt-6 text-center text-xs font-medium uppercase tracking-[0.22em] text-[#7e8eaa] md:pb-10">
                Built on the same event route, now with a more immersive front-end memory layer. Reach out at {userEmail}.
            </footer>
        </div>
    );
}

const mountNode = document.getElementById('ayoyok-event-detail-root');

if (mountNode) {
    createRoot(mountNode).render(
        <StrictMode>
            <EventDetailPage
                backUrl={mountNode.dataset.backUrl || '/events/public'}
                csrfToken={mountNode.dataset.csrf || ''}
                joinUrl={mountNode.dataset.joinUrl || '#'}
                paymentUrl={mountNode.dataset.paymentUrl || '#'}
                rawEvent={{
                    description: mountNode.dataset.eventDescription || '',
                    id: mountNode.dataset.eventId || '',
                    price: mountNode.dataset.eventPrice,
                    title: mountNode.dataset.eventTitle || 'AyoYok Event',
                }}
                userEmail={mountNode.dataset.userEmail || 'hello@ayoyok.app'}
                userName={mountNode.dataset.userName || 'AyoYok User'}
                userUsername={mountNode.dataset.userUsername || '@ayoyok-user'}
            />
        </StrictMode>,
    );
}
