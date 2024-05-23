const express = require('express')
const {getContact
} = require('../controlers/contact.controller')

const router = express.Router()

//Get all Brand
router.get('/', getContact)



module.exports = router