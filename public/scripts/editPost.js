document.addEventListener("DOMContentLoaded", async () => {
    const pathParts = window.location.pathname.split('/'); 
    const postId = pathParts[pathParts.length - 1]; 

    try{
        const response = await fetch(`/api/getPostByIdPosts/${postId}`);
        const post = await response.json();

        document.getElementById('title').value = post[0].title;
        document.getElementById('content').value = post[0].content;
        document.getElementById('date').value = formatDate(post[0].datePost);

    } catch(error){
        console.log("Error fetching posts:", error)
    }

    document.getElementById('newPostForm').addEventListener('submit', async() => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const date = document.getElementById('date').value;

        const response = await fetch('/api/editPost', {
            method: 'PUT',
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
});

function formatDate(mysqlDate) {
    const date = new Date(mysqlDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}