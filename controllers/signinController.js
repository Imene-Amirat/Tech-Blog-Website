import {findUserByEmail} from '../models/userModel.js';
import bcrypt from 'bcrypt';

export const handleSignIn = async (req,res) => {
    
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    
    req.on('end', async () => {
        try {
            const { email, password } = JSON.parse(body);

            //check if user exists
            const user = await findUserByEmail(email);
            if(!user) {
                res.writeHead(401, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'User not found' }));
            }

            //compare entered password with hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);
            //check if password is correct
            if(!passwordMatch){
                res.writeHead(401,{ 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'Invalid password' }));
            }

            //set userId in a cookie
            res.writeHead(200, { 
                "Content-Type": "application/json",
                "Set-Cookie": `userId=${user.id}; HttpOnly; Max-Age=3600; Path=/`
            });
            res.end(JSON.stringify({ message: "Sign in successful" , userId: user.id}));

        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify(error.message));
        }
    });
    
}