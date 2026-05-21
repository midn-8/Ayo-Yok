import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

import { BASE_DATE, CATEGORY_META, getJoinedEvents, getInitials } from './social-hub/mockData';
import { classNames, formatEventDate, formatMonthLabel, formatPrice, Icon, FloatingCreateButton } from './social-hub/ui';

const { StrictMode, useMemo, useState } = React;

const NAV_ITEMS = [
    { id: 'dashboard', label: 'Home', href: '/dashboard' },
    { id: 'explore', label: 'Explore', href: '/explore' },
    { id: 'schedule', label: 'Schedule', href: '/schedule' },
    { id: 'profile', label: 'Profile', href: '/profile' },
];

function MaterialIcon({ name, className = '' }) {
    return (
        <span aria-hidden="true" className={classNames('material-symbols-outlined leading-none', className)}>
            {name}
        </span>
    );
}

function buildCalendarDays(currentMonth) {
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const startDay = startOfMonth.getDay();
    const startCursor = new Date(startOfMonth);
    startCursor.setDate(startOfMonth.getDate() - startDay);

    return Array.from({ length: 42 }, (_, index) => {
        const date = new Date(startCursor);
        date.setDate(startCursor.getDate() + index);
        return date;
    });
}

function isSameDay(left, right) {
    return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate();
}

