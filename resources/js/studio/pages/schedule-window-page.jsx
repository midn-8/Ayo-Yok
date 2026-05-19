import * as React from 'react';

import { createStudioId, useStudioWorkspace } from '../workspace-store';
import { StudioNotice, StudioPill, StudioSectionHeader, StudioSurface } from '../primitives';
import { StudioShell } from '../studio-shell';

function getStageTone(stage) {
    if (stage === 'Live') return 'emerald';
    if (stage === 'Promotion') return 'sky';
    if (stage === 'Planning') return 'violet';
    return 'amber';
}

const DEFAULT_BLOCK = {
    eventName: 'New Partner Event',
    date: '2026-07-15',
    time: '18:30',
    location: 'Jakarta',
    stage: 'Planning',
    task: 'Set initial event checklist',
};

export function StudioScheduleWindowPage() {
    const [workspace, updateWorkspace] = useStudioWorkspace();
    const [form, setForm] = React.useState(DEFAULT_BLOCK);
    const [statusNotice, setStatusNotice] = React.useState({ id: 0, text: '' });

    const scheduleBlocks = workspace.scheduleBlocks || [];

    function addEventBlock() {
        const payload = {
            id: createStudioId('sch'),
            eventName: form.eventName,
            date: form.date,
            time: form.time,
            location: form.location,
            stage: form.stage,
            task: form.task,
        };

        updateWorkspace((current) => ({
            ...current,
            scheduleBlocks: [payload, ...current.scheduleBlocks].slice(0, 40),
        }));

        setStatusNotice({ id: Date.now(), text: 'Schedule block added.' });
    }

    return (
        <StudioShell
            active="schedule-window"
            title="Schedule Window"
            description="Track every organizer event timeline, task checkpoint, and operational status in one planning window."
            actions={
                <button
                    type="button"
                    onClick={addEventBlock}
                    className="rounded-full border border-sky-300/35 bg-sky-400/15 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:bg-sky-400/30"
                >
                    Add Event Block
                </button>
            }
        >
            <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <StudioSurface>
                    <StudioSectionHeader title="Event Calendar Timeline" description="Upcoming events ordered by date with active checklist focus." />
                    <div className="mt-5 space-y-3">
                        {scheduleBlocks.map((event) => (
                            <article key={event.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-base font-semibold text-white">{event.eventName}</p>
                                    <StudioPill label={event.stage} tone={getStageTone(event.stage)} />
                                </div>
                                <p className="mt-2 text-sm text-slate-300">
                                    {event.date} • {event.time} • {event.location}
                                </p>
                                <p className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-200">Current task: {event.task}</p>
                            </article>
                        ))}
                    </div>
                </StudioSurface>

                <div className="space-y-4">
                    <StudioSurface>
                        <StudioSectionHeader title="Add New Block" />
                        <form className="mt-4 grid gap-3" onSubmit={(event) => event.preventDefault()}>
                            <input
                                value={form.eventName}
                                onChange={(event) => setForm((current) => ({ ...current, eventName: event.target.value }))}
                                className="h-10 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-slate-100"
                                placeholder="Event name"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="date"
                                    value={form.date}
                                    onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
                                    className="h-10 rounded-xl border border-white/15 bg-[#0f172a] px-3 text-sm text-slate-100"
                                />
                                <input
                                    type="time"
                                    value={form.time}
                                    onChange={(event) => setForm((current) => ({ ...current, time: event.target.value }))}
                                    className="h-10 rounded-xl border border-white/15 bg-[#0f172a] px-3 text-sm text-slate-100"
                                />
                            </div>
                            <input
                                value={form.location}
                                onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
                                className="h-10 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-slate-100"
                                placeholder="Location"
                            />
                            <select
                                value={form.stage}
                                onChange={(event) => setForm((current) => ({ ...current, stage: event.target.value }))}
                                className="h-10 rounded-xl border border-white/15 bg-[#0f172a] px-3 text-sm text-slate-100"
                            >
                                <option>Planning</option>
                                <option>Promotion</option>
                                <option>Live</option>
                                <option>Draft</option>
                            </select>
                            <textarea
                                rows={3}
                                value={form.task}
                                onChange={(event) => setForm((current) => ({ ...current, task: event.target.value }))}
                                className="rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-slate-100"
                                placeholder="Current task"
                            />
                        </form>
                        <StudioNotice key={statusNotice.id} message={statusNotice.text} />
                    </StudioSurface>

                    <StudioSurface>
                        <StudioSectionHeader title="Automation" />
                        <ul className="mt-4 space-y-2 text-sm text-slate-300">
                            <li>Auto-create reminder story 24h before each event.</li>
                            <li>Queue post-event memory prompt 1h after checkout closes.</li>
                            <li>Sync campaign pause when tickets reach 95% sold.</li>
                        </ul>
                    </StudioSurface>
                </div>
            </section>
        </StudioShell>
    );
}
