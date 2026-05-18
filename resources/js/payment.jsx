import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

import { PAYMENT_METHODS, getEventById } from './social-hub/mockData';
import { classNames, FloatingCreateButton, formatEventDate, formatPrice, Icon, TopNavigation } from './social-hub/ui';

const { StrictMode, useMemo, useState } = React;

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
            <div className="dashboard-shell min-h-screen">
                <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 sm:py-6">
                    <TopNavigation
                        userName={userName}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        activePath=""
                        searchPlaceholder="Search events"
                    />

                    <div className="panel mt-6 p-8 text-center">
                        <p className="dashboard-display text-3xl font-bold text-slate-950">Event not found.</p>
                        <p className="mt-3 text-sm text-slate-600">The requested payment flow does not have a matching mock event.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-shell min-h-screen">
            <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 sm:py-6">
                <TopNavigation
                    userName={userName}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    activePath=""
                    searchPlaceholder="Search events"
                />

                <main className="mt-6 space-y-6">
                    <section className="panel-dark overflow-hidden p-6 sm:p-8">
                        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
                            <div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                                        Ticket checkout
                                    </span>
                                    <span className="rounded-full bg-fuchsia-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-100">
                                        Payment flow
                                    </span>
                                </div>
                                <h1 className="dashboard-display mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">{event.title}</h1>
                                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                                    Review the ticket summary, choose a payment method, and confirm the checkout to lock the event into your ecosystem.
                                </p>
                            </div>

                            <div className="rounded-[32px] border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                                <img src={event.image} alt={event.title} className="h-48 w-full rounded-[24px] object-cover" />
                                <div className="mt-5 space-y-3 text-sm text-slate-200">
                                    <div className="flex items-center gap-3">
                                        <Icon name="calendar" className="h-4 w-4" />
                                        <span>{formatEventDate(event.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Icon name="map" className="h-4 w-4" />
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Icon name="ticket" className="h-4 w-4" />
                                        <span>{event.price === 0 ? 'Free RSVP' : 'Paid ticket'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {isConfirmed ? (
                        <section className="panel p-8 text-center sm:p-10">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                <Icon name="check" className="h-10 w-10" />
                            </div>
                            <h2 className="dashboard-display mt-6 text-3xl font-bold text-slate-950">Payment confirmed</h2>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                {event.price === 0
                                    ? `${event.title} is now saved as a confirmed RSVP in your schedule.`
                                    : `${event.title} is now paid and ready inside your personal schedule.`}
                            </p>
                            <div className="mt-6 flex flex-wrap justify-center gap-3">
                                <a
                                    href="/schedule"
                                    className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800"
                                >
                                    Open schedule
                                    <Icon name="calendar" className="h-4 w-4" />
                                </a>
                                <a
                                    href="/dashboard"
                                    className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Back to dashboard
                                </a>
                            </div>
                        </section>
                    ) : (
                        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
                            <section className="panel p-6 sm:p-7">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Payment page</p>
                                    <h2 className="dashboard-display mt-2 text-3xl font-bold text-slate-950">Complete your ticket</h2>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        Choose quantity and payment method. This flow uses local mock confirmation until backend ticket persistence is added.
                                    </p>
                                </div>

                                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                                    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                                        <p className="text-sm font-semibold text-slate-700">Ticket summary</p>
                                        <div className="mt-4 space-y-3 text-sm text-slate-600">
                                            <div className="flex items-center justify-between gap-4">
                                                <span>Event</span>
                                                <span className="font-semibold text-slate-950">{event.title}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <span>Date</span>
                                                <span className="font-semibold text-slate-950">{formatEventDate(event.date)}</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <span>Type</span>
                                                <span className="font-semibold text-slate-950">{event.price === 0 ? 'Free RSVP' : 'General admission'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                                        <label className="block text-sm font-semibold text-slate-700" htmlFor="ticket-quantity">
                                            Quantity
                                        </label>
                                        <div className="mt-3 flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
                                            >
                                                -
                                            </button>
                                            <input
                                                id="ticket-quantity"
                                                type="number"
                                                min="1"
                                                value={quantity}
                                                onChange={(eventValue) => setQuantity(Math.max(1, Number(eventValue.target.value) || 1))}
                                                className="h-12 w-24 rounded-2xl border border-slate-200 bg-white px-4 text-center text-sm font-semibold text-slate-700 outline-none transition focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setQuantity((current) => current + 1)}
                                                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <p className="text-sm font-semibold text-slate-700">Payment method</p>
                                    <div className="mt-4 grid gap-3">
                                        {PAYMENT_METHODS.map((method) => (
                                            <button
                                                key={method.id}
                                                type="button"
                                                onClick={() => setPaymentMethod(method.id)}
                                                className={classNames(
                                                    'flex items-start justify-between rounded-[24px] border px-4 py-4 text-left transition',
                                                    paymentMethod === method.id
                                                        ? 'border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/15'
                                                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
                                                )}
                                            >
                                                <div>
                                                    <p className="font-semibold">{method.label}</p>
                                                    <p className={classNames('mt-1 text-sm', paymentMethod === method.id ? 'text-slate-300' : 'text-slate-500')}>{method.note}</p>
                                                </div>
                                                <Icon name="credit-card" className="h-5 w-5" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            <aside className="space-y-6">
                                <section className="panel-dark p-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Order summary</p>
                                    <div className="mt-5 space-y-4 text-sm text-slate-200">
                                        <div className="flex items-center justify-between gap-4">
                                            <span>Tickets x {quantity}</span>
                                            <span>{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-4">
                                            <span>Platform fee</span>
                                            <span>{formatPrice(platformFee)}</span>
                                        </div>
                                        <div className="border-t border-white/10 pt-4">
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="text-base font-semibold text-white">Total</span>
                                                <span className="dashboard-display text-3xl font-bold text-white">{formatPrice(total)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 rounded-[24px] bg-white/6 p-4 text-sm text-slate-200">
                                        Selected method: <span className="font-semibold text-white">{selectedMethod.label}</span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setIsConfirmed(true)}
                                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:bg-slate-100"
                                    >
                                        {event.price === 0 ? 'Confirm RSVP' : 'Confirm payment'}
                                        <Icon name="arrow" className="h-4 w-4" />
                                    </button>
                                </section>
                            </aside>
                        </div>
                    )}
                </main>
            </div>

            <FloatingCreateButton />
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
