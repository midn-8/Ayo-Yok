import * as React from 'react';

import { CATEGORY_META, getEventById, getInitials } from './mockData';

export function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export function formatEventDate(dateString) {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(dateString));
}

export function formatShortDate(dateString) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
    }).format(new Date(dateString));
}

export function formatDateChip(dateString) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
    }).format(new Date(dateString));
}

export function formatMonthLabel(date) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
    }).format(date);
}

export function formatPrice(price) {
    if (price === 0) {
        return 'Free';
    }

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(price);
}

export function Icon({ name, className = 'h-5 w-5' }) {
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
        case 'heart':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 20s-7-4.44-7-10.05A4.45 4.45 0 019.5 5.5c1.09 0 2.16.4 3 .96.84-.56 1.91-.96 3-.96A4.45 4.45 0 0120 9.95C20 15.56 13 20 13 20h-1z" />
                </svg>
            );
        case 'comment':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 17.5V6.5A2.5 2.5 0 017.5 4h9A2.5 2.5 0 0119 6.5v7A2.5 2.5 0 0116.5 16H9l-4 3v-1.5z" />
                </svg>
            );
        case 'send':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 3L10 14" />
                    <path d="M21 3l-7 18-4-7-7-4 18-7z" />
                </svg>
            );
        case 'star':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 3l2.6 5.27 5.82.84-4.2 4.1.99 5.79L12 16.2l-5.21 2.8.99-5.79-4.2-4.1 5.82-.84L12 3z" />
                </svg>
            );
        case 'plus':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 5v14M5 12h14" />
                </svg>
            );
        case 'message':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4.5 7.5A2.5 2.5 0 017 5h10a2.5 2.5 0 012.5 2.5v7A2.5 2.5 0 0117 17H9l-4.5 3v-3A2.5 2.5 0 012 14.5v-7A2.5 2.5 0 014.5 5" />
                </svg>
            );
        case 'settings':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 8.5A3.5 3.5 0 1112 15.5 3.5 3.5 0 0112 8.5z" />
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06A1.65 1.65 0 0015 19.4a1.65 1.65 0 00-1 .6 1.65 1.65 0 00-.33 1v.17a2 2 0 11-4 0V21a1.65 1.65 0 00-.33-1 1.65 1.65 0 00-1-.6 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-.6-1 1.65 1.65 0 00-1-.33H2.83a2 2 0 110-4H3a1.65 1.65 0 001-.33 1.65 1.65 0 00.6-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6c.39-.02.76-.24 1-.6.21-.3.33-.66.33-1V2.83a2 2 0 114 0V3a1.65 1.65 0 00.33 1c.24.36.61.58 1 .6a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9c.02.39.24.76.6 1 .3.21.66.33 1 .33h.17a2 2 0 110 4H21a1.65 1.65 0 00-1 .33c-.36.24-.58.61-.6 1z" />
                </svg>
            );
        case 'credit-card':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
                    <path d="M3 10.5h18M7 15h3" />
                </svg>
            );
        case 'clock':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 7.5v5l3 2" />
                </svg>
            );
        case 'image':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
                    <circle cx="9" cy="10" r="1.5" />
                    <path d="M20.5 15.5l-4.5-4.5-6 6-2.5-2.5-4 4" />
                </svg>
            );
        case 'check':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12.5l4.2 4.2L19 7" />
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

