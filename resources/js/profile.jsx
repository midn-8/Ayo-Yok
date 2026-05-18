import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

import {
    BASE_DATE,
    EVENTS,
    MESSAGE_THREADS,
    PRIVATE_EVENT_LIMITS,
    USER_EVENT_BADGES,
    USER_REVIEW_POSTS,
    USER_STORIES,
    canReviewEvent,
    compareEventDates,
    getJoinedEvents,
    getRecommendedEvents,
    getUserRank,
    makeAvatarImage,
} from './social-hub/mockData';
import {
    classNames,
    CompactEventItem,
    EmptyState,
    EventCard,
    FloatingCreateButton,
    formatEventDate,
    formatShortDate,
    Icon,
    SectionHeading,
    StatCard,
    TopNavigation,
} from './social-hub/ui';

const { StrictMode, useMemo, useState } = React;

function TabButton({ label, active, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={classNames(
                'rounded-full px-4 py-2 text-sm font-semibold transition',
                active ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/15' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
            )}
        >
            {label}
        </button>
    );
}

function ReviewCard({ review, userName }) {
    const event = EVENTS.find((item) => item.id === review.eventId);

    if (!event) {
        return null;
    }

    return (
        <article className="panel overflow-hidden">
            <img src={event.image} alt={event.title} className="h-56 w-full object-cover" />
            <div className="space-y-4 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="font-semibold text-slate-950">{userName}</p>
                        <p className="text-sm text-slate-500">{formatShortDate(review.createdAt)}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{event.title}</span>
                </div>

                <p className="text-sm leading-7 text-slate-700">{review.caption}</p>

                <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 font-semibold text-slate-700">
                        <Icon name="heart" className="h-4 w-4" />
                        {review.likes}
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 font-semibold text-slate-700">
                        <Icon name="comment" className="h-4 w-4" />
                        {review.comments}
                    </div>
                </div>
            </div>
        </article>
    );
}

function StoryPill({ story, eventTitle }) {
    return (
        <div className="flex flex-col items-center gap-3">
            <div className={classNames('flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white shadow-lg shadow-slate-950/15', story.accent)}>
                {story.label.slice(0, 2).toUpperCase()}
            </div>
            <div className="text-center">
                <p className="text-sm font-semibold text-slate-950">{story.label}</p>
                <p className="text-xs text-slate-500">{eventTitle}</p>
            </div>
        </div>
    );
}

function MessageBubble({ message }) {
    const isSelf = message.sender === 'self';

    return (
        <div className={classNames('flex', isSelf ? 'justify-end' : 'justify-start')}>
            <div
                className={classNames(
                    'max-w-[85%] rounded-[24px] px-4 py-3 text-sm leading-6',
                    isSelf ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-700',
                )}
            >
                <p>{message.text}</p>
                <p className={classNames('mt-2 text-[11px] font-semibold uppercase tracking-[0.22em]', isSelf ? 'text-slate-300' : 'text-slate-400')}>
                    {message.time}
                </p>
            </div>
        </div>
    );
}

function SettingsBlock({ title, description, children }) {
    return (
        <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <h3 className="dashboard-display text-xl font-bold text-slate-950">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            <div className="mt-5 space-y-4">{children}</div>
        </section>
    );
}

