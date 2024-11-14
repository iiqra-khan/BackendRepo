// immediatly invoked function expression(IIFE)
// is used to deal with global scope pollution ??
// two iife function written back to back must be separated by a semi colon otherwise it will cause an error
// below line is right but is not consistent with our code
// require('dotenv').config({path: './env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()
























// this approach tho right but in this code we have written everything at once place instead of using modules
/*
import express from "express"

const app = express()

(async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("Error: ", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`app is listening on port : ${process.env.PORT}`);
            
        })
    }catch(error){
        console.error("ERROR: ", error);
        throw err
    }
})()

*/