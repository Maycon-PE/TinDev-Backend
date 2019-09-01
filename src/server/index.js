require('dotenv').config()
const express = require('express')
const cors = require('cors')

require('../services/database/connection')

const port = process.env.PORT || 3001

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const connectedUsers = {

}

io.on('connection', socket => {
	const { user } = socket.handshake.query

	connectedUsers[user] = socket.id
})

app.use((req, res, next) => {
	req.io = io
	req.connectedUsers = connectedUsers

	next()
})

app.use(cors())
app.use(express.json())
require('./routes')(app)

http.listen(port, err => console.log(err? 'Error': `Running at :${port}` ))
