const express = require('express')
const {getBrand, addBrand, updateBrand, deleteBrand, getBrandId
} = require('../controlers/brand.controller')

const router = express.Router()

//Get all Brand
router.get('/', getBrand)
//Get Brand by Id
router.get('/:idBrand', getBrandId)
//Add Brand
router.post('/', addBrand)
//Update Brand by Id
router.put('/:idBrand', updateBrand)
//Delete Brand by Id
router.delete('/:idBrand', deleteBrand)


module.exports = router