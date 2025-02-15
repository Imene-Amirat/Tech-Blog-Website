import connection from "./db.js";

export const fetchAllPosts = async() => {
    try {
        const [posts] = await connection.query('SELECT * FROM posts');
        return posts;
    } catch(error) {
        throw new Error("Database query failed");
    }
};
