<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
        return view('events.private-create');
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
        $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required',
            'theme' => 'required|string',
        ]);

        return redirect()
            ->route('events.private.create')
            ->with('success', 'Private event draft created. Connect persistence when the backend is ready.');
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
        // validasi token undangan

        return view('events.private', [
            'token' => $token,
            'theme' => $request->query('theme', 'elegant-night'),
        ]);
    }
}
