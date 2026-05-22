import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';

import './bootstrap';

import {
    BASE_DATE,
    EVENTS,
    USER_REVIEW_POSTS,
    compareEventDates,
    getInitials,
    getJoinedEvents,
    makeAvatarImage,
} from './social-hub/mockData';
import { classNames, formatEventDate, formatShortDate, LogoutButton } from './social-hub/ui';
import { logoAyoyok } from './brand-assets';

const { StrictMode, useMemo, useState } = React;

const CATEGORY_ACCENTS = {
    Music: 'text-[#c5b3ff]',
    Seminar: 'text-[#9fd8ff]',
    Sports: 'text-[#8fe0b3]',
    Food: 'text-[#f6be95]',
    Arts: 'text-[#d3beff]',
    Community: 'text-[#ffabc2]',
};

function MaterialIcon({ name, className = '' }) {
    return <span aria-hidden="true" className={classNames('material-symbols-outlined leading-none', className)}>{name}</span>;
}

function computeEventStatus(event) {
    const start = new Date(event.date);
    const end = new Date(event.endsAt || event.date);

    if (start > BASE_DATE) {
        return 'upcoming';
    }

    if (end >= BASE_DATE) {
        return 'ongoing';
    }

    return 'completed';
}

function canCreateMomentForEvent(event) {
    const status = computeEventStatus(event);
    return event.joined && (status === 'ongoing' || status === 'completed');
}

function parseMediaType(url) {
    const normalized = String(url || '').toLowerCase();
    if (normalized.endsWith('.mp4') || normalized.includes('.mp4?') || normalized.includes('video')) {
        return 'video';
    }

    return 'photo';
}

function buildInitialMoments(profile) {
    return USER_REVIEW_POSTS.map((review) => {
        const event = EVENTS.find((item) => item.id === review.eventId);

        if (!event) {
            return null;
        }

        return {
            id: review.id,
            eventId: event.id,
            eventTitle: event.title,
            category: event.category,
            media: event.image,
            mediaType: 'photo',
            caption: review.caption,
            createdAt: review.createdAt,
            username: profile.username,
            attendedVerified: true,
            musicSnippet: '',
            likes: review.likes,
        };
    }).filter(Boolean);
}

