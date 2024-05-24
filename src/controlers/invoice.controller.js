const { json } = require('express')
const { getinvoice, getinvoiceid, updateinvoice } = require('../services/invoiceService')

//Get Invoice 
const getInvoice = async (req, res) => {
    let results = await getinvoice()
    results = results.map(invoice => {
        invoice.purchaseDate = invoice.purchaseDate.toISOString().split('T')[0];
        return invoice;
    });
    return res.json({ Invoice: results })
}

//Get Invoice by Id
const getInvoiceID = async (req, res) => {
    try {
        let idinvoice = req.params.idInvoice
        let invoice = await getinvoiceid(idinvoice)
        return res.json({ Invoice: invoice })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Update Invoice
const updateInvoice = async (req, res) => {
    try {
        let { idInvoice, total, purchaseDate, payment, state, isDone, userName, email, phoneNumber, address, users_id, nameProduct, quanity, price, urlImage } = req.body
        await updateinvoice(idInvoice, total, purchaseDate, payment, state, isDone, userName, email, phoneNumber, address, users_id, nameProduct, quanity, price, urlImage)
        return res.json('Update Successful!')
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getInvoice, updateInvoice, getInvoiceID
}