export function TopNavigation({
    userName,
    searchTerm,
    onSearchChange,
    activePath,
    searchPlaceholder = 'Search events, organizers, or keywords',
    showSearch = true,
}) {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
        { id: 'explore', label: 'Explore', href: '/explore' },
        { id: 'schedule', label: 'Schedule', href: '/schedule' },
        { id: 'profile', label: 'Profile', href: '/profile' },
    ];

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

                <div className="flex flex-1 flex-col gap-3 xl:max-w-4xl xl:flex-row xl:items-center xl:justify-end">
                    {showSearch ? (
                        <div className="relative w-full xl:max-w-xl">
                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <Icon name="search" className="h-5 w-5" />
                            </span>
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) => onSearchChange?.(event.target.value)}
                                placeholder={searchPlaceholder}
                                className="h-12 w-full rounded-full border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100"
                            />
                        </div>
                    ) : null}

                    <div className="flex items-center justify-between gap-3 xl:justify-end">
                        <nav className="hidden items-center gap-2 lg:flex">
                            {navItems.map((item) => {
                                const isActive = activePath === item.id;

                                return (
                                    <a
                                        key={item.id}
                                        href={item.href}
                                        aria-current={isActive ? 'page' : undefined}
                                        className={classNames(
                                            'rounded-full px-4 py-2 text-sm font-semibold transition',
                                            isActive ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/15' : 'text-slate-600 hover:bg-slate-100',
                                        )}
                                    >
                                        {item.label}
                                    </a>
                                );
                            })}
                        </nav>

                        <a href="/profile" className="flex items-center gap-3 rounded-full bg-slate-950 px-3 py-2 text-white shadow-lg shadow-slate-950/15">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
                                {getInitials(userName)}
                            </span>
                            <div className="pr-2">
                                <p className="text-sm font-semibold">{userName}</p>
                                <p className="text-xs text-slate-300">Social event identity</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export function SectionHeading({ eyebrow, title, description, action }) {
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

export function StatCard({ label, value, note, inverse = false }) {
    return (
        <article className={classNames(inverse ? 'panel-dark' : 'panel', 'p-5 sm:p-6')}>
            <p className={classNames('text-xs font-semibold uppercase tracking-[0.28em]', inverse ? 'text-slate-400' : 'text-slate-500')}>{label}</p>
            <p className={classNames('dashboard-display mt-4 text-4xl font-bold', inverse ? 'text-white' : 'text-slate-950')}>{value}</p>
            {note ? <p className={classNames('mt-2 text-sm leading-6', inverse ? 'text-slate-300' : 'text-slate-600')}>{note}</p> : null}
        </article>
    );
}

export function FilterChip({ label, active, onClick }) {
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

export function EventCard({ event, joined = false, onOpen, onPrimaryAction, primaryLabel, showHost = true, badgeLabel }) {
    const meta = CATEGORY_META[event.category];

    return (
        <article className="panel overflow-hidden">
            <img src={event.image} alt={event.title} className="h-56 w-full object-cover" />
            <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                    <span className={classNames('rounded-full px-3 py-1 text-xs font-semibold', meta.soft)}>{event.category}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                        {event.attendees.toLocaleString()} going
                    </span>
                    {badgeLabel ? <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">{badgeLabel}</span> : null}
                    {joined ? (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                            Joined
                        </span>
                    ) : null}
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
                    {showHost ? (
                        <div className="flex items-center gap-3">
                            <span className="text-slate-400">
                                <Icon name="people" className="h-4 w-4" />
                            </span>
                            <span>Hosted by {event.host}</span>
                        </div>
                    ) : null}
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Price</p>
                        <p className="mt-1 text-lg font-bold text-slate-950">{formatPrice(event.price)}</p>
                    </div>
                    <div className="flex gap-2">
                        {onOpen ? (
                            <button
                                type="button"
                                onClick={onOpen}
                                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Details
                            </button>
                        ) : null}
                        <button
                            type="button"
                            onClick={onPrimaryAction}
                            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800"
                        >
                            {primaryLabel || (joined ? 'View Ticket' : event.price === 0 ? 'Join Event' : 'Buy Ticket')}
                            <Icon name="arrow" className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

export function CompactEventItem({ event, badge, actionLabel, onOpen }) {
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

export function OrganizerCard({ organizer }) {
    return (
        <article className="panel p-5 sm:p-6">
            <div className="flex items-start gap-4">
                <img src={organizer.avatar} alt={organizer.name} className="h-16 w-16 rounded-[22px] object-cover shadow-lg shadow-slate-950/10" />
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="dashboard-display text-xl font-bold text-slate-950">{organizer.name}</h3>
                        {organizer.verified ? (
                            <span className="rounded-full bg-slate-950 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white">
                                Verified
                            </span>
                        ) : null}
                    </div>
                    <p className="mt-1 text-sm font-semibold text-fuchsia-600">{organizer.handle}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{organizer.bio}</p>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                <div className="rounded-[20px] bg-slate-50 px-3 py-4">
                    <p className="text-slate-400">Followers</p>
                    <p className="mt-2 font-bold text-slate-950">{organizer.followers.toLocaleString()}</p>
                </div>
                <div className="rounded-[20px] bg-slate-50 px-3 py-4">
                    <p className="text-slate-400">Hosted</p>
                    <p className="mt-2 font-bold text-slate-950">{organizer.eventsHosted}</p>
                </div>
                <div className="rounded-[20px] bg-slate-50 px-3 py-4">
                    <p className="text-slate-400">Focus</p>
                    <p className="mt-2 font-bold text-slate-950">{organizer.category}</p>
                </div>
            </div>
        </article>
    );
}

export function SocialPostCard({ post }) {
    const event = getEventById(post.eventId);

    if (!event) {
        return null;
    }

    const meta = CATEGORY_META[event.category];

    return (
        <article className="panel overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
                <img src={post.avatar} alt={post.userName} className="h-12 w-12 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-slate-950">{post.userName}</p>
                        <span className="text-sm text-slate-500">{post.handle}</span>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{post.timeAgo}</p>
                </div>
                <span className={classNames('rounded-full px-3 py-1 text-xs font-semibold', meta.soft)}>{event.title}</span>
            </div>

            <img src={event.image} alt={event.title} className="h-72 w-full object-cover" />

            <div className="space-y-4 px-5 py-5 sm:px-6">
                <p className="text-sm leading-7 text-slate-700">{post.caption}</p>

                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 font-semibold text-slate-700">
                        <Icon name="heart" className="h-4 w-4" />
                        {post.likes}
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 font-semibold text-slate-700">
                        <Icon name="comment" className="h-4 w-4" />
                        {post.comments}
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 font-semibold text-slate-700">
                        <Icon name="calendar" className="h-4 w-4" />
                        {formatShortDate(event.date)}
                    </div>
                </div>
            </div>
        </article>
    );
}

export function EmptyState({ title, description }) {
    return (
        <div className="panel-grid rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
            <p className="dashboard-display text-2xl font-bold text-slate-950">{title}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        </div>
    );
}

export function FloatingCreateButton() {
    return (
        <a
            href="/events/private/create"
            aria-label="Create private event"
            className="fixed bottom-24 right-6 sm:bottom-10 sm:right-10 z-40 inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#5e50b0] text-white shadow-[0_20px_40px_-16px_rgba(94,80,176,0.8)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-16px_rgba(94,80,176,0.95)]"
        >
            <span aria-hidden="true" className="material-symbols-outlined text-[32px] leading-none">add</span>
        </a>
    );
}
