require ('dotenv').config();
const mongoose = require("mongoose");

const connectToDB = async()=>{
    try{
        await mongoose.connect( process.env.MONGO_URI);
        console.log(" connected to DB")
    }
    catch(err){
        console.log("Failed to connect to DB")
    }
}

module.exports = connectToDB;