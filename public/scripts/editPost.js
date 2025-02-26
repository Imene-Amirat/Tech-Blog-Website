document.addEventListener("DOMContentLoaded", async () => {
    const pathParts = window.location.pathname.split('/'); 
    const postId = pathParts[pathParts.length - 1]; 
    console.log(postId);

    try{
        console.log('eeeeeeeeeeeee');
        const response = await fetch(`/api/getPostByIdPosts/${postId}`);
        const post = await response.json();
        console.log(post[0].title);

        document.getElementById('title').value = post[0].title;
        document.getElementById('content').value = post[0].content;
        document.getElementById('date').value = formatDate(post[0].datePost);

    } catch(error){
        console.log("Error fetching posts:", error)
    }
});

function formatDate(mysqlDate) {
    const date = new Date(mysqlDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}