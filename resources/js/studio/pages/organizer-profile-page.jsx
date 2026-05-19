import * as React from 'react';

import { attendeeMemories, organizerProfileDefaults, organizerStats, storyDrafts } from '../mock-data';
import { getIntegratedMemories, loadIntegrationState } from '../integration-settings';
import { useStudioWorkspace } from '../workspace-store';
import { StudioIcon, StudioPill, StudioSectionHeader, StudioSurface } from '../primitives';
import { StudioShell } from '../studio-shell';
import { formatDate } from '../utils';

const STORAGE_KEY = 'ayoyok-studio-organizer-profile';

export function StudioOrganizerProfilePage() {
    const [workspace] = useStudioWorkspace();
    const [profile, setProfile] = React.useState(organizerProfileDefaults);
    const [saveState, setSaveState] = React.useState('idle');
    const [integratedMemories, setIntegratedMemories] = React.useState(attendeeMemories);
    const socialPosts = workspace.socialCampaignPosts || [];

    React.useEffect(() => {
        const raw = window.localStorage.getItem(STORAGE_KEY);

        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                setProfile((current) => ({ ...current, ...parsed }));
            } catch {
                // Ignore invalid cache and keep defaults.
            }
        }

        const integrationState = loadIntegrationState();
        setIntegratedMemories(getIntegratedMemories(attendeeMemories, integrationState));
    }, []);

    function updateField(field, value) {
        setProfile((current) => ({ ...current, [field]: value }));
    }

    function saveProfile() {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
        const integrationState = loadIntegrationState();
        setIntegratedMemories(getIntegratedMemories(attendeeMemories, integrationState));
        setSaveState('saved');
        window.setTimeout(() => setSaveState('idle'), 2000);
    }

    return (
        <StudioShell
            active="profile"
            title="Organizer Profile"
            description="Edit your business profile and manage social content where organizer ads, stories, and attendee memories appear together like a social feed."
            actions={
                <>
                    <a
                        href="/studio/social-preview"
                        className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.1]"
                    >
                        Social Page Preview
                    </a>
                    <button
                        type="button"
                        onClick={saveProfile}
                        className="rounded-full border border-sky-300/35 bg-sky-400/15 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:bg-sky-400/30"
                    >
                        {saveState === 'saved' ? 'Saved' : 'Save Profile'}
                    </button>
                </>
            }
        >
            <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <StudioSurface>
                    <StudioSectionHeader title="Business Branding" description="Update identity fields and social links used in public organizer profile surfaces." />

                    <div className="mt-6 grid gap-4">
                        <div className="flex flex-wrap items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-fuchsia-500 text-2xl font-bold text-white">
                                {profile.name
                                    .split(' ')
                                    .map((part) => part[0])
                                    .slice(0, 2)
                                    .join('')}
                            </div>
                            <div className="flex-1 space-y-3">
                                <label className="grid gap-2 text-sm">
                                    <span className="font-semibold text-slate-200">Organizer Name</span>
                                    <input
                                        value={profile.name}
                                        onChange={(event) => updateField('name', event.target.value)}
                                        className="h-11 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-slate-100 outline-none transition focus:border-sky-300/50"
                                    />
                                </label>
                                <label className="grid gap-2 text-sm">
                                    <span className="font-semibold text-slate-200">Bio</span>
                                    <textarea
                                        rows={4}
                                        value={profile.bio}
                                        onChange={(event) => updateField('bio', event.target.value)}
                                        className="rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2 text-slate-100 outline-none transition focus:border-sky-300/50"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="grid gap-2 text-sm">
                                <span className="font-semibold text-slate-200">Instagram</span>
                                <input
                                    value={profile.instagram}
                                    onChange={(event) => updateField('instagram', event.target.value)}
                                    className="h-11 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-slate-100 outline-none transition focus:border-sky-300/50"
                                />
                            </label>
                            <label className="grid gap-2 text-sm">
                                <span className="font-semibold text-slate-200">TikTok</span>
                                <input
                                    value={profile.tiktok}
                                    onChange={(event) => updateField('tiktok', event.target.value)}
                                    className="h-11 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-slate-100 outline-none transition focus:border-sky-300/50"
                                />
                            </label>
                        </div>

                        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100">
                            <div className="flex items-center gap-2">
                                <StudioIcon name="check" className="h-4 w-4" />
                                <span className="font-semibold">Verification Badge: Gold Organizer</span>
                            </div>
                            <p className="mt-2 text-amber-50/85">Attendee memories from joined events are auto-integrated into your profile feed when collaboration permissions are approved.</p>
                        </div>
                    </div>
                </StudioSurface>

                <div className="space-y-4">
                    <StudioSurface>
                        <StudioSectionHeader title="Organizer Stats" />
                        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                            {organizerStats.map((stat) => (
                                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                                    <p className="mt-1 text-2xl font-bold text-white">{typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </StudioSurface>

                    <StudioSurface>
                        <StudioSectionHeader title="Stories" description="Story objects that appear in your organizer ring and expire automatically." />
                        <div className="mt-4 space-y-2">
                            {storyDrafts.map((story) => (
                                <div key={story.id} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm">
                                    <p className="font-medium text-white">{story.eventName}</p>
                                    <p className="text-slate-300">{story.headline}</p>
                                    <p className="text-xs text-slate-400">{story.slot}</p>
                                </div>
                            ))}
                        </div>
                    </StudioSurface>
                </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
                <StudioSurface>
                    <StudioSectionHeader title="Event Ad Posts" description="Sponsored event posts shown on your business feed." />
                    <div className="mt-5 space-y-3">
                        {socialPosts.map((post) => (
                            <article key={post.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-sm font-semibold text-white">{post.eventName}</p>
                                    <StudioPill label={post.status} tone={post.status === 'Published' ? 'emerald' : 'sky'} />
                                </div>
                                <p className="mt-2 text-sm text-slate-200">{post.caption}</p>
                                <p className="mt-2 text-xs text-slate-400">
                                    {post.channel} • {formatDate(post.publishAt)}
                                </p>
                            </article>
                        ))}
                    </div>
                </StudioSurface>

                <StudioSurface>
                    <StudioSectionHeader
                        title="Collaboration Feed"
                        description="Customer memories from joined events automatically flow into this feed."
                        action={
                            <a
                                href="/studio/social-media-management"
                                className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.1]"
                            >
                                Manage Integrations
                            </a>
                        }
                    />
                    {integratedMemories.length === 0 ? (
                        <div className="mt-5 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] px-4 py-8 text-center text-sm text-slate-300">
                            No auto-integrated memories currently visible. Check Social Media Management to enable or restore integrations.
                        </div>
                    ) : (
                        <div className="mt-5 space-y-3">
                            {integratedMemories.slice(0, 3).map((memory) => (
                                <article key={memory.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm font-semibold text-white">{memory.userName}</p>
                                        <StudioPill label="Integrated" tone="sky" />
                                    </div>
                                    <p className="mt-1 text-xs text-slate-400">
                                        {memory.handle} • {memory.eventName}
                                    </p>
                                    <p className="mt-2 text-sm text-slate-200">{memory.caption}</p>
                                </article>
                            ))}
                        </div>
                    )}
                </StudioSurface>
            </section>

            <section>
                <StudioSurface>
                    <StudioSectionHeader title="Memories Gallery" description="Social-media style gallery of attendee posts connected to your events." />
                    {integratedMemories.length === 0 ? (
                        <div className="mt-5 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] px-4 py-8 text-center text-sm text-slate-300">
                            Memories gallery is empty because automatic integration is disabled or all memories are removed.
                        </div>
                    ) : (
                        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            {integratedMemories.map((memory) => (
                                <article key={memory.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                                    <img alt={`${memory.userName} memory`} src={memory.image} className="h-40 w-full object-cover" />
                                    <div className="p-3">
                                        <p className="text-sm font-semibold text-white">{memory.userName}</p>
                                        <p className="text-xs text-slate-400">{memory.eventName}</p>
                                        <p className="mt-1 line-clamp-2 text-sm text-slate-200">{memory.caption}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </StudioSurface>
            </section>
        </StudioShell>
    );
}
