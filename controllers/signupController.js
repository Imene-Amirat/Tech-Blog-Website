import {createUser} from "../models/userModel.js";
import {findUserByEmail} from "../models/userModel.js";

export const handleSignUp = async (req, res) => {
    
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const user = JSON.parse(body);
            console.log(user);

            //check if amail already exsit
            const existingUser = await findUserByEmail(user.email);
            if(existingUser) {
                res.writeHead(409, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'User already exists' }));
            }

            const userId = await createUser(user);
            console.log(userId);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User created' }));

        } catch(error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }

    })
    
}