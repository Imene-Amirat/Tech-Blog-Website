document.getElementById('newPostForm').addEventListener('submit', async() => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const date = document.getElementById('date').value;

    const response = await fetch('/api/addPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, date })
    });

    const data = await response.json();

    if(response.status === 200) {
        window.location.href = '/home';
    } else {
        document.getElementById('message').innerText = data.message;
    }
});