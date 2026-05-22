import * as React from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

import './bootstrap';
import { classNames } from './social-hub/ui';

const { StrictMode, useState } = React;

function MaterialIcon({ name, className = '' }) {
    return <span aria-hidden="true" className={`material-symbols-outlined ${className}`}>{name}</span>;
}

const PLAN_DETAILS = {
    plus: {
        name: 'AyoYok Plus',
        price: 'Rp 49.000',
        period: '/ month',
        description: 'Enhanced features for social butterflies.',
        theme: 'from-[#8ea2ff] to-[#b84b8f]'
    },
    pro: {
        name: 'Aura',
        price: 'Rp 299.000',
        period: '/ month',
        description: 'The ultimate VIP experience. Premium access, no limits.',
        theme: 'from-[#d972a9] to-[#b84b8f]'
    }
};

function CheckoutPage({ userName, userEmail, plan, processUrl }) {
    const [paymentMethod, setPaymentMethod] = useState('ewallet');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const planData = PLAN_DETAILS[plan];

    const handleCheckout = async () => {
        setIsProcessing(true);
        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            await axios.post(processUrl, {}, {
                headers: {
                    'X-CSRF-TOKEN': token
                }
            });
            
            // Simulate payment processing delay for UX
            setTimeout(() => {
                setIsProcessing(false);
                setIsSuccess(true);
                
                // Redirect to profile after celebration
                setTimeout(() => {
                    window.location.href = '/profile';
                }, 3000);
            }, 1500);
            
        } catch (error) {
            console.error('Checkout failed:', error);
            setIsProcessing(false);
            alert('Payment failed. Please try again.');
        }
    };

    if (isSuccess) {
        return (
            <div className="flex min-h-screen items-center justify-center p-5">
                <div className="glass-card ambient-shadow max-w-md w-full rounded-[32px] border border-[#25324d]/70 p-10 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1b365f]/30 to-transparent" />
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1b365f] text-[#b9cbf1] shadow-xl mb-6">
                            <MaterialIcon name="check" className="text-4xl" />
                        </div>
                        <h2 className="editorial-display text-3xl font-bold text-[#e8eefc] mb-2">You're In!</h2>
                        <p className="text-[#a8b4cc] mb-6">Your account has been upgraded to {planData.name}. Redirecting you to your profile...</p>
                        <div className="h-1 w-24 bg-[#1d2940] rounded-full overflow-hidden">
                            <div className="h-full bg-[#8ea2ff] animate-[shimmer_1.5s_infinite_linear] w-full origin-left" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-24 pt-12 px-5">
            <div className="mx-auto max-w-[1000px]">
                <a href="/membership" className="inline-flex items-center gap-2 text-sm font-semibold text-[#7e8eaa] hover:text-[#8ea2ff] transition mb-8">
                    <MaterialIcon name="arrow_back" className="text-[18px]" />
                    Back to plans
                </a>

                <div className="grid gap-8 lg:grid-cols-5">
                    {/* Left: Summary */}
                    <div className="lg:col-span-2">
                        <div className={classNames(
                            'ambient-shadow rounded-[32px] p-8 text-white relative overflow-hidden',
                            `bg-gradient-to-br ${planData.theme}`
                        )}>
                            <div className="absolute top-0 right-0 p-6 opacity-20">
                                <MaterialIcon name="star" className="text-8xl" />
                            </div>
                            <div className="relative z-10">
                                <h2 className="editorial-display text-3xl font-bold mb-2">{planData.name}</h2>
                                <p className="text-[#c1cde4] text-sm mb-12">{planData.description}</p>
                                
                                <div className="space-y-4 border-t border-[#25324d]/20 pt-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#c1cde4]">Subscription</span>
                                        <span className="font-semibold">{planData.price}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#c1cde4]">Taxes</span>
                                        <span className="font-semibold">Included</span>
                                    </div>
                                    <div className="flex justify-between border-t border-[#25324d]/20 pt-4 text-lg font-bold">
                                        <span>Total due today</span>
                                        <span>{planData.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Payment Form */}
                    <div className="lg:col-span-3">
                        <div className="glass-card ambient-shadow rounded-[32px] border border-[#25324d]/70 p-6 sm:p-8">
                            <h3 className="editorial-display text-2xl font-bold text-[#e8eefc] mb-6">Complete Checkout</h3>
                            
                            <div className="mb-8">
                                <label className="block text-sm font-semibold text-[#a8b4cc] mb-3">Payment Method</label>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                    {['E-Wallet', 'Virtual Account', 'Credit Card', 'QRIS'].map((method) => {
                                        const id = method.toLowerCase().replace(' ', '');
                                        const isSelected = paymentMethod === id;
                                        return (
                                            <button
                                                key={id}
                                                type="button"
                                                onClick={() => setPaymentMethod(id)}
                                                className={classNames(
                                                    'rounded-2xl border p-4 text-center text-sm font-semibold transition',
                                                    isSelected 
                                                        ? 'border-[#8ea2ff] bg-[#1a2742]/30 text-[#8ea2ff]' 
                                                        : 'border-[#1d2940] bg-[#101a30] text-[#a8b4cc] hover:border-[#2b3855]'
                                                )}
                                            >
                                                {method}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mb-8 space-y-4">
                                <label className="block">
                                    <span className="text-sm font-semibold text-[#a8b4cc]">Email Address</span>
                                    <input type="email" disabled value={userEmail} className="mt-2 h-12 w-full rounded-2xl border border-[#1d2940] bg-[#111b31]/50 px-4 text-sm text-[#7e8eaa] outline-none cursor-not-allowed" />
                                </label>
                                <label className="block">
                                    <span className="text-sm font-semibold text-[#a8b4cc]">Cardholder Name</span>
                                    <input type="text" defaultValue={userName} className="mt-2 h-12 w-full rounded-2xl border border-[#1d2940] bg-[#101a30] px-4 text-sm outline-none transition focus:border-[#8ea2ff]" />
                                </label>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isProcessing}
                                className={classNames(
                                    'w-full rounded-full py-4 text-center font-bold text-white transition shadow-lg flex items-center justify-center gap-2',
                                    isProcessing ? 'bg-[#2b3855] cursor-wait' : 'bg-[#8ea2ff] hover:scale-[1.02] hover:shadow-[0_20px_40px_-12px_rgba(94,80,176,0.5)]'
                                )}
                            >
                                {isProcessing ? (
                                    <>Processing...</>
                                ) : (
                                    <>
                                        <MaterialIcon name="lock" className="text-[18px]" />
                                        Pay {planData.price}
                                    </>
                                )}
                            </button>
                            <p className="mt-4 text-center text-xs text-[#7e8eaa]">
                                By confirming, you agree to AyoYok's Terms of Service and authorize this recurring payment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mountNode = document.getElementById('ayoyok-membership-checkout-root');
if (mountNode) {
    createRoot(mountNode).render(
        <StrictMode>
            <CheckoutPage
                userName={mountNode.dataset.userName}
                userEmail={mountNode.dataset.userEmail}
                plan={mountNode.dataset.plan}
                processUrl={mountNode.dataset.processUrl}
            />
        </StrictMode>
    );
}
