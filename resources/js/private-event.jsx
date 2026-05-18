import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

import {
    INVITATION_TEMPLATES,
    INVITE_CONTACTS,
    PRIVATE_EVENT_LIMITS,
    buildInvitationLink,
    buildInvitationPayload,
} from './social-hub/mockData';
import { classNames, Icon, TopNavigation } from './social-hub/ui';
import { InvitationTemplatePreview } from './invitation-templates';

const { StrictMode, useMemo, useState } = React;

function PrivateEventBuilder({ userName, userEmail, userPlan }) {
    const [searchTerm, setSearchTerm] = useState('');
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
        <div className="dashboard-shell min-h-screen">
            <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 sm:py-6">
                <TopNavigation
                    userName={userName}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    activePath=""
                    searchPlaceholder="Search your contacts or event notes"
                    showSearch={false}
                />

                <main className="mt-6 space-y-6">
                    <section className="panel-dark overflow-hidden p-6 sm:p-8">
                        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
                            <div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                                        Private event creation
                                    </span>
                                    <span className="rounded-full bg-fuchsia-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-100">
                                        Floating + entry point
                                    </span>
                                </div>
                                <h1 className="dashboard-display mt-5 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                                    Build a private event, choose a theme, and distribute invites without leaving the ecosystem.
                                </h1>
                                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                                    Account holders receive direct inbox invitations. Non-members get shareable links tied to the selected invitation design.
                                </p>
                            </div>

                            <div className="grid gap-3 text-sm">
                                <div className="rounded-[24px] bg-white/8 p-4">
                                    <p className="text-slate-400">Plan</p>
                                    <p className="mt-2 text-2xl font-bold text-white">{userPlan || PRIVATE_EVENT_LIMITS.plan}</p>
                                </div>
                                <div className="rounded-[24px] bg-white/8 p-4">
                                    <p className="text-slate-400">Private events left</p>
                                    <p className="mt-2 text-2xl font-bold text-white">{PRIVATE_EVENT_LIMITS.remainingPrivateEventsThisMonth}</p>
                                </div>
                                <div className="rounded-[24px] bg-white/8 p-4">
                                    <p className="text-slate-400">Invitee cap</p>
                                    <p className="mt-2 text-2xl font-bold text-white">{PRIVATE_EVENT_LIMITS.maxInvitees}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
                        <section className="panel p-6 sm:p-7">
                            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                                        <Icon name="plus" className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-950">Private event form</p>
                                        <p className="text-sm text-slate-500">Styled like a modal surface while staying route-based.</p>
                                    </div>
                                </div>

                                <form onSubmit={handleCreate} className="mt-6 space-y-5">
                                    <label className="block">
                                        <span className="text-sm font-semibold text-slate-700">Event name</span>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(event) => setTitle(event.target.value)}
                                            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100"
                                            required
                                        />
                                    </label>

                                    <label className="block">
                                        <span className="text-sm font-semibold text-slate-700">Date &amp; time</span>
                                        <input
                                            type="datetime-local"
                                            value={date}
                                            onChange={(event) => setDate(event.target.value)}
                                            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100"
                                            required
                                        />
                                    </label>

                                    <div>
                                        <span className="text-sm font-semibold text-slate-700">Theme selection</span>
                                        <div className="mt-3 grid gap-3 sm:grid-cols-3">
                                            {INVITATION_TEMPLATES.map((template) => (
                                                <button
                                                    key={template.id}
                                                    type="button"
                                                    onClick={() => syncTheme(template.id)}
                                                    className={classNames(
                                                        'rounded-[24px] border px-4 py-4 text-left transition',
                                                        theme === template.id
                                                            ? 'border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/15'
                                                            : 'border-slate-200 bg-white hover:bg-slate-50',
                                                    )}
                                                >
                                                    <p className="font-semibold">{template.name}</p>
                                                    <p className={classNames('mt-2 text-sm leading-6', theme === template.id ? 'text-slate-300' : 'text-slate-500')}>
                                                        {template.blurb}
                                                    </p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <label className="block">
                                        <span className="text-sm font-semibold text-slate-700">Invitation message</span>
                                        <textarea
                                            rows="4"
                                            value={message}
                                            onChange={(event) => setMessage(event.target.value)}
                                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100"
                                        />
                                    </label>

                                    <div>
                                        <span className="text-sm font-semibold text-slate-700">Invite people</span>
                                        <div className="mt-3 grid gap-3">
                                            {INVITE_CONTACTS.map((contact) => {
                                                const selected = selectedContactIds.includes(contact.id);

                                                return (
                                                    <button
                                                        key={contact.id}
                                                        type="button"
                                                        onClick={() => toggleContact(contact.id)}
                                                        className={classNames(
                                                            'flex items-center justify-between rounded-[24px] border px-4 py-4 text-left transition',
                                                            selected ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-white hover:bg-slate-50',
                                                        )}
                                                    >
                                                        <div>
                                                            <p className="font-semibold">{contact.name}</p>
                                                            <p className={classNames('mt-1 text-sm', selected ? 'text-slate-300' : 'text-slate-500')}>
                                                                {contact.handle || contact.address}
                                                            </p>
                                                        </div>
                                                        <span className={classNames('rounded-full px-3 py-1 text-xs font-semibold', selected ? 'bg-white/10 text-white' : contact.hasAccount ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')}>
                                                            {contact.hasAccount ? 'Account' : 'Link only'}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <label className="block">
                                        <span className="text-sm font-semibold text-slate-700">Extra invite emails</span>
                                        <textarea
                                            rows="3"
                                            value={manualInvitees}
                                            onChange={(event) => setManualInvitees(event.target.value)}
                                            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100"
                                            placeholder="friend@example.com, guest@example.com"
                                        />
                                        <p className="mt-2 text-xs text-slate-500">Comma-separated emails will receive shareable invitation links.</p>
                                    </label>

                                    {inviteLimitExceeded ? (
                                        <div className="rounded-[24px] border border-amber-200 bg-amber-50 px-4 py-4 text-sm font-semibold text-amber-700">
                                            Free plan limit reached. You can invite up to {PRIVATE_EVENT_LIMITS.maxInvitees} people per private event.
                                        </div>
                                    ) : null}

                                    <button
                                        type="submit"
                                        disabled={inviteLimitExceeded || noPrivateSlotsLeft}
                                        className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                                    >
                                        Create private event
                                        <Icon name="arrow" className="h-4 w-4" />
                                    </button>
                                </form>
                            </div>
                        </section>

                        <aside className="space-y-6">
                            <section className="panel p-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Live invitation preview</p>
                                <div className="mt-5">
                                    <InvitationTemplatePreview invitation={invitation} />
                                </div>
                            </section>

                            {creationSummary ? (
                                <section className="panel-dark p-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Invitation system</p>
                                    <h2 className="dashboard-display mt-3 text-2xl font-bold text-white">Delivery summary</h2>
                                    <p className="mt-2 text-sm text-slate-300">
                                        {creationSummary.totalInvitees} invitees processed from {userEmail}.
                                    </p>

                                    <div className="mt-5 space-y-4">
                                        {creationSummary.directInboxDeliveries.map((item) => (
                                            <div key={item.recipient} className="rounded-[24px] bg-white/6 p-4 text-sm text-slate-200">
                                                <p className="font-semibold text-white">{item.recipient}</p>
                                                <p className="mt-1">{item.type}</p>
                                                <p className="mt-2 text-slate-300">{item.destination}</p>
                                            </div>
                                        ))}

                                        {creationSummary.shareLinks.map((item) => (
                                            <div key={`${item.recipient}-${item.destination}`} className="rounded-[24px] bg-white/6 p-4 text-sm text-slate-200">
                                                <p className="font-semibold text-white">{item.recipient}</p>
                                                <p className="mt-1">{item.type}</p>
                                                <a href={item.destination} className="mt-2 block break-all text-cyan-200 underline underline-offset-4">
                                                    {item.destination}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ) : (
                                <section className="panel p-6">
                                    <p className="text-sm leading-7 text-slate-600">
                                        Create the event to generate direct inbox deliveries for AyoYok members and shareable invitation links for everyone else.
                                    </p>
                                </section>
                            )}
                        </aside>
                    </div>
                </main>
            </div>
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
