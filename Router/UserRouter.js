const express = require('express')
const UserRouter = express.Router()
const UserCtrl = require('../Controller/UserCtrl')
// const UserProfileCtrl = require('../Controller/UserProfileCtrl')
const Auth = require('../Middalwares/Auth')
const {upload } = require('../Middalwares/Image')


// Userloyer all APIS 
UserRouter.post('/signup', UserCtrl.UserRegister)
UserRouter.post('/login', UserCtrl.UserLogin)
UserRouter.get('/detail/:UserID', UserCtrl.UserDetails) // id take in auth
UserRouter.put('/profile/:id', UserCtrl.UserProfileUpdate)
UserRouter.post('/sendmail/:id', UserCtrl.sendmail)


UserRouter.get('/list', UserCtrl.AllUserList)
UserRouter.post('/jobpost/:id', UserCtrl.JobPost) // job post by user 
UserRouter.get('/jobpost/all/list', UserCtrl.AllJobPostList) // job post all list

// // Userloyer Profile all APIS
// UserRouter.post('/profile/create',Auth, upload.single('Profile'), UserProfileCtrl.UserProCreate) // profile updated and created
// UserRouter.get('/profile/detail/:ProviderProID',Auth, UserProfileCtrl.UserProDetails) // profile updated and created
// UserRouter.post('/profile/create',Auth, UserProfileCtrl.UserProfileCreate)

module.exports = UserRouter
