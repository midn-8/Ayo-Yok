import * as React from 'react';
import { createRoot } from 'react-dom/client';
import eventImage01 from '../../source/event/corporate-event-photography-800x530.webp';
import eventImage02 from '../../source/event/group-fans-gathered-thge-stadium-cheering-up_1303-18617.avif';
import eventImage03 from '../../source/event/images.jpg';
import eventImage04 from '../../source/event/istockphoto-1184628725-612x612.jpg';

import './bootstrap';

import { buildInvitationPayload, getInvitationPreviewByToken } from './social-hub/mockData';
import { classNames as uiClassNames } from './social-hub/ui';
import { logoAyoyokTransparent } from './brand-assets';

const { StrictMode, useEffect, useMemo, useRef, useState } = React;
const DEFAULT_INVITE_COVER = eventImage01;
const DEFAULT_INVITE_GALLERY = [eventImage02, eventImage03, eventImage04];

function MaterialIcon({ name, className = '' }) {
    return <span aria-hidden="true" className={uiClassNames('material-symbols-outlined leading-none', className)}>{name}</span>;
}

function useReveal(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.18,
                rootMargin: '0px 0px -64px 0px',
                ...options,
            },
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [options]);

    return [ref, isVisible];
}

function RevealSection({ children, className = '' }) {
    const [ref, isVisible] = useReveal();

    return (
        <section
            ref={ref}
            className={uiClassNames(
                'transform-gpu transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
                className,
            )}
        >
            {children}
        </section>
    );
}

function splitLines(value) {
    return String(value || '')
        .split(/\n|\|/)
        .map((item) => item.trim())
        .filter(Boolean);
}

function splitAssets(value) {
    return String(value || '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
}

function getSearchParams() {
    return new URLSearchParams(window.location.search);
}

function getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
}

function buildInvitationExperience(token, theme, viewerName, recipientName, recipientHandle) {
    const params = getSearchParams();
    const baseInvitation = getInvitationPreviewByToken(token);

    const localStorageKey = `ayoyok-invite-${token}`;
    let localDraft = null;

    try {
        const raw = window.localStorage.getItem(localStorageKey);
        localDraft = raw ? JSON.parse(raw) : null;
    } catch {
        localDraft = null;
    }

    const invitation = buildInvitationPayload({
        ...baseInvitation,
        ...localDraft,
        theme: theme || params.get('theme') || baseInvitation.theme,
        title: params.get('title') || localDraft?.title || baseInvitation.title,
        date: params.get('date') || localDraft?.date || baseInvitation.date,
        host: params.get('host') || localDraft?.host || baseInvitation.host,
        message: params.get('message') || localDraft?.message || baseInvitation.message,
    });

    const greetingName = recipientName || params.get('recipient') || viewerName || 'Guest';

    const cover = params.get('cover') || localDraft?.cover || DEFAULT_INVITE_COVER;

    const experience = {
        greetingName,
        sentTo: params.get('sentTo') || (recipientHandle ? `@${recipientHandle}` : null),
        welcomeLine:
            params.get('welcome') || localDraft?.welcome || 'An invitation designed with intention, atmosphere, and unforgettable pacing.',
        description:
            params.get('description') ||
            localDraft?.description ||
            'A curated evening with thoughtful transitions, meaningful conversations, and a cinematic social experience.',
        location: params.get('location') || localDraft?.location || 'The Glass Atrium, Senayan Gardens, Jakarta',
        itinerary: splitLines(params.get('itinerary') || localDraft?.itinerary || ''),
        dress: params.get('dress') || localDraft?.dress || 'Smart evening attire',
        gallery: splitAssets(params.get('gallery') || localDraft?.gallery || ''),
        closing:
            params.get('closing') ||
            localDraft?.closing ||
            'Thank you for stepping into this experience. We look forward to sharing the night with you.',
        cover,
        eventType: params.get('eventType') || localDraft?.eventType || 'private',
    };

    if (experience.itinerary.length === 0) {
        experience.itinerary = ['Arrival & welcome', 'Main experience', 'Closing toast'];
    }

    if (experience.gallery.length === 0) {
        experience.gallery = DEFAULT_INVITE_GALLERY;
    }

    return { invitation, experience };
}

