const INTEGRATION_STORAGE_KEY = 'ayoyok-studio-memory-integration';

const defaultState = {
    autoIntegrate: true,
    blockedMemoryIds: [],
};

export function loadIntegrationState() {
    if (typeof window === 'undefined') {
        return defaultState;
    }

    const raw = window.localStorage.getItem(INTEGRATION_STORAGE_KEY);

    if (!raw) {
        return defaultState;
    }

    try {
        const parsed = JSON.parse(raw);
        return {
            autoIntegrate: typeof parsed.autoIntegrate === 'boolean' ? parsed.autoIntegrate : true,
            blockedMemoryIds: Array.isArray(parsed.blockedMemoryIds) ? parsed.blockedMemoryIds : [],
        };
    } catch {
        return defaultState;
    }
}

export function saveIntegrationState(state) {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(
        INTEGRATION_STORAGE_KEY,
        JSON.stringify({
            autoIntegrate: state.autoIntegrate,
            blockedMemoryIds: state.blockedMemoryIds,
        }),
    );
}

export function getIntegratedMemories(memories, state) {
    if (!state.autoIntegrate) {
        return [];
    }

    const blocked = new Set(state.blockedMemoryIds);
    return memories.filter((memory) => !blocked.has(memory.id));
}
