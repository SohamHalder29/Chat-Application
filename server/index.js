const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const AuthRoutes = require("./router/AuthRoutes");
const MessageRouter = require("./router/MessageRoutes");
dotenv.config();
const app = express();
const Port = process.env.PORT;

app.use(express.json());
app.use(cors(
    origin = ["http://localhost:3000"]
    ));
    app.use("/api/auth", AuthRoutes)
    
    app.use("/api/message", MessageRouter);
    global.onlineUsers = new Map();
    
    const server = app.listen(Port, ()=>{
        console.log(`Server is connected with Port : ${Port}`)
    })
