import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

import { buildInvitationPayload, getInvitationPreviewByToken } from './social-hub/mockData';
import { Icon } from './social-hub/ui';
import { InvitationTemplatePreview } from './invitation-templates';

const { StrictMode } = React;

function PrivateInvitePage({ token, theme, isAuthenticated, viewerName }) {
    const baseInvitation = getInvitationPreviewByToken(token);
    const invitation = buildInvitationPayload({
        ...baseInvitation,
        theme: theme || baseInvitation.theme,
    });

    return (
        <div className="dashboard-shell min-h-screen px-4 py-6 sm:px-6">
            <div className="mx-auto max-w-5xl space-y-6">
                <section className="panel-dark overflow-hidden p-6 sm:p-8">
                    <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                        <div>
                            <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                                    Private invitation
                                </span>
                                <span className="rounded-full bg-fuchsia-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-100">
                                    Token: {token}
                                </span>
                            </div>
                            <h1 className="dashboard-display mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                You’ve been invited to a private event on AyoYok.
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                                This preview is rendered from the selected invitation template and auto-populated with event title, date, host, and message.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {isAuthenticated ? (
                                <>
                                    <a
                                        href="/dashboard"
                                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-slate-100"
                                    >
                                        Open dashboard
                                        <Icon name="arrow" className="h-4 w-4" />
                                    </a>
                                    <a
                                        href="/profile"
                                        className="rounded-full border border-white/15 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                                    >
                                        View inbox
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a
                                        href="/login"
                                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-slate-100"
                                    >
                                        Sign in to join
                                        <Icon name="arrow" className="h-4 w-4" />
                                    </a>
                                    <a
                                        href="/register"
                                        className="rounded-full border border-white/15 bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                                    >
                                        Create account
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                <section className="panel p-6 sm:p-8">
                    <p className="text-sm font-semibold text-slate-700">Viewing as {viewerName}</p>
                    <div className="mt-5">
                        <InvitationTemplatePreview invitation={invitation} />
                    </div>
                </section>
            </div>
        </div>
    );
}

const mountNode = document.getElementById('ayoyok-invitation-root');

if (mountNode) {
    createRoot(mountNode).render(
        <StrictMode>
            <PrivateInvitePage
                token={mountNode.dataset.token || 'elegant-night-private-event'}
                theme={mountNode.dataset.theme || 'elegant-night'}
                isAuthenticated={mountNode.dataset.authenticated === 'true'}
                viewerName={mountNode.dataset.viewerName || 'Guest Viewer'}
            />
        </StrictMode>,
    );
}
