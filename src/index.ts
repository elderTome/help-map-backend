import cors from 'cors'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const port = 3333
const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

app.use(cors())

app.get('/', (req, res) => {
  res.send('Servidor Socket.IO está rodando!')
})

io.on('connection', (socket) => {
  console.log(`Cliente ${socket.id} se conectou.`)

  socket.on('message', (mensagem) => {
    console.log(mensagem)
    io.emit('message', mensagem)
  })

  socket.on('disconnect', () => {
    console.log('Um cliente se desconectou.')
  })
})

server.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}/`)
})
