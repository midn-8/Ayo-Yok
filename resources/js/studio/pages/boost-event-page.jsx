import * as React from 'react';

import { boostRecommendations } from '../mock-data';
import { createStudioId, useStudioWorkspace } from '../workspace-store';
import { StudioBars, StudioNotice, StudioPill, StudioSectionHeader, StudioSurface } from '../primitives';
import { StudioShell } from '../studio-shell';

const DEFAULT_FORM = {
    eventName: 'Neo Bazaar Vol.4',
    audienceType: 'Lookalike from past attendees',
    audienceRegion: 'Jakarta, Tangerang, Bekasi',
    dailyBudget: '750000',
    durationDays: '12',
};

export function StudioBoostEventPage() {
    const [workspace, updateWorkspace] = useStudioWorkspace();
    const [form, setForm] = React.useState(DEFAULT_FORM);
    const [statusNotice, setStatusNotice] = React.useState({ id: 0, text: '' });

    const estimatedSpend = Number(form.dailyBudget || 0) * Number(form.durationDays || 0);

    function launchCampaign() {
        const payload = {
            id: createStudioId('cmp'),
            eventName: form.eventName,
            audienceType: form.audienceType,
            audienceRegion: form.audienceRegion,
            dailyBudget: Number(form.dailyBudget || 0),
            durationDays: Number(form.durationDays || 0),
            estimatedSpend,
            status: 'Live',
            launchedAt: new Date().toISOString(),
        };
        const autoPost = {
            id: createStudioId('ad'),
            eventName: payload.eventName,
            caption: `Boost campaign is live for ${payload.eventName}. Discover why this event is trending now.`,
            channel: 'Auto from Boost Campaign',
            status: 'Scheduled',
            publishAt: new Date().toISOString(),
        };

        updateWorkspace((current) => ({
            ...current,
            campaigns: [payload, ...current.campaigns].slice(0, 20),
            socialCampaignPosts: [autoPost, ...current.socialCampaignPosts].slice(0, 30),
        }));

        showStatus('Campaign launched and auto-added to social campaign pipeline.');
    }

    return (
        <StudioShell
            active="boost-event"
            title="Boost Event"
            description="Launch targeted campaigns with budget controls, timing intelligence, and projected outcomes before spending."
            actions={
                <button
                    type="button"
                    onClick={launchCampaign}
                    className="rounded-full border border-fuchsia-300/35 bg-fuchsia-400/15 px-4 py-2 text-sm font-semibold text-fuchsia-100 transition hover:bg-fuchsia-400/30"
                >
                    Launch Campaign
                </button>
            }
        >
            <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                <StudioSurface>
                    <StudioSectionHeader title="Campaign Setup" description="Configure audience targeting, daily budget, and duration." />

                    <form className="mt-6 grid gap-4" onSubmit={(event) => event.preventDefault()}>
                        <label className="grid gap-2 text-sm">
                            <span className="font-semibold text-slate-200">Select Event</span>
                            <select
                                value={form.eventName}
                                onChange={(event) => setForm((current) => ({ ...current, eventName: event.target.value }))}
                                className="h-11 rounded-xl border border-white/15 bg-[#0f172a] px-3 text-slate-100 outline-none transition focus:border-fuchsia-300/50"
                            >
                                <option>Neo Bazaar Vol.4</option>
                                <option>Sunset Runners Social 10K</option>
                                <option>Rooftop Jazz Sessions</option>
                            </select>
                        </label>

                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="grid gap-2 text-sm">
                                <span className="font-semibold text-slate-200">Audience Type</span>
                                <select
                                    value={form.audienceType}
                                    onChange={(event) => setForm((current) => ({ ...current, audienceType: event.target.value }))}
                                    className="h-11 rounded-xl border border-white/15 bg-[#0f172a] px-3 text-slate-100 outline-none transition focus:border-fuchsia-300/50"
                                >
                                    <option>Lookalike from past attendees</option>
                                    <option>Retarget profile visitors</option>
                                    <option>Geo + category intent</option>
                                </select>
                            </label>

                            <label className="grid gap-2 text-sm">
                                <span className="font-semibold text-slate-200">Audience Region</span>
                                <input
                                    value={form.audienceRegion}
                                    onChange={(event) => setForm((current) => ({ ...current, audienceRegion: event.target.value }))}
                                    className="h-11 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-slate-100 outline-none transition focus:border-fuchsia-300/50"
                                />
                            </label>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="grid gap-2 text-sm">
                                <span className="font-semibold text-slate-200">Daily Budget (IDR)</span>
                                <input
                                    type="number"
                                    value={form.dailyBudget}
                                    onChange={(event) => setForm((current) => ({ ...current, dailyBudget: event.target.value }))}
                                    className="h-11 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-slate-100 outline-none transition focus:border-fuchsia-300/50"
                                />
                            </label>
                            <label className="grid gap-2 text-sm">
                                <span className="font-semibold text-slate-200">Duration (days)</span>
                                <input
                                    type="number"
                                    value={form.durationDays}
                                    onChange={(event) => setForm((current) => ({ ...current, durationDays: event.target.value }))}
                                    className="h-11 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-slate-100 outline-none transition focus:border-fuchsia-300/50"
                                />
                            </label>
                        </div>
                    </form>

                    <div className="mt-6 rounded-2xl border border-fuchsia-300/20 bg-fuchsia-500/10 p-4 text-sm text-fuchsia-100">
                        Projected spend: <span className="font-semibold">Rp {estimatedSpend.toLocaleString('id-ID')}</span> with estimated ticket conversions of
                        <span className="font-semibold"> 670 - 910</span>.
                    </div>
                    <StudioNotice key={statusNotice.id} message={statusNotice.text} />
                </StudioSurface>

                <div className="space-y-4">
                    <StudioSurface>
                        <StudioSectionHeader title="Analytics Preview" />
                        <div className="mt-4">
                            <StudioBars values={[20, 32, 28, 39, 47, 55, 49, 63]} color="from-fuchsia-400 to-sky-300" />
                        </div>
                        <p className="mt-4 text-sm text-slate-300">Predicted campaign response over 8 intervals based on audience intent and historical ad performance.</p>
                    </StudioSurface>

                    <StudioSurface>
                        <StudioSectionHeader title="Recommendations" />
                        <div className="mt-4 space-y-3">
                            {boostRecommendations.map((item) => (
                                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm text-slate-300">{item.label}</p>
                                        <StudioPill label={item.value} tone="violet" />
                                    </div>
                                    <p className="mt-2 text-xs text-slate-400">{item.note}</p>
                                </div>
                            ))}
                        </div>
                    </StudioSurface>

                    <StudioSurface>
                        <StudioSectionHeader title="Active Campaigns" />
                        <div className="mt-4 space-y-2">
                            {workspace.campaigns.length === 0 ? (
                                <p className="text-sm text-slate-400">No campaign launched yet.</p>
                            ) : (
                                workspace.campaigns.slice(0, 4).map((campaign) => (
                                    <div key={campaign.id} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-200">
                                        {campaign.eventName} • Rp {campaign.estimatedSpend.toLocaleString('id-ID')} • {campaign.status}
                                    </div>
                                ))
                            )}
                        </div>
                    </StudioSurface>
                </div>
            </section>
        </StudioShell>
    );
}
    function showStatus(text) {
        setStatusNotice({ id: Date.now(), text });
    }
