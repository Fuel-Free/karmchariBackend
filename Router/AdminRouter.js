const express = require('express')
const AdminRouter = express.Router()
const AdminCtrl = require('../Controller/AdminCtrl')
const Auth = require('../Middalwares/Auth')

AdminRouter.post('/signup', AdminCtrl.AdminRegister)
AdminRouter.post('/login', AdminCtrl.AdminLogin)

// Userloyer and Provider Profile deleted by admin
AdminRouter.delete('/User/profile/delete/:UserID', Auth, AdminCtrl.UserProfileDeleted)
AdminRouter.delete('/Provider/profile/delete/:CandID', Auth, AdminCtrl.ProviderProfileDeleted)

// Userloyer and Provider list apis by admin
AdminRouter.get('/Provider/list', Auth, AdminCtrl.AllProviderList)
AdminRouter.get('/User/list', Auth, AdminCtrl.AllUserList)

module.exports = AdminRouter
