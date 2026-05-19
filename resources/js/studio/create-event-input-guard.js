export class StudioCreateEventValidationError extends Error {}

function sanitizePlainText(value) {
    let normalized = String(value ?? '');

    // Mirrors backend TDD behavior: remove script/style blocks first.
    normalized = normalized.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');

    // Strip any remaining HTML tags.
    normalized = normalized.replace(/<[^>]*>/g, ' ');

    // Remove control chars and normalize spacing.
    normalized = normalized.replace(/[\x00-\x1F\x7F]/g, ' ');
    normalized = normalized.replace(/\s+/g, ' ');

    return normalized.trim();
}

export function validateAndSanitizeCreateEventInput(input) {
    const title = sanitizePlainText(input?.title ?? '');

    if (title === '') {
        throw new StudioCreateEventValidationError('Event title is required.');
    }

    return {
        ...input,
        title,
        description: sanitizePlainText(input?.description ?? ''),
    };
}
