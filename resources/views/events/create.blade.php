<h2>Create Event</h2>

<form method="POST" action="/event/store">
    @csrf
    <input type="text" name="title" placeholder="Event Title"><br>
    <textarea name="description" placeholder="Description"></textarea><br>
    <input type="date" name="date"><br>

    <select name="type">
        <option value="public">Public</option>
        <option value="private">Private</option>
    </select><br><br>

    <button type="submit">Create</button>
</form>