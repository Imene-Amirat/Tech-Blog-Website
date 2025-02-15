import connection from "./db.js";

export const fetchAllPosts = async() => {
    try {
        const [posts] = await connection.query('SELECT * FROM posts');
        return posts;
    } catch(error) {
        throw new Error("Database query failed");
    }
};

export const createPost = async(post) => {
    try {
        const sql = 'INSERT INTO posts (title, content, datePost, userId) VALUES (?, ?, ?)';
        const [res] = await connection.query(sql, [post.title, post.content, post.datePost, post.userId]);
        return res;
    } catch(error) {
        throw new Error("Database query failed");
    }
};