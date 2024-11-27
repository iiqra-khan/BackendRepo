// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";
// import dotenv from "dotenv"
// dotenv.config()
// import mysql from "mysql2/promise"


// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     port: process.env.PORT,
//     database: process.env.DB_NAME
// });

// // const connectDB = async () => {
// //     try{
// //         const connectionInstance = await pool.getConnection();

// //         console.log("connected");

// //     }catch(error) {
// //         console.log("MySql  error: ", error);
// //         process.exit(1); //read about exit codes
        
// //     }
// // }


// let sql = "select * from test;";

// pool.execute(sql, function (err, result) {
//     if(err) throw err;
    
//     result.forEach(result => {
//         console.log(res.title);
        
//     });
// })
// // export default connectDB;



// import express from "express"

// const app = express()

// app.get('/', function(req, res){
//     res.send('hello world')
// })

// app.listen(3000, ()=> {
//     console.log("app running on http://localhost:3000");
    
// })



import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${ DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB