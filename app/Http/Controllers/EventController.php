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
        return view('events.create');
    }

    public function storeEvent(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'date' => 'required',
            'type' => 'required' // public / private
        ]);

        // sementara pakai dummy
        // nanti bisa pakai Event::create()

        return redirect('/home')->with('success','Event berhasil dibuat!');
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
            'title'=>'Music Festival',
            'description'=>'Big outdoor concert',
            'price'=>100000
        ];

        return view('events.detail', compact('event'));
    }

    // =========================
    // JOIN PUBLIC EVENT
    // =========================
    public function joinEvent($id)
    {
        // nanti simpan ke tabel registrations

        return redirect('/home')->with('success','Berhasil join event & payment success!');
    }

    // =========================
    // JOIN PRIVATE EVENT (INVITE)
    // =========================
    public function joinPrivate($token)
    {
        // validasi token undangan

        return view('events.private');
    }
} 