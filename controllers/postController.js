import { raw } from 'mysql2';
import {fetchAllPosts, createPost} from '../models/postModel.js';

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

export const handlecreatePost = async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            //extract cookie from request header
            const cookie = parseCookies(req);
            const userId = cookie.userId;

            if (!userId) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'Unauthorized: Please sign in' }));
            }

            const post = JSON.parse(body);
            const postId = await createPost(post, userId);
    
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: 'Post created'}));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    });
};


//parse cookie from request header
const parseCookies = (req) => {
    const rawCookies = req.headers.cookie || "";
    return Object.fromEntries(
        rawCookies.split("; ").map((cookie) => cookie.split("="))
    )
};