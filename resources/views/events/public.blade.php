<h2>Public Events</h2>

@foreach($events as $event)
    <div style="border:1px solid #ccc; padding:10px; margin:10px;">
        <h3>{{ $event['title'] }}</h3>
        <p>Price: Rp {{ number_format($event['price']) }}</p>
        <a href="/event/{{ $event['id'] }}">View Detail</a>
    </div>
@endforeach

<a href="/home">Back to Home</a>