<?php

namespace App\Http\Controllers;

use App\Studio\CreateEvent\StudioCreateEventInputGuard;
use App\Models\User;
use Carbon\Carbon;
use InvalidArgumentException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class EventController extends Controller
{
    // =========================
    // CREATE EVENT (PRIVATE)
    // =========================
    public function createEvent()
    {
        return $this->createPrivateEvent();
    }

    public function createPrivateEvent()
    {
        return view('events.private-create', [
            'eventMode' => 'private',
        ]);
    }

    public function createPublicEvent()
    {
        return view('events.public-create', [
            'eventMode' => 'public',
        ]);
    }

    public function storeEvent(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'date' => 'required',
            'type' => 'required', // public / private
        ]);

        // sementara pakai dummy
        // nanti bisa pakai Event::create()

        return redirect()->route('dashboard')->with('success', 'Event berhasil dibuat!');
    }

    public function storePrivateEvent(Request $request)
    {
        // Previous implementation (kept for TDD traceability):
        // $request->validate([
        //     'title' => 'required|string|max:255',
        //     'date' => 'required',
        //     'theme' => 'required|string',
        // ]);
        $request->validate([
            'date' => 'required',
            'theme' => 'required|string',
        ]);

        try {
            $sanitized = StudioCreateEventInputGuard::validateAndSanitize([
                'title' => $request->input('title'),
                'description' => $request->input('description', ''),
            ]);
        } catch (InvalidArgumentException $exception) {
            throw ValidationException::withMessages([
                'title' => $exception->getMessage(),
            ]);
        }

        return redirect()
            ->route('events.private.create')
            ->with('success', "Private event draft created for \"{$sanitized['title']}\". Connect persistence when the backend is ready.");
    }

    // =========================
    // VIEW PUBLIC EVENTS
    // =========================
    public function publicEvents()
    {
        $events = [
            ['id'=>1,'title'=>'Music Festival','price'=>100000],
            ['id'=>2,'title'=>'Tech Seminar','price'=>50000],
        ];

        return view('events.public', compact('events'));
    }

    // =========================
    // DETAIL EVENT
    // =========================
    public function eventDetail($id)
    {
        $event = [
            'id'=>$id,
            'title'=>'Event',
            'description'=>'',
            'price'=>null
        ];

        return view('events.detail', compact('event'));
    }

    // =========================
    // JOIN PUBLIC EVENT
    // =========================
    public function joinEvent($id)
    {
        // nanti simpan ke tabel registrations

        return redirect()
            ->route('payment.show', ['id' => $id])
            ->with('success', 'Lanjut ke pembayaran untuk menyelesaikan tiket event.');
    }

    public function payment($id)
    {
        return view('payment', ['eventId' => $id]);
    }

    public function confirmPayment(Request $request, $id)
    {
        $request->validate([
            'payment_method' => 'required|string',
            'quantity' => 'required|integer|min:1',
        ]);

        return redirect()
            ->route('dashboard')
            ->with('success', "Payment for event {$id} confirmed.");
    }

    // =========================
    // JOIN PRIVATE EVENT (INVITE)
    // =========================
    public function joinPrivate(Request $request, $token)
    {
        $recipientHandle = ltrim((string) $request->query('to', ''), '@');
        $recipientName = null;
        $expiresAtRaw = (string) $request->query('exp', '');
        $expiresAt = null;
        $isExpired = true;

        if ($recipientHandle !== '') {
            $recipientName = User::where('username', $recipientHandle)->value('name');
        }

        if (!$recipientName) {
            $recipientName = $request->query('recipient');
        }

        if ($expiresAtRaw !== '') {
            try {
                $expiresAt = Carbon::parse($expiresAtRaw);
                $isExpired = Carbon::now()->greaterThan($expiresAt);
            } catch (\Throwable $exception) {
                $isExpired = true;
            }
        }

        return view('events.private', [
            'token' => $token,
            'theme' => $request->query('theme', 'elegant-night'),
            'recipientName' => $recipientName,
            'recipientHandle' => $recipientHandle,
            'expiresAt' => $expiresAt?->toIso8601String() ?: $expiresAtRaw,
            'inviteExpired' => $isExpired,
        ]);
    }

    public function respondPrivateInvite(Request $request, $token)
    {
        $validated = $request->validate([
            'decision' => 'required|in:accept,decline',
            'exp' => 'required|string',
            'theme' => 'nullable|string',
            'to' => 'nullable|string',
            'recipient' => 'nullable|string',
        ]);

        $isExpired = true;

        try {
            $isExpired = Carbon::now()->greaterThan(Carbon::parse($validated['exp']));
        } catch (\Throwable $exception) {
            $isExpired = true;
        }

        if ($isExpired) {
            return redirect()
                ->route('invite.show', [
                    'token' => $token,
                    'theme' => $validated['theme'] ?? 'elegant-night',
                    'exp' => $validated['exp'],
                    'to' => $validated['to'] ?? null,
                    'recipient' => $validated['recipient'] ?? null,
                ])
                ->with('status', 'This invite has expired after 24 hours.');
        }

        if ($validated['decision'] === 'accept') {
            return redirect()
                ->route('dashboard')
                ->with('success', 'Invitation accepted. Your RSVP is recorded.');
        }

        return redirect()
            ->route('dashboard')
            ->with('status', 'Invitation declined.');
    }
}
