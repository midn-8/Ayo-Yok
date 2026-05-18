import * as React from 'react';

import { formatEventDate, classNames } from './social-hub/ui';

function InvitationFrame({ className, children }) {
    return <div className={classNames('overflow-hidden rounded-[32px] shadow-[0_30px_70px_-32px_rgba(15,23,42,0.5)]', className)}>{children}</div>;
}

export function ElegantNightInvitation({ invitation }) {
    return (
        <InvitationFrame className="border border-amber-200/60 bg-gradient-to-br from-slate-950 via-zinc-900 to-amber-700 text-white">
            <div className="relative overflow-hidden p-8 sm:p-10">
                <div className="absolute -right-10 top-0 h-36 w-36 rounded-full bg-amber-300/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-amber-100">Elegant Night</p>
                <h2 className="dashboard-display mt-5 text-4xl font-bold sm:text-5xl">{invitation.title}</h2>
                <p className="mt-6 max-w-xl text-sm leading-7 text-amber-50/88">{invitation.message}</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-100/70">Date</p>
                        <p className="mt-2 text-sm font-semibold text-white">{formatEventDate(invitation.date)}</p>
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-100/70">Hosted By</p>
                        <p className="mt-2 text-sm font-semibold text-white">{invitation.host}</p>
                    </div>
                </div>
            </div>
        </InvitationFrame>
    );
}

export function MinimalModernInvitation({ invitation }) {
    return (
        <InvitationFrame className="border border-slate-200 bg-white text-slate-950">
            <div className="grid gap-0 md:grid-cols-[1fr_220px]">
                <div className="p-8 sm:p-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">Minimal Modern</p>
                    <h2 className="dashboard-display mt-5 text-4xl font-bold sm:text-5xl">{invitation.title}</h2>
                    <div className="mt-8 space-y-3 text-sm leading-7 text-slate-600">
                        <p>{invitation.message}</p>
                        <p>{formatEventDate(invitation.date)}</p>
                        <p>Hosted by {invitation.host}</p>
                    </div>
                </div>
                <div className="flex items-end justify-start bg-slate-100 p-8 md:justify-center">
                    <div className="h-32 w-32 rounded-full border border-slate-300 bg-white" />
                </div>
            </div>
        </InvitationFrame>
    );
}

export function PartyNeonInvitation({ invitation }) {
    return (
        <InvitationFrame className="border border-fuchsia-300/40 bg-slate-950 text-white">
            <div className="relative overflow-hidden p-8 sm:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.35),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.32),transparent_32%)]" />
                <div className="relative">
                    <div className="inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-fuchsia-100">
                        Party Neon
                    </div>
                    <h2 className="dashboard-display mt-6 text-4xl font-bold sm:text-5xl">{invitation.title}</h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">{invitation.message}</p>

                    <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
                        <span className="rounded-full bg-fuchsia-500/20 px-4 py-2 text-fuchsia-100">{formatEventDate(invitation.date)}</span>
                        <span className="rounded-full bg-cyan-400/20 px-4 py-2 text-cyan-100">Host: {invitation.host}</span>
                    </div>
                </div>
            </div>
        </InvitationFrame>
    );
}

export function InvitationTemplatePreview({ invitation }) {
    switch (invitation.theme) {
        case 'minimal-modern':
            return <MinimalModernInvitation invitation={invitation} />;
        case 'party-neon':
            return <PartyNeonInvitation invitation={invitation} />;
        default:
            return <ElegantNightInvitation invitation={invitation} />;
    }
}