function PrivateInvitePage({ token, theme, viewerName, recipientName, recipientHandle, expiresAt, inviteExpired, statusMessage }) {
    const [scrollY, setScrollY] = useState(0);
    const csrfToken = useMemo(() => getCsrfToken(), []);

    const { invitation, experience } = useMemo(
        () => buildInvitationExperience(token, theme, viewerName, recipientName, recipientHandle),
        [token, theme, viewerName, recipientName, recipientHandle],
    );
    const expiryDate = useMemo(() => {
        if (!expiresAt) {
            return null;
        }

        const parsed = new Date(expiresAt);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }, [expiresAt]);
    const isInviteExpired = useMemo(() => {
        if (inviteExpired) {
            return true;
        }

        return expiryDate ? new Date() > expiryDate : true;
    }, [inviteExpired, expiryDate]);

    useEffect(() => {
        let rafId = null;

        function onScroll() {
            if (rafId !== null) {
                return;
            }

            rafId = window.requestAnimationFrame(() => {
                setScrollY(window.scrollY || 0);
                rafId = null;
            });
        }

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, []);

    const parallaxShift = Math.min(scrollY * 0.14, 56);
    const mapLink = `https://maps.google.com/?q=${encodeURIComponent(experience.location)}`;

    return (
        <div className="editorial-shell editorial-copy min-h-screen bg-[#050b17] text-[#e8eefc]">
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="ambient-motion absolute -left-16 top-12 h-72 w-72 rounded-full bg-[#334e86]/35 blur-[92px]" />
                <div className="ambient-motion absolute right-[-80px] top-[18%] h-[420px] w-[420px] rounded-full bg-[#2b6ca3]/28 blur-[120px]" />
                <div className="ambient-motion absolute bottom-[-80px] left-1/3 h-80 w-80 rounded-full bg-[#394f9b]/24 blur-[110px]" />
            </div>

            <main className="relative z-10 pb-24">
                <RevealSection className="px-4 pt-6 sm:px-6 sm:pt-10">
                    <div className="mx-auto max-w-6xl overflow-hidden rounded-[34px] border border-[#25324d]/70 bg-[rgba(10,17,34,0.74)] shadow-[0_38px_88px_-54px_rgba(2,8,24,0.96)] backdrop-blur-xl">
                        <div className="relative h-[62vh] min-h-[420px] overflow-hidden sm:h-[74vh]">
                            <img
                                src={experience.cover}
                                alt={invitation.title}
                                className="h-full w-full object-cover"
                                style={{ transform: `translate3d(0, ${parallaxShift * -1}px, 0) scale(1.08)` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-[#050b17]/18 via-[#050b17]/48 to-[#050b17]/92" />
                            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-7">
                                <img src={logoAyoyokTransparent} alt="AyoYok" className="h-9 w-auto sm:h-10" />
                                <span className="rounded-full border border-[#30415f]/70 bg-[#101a30]/72 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#b3c1db]">
                                    {experience.eventType} invitation
                                </span>
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-12">
                                <p className="text-sm text-[#b6c5df]">{new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(invitation.date))}</p>
                                <h1 className="editorial-display mt-3 max-w-4xl text-[34px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[66px]">
                                    {invitation.title}
                                </h1>
                                <p className="mt-4 text-base text-[#d2dcef] sm:text-lg">{experience.location}</p>
                                <div className="mt-8 flex flex-wrap items-center gap-3">
                                    <span className="rounded-full border border-[#30415f]/70 bg-[#101a30]/78 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#9fb0ff]">
                                        Hello, {experience.greetingName}
                                    </span>
                                    {experience.sentTo ? (
                                        <span className="rounded-full border border-[#30415f]/70 bg-[#101a30]/78 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#b6c5df]">
                                            sent to {experience.sentTo}
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealSection>

                <div className="mx-auto mt-8 max-w-6xl space-y-6 px-4 sm:mt-10 sm:space-y-8 sm:px-6">
                    {statusMessage ? (
                        <RevealSection>
                            <article className="rounded-2xl border border-[#475577]/70 bg-[rgba(17,28,47,0.82)] px-4 py-3 text-sm text-[#d8e2f5] shadow-[0_16px_40px_-26px_rgba(2,8,24,0.96)] backdrop-blur-md">
                                {statusMessage}
                            </article>
                        </RevealSection>
                    ) : null}

                    <RevealSection>
                        <article className="rounded-[30px] border border-[#25324d]/70 bg-[rgba(12,20,36,0.74)] p-6 shadow-[0_26px_72px_-46px_rgba(2,8,24,0.96)] backdrop-blur-xl sm:p-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8e9cb6]">Welcome</p>
                            <h2 className="editorial-display mt-3 text-3xl font-semibold text-white sm:text-4xl">{experience.welcomeLine}</h2>
                            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#b8c6de] sm:text-base">{invitation.message}</p>
                        </article>
                    </RevealSection>

                    <RevealSection>
                        <article className="grid gap-4 rounded-[30px] border border-[#25324d]/70 bg-[rgba(12,20,36,0.74)] p-6 shadow-[0_26px_72px_-46px_rgba(2,8,24,0.96)] backdrop-blur-xl sm:p-8 lg:grid-cols-2">
                            <div className="rounded-[24px] bg-[#101a30]/72 p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8e9cb6]">Event Story</p>
                                <p className="mt-4 text-sm leading-8 text-[#d0daed] sm:text-base">{experience.description}</p>
                            </div>
                            <div className="rounded-[24px] bg-[#101a30]/72 p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8e9cb6]">Hosted by</p>
                                <p className="mt-4 text-lg font-semibold text-white">{invitation.host}</p>
                                <p className="mt-4 text-sm leading-7 text-[#b8c6de]">A refined invitation flow that transitions each section progressively as you scroll.</p>
                            </div>
                        </article>
                    </RevealSection>

                    <RevealSection>
                        <article className="rounded-[30px] border border-[#25324d]/70 bg-[rgba(12,20,36,0.74)] p-6 shadow-[0_26px_72px_-46px_rgba(2,8,24,0.96)] backdrop-blur-xl sm:p-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8e9cb6]">Schedule</p>
                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                {experience.itinerary.map((item, index) => (
                                    <div key={`${item}-${index}`} className="rounded-[22px] border border-[#2a3855]/60 bg-[#101a30]/75 px-4 py-4">
                                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8ea2ff]">Step {index + 1}</p>
                                        <p className="mt-2 text-sm font-medium text-[#dde4f5]">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </article>
                    </RevealSection>

                    <RevealSection>
                        <article className="grid gap-4 rounded-[30px] border border-[#25324d]/70 bg-[rgba(12,20,36,0.74)] p-6 shadow-[0_26px_72px_-46px_rgba(2,8,24,0.96)] backdrop-blur-xl sm:p-8 lg:grid-cols-2">
                            <div className="rounded-[24px] bg-[#101a30]/72 p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8e9cb6]">Dress code</p>
                                <p className="mt-4 text-base font-medium text-white">{experience.dress}</p>
                            </div>
                            <div className="rounded-[24px] bg-[#101a30]/72 p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8e9cb6]">Location</p>
                                <p className="mt-4 text-base font-medium text-white">{experience.location}</p>
                                <a href={mapLink} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#9fb0ff] hover:text-white">
                                    Open map
                                    <MaterialIcon name="arrow_outward" className="text-[16px]" />
                                </a>
                            </div>
                        </article>
                    </RevealSection>

                    <RevealSection>
                        <article className="rounded-[30px] border border-[#25324d]/70 bg-[rgba(12,20,36,0.74)] p-6 shadow-[0_26px_72px_-46px_rgba(2,8,24,0.96)] backdrop-blur-xl sm:p-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8e9cb6]">Gallery</p>
                            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {experience.gallery.slice(0, 6).map((asset, index) => (
                                    <div key={`${asset}-${index}`} className="overflow-hidden rounded-[22px] border border-[#2a3855]/60 bg-[#101a30]/68">
                                        <img src={asset} alt={`Gallery ${index + 1}`} loading="lazy" className="h-56 w-full object-cover transition duration-700 hover:scale-105" />
                                    </div>
                                ))}
                            </div>
                        </article>
                    </RevealSection>

                    <RevealSection>
                        <article className="rounded-[30px] border border-[#25324d]/70 bg-[rgba(12,20,36,0.74)] p-6 shadow-[0_26px_72px_-46px_rgba(2,8,24,0.96)] backdrop-blur-xl sm:p-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8e9cb6]">RSVP</p>
                            <h3 className="editorial-display mt-3 text-3xl font-semibold text-white sm:text-4xl">Confirm your presence</h3>
                            <p className="mt-3 max-w-2xl text-sm leading-8 text-[#b8c6de]">This invite is private and expires in 24 hours. Respond with one action only: Accept or No.</p>
                            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#8ea2ff]">
                                {expiryDate ? `Expires ${new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(expiryDate)}` : 'Expiry unavailable'}
                            </p>

                            {isInviteExpired ? (
                                <div className="mt-6 rounded-2xl border border-[#5b4368]/70 bg-[#2a1e3a]/50 px-4 py-4 text-sm font-medium text-[#e2d9f7]">
                                    Invitation expired. This invite is no longer accepting responses.
                                </div>
                            ) : (
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <form method="POST" action={`/invite/${encodeURIComponent(token)}/respond`}>
                                        <input type="hidden" name="_token" value={csrfToken} />
                                        <input type="hidden" name="decision" value="accept" />
                                        <input type="hidden" name="exp" value={expiresAt || ''} />
                                        <input type="hidden" name="theme" value={theme || ''} />
                                        <input type="hidden" name="to" value={(experience.sentTo || '').replace(/^@/, '')} />
                                        <input type="hidden" name="recipient" value={experience.greetingName || ''} />
                                        <button
                                            type="submit"
                                            className="inline-flex items-center gap-2 rounded-full bg-[#8ea2ff] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(142,162,255,0.85)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
                                        >
                                            Accept
                                            <MaterialIcon name="arrow_forward" className="text-[18px]" />
                                        </button>
                                    </form>

                                    <form method="POST" action={`/invite/${encodeURIComponent(token)}/respond`}>
                                        <input type="hidden" name="_token" value={csrfToken} />
                                        <input type="hidden" name="decision" value="decline" />
                                        <input type="hidden" name="exp" value={expiresAt || ''} />
                                        <input type="hidden" name="theme" value={theme || ''} />
                                        <input type="hidden" name="to" value={(experience.sentTo || '').replace(/^@/, '')} />
                                        <input type="hidden" name="recipient" value={experience.greetingName || ''} />
                                        <button
                                            type="submit"
                                            className="inline-flex items-center gap-2 rounded-full border border-[#2a3855]/80 bg-[#101a30]/75 px-6 py-3 text-sm font-semibold text-[#c6d1e6] transition duration-300 hover:-translate-y-0.5 hover:bg-[#16253f]"
                                        >
                                            No
                                        </button>
                                    </form>
                                </div>
                            )}
                        </article>
                    </RevealSection>

                    <RevealSection>
                        <article className="rounded-[30px] border border-[#25324d]/70 bg-[rgba(12,20,36,0.74)] p-6 text-center shadow-[0_26px_72px_-46px_rgba(2,8,24,0.96)] backdrop-blur-xl sm:p-10">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8e9cb6]">Closing note</p>
                            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-[#d2dcef]">{experience.closing}</p>
                        </article>
                    </RevealSection>
                </div>
            </main>
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
                viewerName={mountNode.dataset.viewerName || 'Guest Viewer'}
                recipientName={mountNode.dataset.recipientName || ''}
                recipientHandle={mountNode.dataset.recipientHandle || ''}
                expiresAt={mountNode.dataset.expiresAt || ''}
                inviteExpired={mountNode.dataset.inviteExpired === 'true'}
                statusMessage={mountNode.dataset.statusMessage || ''}
            />
        </StrictMode>,
    );
}
