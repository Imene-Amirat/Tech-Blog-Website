document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/api/userPosts");
        const posts = await response.json();

        let postsContainer = '';
        
        

    } catch (error) {
        console.error("Error fetching posts:", error);
    }

});
