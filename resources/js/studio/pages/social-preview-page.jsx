import * as React from 'react';

import { attendeeMemories, organizerProfileDefaults } from '../mock-data';
import { logoAyoyok } from '../../brand-assets';
import { getIntegratedMemories, loadIntegrationState } from '../integration-settings';
import { useStudioWorkspace } from '../workspace-store';

function PreviewTopBar() {
    return (
        <header className="studio-preview-panel sticky top-4 z-20 px-4 py-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Customer View Preview</p>
                    <div className="mt-2 flex items-center gap-3">
                        <img src={logoAyoyok} alt="AyoYok" className="h-9 w-auto rounded-lg border border-slate-200 bg-white p-1" />
                        <p className="dashboard-display text-2xl font-bold text-slate-950">Organizer Profile Feed</p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <a
                        href="/studio/social-media-management"
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        Back to Social Manager
                    </a>
                    <button
                        type="button"
                        className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        Follow
                    </button>
                </div>
            </div>
        </header>
    );
}

export function StudioSocialPreviewPage() {
    const [workspace] = useStudioWorkspace();
    const [profile, setProfile] = React.useState(organizerProfileDefaults);
    const [integratedMemories, setIntegratedMemories] = React.useState(attendeeMemories);
    const socialPosts = workspace.socialCampaignPosts || [];

    React.useEffect(() => {
        const storedProfile = window.localStorage.getItem('ayoyok-studio-organizer-profile');

        if (storedProfile) {
            try {
                setProfile((current) => ({ ...current, ...JSON.parse(storedProfile) }));
            } catch {
                // Keep defaults.
            }
        }

        const integrationState = loadIntegrationState();
        setIntegratedMemories(getIntegratedMemories(attendeeMemories, integrationState));
    }, []);

    return (
        <div className="studio-preview-shell min-h-screen">
            <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 sm:py-6">
                <PreviewTopBar />

                <main className="mt-6 space-y-6">
                    <section className="studio-preview-panel overflow-hidden p-0">
                        <div className="relative h-44 bg-gradient-to-r from-orange-300 via-fuchsia-300 to-sky-300">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_30%,rgba(255,255,255,0.55),transparent_40%)]" />
                            <img
                                alt="Event crowd highlight"
                                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=500&q=80"
                                className="absolute left-5 top-5 h-20 w-24 rotate-[-8deg] rounded-2xl border-2 border-white/70 object-cover shadow-lg"
                            />
                            <img
                                alt="DJ stage highlight"
                                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=500&q=80"
                                className="absolute right-6 top-4 h-16 w-24 rotate-[7deg] rounded-2xl border-2 border-white/70 object-cover shadow-lg"
                            />
                            <img
                                alt="Friends at event highlight"
                                src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=500&q=80"
                                className="absolute right-28 bottom-3 h-18 w-24 rotate-[-5deg] rounded-2xl border-2 border-white/70 object-cover shadow-lg"
                            />
                        </div>
                        <div className="px-6 pb-10">
                            <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
                                <div className="flex items-end gap-4">
                                    <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border-4 border-white bg-gradient-to-br from-orange-400 to-fuchsia-500 text-2xl font-bold text-white shadow-lg">
                                        {profile.name
                                            .split(' ')
                                            .map((part) => part[0])
                                            .slice(0, 2)
                                            .join('')}
                                    </div>
                                    <div>
                                        <h1 className="dashboard-display text-3xl font-bold text-slate-950">{profile.name}</h1>
                                        <p className="mt-1 text-sm text-slate-500">Organizer Account • Verified</p>
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                                    <p>Sponsored posts and event banners may appear in this feed preview.</p>
                                </div>
                            </div>
                            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{profile.bio}</p>
                        </div>
                    </section>

                    <section className="grid gap-4 xl:grid-cols-2">
                        {socialPosts.map((post) => (
                            <article key={post.id} className="studio-preview-panel overflow-hidden">
                                <div className="relative h-56 bg-gradient-to-br from-slate-900 via-fuchsia-900 to-sky-900">
                                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                                        Sponsored
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                                        <p className="text-xs uppercase tracking-[0.2em] text-slate-200">{post.channel}</p>
                                        <h3 className="dashboard-display mt-2 text-2xl font-bold">{post.eventName}</h3>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <p className="text-sm leading-7 text-slate-700">{post.caption}</p>
                                </div>
                            </article>
                        ))}
                    </section>

                    <section className="studio-preview-panel p-6">
                        <div className="flex items-center justify-between gap-3">
                            <h2 className="dashboard-display text-2xl font-bold text-slate-950">Community Memories</h2>
                            <a
                                href="/studio/social-media-management"
                                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Manage Integrations
                            </a>
                        </div>

                        {integratedMemories.length === 0 ? (
                            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-600">
                                Auto-integrated memories are currently disabled or all posts were removed from integration.
                            </div>
                        ) : (
                            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                {integratedMemories.map((memory) => (
                                    <article key={memory.id} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)]">
                                        <img alt={memory.eventName} src={memory.image} className="h-44 w-full object-cover" />
                                        <div className="p-4">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-sm font-semibold text-slate-950">{memory.userName}</p>
                                                <span className="rounded-full bg-sky-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-700">
                                                    Attendee
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs text-slate-500">
                                                {memory.handle} • {memory.eventName}
                                            </p>
                                            <p className="mt-2 text-sm leading-6 text-slate-700">{memory.caption}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
}
