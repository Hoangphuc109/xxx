const express = require('express');
const multer = require('multer')
const {upload} = require('../multer/multer')
const { getProducts, getProductId, getProductType, getProductNB
    ,addProduct, deleteProduct, updateProduct
} = require('../controlers/product.contronller');
const router = express.Router();


//Get all Product
router.get('/', getProducts)
//Get Product by Type
router.get('/type/:idType', getProductType)
//Get Product by Id
router.get('/id/:idProduct', getProductId)
//Get Product Noi bat
router.get('/noibat', getProductNB)
//Add Product
router.post('/', addProduct)
//Delete Product by Id 
router.delete('/id/:idProduct', deleteProduct)
//Update Product by Id
router.put('/id/:idProduct', updateProduct)

module.exports = router;