const express = require('express')
const cors = require('cors')

const port = process.env.PORT || 3001

const connection = require('../services/database/connection')

const app = express()
app.use(cors())

app.use(express.json())

require('./routes')(app)

app.listen(port, err => console.log(err? 'Error': 'Running'))
