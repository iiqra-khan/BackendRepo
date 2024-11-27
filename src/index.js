import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'

dotenv.config({
    path: './.env'
})

connectDB() //this returns a promise
.then(()=>{
    app.listen(process.env.PORT || 5000, () => {
        console.log(`server is running at port: ${process.env.PORT}`); 
    })
})
.catch((err) => {
    console.log("Mongo DB connection failed !! " , err); 
})






















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