import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

import {
    INVITATION_TEMPLATES,
    INVITE_CONTACTS,
    PRIVATE_EVENT_LIMITS,
    buildInvitationLink,
    buildInvitationPayload,
    getInitials
} from './social-hub/mockData';
import { classNames as uiClassNames } from './social-hub/ui';
import { InvitationTemplatePreview } from './invitation-templates';

const { StrictMode, useMemo, useState } = React;

function MaterialIcon({ name, className = '' }) {
    return (
        <span aria-hidden="true" className={uiClassNames('material-symbols-outlined leading-none', className)}>
            {name}
        </span>
    );
}

function PrivateEventNavigation({ userName }) {
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
                    <button type="button" className="rounded-full p-2 text-[#484552] transition hover:bg-white/80 hover:text-[#5e50b0]">
                        <MaterialIcon name="notifications" />
                    </button>
                    <a href="/profile" className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#c8bfff] bg-white text-sm font-bold text-[#5e50b0]" title={`${userName} ${displayHandle}`}>
                        {userName?.substring(0,2).toUpperCase() || 'AY'}
                    </a>
                </div>
            </div>
        </header>
    );
}

function PrivateEventBuilder({ userName, userEmail, userPlan }) {
    const [title, setTitle] = useState('Skyline Dinner Afterparty');
    const [date, setDate] = useState('2026-06-14T19:30');
    const [theme, setTheme] = useState(INVITATION_TEMPLATES[0].id);
    const [message, setMessage] = useState(INVITATION_TEMPLATES[0].defaultMessage);
    const [selectedContactIds, setSelectedContactIds] = useState(['contact-1', 'contact-2', 'contact-3']);
    const [manualInvitees, setManualInvitees] = useState('friend.one@gmail.com, cousin.two@yahoo.com');
    const [creationSummary, setCreationSummary] = useState(null);

    const selectedContacts = INVITE_CONTACTS.filter((contact) => selectedContactIds.includes(contact.id));
    const externalInvitees = manualInvitees
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    const totalRequestedInvitees = selectedContacts.length + externalInvitees.length;
    const inviteLimitExceeded = totalRequestedInvitees > PRIVATE_EVENT_LIMITS.maxInvitees;
    const noPrivateSlotsLeft = PRIVATE_EVENT_LIMITS.remainingPrivateEventsThisMonth <= 0;

    const invitation = useMemo(
        () =>
            buildInvitationPayload({
                title,
                date,
                theme,
                message,
                host: userName,
            }),
        [title, date, theme, message, userName],
    );

    function toggleContact(contactId) {
        setSelectedContactIds((currentIds) =>
            currentIds.includes(contactId) ? currentIds.filter((id) => id !== contactId) : [...currentIds, contactId].slice(0, PRIVATE_EVENT_LIMITS.maxInvitees),
        );
    }

    function syncTheme(nextTheme) {
        const template = INVITATION_TEMPLATES.find((item) => item.id === nextTheme) || INVITATION_TEMPLATES[0];
        setTheme(nextTheme);
        setMessage((currentMessage) => (currentMessage === invitation.message ? template.defaultMessage : currentMessage));
    }

    function handleCreate(event) {
        event.preventDefault();

        const token = `${theme}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'private-event'}`;
        const directInboxDeliveries = selectedContacts.filter((contact) => contact.hasAccount).map((contact) => ({
            type: 'Inbox delivery',
            recipient: `${contact.name} ${contact.handle}`,
            destination: 'Sent to DM / inbox',
        }));
        const shareLinks = [
            ...selectedContacts.filter((contact) => !contact.hasAccount).map((contact) => ({
                type: 'Shareable link',
                recipient: contact.address,
                destination: buildInvitationLink(token, theme),
            })),
            ...externalInvitees.map((email) => ({
                type: 'Shareable link',
                recipient: email,
                destination: buildInvitationLink(token, theme),
            })),
        ];

        setCreationSummary({
            token,
            directInboxDeliveries,
            shareLinks,
            totalInvitees: directInboxDeliveries.length + shareLinks.length,
        });
    }

    return (
        <div className="editorial-shell editorial-copy min-h-screen bg-[#fdf8ff] pb-28 text-[#1c1b21] md:pb-0" style={{ backgroundColor: '#fdf8ff' }}>
            <PrivateEventNavigation userName={userName} />

            <main className="pt-24">
                <section className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-8">
                    <div className="overflow-hidden rounded-[32px] bg-[#312f36] p-8 text-white shadow-[0_24px_60px_-32px_rgba(49,47,54,0.65)] sm:p-12">
                        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-center">
                            <div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                                        Private event creation
                                    </span>
                                    <span className="rounded-full bg-[#5e50b0]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#c8bfff]">
                                        Host tools
                                    </span>
                                </div>
                                <h1 className="editorial-display mt-5 max-w-3xl text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[48px]">
                                    Build a private event and distribute invites beautifully.
                                </h1>
                                <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
                                    Account holders receive direct inbox invitations. Non-members get shareable links tied to the selected invitation design.
                                </p>
                            </div>

                            <div className="grid gap-3 text-sm">
                                <div className="rounded-[24px] bg-white/8 p-4">
                                    <p className="text-white/60">Plan</p>
                                    <p className="editorial-display mt-2 text-[24px] font-bold text-white">{userPlan || PRIVATE_EVENT_LIMITS.plan}</p>
                                </div>
                                <div className="rounded-[24px] bg-white/8 p-4">
                                    <p className="text-white/60">Private events left</p>
                                    <p className="editorial-display mt-2 text-[24px] font-bold text-white">{PRIVATE_EVENT_LIMITS.remainingPrivateEventsThisMonth}</p>
                                </div>
                                <div className="rounded-[24px] bg-white/8 p-4">
                                    <p className="text-white/60">Invitee cap</p>
                                    <p className="editorial-display mt-2 text-[24px] font-bold text-white">{PRIVATE_EVENT_LIMITS.maxInvitees}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-8">
                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
                        <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 bg-white/80 p-6 sm:p-8">
                            <div className="flex items-center gap-4 border-b border-[#e5e1ea] pb-6 mb-6">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5e50b0] text-white shadow-md">
                                    <MaterialIcon name="add" className="text-[28px]" />
                                </div>
                                <div>
                                    <p className="editorial-display text-[24px] font-semibold text-[#1c1b21]">Private event form</p>
                                    <p className="text-sm text-[#484552]">Craft your perfect invitation.</p>
                                </div>
                            </div>

                            <form onSubmit={handleCreate} className="space-y-6">
                                <label className="block">
                                    <span className="text-sm font-semibold text-[#1c1b21]">Event name</span>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(event) => setTitle(event.target.value)}
                                        className="mt-2 h-12 w-full rounded-2xl border border-[#e5e1ea] bg-white px-4 text-sm text-[#1c1b21] outline-none transition focus:border-[#5e50b0] focus:ring-4 focus:ring-[#5e50b0]/20"
                                        required
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-semibold text-[#1c1b21]">Date &amp; time</span>
                                    <input
                                        type="datetime-local"
                                        value={date}
                                        onChange={(event) => setDate(event.target.value)}
                                        className="mt-2 h-12 w-full rounded-2xl border border-[#e5e1ea] bg-white px-4 text-sm text-[#1c1b21] outline-none transition focus:border-[#5e50b0] focus:ring-4 focus:ring-[#5e50b0]/20"
                                        required
                                    />
                                </label>

                                <div>
                                    <span className="text-sm font-semibold text-[#1c1b21]">Theme selection</span>
                                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                                        {INVITATION_TEMPLATES.map((template) => (
                                            <button
                                                key={template.id}
                                                type="button"
                                                onClick={() => syncTheme(template.id)}
                                                className={uiClassNames(
                                                    'rounded-[24px] border px-4 py-4 text-left transition',
                                                    theme === template.id
                                                        ? 'border-[#5e50b0] bg-[#5e50b0] text-white shadow-lg shadow-[#5e50b0]/30'
                                                        : 'border-[#e5e1ea] bg-white hover:border-[#c8bfff]',
                                                )}
                                            >
                                                <p className={uiClassNames("font-semibold", theme === template.id ? 'text-white' : 'text-[#1c1b21]')}>{template.name}</p>
                                                <p className={uiClassNames('mt-2 text-sm leading-6', theme === template.id ? 'text-white/80' : 'text-[#797583]')}>
                                                    {template.blurb}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <label className="block">
                                    <span className="text-sm font-semibold text-[#1c1b21]">Invitation message</span>
                                    <textarea
                                        rows="4"
                                        value={message}
                                        onChange={(event) => setMessage(event.target.value)}
                                        className="mt-2 w-full rounded-2xl border border-[#e5e1ea] bg-white px-4 py-3 text-sm leading-6 text-[#1c1b21] outline-none transition focus:border-[#5e50b0] focus:ring-4 focus:ring-[#5e50b0]/20"
                                    />
                                </label>

                                <div>
                                    <span className="text-sm font-semibold text-[#1c1b21]">Invite contacts</span>
                                    <div className="mt-3 grid gap-3">
                                        {INVITE_CONTACTS.map((contact) => {
                                            const selected = selectedContactIds.includes(contact.id);
                                            return (
                                                <button
                                                    key={contact.id}
                                                    type="button"
                                                    onClick={() => toggleContact(contact.id)}
                                                    className={uiClassNames(
                                                        'flex items-center justify-between rounded-[24px] border px-4 py-4 text-left transition',
                                                        selected ? 'border-[#5e50b0] bg-[#5e50b0] text-white' : 'border-[#e5e1ea] bg-white hover:border-[#c8bfff]',
                                                    )}
                                                >
                                                    <div>
                                                        <p className={uiClassNames("font-semibold", selected ? 'text-white' : 'text-[#1c1b21]')}>{contact.name}</p>
                                                        <p className={uiClassNames('mt-1 text-sm', selected ? 'text-white/70' : 'text-[#797583]')}>
                                                            {contact.handle || contact.address}
                                                        </p>
                                                    </div>
                                                    <span className={uiClassNames('rounded-full px-3 py-1 text-xs font-semibold', selected ? 'bg-white/20 text-white' : contact.hasAccount ? 'bg-[#c1e9d5] text-[#002116]' : 'bg-[#f1ecf5] text-[#5e50b0]')}>
                                                        {contact.hasAccount ? 'Account' : 'Link only'}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <label className="block">
                                    <span className="text-sm font-semibold text-[#1c1b21]">Extra invite emails</span>
                                    <textarea
                                        rows="3"
                                        value={manualInvitees}
                                        onChange={(event) => setManualInvitees(event.target.value)}
                                        className="mt-2 w-full rounded-2xl border border-[#e5e1ea] bg-white px-4 py-3 text-sm leading-6 text-[#1c1b21] outline-none transition focus:border-[#5e50b0] focus:ring-4 focus:ring-[#5e50b0]/20"
                                        placeholder="friend@example.com, guest@example.com"
                                    />
                                    <p className="mt-2 text-xs text-[#797583]">Comma-separated emails will receive shareable invitation links.</p>
                                </label>

                                {inviteLimitExceeded && (
                                    <div className="rounded-[24px] border border-[#f43f5e]/30 bg-[#fff1f2] px-4 py-4 text-sm font-semibold text-[#f43f5e]">
                                        Free plan limit reached. You can invite up to {PRIVATE_EVENT_LIMITS.maxInvitees} people per private event.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={inviteLimitExceeded || noPrivateSlotsLeft}
                                    className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-[#5e50b0] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_36px_-20px_rgba(94,80,176,0.8)] transition hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    Create private event
                                    <MaterialIcon name="arrow_forward" className="text-[20px]" />
                                </button>
                            </form>
                        </div>

                        <aside className="space-y-6">
                            <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 bg-white/80 p-6 sm:p-8">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#797583]">Live invitation preview</p>
                                <div className="mt-5">
                                    <InvitationTemplatePreview invitation={invitation} />
                                </div>
                            </div>

                            {creationSummary ? (
                                <div className="glass-card ambient-shadow rounded-[32px] border border-white/70 bg-[#312f36] p-6 sm:p-8 text-white">
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">Invitation system</p>
                                    <h2 className="editorial-display mt-3 text-[28px] font-bold text-white">Delivery summary</h2>
                                    <p className="mt-2 text-sm text-white/80">
                                        {creationSummary.totalInvitees} invitees processed from {userEmail}.
                                    </p>

                                    <div className="mt-6 space-y-4">
                                        {creationSummary.directInboxDeliveries.map((item) => (
                                            <div key={item.recipient} className="rounded-[24px] bg-white/10 p-4 text-sm text-white/90 border border-white/10">
                                                <p className="font-semibold text-white">{item.recipient}</p>
                                                <p className="mt-1 text-white/70">{item.type}</p>
                                                <p className="mt-2 font-medium text-[#c8bfff]">{item.destination}</p>
                                            </div>
                                        ))}

                                        {creationSummary.shareLinks.map((item) => (
                                            <div key={`${item.recipient}-${item.destination}`} className="rounded-[24px] bg-white/10 p-4 text-sm text-white/90 border border-white/10">
                                                <p className="font-semibold text-white">{item.recipient}</p>
                                                <p className="mt-1 text-white/70">{item.type}</p>
                                                <a href={item.destination} className="mt-2 block break-all text-[#c8bfff] underline underline-offset-4 hover:text-white">
                                                    {item.destination}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="glass-card ambient-shadow rounded-[32px] border border-[#c8bfff] bg-[#f1ecf5] p-6 sm:p-8">
                                    <p className="text-sm leading-7 text-[#5e50b0] font-medium">
                                        Create the event to generate direct inbox deliveries for AyoYok members and shareable invitation links for everyone else.
                                    </p>
                                </div>
                            )}
                        </aside>
                    </div>
                </section>
            </main>
        </div>
    );
}

const mountNode = document.getElementById('ayoyok-private-event-root');

if (mountNode) {
    createRoot(mountNode).render(
        <StrictMode>
            <PrivateEventBuilder
                userName={mountNode.dataset.userName || 'AyoYok User'}
                userEmail={mountNode.dataset.userEmail || 'hello@ayoyok.app'}
                userPlan={mountNode.dataset.userPlan || PRIVATE_EVENT_LIMITS.plan}
            />
        </StrictMode>,
    );
}
