import * as React from 'react';

import { paymentGatewayMethods, payoutMethods, scheduleWindowEvents, socialAdPosts } from './mock-data';

const STORAGE_KEY = 'ayoyok-studio-workspace-v1';

function getBaseWorkspace() {
    return {
        eventDrafts: [],
        publishedEvents: [],
        campaigns: [],
        scheduleBlocks: scheduleWindowEvents,
        socialCampaignPosts: socialAdPosts,
        payoutMethods,
        gatewayMethods: paymentGatewayMethods,
        plan: {
            currentTier: 'Starter',
            exclusiveAccess: false,
            paidTiers: ['Starter'],
        },
        invitationDrafts: [],
    };
}

export function createStudioId(prefix) {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function parseRecipientList(value) {
    return value
        .split(/[\n,]/)
        .map((item) => item.trim())
        .filter(Boolean);
}

export function loadWorkspaceState() {
    const base = getBaseWorkspace();

    if (typeof window === 'undefined') {
        return base;
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
        return base;
    }

    try {
        const parsed = JSON.parse(raw);

        return {
            ...base,
            ...parsed,
            plan: {
                ...base.plan,
                ...(parsed.plan || {}),
            },
        };
    } catch {
        return base;
    }
}

export function saveWorkspaceState(state) {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useStudioWorkspace() {
    const [workspace, setWorkspace] = React.useState(() => loadWorkspaceState());

    const updateWorkspace = React.useCallback((updater) => {
        setWorkspace((current) => {
            const next = typeof updater === 'function' ? updater(current) : { ...current, ...updater };
            saveWorkspaceState(next);
            return next;
        });
    }, []);

    return [workspace, updateWorkspace];
}
