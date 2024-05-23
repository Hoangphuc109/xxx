const express = require ('express')
const {getInvoice, getInvoiceID, updateInvoice} = require ('../controlers/invoice.controller')

const router = express.Router()

//Get Invoice
router.get('/', getInvoice)
//Get Invoice by Id
router.get('/:idInvoice', getInvoiceID)
//Update Invoice by Id
router.put('/:idInvoice', updateInvoice)

module.exports = router