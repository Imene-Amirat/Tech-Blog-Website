document.addEventListener("DOMContentLoaded", async () => {
    
    try {
        const response = await fetch("/api/userPosts");
        const posts = await response.json();

        if(posts.length === 0 || !response.ok) {
            document.querySelector('.post-list').innerHTML = `<p class="no-posts">No posts yet</p>`;
            return;
        }

        let postsContainer = '';

        posts.forEach(post => {
            postsContainer += `
             <article class="blog-item">
                <div class="blog-title">
                    <span class="bar"></span>
                    <div>
                        <h3>${post.title}</h3>
                        <small class="blog-date">Published on: ${formatDate(post.datePost)}</small>
                    </div>
                    <div class="icons">
                        <i class="fas fa-edit edit-post" onclick="editPost(${post.id})"></i>
                        <i class="fas fa-trash delete-post" onclick="deletePost(${post.id})"></i>
                    </div>
                </div>
                <p>${post.content.substring(0, 150)}...</p>
            </article>
            `
        });
        
        document.querySelector('.post-list').innerHTML = postsContainer;

    } catch (error) {
        console.error("Error fetching posts:", error);
    }

});

function formatDate(mysqlDate) {
    const date = new Date(mysqlDate);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
}

async function deletePost(id) {
    const res = await fetch(`/api/deletePost/${id}`,{method: 'DELETE'});
    if(res.status === 200) {
        window.location.reload();
    } else {
        alert("Failed to delete post");
    }
}

function editPost(id) {
    window.location.href = `/editPosts/${id}`;
}