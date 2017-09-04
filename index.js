const express = require('express');
const path = require("path")
const http = require("http")
const generatePassword = require("password-generator")
// const SocketServer = require('ws').Server
const socketIO = require("socket.io")
const cors = require("cors")

const app = express()

app.use(express.static(path.join(__dirname, "/client/build")))
app.use(cors())

app.get("/api/passwords", (req, res) => {
    const count = 5

    const passwords = Array.from(Array(count).keys()).map(i => generatePassword(12, false))

    res.json(passwords)

    console.log("Sent ${count} passwords")
})

// app.get('*', (req, res) => {
//     res.sendFile(path.join (__dirname + "/client/build/index.html"))
// })

const index = path.join(__dirname + "/client/build/index.html")
const port = process.env.PORT || 3001
app.use((req, res) => res.sendFile(index))
// app.listen(port)
// const server = http.createServer(app)
const server = app.listen(port)

const io = socketIO(server)
var allClients = []
var allUsers = []
io.on("connection", (socket) => {
    // allClients.push(socket)
    console.log("Client connected.")
    // socket.emit()
    for(var i = 0; i < allUsers.length; ++i){
        socket.emit("username", allUsers[i])
    }


    socket.on("username", (user) => {
        console.log("User: ", user)
        allClients.push(socket)
        allUsers.push(user)
        socket.broadcast.emit("username", user)
    })

    socket.on("message", (data) => {
        // console.log("data: ", data)
        socket.broadcast.emit("message", data)
    })

    socket.on("Role", (data) => {
        console.log("received role: ", data)
        socket.emit("Role", data.role)
    })

    socket.on("disconnect", () => {
        // socket.broadcast.emit("disconnected")
        console.log("Client disconnected.")

        var i = allClients.indexOf(socket)
        console.log("Client disconnected: ", i, allUsers)
        allClients.splice(i, 1)
        allUsers.splice(i, 1)

        console.log("allClients: ", allClients.length, allUsers)
        socket.broadcast.emit("allUsers", allUsers)
    })
})
// const wss = new SocketServer({server: server, path: "/"})
//
// wss.on('connection', (ws) => {
//     console.log("Client connected")
//     ws.on('close', () => console.log("Client disconnected"))
// })
//
setInterval(() =>
    // wss.clients.forEach((client) => {
    //     client.send(new Date().toTimeString())
    // })
    io.emit("time", new Date().toTimeString())
, 1000)

console.log("Password generator listening on ${port}")

// var router = express.Router();



// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
