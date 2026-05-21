import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

import {
    BASE_DATE,
    EVENTS,
    MESSAGE_THREADS,
    PRIVATE_EVENT_LIMITS,
    RANK_TIERS,
    USER_EVENT_BADGES,
    USER_REVIEW_POSTS,
    USER_STORIES,
    canReviewEvent,
    compareEventDates,
    getInitials,
    getJoinedEvents,
    getRecommendedEvents,
    getUserRank,
    makeAvatarImage,
} from './social-hub/mockData';
import {
    classNames,
    formatDateChip,
    formatEventDate,
    formatPrice,
    formatShortDate,
    LogoutButton,
} from './social-hub/ui';

const { StrictMode, useMemo, useState } = React;

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

function StoryPill({ story, eventTitle }) {
    return (
        <div className="flex flex-col items-center gap-3">
            <div className={classNames('flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(94,80,176,0.65)]', story.accent)}>
                {story.label.slice(0, 2).toUpperCase()}
            </div>
            <div className="text-center">
                <p className="text-sm font-semibold text-[#1c1b21]">{story.label}</p>
                <p className="text-xs text-[#797583]">{eventTitle}</p>
            </div>
        </div>
    );
}

function ReviewCard({ review, userName }) {
    const event = EVENTS.find((item) => item.id === review.eventId);
    if (!event) return null;

    return (
        <article className="ambient-shadow ambient-shadow-hover overflow-hidden rounded-[28px] border border-white/70 bg-white/88 transition">
            <img src={event.image} alt={event.title} className="h-56 w-full object-cover" />
            <div className="space-y-4 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-semibold text-[#1c1b21]">{userName}</p>
                        <p className="text-sm text-[#797583]">{formatShortDate(review.createdAt)}</p>
                    </div>
                    <span className="rounded-full bg-[#f1ecf5] px-3 py-1 text-xs font-semibold text-[#5e50b0]">{event.title}</span>
                </div>

                <p className="text-sm leading-7 text-[#484552]">{review.caption}</p>

                <div className="flex flex-wrap gap-3 text-sm text-[#797583]">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-2 font-semibold text-[#484552]">
                        <MaterialIcon name="favorite" className="text-[18px]" />
                        {review.likes}
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-2 font-semibold text-[#484552]">
                        <MaterialIcon name="chat_bubble" className="text-[18px]" />
                        {review.comments}
                    </div>
                </div>
            </div>
        </article>
    );
}

function BadgeCard({ badge }) {
    return (
        <div className="rounded-[24px] bg-white/10 p-4">
            <p className="font-semibold text-white">{badge.name}</p>
            <p className="mt-1 text-sm text-white/70">{badge.note}</p>
        </div>
    );
}

function ActivityCard({ title, note, icon, accent = 'bg-white/80' }) {
    return (
        <article className={classNames('rounded-[24px] border border-white/70 p-4', accent)}>
            <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e5deff] text-[#372687]">
                    <MaterialIcon name={icon} className="text-[20px]" />
                </div>
                <div>
                    <p className="font-semibold text-[#1c1b21]">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#484552]">{note}</p>
                </div>
            </div>
        </article>
    );
}

function MessageBubble({ message }) {
    const isSelf = message.sender === 'self';

    return (
        <div className={classNames('flex', isSelf ? 'justify-end' : 'justify-start')}>
            <div
                className={classNames(
                    'max-w-[85%] rounded-[24px] px-4 py-3 text-sm leading-6',
                    isSelf ? 'bg-[#5e50b0] text-white' : 'border border-white/70 bg-white/80 text-[#484552]',
                )}
            >
                <p>{message.text}</p>
                <p className={classNames('mt-2 text-[11px] font-semibold uppercase tracking-[0.22em]', isSelf ? 'text-white/70' : 'text-[#797583]')}>
                    {message.time}
                </p>
            </div>
        </div>
    );
}

function SettingsBlock({ title, description, children }) {
    return (
        <section className="glass-card ambient-shadow rounded-[28px] border border-white/70 p-5 sm:p-6">
            <h3 className="editorial-display text-2xl font-semibold text-[#1c1b21]">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-[#484552]">{description}</p>
            <div className="mt-5 space-y-4">{children}</div>
        </section>
    );
}

function PrivacyToggle({ label, description, enabled, onToggle }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-pressed={enabled}
            className="flex w-full items-start justify-between gap-4 rounded-[22px] border border-[#e5e1ea] bg-white/80 px-4 py-4 text-left transition hover:border-[#c8bfff]"
        >
            <div>
                <p className="font-semibold text-[#1c1b21]">{label}</p>
                <p className="mt-2 text-sm leading-6 text-[#484552]">{description}</p>
            </div>
            <span className={classNames('relative mt-1 inline-flex h-8 w-14 rounded-full transition', enabled ? 'bg-[#5e50b0]' : 'bg-[#c9c4d3]')}>
                <span className={classNames('absolute top-1 h-6 w-6 rounded-full bg-white shadow transition', enabled ? 'left-7' : 'left-1')} />
            </span>
        </button>
    );
}

function ProfileNavigation({ userName, searchTerm, onSearchChange }) {
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
                            <p className="hidden text-xs text-[#797583] sm:block">Experience Beautiful Moments</p>
                        </div>
                    </a>

                    <nav className="hidden items-center gap-6 md:flex">
                        <a className="text-sm font-semibold text-[#484552] transition-colors hover:text-[#5e50b0]" href="/dashboard">Home</a>
                        <a className="text-sm font-semibold text-[#484552] transition-colors hover:text-[#5e50b0]" href="/explore">Explore</a>
                        <a className="text-sm font-semibold text-[#484552] transition-colors hover:text-[#5e50b0]" href="/schedule">Schedule</a>
                        <a className="border-b-2 border-[#5e50b0] pb-1 text-sm font-semibold text-[#5e50b0]" href="/profile">Profile</a>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <div className={classNames('glass-card hidden items-center rounded-full border border-white/70 px-4 py-2 transition-all duration-200 lg:flex', isHeaderSearchFocused ? 'w-80' : 'w-64')}>
                        <MaterialIcon name="search" className="text-[#797583]" />
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) => onSearchChange(event.target.value)}
                            onFocus={() => setIsHeaderSearchFocused(true)}
                            onBlur={() => setIsHeaderSearchFocused(false)}
                            placeholder="Search memories, events..."
                            className="ml-2 w-full border-none bg-transparent p-0 text-sm text-[#1c1b21] outline-none placeholder:text-[#797583]"
                        />
                    </div>

                    <button type="button" onClick={() => scrollToSection('profile-inbox')} className="rounded-full p-2 text-[#484552] transition hover:bg-white/80 hover:text-[#5e50b0]">
                        <MaterialIcon name="notifications" />
                    </button>
                    <button type="button" onClick={() => scrollToSection('profile-memories')} className="rounded-full p-2 text-[#484552] transition hover:bg-white/80 hover:text-[#5e50b0]">
                        <MaterialIcon name="favorite" />
                    </button>
                    <LogoutButton />
                    <a href="/profile" className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#c8bfff] bg-white text-sm font-bold text-[#5e50b0]" title={`${userName} ${displayHandle}`}>
                        {getInitials(userName)}
                    </a>
                </div>
            </div>
        </header>
    );
}

