import * as React from 'react';

import { classNames, formatCompact, formatCurrency, formatDate, formatPercent } from './utils';

export function StudioIcon({ name, className = 'h-5 w-5' }) {
    const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: '1.8' };

    switch (name) {
        case 'spark':
            return (
                <svg className={className} viewBox="0 0 24 24" {...stroke}>
                    <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3z" />
                    <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
                </svg>
            );
        case 'chart':
            return (
                <svg className={className} viewBox="0 0 24 24" {...stroke}>
                    <path d="M4 19.5h16" />
                    <path d="M7 16V9" />
                    <path d="M12 16V5" />
                    <path d="M17 16v-4" />
                </svg>
            );
        case 'users':
            return (
                <svg className={className} viewBox="0 0 24 24" {...stroke}>
                    <path d="M16.5 19a4.5 4.5 0 00-9 0" />
                    <circle cx="12" cy="9" r="3.2" />
                    <path d="M18.8 18a3.2 3.2 0 00-2.1-3" />
                </svg>
            );
        case 'cash':
            return (
                <svg className={className} viewBox="0 0 24 24" {...stroke}>
                    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
                    <path d="M3 10.5h18" />
                    <path d="M7.5 14.5h4" />
                </svg>
            );
        case 'calendar':
            return (
                <svg className={className} viewBox="0 0 24 24" {...stroke}>
                    <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" />
                    <path d="M7.5 3.5v4M16.5 3.5v4M3.5 9.5h17" />
                </svg>
            );
        case 'bolt':
            return (
                <svg className={className} viewBox="0 0 24 24" {...stroke}>
                    <path d="M13 2L5.5 13h5l-.5 9L18.5 11h-5L13 2z" />
                </svg>
            );
        case 'target':
            return (
                <svg className={className} viewBox="0 0 24 24" {...stroke}>
                    <circle cx="12" cy="12" r="8.5" />
                    <circle cx="12" cy="12" r="4.5" />
                    <circle cx="12" cy="12" r="1.5" />
                </svg>
            );
        case 'link':
            return (
                <svg className={className} viewBox="0 0 24 24" {...stroke}>
                    <path d="M10 13.5l4-4" />
                    <path d="M7 16.5l-2 2a3.2 3.2 0 104.5 4.5l2-2" />
                    <path d="M17 7.5l2-2A3.2 3.2 0 1014.5 1l-2 2" />
                </svg>
            );
        case 'check':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12.5l4.2 4.2L19 7" />
                </svg>
            );
        case 'upload':
            return (
                <svg className={className} viewBox="0 0 24 24" {...stroke}>
                    <path d="M12 16V5" />
                    <path d="M7.5 9.5L12 5l4.5 4.5" />
                    <rect x="4" y="16" width="16" height="4.5" rx="2.2" />
                </svg>
            );
        default:
            return (
                <svg className={className} viewBox="0 0 24 24" {...stroke}>
                    <circle cx="12" cy="12" r="9" />
                </svg>
            );
    }
}

export function StudioSurface({ className = '', children }) {
    return (
        <div
            className={classNames(
                'rounded-[26px] border border-white/10 bg-slate-950/50 p-5 shadow-[0_24px_60px_-30px_rgba(14,165,233,0.2)] backdrop-blur-xl sm:p-6',
                className,
            )}
        >
            {children}
        </div>
    );
}

export function StudioSectionHeader({ title, description, action }) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[30px]">{title}</h2>
                {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{description}</p> : null}
            </div>
            {action}
        </div>
    );
}

export function StudioPill({ label, tone = 'slate' }) {
    const tones = {
        slate: 'border-slate-400/30 bg-slate-200/10 text-slate-200',
        emerald: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
        violet: 'border-violet-400/30 bg-violet-400/10 text-violet-200',
        amber: 'border-amber-300/30 bg-amber-300/10 text-amber-200',
        sky: 'border-sky-400/30 bg-sky-400/10 text-sky-200',
    };

    return <span className={classNames('rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.2em] uppercase', tones[tone])}>{label}</span>;
}

