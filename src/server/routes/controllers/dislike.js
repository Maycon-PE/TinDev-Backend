const Dev = require('../../../services/database/models/devSchema')

module.exports = {
	async store(req, res) {
		const { user } = req.headers
		const { devId: liked } = req.params
		try {
			const loggedDev = await Dev.findById(user)
			const targetDev = await Dev.findById(liked)

			if (!targetDev) return res.status(400).json({ ok: false, error: 'Dev não existe!' })

			if (!loggedDev.dislikes.includes(targetDev._id)) loggedDev.dislikes.push(targetDev._id)

			await loggedDev.save()

			res.json({ ok: true, loggedDev })	
		} catch(e) {
			res.status(400).json({ ok: false, error: 'id mal formatado!' })			
		}
	}
}
