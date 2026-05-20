import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

import { buildInvitationPayload, getInvitationPreviewByToken } from './social-hub/mockData';
import { classNames as uiClassNames } from './social-hub/ui';
import { InvitationTemplatePreview } from './invitation-templates';

const { StrictMode } = React;

function MaterialIcon({ name, className = '' }) {
    return (
        <span aria-hidden="true" className={uiClassNames('material-symbols-outlined leading-none', className)}>
            {name}
        </span>
    );
}

function PrivateInvitePage({ token, theme, isAuthenticated, viewerName }) {
    const baseInvitation = getInvitationPreviewByToken(token);
    const invitation = buildInvitationPayload({
        ...baseInvitation,
        theme: theme || baseInvitation.theme,
    });

    return (
        <div className="editorial-shell editorial-copy min-h-screen bg-[#fdf8ff] px-4 py-8 sm:px-6 sm:py-12 flex flex-col justify-center">
            <div className="mx-auto w-full max-w-5xl space-y-6">
                <section className="overflow-hidden rounded-[32px] bg-[#312f36] p-8 sm:p-10 shadow-[0_24px_60px_-32px_rgba(49,47,54,0.65)] text-white">
                    <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
                        <div>
                            <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                                    Private invitation
                                </span>
                                <span className="rounded-full bg-[#5e50b0]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#c8bfff]">
                                    Token: {token}
                                </span>
                            </div>
                            <h1 className="editorial-display mt-6 max-w-3xl text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[48px]">
                                You’ve been invited to a private event on AyoYok.
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
                                This preview is rendered from the selected invitation template and auto-populated with event title, date, host, and message.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {isAuthenticated ? (
                                <>
                                    <a
                                        href="/dashboard"
                                        className="inline-flex items-center gap-2 rounded-full bg-[#5e50b0] px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(94,80,176,0.65)] transition hover:scale-[1.02]"
                                    >
                                        Open dashboard
                                        <MaterialIcon name="arrow_forward" className="text-[18px]" />
                                    </a>
                                    <a
                                        href="/profile"
                                        className="rounded-full border border-white/30 bg-white/10 px-6 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                                    >
                                        View inbox
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a
                                        href="/login"
                                        className="inline-flex items-center gap-2 rounded-full bg-[#5e50b0] px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(94,80,176,0.65)] transition hover:scale-[1.02]"
                                    >
                                        Sign in to join
                                        <MaterialIcon name="login" className="text-[18px]" />
                                    </a>
                                    <a
                                        href="/register"
                                        className="rounded-full border border-white/30 bg-white/10 px-6 py-4 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                                    >
                                        Create account
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                <section className="glass-card ambient-shadow rounded-[32px] border border-white/70 bg-white/80 p-6 sm:p-10">
                    <p className="text-sm font-semibold text-[#797583] uppercase tracking-[0.2em]">Viewing as <span className="text-[#1c1b21]">{viewerName}</span></p>
                    <div className="mt-6 flex justify-center">
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
