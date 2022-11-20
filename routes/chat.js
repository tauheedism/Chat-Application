const { Router } = require('express');
const express = require('express')
const router = express.Router();

const userController = require('../controllers/user')
const chatController = require('../controllers/chat')
const userAuthentication = require('../middleware/auth')

router.post('/chatsstart',userAuthentication.authentication,chatController.userMessage)

router.get('/getchats' , userAuthentication.authentication , chatController.getMessage)

module.exports = router;