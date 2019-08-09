const { connect } = require('mongoose')

try {
	const { username, password } = require('./credentials/mongoAtlas.json')

	connect(`mongodb+srv://${username}:${password}@cluster0-gjb1j.mongodb.net/omnistack8?retryWrites=true&w=majority`, {
		useNewUrlParser: true
	})
	console.log('MongoDB ok!')
} catch(e) {
	console.error('Crie um Clusters em https://cloud.mongodb.com e faça a conexão!')
}

module.exports = connect

