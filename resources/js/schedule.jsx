import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

import { BASE_DATE, CATEGORY_META, getJoinedEvents } from './social-hub/mockData';
import {
    classNames,
    CompactEventItem,
    EmptyState,
    FloatingCreateButton,
    formatEventDate,
    formatMonthLabel,
    Icon,
    SectionHeading,
    StatCard,
    TopNavigation,
} from './social-hub/ui';

const { StrictMode, useMemo, useState } = React;

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

function SchedulePage({ userName }) {
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

    return (
        <div className="dashboard-shell min-h-screen">
            <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 sm:py-6">
                <TopNavigation
                    userName={userName}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    activePath="schedule"
                    searchPlaceholder="Search joined events, locations, or ticket status"
                />

                <main className="mt-6 space-y-6">
                    <section className="panel-dark overflow-hidden p-6 sm:p-8">
                        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-center">
                            <div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                                        Personal schedule
                                    </span>
                                    <span className="rounded-full bg-fuchsia-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-100">
                                        Joined event calendar
                                    </span>
                                </div>
                                <h1 className="dashboard-display mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                    Your joined events now live on a calendar instead of getting lost in a ticket list.
                                </h1>
                                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                                    Every joined event appears as a colored marker. Tap a date to inspect time, location, and ticket status.
                                </p>
                            </div>

                            <div className="grid gap-3 text-sm">
                                <div className="rounded-[24px] bg-white/8 p-4">
                                    <p className="text-slate-400">Joined events</p>
                                    <p className="mt-2 text-2xl font-bold text-white">{joinedEvents.length}</p>
                                </div>
                                <div className="rounded-[24px] bg-white/8 p-4">
                                    <p className="text-slate-400">Upcoming</p>
                                    <p className="mt-2 text-2xl font-bold text-white">{upcomingEvents.length}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-4 md:grid-cols-3">
                        <StatCard label="Visible Tickets" value={visibleEvents.length} note="Filtered schedule items currently rendered on the calendar." />
                        <StatCard
                            label="Selected Day"
                            value={new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(selectedDate)}
                            note="Tap a date cell to inspect ticket status, time, and venue."
                        />
                        <StatCard label="Search Filter" value={searchTerm ? 'Active' : 'All'} note="The calendar and detail panel stay in sync with your schedule search." />
                    </section>

                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                        <section className="panel p-6 sm:p-7">
                            <SectionHeading
                                eyebrow="Calendar view"
                                title={formatMonthLabel(currentMonth)}
                                description="Colored dots show joined events on each date. Switch months without leaving the schedule."
                                action={
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setCurrentMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
                                            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                        >
                                            Prev
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setCurrentMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
                                            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800"
                                        >
                                            Next
                                        </button>
                                    </div>
                                }
                            />

                            <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((label) => (
                                    <div key={label} className="py-2">
                                        {label}
                                    </div>
                                ))}
                            </div>

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
                                                    ? 'border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/15'
                                                    : isCurrentMonth
                                                      ? 'border-slate-200 bg-white hover:-translate-y-0.5 hover:shadow-lg'
                                                      : 'border-slate-200/60 bg-slate-50 text-slate-400',
                                            )}
                                        >
                                            <div className="flex items-start justify-between">
                                                <span className="text-sm font-semibold">{date.getDate()}</span>
                                                {dayEvents.length > 0 ? (
                                                    <span className={classNames('rounded-full px-2 py-0.5 text-[10px] font-semibold', isSelected ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600')}>
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
                                                <p className={classNames('mt-3 line-clamp-2 text-xs font-medium', isSelected ? 'text-slate-200' : 'text-slate-500')}>
                                                    {dayEvents[0].title}
                                                </p>
                                            ) : (
                                                <p className={classNames('mt-3 text-xs', isSelected ? 'text-slate-300' : 'text-slate-400')}>Open day</p>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        <aside className="space-y-6">
                            <section className="panel-dark p-6 transition-all duration-300">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Selected date</p>
                                <h2 className="dashboard-display mt-3 text-2xl font-bold text-white">
                                    {new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(selectedDate)}
                                </h2>

                                <div className="mt-5 space-y-3">
                                    {selectedDayEvents.length === 0 ? (
                                        <div className="rounded-[24px] bg-white/6 px-4 py-5 text-sm text-slate-300">
                                            No joined events on this date.
                                        </div>
                                    ) : (
                                        selectedDayEvents.map((event) => (
                                            <div key={event.id} className="rounded-[24px] bg-white/6 p-4">
                                                <p className="text-sm font-semibold text-white">{event.title}</p>
                                                <div className="mt-3 space-y-2 text-sm text-slate-200">
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
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>

                            <section className="panel p-6">
                                <SectionHeading eyebrow="Upcoming queue" title="Next joined events" />
                                <div className="mt-5 space-y-3">
                                    {upcomingEvents.length === 0 ? (
                                        <EmptyState
                                            title="No upcoming tickets."
                                            description="Once you join or pay for an event, it will appear here and on the calendar."
                                        />
                                    ) : (
                                        upcomingEvents.slice(0, 4).map((event) => (
                                            <CompactEventItem
                                                key={event.id}
                                                event={event}
                                                badge={event.ticketStatus}
                                                actionLabel={event.location}
                                                onOpen={() => setSelectedDate(new Date(event.date))}
                                            />
                                        ))
                                    )}
                                </div>
                            </section>
                        </aside>
                    </div>
                </main>
            </div>

            <FloatingCreateButton />
        </div>
    );
}

const mountNode = document.getElementById('ayoyok-schedule-root');

if (mountNode) {
    createRoot(mountNode).render(
        <StrictMode>
            <SchedulePage userName={mountNode.dataset.userName || 'AyoYok User'} />
        </StrictMode>,
    );
}
