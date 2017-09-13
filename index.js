const express = require('express');
const path = require("path")
const http = require("http")
const generatePassword = require("password-generator")
// const SocketServer = require('ws').Server
const socketIO = require("socket.io")
const streamIO = require("socket.io-stream")
const cors = require("cors")
const formidable = require("formidable")
const fs = require("fs")
const busBoy = require("connect-busboy")

const app = express()

app.use(express.static(path.join(__dirname, "/client/build")))
app.use(cors())
app.use(busBoy())

app.get("/api/passwords", (req, res) => {
    const count = 5

    const passwords = Array.from(Array(count).keys()).map(i => generatePassword(12, false))

    res.json(passwords)

    //console.log("Sent ${count} passwords")
    console.log(`Sent ${count} passwords`)
})

app.post("/api/upload", (req, res, next) => {
    // var form = new formidable.IncomingForm()
    //
    // form.keepExtensions = true
    // form.parse(req, (err, fields, files) => {
    //     var tempFilePath = files.file['path']
    //     var userFileName = files.file['name']
    //     var contentType = files.file['type']
    //
    //     fs.readFile("./files", function(err, file_buffer){
    //         console.log("file_buffer: ", file_buffer)
    //     })
    // })
    res.json({value: "Hello World!"})
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
io.of('/').on("connection", (socket) => {
    // allClients.push(socket)
    console.log("Client connected.")

    const inFile = fs.createReadStream('video.mp4')
    // socket.emit()
    for(var i = 0; i < allUsers.length; ++i){
        socket.emit("username", allUsers[i])
    }

    // streamIO(socket).on('video', (stream, data) => {
    //     console.log("received video")
    //     var filename = path.basename(data.name)
    //     stream.pipe(fs.createWriteStream(filename))
    // })
    socket.on("video", (data) => {
        console.log("received video-data")
        // socket.broadcast.emit("video", data)
        // socket.emit("video", data)
        inFile.addListener('data', (nextData) => {
            socket.emit('video', nextData)
        })
    })

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
        if(data.role === "Meister"){
            socket.broadcast.emit("masterIsChosen", data.username)
        }
    })

    socket.on("rollDice", (data) => {
        socket.broadcast.emit("rollDice", data)
        socket.emit("rollDice", data)
    })

    socket.on("mail", (data) => {
        socket.broadcast.emit("mail", data)
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

console.log(`Password generator listening on ${port}`);
// var router = express.Router();



// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
