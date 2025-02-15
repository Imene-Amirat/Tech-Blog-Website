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
            const post = JSON.parse(body);
            const postId = await createPost(post);
    
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message: 'Post created'}));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    });
};