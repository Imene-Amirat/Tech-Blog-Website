document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/api/posts");
        const posts = await response.json();

        let postsContainer = '';
        
        posts.forEach((post) => {
            postsContainer += `
            <article class="blog-item">
                <div class="blog-title">
                    <span class="bar"></span>
                    <div>
                        <h3><a href="#a">${post.title}</a></h3>
                        <small class="blog-date">Published on: ${formatDate(post.datePost)}</small>
                    </div>
                </div>
                <p>${post.content}</p>
            </article>
            `
        });

        document.querySelector('.blog-list').innerHTML = postsContainer;

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