function ProfilePage({ initialProfile }) {
    const [profile, setProfile] = useState(initialProfile);
    const [draftProfile, setDraftProfile] = useState(initialProfile);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('Reviews');
    const [flashMessage, setFlashMessage] = useState('');
    const [reviewPosts, setReviewPosts] = useState(USER_REVIEW_POSTS);
    const [reviewCaption, setReviewCaption] = useState('');
    const [reviewEventId, setReviewEventId] = useState(getJoinedEvents().find(canReviewEvent)?.id || '');
    const [storyHighlights, setStoryHighlights] = useState(USER_STORIES);
    const [uploadedStoryName, setUploadedStoryName] = useState('');
    const [threads, setThreads] = useState(MESSAGE_THREADS);
    const [selectedThreadId, setSelectedThreadId] = useState(MESSAGE_THREADS[0]?.id || '');
    const [messageDraft, setMessageDraft] = useState('');
    const [paymentPreference, setPaymentPreference] = useState('E-Wallet');

    const joinedEvents = useMemo(() => getJoinedEvents().slice().sort(compareEventDates), []);
    const upcomingEvents = joinedEvents.filter((event) => new Date(event.date) >= BASE_DATE);
    const pastEvents = joinedEvents.filter((event) => new Date(event.date) < BASE_DATE);
    const reviewableEvents = joinedEvents.filter(canReviewEvent);
    const savedIdeas = getRecommendedEvents().slice(0, 4);
    const selectedThread = threads.find((thread) => thread.id === selectedThreadId) || threads[0];
    const followers = 1248;
    const following = 318;
    const socialActivity = reviewPosts.length * 4 + USER_EVENT_BADGES.length * 2 + threads.length;
    const profileRank = getUserRank(joinedEvents.length, socialActivity);
    const query = searchTerm.trim().toLowerCase();

    const visibleReviewPosts = reviewPosts.filter((review) => {
        const event = EVENTS.find((item) => item.id === review.eventId);
        const haystack = [review.caption, event?.title || ''].join(' ').toLowerCase();
        return query === '' || haystack.includes(query);
    });

    const visibleEvents = joinedEvents.filter((event) => {
        return query === '' || [event.title, event.location, event.category].some((value) => value.toLowerCase().includes(query));
    });

    const visibleThreads = threads.filter((thread) => {
        return query === '' || [thread.userName, thread.handle, thread.lastMessage].some((value) => value.toLowerCase().includes(query));
    });

    function handleSaveProfile(event) {
        event.preventDefault();
        setProfile(draftProfile);
        setFlashMessage('Profile settings updated locally for this demo session.');
    }

    function handlePostReview(event) {
        event.preventDefault();

        if (!reviewEventId || reviewCaption.trim() === '') {
            return;
        }

        setReviewPosts((currentReviews) => [
            {
                id: `review-${currentReviews.length + 1}`,
                eventId: reviewEventId,
                caption: reviewCaption.trim(),
                likes: 0,
                comments: 0,
                createdAt: BASE_DATE.toISOString(),
            },
            ...currentReviews,
        ]);
        setReviewCaption('');
        setFlashMessage('Your event review was posted to the local profile feed.');
        setActiveTab('Reviews');
    }

    function handleStoryUpload(fileName) {
        if (!fileName) {
            return;
        }

        const event = upcomingEvents[0] || joinedEvents[0];

        setStoryHighlights((currentStories) => [
            {
                id: `story-${currentStories.length + 1}`,
                label: fileName.slice(0, 12),
                eventId: event?.id || joinedEvents[0]?.id,
                accent: 'from-sky-500 to-fuchsia-500',
            },
            ...currentStories,
        ]);
        setUploadedStoryName(fileName);
        setFlashMessage('Story upload UI captured the selected file for this demo session.');
    }

    function handleSendMessage(event) {
        event.preventDefault();

        if (!selectedThread || messageDraft.trim() === '') {
            return;
        }

        setThreads((currentThreads) =>
            currentThreads.map((thread) =>
                thread.id === selectedThread.id
                    ? {
                          ...thread,
                          unread: 0,
                          lastMessage: messageDraft.trim(),
                          messages: [
                              ...thread.messages,
                              {
                                  id: `message-${thread.messages.length + 1}`,
                                  sender: 'self',
                                  text: messageDraft.trim(),
                                  time: new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(BASE_DATE),
                              },
                          ],
                      }
                    : thread,
            ),
        );
        setMessageDraft('');
    }

    const tabs = ['Reviews', 'Events', 'Messages', 'Settings'];

    return (
        <div className="dashboard-shell min-h-screen">
            <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 sm:py-6">
                <TopNavigation
                    userName={profile.name}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    activePath="profile"
                    searchPlaceholder="Search your reviews, inbox, or event archive"
                />

                {flashMessage ? (
                    <div className="mt-4 flex items-center justify-between gap-4 rounded-[24px] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
                        <span>{flashMessage}</span>
                        <button type="button" onClick={() => setFlashMessage('')} className="text-emerald-700 transition hover:text-emerald-900">
                            Dismiss
                        </button>
                    </div>
                ) : null}

                <main className="mt-6 space-y-6">
                    <section className="panel-dark relative overflow-hidden p-6 sm:p-8">
                        <div className="absolute inset-0 panel-grid opacity-10" />
                        <div className="absolute -left-12 top-8 h-36 w-36 rounded-full bg-orange-400/18 blur-3xl" />
                        <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-fuchsia-400/14 blur-3xl" />

                        <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                                <img
                                    src={makeAvatarImage(profile.name)}
                                    alt={profile.name}
                                    className="h-28 w-28 rounded-[32px] border border-white/15 object-cover shadow-lg shadow-slate-950/25"
                                />

                                <div className="max-w-2xl">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                                            Social profile
                                        </span>
                                        <span className="rounded-full bg-fuchsia-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-fuchsia-100">
                                            {profile.username}
                                        </span>
                                        <span className="rounded-full bg-amber-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">
                                            {profileRank}
                                        </span>
                                    </div>
                                    <h1 className="dashboard-display mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">{profile.name}</h1>
                                    <p className="mt-3 text-base font-medium text-slate-200">{profile.email}</p>
                                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{profile.bio}</p>

                                    <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-200">
                                        <div>
                                            <p className="text-slate-400">Followers</p>
                                            <p className="mt-1 font-semibold text-white">{followers.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-400">Following</p>
                                            <p className="mt-1 font-semibold text-white">{following.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-400">Social activity</p>
                                            <p className="mt-1 font-semibold text-white">{socialActivity}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid w-full gap-3 sm:grid-cols-2 xl:w-[340px] xl:grid-cols-1">
                                <div className="rounded-[24px] bg-white/8 px-4 py-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Plan</p>
                                    <p className="mt-2 text-sm font-semibold text-white">{profile.plan} member</p>
                                    <p className="mt-1 text-sm text-slate-300">{PRIVATE_EVENT_LIMITS.remainingPrivateEventsThisMonth} private event slot left this month.</p>
                                </div>
                                <div className="rounded-[24px] bg-white/8 px-4 py-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Next event</p>
                                    <p className="mt-2 text-sm font-semibold text-white">{upcomingEvents[0]?.title || 'No upcoming tickets'}</p>
                                    <p className="mt-1 text-sm text-slate-300">{upcomingEvents[0] ? formatShortDate(upcomingEvents[0].date) : 'Add something new'}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-4 md:grid-cols-4">
                        <StatCard label="Events Joined" value={joinedEvents.length} note="Your social footprint across public events." />
                        <StatCard label="Reviews Posted" value={reviewPosts.length} note="Only joined events that already started can be reviewed." />
                        <StatCard label="Inbox Threads" value={threads.length} note="Direct messages and private invitation touchpoints." />
                        <StatCard label="Rank" value={profileRank} note="Calculated from joined events and visible social activity." />
                    </section>

                    <section className="panel p-6 sm:p-7">
                        <SectionHeading
                            eyebrow="Story highlights"
                            title="Event stories and uploads"
                            description="Instagram-style story circles for moments you want pinned to the top of your profile."
                        />

                        <div className="mt-6 flex flex-wrap gap-6">
                            <label className="flex cursor-pointer flex-col items-center gap-3">
                                <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-white text-slate-600 transition hover:border-slate-950 hover:text-slate-950">
                                    <Icon name="image" className="h-7 w-7" />
                                </span>
                                <span className="text-sm font-semibold text-slate-700">Upload story</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={(event) => handleStoryUpload(event.target.files?.[0]?.name || '')}
                                />
                            </label>

                            {storyHighlights.map((story) => {
                                const event = EVENTS.find((item) => item.id === story.eventId);

                                return <StoryPill key={story.id} story={story} eventTitle={event?.title || uploadedStoryName || 'Event story'} />;
                            })}
                        </div>
                    </section>

                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                        <section className="panel p-6 sm:p-7">
                            <SectionHeading
                                eyebrow="Profile hub"
                                title={activeTab}
                                description="Switch between review posting, event archive, inbox, and settings without leaving the profile page."
                            />

                            <div className="mt-6 flex flex-wrap gap-2">
                                {tabs.map((tab) => (
                                    <TabButton key={tab} label={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)} />
                                ))}
                            </div>

                            {activeTab === 'Reviews' ? (
                                <div className="mt-6 space-y-6">
                                    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
                                        <div className="flex items-start gap-3">
                                            <span className="mt-1 text-slate-400">
                                                <Icon name="message" className="h-5 w-5" />
                                            </span>
                                            <div>
                                                <p className="font-semibold text-slate-950">Review restriction</p>
                                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                                    Reviews can only be posted for events you joined and that are already past or currently ongoing.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <form onSubmit={handlePostReview} className="space-y-5 rounded-[28px] border border-slate-200 bg-white p-5 sm:p-6">
                                        <label className="block">
                                            <span className="text-sm font-semibold text-slate-700">Event to review</span>
                                            <select
                                                value={reviewEventId}
                                                onChange={(event) => setReviewEventId(event.target.value)}
                                                disabled={reviewableEvents.length === 0}
                                                className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100"
                                            >
                                                {reviewableEvents.length === 0 ? <option value="">No eligible events yet</option> : null}
                                                {reviewableEvents.map((event) => (
                                                    <option key={event.id} value={event.id}>
                                                        {event.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>

                                        <label className="block">
                                            <span className="text-sm font-semibold text-slate-700">Caption / review</span>
                                            <textarea
                                                rows="5"
                                                value={reviewCaption}
                                                onChange={(event) => setReviewCaption(event.target.value)}
                                                disabled={reviewableEvents.length === 0}
                                                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                                                placeholder="Drop your event review here."
                                            />
                                        </label>

                                        <button
                                            type="submit"
                                            disabled={reviewableEvents.length === 0 || reviewCaption.trim() === ''}
                                            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                                        >
                                            Post review
                                            <Icon name="send" className="h-4 w-4" />
                                        </button>
                                    </form>

                                    <div className="grid gap-4 lg:grid-cols-2">
                                        {visibleReviewPosts.length === 0 ? (
                                            <EmptyState
                                                title="No review posts match that search."
                                                description="Try another search term or publish a fresh event review from the composer."
                                            />
                                        ) : (
                                            visibleReviewPosts.map((review) => <ReviewCard key={review.id} review={review} userName={profile.name} />)
                                        )}
                                    </div>
                                </div>
                            ) : null}

                            {activeTab === 'Events' ? (
                                <div className="mt-6 space-y-6">
                                    <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
                                        Showing <span className="font-semibold text-slate-950">{visibleEvents.length}</span> joined events for{' '}
                                        <span className="font-semibold text-slate-950">{searchTerm || 'all searches'}</span>.
                                    </div>

                                    <div className="grid gap-4 lg:grid-cols-2">
                                        {visibleEvents.length === 0 ? (
                                            <EmptyState
                                                title="No events match that search."
                                                description="Switch your search or head back to Explore to add more events to your identity."
                                            />
                                        ) : (
                                            visibleEvents.map((event) => (
                                                <EventCard
                                                    key={event.id}
                                                    event={event}
                                                    joined
                                                    primaryLabel="Open schedule"
                                                    onPrimaryAction={() => {
                                                        window.location.href = '/schedule';
                                                    }}
                                                />
                                            ))
                                        )}
                                    </div>

                                    <div className="grid gap-6 lg:grid-cols-2">
                                        <div>
                                            <SectionHeading eyebrow="Upcoming" title="Next joined events" />
                                            <div className="mt-5 space-y-3">
                                                {upcomingEvents.map((event) => (
                                                    <CompactEventItem
                                                        key={event.id}
                                                        event={event}
                                                        badge={event.ticketStatus}
                                                        actionLabel={event.location}
                                                        onOpen={() => {
                                                            window.location.href = '/schedule';
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <SectionHeading eyebrow="Saved ideas" title="Recommended next" />
                                            <div className="mt-5 space-y-3">
                                                {savedIdeas.map((event) => (
                                                    <CompactEventItem
                                                        key={event.id}
                                                        event={event}
                                                        badge="Recommended"
                                                        actionLabel={event.host}
                                                        onOpen={() => {
                                                            window.location.href = `/payment/${event.id}`;
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            {activeTab === 'Messages' ? (
                                <div className="mt-6 grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
                                    <div className="space-y-3">
                                        {visibleThreads.map((thread) => (
                                            <button
                                                key={thread.id}
                                                type="button"
                                                onClick={() => setSelectedThreadId(thread.id)}
                                                className={classNames(
                                                    'w-full rounded-[24px] border px-4 py-4 text-left transition',
                                                    selectedThreadId === thread.id ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-200 bg-slate-50 hover:bg-white',
                                                )}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <img src={thread.avatar} alt={thread.userName} className="h-12 w-12 rounded-full object-cover" />
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center justify-between gap-3">
                                                            <p className="font-semibold">{thread.userName}</p>
                                                            {thread.unread > 0 ? (
                                                                <span className={classNames('rounded-full px-2 py-0.5 text-xs font-semibold', selectedThreadId === thread.id ? 'bg-white/10 text-white' : 'bg-slate-950 text-white')}>
                                                                    {thread.unread}
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <p className={classNames('mt-1 text-sm', selectedThreadId === thread.id ? 'text-slate-300' : 'text-slate-500')}>{thread.role}</p>
                                                        <p className={classNames('mt-2 line-clamp-2 text-sm', selectedThreadId === thread.id ? 'text-slate-200' : 'text-slate-600')}>{thread.lastMessage}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {selectedThread ? (
                                        <div className="rounded-[28px] border border-slate-200 bg-white p-5 sm:p-6">
                                            <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                                                <img src={selectedThread.avatar} alt={selectedThread.userName} className="h-14 w-14 rounded-full object-cover" />
                                                <div>
                                                    <p className="font-semibold text-slate-950">{selectedThread.userName}</p>
                                                    <p className="text-sm text-slate-500">{selectedThread.role}</p>
                                                </div>
                                            </div>

                                            {selectedThread.invitation ? (
                                                <div className="mt-4 rounded-[24px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                                                    Invitation status: <span className="font-semibold text-slate-950">{selectedThread.invitation.status}</span>
                                                </div>
                                            ) : null}

                                            <div className="mt-5 space-y-3">
                                                {selectedThread.messages.map((message) => (
                                                    <MessageBubble key={message.id} message={message} />
                                                ))}
                                            </div>

                                            <form onSubmit={handleSendMessage} className="mt-6 flex gap-3">
                                                <input
                                                    type="text"
                                                    value={messageDraft}
                                                    onChange={(event) => setMessageDraft(event.target.value)}
                                                    placeholder="Write a reply"
                                                    className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100"
                                                />
                                                <button
                                                    type="submit"
                                                    className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800"
                                                >
                                                    Send
                                                </button>
                                            </form>
                                        </div>
                                    ) : (
                                        <EmptyState title="No thread selected." description="Pick a conversation from the inbox list to open the chat interface." />
                                    )}
                                </div>
                            ) : null}

                            {activeTab === 'Settings' ? (
                                <div className="mt-6 space-y-6">
                                    <SettingsBlock title="Profile settings" description="Update the public identity people see around your reviews and invitations.">
                                        <form onSubmit={handleSaveProfile} className="space-y-4">
                                            <label className="block">
                                                <span className="text-sm font-semibold text-slate-700">Name</span>
                                                <input
                                                    type="text"
                                                    value={draftProfile.name}
                                                    onChange={(event) => setDraftProfile((current) => ({ ...current, name: event.target.value }))}
                                                    className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100"
                                                />
                                            </label>
                                            <label className="block">
                                                <span className="text-sm font-semibold text-slate-700">Bio</span>
                                                <textarea
                                                    rows="4"
                                                    value={draftProfile.bio}
                                                    onChange={(event) => setDraftProfile((current) => ({ ...current, bio: event.target.value }))}
                                                    className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100"
                                                />
                                            </label>
                                            <button
                                                type="submit"
                                                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800"
                                            >
                                                Save profile
                                            </button>
                                        </form>
                                    </SettingsBlock>

                                    <SettingsBlock title="Account settings" description="Dummy account-level controls that keep the auth system intact while expanding the UI.">
                                        <div className="rounded-[24px] border border-slate-200 bg-white p-4 text-sm text-slate-600">
                                            <p>
                                                Email: <span className="font-semibold text-slate-950">{profile.email}</span>
                                            </p>
                                            <p className="mt-2">
                                                Username: <span className="font-semibold text-slate-950">{profile.username}</span>
                                            </p>
                                            <p className="mt-2">
                                                Membership: <span className="font-semibold text-slate-950">{profile.plan}</span>
                                            </p>
                                        </div>
                                    </SettingsBlock>

                                    <SettingsBlock title="Payment configuration" description="A placeholder payment configuration section for future wallet and billing persistence.">
                                        <label className="block">
                                            <span className="text-sm font-semibold text-slate-700">Preferred payment method</span>
                                            <select
                                                value={paymentPreference}
                                                onChange={(event) => setPaymentPreference(event.target.value)}
                                                className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100"
                                            >
                                                <option>E-Wallet</option>
                                                <option>Virtual Account</option>
                                                <option>Credit Card</option>
                                            </select>
                                        </label>
                                        <div className="rounded-[24px] border border-slate-200 bg-white p-4 text-sm text-slate-600">
                                            Current preference: <span className="font-semibold text-slate-950">{paymentPreference}</span>
                                        </div>
                                    </SettingsBlock>
                                </div>
                            ) : null}
                        </section>

                        <aside className="space-y-6">
                            <section className="panel-dark p-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Badges and rank</p>
                                <h2 className="dashboard-display mt-3 text-2xl font-bold text-white">{profileRank}</h2>
                                <div className="mt-5 space-y-3">
                                    {USER_EVENT_BADGES.map((badge) => (
                                        <div key={badge.id} className="rounded-[24px] bg-white/6 p-4">
                                            <p className="font-semibold text-white">{badge.name}</p>
                                            <p className="mt-1 text-sm text-slate-300">{badge.note}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="panel p-6">
                                <SectionHeading eyebrow="Calendar spotlight" title={upcomingEvents[0]?.title || 'No upcoming event'} />
                                {upcomingEvents[0] ? (
                                    <div className="mt-5 space-y-4">
                                        <img src={upcomingEvents[0].image} alt={upcomingEvents[0].title} className="h-44 w-full rounded-[24px] object-cover" />
                                        <div className="rounded-[24px] bg-slate-50 p-4 text-sm text-slate-600">
                                            <p className="font-semibold text-slate-950">{formatEventDate(upcomingEvents[0].date)}</p>
                                            <p className="mt-2">{upcomingEvents[0].location}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-5">
                                        <EmptyState
                                            title="No upcoming tickets."
                                            description="Jump to Explore or Dashboard to add your next event."
                                        />
                                    </div>
                                )}
                            </section>

                            <section className="panel p-6">
                                <SectionHeading eyebrow="Past highlights" title="Reviewable history" />
                                <div className="mt-5 space-y-3">
                                    {pastEvents.map((event) => (
                                        <CompactEventItem
                                            key={event.id}
                                            event={event}
                                            badge={event.ticketStatus}
                                            actionLabel="Eligible for review"
                                            onOpen={() => {
                                                setActiveTab('Reviews');
                                                setReviewEventId(event.id);
                                            }}
                                        />
                                    ))}
                                </div>
                            </section>
                        </aside>
                    </div>
                </main>
            </div>

            <FloatingCreateButton />
        </div>
    );
}

const mountNode = document.getElementById('ayoyok-profile-root');

if (mountNode) {
    const initialProfile = {
        name: mountNode.dataset.userName || 'AyoYok User',
        username: mountNode.dataset.userUsername || '@ayoyok-user',
        email: mountNode.dataset.userEmail || 'hello@ayoyok.app',
        bio: mountNode.dataset.userBio || 'Always chasing events with good energy, better playlists, and people worth meeting.',
        plan: mountNode.dataset.userPlan || 'Free',
    };

    createRoot(mountNode).render(
        <StrictMode>
            <ProfilePage initialProfile={initialProfile} />
        </StrictMode>,
    );
}
