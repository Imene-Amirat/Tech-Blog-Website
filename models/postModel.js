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

export const deletePost = async(userId, postId) => {
    try {
        const [res] = await connection.query('DELETE FROM posts WHERE user_id = ? AND id = ?', [userId, postId]);
        return res;
    } catch(error) {
        throw new Error("Database query failed");
    }
};

export const getPostById = async(userId, postId) => {
    try {
        const [res] = await connection.query('SELECT * FROM posts WHERE user_id = ? AND id = ?', [userId, postId]);
        return res;
    } catch(error) {
        throw new Error("Database query failed");
    }
};

export const updatePost = async(userId, postId, post) => {
    try {
        const [result] = await connection.query('UPDATE posts SET title = ?, content = ?, datePost = ? WHERE user_id = ? AND id = ?',[post.title, post.content, post.date, userId, postId]);
        return result.affectedRows;
    } catch(error) {
        throw new Error("Database query failed");
    }
};