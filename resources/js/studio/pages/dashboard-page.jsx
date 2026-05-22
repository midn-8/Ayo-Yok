import * as React from 'react';

import { activeEvents, attendeeTrend, dashboardStats, recentActivity, revenueTrend } from '../mock-data';
import { logoAyoyokTransparent } from '../../brand-assets';
import {
    Money,
    StudioActivityList,
    StudioBars,
    StudioPill,
    StudioSectionHeader,
    StudioStatCard,
    StudioSurface,
} from '../primitives';
import { StudioShell } from '../studio-shell';
import { formatDate } from '../utils';

export function StudioDashboardPage() {
    const [showIntro, setShowIntro] = React.useState(true);
    const [introActive, setIntroActive] = React.useState(false);

    React.useEffect(() => {
        const activateTimer = window.setTimeout(() => setIntroActive(true), 60);
        const hideTimer = window.setTimeout(() => setShowIntro(false), 3000);

        return () => {
            window.clearTimeout(activateTimer);
            window.clearTimeout(hideTimer);
        };
    }, []);

    return (
        <>
            {showIntro ? (
                <div className="fixed inset-0 z-[140] flex items-center justify-center bg-[#070b16]/95 backdrop-blur-md">
                    <div
                        className={`rounded-[34px] border border-white/15 bg-white/[0.04] px-10 py-12 text-center shadow-[0_40px_120px_-35px_rgba(56,189,248,0.45)] transition-all duration-700 ${
                            introActive ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-5 scale-90 opacity-0'
                        }`}
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-300">Welcome</p>
                        <div className="mt-5 flex flex-col items-center gap-4">
                            <img
                                src={logoAyoyokTransparent}
                                alt="AyoYok Business Partner"
                                className="h-20 w-auto drop-shadow-[0_20px_36px_rgba(56,189,248,0.25)] sm:h-24"
                            />
                            <h2 className="bg-gradient-to-r from-orange-300 via-fuchsia-300 to-sky-300 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
                                Business Partner
                            </h2>
                        </div>
                    </div>
                </div>
            ) : null}

            <StudioShell
                active="dashboard"
                title="Organizer Dashboard"
                description="Track performance, monitor event momentum, and make fast revenue decisions from one premium workspace."
                actions={
                    <>
                        <button
                            type="button"
                            className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.1]"
                        >
                            Export Report
                        </button>
                        <a
                            href="/studio/create-event"
                            className="rounded-full border border-sky-300/35 bg-sky-400/15 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:bg-sky-400/30"
                        >
                            Create Event
                        </a>
                    </>
                }
            >
                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {dashboardStats.map((stat, index) => (
                        <StudioStatCard
                            key={stat.label}
                            icon={index === 0 ? 'cash' : index === 1 ? 'users' : index === 2 ? 'bolt' : 'calendar'}
                            label={stat.label}
                            value={stat.value}
                            trend={stat.trend}
                            tone={stat.tone}
                        />
                    ))}
                </section>

                <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                    <StudioSurface>
                        <StudioSectionHeader title="Revenue & Attendance Pulse" description="Monthly trajectory to compare financial growth with audience velocity." />

                        <div className="mt-6 grid gap-6 md:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-slate-200">Revenue Trend</p>
                                    <StudioPill label="+22% MOM" tone="emerald" />
                                </div>
                                <div className="mt-4">
                                    <StudioBars values={revenueTrend} color="from-emerald-400 to-cyan-300" />
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-slate-200">Attendee Trend</p>
                                    <StudioPill label="+14% MOM" tone="sky" />
                                </div>
                                <div className="mt-4">
                                    <StudioBars values={attendeeTrend} color="from-sky-400 to-violet-300" />
                                </div>
                            </div>
                        </div>
                    </StudioSurface>

                    <StudioSurface>
                        <StudioSectionHeader title="Recent Activity" description="Live operational events and account movements." />
                        <div className="mt-5">
                            <StudioActivityList items={recentActivity} />
                        </div>
                    </StudioSurface>
                </section>

                <section>
                    <StudioSurface>
                        <StudioSectionHeader title="Active & Upcoming Events" description="Monitor ticket sell-through and revenue exposure for your upcoming portfolio." />
                        <div className="mt-5 overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em] text-slate-400">
                                        <th className="px-3 py-3 font-semibold">Event</th>
                                        <th className="px-3 py-3 font-semibold">Date</th>
                                        <th className="px-3 py-3 font-semibold">Status</th>
                                        <th className="px-3 py-3 font-semibold">Capacity</th>
                                        <th className="px-3 py-3 font-semibold">Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeEvents.map((event) => (
                                        <tr key={event.id} className="border-b border-white/5 text-slate-200">
                                            <td className="px-3 py-4">
                                                <p className="font-semibold text-white">{event.title}</p>
                                                <p className="text-xs text-slate-400">{event.location}</p>
                                            </td>
                                            <td className="px-3 py-4 text-slate-300">{formatDate(event.date)}</td>
                                            <td className="px-3 py-4">
                                                <StudioPill
                                                    label={event.status}
                                                    tone={event.status === 'Live' ? 'emerald' : event.status === 'Selling' ? 'sky' : 'amber'}
                                                />
                                            </td>
                                            <td className="px-3 py-4 text-slate-300">
                                                {event.sold.toLocaleString()} / {event.cap.toLocaleString()}
                                            </td>
                                            <td className="px-3 py-4 font-semibold text-white">
                                                <Money value={event.revenue} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </StudioSurface>
                </section>
            </StudioShell>
        </>
    );
}
