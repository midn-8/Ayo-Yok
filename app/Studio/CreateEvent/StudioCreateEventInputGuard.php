<?php

namespace App\Studio\CreateEvent;

use InvalidArgumentException;

class StudioCreateEventInputGuard
{
    public static function validateAndSanitize(array $input): array
    {
        // STEP 1 (before refactor):
        // $title = isset($input['title']) ? trim((string) $input['title']) : '';
        // if ($title === '') {
        //     throw new InvalidArgumentException('Event title is required.');
        // }
        $title = self::assertRequiredTitle($input['title'] ?? null);

        // STEP 2 (before refactor):
        // return [
        //     'title' => $title,
        //     'description' => isset($input['description']) ? (string) $input['description'] : '',
        // ];

        return self::buildSanitizedPayload($title, $input);
    }

    private static function assertRequiredTitle(mixed $value): string
    {
        $title = self::sanitizePlainText((string) $value);

        if ($title === '') {
            throw new InvalidArgumentException('Event title is required.');
        }

        return $title;
    }

    private static function buildSanitizedPayload(string $title, array $input): array
    {
        return [
            'title' => $title,
            'description' => self::sanitizePlainText((string) ($input['description'] ?? '')),
        ];
    }

    private static function sanitizePlainText(string $value): string
    {
        // Remove script/style blocks entirely to reduce XSS payload persistence.
        $value = preg_replace('/<(script|style)\b[^>]*>.*?<\/\1>/is', ' ', $value) ?? $value;

        // Drop any remaining HTML tags.
        $value = strip_tags($value);

        // Remove control chars and normalize all whitespace sequences.
        $value = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value) ?? $value;
        $value = preg_replace('/\s+/u', ' ', $value) ?? $value;

        return trim($value);
    }
}
