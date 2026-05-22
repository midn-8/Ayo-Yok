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
}
