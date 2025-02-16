import connection from "./db.js";

export const fetchAllPosts = async() => {
    try {
        const [posts] = await connection.query('SELECT * FROM posts');
        return posts;
    } catch(error) {
        throw new Error("Database query failed");
    }
};

export const createPost = async(post, userId) => {
    try {
        const sql = 'INSERT INTO posts (title, content, datePost, user_id) VALUES (?, ?, ?, ?)';
        const [res] = await connection.query(sql, [post.title, post.content, post.datePost, userId]);
        return res;
    } catch(error) {
        throw new Error("Database query failed");
    }
};