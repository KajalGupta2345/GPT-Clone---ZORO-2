require('dotenv').config();
const http = require('http');
const app = require("./src/app");
const connectDB = require('./src/db/db');
const initSocketServer = require('./src/sockets/socket');


const httpserver = http.createServer(app);

connectDB();
initSocketServer(httpserver);

httpserver.listen('3000',()=>{
    console.log("server is running on port 3000");
});