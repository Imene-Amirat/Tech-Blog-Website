import connection from "./db.js";

export const findUserByEmail = async (email) => {
    try {
        const [rows] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw new Error("Database error");
    }
};
