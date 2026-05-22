import * as React from 'react';
import { createRoot } from 'react-dom/client';
import eventImage01 from '../../source/event/corporate-event-photography-800x530.webp';
import eventImage02 from '../../source/event/group-fans-gathered-thge-stadium-cheering-up_1303-18617.avif';
import eventImage03 from '../../source/event/images.jpg';

import './bootstrap';

import {
    INVITATION_TEMPLATES,
    INVITE_CONTACTS,
    PRIVATE_EVENT_LIMITS,
    buildInvitationLink,
    buildInvitationPayload,
    getInitials,
} from './social-hub/mockData';
import { classNames as uiClassNames } from './social-hub/ui';
import { InvitationTemplatePreview } from './invitation-templates';
import { logoAyoyok } from './brand-assets';

const { StrictMode, useMemo, useState } = React;

function MaterialIcon({ name, className = '' }) {
    return <span aria-hidden="true" className={uiClassNames('material-symbols-outlined leading-none', className)}>{name}</span>;
}

function EventCreationNavigation({ userName }) {
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
                        <p className="hidden text-xs text-[#7e8eaa] sm:block">Create unforgettable moments</p>
                    </a>

                    <nav className="hidden items-center gap-6 md:flex">
                        <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/dashboard">Home</a>
                        <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/explore">Explore</a>
                        <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/schedule">Schedule</a>
                        <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/profile">Profile</a>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <button type="button" className="rounded-full p-2 text-[#a8b4cc] transition hover:bg-[#111b31]/80 hover:text-[#8ea2ff]">
                        <MaterialIcon name="notifications" />
                    </button>
                    <a href="/profile" className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#3e5996] bg-[#101a30] text-sm font-bold text-[#8ea2ff]" title={`${userName} ${displayHandle}`}>
                        {userName?.substring(0, 2).toUpperCase() || 'AY'}
                    </a>
                </div>
            </div>
        </header>
    );
}

function buildToken(title, theme, mode) {
    const base = `${theme}-${mode}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'event'}`;
    const entropy = Date.now().toString(36).slice(-4);

    return `${base}-${entropy}`;
}

