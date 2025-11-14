// package
import express from "express"

import http from "http"
import { dirname,join } from "node:path"

import { fileURLToPath } from "node:url"

import { Server } from "socket.io"

// Instances 
const app = express();

const server = http.createServer(app);

const io = new Server(server);

// Serving HTML files 
const _dirname = dirname(fileURLToPath(import.meta.url))

app.get('/', (req,res) => {
    res.sendFile(join(_dirname, 'index.html'))
})


// defining a connection event handler 
io.on('connection', (client) => {
    console.log("User connected to server")
    // console.log(socket)

    // Emit a 'message' event to the client -> sending data from server side to the client side 
    client.emit('message', 'Welcome to the server')

    // receiving data from the client side 
    client.on("new message", (message) => {
        console.log(message);
    })

    // **we are just disconnecting a specific client from the server 
    client.on('disconnect', () => {
        console.log("User disconnected from the server")
    })


} )


// 


// Start the server 
const PORT = 3000;


server.listen(PORT, () => console.log(`Server runnng on port : ${PORT}`))

