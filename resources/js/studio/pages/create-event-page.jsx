import * as React from 'react';

import { StudioCreateEventValidationError, validateAndSanitizeCreateEventInput } from '../create-event-input-guard';
import { createEventDraft } from '../mock-data';
import { createStudioId, useStudioWorkspace } from '../workspace-store';
import { StudioIcon, StudioNotice, StudioPill, StudioSectionHeader, StudioSurface } from '../primitives';
import { StudioShell } from '../studio-shell';

const DEFAULT_FORM = {
    title: createEventDraft.title,
    description: createEventDraft.description,
    category: createEventDraft.category,
    location: createEventDraft.location,
    date: createEventDraft.date,
    time: createEventDraft.time,
    capacity: String(createEventDraft.capacity),
    ticketPrice: String(createEventDraft.ticketPrice),
};

export function StudioCreateEventPage() {
    const [workspace, updateWorkspace] = useStudioWorkspace();
    const [form, setForm] = React.useState(DEFAULT_FORM);
    const [statusNotice, setStatusNotice] = React.useState({ id: 0, text: '', tone: 'emerald' });
    const [bannerPreview, setBannerPreview] = React.useState('');
    const fileInputRef = React.useRef(null);

    const exclusiveEnabled = workspace.plan?.exclusiveAccess;

    function showStatus(text, tone = 'emerald') {
        setStatusNotice({ id: Date.now(), text, tone });
    }

    function updateField(field, value) {
        setForm((current) => ({ ...current, [field]: value }));
    }

    function toEventPayload(mode) {
        // Previous logic accepted raw form values directly:
        // title: form.title,
        // description: form.description,
        const sanitized = validateAndSanitizeCreateEventInput({
            title: form.title,
            description: form.description,
        });

        return {
            id: createStudioId('event'),
            title: sanitized.title,
            description: sanitized.description,
            category: form.category,
            location: form.location,
            date: form.date,
            time: form.time,
            capacity: Number(form.capacity || 0),
            ticketPrice: Number(form.ticketPrice || 0),
            bannerPreview,
            mode,
            savedAt: new Date().toISOString(),
        };
    }

    function saveDraft() {
        let payload;

        try {
            payload = toEventPayload('draft');
        } catch (error) {
            if (error instanceof StudioCreateEventValidationError) {
                showStatus(error.message, 'amber');
                return;
            }

            throw error;
        }

        updateWorkspace((current) => ({
            ...current,
            eventDrafts: [payload, ...current.eventDrafts].slice(0, 8),
        }));

        showStatus('Draft saved to Studio workspace.');
    }

    function publishEvent() {
        let payload;

        try {
            payload = toEventPayload('published');
        } catch (error) {
            if (error instanceof StudioCreateEventValidationError) {
                showStatus(error.message, 'amber');
                return;
            }

            throw error;
        }

        const autoPost = {
            id: createStudioId('ad'),
            eventName: payload.title,
            caption: `Now live: ${payload.title}. Reserve your seat and share it with your circle.`,
            channel: 'Auto from Publish',
            status: 'Scheduled',
            publishAt: new Date().toISOString(),
        };

        updateWorkspace((current) => ({
            ...current,
            publishedEvents: [payload, ...current.publishedEvents].slice(0, 12),
            socialCampaignPosts: [autoPost, ...current.socialCampaignPosts].slice(0, 30),
        }));

        showStatus('Event published and auto-added to social campaign pipeline.');
    }

    function handleBannerPick(event) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setBannerPreview(reader.result);
            }
        };
        reader.readAsDataURL(file);
    }

    function createExclusiveInviteFromDraft() {
        if (!exclusiveEnabled) {
            return;
        }

        const invitation = {
            id: createStudioId('inv'),
            invitationTitle: `${form.title} - Signature Invite`,
            hostLine: 'Together with our partners and creative community',
            eventDate: form.date,
            eventTime: form.time,
            venue: form.location,
            dressCode: 'Formal / Elegant Dark',
            timeline: '18:30 Gate Open, 19:00 Main Session, 21:00 After Gathering',
            rsvpDeadline: form.date,
            personalMessage: `You are selected for exclusive access to ${form.title}.`,
            accessCode: 'PARTNER-GUEST',
            recipients: [],
            status: 'Draft',
            createdAt: new Date().toISOString(),
        };

        updateWorkspace((current) => ({
            ...current,
            invitationDrafts: [invitation, ...current.invitationDrafts].slice(0, 20),
        }));

        showStatus('Exclusive invitation draft created. Open Planning to refine and send.');
    }

    return (
        <StudioShell
            active="create-event"
            title="Create Event"
            description="Build premium event pages with ticketing controls, capacity management, and publish workflows."
            actions={
                <>
                    <button
                        type="button"
                        onClick={saveDraft}
                        className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.1]"
                    >
                        Save Draft
                    </button>
                    <button
                        type="button"
                        onClick={publishEvent}
                        className="rounded-full border border-emerald-300/35 bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/30"
                    >
                        Publish Event
                    </button>
                </>
            }
        >
            <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
                <StudioSurface>
                    <StudioSectionHeader title="Event Details" description="All public-facing details attendees will discover on the consumer platform." />

                    <form className="mt-6 grid gap-4" onSubmit={(event) => event.preventDefault()}>
                        <label className="grid gap-2 text-sm">
                            <span className="font-semibold text-slate-200">Title</span>
                            <input
                                value={form.title}
                                onChange={(event) => updateField('title', event.target.value)}
                                className="h-11 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-slate-100 outline-none transition focus:border-sky-300/50 focus:ring-4 focus:ring-sky-400/10"
                            />
                        </label>

                        <label className="grid gap-2 text-sm">
                            <span className="font-semibold text-slate-200">Description</span>
                            <textarea
                                rows={5}
                                value={form.description}
                                onChange={(event) => updateField('description', event.target.value)}
                                className="rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2 text-slate-100 outline-none transition focus:border-sky-300/50 focus:ring-4 focus:ring-sky-400/10"
                            />
                        </label>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="grid gap-2 text-sm">
                                <span className="font-semibold text-slate-200">Category</span>
                                <select
                                    value={form.category}
                                    onChange={(event) => updateField('category', event.target.value)}
                                    className="h-11 rounded-xl border border-white/15 bg-[#0f172a] px-3 text-slate-100 outline-none transition focus:border-sky-300/50"
                                >
                                    <option>Business Networking</option>
                                    <option>Music</option>
                                    <option>Sport</option>
                                    <option>Community</option>
                                    <option>Workshop</option>
                                </select>
                            </label>

                            <label className="grid gap-2 text-sm">
                                <span className="font-semibold text-slate-200">Location</span>
                                <input
                                    value={form.location}
                                    onChange={(event) => updateField('location', event.target.value)}
                                    className="h-11 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-slate-100 outline-none transition focus:border-sky-300/50"
                                />
                            </label>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <label className="grid gap-2 text-sm lg:col-span-1">
                                <span className="font-semibold text-slate-200">Date</span>
                                <input
                                    type="date"
                                    value={form.date}
                                    onChange={(event) => updateField('date', event.target.value)}
                                    className="h-11 rounded-xl border border-white/15 bg-[#0f172a] px-3 text-slate-100 outline-none transition focus:border-sky-300/50"
                                />
                            </label>

                            <label className="grid gap-2 text-sm lg:col-span-1">
                                <span className="font-semibold text-slate-200">Time</span>
                                <input
                                    type="time"
                                    value={form.time}
                                    onChange={(event) => updateField('time', event.target.value)}
                                    className="h-11 rounded-xl border border-white/15 bg-[#0f172a] px-3 text-slate-100 outline-none transition focus:border-sky-300/50"
                                />
                            </label>

                            <label className="grid gap-2 text-sm lg:col-span-1">
                                <span className="font-semibold text-slate-200">Capacity</span>
                                <input
                                    type="number"
                                    value={form.capacity}
                                    onChange={(event) => updateField('capacity', event.target.value)}
                                    className="h-11 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-slate-100 outline-none transition focus:border-sky-300/50"
                                />
                            </label>

                            <label className="grid gap-2 text-sm lg:col-span-1">
                                <span className="font-semibold text-slate-200">Ticket Price (IDR)</span>
                                <input
                                    type="number"
                                    value={form.ticketPrice}
                                    onChange={(event) => updateField('ticketPrice', event.target.value)}
                                    className="h-11 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-slate-100 outline-none transition focus:border-sky-300/50"
                                />
                            </label>
                        </div>

                        <label className="grid gap-2 text-sm">
                            <span className="font-semibold text-slate-200">Banner Upload</span>
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerPick} />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex h-36 items-center justify-center gap-2 rounded-2xl border border-dashed border-white/25 bg-white/[0.03] text-slate-300 transition hover:border-sky-300/40 hover:text-sky-200"
                            >
                                <StudioIcon name="upload" className="h-5 w-5" />
                                {bannerPreview ? 'Replace Hero Banner' : 'Upload Hero Banner'}
                            </button>
                            {bannerPreview ? (
                                <img src={bannerPreview} alt="Hero banner preview" className="h-36 w-full rounded-2xl border border-white/15 object-cover" />
                            ) : null}
                        </label>
                    </form>
                </StudioSurface>

                <div className="space-y-4">
                    <StudioSurface>
                        <StudioSectionHeader title="Publishing State" />
                        <div className="mt-4 flex flex-wrap gap-2">
                            <StudioPill label="Draft" tone="amber" />
                            <StudioPill label="SEO Ready" tone="sky" />
                            <StudioPill label="Ticketing On" tone="emerald" />
                        </div>
                        <p className="mt-4 text-sm text-slate-300">Draft auto-save runs every 20 seconds. Switching to publish will notify existing followers and recommendation feeds.</p>
                        <StudioNotice key={statusNotice.id} message={statusNotice.text} tone={statusNotice.tone} />
                    </StudioSurface>

                    <StudioSurface>
                        <StudioSectionHeader title="Quick Tips" />
                        <ul className="mt-4 space-y-2 text-sm text-slate-300">
                            <li>Use a title under 56 chars for best mobile discovery conversion.</li>
                            <li>Set clear capacity to unlock waitlist automation.</li>
                            <li>Add ticket tiers after first publish if needed.</li>
                        </ul>
                    </StudioSurface>

                    <StudioSurface>
                        <StudioSectionHeader title="Draft Queue" />
                        <p className="mt-3 text-sm text-slate-300">Saved drafts: <span className="font-semibold text-slate-100">{workspace.eventDrafts.length}</span></p>
                        <p className="mt-1 text-sm text-slate-300">Published events: <span className="font-semibold text-slate-100">{workspace.publishedEvents.length}</span></p>
                        {exclusiveEnabled ? (
                            <button
                                type="button"
                                onClick={createExclusiveInviteFromDraft}
                                className="mt-4 w-full rounded-xl border border-violet-300/35 bg-violet-400/15 px-3 py-2 text-sm font-semibold text-violet-100 transition hover:bg-violet-400/30"
                            >
                                Create Exclusive Invitation Draft
                            </button>
                        ) : (
                            <p className="mt-3 text-xs text-slate-400">Enable Exclusive Plan in Planning to unlock detailed invitation drafts for VIP attendees.</p>
                        )}
                    </StudioSurface>
                </div>
            </section>
        </StudioShell>
    );
}
