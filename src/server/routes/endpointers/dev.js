const Router = require('express').Router()

const dev = require('../controllers/dev')
const like = require('../controllers/like')
const dislike = require('../controllers/dislike')

Router.post('/devs', dev.store)
Router.get('/devs', dev.index)

Router.post('/devs/:devId/like', like.store )
Router.post('/devs/:devId/dislike', dislike.store )

module.exports = app => app.use(Router)
