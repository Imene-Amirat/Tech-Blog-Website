import {fetchAllPosts} from '../models/postModel.js';

export const getAllPosts = async (req, res) => {
    try {
        const posts = await fetchAllPosts();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(posts));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
    }
};