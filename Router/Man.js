const express = require('express')
const Router = express.Router()
const UserRouter = require('./UserRouter')
const ProviderRouter = require('./ProviderRouter')
const AdminRouter = require('./AdminRouter')

Router.use('/User', UserRouter)
Router.use('/Provider', ProviderRouter)
Router.use('/admin', AdminRouter)

module.exports = Router