function ScheduleNavigation({ userName, searchTerm, onSearchChange }) {
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
                            <p className="hidden text-xs text-[#797583] sm:block">Your personal event calendar.</p>
                        </div>
                    </a>

                    <nav className="hidden items-center gap-6 md:flex">
                        {NAV_ITEMS.map((item) => {
                            const isActive = item.id === 'schedule';

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
                            placeholder="Search schedule..."
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
                    <LogoutButton />
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

function SchedulePage({ userName, userUsername, userEmail }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date(BASE_DATE.getFullYear(), BASE_DATE.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState(new Date(BASE_DATE));

    const joinedEvents = useMemo(() => getJoinedEvents(), []);
    const query = searchTerm.trim().toLowerCase();
    const visibleEvents = joinedEvents.filter((event) => {
        if (query === '') {
            return true;
        }

        return [event.title, event.location, event.ticketStatus, event.category].some((value) => value.toLowerCase().includes(query));
    });

    const calendarDays = buildCalendarDays(currentMonth);
    const selectedDayEvents = visibleEvents.filter((event) => isSameDay(new Date(event.date), selectedDate));
    const upcomingEvents = visibleEvents.filter((event) => new Date(event.date) >= BASE_DATE);
    const displayHandle = userUsername || `@${String(userName || 'ayoyok-user').trim().toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <div
            className="editorial-shell editorial-copy min-h-screen bg-[#fdf8ff] pb-28 text-[#1c1b21] selection:bg-[#e5deff] selection:text-[#372687] md:pb-0"
            style={{ backgroundColor: '#fdf8ff' }}
        >
            <ScheduleNavigation userName={userName} searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <main className="pt-24">
                {/* Hero Banner */}
                <section className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-8">
                    <div className="overflow-hidden rounded-[32px] bg-[#312f36] p-8 text-white shadow-[0_24px_60px_-32px_rgba(49,47,54,0.65)] sm:p-12">
                        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-center">
                            <div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                                        Personal schedule
                                    </span>
                                    <span className="rounded-full bg-[#5e50b0]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#c8bfff]">
                                        Joined event calendar
                                    </span>
                                </div>
                                <h1 className="editorial-display mt-5 max-w-3xl text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[42px]">
                                    Your joined events, beautifully organized.
                                </h1>
                                <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
                                    Every joined event appears as a colored marker. Tap a date to inspect time, location, and ticket status.
                                </p>
                            </div>

                            <div className="grid gap-3 text-sm">
                                <div className="rounded-[24px] bg-white/8 p-4">
                                    <p className="text-white/55">Joined events</p>
                                    <p className="editorial-display mt-2 text-[28px] font-bold text-white">{joinedEvents.length}</p>
                                </div>
                                <div className="rounded-[24px] bg-white/8 p-4">
                                    <p className="text-white/55">Upcoming</p>
                                    <p className="editorial-display mt-2 text-[28px] font-bold text-white">{upcomingEvents.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Row */}
                <section className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-8">
                    <div className="grid gap-3 sm:grid-cols-3">
                        <div className="glass-card ambient-shadow rounded-[24px] border border-white/70 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#797583]">Visible Tickets</p>
                            <p className="editorial-display mt-3 text-[32px] font-semibold text-[#1c1b21]">{visibleEvents.length}</p>
                            <p className="mt-2 text-sm leading-6 text-[#484552]">Filtered schedule items.</p>
                        </div>
                        <div className="glass-card ambient-shadow rounded-[24px] border border-white/70 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#797583]">Selected Day</p>
                            <p className="editorial-display mt-3 text-[32px] font-semibold text-[#1c1b21]">
                                {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(selectedDate)}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[#484552]">Tap a date to see details.</p>
                        </div>
                        <div className="glass-card ambient-shadow rounded-[24px] border border-white/70 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#797583]">Search Filter</p>
                            <p className="editorial-display mt-3 text-[32px] font-semibold text-[#1c1b21]">{searchTerm ? 'Active' : 'All'}</p>
                            <p className="mt-2 text-sm leading-6 text-[#484552]">Calendar stays in sync.</p>
                        </div>
                    </div>
                </section>

                {/* Calendar + Sidebar */}
                <section className="mx-auto max-w-[1200px] px-5 pb-20 lg:px-8">
                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                        {/* Calendar */}
                        <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 p-6 sm:p-7">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#797583]">Calendar view</p>
                                    <h2 className="editorial-display mt-2 text-[28px] font-semibold text-[#1c1b21] sm:text-[32px]">{formatMonthLabel(currentMonth)}</h2>
                                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#484552]">Colored dots show joined events on each date.</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
                                        className="rounded-full border border-[#c9c4d3] px-4 py-2 text-sm font-semibold text-[#484552] transition hover:border-[#5e50b0] hover:text-[#5e50b0]"
                                    >
                                        Prev
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
                                        className="rounded-full bg-[#5e50b0] px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(94,80,176,0.65)] transition hover:scale-[1.02]"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>

                            {/* Mobile search */}
                            <div className="mt-6 lg:hidden">
                                <div className="glass-card flex items-center rounded-full border border-white/70 px-4 py-3">
                                    <MaterialIcon name="search" className="text-[#797583]" />
                                    <input
                                        type="search"
                                        value={searchTerm}
                                        onChange={(event) => setSearchTerm(event.target.value)}
                                        placeholder="Search schedule..."
                                        className="ml-2 w-full border-none bg-transparent p-0 text-sm text-[#1c1b21] outline-none placeholder:text-[#797583]"
                                    />
                                </div>
                            </div>

                            {/* Day headers */}
                            <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#797583]">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((label) => (
                                    <div key={label} className="py-2">
                                        {label}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar grid */}
                            <div className="mt-2 grid grid-cols-7 gap-2">
                                {calendarDays.map((date) => {
                                    const dayEvents = visibleEvents.filter((event) => isSameDay(new Date(event.date), date));
                                    const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                                    const isSelected = isSameDay(date, selectedDate);

                                    return (
                                        <button
                                            key={date.toISOString()}
                                            type="button"
                                            onClick={() => setSelectedDate(date)}
                                            className={classNames(
                                                'min-h-[110px] rounded-[24px] border p-3 text-left transition',
                                                isSelected
                                                    ? 'border-[#5e50b0] bg-[#5e50b0] text-white shadow-[0_14px_30px_-18px_rgba(94,80,176,0.65)]'
                                                    : isCurrentMonth
                                                      ? 'border-white/70 bg-white/80 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_-28px_rgba(94,80,176,0.25)]'
                                                      : 'border-white/40 bg-[#f7f2fb]/50 text-[#797583]',
                                            )}
                                        >
                                            <div className="flex items-start justify-between">
                                                <span className="text-sm font-semibold">{date.getDate()}</span>
                                                {dayEvents.length > 0 ? (
                                                    <span className={classNames('rounded-full px-2 py-0.5 text-[10px] font-semibold', isSelected ? 'bg-white/15 text-white' : 'bg-[#e5deff] text-[#372687]')}>
                                                        {dayEvents.length}
                                                    </span>
                                                ) : null}
                                            </div>

                                            <div className="mt-6 flex flex-wrap gap-1">
                                                {dayEvents.slice(0, 4).map((event) => (
                                                    <span
                                                        key={event.id}
                                                        className={classNames(
                                                            'h-2.5 w-2.5 rounded-full',
                                                            isSelected ? 'bg-white' : CATEGORY_META[event.category].marker,
                                                        )}
                                                    />
                                                ))}
                                            </div>

                                            {dayEvents[0] ? (
                                                <p className={classNames('mt-3 line-clamp-2 text-xs font-medium', isSelected ? 'text-white/80' : 'text-[#484552]')}>
                                                    {dayEvents[0].title}
                                                </p>
                                            ) : (
                                                <p className={classNames('mt-3 text-xs', isSelected ? 'text-white/60' : 'text-[#797583]')}>Open day</p>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-6">
                            {/* Selected date panel */}
                            <div className="overflow-hidden rounded-[32px] bg-[#312f36] p-6 text-white shadow-[0_24px_60px_-32px_rgba(49,47,54,0.65)]">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">Selected date</p>
                                <h2 className="editorial-display mt-3 text-[24px] font-semibold text-white">
                                    {new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(selectedDate)}
                                </h2>

                                <div className="mt-5 space-y-3">
                                    {selectedDayEvents.length === 0 ? (
                                        <div className="rounded-[24px] bg-white/8 px-4 py-5 text-sm text-white/72">
                                            No joined events on this date.
                                        </div>
                                    ) : (
                                        selectedDayEvents.map((event) => (
                                            <div key={event.id} className="rounded-[24px] bg-white/8 p-4">
                                                <p className="text-sm font-semibold text-white">{event.title}</p>
                                                <div className="mt-3 space-y-2 text-sm text-white/82">
                                                    <div className="flex items-center gap-3">
                                                        <Icon name="clock" className="h-4 w-4" />
                                                        <span>{formatEventDate(event.date)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Icon name="map" className="h-4 w-4" />
                                                        <span>{event.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Icon name="ticket" className="h-4 w-4" />
                                                        <span>{event.ticketStatus}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Icon name="credit-card" className="h-4 w-4" />
                                                        <span>{formatPrice(event.price)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Upcoming queue */}
                            <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 p-6">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#797583]">Upcoming queue</p>
                                    <h3 className="editorial-display mt-2 text-[24px] font-semibold text-[#1c1b21]">Next joined events</h3>
                                </div>
                                <div className="mt-5 space-y-3">
                                    {upcomingEvents.length === 0 ? (
                                        <div className="glass-card ambient-shadow rounded-[28px] border border-white/70 px-6 py-12 text-center">
                                            <h3 className="editorial-display text-2xl font-semibold text-[#1c1b21]">No upcoming tickets.</h3>
                                            <p className="mt-3 text-sm leading-7 text-[#484552]">Once you join or pay for an event, it will appear here and on the calendar.</p>
                                        </div>
                                    ) : (
                                        upcomingEvents.slice(0, 4).map((event) => (
                                            <button
                                                key={event.id}
                                                type="button"
                                                onClick={() => setSelectedDate(new Date(event.date))}
                                                className="flex w-full items-center gap-4 rounded-[24px] border border-white/70 bg-white/80 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-[0_20px_42px_-28px_rgba(94,80,176,0.45)]"
                                            >
                                                <img alt={event.title} className="h-20 w-20 rounded-[20px] object-cover" src={event.image} />
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="rounded-full bg-[#f1ecf5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5e50b0]">
                                                            {event.ticketStatus}
                                                        </span>
                                                        <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#797583]">
                                                            {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(event.date))}
                                                        </span>
                                                    </div>
                                                    <h3 className="editorial-display mt-3 truncate text-lg font-semibold text-[#1c1b21]">{event.title}</h3>
                                                    <p className="mt-1 truncate text-sm text-[#484552]">{event.location}</p>
                                                </div>
                                                <MaterialIcon name="arrow_forward" className="text-[#797583]" />
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        </aside>
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
                                <li><a className="transition-colors hover:text-[#5e50b0]" href="/profile">{displayHandle}</a></li>
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
                <a href="/explore" className="flex flex-col items-center justify-center px-5 py-1 text-[#484552]">
                    <MaterialIcon name="explore" />
                    <span className="text-[11px] font-semibold">Explore</span>
                </a>
                <a href="/schedule" className="flex flex-col items-center justify-center rounded-full bg-[#e5deff] px-5 py-1 text-[#372687]">
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

const mountNode = document.getElementById('ayoyok-schedule-root');

if (mountNode) {
    createRoot(mountNode).render(
        <StrictMode>
            <SchedulePage
                userEmail={mountNode.dataset.userEmail || 'hello@ayoyok.app'}
                userName={mountNode.dataset.userName || 'AyoYok User'}
                userUsername={mountNode.dataset.userUsername || '@ayoyok-user'}
            />
        </StrictMode>,
    );
}
