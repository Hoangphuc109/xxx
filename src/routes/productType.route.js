const express = require('express')
const {getType, addType, updateType, deleteType, getTypeId} = require ('../controlers/productType.controller')

const router = express.Router()

//Get Product Type
router.get('/', getType)
//Get Type by Id
router.get('/:idType', getTypeId)
//Add Product Type
router.post('/', addType)
//Update Product Type 
router.put('/:idType', updateType)
//Delete Product Type
router.delete('/:idType', deleteType)

module.exports = router