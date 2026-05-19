import * as React from 'react';

import { attendeeMemories, collaborationQueue, storyDrafts } from '../mock-data';
import { createStudioId, useStudioWorkspace } from '../workspace-store';
import { getIntegratedMemories, loadIntegrationState, saveIntegrationState } from '../integration-settings';
import { StudioNotice, StudioPill, StudioSectionHeader, StudioSurface } from '../primitives';
import { StudioShell } from '../studio-shell';
import { formatDate } from '../utils';

const DEFAULT_POST = {
    eventName: 'Neo Bazaar Vol.4',
    caption: 'Exclusive early-bird slot opens tonight. Tap to secure your pass.',
    channel: 'Instagram + TikTok',
};

export function StudioSocialMediaManagementPage() {
    const [workspace, updateWorkspace] = useStudioWorkspace();
    const [integrationState, setIntegrationState] = React.useState({ autoIntegrate: true, blockedMemoryIds: [] });
    const [postDraft, setPostDraft] = React.useState(DEFAULT_POST);
    const [statusNotice, setStatusNotice] = React.useState({ id: 0, text: '' });

    React.useEffect(() => {
        setIntegrationState(loadIntegrationState());
    }, []);

    const integratedMemories = React.useMemo(() => getIntegratedMemories(attendeeMemories, integrationState), [integrationState]);
    const socialPosts = workspace.socialCampaignPosts || [];

    function toggleAutoIntegrate() {
        const nextState = {
            ...integrationState,
            autoIntegrate: !integrationState.autoIntegrate,
        };

        setIntegrationState(nextState);
        saveIntegrationState(nextState);
    }

    function toggleMemoryIntegration(memoryId) {
        const blocked = new Set(integrationState.blockedMemoryIds);

        if (blocked.has(memoryId)) {
            blocked.delete(memoryId);
        } else {
            blocked.add(memoryId);
        }

        const nextState = {
            ...integrationState,
            blockedMemoryIds: Array.from(blocked),
        };

        setIntegrationState(nextState);
        saveIntegrationState(nextState);
    }

    function createCampaignPost() {
        const payload = {
            id: createStudioId('ad'),
            eventName: postDraft.eventName,
            caption: postDraft.caption,
            channel: postDraft.channel,
            status: 'Scheduled',
            publishAt: new Date().toISOString(),
        };

        updateWorkspace((current) => ({
            ...current,
            socialCampaignPosts: [payload, ...current.socialCampaignPosts].slice(0, 30),
        }));

        setStatusNotice({ id: Date.now(), text: 'Campaign post created and queued in ad pipeline.' });
    }

    return (
        <StudioShell
            active="social-media-management"
            title="Social Media Management"
            description="Manage ad posts, story creation, and auto-integrated attendee collaboration content from every finished event."
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
                        onClick={createCampaignPost}
                        className="rounded-full border border-fuchsia-300/35 bg-fuchsia-400/15 px-4 py-2 text-sm font-semibold text-fuchsia-100 transition hover:bg-fuchsia-400/30"
                    >
                        Create Campaign Post
                    </button>
                </>
            }
        >
            <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <StudioSurface>
                    <StudioSectionHeader title="Ad Post Pipeline" description="Write and schedule event ads to Instagram, TikTok, and cross-channel placements." />

                    <div className="mt-4 grid gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                        <input
                            value={postDraft.eventName}
                            onChange={(event) => setPostDraft((current) => ({ ...current, eventName: event.target.value }))}
                            className="h-10 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-slate-100"
                            placeholder="Event name"
                        />
                        <input
                            value={postDraft.channel}
                            onChange={(event) => setPostDraft((current) => ({ ...current, channel: event.target.value }))}
                            className="h-10 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-slate-100"
                            placeholder="Channel"
                        />
                        <textarea
                            rows={3}
                            value={postDraft.caption}
                            onChange={(event) => setPostDraft((current) => ({ ...current, caption: event.target.value }))}
                            className="rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-slate-100"
                            placeholder="Campaign caption"
                        />
                    </div>

                    <StudioNotice key={statusNotice.id} message={statusNotice.text} />

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
                    <StudioSectionHeader title="Stories" description="Draft and schedule stories just like social-first creator workflows." />
                    <div className="mt-5 space-y-3">
                        {storyDrafts.map((story) => (
                            <div key={story.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm font-semibold text-white">{story.eventName}</p>
                                    <StudioPill label={story.status} tone={story.status === 'Scheduled' ? 'violet' : 'amber'} />
                                </div>
                                <p className="mt-2 text-sm text-slate-200">{story.headline}</p>
                                <p className="mt-1 text-xs text-slate-400">Slot: {story.slot}</p>
                            </div>
                        ))}
                    </div>
                </StudioSurface>
            </section>

            <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                <StudioSurface>
                    <StudioSectionHeader title="Collaboration Queue" description="Customer posts after attending events are routed here then integrated into your profile feed." />

                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold text-white">Automatic Integration</p>
                                <p className="mt-1 text-xs text-slate-400">Turn off to prevent any attendee posts from auto-showing on organizer profile feed.</p>
                            </div>
                            <button
                                type="button"
                                onClick={toggleAutoIntegrate}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                    integrationState.autoIntegrate
                                        ? 'border border-emerald-300/40 bg-emerald-400/15 text-emerald-100'
                                        : 'border border-slate-300/30 bg-slate-700/40 text-slate-200'
                                }`}
                            >
                                {integrationState.autoIntegrate ? 'Enabled' : 'Disabled'}
                            </button>
                        </div>
                    </div>

                    <div className="mt-5 space-y-3">
                        {collaborationQueue.map((entry) => (
                            <div key={entry.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm font-semibold text-white">{entry.user}</p>
                                    <StudioPill label={entry.status} tone={entry.status === 'Approved' ? 'emerald' : 'amber'} />
                                </div>
                                <p className="mt-1 text-sm text-slate-300">Event: {entry.eventName}</p>
                                <p className="mt-1 text-xs text-slate-400">{entry.permission}</p>
                            </div>
                        ))}
                    </div>
                </StudioSurface>

                <StudioSurface>
                    <StudioSectionHeader title="Memories Gallery" description="Auto-integrated customer memories displayed in your business profile feed." />

                    {!integrationState.autoIntegrate ? (
                        <div className="mt-5 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] px-4 py-8 text-center text-sm text-slate-300">
                            Auto integration is disabled. No attendee posts will be injected into your profile feed.
                        </div>
                    ) : (
                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            {attendeeMemories.map((memory) => {
                                const blocked = integrationState.blockedMemoryIds.includes(memory.id);

                                return (
                                    <article key={memory.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                                        <img alt={memory.eventName} src={memory.image} className="h-40 w-full object-cover" />
                                        <div className="p-3">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-sm font-semibold text-white">{memory.userName}</p>
                                                <StudioPill label={blocked ? 'Removed' : 'Auto-Added'} tone={blocked ? 'amber' : 'sky'} />
                                            </div>
                                            <p className="mt-1 text-xs text-slate-400">{memory.handle} • {memory.eventName}</p>
                                            <p className="mt-2 line-clamp-2 text-sm text-slate-200">{memory.caption}</p>
                                            <button
                                                type="button"
                                                onClick={() => toggleMemoryIntegration(memory.id)}
                                                className="mt-3 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.08]"
                                            >
                                                {blocked ? 'Restore Integration' : 'Remove from Auto Integration'}
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}

                    <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-400">
                        Currently integrated in profile feed: <span className="font-semibold text-slate-200">{integratedMemories.length}</span> posts.
                    </div>
                </StudioSurface>
            </section>
        </StudioShell>
    );
}
