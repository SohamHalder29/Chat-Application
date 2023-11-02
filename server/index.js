const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const AuthRoutes = require("./router/AuthRoutes");
dotenv.config();
const app = express();
const Port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/auth", AuthRoutes)
const server = app.listen(Port, ()=>{
    console.log(`Server is connected with Port : ${Port}`)
})

