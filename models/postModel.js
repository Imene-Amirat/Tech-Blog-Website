import connection from "./db.js";

export const fetchAllPosts = async() => {
    try {
        const [posts] = await connection.query('SELECT * FROM posts ORDER BY datePost DESC');
        return posts;
    } catch(error) {
        throw new Error("Database query failed");
    }
};

export const createPost = async(post, userId) => {
    try {
        const sql = 'INSERT INTO posts (title, content, datePost, user_id) VALUES (?, ?, ?, ?)';
        const [res] = await connection.query(sql, [post.title, post.content, post.date, userId]);
        return res;
    } catch(error) {
        throw new Error("Database query failed");
    }
};

export const fetchUserPosts = async(userId) => {
    try {
        const [posts] = await connection.query('SELECT * FROM posts WHERE user_id = ? ORDER BY datePost DESC', [userId]);
        return posts;
    } catch(error) {
        throw new Error("Database query failed");
    }
};