function CompactEventItem({ event, actionLabel, onOpen }) {
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
                        {event.category}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#797583]">{formatDateChip(event.date)}</span>
                </div>
                <h3 className="editorial-display mt-3 truncate text-lg font-semibold text-[#1c1b21]">{event.title}</h3>
                <p className="mt-1 truncate text-sm text-[#484552]">{actionLabel}</p>
            </div>
            <MaterialIcon name="arrow_forward" className="text-[#797583]" />
        </button>
    );
}

function EventCard({ event, joined, onPrimaryAction, primaryLabel }) {
    return (
        <article className="ambient-shadow ambient-shadow-hover overflow-hidden rounded-[28px] border border-white/70 bg-white/88 transition">
            <div className="relative h-48 overflow-hidden">
                <img alt={event.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" src={event.image} />
                {joined && (
                    <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-[#c1e9d5]/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#002116] shadow-sm">
                            Joined
                        </span>
                    </div>
                )}
            </div>
            <div className="p-5">
                <h3 className="editorial-display text-[20px] font-semibold leading-[1.25] text-[#1c1b21]">{event.title}</h3>
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#5e50b0]">{formatPrice(event.price)}</p>
                    <button
                        type="button"
                        onClick={onPrimaryAction}
                        className="inline-flex items-center gap-2 rounded-full bg-[#5e50b0] px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02] hover:shadow-[0_18px_36px_-24px_rgba(94,80,176,0.9)]"
                    >
                        {primaryLabel}
                        <MaterialIcon name="arrow_forward" className="text-[18px]" />
                    </button>
                </div>
            </div>
        </article>
    );
}

function ProfilePage({ initialProfile }) {
    const [profile, setProfile] = useState(initialProfile);
    const [draftProfile, setDraftProfile] = useState(initialProfile);
    const [searchTerm, setSearchTerm] = useState('');
    const [flashMessage, setFlashMessage] = useState('');
    
    // States for interactives
    const [reviewPosts, setReviewPosts] = useState(USER_REVIEW_POSTS);
    const [reviewCaption, setReviewCaption] = useState('');
    const [reviewEventId, setReviewEventId] = useState(getJoinedEvents().find(canReviewEvent)?.id || '');
    const [storyHighlights, setStoryHighlights] = useState(USER_STORIES);
    const [uploadedStoryName, setUploadedStoryName] = useState('');
    const [threads, setThreads] = useState(MESSAGE_THREADS);
    const [selectedThreadId, setSelectedThreadId] = useState(MESSAGE_THREADS[0]?.id || '');
    const [messageDraft, setMessageDraft] = useState('');
    const [paymentPreference, setPaymentPreference] = useState('E-Wallet');
    const [privacySettings, setPrivacySettings] = useState({ profileVisible: true, showJoinedEvents: true, allowMessages: true });

    const joinedEvents = useMemo(() => getJoinedEvents().slice().sort(compareEventDates), []);
    const upcomingEvents = joinedEvents.filter((event) => new Date(event.date) >= BASE_DATE);
    const reviewableEvents = joinedEvents.filter(canReviewEvent);
    const savedIdeas = getRecommendedEvents().slice(0, 4);
    const selectedThread = threads.find((t) => t.id === selectedThreadId) || threads[0];
    const followers = 1248;
    const following = 318;
    const socialActivity = reviewPosts.length * 4 + USER_EVENT_BADGES.length * 2 + threads.length;
    const profileRank = getUserRank(joinedEvents.length, socialActivity);
    const query = searchTerm.trim().toLowerCase();

    // Filters
    const visibleReviewPosts = reviewPosts.filter((review) => {
        const event = EVENTS.find((item) => item.id === review.eventId);
        const haystack = [review.caption, event?.title || '', event?.category || ''].join(' ').toLowerCase();
        return query === '' || haystack.includes(query);
    });
    const visibleJoinedEvents = joinedEvents.filter((event) => query === '' || [event.title, event.location, event.category, event.host].some(v => v.toLowerCase().includes(query)));
    const visibleSavedIdeas = savedIdeas.filter((event) => query === '' || [event.title, event.location, event.category, event.host].some(v => v.toLowerCase().includes(query)));
    const visibleThreads = threads.filter((thread) => query === '' || [thread.userName, thread.handle, thread.lastMessage, thread.role].some(v => v.toLowerCase().includes(query)));

    // Rank logic
    const currentRankIndex = Math.max(RANK_TIERS.findIndex((tier) => tier.name === profileRank), 0);
    const currentTier = RANK_TIERS[currentRankIndex];
    const nextTier = RANK_TIERS[currentRankIndex + 1] || null;
    const eventProgress = nextTier ? Math.min(Math.max((joinedEvents.length - currentTier.minEvents) / Math.max(nextTier.minEvents - currentTier.minEvents, 1), 0), 1) : 1;
    const activityProgress = nextTier ? Math.min(Math.max((socialActivity - currentTier.minActivity) / Math.max(nextTier.minActivity - currentTier.minActivity, 1), 0), 1) : 1;
    const tierProgress = nextTier ? Math.min((eventProgress + activityProgress) / 2, 1) : 1;

    const heroEvent = upcomingEvents[0] || joinedEvents[0] || savedIdeas[0];
    const profileImage = makeAvatarImage(profile.name, '#5e50b0', '#c8bfff');
    
    const activityFeed = [
        reviewPosts[0] ? { id: 'activity-review', title: 'Latest memory posted', note: reviewPosts[0].caption, icon: 'favorite', accent: 'bg-white/80' } : null,
        USER_EVENT_BADGES[0] ? { id: 'activity-badge', title: USER_EVENT_BADGES[0].name, note: USER_EVENT_BADGES[0].note, icon: 'star', accent: 'bg-[#fdf8ff] border-[#c8bfff]' } : null,
        threads[0] ? { id: 'activity-thread', title: `Inbox update from ${threads[0].userName}`, note: threads[0].lastMessage, icon: 'chat_bubble', accent: 'bg-white/80' } : null,
    ].filter(Boolean);

    // Handlers
    function handleSaveProfile(e) {
        e.preventDefault();
        setProfile(draftProfile);
        setFlashMessage('Profile settings updated successfully.');
    }

    function handlePostReview(e) {
        e.preventDefault();
        if (!reviewEventId || reviewCaption.trim() === '') return;
        setReviewPosts((curr) => [{ id: `review-${curr.length + 1}`, eventId: reviewEventId, caption: reviewCaption.trim(), likes: 0, comments: 0, createdAt: BASE_DATE.toISOString() }, ...curr]);
        setReviewCaption('');
        setFlashMessage('Review posted to your timeline.');
        scrollToSection('profile-memories');
    }

    function handleStoryUpload(fileName) {
        if (!fileName) return;
        const event = upcomingEvents[0] || joinedEvents[0];
        setStoryHighlights((curr) => [{ id: `story-${curr.length + 1}`, label: fileName.slice(0, 12), eventId: event?.id || joinedEvents[0]?.id, accent: 'from-[#5e50b0] to-[#c8bfff]' }, ...curr]);
        setUploadedStoryName(fileName);
        setFlashMessage('Story highlight added.');
    }

    function handleSendMessage(e) {
        e.preventDefault();
        if (!selectedThread || messageDraft.trim() === '') return;
        setThreads((curr) => curr.map((t) => t.id === selectedThread.id ? { ...t, unread: 0, lastMessage: messageDraft.trim(), messages: [...t.messages, { id: `message-${t.messages.length + 1}`, sender: 'self', text: messageDraft.trim(), time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(BASE_DATE) }] } : t));
        setMessageDraft('');
    }

    function togglePrivacy(key) {
        setPrivacySettings((curr) => ({ ...curr, [key]: !curr[key] }));
    }

    return (
        <div className="editorial-shell editorial-copy min-h-screen bg-[#fdf8ff] pb-28 text-[#1c1b21] selection:bg-[#e5deff] selection:text-[#372687] md:pb-0" style={{ backgroundColor: '#fdf8ff' }}>
            <ProfileNavigation userName={profile.name} searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <main className="pt-24">
                {flashMessage && (
                    <div className="mx-auto max-w-[1200px] px-5 pb-2 lg:px-8">
                        <div className="glass-card ambient-shadow flex items-center justify-between gap-4 rounded-[24px] border border-[#c1e9d5] px-5 py-4 text-sm font-semibold text-[#002116]">
                            <span>{flashMessage}</span>
                            <button type="button" onClick={() => setFlashMessage('')} className="transition hover:text-[#002116]/70">Dismiss</button>
                        </div>
                    </div>
                )}

                {/* Cover & Profile Header */}
                <section className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-8">
                    <div className="relative overflow-hidden rounded-[32px] bg-white">
                        <img alt="Cover" className="h-[320px] w-full object-cover" src={heroEvent?.image || profileImage} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                                <div className="flex items-end gap-6">
                                    <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl sm:h-36 sm:w-36">
                                        <img src={profileImage} alt={profile.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="pb-2">
                                        <div className="flex items-center gap-3">
                                            <h1 className="editorial-display text-[32px] font-bold text-white sm:text-[42px]">{profile.name}</h1>
                                            <span className="rounded-full bg-[#f1ecf5] px-3 py-1 text-xs font-bold tracking-[0.2em] text-[#5e50b0] shadow-sm uppercase">{profileRank}</span>
                                        </div>
                                        <p className="mt-1 font-medium text-white/80">{profile.username}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-3 pb-2">
                                    <button onClick={() => scrollToSection('profile-inbox')} className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20">
                                        Message
                                    </button>
                                    <button onClick={() => scrollToSection('profile-settings')} className="rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/20">
                                        <MaterialIcon name="settings" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bio & Stats */}
                <section className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-8">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
                        <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 p-6 sm:p-8">
                            <h2 className="editorial-display text-xl font-semibold text-[#1c1b21]">About</h2>
                            <p className="mt-3 text-base leading-8 text-[#484552]">{profile.bio}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:w-auto">
                            <div className="glass-card ambient-shadow flex flex-col justify-center rounded-[32px] border border-white/70 p-6 text-center">
                                <p className="editorial-display text-2xl font-bold text-[#1c1b21]">{followers.toLocaleString()}</p>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#797583]">Followers</p>
                            </div>
                            <div className="glass-card ambient-shadow flex flex-col justify-center rounded-[32px] border border-white/70 p-6 text-center">
                                <p className="editorial-display text-2xl font-bold text-[#1c1b21]">{following.toLocaleString()}</p>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#797583]">Following</p>
                            </div>
                            <div className="glass-card ambient-shadow flex flex-col justify-center rounded-[32px] border border-white/70 p-6 text-center">
                                <p className="editorial-display text-2xl font-bold text-[#1c1b21]">{joinedEvents.length}</p>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#797583]">Events</p>
                            </div>
                            <div className="glass-card ambient-shadow flex flex-col justify-center rounded-[32px] border border-white/70 p-6 text-center">
                                <p className="editorial-display text-2xl font-bold text-[#1c1b21]">{reviewPosts.length}</p>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#797583]">Reviews</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Highlights & Badges */}
                <section className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-8">
                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
                        <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 p-6 sm:p-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="editorial-display text-[24px] font-semibold text-[#1c1b21]">Highlights</h2>
                                    <p className="mt-1 text-sm text-[#484552]">Pinned moments and memories.</p>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-6">
                                <label className="flex cursor-pointer flex-col items-center gap-3">
                                    <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-[#c9c4d3] bg-white text-[#797583] transition hover:border-[#5e50b0] hover:text-[#5e50b0]">
                                        <MaterialIcon name="add_photo_alternate" className="text-[28px]" />
                                    </span>
                                    <span className="text-sm font-semibold text-[#484552]">New</span>
                                    <input type="file" accept="image/*" className="sr-only" onChange={(e) => handleStoryUpload(e.target.files?.[0]?.name || '')} />
                                </label>
                                {storyHighlights.map((story) => (
                                    <StoryPill key={story.id} story={story} eventTitle={EVENTS.find((item) => item.id === story.eventId)?.title || 'Memory'} />
                                ))}
                            </div>
                        </div>

                        <section className="overflow-hidden rounded-[32px] bg-[#312f36] p-6 text-white shadow-[0_24px_60px_-32px_rgba(49,47,54,0.65)] sm:p-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">Rank and badges</p>
                            <h2 className="editorial-display mt-3 text-[32px] font-semibold text-white">{profileRank}</h2>
                            <p className="mt-3 text-sm leading-7 text-white/72">
                                {nextTier ? `You are ${Math.max(nextTier.minEvents - joinedEvents.length, 0)} events away from ${nextTier.name}.` : 'Top rank achieved.'}
                            </p>
                            <div className="mt-5 h-2 rounded-full bg-white/10">
                                <div className="h-full rounded-full bg-gradient-to-r from-[#c8bfff] to-[#5e50b0]" style={{ width: `${Math.max(tierProgress * 100, 8)}%` }} />
                            </div>
                            <div className="mt-6 space-y-3">
                                {USER_EVENT_BADGES.map((badge) => <BadgeCard key={badge.id} badge={badge} />)}
                            </div>
                        </section>
                    </div>
                </section>

                {/* Memories */}
                <section id="profile-memories" className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-8">
                    <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 p-6 sm:p-8">
                        <div className="mb-6">
                            <h2 className="editorial-display text-[28px] font-semibold text-[#1c1b21]">Memories</h2>
                            <p className="mt-1 text-sm text-[#484552]">Reviews and event recaps.</p>
                        </div>
                        <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
                            <div className="space-y-5 xl:sticky xl:top-28 xl:self-start">
                                <form onSubmit={handlePostReview} className="rounded-[28px] border border-white/70 bg-white/80 p-5 sm:p-6 shadow-sm">
                                    <h3 className="font-semibold text-[#1c1b21] mb-4">Post a review</h3>
                                    <label className="block mb-4">
                                        <select
                                            value={reviewEventId}
                                            onChange={(e) => setReviewEventId(e.target.value)}
                                            disabled={reviewableEvents.length === 0}
                                            className="h-12 w-full rounded-2xl border border-[#e5e1ea] bg-white px-4 text-sm text-[#1c1b21] outline-none transition focus:border-[#5e50b0] focus:ring-4 focus:ring-[#5e50b0]/20"
                                        >
                                            {reviewableEvents.length === 0 ? <option value="">No eligible events</option> : null}
                                            {reviewableEvents.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}
                                        </select>
                                    </label>
                                    <label className="block mb-4">
                                        <textarea
                                            rows="4"
                                            value={reviewCaption}
                                            onChange={(e) => setReviewCaption(e.target.value)}
                                            disabled={reviewableEvents.length === 0}
                                            className="w-full rounded-2xl border border-[#e5e1ea] bg-white px-4 py-3 text-sm leading-6 text-[#1c1b21] outline-none transition focus:border-[#5e50b0] focus:ring-4 focus:ring-[#5e50b0]/20 disabled:bg-black/5"
                                            placeholder="Write your event review..."
                                        />
                                    </label>
                                    <button type="submit" disabled={!reviewEventId || !reviewCaption.trim()} className="inline-flex w-full justify-center items-center gap-2 rounded-full bg-[#5e50b0] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:opacity-50">
                                        Post review <MaterialIcon name="send" className="text-[18px]" />
                                    </button>
                                </form>
                            </div>
                            <div className="grid gap-4 lg:grid-cols-2">
                                {visibleReviewPosts.length === 0 ? (
                                    <div className="col-span-2 rounded-[28px] border border-white/70 bg-white/80 px-6 py-12 text-center shadow-sm">
                                        <p className="text-[#484552]">No memories to show.</p>
                                    </div>
                                ) : (
                                    visibleReviewPosts.map((review) => <ReviewCard key={review.id} review={review} userName={profile.name} />)
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Inbox & Chat */}
                <section id="profile-inbox" className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-8">
                    <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 p-6 sm:p-8">
                        <div className="mb-6">
                            <h2 className="editorial-display text-[28px] font-semibold text-[#1c1b21]">Inbox</h2>
                            <p className="mt-1 text-sm text-[#484552]">Messages from event hosts and friends.</p>
                        </div>
                        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
                            <div className="space-y-3">
                                {visibleThreads.map((thread) => (
                                    <button
                                        key={thread.id}
                                        onClick={() => setSelectedThreadId(thread.id)}
                                        className={classNames('w-full rounded-[24px] border px-4 py-4 text-left transition', selectedThreadId === thread.id ? 'border-[#5e50b0] bg-[#5e50b0] text-white shadow-[0_14px_30px_-18px_rgba(94,80,176,0.65)]' : 'border-white/70 bg-white/80 hover:-translate-y-0.5 hover:shadow-sm')}
                                    >
                                        <div className="flex items-start gap-3">
                                            <img src={thread.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
                                            <div className="min-w-0 flex-1">
                                                <div className="flex justify-between gap-2">
                                                    <p className="font-semibold">{thread.userName}</p>
                                                    {thread.unread > 0 && <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white">{thread.unread}</span>}
                                                </div>
                                                <p className={classNames('mt-1 text-sm', selectedThreadId === thread.id ? 'text-white/70' : 'text-[#797583]')}>{thread.role}</p>
                                                <p className={classNames('mt-2 truncate text-sm', selectedThreadId === thread.id ? 'text-white/90' : 'text-[#484552]')}>{thread.lastMessage}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            {selectedThread && (
                                <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 sm:p-6 shadow-sm flex flex-col h-[500px]">
                                    <div className="flex items-center gap-4 border-b border-[#e5e1ea] pb-4">
                                        <img src={selectedThread.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
                                        <div>
                                            <p className="font-semibold text-[#1c1b21]">{selectedThread.userName}</p>
                                            <p className="text-sm text-[#797583]">{selectedThread.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto py-4 space-y-4">
                                        {selectedThread.messages.map((m) => <MessageBubble key={m.id} message={m} />)}
                                    </div>
                                    <form onSubmit={handleSendMessage} className="mt-auto flex gap-3 pt-4 border-t border-[#e5e1ea]">
                                        <input
                                            type="text"
                                            value={messageDraft}
                                            onChange={(e) => setMessageDraft(e.target.value)}
                                            placeholder="Write a message..."
                                            className="h-12 flex-1 rounded-full border border-[#e5e1ea] bg-white px-4 text-sm text-[#1c1b21] outline-none transition focus:border-[#5e50b0] focus:ring-4 focus:ring-[#5e50b0]/20"
                                        />
                                        <button type="submit" className="inline-flex items-center justify-center rounded-full bg-[#5e50b0] h-12 w-12 text-white transition hover:scale-105">
                                            <MaterialIcon name="send" className="text-[20px]" />
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Settings */}
                <section id="profile-settings" className="mx-auto max-w-[1200px] px-5 pb-20 lg:px-8">
                    <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 p-6 sm:p-8">
                        <div className="mb-6">
                            <h2 className="editorial-display text-[28px] font-semibold text-[#1c1b21]">Settings</h2>
                            <p className="mt-1 text-sm text-[#484552]">Profile and account preferences.</p>
                        </div>
                        <div className="grid gap-6 xl:grid-cols-2">
                            <SettingsBlock title="Edit Profile" description="Update your public information.">
                                <form onSubmit={handleSaveProfile} className="space-y-4">
                                    <label className="block">
                                        <span className="text-sm font-semibold text-[#484552]">Display Name</span>
                                        <input type="text" value={draftProfile.name} onChange={(e) => setDraftProfile((curr) => ({ ...curr, name: e.target.value }))} className="mt-2 h-12 w-full rounded-2xl border border-[#e5e1ea] bg-white px-4 text-sm outline-none transition focus:border-[#5e50b0]" />
                                    </label>
                                    <label className="block">
                                        <span className="text-sm font-semibold text-[#484552]">Bio</span>
                                        <textarea rows="4" value={draftProfile.bio} onChange={(e) => setDraftProfile((curr) => ({ ...curr, bio: e.target.value }))} className="mt-2 w-full rounded-2xl border border-[#e5e1ea] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#5e50b0]" />
                                    </label>
                                    <button type="submit" className="rounded-full bg-[#5e50b0] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]">Save Changes</button>
                                </form>
                            </SettingsBlock>
                            <div className="space-y-6">
                                <SettingsBlock title="Account & Payment" description="Your membership and billing details.">
                                    <div className="rounded-[24px] border border-[#e5e1ea] bg-white/80 p-4 text-sm text-[#484552] space-y-2">
                                        <p>Email: <span className="font-semibold text-[#1c1b21]">{profile.email}</span></p>
                                        <p>Username: <span className="font-semibold text-[#1c1b21]">{profile.username}</span></p>
                                        <div className="flex items-center justify-between">
                                            <p>Membership: <span className="font-semibold text-[#1c1b21] capitalize">{profile.plan === 'pro' ? 'Pro Organizer' : profile.plan}</span></p>
                                            <a href="/membership" className="text-xs font-bold uppercase tracking-wider text-[#5e50b0] hover:underline">
                                                Manage Plan
                                            </a>
                                        </div>
                                    </div>
                                    <label className="block mt-4">
                                        <span className="text-sm font-semibold text-[#484552]">Default Payment Method</span>
                                        <select value={paymentPreference} onChange={(e) => setPaymentPreference(e.target.value)} className="mt-2 h-12 w-full rounded-2xl border border-[#e5e1ea] bg-white px-4 text-sm outline-none transition focus:border-[#5e50b0]">
                                            <option>E-Wallet</option>
                                            <option>Virtual Account</option>
                                            <option>Credit Card</option>
                                        </select>
                                    </label>
                                </SettingsBlock>
                                <SettingsBlock title="Privacy" description="Control what others see on your profile.">
                                    <PrivacyToggle label="Public Profile" description="Allow others to see your profile." enabled={privacySettings.profileVisible} onToggle={() => togglePrivacy('profileVisible')} />
                                    <PrivacyToggle label="Show Events" description="Display your joined events archive." enabled={privacySettings.showJoinedEvents} onToggle={() => togglePrivacy('showJoinedEvents')} />
                                    <PrivacyToggle label="Direct Messages" description="Allow anyone to send you messages." enabled={privacySettings.allowMessages} onToggle={() => togglePrivacy('allowMessages')} />
                                </SettingsBlock>
                                <SettingsBlock title="Account Actions" description="Manage your current session.">
                                    <form method="POST" action="/logout">
                                        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')} />
                                        <button type="submit" className="w-full rounded-2xl border border-red-200 bg-red-50 py-4 text-center text-sm font-semibold text-red-600 transition hover:bg-red-100">
                                            Log Out Securely
                                        </button>
                                    </form>
                                </SettingsBlock>
                            </div>
                        </div>
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
                                <li><a className="transition-colors hover:text-[#5e50b0]" href="/profile">{profile.username}</a></li>
                                <li><a className="transition-colors hover:text-[#5e50b0]" href="/events/private/create">Host a private event</a></li>
                                <li className="break-all">{profile.email}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 flex flex-col gap-6 border-t border-[#d8d2de] pt-8 md:flex-row md:items-center md:justify-between">
                        <p className="text-sm text-[#797583]">© {new Date().getFullYear()} AyoYok. All rights reserved.</p>
                        <div className="flex gap-6 text-[#797583]">
                            <span className="transition-colors hover:text-[#5e50b0]"><MaterialIcon name="language" /></span>
                            <span className="transition-colors hover:text-[#5e50b0]"><MaterialIcon name="help" /></span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Mobile Nav */}
            <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around rounded-t-[22px] border-t border-white/60 bg-[rgba(247,242,251,0.92)] px-4 py-3 shadow-[0_-8px_30px_-18px_rgba(94,80,176,0.28)] backdrop-blur-lg md:hidden">
                <a href="/dashboard" className="flex flex-col items-center justify-center px-5 py-1 text-[#484552]">
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
                <a href="/profile" className="flex flex-col items-center justify-center rounded-full bg-[#e5deff] px-5 py-1 text-[#372687]">
                    <MaterialIcon name="person" />
                    <span className="text-[11px] font-semibold">Profile</span>
                </a>
            </nav>
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