function ProfileNavigation({ userName }) {
    const displayHandle = `@${String(userName || 'ayoyok-user').trim().toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-[#25324d]/55 bg-[rgba(8,13,27,0.78)] backdrop-blur-md shadow-[0_12px_30px_-24px_rgba(94,80,176,0.35)]">
            <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-4 lg:px-8">
                <div className="flex items-center gap-8">
                    <a href="/dashboard" className="flex items-center gap-3">
                        <img
                            src={logoAyoyok}
                            alt="AyoYok"
                            className="h-11 w-auto rounded-xl border border-[#25324d]/75 bg-[#111b31]/90 p-1 shadow-[0_16px_28px_-18px_rgba(94,80,176,0.65)]"
                        />
                        <p className="hidden text-xs text-[#7e8eaa] sm:block">Private social archive</p>
                    </a>

                    <nav className="hidden items-center gap-6 md:flex">
                        <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/dashboard">Home</a>
                        <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/explore">Explore</a>
                        <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/schedule">Schedule</a>
                        <a className="border-b-2 border-[#8ea2ff] pb-1 text-sm font-semibold text-[#8ea2ff]" href="/profile">Profile</a>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <button type="button" className="rounded-full p-2 text-[#a8b4cc] transition hover:bg-[#111b31]/80 hover:text-[#8ea2ff]">
                        <MaterialIcon name="notifications" />
                    </button>
                    <LogoutButton />
                    <a href="/profile" className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#3e5996] bg-[#101a30] text-sm font-bold text-[#8ea2ff]" title={`${userName} ${displayHandle}`}>
                        {getInitials(userName)}
                    </a>
                </div>
            </div>
        </header>
    );
}

function CreateMomentModal({
    open,
    onClose,
    joinedEvents,
    eligibleEventIds,
    onCreate,
}) {
    const eligibleEvents = joinedEvents.filter((event) => eligibleEventIds.has(event.id));

    const [eventId, setEventId] = useState(eligibleEvents[0]?.id || '');
    const [caption, setCaption] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [musicSnippet, setMusicSnippet] = useState('');

    React.useEffect(() => {
        if (!open) {
            return;
        }

        setEventId(eligibleEvents[0]?.id || '');
        setCaption('');
        setMediaUrl('');
        setMusicSnippet('');
    }, [open, eligibleEvents]);

    function submit(event) {
        event.preventDefault();

        if (!eventId || !caption.trim() || !mediaUrl.trim()) {
            return;
        }

        onCreate({
            eventId,
            caption: caption.trim(),
            media: mediaUrl.trim(),
            mediaType: parseMediaType(mediaUrl),
            musicSnippet: musicSnippet.trim(),
        });

        onClose();
    }

    return (
        <AnimatePresence>
            {open ? (
                <>
                    <motion.div
                        className="fixed inset-0 z-[120] bg-[#020611]/72 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        className="fixed inset-x-4 top-1/2 z-[130] mx-auto w-full max-w-[620px] -translate-y-1/2 rounded-[28px] border border-[#25324d]/75 bg-[rgba(12,20,36,0.92)] p-6 shadow-[0_34px_80px_-40px_rgba(2,8,24,0.95)] backdrop-blur-xl sm:inset-x-0 sm:p-8"
                        initial={{ opacity: 0, y: 24, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.9 }}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8ea2ff]">Exclusive post flow</p>
                                <h2 className="editorial-display mt-2 text-[30px] font-semibold text-white">Create Moment</h2>
                                <p className="mt-2 text-sm text-[#a8b4cc]">Only available for events you joined and already attended (ongoing/completed).</p>
                            </div>
                            <button type="button" onClick={onClose} className="rounded-full p-2 text-[#8e9cb6] transition hover:bg-[#16253f] hover:text-white">
                                <MaterialIcon name="close" />
                            </button>
                        </div>

                        <form onSubmit={submit} className="mt-6 space-y-5">
                            <label className="block">
                                <span className="text-sm font-semibold text-[#d4ddf0]">Event</span>
                                <select
                                    value={eventId}
                                    onChange={(next) => setEventId(next.target.value)}
                                    className="mt-2 h-12 w-full rounded-2xl border border-[#1d2940] bg-[#101a30] px-4 text-sm text-[#e8eefc] outline-none transition focus:border-[#8ea2ff] focus:ring-4 focus:ring-[#8ea2ff]/20"
                                    required
                                >
                                    {eligibleEvents.map((event) => (
                                        <option key={event.id} value={event.id}>
                                            {event.title} ({computeEventStatus(event)})
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="block">
                                <span className="text-sm font-semibold text-[#d4ddf0]">Media URL (photo/video)</span>
                                <input
                                    type="url"
                                    value={mediaUrl}
                                    onChange={(next) => setMediaUrl(next.target.value)}
                                    placeholder="https://..."
                                    className="mt-2 h-12 w-full rounded-2xl border border-[#1d2940] bg-[#101a30] px-4 text-sm text-[#e8eefc] outline-none transition focus:border-[#8ea2ff] focus:ring-4 focus:ring-[#8ea2ff]/20"
                                    required
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-semibold text-[#d4ddf0]">Caption</span>
                                <textarea
                                    rows="4"
                                    value={caption}
                                    onChange={(next) => setCaption(next.target.value)}
                                    placeholder="Tell the atmosphere of this moment..."
                                    className="mt-2 w-full rounded-2xl border border-[#1d2940] bg-[#101a30] px-4 py-3 text-sm leading-7 text-[#e8eefc] outline-none transition focus:border-[#8ea2ff] focus:ring-4 focus:ring-[#8ea2ff]/20"
                                    required
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-semibold text-[#d4ddf0]">Ambient music snippet (optional)</span>
                                <input
                                    type="text"
                                    value={musicSnippet}
                                    onChange={(next) => setMusicSnippet(next.target.value)}
                                    placeholder="e.g. Midnight City - Live Mix"
                                    className="mt-2 h-12 w-full rounded-2xl border border-[#1d2940] bg-[#101a30] px-4 text-sm text-[#e8eefc] outline-none transition focus:border-[#8ea2ff] focus:ring-4 focus:ring-[#8ea2ff]/20"
                                />
                            </label>

                            <div className="flex flex-wrap justify-end gap-3 pt-1">
                                <button type="button" onClick={onClose} className="rounded-full border border-[#2a3855]/80 bg-[#101a30] px-5 py-3 text-sm font-semibold text-[#a8b4cc] transition hover:bg-[#16253f]">
                                    Cancel
                                </button>
                                <button type="submit" className="rounded-full bg-[#8ea2ff] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_-24px_rgba(142,162,255,0.88)] transition hover:scale-[1.02]">
                                    Publish Moment
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            ) : null}
        </AnimatePresence>
    );
}

function MomentCard({ moment }) {
    const accentClass = CATEGORY_ACCENTS[moment.category] || 'text-[#9fb0ff]';

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 break-inside-avoid overflow-hidden rounded-[24px] border border-[#25324d]/70 bg-[#0f182b] shadow-[0_22px_56px_-38px_rgba(2,8,24,0.95)]"
        >
            <div className="px-4 pb-4 pt-4">
                <p className="text-xs tracking-[0.02em] text-[#8e9cb6]">
                    <span className="font-medium">{moment.username}</span>{' '}
                    <span className="text-[10px] font-semibold uppercase tracking-[0.26em] opacity-70">AT</span>{' '}
                    <span className={classNames('text-sm font-bold', accentClass)}>{moment.eventTitle}</span>
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#6f7d96]">{formatShortDate(moment.createdAt)}</p>
            </div>

            {moment.mediaType === 'video' ? (
                <video
                    controls
                    preload="metadata"
                    className="h-full w-full max-h-[580px] bg-black object-cover"
                    src={moment.media}
                />
            ) : (
                <img
                    src={moment.media}
                    alt={moment.eventTitle}
                    loading="lazy"
                    className="h-full w-full max-h-[620px] bg-[#0a1326] object-cover opacity-0 transition-opacity duration-700"
                    onLoad={(event) => {
                        event.currentTarget.classList.remove('opacity-0');
                        event.currentTarget.classList.add('opacity-100');
                    }}
                />
            )}

            <div className="space-y-3 px-4 py-4">
                <p className="text-sm leading-7 text-[#d1dbef]">{moment.caption}</p>

                <div className="flex flex-wrap items-center gap-2">
                    {moment.attendedVerified ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2a4a38] bg-[#142a20] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8fe0b3]">
                            <MaterialIcon name="check_circle" className="text-[14px]" />
                            Attended
                        </span>
                    ) : null}

                    {moment.musicSnippet ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2a3855] bg-[#101a30] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9fb0ff]">
                            <MaterialIcon name="music_note" className="text-[14px]" />
                            {moment.musicSnippet}
                        </span>
                    ) : null}
                </div>
            </div>
        </motion.article>
    );
}

function ProfilePage({ initialProfile }) {
    const [profile] = useState(initialProfile);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [flashMessage, setFlashMessage] = useState('');

    const joinedEvents = useMemo(() => getJoinedEvents().slice().sort(compareEventDates), []);
    const postingEligibleEvents = useMemo(() => joinedEvents.filter(canCreateMomentForEvent), [joinedEvents]);
    const postingEligibleIds = useMemo(() => new Set(postingEligibleEvents.map((event) => event.id)), [postingEligibleEvents]);

    const [moments, setMoments] = useState(() => buildInitialMoments(initialProfile));

    const profileImage = makeAvatarImage(profile.name, '#8ea2ff', '#3e5996');
    const heroEvent = postingEligibleEvents[0] || joinedEvents[0] || EVENTS[0];

    const query = searchTerm.trim().toLowerCase();

    const visibleMoments = moments.filter((moment) => {
        if (query === '') {
            return true;
        }

        const haystack = [moment.caption, moment.eventTitle, moment.username, moment.musicSnippet || ''].join(' ').toLowerCase();
        return haystack.includes(query);
    });

    const eligibilityNote = postingEligibleEvents.length > 0
        ? 'Posting unlocked for joined events that are ongoing or completed.'
        : 'Create Moment unlocks only after joining an event and once it starts.';

    function handleCreateMoment(payload) {
        const event = EVENTS.find((entry) => entry.id === payload.eventId);

        if (!event || !postingEligibleIds.has(event.id)) {
            setFlashMessage('Moment creation is only allowed for joined ongoing/completed events.');
            return;
        }

        const nextMoment = {
            id: `moment-${Date.now()}`,
            eventId: event.id,
            eventTitle: event.title,
            category: event.category,
            media: payload.media,
            mediaType: payload.mediaType,
            caption: payload.caption,
            createdAt: new Date().toISOString(),
            username: profile.username,
            attendedVerified: true,
            musicSnippet: payload.musicSnippet,
            likes: 0,
        };

        setMoments((current) => [nextMoment, ...current]);
        setFlashMessage('Moment published to your private event archive.');
    }

    return (
        <div className="editorial-shell editorial-copy min-h-screen bg-[#050b17] pb-24 text-[#e8eefc] selection:bg-[#1a2742] selection:text-[#9fb3ff]">
            <ProfileNavigation userName={profile.name} />

            <main className="pt-24">
                {flashMessage ? (
                    <div className="mx-auto max-w-[1240px] px-5 pb-3 lg:px-8">
                        <div className="glass-card flex items-center justify-between gap-4 rounded-[20px] border border-[#1f3150] px-5 py-3 text-sm font-medium text-[#b9cbf1]">
                            <span>{flashMessage}</span>
                            <button type="button" onClick={() => setFlashMessage('')} className="text-[#8ea2ff] transition hover:text-white">Dismiss</button>
                        </div>
                    </div>
                ) : null}

                <section className="mx-auto max-w-[1240px] px-5 pb-10 lg:px-8">
                    <div className="relative overflow-hidden rounded-[32px] border border-[#25324d]/70 bg-[#101a30] shadow-[0_30px_72px_-46px_rgba(2,8,24,0.96)]">
                        <img alt="Cover" className="h-[360px] w-full object-cover" src={heroEvent?.image || profileImage} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050b17]/92 via-[#050b17]/35 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                                <div className="flex items-end gap-5">
                                    <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-[#0f182b] shadow-xl sm:h-32 sm:w-32">
                                        <img src={profileImage} alt={profile.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="pb-2">
                                        <h1 className="editorial-display text-[34px] font-bold text-white sm:text-[44px]">{profile.name}</h1>
                                        <p className="mt-1 text-sm text-[#c1cde4]">{profile.username}</p>
                                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#8ea2ff]">Private event social archive</p>
                                    </div>
                                </div>

                                <motion.button
                                    type="button"
                                    onClick={() => setIsCreateOpen(true)}
                                    whileHover={{ y: -2, scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                                    className={classNames(
                                        'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-[0_20px_44px_-24px_rgba(142,162,255,0.88)] transition',
                                        postingEligibleEvents.length > 0
                                            ? 'bg-[#8ea2ff] text-white'
                                            : 'cursor-not-allowed bg-[#2b3855] text-[#90a0bc]',
                                    )}
                                    disabled={postingEligibleEvents.length === 0}
                                >
                                    <MaterialIcon name="auto_awesome" className="text-[18px]" />
                                    Create Moment
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-[1240px] px-5 pb-8 lg:px-8">
                    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
                        <div className="rounded-[24px] border border-[#25324d]/70 bg-[#0f182b] px-5 py-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7e8eaa]">Posting gate</p>
                            <p className="mt-2 text-sm text-[#b5c2d9]">{eligibilityNote}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {joinedEvents.slice(0, 6).map((event) => {
                                    const status = computeEventStatus(event);
                                    const canPost = canCreateMomentForEvent(event);
                                    return (
                                        <span
                                            key={event.id}
                                            className={classNames(
                                                'rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]',
                                                canPost ? 'bg-[#153123] text-[#8fe0b3]' : 'bg-[#2a1624] text-[#ffabc2]',
                                            )}
                                        >
                                            {event.title} · {status}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="rounded-[24px] border border-[#25324d]/70 bg-[#0f182b] px-5 py-4">
                            <label className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7e8eaa]">Search moments</label>
                            <div className="mt-2 flex items-center gap-2 rounded-full border border-[#1d2940] bg-[#101a30] px-3 py-2">
                                <MaterialIcon name="search" className="text-[#8e9cb6]" />
                                <input
                                    type="search"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Caption, event, music"
                                    className="w-full border-none bg-transparent p-0 text-sm text-[#e8eefc] outline-none placeholder:text-[#7e8eaa]"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-[1240px] px-5 pb-20 lg:px-8">
                    <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
                        {visibleMoments.length > 0 ? (
                            visibleMoments.map((moment) => <MomentCard key={moment.id} moment={moment} />)
                        ) : (
                            <div className="break-inside-avoid rounded-[24px] border border-[#25324d]/70 bg-[#0f182b] px-6 py-12 text-center text-[#a8b4cc]">
                                No moments match your filter.
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <CreateMomentModal
                open={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                joinedEvents={joinedEvents}
                eligibleEventIds={postingEligibleIds}
                onCreate={handleCreateMoment}
            />
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
        plan: mountNode.dataset.userPlan || 'Free',
    };

    createRoot(mountNode).render(
        <StrictMode>
            <ProfilePage initialProfile={initialProfile} />
        </StrictMode>,
    );
}
