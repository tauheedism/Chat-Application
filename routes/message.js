const { Router } = require('express');

const express = require('express')
const router = express.Router();

const groupChatController = require('../controllers/group')
const userauthenticate = require('../middleware/Auth')
const userController = require('../controllers/user')
const chatController = require('../controllers/message')
const userAuthentication = require('../middleware/auth')


router.post('/chatsstart',userauthenticate.authentication,chatController.userMessage)

router.get('/getchats' , userauthenticate.authentication , chatController.getMessage)

router.post('/postgroupChatting',userAuthentication.authentication,groupChatController.groupMessage)

router.get('/getgroupChat',userAuthentication.authentication,groupChatController.groupdetails)

router.post('/postmessage/:id',userAuthentication.authentication,groupChatController.postMessage)

router.get('/getmessage/:id',groupChatController.getMessage)

router.post('/AddUser/:id',groupChatController.addUser)

router.get('/getUser/:id',userAuthentication.authentication,groupChatController.getUser)

router.post('/deleteUser/:id',groupChatController.deleteUser)

router.post('/makeAdmin/:id',groupChatController.MakeAdmin)

router.post('/removeAdmin/:id',groupChatController.RemoveAdmin)

module.exports = router;





