import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import url from 'url';
import {handleSignIn} from './controllers/signinController.js';
import {handleSignUp} from './controllers/signupController.js';
import {getAllPosts, handlecreatePost} from './controllers/postController.js';
import './models/db.js';

const PORT = process.env.PORT;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
    if(req.url === '/sign-in' && req.method === 'POST') {
        return handleSignIn(req, res);
    } else if(req.url === '/sign-up' && req.method === 'POST') {
        return handleSignUp(req, res);
    } else if(req.url === '/api/posts' && req.method === 'GET') {
        return getAllPosts(req, res);
    } else if(req.url === '/api/add-post' && req.method === 'POST') {
        return handlecreatePost(req, res);
    }


    // Serve HTML pages
    let filePath;
    if (req.url === '/' || req.url === '/home') {
        filePath = path.join(__dirname, 'views', 'homePage.html');
    } else if (req.url === '/sign-in') {
        filePath = path.join(__dirname, 'views', 'sign-in.html');
    } else if (req.url === '/sign-up') {
        filePath = path.join(__dirname, 'views', 'sign-up.html');
    } else if (req.url.startsWith('/public/')) {
        // serve static files (CSS & JS & ejs)
        filePath = path.join(__dirname, req.url);
    } else {
        // Handle 404 errors
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end('<h1>404 Not Found</h1>');
    }

    // Read and serve the file
    try{
        const data = await fs.readFile(filePath);
        let contentType = 'text/html';
        if (filePath.endsWith('.css')) contentType = 'text/css';
        if (filePath.endsWith('.js')) contentType = 'text/javascript';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'text/html'});
        res.end(`<h1>Server Error: ${error.message}</h1>`);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});