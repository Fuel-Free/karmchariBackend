const express = require('express')
const Router = express.Router()
const ProviderCtrl = require('../Controller/ProviderCtrl')
const ProfileCtrl = require('../Controller/ProviderProfileCtrl')
const Auth = require('../Middalwares/Auth')
const {upload } = require('../Middalwares/Image')

Router.post('/signup', ProviderCtrl.ProviderRegister)
Router.post('/login', ProviderCtrl.ProviderLogin)
Router.get('/detail/:ID', ProviderCtrl.ProviderDetails)
Router.patch('/update',Auth, ProviderCtrl.ProviderUpdate)
Router.delete('/delete',Auth, ProviderCtrl.ProviderDelete)
Router.get('/list', ProviderCtrl.ProviderList)


Router.post('/profile/create/:ProviderID',  ProfileCtrl.ProfileCreate)
Router.get('/profile/detail/:ProviderID',  ProfileCtrl.Providerdetail)
Router.get('/product/search/',  ProfileCtrl.SearchJobTitle)

// const ProviderPrCtrl = require('../Controller/ProviderProfileCtrl')
// Router.post('/profile/delete', ProviderProCtrl.Providerdelete)


module.exports = Router
