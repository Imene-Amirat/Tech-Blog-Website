import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import url from 'url';
import './models/db.js';

const PORT = process.env.PORT;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer(async (req, res) => {
    if(req.url === '/sign-in' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const { email, password } = JSON.parse(body);
            console.log(email, password);
        });
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
        // serve static files (CSS & JS)
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