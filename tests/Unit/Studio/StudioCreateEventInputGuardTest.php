<?php

namespace Tests\Unit\Studio;

use App\Studio\CreateEvent\StudioCreateEventInputGuard;
use InvalidArgumentException;
use PHPUnit\Framework\TestCase;

class StudioCreateEventInputGuardTest extends TestCase
{
    public function test_event_title_cannot_be_empty(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('Event title is required.');

        StudioCreateEventInputGuard::validateAndSanitize([
            'title' => '   ',
            'description' => 'Valid description',
        ]);
    }
// }


    public function test_input_is_sanitized_for_xss_patterns_and_whitespace(): void
    {
        $sanitized = StudioCreateEventInputGuard::validateAndSanitize([
            'title' => "   <script>alert('x')</script>  Summer   Party   ",
            'description' => "<b>Welcome</b>\n<script>alert('x')</script>\n<img src=x onerror=alert(1)> Night",
        ]);

        $this->assertSame('Summer Party', $sanitized['title']);
        $this->assertSame('Welcome Night', $sanitized['description']);
    }

    public function test_legitimate_characters_are_preserved_after_sanitization(): void
    {
        $sanitized = StudioCreateEventInputGuard::validateAndSanitize([
            'title' => "O'Reilly Founder Meetup",
            'description' => 'Bring your ideas & co-build.',
        ]);

        $this->assertSame("O'Reilly Founder Meetup", $sanitized['title']);
        $this->assertSame('Bring your ideas & co-build.', $sanitized['description']);
    }
}
