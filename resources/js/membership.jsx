import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';
import { classNames, Icon, LogoutButton } from './social-hub/ui';
import { logoAyoyok } from './brand-assets';

const { StrictMode, useState } = React;

function MaterialIcon({ name, className = '' }) {
    return <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>{name}</span>;
}

const MEMBERSHIP_PLANS = [
    {
        id: 'free',
        name: 'Free',
        price: 'Rp 0',
        period: '/ forever',
        description: 'The essentials for exploring events.',
        features: [
            'Limited private event creation (3/mo)',
            'Limited invitations per month (50/mo)',
            'Basic social features',
            'Standard profile'
        ],
        buttonText: 'Current Plan',
        buttonAction: null,
        isPopular: false,
        theme: 'bg-[#111b31]/80 border-[#1d2940] text-[#a8b4cc]'
    },
    {
        id: 'plus',
        name: 'Plus',
        price: 'Rp 49.000',
        period: '/ month',
        description: 'For social butterflies and active hosts.',
        features: [
            'More private events (10/mo)',
            'More invitations (500/mo)',
            'Custom invitation themes',
            'Enhanced profile customization',
            'Priority support'
        ],
        buttonText: 'Upgrade to Plus',
        buttonAction: '/membership/checkout/plus',
        isPopular: true,
        theme: 'bg-[#101a30]/95 border-[#8ea2ff] text-[#e8eefc] shadow-[0_24px_48px_-12px_rgba(94,80,176,0.3)] scale-105 z-10'
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 'Rp 299.000',
        period: '/ month',
        description: 'The ultimate VIP experience. Premium access, no limits.',
        features: [
            'Unlimited private events & guests',
            'Exclusive early access to ticket drops',
            'VIP aesthetic profile badges',
            'Advanced scrapbook customization',
            'Premium invitation themes & glows',
            'Access to members-only exclusive events'
        ],
        buttonText: 'Get Pro',
        buttonAction: '/membership/checkout/pro',
        isPopular: false,
        theme: 'bg-[#101a30]/95 border-[#b84b8f] text-[#e8eefc] shadow-[0_12px_30px_-12px_rgba(184,75,143,0.25)]'
    }
];

function MembershipPage({ userName, userUsername, currentPlan }) {
    const [isHeaderSearchFocused, setIsHeaderSearchFocused] = useState(false);

    return (
        <div className="relative min-h-screen pb-24">
            {/* Nav Header */}
            <header className="fixed inset-x-0 top-0 z-50 border-b border-[#25324d]/55 bg-[rgba(8,13,27,0.78)] backdrop-blur-md shadow-[0_12px_30px_-24px_rgba(94,80,176,0.35)]">
                <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-4 lg:px-8">
                    <div className="flex items-center gap-8">
                        <a href="/dashboard" className="flex items-center gap-3">
                            <img
                                src={logoAyoyok}
                                alt="AyoYok"
                                className="h-11 w-auto rounded-xl border border-[#25324d]/75 bg-[#111b31]/90 p-1 shadow-[0_16px_28px_-18px_rgba(94,80,176,0.65)]"
                            />
                        </a>
                        <nav className="hidden items-center gap-6 md:flex">
                            <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/dashboard">Home</a>
                            <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/explore">Explore</a>
                            <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/schedule">Schedule</a>
                            <a className="text-sm font-semibold text-[#a8b4cc] transition-colors hover:text-[#8ea2ff]" href="/profile">Profile</a>
                        </nav>
                    </div>

                    <div className="flex items-center gap-3">
                        <button type="button" onClick={() => window.location.href='/schedule'} className="rounded-full p-2 text-[#a8b4cc] transition hover:bg-[#111b31]/80 hover:text-[#8ea2ff]">
                            <MaterialIcon name="notifications" />
                        </button>
                        <LogoutButton />
                        <a href="/profile" className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#3e5996] bg-[#101a30] text-sm font-bold text-[#8ea2ff]">
                            {userName.charAt(0)}
                        </a>
                    </div>
                </div>
            </header>

            {/* Immersive Hero */}
            <section className="relative pt-32 pb-20 px-5 text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#1a2742]/40 blur-[100px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-[#1d355f]/35 blur-[100px]" />
                </div>
                
                <div className="relative z-10 mx-auto max-w-2xl">
                    <span className="inline-block rounded-full bg-[#111b31]/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#8ea2ff] border border-[#1a2742] backdrop-blur-sm mb-6">
                        Unlock More Experiences
                    </span>
                    <h1 className="editorial-display text-5xl sm:text-6xl font-bold tracking-tight text-[#e8eefc] mb-6">
                        Make every moment <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8ea2ff] to-[#b84b8f]">unforgettable.</span>
                    </h1>
                    <p className="text-lg text-[#a8b4cc] mb-10 max-w-xl mx-auto leading-relaxed">
                        Whether you're hosting an intimate gathering or producing a massive festival, AyoYok has the perfect plan to elevate your social life.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="relative z-20 mx-auto max-w-[1200px] px-5 lg:px-8">
                <div className="grid gap-8 md:grid-cols-3 md:items-center">
                    {MEMBERSHIP_PLANS.map((plan) => {
                        const isCurrentPlan = currentPlan === plan.id;
                        
                        return (
                            <div key={plan.id} className={classNames(
                                'glass-card relative rounded-[32px] border p-8 transition-all duration-300',
                                plan.theme,
                                plan.isPopular ? 'md:-translate-y-4' : ''
                            )}>
                                {plan.isPopular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <span className="rounded-full bg-gradient-to-r from-[#8ea2ff] to-[#b84b8f] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                
                                <div className="mb-8">
                                    <h3 className="editorial-display text-2xl font-bold mb-2 text-[#e8eefc]">
                                        {plan.name}
                                    </h3>
                                    <p className="text-sm mb-6 text-[#7e8eaa]">
                                        {plan.description}
                                    </p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold text-[#e8eefc]">
                                            {plan.price}
                                        </span>
                                        <span className="text-sm font-medium text-[#7e8eaa]">
                                            {plan.period}
                                        </span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm">
                                            <MaterialIcon name="check_circle" className={classNames(
                                                'text-[18px]',
                                                plan.id === 'pro' ? 'text-[#b84b8f]' : 'text-[#8ea2ff]'
                                            )} />
                                            <span className="text-[#a8b4cc]">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {isCurrentPlan ? (
                                    <button disabled className="w-full rounded-full bg-[#101a30] py-4 text-center text-sm font-bold text-[#7e8eaa] transition">
                                        Current Plan
                                    </button>
                                ) : (
                                    <a href={plan.buttonAction} className={classNames(
                                        'block w-full rounded-full py-4 text-center text-sm font-bold transition hover:scale-105',
                                        plan.id === 'pro' 
                                            ? 'bg-gradient-to-r from-[#8ea2ff] to-[#b84b8f] text-white shadow-lg' 
                                            : plan.isPopular 
                                                ? 'bg-[#8ea2ff] text-white shadow-lg' 
                                                : 'bg-[#1b2742] text-[#d6e0f5]'
                                    )}>
                                        {plan.buttonText}
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

const mountNode = document.getElementById('ayoyok-membership-root');
if (mountNode) {
    createRoot(mountNode).render(
        <StrictMode>
            <MembershipPage
                userName={mountNode.dataset.userName}
                userUsername={mountNode.dataset.userUsername}
                currentPlan={mountNode.dataset.currentPlan}
            />
        </StrictMode>
    );
}
