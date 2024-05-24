const { json } = require('express')

const { getbrands, getbrandid, getidmax, addbrand, updatebrand, deletebrand

} = require('../services/brandService')

//Get all Brand
const getBrand = async (req, res) => {
    let results = await getbrands()
    return res.json({ Brands: results })
}

//Get Brand by Id
const getBrandId = async (req, res) => {
    let idbrand = req.params.idBrand
    let brand = await getbrandid(idbrand)
    return res.json({ Brands: brand })
}


//Add Brand
const addBrand = async (req, res) => {
    try {
        const idMax = await getidmax()
        let idBrand = idMax + 1
        let { nameBrand, slug, urlImageBrand, order, anHien } = req.body
        await addbrand(idBrand, nameBrand, slug, urlImageBrand, order, anHien)
        return res.json('Add Successful!')
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Update Brand
const updateBrand = async (req, res) => {
    try {
        let { idBrand, nameBrand, slug, urlImageBrand, order, anHien } = req.body
        await updatebrand(idBrand, nameBrand, slug, urlImageBrand, order, anHien)
        return res.json('Update Successful!')
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

//Delete Brand
const deleteBrand = async (req, res) => {
    try {
        let idbrand = req.params.idBrand
        await deletebrand(idbrand)
        return res.json('Delete Successful!')
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


module.exports = {
    getBrand, addBrand, updateBrand, deleteBrand, getBrandId
}