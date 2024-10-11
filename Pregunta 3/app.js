const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)

const{Server} = require('socket.io')
const io = new Server(server)

app.use(express.static('Cliente'));

io.on('connection', (socket) =>{
    console.log('Un usuario se ha conectado')

    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado')
    })

    socket.on('chat', (msg) => {
        console.log('Mensaje: ' + msg)
        io.emit('chat',msg)
    })
})

app.get('/', (req,res) => {
    res.sendFile(`${__dirname}/cliente/index.html`)
})

server.listen(2500, () => {
    console.log('Servidor corriendo en http://localhost:2500')
})

