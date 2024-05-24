const { json } = require('express')

const { getcontact

} = require('../services/contactService')

//Get all Brand
const getContact = async (req, res) => {
    let results = await getcontact()
    results = results.map(contact => {
        contact.created_at = contact.created_at.toISOString().split('T')[0];
        contact.updated_at = contact.updated_at.toISOString().split('T')[0];
        return contact;
    });
    return res.json({ Contact: results })
}

module.exports = {
    getContact
}