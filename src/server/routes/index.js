const fs = require('fs')
const { resolve } = require('path')

const files = fs.readdirSync(resolve(__dirname, 'endpointers'))

module.exports = app => { 
	files.forEach(filename => require(`./endpointers/${filename}`)(app))
}