function EventBuilderPage({ userName, userEmail, userUsername, userPlan, eventMode }) {
    const isPrivateMode = eventMode !== 'public';

    const [title, setTitle] = useState(isPrivateMode ? 'Skyline Dinner Afterparty' : 'City Pulse Open Night');
    const [date, setDate] = useState('2026-06-14T19:30');
    const [theme, setTheme] = useState(INVITATION_TEMPLATES[0].id);
    const [welcomeLine, setWelcomeLine] = useState('An evening designed for warm conversations and memorable moments.');
    const [message, setMessage] = useState(INVITATION_TEMPLATES[0].defaultMessage);
    const [description, setDescription] = useState('A curated gathering with intentional pacing, immersive atmosphere, and the right people in the room.');
    const [location, setLocation] = useState('The Glass Atrium, Senayan Gardens, Jakarta');
    const [itinerary, setItinerary] = useState('19:30 Arrival & welcome lounge\n20:00 Opening toast\n20:30 Main experience begins\n22:30 Closing set');
    const [dressCode, setDressCode] = useState('Elevated smart casual with dark palette accents');
    const [coverAsset, setCoverAsset] = useState(eventImage01);
    const [galleryAssets, setGalleryAssets] = useState(`${eventImage02}, ${eventImage03}`);
    const [closingNote, setClosingNote] = useState('Thank you for sharing this night with us. See you at the next chapter.');

    const [selectedContactIds, setSelectedContactIds] = useState(['contact-1', 'contact-2', 'contact-6']);
    const [manualInvitees, setManualInvitees] = useState('friend.one@gmail.com, cousin.two@yahoo.com');
    const [creationSummary, setCreationSummary] = useState(null);

    const selectedContacts = INVITE_CONTACTS.filter((contact) => selectedContactIds.includes(contact.id));
    const externalInvitees = manualInvitees
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

    const totalRequestedInvitees = isPrivateMode ? selectedContacts.length + externalInvitees.length : 1;
    const inviteLimitExceeded = isPrivateMode && totalRequestedInvitees > PRIVATE_EVENT_LIMITS.maxInvitees;
    const noPrivateSlotsLeft = isPrivateMode && PRIVATE_EVENT_LIMITS.remainingPrivateEventsThisMonth <= 0;

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

    const modeLabel = isPrivateMode ? 'Private' : 'Public';
    const modeSubtitle = isPrivateMode
        ? 'Invite-only experience with recipient personalization.'
        : 'Public launch flow with premium invitation storytelling.';

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

        const token = buildToken(title, theme, isPrivateMode ? 'private' : 'public');
        const issuedAt = new Date();
        const expiresAt = new Date(issuedAt.getTime() + 24 * 60 * 60 * 1000);

        const metadataBase = {
            title,
            date,
            host: userName,
            welcome: welcomeLine,
            description,
            location,
            itinerary,
            dress: dressCode,
            gallery: galleryAssets,
            closing: closingNote,
            cover: coverAsset,
            message,
            eventType: isPrivateMode ? 'private' : 'public',
            sentTo: userUsername ? `@${userUsername}` : '',
            issuedAt: issuedAt.toISOString(),
            exp: expiresAt.toISOString(),
        };

        const primaryLink = buildInvitationLink(token, theme, metadataBase);

        const directInboxDeliveries = isPrivateMode
            ? selectedContacts.filter((contact) => contact.hasAccount).map((contact) => {
                  const handle = contact.handle?.replace(/^@/, '') || '';
                  const previewLink = buildInvitationLink(token, theme, {
                      ...metadataBase,
                      to: handle,
                      recipient: contact.name,
                      sentTo: contact.handle || metadataBase.sentTo,
                  });

                  return {
                      type: 'Inbox delivery',
                      recipient: `${contact.name} ${contact.handle}`,
                      destination: 'Queued to account inbox',
                      previewLink,
                  };
              })
            : [];

        const shareLinks = isPrivateMode
            ? [
                  ...selectedContacts.filter((contact) => !contact.hasAccount).map((contact) => ({
                      type: 'Shareable link',
                      recipient: contact.address,
                      destination: buildInvitationLink(token, theme, {
                          ...metadataBase,
                          recipient: contact.name,
                      }),
                  })),
                  ...externalInvitees.map((email) => ({
                      type: 'Shareable link',
                      recipient: email,
                      destination: buildInvitationLink(token, theme, {
                          ...metadataBase,
                          recipient: email.split('@')[0],
                      }),
                  })),
              ]
            : [
                  {
                      type: 'Public launch link',
                      recipient: 'Public audience',
                      destination: primaryLink,
                  },
              ];

        try {
            window.localStorage.setItem(
                `ayoyok-invite-${token}`,
                JSON.stringify({
                    ...metadataBase,
                    theme,
                }),
            );
        } catch {
            // Continue without local persistence.
        }

        setCreationSummary({
            token,
            primaryLink,
            expiresAt: expiresAt.toISOString(),
            directInboxDeliveries,
            shareLinks,
            totalInvitees: directInboxDeliveries.length + shareLinks.length,
        });
    }

    return (
        <div className="editorial-shell editorial-copy min-h-screen bg-[#050b17] pb-28 text-[#e8eefc] md:pb-0" style={{ backgroundColor: '#050b17' }}>
            <EventCreationNavigation userName={userName} />

            <main className="pt-24">
                <section className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-8">
                    <div className="overflow-hidden rounded-[32px] bg-[#0f1628] p-8 text-white shadow-[0_24px_60px_-32px_rgba(49,47,54,0.65)] sm:p-12">
                        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-center">
                            <div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-full bg-[#101a30]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                                        {modeLabel} event creation
                                    </span>
                                    <span className="rounded-full bg-[#8ea2ff]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#9fb0ff]">
                                        Cinematic invitation flow
                                    </span>
                                </div>
                                <h1 className="editorial-display mt-5 max-w-3xl text-[36px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[48px]">
                                    Build a {isPrivateMode ? 'personalized invite journey' : 'public launch invitation'} with premium storytelling.
                                </h1>
                                <p className="mt-4 max-w-2xl text-base leading-7 text-[#c1cde4]">{modeSubtitle}</p>
                            </div>

                            <div className="grid gap-3 text-sm">
                                <div className="rounded-[24px] bg-[#101a30]/38 p-4">
                                    <p className="text-[#b2c0da]">Plan</p>
                                    <p className="editorial-display mt-2 text-[24px] font-bold text-white">{userPlan || PRIVATE_EVENT_LIMITS.plan}</p>
                                </div>
                                <div className="rounded-[24px] bg-[#101a30]/38 p-4">
                                    <p className="text-[#b2c0da]">Flow</p>
                                    <p className="editorial-display mt-2 text-[24px] font-bold text-white">{modeLabel}</p>
                                </div>
                                <div className="rounded-[24px] bg-[#101a30]/38 p-4">
                                    <p className="text-[#b2c0da]">Invitation style</p>
                                    <p className="editorial-display mt-2 text-[24px] font-bold text-white">Story sections</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-[1200px] px-5 pb-12 lg:px-8">
                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
                        <div className="glass-card ambient-shadow rounded-[32px] border border-[#25324d]/70 bg-[#111b31]/80 p-6 sm:p-8">
                            <div className="mb-6 flex items-center gap-4 border-b border-[#1d2940] pb-6">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8ea2ff] text-white shadow-md">
                                    <MaterialIcon name="auto_awesome" className="text-[28px]" />
                                </div>
                                <div>
                                    <p className="editorial-display text-[24px] font-semibold text-[#e8eefc]">{modeLabel} event form</p>
                                    <p className="text-sm text-[#a8b4cc]">All fields feed the generated invitation experience.</p>
                                </div>
                            </div>

                            <form onSubmit={handleCreate} className="space-y-6">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <label className="block">
                                        <span className="text-sm font-semibold text-[#e8eefc]">Event name</span>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(event) => setTitle(event.target.value)}
                                            className="mt-2 h-12 w-full rounded-2xl border border-[#1d2940] bg-[#101a30] px-4 text-sm text-[#e8eefc] outline-none transition focus:border-[#8ea2ff] focus:ring-4 focus:ring-[#8ea2ff]/20"
                                            required
                                        />
                                    </label>

                                    <label className="block">
                                        <span className="text-sm font-semibold text-[#e8eefc]">Date &amp; time</span>
                                        <input
                                            type="datetime-local"
                                            value={date}
                                            onChange={(event) => setDate(event.target.value)}
                                            className="mt-2 h-12 w-full rounded-2xl border border-[#1d2940] bg-[#101a30] px-4 text-sm text-[#e8eefc] outline-none transition focus:border-[#8ea2ff] focus:ring-4 focus:ring-[#8ea2ff]/20"
                                            required
                                        />
                                    </label>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <label className="block">
                                        <span className="text-sm font-semibold text-[#e8eefc]">Location</span>
                                        <input
                                            type="text"
                                            value={location}
                                            onChange={(event) => setLocation(event.target.value)}
                                            className="mt-2 h-12 w-full rounded-2xl border border-[#1d2940] bg-[#101a30] px-4 text-sm text-[#e8eefc] outline-none transition focus:border-[#8ea2ff] focus:ring-4 focus:ring-[#8ea2ff]/20"
                                            required
                                        />
                                    </label>

                                    <label className="block">
                                        <span className="text-sm font-semibold text-[#e8eefc]">Dress code</span>
                                        <input
                                            type="text"
                                            value={dressCode}
                                            onChange={(event) => setDressCode(event.target.value)}
                                            className="mt-2 h-12 w-full rounded-2xl border border-[#1d2940] bg-[#101a30] px-4 text-sm text-[#e8eefc] outline-none transition focus:border-[#8ea2ff] focus:ring-4 focus:ring-[#8ea2ff]/20"
                                        />
                                    </label>
                                </div>

                                <label className="block">
                                    <span className="text-sm font-semibold text-[#e8eefc]">Cover image / video URL</span>
                                    <input
                                        type="url"
                                        value={coverAsset}
                                        onChange={(event) => setCoverAsset(event.target.value)}
                                        className="mt-2 h-12 w-full rounded-2xl border border-[#1d2940] bg-[#101a30] px-4 text-sm text-[#e8eefc] outline-none transition focus:border-[#8ea2ff] focus:ring-4 focus:ring-[#8ea2ff]/20"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-semibold text-[#e8eefc]">Welcome line</span>
                                    <input
                                        type="text"
                                        value={welcomeLine}
                                        onChange={(event) => setWelcomeLine(event.target.value)}
                                        className="mt-2 h-12 w-full rounded-2xl border border-[#1d2940] bg-[#101a30] px-4 text-sm text-[#e8eefc] outline-none transition focus:border-[#8ea2ff] focus:ring-4 focus:ring-[#8ea2ff]/20"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-semibold text-[#e8eefc]">Event description</span>
                                    <textarea
                                        rows="4"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                        className="mt-2 w-full rounded-2xl border border-[#1d2940] bg-[#101a30] px-4 py-3 text-sm leading-6 text-[#e8eefc] outline-none transition focus:border-[#8ea2ff] focus:ring-4 focus:ring-[#8ea2ff]/20"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-semibold text-[#e8eefc]">Schedule / itinerary</span>
                                    <textarea
                                        rows="4"
                                        value={itinerary}
                                        onChange={(event) => setItinerary(event.target.value)}
                                        className="mt-2 w-full rounded-2xl border border-[#1d2940] bg-[#101a30] px-4 py-3 text-sm leading-6 text-[#e8eefc] outline-none transition focus:border-[#8ea2ff] focus:ring-4 focus:ring-[#8ea2ff]/20"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-semibold text-[#e8eefc]">Gallery asset URLs (comma separated)</span>
                                    <textarea
                                        rows="3"
                                        value={galleryAssets}
                                        onChange={(event) => setGalleryAssets(event.target.value)}
                                        className="mt-2 w-full rounded-2xl border border-[#1d2940] bg-[#101a30] px-4 py-3 text-sm leading-6 text-[#e8eefc] outline-none transition focus:border-[#8ea2ff] focus:ring-4 focus:ring-[#8ea2ff]/20"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-semibold text-[#e8eefc]">Closing note</span>
                                    <textarea
                                        rows="3"
                                        value={closingNote}
                                        onChange={(event) => setClosingNote(event.target.value)}
                                        className="mt-2 w-full rounded-2xl border border-[#1d2940] bg-[#101a30] px-4 py-3 text-sm leading-6 text-[#e8eefc] outline-none transition focus:border-[#8ea2ff] focus:ring-4 focus:ring-[#8ea2ff]/20"
                                    />
                                </label>

                                <div>
                                    <span className="text-sm font-semibold text-[#e8eefc]">Theme selection</span>
                                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                                        {INVITATION_TEMPLATES.map((template) => (
                                            <button
                                                key={template.id}
                                                type="button"
                                                onClick={() => syncTheme(template.id)}
                                                className={uiClassNames(
                                                    'rounded-[24px] border px-4 py-4 text-left transition',
                                                    theme === template.id
                                                        ? 'border-[#8ea2ff] bg-[#8ea2ff] text-white shadow-lg shadow-[#8ea2ff]/30'
                                                        : 'border-[#1d2940] bg-[#101a30] hover:border-[#3e5996]',
                                                )}
                                            >
                                                <p className={uiClassNames('font-semibold', theme === template.id ? 'text-white' : 'text-[#e8eefc]')}>{template.name}</p>
                                                <p className={uiClassNames('mt-2 text-sm leading-6', theme === template.id ? 'text-[#c1cde4]' : 'text-[#7e8eaa]')}>
                                                    {template.blurb}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <label className="block">
                                    <span className="text-sm font-semibold text-[#e8eefc]">Invitation / opening message</span>
                                    <textarea
                                        rows="4"
                                        value={message}
                                        onChange={(event) => setMessage(event.target.value)}
                                        className="mt-2 w-full rounded-2xl border border-[#1d2940] bg-[#101a30] px-4 py-3 text-sm leading-6 text-[#e8eefc] outline-none transition focus:border-[#8ea2ff] focus:ring-4 focus:ring-[#8ea2ff]/20"
                                    />
                                </label>

                                {isPrivateMode ? (
                                    <>
                                        <div>
                                            <span className="text-sm font-semibold text-[#e8eefc]">Invite contacts</span>
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
                                                                selected ? 'border-[#8ea2ff] bg-[#8ea2ff] text-white' : 'border-[#1d2940] bg-[#101a30] hover:border-[#3e5996]',
                                                            )}
                                                        >
                                                            <div>
                                                                <p className={uiClassNames('font-semibold', selected ? 'text-white' : 'text-[#e8eefc]')}>{contact.name}</p>
                                                                <p className={uiClassNames('mt-1 text-sm', selected ? 'text-[#b2c0da]' : 'text-[#7e8eaa]')}>
                                                                    {contact.handle || contact.address}
                                                                </p>
                                                            </div>
                                                            <span
                                                                className={uiClassNames(
                                                                    'rounded-full px-3 py-1 text-xs font-semibold',
                                                                    selected ? 'bg-[#101a30]/20 text-white' : contact.hasAccount ? 'bg-[#1b365f] text-[#b9cbf1]' : 'bg-[#101a30] text-[#8ea2ff]',
                                                                )}
                                                            >
                                                                {contact.hasAccount ? 'Account' : 'Link only'}
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <label className="block">
                                            <span className="text-sm font-semibold text-[#e8eefc]">Extra invite emails</span>
                                            <textarea
                                                rows="3"
                                                value={manualInvitees}
                                                onChange={(event) => setManualInvitees(event.target.value)}
                                                className="mt-2 w-full rounded-2xl border border-[#1d2940] bg-[#101a30] px-4 py-3 text-sm leading-6 text-[#e8eefc] outline-none transition focus:border-[#8ea2ff] focus:ring-4 focus:ring-[#8ea2ff]/20"
                                                placeholder="friend@example.com, guest@example.com"
                                            />
                                            <p className="mt-2 text-xs text-[#7e8eaa]">Each generated link can personalize greeting automatically from account handle.</p>
                                        </label>
                                    </>
                                ) : null}

                                {inviteLimitExceeded ? (
                                    <div className="rounded-[24px] border border-[#f43f5e]/30 bg-[#2a1624] px-4 py-4 text-sm font-semibold text-[#ff8ea6]">
                                        Free plan limit reached. You can invite up to {PRIVATE_EVENT_LIMITS.maxInvitees} people per private event.
                                    </div>
                                ) : null}

                                <button
                                    type="submit"
                                    disabled={inviteLimitExceeded || noPrivateSlotsLeft}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8ea2ff] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_36px_-20px_rgba(94,80,176,0.8)] transition hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    Create {isPrivateMode ? 'private' : 'public'} event
                                    <MaterialIcon name="arrow_forward" className="text-[20px]" />
                                </button>
                            </form>
                        </div>

                        <aside className="space-y-6">
                            <div className="glass-card ambient-shadow rounded-[32px] border border-[#25324d]/70 bg-[#111b31]/80 p-6 sm:p-8">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7e8eaa]">Live invitation preview</p>
                                <div className="mt-5">
                                    <InvitationTemplatePreview invitation={invitation} />
                                </div>
                            </div>

                            {creationSummary ? (
                                <div className="glass-card ambient-shadow rounded-[32px] border border-[#25324d]/70 bg-[#0f1628] p-6 text-white sm:p-8">
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a8b4cc]">Invitation system</p>
                                    <h2 className="editorial-display mt-3 text-[28px] font-bold text-white">Delivery summary</h2>
                                    <p className="mt-2 text-sm text-[#c1cde4]">
                                        {creationSummary.totalInvitees} delivery targets processed from {userEmail}.
                                    </p>
                                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#8ea2ff]">
                                        Invite expires: {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(creationSummary.expiresAt))}
                                    </p>

                                    <a
                                        href={creationSummary.primaryLink}
                                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#8ea2ff]/20 px-4 py-2 text-sm font-semibold text-[#9fb0ff] transition hover:bg-[#8ea2ff]/30"
                                    >
                                        Open generated invitation
                                        <MaterialIcon name="open_in_new" className="text-[16px]" />
                                    </a>

                                    <div className="mt-6 space-y-4">
                                        {creationSummary.directInboxDeliveries.map((item) => (
                                            <div key={item.recipient} className="rounded-[24px] border border-[#25324d]/50 bg-[#101a30]/35 p-4 text-sm text-[#d5def0]">
                                                <p className="font-semibold text-white">{item.recipient}</p>
                                                <p className="mt-1 text-[#b2c0da]">{item.type}</p>
                                                <p className="mt-1 text-[#7e8eaa]">{item.destination}</p>
                                                <a href={item.previewLink} className="mt-2 block break-all text-[#8ea2ff] underline underline-offset-4 hover:text-white">
                                                    {item.previewLink}
                                                </a>
                                            </div>
                                        ))}

                                        {creationSummary.shareLinks.map((item) => (
                                            <div key={`${item.recipient}-${item.destination}`} className="rounded-[24px] border border-[#25324d]/50 bg-[#101a30]/35 p-4 text-sm text-[#d5def0]">
                                                <p className="font-semibold text-white">{item.recipient}</p>
                                                <p className="mt-1 text-[#b2c0da]">{item.type}</p>
                                                <a href={item.destination} className="mt-2 block break-all text-[#8ea2ff] underline underline-offset-4 hover:text-white">
                                                    {item.destination}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="glass-card ambient-shadow rounded-[32px] border border-[#3e5996] bg-[#101a30] p-6 sm:p-8">
                                    <p className="text-sm font-medium leading-7 text-[#8ea2ff]">
                                        Submit this form to generate a cinematic invitation page with automatic greeting personalization and scroll-based storytelling sections.
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
            <EventBuilderPage
                userName={mountNode.dataset.userName || 'AyoYok User'}
                userEmail={mountNode.dataset.userEmail || 'hello@ayoyok.app'}
                userUsername={mountNode.dataset.userUsername || 'ayoyok-user'}
                userPlan={mountNode.dataset.userPlan || PRIVATE_EVENT_LIMITS.plan}
                eventMode={mountNode.dataset.eventMode || 'private'}
            />
        </StrictMode>,
    );
}
