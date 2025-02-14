import connection from "./db.js";
import bcrypt from "bcrypt";

export const findUserByEmail = async (email) => {
    try {
        const [rows] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw new Error("Database error");
    }
};

export const createUser = async (user) => {
    try {
        //hash the password before saving it
        const hashPassword = bcrypt.hashSync(user.password, 10);

        const [result] = await connection.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [user.username, user.email, hashPassword]);
        return result.insertId;
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw new Error("Error Inserting user");
    }
};