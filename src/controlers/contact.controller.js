const { json } = require('express')

const { getcontact

} = require('../services/contactService')

//Get all Brand
const getContact = async (req, res) => {
    let brand = await getcontact()
    return res.json({ Brands: brand })
}

module.exports = {
    getContact
}