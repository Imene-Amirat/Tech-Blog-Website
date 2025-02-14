import mysql from 'mysql2/promise';

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_NAME;
const port = process.env.DB_PORT;

//creates a connection object
const connection  = await mysql.createConnection({
    host,user,password,database,port
});

connection.connect((err) => {
    if(err) {
        console.log(err.message);
    } else {
        console.log('Database connected');
    }
});

export default connection;
