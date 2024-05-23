const express = require('express')
const router = express.Router()
const multer = require("multer");
const upload = multer();
const { upLoadImage, getImage } = require('../controlers/image.controller')

//Upload image
router.post('/', upload.any(), upLoadImage)

//Get Image
router.get('/get/:fileId', getImage)

module.exports = router