export function StudioStatCard({ icon, label, value, trend, tone = 'sky' }) {
    const tones = {
        emerald: 'from-emerald-400/20 to-emerald-500/5 text-emerald-300',
        sky: 'from-sky-400/20 to-sky-500/5 text-sky-300',
        violet: 'from-violet-400/20 to-violet-500/5 text-violet-300',
        amber: 'from-amber-300/20 to-amber-400/5 text-amber-200',
    };

    return (
        <StudioSurface className="relative overflow-hidden">
            <div className={classNames('absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br blur-2xl', tones[tone])} />
            <div className="relative">
                <div className="flex items-center justify-between">
                    <div className="rounded-xl border border-white/15 bg-white/5 p-2 text-slate-200">
                        <StudioIcon name={icon} className="h-5 w-5" />
                    </div>
                    <span className={classNames('text-xs font-semibold', trend > 0 ? 'text-emerald-300' : 'text-rose-300')}>{formatPercent(trend)}</span>
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">{label}</p>
                <p className="mt-2 text-3xl font-bold text-white">
                    {typeof value === 'number' && label.toLowerCase().includes('revenue')
                        ? formatCurrency(value)
                        : typeof value === 'number' && value > 9999
                          ? formatCompact(value)
                          : value}
                </p>
            </div>
        </StudioSurface>
    );
}

export function StudioBars({ values, color = 'from-sky-400 to-cyan-300' }) {
    const [isAnimated, setIsAnimated] = React.useState(false);
    const max = Math.max(...values);
    const valuesKey = values.join(',');

    React.useEffect(() => {
        setIsAnimated(false);
        const timer = window.setTimeout(() => setIsAnimated(true), 70);
        return () => window.clearTimeout(timer);
    }, [valuesKey]);

    return (
        <div className="flex h-40 items-end gap-2">
            {values.map((value, index) => (
                <div
                    key={`${value}-${index}`}
                    className={classNames('min-w-0 flex-1 rounded-t-xl bg-gradient-to-t transition-all duration-700 ease-out hover:opacity-80', color)}
                    style={{
                        height: isAnimated ? `${Math.max(14, Math.round((value / max) * 100))}%` : '10%',
                        transitionDelay: `${index * 70}ms`,
                    }}
                />
            ))}
        </div>
    );
}

export function StudioNotice({ message, tone = 'emerald' }) {
    const [entered, setEntered] = React.useState(false);

    React.useEffect(() => {
        if (!message) {
            setEntered(false);
            return;
        }

        const timer = window.setTimeout(() => setEntered(true), 20);
        return () => window.clearTimeout(timer);
    }, [message]);

    if (!message) {
        return null;
    }

    const toneMap = {
        emerald: 'border-emerald-300/30 bg-emerald-400/10 text-emerald-100',
        sky: 'border-sky-300/30 bg-sky-400/10 text-sky-100',
        amber: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
    };

    return (
        <div
            className={classNames(
                'mt-3 flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium shadow-[0_18px_40px_-30px_rgba(52,211,153,0.9)] transition-all duration-500',
                toneMap[tone],
                entered ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-[0.98] opacity-0',
            )}
        >
            <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-55" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-current" />
            </span>
            <span>{message}</span>
        </div>
    );
}

export function StudioActivityList({ items }) {
    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <li key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-start gap-3">
                        <span className="mt-1 rounded-full border border-sky-400/40 bg-sky-400/10 p-1 text-sky-200">
                            <StudioIcon name="spark" className="h-3.5 w-3.5" />
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-slate-100">{item.title}</p>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                                <span>{item.meta}</span>
                                <span>•</span>
                                <span>{formatDate(item.timestamp)}</span>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export function StudioSkeletonGrid() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse rounded-[26px] border border-white/10 bg-white/[0.03] p-6">
                    <div className="h-4 w-28 rounded bg-white/10" />
                    <div className="mt-5 h-8 w-20 rounded bg-white/10" />
                    <div className="mt-6 h-3 w-16 rounded bg-white/10" />
                </div>
            ))}
        </div>
    );
}

export function StudioEmptyState({ title, description, action }) {
    return (
        <StudioSurface className="border-dashed border-white/20 bg-white/[0.02] text-center">
            <p className="text-xl font-semibold text-white">{title}</p>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-300">{description}</p>
            {action ? <div className="mt-6">{action}</div> : null}
        </StudioSurface>
    );
}

export function Money({ value }) {
    return <span>{formatCurrency(value)}</span>;
}
