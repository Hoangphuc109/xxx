const express = require('express');
const { //get
    getAllInvoiceDetails, getInvoiceDetailsId,
    createInvoiceDetail,
    updateInvoiceDetail,
    deleteInvoiceDetail
} = require('../controlers/invoicedetail.controller');
const { upload } = require('../multer/multer')

const router = express.Router();
//-------------------------------------

router.get('/', getAllInvoiceDetails);
router.get('/:id', getInvoiceDetailsId)
router.post('/createInvoiceDetail', upload.single('urlImage'), createInvoiceDetail);
router.put('/updateInvoiceDetail/:id', upload.single('urlImage'), updateInvoiceDetail);
router.delete('/deleteInvoiceDetail/:id', deleteInvoiceDetail);


module.exports = router;