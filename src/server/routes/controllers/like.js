const Dev = require('../../../services/database/models/devSchema')

module.exports = {
	async store(req, res) {
		const { user } = req.headers
		const { devId: liked } = req.params

		try {
			const loggedDev = await Dev.findById(user)
			const targetDev = await Dev.findById(liked)

			if (!targetDev) return res.status(400).json({ ok: false, error: 'Dev não existe!' })

			if (targetDev.likes.includes(loggedDev._id))  {
				const loggedSocket = req.connectedUsers[user]
				const targetSocket = req.connectedUsers[liked]

				if (loggedSocket) {
					req.io.to(loggedSocket).emit('match', targetDev)
				}

				if (targetSocket) {
					req.io.to(targetSocket).emit('match', loggedDev)
				}
			}

			loggedDev.likes.push(targetDev._id)

			await loggedDev.save()

			res.json({ ok: true, loggedDev })	
		} catch(e) {
			res.status(400).json({ error: 'id mal formatado!' })			
		}	
	}
}
