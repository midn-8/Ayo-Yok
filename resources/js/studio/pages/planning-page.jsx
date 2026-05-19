import * as React from 'react';

import { billingHistory, subscriptionTiers } from '../mock-data';
import { createStudioId, parseRecipientList, useStudioWorkspace } from '../workspace-store';
import { Money, StudioEmptyState, StudioNotice, StudioPill, StudioSectionHeader, StudioSurface } from '../primitives';
import { StudioShell } from '../studio-shell';

const DEFAULT_INVITATION_FORM = {
    invitationTitle: 'The Grand Evening Invitation',
    openingLine: 'Together with our partners, we invite you to an exclusive celebration night.',
    hostLine: 'Hosted by AyoYok Originals',
    eventDate: '2026-08-02',
    eventTime: '18:30',
    venue: 'The Glass House, Jakarta',
    dressCode: 'Black Tie / Evening Elegant',
    timeline: '18:30 Welcome, 19:15 Main Showcase, 20:30 Gala Networking',
    rsvpDeadline: '2026-07-28',
    personalMessage: 'Your presence is requested for a private guest-list experience.',
    accessCode: 'VIP-NIGHT-2026',
    recipients: '@naya.mov, @rakawj, partner@email.com',
};

function normalizePlan(plan = {}) {
    return {
        currentTier: plan.currentTier || 'Starter',
        exclusiveAccess: Boolean(plan.exclusiveAccess),
        paidTiers: Array.isArray(plan.paidTiers) && plan.paidTiers.length > 0 ? plan.paidTiers : ['Starter'],
    };
}

