require('dotenv').config()
const { connect } = require('mongoose')

try {
	connect(process.env.URL_CONNECTION, {
		useNewUrlParser: true
	})
	console.log('MongoDB ok!')
} catch(e) {
	console.error('Crie um Clusters em https://cloud.mongodb.com e faça a conexão!')
}

module.exports = connect

