const { json } = require('express');

const { getproduct, getproductid, getproducttype, getproductnb
    , addproduct, deleteproduct, updateproduct,
    getidmax

} = require('../services/productService')

//Get Product
const getProducts = async (req, res) => {
    let results = await getproduct()
    results = results.map(product => {
        product.postingDate = product.postingDate.toISOString().split('T')[0];
        return product;
    });
    return res.json({ ListProduct: results })
}

//get Product by Id 
const getProductId = async (req, res) => {
    const productid = req.params.idProduct;
    let product = await getproductid(productid);
    return res.json({ ProductID: product })
}

//Get Product by idType
const getProductType = async (req, res) => {
    const productType = req.params.idType;
    let product = await getproducttype(productType);
    return res.json({ productType: product })
}

//Get Product Noi bat
const getProductNB = async (req, res) => {
    let productnb = await getproductnb()
    return res.json({ ProductNB: productnb })
}

//Add Product
const addProduct = async (req, res) => {
    try {
        const idMax = await getidmax()
        let idProduct = idMax + 1
        let { nameProduct, slug, price, urlImage, describe, postingDate, views, purchases, anHien, noiBat, ProductType_idType, Brand_idBrand } = req.body;
        await addproduct(idProduct, nameProduct, slug, price, urlImage, describe, postingDate, views, purchases, anHien, noiBat, ProductType_idType, Brand_idBrand)
        return res.json('Add Successful!')
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Delete Product
const deleteProduct = async (req, res) => {
    try {
        const productid = req.params.idProduct;
        await deleteproduct(productid)
        return res.json('Delete Successful!')
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Update Product
const updateProduct = async (req, res) => {
    try {
        let { idProduct, nameProduct, slug, price, urlImage, describe, postingDate, views, purchases, anHien, noiBat, ProductType_idType, Brand_idBrand } = req.body;
        await updateproduct(idProduct, nameProduct, slug, price, urlImage, describe, postingDate, views, purchases, anHien, noiBat, ProductType_idType, Brand_idBrand)
        return res.json('Update Successful!')
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getProducts, getProductId, getProductType, getProductNB
    , addProduct, deleteProduct, updateProduct
}