export function StudioPlanningPage() {
    const [workspace, updateWorkspace] = useStudioWorkspace();
    const [showManager, setShowManager] = React.useState(false);
    const [statusNotice, setStatusNotice] = React.useState({ id: 0, text: '' });
    const [showPaymentModal, setShowPaymentModal] = React.useState(false);
    const [paymentTier, setPaymentTier] = React.useState('');
    const [invitationForm, setInvitationForm] = React.useState(DEFAULT_INVITATION_FORM);

    const plan = normalizePlan(workspace.plan);
    const currentTier = plan.currentTier;
    const exclusiveAccess = plan.exclusiveAccess;
    const paidTiers = plan.paidTiers;
    const invitationDrafts = workspace.invitationDrafts || [];

    function updatePlan(partial) {
        updateWorkspace((current) => ({
            ...current,
            plan: {
                ...normalizePlan(current.plan),
                ...partial,
            },
        }));
    }

    function requestTierChange(targetTier) {
        if (targetTier === 'Starter' || paidTiers.includes(targetTier)) {
            updatePlan({ currentTier: targetTier });
            setStatusNotice({ id: Date.now(), text: `Active tier switched to ${targetTier}.` });
            return;
        }

        setPaymentTier(targetTier);
        setShowPaymentModal(true);
    }

    function continueTierPayment() {
        const nextPaid = Array.from(new Set([...paidTiers, paymentTier]));

        updatePlan({
            currentTier: paymentTier,
            paidTiers: nextPaid,
        });

        setShowPaymentModal(false);
        setStatusNotice({ id: Date.now(), text: `${paymentTier} plan payment completed. Access unlocked.` });
    }

    function saveInvitationDraft() {
        const payload = {
            id: createStudioId('inv'),
            ...invitationForm,
            recipients: parseRecipientList(invitationForm.recipients),
            status: 'Draft',
            updatedAt: new Date().toISOString(),
        };

        updateWorkspace((current) => ({
            ...current,
            invitationDrafts: [payload, ...current.invitationDrafts].slice(0, 30),
        }));

        setStatusNotice({ id: Date.now(), text: 'Digital invitation draft saved.' });
    }

    function sendInvitations() {
        const payload = {
            id: createStudioId('inv'),
            ...invitationForm,
            recipients: parseRecipientList(invitationForm.recipients),
            status: 'Sent',
            updatedAt: new Date().toISOString(),
        };

        updateWorkspace((current) => ({
            ...current,
            invitationDrafts: [payload, ...current.invitationDrafts].slice(0, 30),
        }));

        setStatusNotice({ id: Date.now(), text: `Invitation sent to ${payload.recipients.length} special recipients.` });
    }

    return (
        <>
            {showPaymentModal ? (
                <div className="fixed inset-0 z-[160] flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-lg rounded-3xl border border-white/15 bg-slate-950 p-6 shadow-[0_40px_120px_-45px_rgba(56,189,248,0.45)]">
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Plan Payment</p>
                        <h3 className="mt-2 text-2xl font-bold text-white">Continue Payment for {paymentTier}</h3>
                        <p className="mt-3 text-sm text-slate-300">
                            {paymentTier === 'Enterprise'
                                ? 'Enterprise is custom-priced. Continue to register payment intent and unlock access.'
                                : 'Scale requires payment confirmation before this plan can be accessed.'}
                        </p>
                        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-200">
                            Payment gateway will continue to checkout flow and activate this plan after confirmation.
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => setShowPaymentModal(false)}
                                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={continueTierPayment}
                                className="rounded-full border border-emerald-300/35 bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-100"
                            >
                                Continue Paying
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            <StudioShell
                active="planning"
                title="Planning & Subscription"
                description="Choose the right plan, manage billing history, and unlock premium collaboration and integration tooling."
                actions={
                    <button
                        type="button"
                        onClick={() => setShowManager((current) => !current)}
                        className="rounded-full border border-violet-300/35 bg-violet-400/15 px-4 py-2 text-sm font-semibold text-violet-100 transition hover:bg-violet-400/30"
                    >
                        Manage Plan
                    </button>
                }
            >
                {showManager ? (
                    <section>
                        <StudioSurface>
                            <StudioSectionHeader title="Plan Manager" description="Adjust active tier and exclusive invitation capability." />
                            <div className="mt-4 grid gap-3 md:grid-cols-3">
                                <label className="grid gap-2 text-sm md:col-span-2">
                                    <span className="font-semibold text-slate-200">Target Tier</span>
                                    <select
                                        value={currentTier}
                                        onChange={(event) => requestTierChange(event.target.value)}
                                        className="h-10 rounded-xl border border-white/15 bg-[#0f172a] px-3 text-slate-100"
                                    >
                                        <option>Starter</option>
                                        <option>Scale</option>
                                        <option>Enterprise</option>
                                    </select>
                                </label>
                                <label className="grid gap-2 text-sm">
                                    <span className="font-semibold text-slate-200">Exclusive Mode</span>
                                    <button
                                        type="button"
                                        onClick={() => updatePlan({ exclusiveAccess: !exclusiveAccess })}
                                        disabled={currentTier === 'Starter'}
                                        className={`h-10 rounded-xl border px-3 text-sm font-semibold transition ${
                                            currentTier === 'Starter'
                                                ? 'cursor-not-allowed border-slate-300/15 bg-slate-700/20 text-slate-500'
                                                : exclusiveAccess
                                                  ? 'border-emerald-300/35 bg-emerald-400/15 text-emerald-100'
                                                  : 'border-slate-300/25 bg-slate-700/40 text-slate-200'
                                        }`}
                                    >
                                        {exclusiveAccess ? 'Exclusive: Yes' : 'Exclusive: No'}
                                    </button>
                                </label>
                            </div>
                            <p className="mt-3 text-xs text-slate-400">Scale and Enterprise require payment confirmation popup before access is enabled.</p>
                        </StudioSurface>
                    </section>
                ) : null}

                <StudioNotice key={statusNotice.id} message={statusNotice.text} />

                <section className="grid gap-4 xl:grid-cols-3">
                    {subscriptionTiers.map((tier) => {
                        const isCurrent = tier.name === currentTier;
                        const isPaid = paidTiers.includes(tier.name);
                        const requiresPayment = tier.name !== 'Starter' && !isPaid;

                        return (
                            <StudioSurface key={tier.name} className={isCurrent ? 'border-sky-300/30 bg-gradient-to-b from-sky-500/10 to-transparent' : ''}>
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">{tier.name}</p>
                                    {isCurrent ? <StudioPill label="Current" tone="sky" /> : <StudioPill label={isPaid ? 'Paid' : 'Locked'} tone={isPaid ? 'emerald' : 'amber'} />}
                                </div>
                                <p className="mt-4 text-2xl font-bold text-white">{tier.price}</p>
                                <p className="mt-2 text-sm text-slate-300">{tier.blurb}</p>
                                <ul className="mt-5 space-y-2 text-sm text-slate-200">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    type="button"
                                    onClick={() => requestTierChange(tier.name)}
                                    className="mt-4 w-full rounded-xl border border-white/20 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-slate-100"
                                >
                                    {requiresPayment ? 'Continue Paying' : isCurrent ? 'Active' : 'Switch to this Plan'}
                                </button>
                            </StudioSurface>
                        );
                    })}
                </section>

                <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                    <StudioSurface>
                        <StudioSectionHeader title="Billing History" description="Subscription and add-on charges for your workspace." />
                        <div className="mt-5 overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em] text-slate-400">
                                        <th className="px-3 py-3 font-semibold">Invoice</th>
                                        <th className="px-3 py-3 font-semibold">Item</th>
                                        <th className="px-3 py-3 font-semibold">Amount</th>
                                        <th className="px-3 py-3 font-semibold">Status</th>
                                        <th className="px-3 py-3 font-semibold">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {billingHistory.map((bill) => (
                                        <tr key={bill.id} className="border-b border-white/5 text-slate-200">
                                            <td className="px-3 py-4 font-medium text-white">{bill.id}</td>
                                            <td className="px-3 py-4 text-slate-300">{bill.item}</td>
                                            <td className="px-3 py-4"><Money value={bill.amount} /></td>
                                            <td className="px-3 py-4"><StudioPill label={bill.status} tone="emerald" /></td>
                                            <td className="px-3 py-4 text-slate-300">{bill.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </StudioSurface>

                    <StudioSurface>
                        <StudioSectionHeader title="Premium Workspace Tools" />
                        {currentTier === 'Starter' ? (
                            <StudioEmptyState
                                title="Premium Tools Locked"
                                description="Upgrade and complete payment for Scale or Enterprise to access advanced collaboration and integrations."
                            />
                        ) : (
                            <>
                                <div className="mt-4 space-y-3">
                                    {[
                                        'Advanced role-based collaboration',
                                        'UTM and ad-channel attribution mapping',
                                        'Webhook integrations to CRM and payment tools',
                                        'A/B testing for event landing pages',
                                    ].map((feature) => (
                                        <div key={feature} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200">
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <StudioEmptyState
                                        title="No Integrations Connected Yet"
                                        description="Connect your CRM, analytics, or automation stack to activate deeper attribution and lifecycle workflows."
                                        action={
                                            <button
                                                type="button"
                                                className="rounded-full border border-sky-300/35 bg-sky-400/15 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:bg-sky-400/30"
                                            >
                                                Connect Integration
                                            </button>
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </StudioSurface>
                </section>

                {exclusiveAccess && currentTier !== 'Starter' ? (
                    <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                        <StudioSurface>
                            <StudioSectionHeader
                                title="Exclusive Digital Invitation Builder"
                                description="Wedding-style detailed invitation draft for selected users and private event access."
                            />
                            <form className="mt-5 grid gap-3" onSubmit={(event) => event.preventDefault()}>
                                <input
                                    value={invitationForm.invitationTitle}
                                    onChange={(event) => setInvitationForm((current) => ({ ...current, invitationTitle: event.target.value }))}
                                    className="h-10 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-slate-100"
                                    placeholder="Invitation title"
                                />
                                <textarea
                                    rows={2}
                                    value={invitationForm.openingLine}
                                    onChange={(event) => setInvitationForm((current) => ({ ...current, openingLine: event.target.value }))}
                                    className="rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-slate-100"
                                    placeholder="Opening line"
                                />
                                <input
                                    value={invitationForm.hostLine}
                                    onChange={(event) => setInvitationForm((current) => ({ ...current, hostLine: event.target.value }))}
                                    className="h-10 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-slate-100"
                                    placeholder="Host line"
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="date"
                                        value={invitationForm.eventDate}
                                        onChange={(event) => setInvitationForm((current) => ({ ...current, eventDate: event.target.value }))}
                                        className="h-10 rounded-xl border border-white/15 bg-[#0f172a] px-3 text-sm text-slate-100"
                                    />
                                    <input
                                        type="time"
                                        value={invitationForm.eventTime}
                                        onChange={(event) => setInvitationForm((current) => ({ ...current, eventTime: event.target.value }))}
                                        className="h-10 rounded-xl border border-white/15 bg-[#0f172a] px-3 text-sm text-slate-100"
                                    />
                                </div>
                                <input
                                    value={invitationForm.venue}
                                    onChange={(event) => setInvitationForm((current) => ({ ...current, venue: event.target.value }))}
                                    className="h-10 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-slate-100"
                                    placeholder="Venue"
                                />
                                <input
                                    value={invitationForm.timeline}
                                    onChange={(event) => setInvitationForm((current) => ({ ...current, timeline: event.target.value }))}
                                    className="h-10 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-slate-100"
                                    placeholder="Timeline"
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        value={invitationForm.dressCode}
                                        onChange={(event) => setInvitationForm((current) => ({ ...current, dressCode: event.target.value }))}
                                        className="h-10 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-slate-100"
                                        placeholder="Dress code"
                                    />
                                    <input
                                        type="date"
                                        value={invitationForm.rsvpDeadline}
                                        onChange={(event) => setInvitationForm((current) => ({ ...current, rsvpDeadline: event.target.value }))}
                                        className="h-10 rounded-xl border border-white/15 bg-[#0f172a] px-3 text-sm text-slate-100"
                                    />
                                </div>
                                <textarea
                                    rows={2}
                                    value={invitationForm.personalMessage}
                                    onChange={(event) => setInvitationForm((current) => ({ ...current, personalMessage: event.target.value }))}
                                    className="rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-slate-100"
                                    placeholder="Personal note"
                                />
                                <input
                                    value={invitationForm.accessCode}
                                    onChange={(event) => setInvitationForm((current) => ({ ...current, accessCode: event.target.value }))}
                                    className="h-10 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-slate-100"
                                    placeholder="Access code"
                                />
                                <textarea
                                    rows={3}
                                    value={invitationForm.recipients}
                                    onChange={(event) => setInvitationForm((current) => ({ ...current, recipients: event.target.value }))}
                                    className="rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-slate-100"
                                    placeholder="Special users (comma/newline separated handles/emails)"
                                />
                            </form>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={saveInvitationDraft}
                                    className="rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-slate-100"
                                >
                                    Save Invitation Draft
                                </button>
                                <button
                                    type="button"
                                    onClick={sendInvitations}
                                    className="rounded-full border border-emerald-300/35 bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-100"
                                >
                                    Send to Special Users
                                </button>
                            </div>
                        </StudioSurface>

                        <StudioSurface>
                            <StudioSectionHeader title="Invitation Drafts" description="Saved and sent exclusive invitation objects." />
                            <div className="mt-4 space-y-3">
                                {invitationDrafts.length === 0 ? (
                                    <p className="text-sm text-slate-400">No invitation draft yet.</p>
                                ) : (
                                    invitationDrafts.slice(0, 6).map((draft) => (
                                        <div key={draft.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-sm font-semibold text-white">{draft.invitationTitle}</p>
                                                <StudioPill label={draft.status} tone={draft.status === 'Sent' ? 'emerald' : 'amber'} />
                                            </div>
                                            <p className="mt-1 text-xs text-slate-400">{draft.eventDate} • {draft.venue}</p>
                                            <p className="mt-2 text-sm text-slate-200">Recipients: {draft.recipients.length}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </StudioSurface>
                    </section>
                ) : (
                    <section>
                        <StudioSurface>
                            <StudioEmptyState
                                title="Exclusive Invitation Builder Locked"
                                description="Set Exclusive Mode to Yes on a paid Scale/Enterprise plan to create and send detailed digital invitations."
                            />
                        </StudioSurface>
                    </section>
                )}
            </StudioShell>
        </>
    );
}
