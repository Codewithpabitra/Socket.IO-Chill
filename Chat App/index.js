import express from "express";

import http from 'http'

import { Server } from 'socket.io'

// create instances and make server 
const app = express()

const server = http.createServer(app);

const io = new Server(server)

// serve static files 
app.use(express.static('public'))

// create connection
io.on('connection', (socket) => {
    console.log("User connected sucessfully");

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    })


    socket.on('disconnect', () => {
        console.log("User Disconnected");

    })


})


// run the server 
server.listen(3000, () => {
    console.log("Sever UP!")
})



