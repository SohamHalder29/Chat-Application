const { Server } = require("socket.io");
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

    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
      },
    });

    io.on("connection", (socket)=>{
        global.chatSocket = socket;
        socket.on("add-user", (userId)=>{
            onlineUsers.set(userId, socket.id)
        })
        socket.on("send-msg", (data)=>{
            const sendUserSocket = onlineUsers.get(data.to);
            if(sendUserSocket){
                socket.to(sendUserSocket).emit("msg-recieve",{
                    from:data.from,
                    message: data.message,
                })
            }
        })
    })
