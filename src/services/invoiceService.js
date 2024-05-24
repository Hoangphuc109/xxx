const connection = require('../config/database')

//Get Invoice
const getinvoice = async (req, res) => {
    let [results, fields] = await connection.query('SELECT * FROM rice_4_man.invoice;')
    return results
}

//Get Invoice by Id
const getinvoiceid = async (idInvoice) => {
    let [results, fields] = await connection.query('SELECT * FROM rice_4_man.invoice WHERE idInvoice = ?;', [idInvoice])
    let invoice = results && results.length > 0 ? results[0] : {}
    let [results2, fields2] = await connection.query('SELECT nameProduct, quanity, price, urlImage FROM rice_4_man.invoicedetails WHERE Invoice_idInvoice = ?;', [idInvoice])
    let detail = results2 && results2.length > 0 ? results2[0] : {}
    let invoicedetail = { ...invoice, ...detail }
    return invoicedetail
}

//Update Invoice 
const updateinvoice = async (idInvoice, total, purchaseDate, payment, state, isDone, userName, email, phoneNumber, address, users_id, nameProduct, quanity, price, urlImage) => {
    let query = 'UPDATE `rice_4_man`.`invoicedetails` SET `nameProduct` = ?, `quanity` = ?, `price` = ?WHERE `Invoice_idInvoice` = ?;';
    let params = [nameProduct, quanity, price, idInvoice];

    if (avatar) {
        query = 'UPDATE `rice_4_man`.`invoicedetails` SET `nameProduct` = ?, `quanity` = ?, `price` = ?, `urlImage` = ? WHERE `Invoice_idInvoice` = ?;';
        params = [nameProduct, quanity, price, urlImage, idInvoice];
    }

    let [results2, fields2] = await connection.query(query, params);
    let [results, fields] = await connection.query('UPDATE `rice_4_man`.`invoice` SET `total` = ?, `purchaseDate` = ?, `payment` = ?, `state` = ?, `isDone` = ?, `userName` = ?, `email` = ?, `phoneNumber` = ?, `address` = ?, `users_id` = ? WHERE `idInvoice` = ?;', [total, purchaseDate, payment, state, isDone, userName, email, phoneNumber, address, users_id, idInvoice])
}

module.exports = {
    getinvoice, updateinvoice, getinvoiceid
}