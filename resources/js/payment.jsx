import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

import { PAYMENT_METHODS, getEventById, getInitials } from './social-hub/mockData';
import { classNames as uiClassNames, formatEventDate as uiFormatEventDate, formatPrice as uiFormatPrice } from './social-hub/ui';

const { StrictMode, useMemo, useState } = React;

function MaterialIcon({ name, className = '' }) {
    return (
        <span aria-hidden="true" className={uiClassNames('material-symbols-outlined leading-none', className)}>
            {name}
        </span>
    );
}

function PaymentNavigation({ userName, searchTerm, onSearchChange }) {
    const [isHeaderSearchFocused, setIsHeaderSearchFocused] = useState(false);
    const displayHandle = `@${String(userName || 'ayoyok-user').trim().toLowerCase().replace(/\s+/g, '-')}`;

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/55 bg-[rgba(253,248,255,0.78)] backdrop-blur-md shadow-[0_12px_30px_-24px_rgba(94,80,176,0.35)]">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-4 lg:px-8">
                <div className="flex items-center gap-8">
                    <a href="/dashboard" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5e50b0] text-white shadow-[0_16px_28px_-18px_rgba(94,80,176,0.85)]">
                            <span className="editorial-display text-base font-bold">AY</span>
                        </div>
                        <div>
                            <p className="editorial-display text-[24px] font-bold tracking-[-0.02em] text-[#5e50b0]">AyoYok</p>
                            <p className="hidden text-xs text-[#797583] sm:block">Experience Beautiful Moments</p>
                        </div>
                    </a>

                    <nav className="hidden items-center gap-6 md:flex">
                        <a className="text-sm font-semibold text-[#484552] transition-colors hover:text-[#5e50b0]" href="/dashboard">Home</a>
                        <a className="text-sm font-semibold text-[#484552] transition-colors hover:text-[#5e50b0]" href="/explore">Explore</a>
                        <a className="text-sm font-semibold text-[#484552] transition-colors hover:text-[#5e50b0]" href="/schedule">Schedule</a>
                        <a className="text-sm font-semibold text-[#484552] transition-colors hover:text-[#5e50b0]" href="/profile">Profile</a>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <div className={uiClassNames('glass-card hidden items-center rounded-full border border-white/70 px-4 py-2 transition-all duration-200 lg:flex', isHeaderSearchFocused ? 'w-80' : 'w-64')}>
                        <MaterialIcon name="search" className="text-[#797583]" />
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) => onSearchChange(event.target.value)}
                            onFocus={() => setIsHeaderSearchFocused(true)}
                            onBlur={() => setIsHeaderSearchFocused(false)}
                            placeholder="Search events..."
                            className="ml-2 w-full border-none bg-transparent p-0 text-sm text-[#1c1b21] outline-none placeholder:text-[#797583]"
                        />
                    </div>

                    <button type="button" className="rounded-full p-2 text-[#484552] transition hover:bg-white/80 hover:text-[#5e50b0]">
                        <MaterialIcon name="notifications" />
                    </button>
                    <button type="button" className="rounded-full p-2 text-[#484552] transition hover:bg-white/80 hover:text-[#5e50b0]">
                        <MaterialIcon name="favorite" />
                    </button>
                    <a href="/profile" className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#c8bfff] bg-white text-sm font-bold text-[#5e50b0]" title={`${userName} ${displayHandle}`}>
                        {userName?.substring(0,2).toUpperCase() || 'AY'}
                    </a>
                </div>
            </div>
        </header>
    );
}

