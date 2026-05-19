import * as React from 'react';

import { checkoutFlow, transactions } from '../mock-data';
import { createStudioId, useStudioWorkspace } from '../workspace-store';
import { Money, StudioNotice, StudioPill, StudioSectionHeader, StudioSurface } from '../primitives';
import { StudioShell } from '../studio-shell';

const DEFAULT_METHOD = {
    scope: 'gateway',
    name: 'GoPay PayLater',
    type: 'E-Wallet',
    detail: 'Fee 2.2% + Rp 1.500',
};

export function StudioPaymentConfigurationPage() {
    const [workspace, updateWorkspace] = useStudioWorkspace();
    const [showMethodForm, setShowMethodForm] = React.useState(false);
    const [methodForm, setMethodForm] = React.useState(DEFAULT_METHOD);
    const [statusNotice, setStatusNotice] = React.useState({ id: 0, text: '' });

    const payoutMethods = workspace.payoutMethods || [];
    const paymentGatewayMethods = workspace.gatewayMethods || [];

    const gross = transactions.reduce((total, item) => total + item.gross, 0);
    const fee = transactions.reduce((total, item) => total + item.fee, 0);
    const net = transactions.reduce((total, item) => total + item.net, 0);

    function addPaymentMethod() {
        const payload = {
            id: createStudioId('pay'),
            status: 'Active',
            settlement: 'T+1',
        };

        if (methodForm.scope === 'gateway') {
            updateWorkspace((current) => ({
                ...current,
                gatewayMethods: [
                    {
                        ...payload,
                        name: methodForm.name,
                        type: methodForm.type,
                        fee: methodForm.detail,
                    },
                    ...current.gatewayMethods,
                ].slice(0, 25),
            }));
        } else {
            updateWorkspace((current) => ({
                ...current,
                payoutMethods: [
                    {
                        type: methodForm.type,
                        value: `${methodForm.name} • ${methodForm.detail}`,
                        primary: current.payoutMethods.length === 0,
                    },
                    ...current.payoutMethods,
                ].slice(0, 20),
            }));
        }

        setShowMethodForm(false);
        setStatusNotice({ id: Date.now(), text: 'Payment method added to configuration.' });
    }

    return (
        <StudioShell
            active="payment"
            title="Payment Configuration"
            description="Manage payout rails, transaction visibility, and revenue summaries with finance-ready controls."
            actions={
                <button
                    type="button"
                    onClick={() => setShowMethodForm((current) => !current)}
                    className="rounded-full border border-emerald-300/35 bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/30"
                >
                    Add Payment Method
                </button>
            }
        >
            <section className="grid gap-4 xl:grid-cols-3">
                <StudioSurface>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Gross Revenue</p>
                    <p className="mt-3 text-3xl font-bold text-white"><Money value={gross} /></p>
                    <p className="mt-2 text-sm text-slate-300">All recent settlements and in-review transactions.</p>
                </StudioSurface>
                <StudioSurface>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Platform Fees</p>
                    <p className="mt-3 text-3xl font-bold text-white"><Money value={fee} /></p>
                    <p className="mt-2 text-sm text-slate-300">Includes payment processing and boost attribution fees.</p>
                </StudioSurface>
                <StudioSurface>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Net Payout</p>
                    <p className="mt-3 text-3xl font-bold text-white"><Money value={net} /></p>
                    <p className="mt-2 text-sm text-slate-300">Estimated payout in next settlement cycle.</p>
                </StudioSurface>
            </section>

            {showMethodForm ? (
                <section>
                    <StudioSurface>
                        <StudioSectionHeader title="Add Payment Method" description="Register either a customer checkout gateway method or organizer payout channel." />
                        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
                            <select
                                value={methodForm.scope}
                                onChange={(event) => setMethodForm((current) => ({ ...current, scope: event.target.value }))}
                                className="h-10 rounded-xl border border-white/15 bg-[#0f172a] px-3 text-sm text-slate-100"
                            >
                                <option value="gateway">Customer Gateway</option>
                                <option value="payout">Organizer Payout</option>
                            </select>
                            <input
                                value={methodForm.name}
                                onChange={(event) => setMethodForm((current) => ({ ...current, name: event.target.value }))}
                                className="h-10 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-slate-100"
                                placeholder="Method name"
                            />
                            <input
                                value={methodForm.type}
                                onChange={(event) => setMethodForm((current) => ({ ...current, type: event.target.value }))}
                                className="h-10 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-slate-100"
                                placeholder="Type"
                            />
                            <input
                                value={methodForm.detail}
                                onChange={(event) => setMethodForm((current) => ({ ...current, detail: event.target.value }))}
                                className="h-10 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-slate-100"
                                placeholder="Fee/account detail"
                            />
                        </form>
                        <div className="mt-4">
                            <button
                                type="button"
                                onClick={addPaymentMethod}
                                className="rounded-full border border-sky-300/35 bg-sky-400/15 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:bg-sky-400/30"
                            >
                                Save Method
                            </button>
                        </div>
                    </StudioSurface>
                </section>
            ) : null}

            <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                <StudioSurface>
                    <StudioSectionHeader title="Customer Payment Gateway" description="Configure customer checkout methods like GoPay and Virtual Accounts." />
                    <div className="mt-5 space-y-3">
                        {paymentGatewayMethods.map((method) => (
                            <div key={method.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div>
                                        <p className="text-sm font-semibold text-white">{method.name}</p>
                                        <p className="mt-1 text-xs text-slate-400">
                                            {method.type} • Fee: {method.fee} • Settlement: {method.settlement}
                                        </p>
                                    </div>
                                    <StudioPill label={method.status} tone={method.status === 'Active' ? 'emerald' : 'amber'} />
                                </div>
                            </div>
                        ))}
                    </div>
                </StudioSurface>

                <StudioSurface>
                    <StudioSectionHeader title="Checkout + Settlement Logic" description="Operational flow from customer payment to organizer payout." />
                    <div className="mt-5 space-y-3">
                        {checkoutFlow.map((item) => (
                            <div key={item.step} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <p className="text-sm font-semibold text-white">{item.step}</p>
                                    <StudioPill label={item.status} tone="sky" />
                                </div>
                                <p className="mt-1 text-xs text-slate-400">Owner: {item.owner}</p>
                            </div>
                        ))}
                    </div>
                </StudioSurface>
            </section>

            <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
                <StudioSurface>
                    <StudioSectionHeader title="Payout Methods" description="Primary and backup channels for disbursements." />
                    <div className="mt-5 space-y-3">
                        {payoutMethods.map((method) => (
                            <div key={method.value} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-semibold text-white">{method.type}</p>
                                        <p className="mt-1 text-sm text-slate-300">{method.value}</p>
                                    </div>
                                    {method.primary ? <StudioPill label="Primary" tone="emerald" /> : <StudioPill label="Backup" tone="slate" />}
                                </div>
                            </div>
                        ))}
                    </div>
                    <StudioNotice key={statusNotice.id} message={statusNotice.text} />
                </StudioSurface>

                <StudioSurface>
                    <StudioSectionHeader title="Transactions" description="Event-level payment flows and settlement status." />
                    <div className="mt-5 overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.2em] text-slate-400">
                                    <th className="px-3 py-3 font-semibold">Transaction</th>
                                    <th className="px-3 py-3 font-semibold">Event</th>
                                    <th className="px-3 py-3 font-semibold">Gross</th>
                                    <th className="px-3 py-3 font-semibold">Fee</th>
                                    <th className="px-3 py-3 font-semibold">Net</th>
                                    <th className="px-3 py-3 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((item) => (
                                    <tr key={item.id} className="border-b border-white/5 text-slate-200">
                                        <td className="px-3 py-4 font-medium text-white">{item.id}</td>
                                        <td className="px-3 py-4 text-slate-300">{item.event}</td>
                                        <td className="px-3 py-4"><Money value={item.gross} /></td>
                                        <td className="px-3 py-4"><Money value={item.fee} /></td>
                                        <td className="px-3 py-4 font-medium text-white"><Money value={item.net} /></td>
                                        <td className="px-3 py-4">
                                            <StudioPill label={item.status} tone={item.status === 'Settled' ? 'emerald' : 'amber'} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </StudioSurface>
            </section>
        </StudioShell>
    );
}
