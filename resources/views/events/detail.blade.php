<h2>{{ $event['title'] }}</h2>

<p>{{ $event['description'] }}</p>
<p>Price: Rp {{ number_format($event['price']) }}</p>

<form method="POST" action="/event/{{ $event['id'] }}/join">
    @csrf
    <button type="submit">Join & Pay</button>
</form>

<a href="/events/public">Back</a>