import { raw } from 'mysql2';
import {fetchAllPosts, createPost, fetchUserPosts,deletePost, getPostById} from '../models/postModel.js';

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

export const handlefetchUserPosts = async (req, res) => {
    try {
        //extract cookie from request header
        const cookie = parseCookies(req);
        const userId = cookie.userId;
        console.log(userId);

        if (!userId) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Unauthorized: Please sign in' }));
        }

        const userPosts = await fetchUserPosts(userId);
        console.log(userPosts);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(userPosts));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
    }
};

export const handleDeletePost = async (req, res) => {
    try {
        const postId = req.url.split("/").pop();

        //extract cookie from request header
        const cookie = parseCookies(req);
        const userId = cookie.userId;
        
        const result = await deletePost(userId, postId);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({message: 'Post Delete successful'}));
    } catch(error){
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
    }
}

export const handleGetPostById = async (req, res) => {
    try {
        const postId = req.url.split("/").pop();

        //extract cookie from request header
        const cookie = parseCookies(req);
        const userId = cookie.userId;
        
        const result = await getPostById(userId, postId);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
    } catch(error){
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
    }
}

//parse cookie from request header
const parseCookies = (req) => {
    const rawCookies = req.headers.cookie || "";
    return Object.fromEntries(
        rawCookies.split("; ").map((cookie) => cookie.split("="))
    )
};