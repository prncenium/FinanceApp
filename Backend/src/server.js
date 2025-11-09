const app = require('./app');
const connectToDB = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

connectToDB();


app.listen(PORT, ()=>{
    console.log("SERVER STARTED !!!")
})