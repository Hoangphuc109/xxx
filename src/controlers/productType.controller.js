const { json } = require('express')
const { gettype, gettypeid, addtype, updatetype, deletetype } = require('../services/productTypeSer')


//Get Product Type
const getType = async (req, res) => {
    try {
        let type = await gettype()
        return res.json({ Type: type })
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

//Get Product Type by id 
const getTypeId = async( req, res) => {
    try {
        let idtype = req.params.idType
        let type = await gettypeid(idtype)
        return res.json({Type: type})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

// Add Product Type
const addType = async (req, res) => {
    try {
        let { idType, nameType, slug, order, anHien } = req.body
        await addtype(idType, nameType, slug, order, anHien)
        return res.json('Add Successfull!')
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

//Update Product Type
const updateType = async (req, res) => {
    try {
        let {idType, nameType, slug, order, anHien} = req.body
        await updatetype(idType, nameType, slug, order, anHien)
        return res.json('Update Successful!')
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

//Delete Product Type
const deleteType = async (req, res) => {
    try {
        let idtype = req.params.idType
        await deletetype(idtype)
        return res.json('Delete Successful!')
    } catch (error) {
        return res.status(500).json({error: error.message})
    }

}

module.exports = {
    getType, addType, updateType, deleteType, getTypeId
}