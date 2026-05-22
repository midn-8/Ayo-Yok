import * as React from 'react';

import { studioNav } from './mock-data';
import { logoAyoyok } from '../brand-assets';
import { StudioIcon } from './primitives';
import { classNames } from './utils';

export function StudioShell({ active, title, description, actions, children }) {
    return (
        <div className="relative min-h-screen overflow-x-clip bg-[#070b16] text-slate-100">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-32 top-16 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[120px]" />
                <div className="absolute right-[-120px] top-0 h-80 w-80 rounded-full bg-sky-500/20 blur-[130px]" />
                <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-emerald-400/10 blur-[110px]" />
            </div>

            <div className="relative mx-auto flex w-full max-w-[1600px] gap-4 px-3 py-4 sm:px-6 sm:py-6">
                <aside className="hidden w-[290px] shrink-0 rounded-[30px] border border-white/10 bg-slate-950/55 p-5 shadow-[0_28px_80px_-45px_rgba(2,132,199,0.45)] backdrop-blur-xl lg:block">
                    <a href="/studio" className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:bg-white/[0.08]">
                        <img src={logoAyoyok} alt="AyoYok Studio" className="h-10 w-auto rounded-xl bg-transparent p-1" />
                        <div>
                            <p className="text-xs text-slate-300">Organizer workspace</p>
                        </div>
                    </a>

                    <nav className="mt-6 space-y-2">
                        {studioNav.map((item, index) => {
                            const isActive = active === item.key;

                            return (
                                <a
                                    key={item.key}
                                    href={item.href}
                                    className={classNames(
                                        'group flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-300',
                                        isActive
                                            ? 'border-sky-300/30 bg-sky-400/15 text-white shadow-[0_16px_32px_-22px_rgba(56,189,248,0.8)]'
                                            : 'border-white/10 bg-white/[0.02] text-slate-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06] hover:text-white',
                                    )}
                                >
                                    <span>{item.label}</span>
                                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] tracking-[0.2em] text-slate-300">0{index + 1}</span>
                                </a>
                            );
                        })}
                    </nav>

                    <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Need help?</p>
                        <p className="mt-2 text-sm text-slate-200">Your organizer specialist is online for boost strategy and payout support.</p>
                        <button
                            type="button"
                            className="mt-4 w-full rounded-xl border border-sky-300/40 bg-sky-400/10 px-3 py-2 text-sm font-semibold text-sky-200 transition hover:bg-sky-400/20"
                        >
                            Open Support Chat
                        </button>
                    </div>
                </aside>

                <div className="min-w-0 flex-1 space-y-4">
                    <header className="rounded-[30px] border border-white/10 bg-slate-950/55 p-4 shadow-[0_28px_80px_-45px_rgba(2,132,199,0.45)] backdrop-blur-xl sm:p-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                                    <StudioIcon name="chart" className="h-3.5 w-3.5" />
                                    Business Platform
                                </div>
                                <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
                                {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{description}</p> : null}
                            </div>

                            <div className="flex flex-wrap items-center gap-2">{actions}</div>
                        </div>

                        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 lg:hidden">
                            {studioNav.map((item) => {
                                const isActive = active === item.key;

                                return (
                                    <a
                                        key={item.key}
                                        href={item.href}
                                        className={classNames(
                                            'whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition',
                                            isActive
                                                ? 'border-sky-300/40 bg-sky-400/15 text-sky-200'
                                                : 'border-white/10 bg-white/[0.03] text-slate-300 hover:text-white',
                                        )}
                                    >
                                        {item.label}
                                    </a>
                                );
                            })}
                        </div>
                    </header>

                    {children}
                </div>
            </div>
        </div>
    );
}
