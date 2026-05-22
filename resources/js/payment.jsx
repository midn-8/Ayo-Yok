import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

import { PAYMENT_METHODS, getEventById, getInitials } from './social-hub/mockData';
import { classNames as uiClassNames, formatEventDate as uiFormatEventDate, formatPrice as uiFormatPrice } from './social-hub/ui';
import { logoAyoyok } from './brand-assets';

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
        <header className="fixed inset-x-0 top-0 z-50 border-b border-[#25324d]/55 bg-[rgba(8,13,27,0.78)] backdrop-blur-md shadow-[0_12px_30px_-24px_rgba(94,80,176,0.35)]">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-4 lg:px-8">
                <div className="flex items-center gap-8">
                    <a href="/dashboard" className="flex items-center gap-3">
                        <img
                            src={logoAyoyok}
                            alt="AyoYok"
                            className="h-11 w-auto rounded-xl border border-[#25324d]/75 bg-[#111b31]/90 p-1 shadow-[0_16px_28px_-18px_rgba(94,80,176,0.65)]"
                        />
                        <p className="hidden text-xs text-[#7e8eaa] sm:block">Experience Beautiful Moments</p>
                    </a>

                    <nav className="hidden items-center gap-6 md:flex">
                        <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/dashboard">Home</a>
                        <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/explore">Explore</a>
                        <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/schedule">Schedule</a>
                        <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/profile">Profile</a>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <div className={uiClassNames('glass-card hidden items-center rounded-full border border-[#25324d]/70 px-4 py-2 transition-all duration-200 lg:flex', isHeaderSearchFocused ? 'w-80' : 'w-64')}>
                        <MaterialIcon name="search" className="text-[#7e8eaa]" />
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) => onSearchChange(event.target.value)}
                            onFocus={() => setIsHeaderSearchFocused(true)}
                            onBlur={() => setIsHeaderSearchFocused(false)}
                            placeholder="Search events..."
                            className="ml-2 w-full border-none bg-transparent p-0 text-sm text-[#e8eefc] outline-none placeholder:text-[#7e8eaa]"
                        />
                    </div>

                    <button type="button" className="rounded-full p-2 text-[#a8b4cc] transition hover:bg-[#111b31]/80 hover:text-[#8ea2ff]">
                        <MaterialIcon name="notifications" />
                    </button>
                    <button type="button" className="rounded-full p-2 text-[#a8b4cc] transition hover:bg-[#111b31]/80 hover:text-[#8ea2ff]">
                        <MaterialIcon name="favorite" />
                    </button>
                    <a href="/profile" className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#3e5996] bg-[#101a30] text-sm font-bold text-[#8ea2ff]" title={`${userName} ${displayHandle}`}>
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
            <div className="editorial-shell min-h-screen bg-[#050b17] pb-28 text-[#e8eefc] md:pb-0" style={{ backgroundColor: '#050b17' }}>
                <PaymentNavigation userName={userName} searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                <main className="pt-24 px-5 max-w-[1200px] mx-auto">
                    <div className="glass-card ambient-shadow mt-6 rounded-[32px] border border-[#25324d]/70 p-8 text-center bg-[#111b31]/80">
                        <p className="editorial-display text-[32px] font-bold text-[#e8eefc]">Event not found.</p>
                        <p className="mt-3 text-sm text-[#a8b4cc]">The requested payment flow does not have a matching mock event.</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="editorial-shell editorial-copy min-h-screen bg-[#050b17] pb-28 text-[#e8eefc] selection:bg-[#1a2742] selection:text-[#9fb3ff] md:pb-0" style={{ backgroundColor: '#050b17' }}>
            <PaymentNavigation userName={userName} searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <main className="pt-24">
                <section className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-8">
                    <div className="overflow-hidden rounded-[32px] bg-[#312f36] p-8 text-white shadow-[0_24px_60px_-32px_rgba(49,47,54,0.65)] sm:p-12">
                        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-center">
                            <div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-[#101a30]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                                        Ticket checkout
                                    </span>
                                    <span className="rounded-full bg-[#8ea2ff]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#3e5996]">
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

                            <div className="rounded-[32px] border border-[#25324d]/10 bg-[#101a30]/8 p-5 backdrop-blur-md">
                                <img src={event.image} alt={event.title} className="h-48 w-full rounded-[24px] object-cover" />
                                <div className="mt-5 space-y-3 text-sm text-[#d5def0]">
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
                        <div className="glass-card ambient-shadow rounded-[32px] border border-[#25324d]/70 bg-[#111b31]/80 p-8 text-center sm:p-12">
                            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#1b365f] text-[#b9cbf1] shadow-lg shadow-[#1b365f]/30">
                                <MaterialIcon name="check_circle" className="text-[48px]" />
                            </div>
                            <h2 className="editorial-display mt-8 text-[32px] font-bold text-[#e8eefc]">Payment confirmed</h2>
                            <p className="mt-3 text-base leading-7 text-[#a8b4cc] max-w-lg mx-auto">
                                {event.price === 0
                                    ? `${event.title} is now saved as a confirmed RSVP in your schedule.`
                                    : `${event.title} is now paid and ready inside your personal schedule.`}
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-4">
                                <a
                                    href="/schedule"
                                    className="inline-flex items-center gap-2 rounded-full bg-[#8ea2ff] px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(94,80,176,0.65)] transition hover:scale-[1.02]"
                                >
                                    Open schedule
                                    <MaterialIcon name="calendar_today" className="text-[18px]" />
                                </a>
                                <a
                                    href="/dashboard"
                                    className="inline-flex items-center justify-center rounded-full border-2 border-[#1d2940] bg-[#101a30] px-8 py-4 text-sm font-semibold text-[#e8eefc] transition hover:border-[#2b3855]"
                                >
                                    Back to Home
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
                            <div className="glass-card ambient-shadow rounded-[32px] border border-[#25324d]/70 bg-[#111b31]/80 p-6 sm:p-8">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7e8eaa]">Payment page</p>
                                    <h2 className="editorial-display mt-2 text-[32px] font-bold text-[#e8eefc]">Complete your ticket</h2>
                                    <p className="mt-3 text-sm leading-6 text-[#a8b4cc]">
                                        Choose quantity and payment method. This flow uses local mock confirmation.
                                    </p>
                                </div>

                                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                                    <div className="rounded-[28px] border border-[#1d2940] bg-[#101a30] p-6 shadow-sm">
                                        <p className="text-sm font-semibold text-[#e8eefc]">Ticket summary</p>
                                        <div className="mt-4 space-y-4 text-sm text-[#a8b4cc]">
                                            <div className="flex items-center justify-between gap-4">
                                                <span>Event</span>
                                                <span className="font-semibold text-[#e8eefc] text-right">{event.title}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <span>Date</span>
                                                <span className="font-semibold text-[#e8eefc]">{uiFormatEventDate(event.date)}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <span>Type</span>
                                                <span className="font-semibold text-[#8ea2ff]">{event.price === 0 ? 'Free RSVP' : 'General admission'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-[28px] border border-[#1d2940] bg-[#101a30] p-6 shadow-sm">
                                        <label className="block text-sm font-semibold text-[#e8eefc]" htmlFor="ticket-quantity">
                                            Quantity
                                        </label>
                                        <div className="mt-4 flex items-center justify-between gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                                                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#2b3855] bg-[#050b17] text-[#8ea2ff] transition hover:border-[#8ea2ff] hover:bg-[#8ea2ff] hover:text-white"
                                            >
                                                <MaterialIcon name="remove" className="text-[20px]" />
                                            </button>
                                            <input
                                                id="ticket-quantity"
                                                type="number"
                                                min="1"
                                                value={quantity}
                                                onChange={(eventValue) => setQuantity(Math.max(1, Number(eventValue.target.value) || 1))}
                                                className="h-14 w-24 rounded-2xl border border-[#2b3855] bg-[#050b17] px-4 text-center text-lg font-bold text-[#8ea2ff] outline-none transition focus:border-[#8ea2ff] focus:ring-4 focus:ring-[#8ea2ff]/20"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setQuantity((current) => current + 1)}
                                                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#2b3855] bg-[#050b17] text-[#8ea2ff] transition hover:border-[#8ea2ff] hover:bg-[#8ea2ff] hover:text-white"
                                            >
                                                <MaterialIcon name="add" className="text-[20px]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10">
                                    <p className="text-sm font-semibold text-[#e8eefc]">Payment method</p>
                                    <div className="mt-5 grid gap-4">
                                        {PAYMENT_METHODS.map((method) => (
                                            <button
                                                key={method.id}
                                                type="button"
                                                onClick={() => setPaymentMethod(method.id)}
                                                className={uiClassNames(
                                                    'flex items-center justify-between rounded-[24px] border px-6 py-5 text-left transition',
                                                    paymentMethod === method.id
                                                        ? 'border-[#8ea2ff] bg-[#8ea2ff] text-white shadow-[0_14px_30px_-18px_rgba(94,80,176,0.65)]'
                                                        : 'border-[#1d2940] bg-[#101a30] text-[#a8b4cc] hover:border-[#3e5996]',
                                                )}
                                            >
                                                <div>
                                                    <p className={uiClassNames('font-semibold', paymentMethod === method.id ? 'text-white' : 'text-[#e8eefc]')}>{method.label}</p>
                                                    <p className={uiClassNames('mt-1 text-sm', paymentMethod === method.id ? 'text-[#b2c0da]' : 'text-[#7e8eaa]')}>{method.note}</p>
                                                </div>
                                                <MaterialIcon name="credit_card" className={uiClassNames('text-[24px]', paymentMethod === method.id ? 'text-[#3e5996]' : 'text-[#2b3855]')} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <aside className="space-y-6">
                                <div className="glass-card ambient-shadow rounded-[32px] border border-[#3e5996] bg-[#101a30] p-6 sm:p-8">
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8ea2ff]">Order summary</p>
                                    
                                    <div className="mt-6 space-y-4 text-sm text-[#a8b4cc]">
                                        <div className="flex items-center justify-between gap-4">
                                            <span>Tickets x {quantity}</span>
                                            <span className="font-medium text-[#e8eefc]">{uiFormatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-4">
                                            <span>Platform fee</span>
                                            <span className="font-medium text-[#e8eefc]">{uiFormatPrice(platformFee)}</span>
                                        </div>
                                        
                                        <div className="border-t border-[#d8d2de] pt-5 mt-5">
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="text-lg font-semibold text-[#e8eefc]">Total</span>
                                                <span className="editorial-display text-[32px] font-bold text-[#8ea2ff]">{uiFormatPrice(total)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 rounded-[24px] border border-[#25324d]/60 bg-[#111b31]/50 p-5 text-sm text-[#a8b4cc]">
                                        Selected method:<br/>
                                        <span className="font-semibold text-[#e8eefc] text-base block mt-1">{selectedMethod.label}</span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setIsConfirmed(true)}
                                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8ea2ff] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_36px_-20px_rgba(94,80,176,0.8)] transition hover:scale-[1.02]"
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
            <footer className="border-t border-[#1d2940] bg-[#0a1222] py-16">
                <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
                    <div className="grid gap-12 md:grid-cols-4">
                        <div className="md:col-span-2">
                            <a href="/dashboard" className="inline-flex items-center gap-3">
                                <img src={logoAyoyok} alt="AyoYok" className="h-14 w-auto rounded-xl border border-[#25324d]/80 bg-[#111b31]/90 p-1" />
                                <p className="text-sm text-[#7e8eaa]">Curating the city&apos;s most beautiful moments.</p>
                            </a>
                            <p className="mt-6 max-w-md text-sm leading-7 text-[#a8b4cc]">
                                Discover events, meet people, and collect moments that matter.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e8eefc]">Navigate</h4>
                            <ul className="mt-6 space-y-4 text-sm text-[#a8b4cc]">
                                <li><a className="transition-colors hover:text-[#8ea2ff]" href="/dashboard">Home</a></li>
                                <li><a className="transition-colors hover:text-[#8ea2ff]" href="/explore">Explore</a></li>
                                <li><a className="transition-colors hover:text-[#8ea2ff]" href="/schedule">Schedule</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e8eefc]">Connect</h4>
                            <ul className="mt-6 space-y-4 text-sm text-[#a8b4cc]">
                                <li><a className="transition-colors hover:text-[#8ea2ff]" href="/profile">Profile</a></li>
                                <li><a className="transition-colors hover:text-[#8ea2ff]" href="/events/private/create">Host a private event</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 flex flex-col gap-6 border-t border-[#d8d2de] pt-8 md:flex-row md:items-center md:justify-between">
                        <p className="text-sm text-[#7e8eaa]">© {new Date().getFullYear()} AyoYok. All rights reserved.</p>
                        <div className="flex gap-6 text-[#7e8eaa]">
                            <span className="transition-colors hover:text-[#8ea2ff]"><MaterialIcon name="language" /></span>
                            <span className="transition-colors hover:text-[#8ea2ff]"><MaterialIcon name="help" /></span>
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