function PaymentPage({ userName, eventId }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].id);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const event = useMemo(() => getEventById(eventId), [eventId]);
    const subtotal = (event?.price || 0) * quantity;
    const platformFee = event?.price ? 4500 : 0;
    const total = subtotal + platformFee;
    const selectedMethod = PAYMENT_METHODS.find((method) => method.id === paymentMethod) || PAYMENT_METHODS[0];

    if (!event) {
        return (
            <div className="editorial-shell min-h-screen bg-[#fdf8ff] pb-28 text-[#1c1b21] md:pb-0" style={{ backgroundColor: '#fdf8ff' }}>
                <PaymentNavigation userName={userName} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                <main className="pt-24 px-5 max-w-[1200px] mx-auto">
                    <div className="glass-card ambient-shadow mt-6 rounded-[32px] border border-white/70 p-8 text-center bg-white/80">
                        <p className="editorial-display text-[32px] font-bold text-[#1c1b21]">Event not found.</p>
                        <p className="mt-3 text-sm text-[#484552]">The requested payment flow does not have a matching mock event.</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="editorial-shell editorial-copy min-h-screen bg-[#fdf8ff] pb-28 text-[#1c1b21] selection:bg-[#e5deff] selection:text-[#372687] md:pb-0" style={{ backgroundColor: '#fdf8ff' }}>
            <PaymentNavigation userName={userName} searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <main className="pt-24">
                <section className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-8">
                    <div className="overflow-hidden rounded-[32px] bg-[#312f36] p-8 text-white shadow-[0_24px_60px_-32px_rgba(49,47,54,0.65)] sm:p-12">
                        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-center">
                            <div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                                        Ticket checkout
                                    </span>
                                    <span className="rounded-full bg-[#5e50b0]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#c8bfff]">
                                        Payment flow
                                    </span>
                                </div>
                                <h1 className="editorial-display mt-5 max-w-3xl text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[48px]">
                                    {event.title}
                                </h1>
                                <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
                                    Review the ticket summary, choose a payment method, and confirm the checkout to lock the event into your schedule.
                                </p>
                            </div>

                            <div className="rounded-[32px] border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                                <img src={event.image} alt={event.title} className="h-48 w-full rounded-[24px] object-cover" />
                                <div className="mt-5 space-y-3 text-sm text-white/90">
                                    <div className="flex items-center gap-3">
                                        <MaterialIcon name="calendar_today" className="text-[18px]" />
                                        <span>{uiFormatEventDate(event.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MaterialIcon name="location_on" className="text-[18px]" />
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MaterialIcon name="local_activity" className="text-[18px]" />
                                        <span>{event.price === 0 ? 'Free RSVP' : 'Paid ticket'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-8">
                    {isConfirmed ? (
                        <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 bg-white/80 p-8 text-center sm:p-12">
                            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#c1e9d5] text-[#002116] shadow-lg shadow-[#c1e9d5]/30">
                                <MaterialIcon name="check_circle" className="text-[48px]" />
                            </div>
                            <h2 className="editorial-display mt-8 text-[32px] font-bold text-[#1c1b21]">Payment confirmed</h2>
                            <p className="mt-3 text-base leading-7 text-[#484552] max-w-lg mx-auto">
                                {event.price === 0
                                    ? `${event.title} is now saved as a confirmed RSVP in your schedule.`
                                    : `${event.title} is now paid and ready inside your personal schedule.`}
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-4">
                                <a
                                    href="/schedule"
                                    className="inline-flex items-center gap-2 rounded-full bg-[#5e50b0] px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(94,80,176,0.65)] transition hover:scale-[1.02]"
                                >
                                    Open schedule
                                    <MaterialIcon name="calendar_today" className="text-[18px]" />
                                </a>
                                <a
                                    href="/dashboard"
                                    className="inline-flex items-center justify-center rounded-full border-2 border-[#e5e1ea] bg-white px-8 py-4 text-sm font-semibold text-[#1c1b21] transition hover:border-[#c9c4d3]"
                                >
                                    Back to Home
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
                            <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 bg-white/80 p-6 sm:p-8">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#797583]">Payment page</p>
                                    <h2 className="editorial-display mt-2 text-[32px] font-bold text-[#1c1b21]">Complete your ticket</h2>
                                    <p className="mt-3 text-sm leading-6 text-[#484552]">
                                        Choose quantity and payment method. This flow uses local mock confirmation.
                                    </p>
                                </div>

                                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                                    <div className="rounded-[28px] border border-[#e5e1ea] bg-white p-6 shadow-sm">
                                        <p className="text-sm font-semibold text-[#1c1b21]">Ticket summary</p>
                                        <div className="mt-4 space-y-4 text-sm text-[#484552]">
                                            <div className="flex items-center justify-between gap-4">
                                                <span>Event</span>
                                                <span className="font-semibold text-[#1c1b21] text-right">{event.title}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <span>Date</span>
                                                <span className="font-semibold text-[#1c1b21]">{uiFormatEventDate(event.date)}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <span>Type</span>
                                                <span className="font-semibold text-[#5e50b0]">{event.price === 0 ? 'Free RSVP' : 'General admission'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-[28px] border border-[#e5e1ea] bg-white p-6 shadow-sm">
                                        <label className="block text-sm font-semibold text-[#1c1b21]" htmlFor="ticket-quantity">
                                            Quantity
                                        </label>
                                        <div className="mt-4 flex items-center justify-between gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                                                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#c9c4d3] bg-[#fdf8ff] text-[#5e50b0] transition hover:border-[#5e50b0] hover:bg-[#5e50b0] hover:text-white"
                                            >
                                                <MaterialIcon name="remove" className="text-[20px]" />
                                            </button>
                                            <input
                                                id="ticket-quantity"
                                                type="number"
                                                min="1"
                                                value={quantity}
                                                onChange={(eventValue) => setQuantity(Math.max(1, Number(eventValue.target.value) || 1))}
                                                className="h-14 w-24 rounded-2xl border border-[#c9c4d3] bg-[#fdf8ff] px-4 text-center text-lg font-bold text-[#5e50b0] outline-none transition focus:border-[#5e50b0] focus:ring-4 focus:ring-[#5e50b0]/20"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setQuantity((current) => current + 1)}
                                                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#c9c4d3] bg-[#fdf8ff] text-[#5e50b0] transition hover:border-[#5e50b0] hover:bg-[#5e50b0] hover:text-white"
                                            >
                                                <MaterialIcon name="add" className="text-[20px]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <p className="text-sm font-semibold text-[#1c1b21]">Payment method</p>
                                    <div className="mt-5 grid gap-4">
                                        {PAYMENT_METHODS.map((method) => (
                                            <button
                                                key={method.id}
                                                type="button"
                                                onClick={() => setPaymentMethod(method.id)}
                                                className={uiClassNames(
                                                    'flex items-center justify-between rounded-[24px] border px-6 py-5 text-left transition',
                                                    paymentMethod === method.id
                                                        ? 'border-[#5e50b0] bg-[#5e50b0] text-white shadow-[0_14px_30px_-18px_rgba(94,80,176,0.65)]'
                                                        : 'border-[#e5e1ea] bg-white text-[#484552] hover:border-[#c8bfff]',
                                                )}
                                            >
                                                <div>
                                                    <p className={uiClassNames('font-semibold', paymentMethod === method.id ? 'text-white' : 'text-[#1c1b21]')}>{method.label}</p>
                                                    <p className={uiClassNames('mt-1 text-sm', paymentMethod === method.id ? 'text-white/70' : 'text-[#797583]')}>{method.note}</p>
                                                </div>
                                                <MaterialIcon name="credit_card" className={uiClassNames('text-[24px]', paymentMethod === method.id ? 'text-[#c8bfff]' : 'text-[#c9c4d3]')} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <aside className="space-y-6">
                                <div className="glass-card ambient-shadow rounded-[32px] border border-[#c8bfff] bg-[#f1ecf5] p-6 sm:p-8">
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5e50b0]">Order summary</p>
                                    
                                    <div className="mt-6 space-y-4 text-sm text-[#484552]">
                                        <div className="flex items-center justify-between gap-4">
                                            <span>Tickets x {quantity}</span>
                                            <span className="font-medium text-[#1c1b21]">{uiFormatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-4">
                                            <span>Platform fee</span>
                                            <span className="font-medium text-[#1c1b21]">{uiFormatPrice(platformFee)}</span>
                                        </div>
                                        
                                        <div className="border-t border-[#d8d2de] pt-5 mt-5">
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="text-lg font-semibold text-[#1c1b21]">Total</span>
                                                <span className="editorial-display text-[32px] font-bold text-[#5e50b0]">{uiFormatPrice(total)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 rounded-[24px] border border-white/60 bg-white/50 p-5 text-sm text-[#484552]">
                                        Selected method:<br/>
                                        <span className="font-semibold text-[#1c1b21] text-base block mt-1">{selectedMethod.label}</span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setIsConfirmed(true)}
                                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#5e50b0] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_36px_-20px_rgba(94,80,176,0.8)] transition hover:scale-[1.02]"
                                    >
                                        {event.price === 0 ? 'Confirm RSVP' : 'Confirm payment'}
                                        <MaterialIcon name="arrow_forward" className="text-[20px]" />
                                    </button>
                                </div>
                            </aside>
                        </div>
                    )}
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-[#e5e1ea] bg-[#ebe6ef] py-16">
                <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
                    <div className="grid gap-12 md:grid-cols-4">
                        <div className="md:col-span-2">
                            <a href="/dashboard" className="inline-flex items-center gap-3">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5e50b0] text-white">
                                    <span className="editorial-display text-lg font-bold">AY</span>
                                </div>
                                <div>
                                    <p className="editorial-display text-[28px] font-bold tracking-[-0.02em] text-[#5e50b0]">AyoYok</p>
                                    <p className="text-sm text-[#797583]">Curating the city&apos;s most beautiful moments.</p>
                                </div>
                            </a>
                            <p className="mt-6 max-w-md text-sm leading-7 text-[#484552]">
                                Discover events, meet people, and collect moments that matter.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1c1b21]">Navigate</h4>
                            <ul className="mt-6 space-y-4 text-sm text-[#484552]">
                                <li><a className="transition-colors hover:text-[#5e50b0]" href="/dashboard">Home</a></li>
                                <li><a className="transition-colors hover:text-[#5e50b0]" href="/explore">Explore</a></li>
                                <li><a className="transition-colors hover:text-[#5e50b0]" href="/schedule">Schedule</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#1c1b21]">Connect</h4>
                            <ul className="mt-6 space-y-4 text-sm text-[#484552]">
                                <li><a className="transition-colors hover:text-[#5e50b0]" href="/profile">Profile</a></li>
                                <li><a className="transition-colors hover:text-[#5e50b0]" href="/events/private/create">Host a private event</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 flex flex-col gap-6 border-t border-[#d8d2de] pt-8 md:flex-row md:items-center md:justify-between">
                        <p className="text-sm text-[#797583]">© {new Date().getFullYear()} AyoYok. All rights reserved.</p>
                        <div className="flex gap-6 text-[#797583]">
                            <span className="transition-colors hover:text-[#5e50b0]"><MaterialIcon name="language" /></span>
                            <span className="transition-colors hover:text-[#5e50b0]"><MaterialIcon name="help" /></span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const mountNode = document.getElementById('ayoyok-payment-root');

if (mountNode) {
    createRoot(mountNode).render(
        <StrictMode>
            <PaymentPage userName={mountNode.dataset.userName || 'AyoYok User'} eventId={mountNode.dataset.eventId || ''} />
        </StrictMode>,
    );
}
