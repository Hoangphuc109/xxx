const connection = require('../config/database');
const getInvoiceDetails = async () => {
    let [results, fields] = await connection.query('SELECT * FROM `rice_4_man`.`InvoiceDetails`;');
    return results;
};

const addInvoiceDetail = async (idInvoiceDetails, idInvoice, idProduct, nameProduct, quanity, price, urlImage, Invoice_idInvoice, Product_idProduct) => {
    let [results, fields] = await connection.query(
        'INSERT INTO `rice_4_man`.`InvoiceDetails` (`idInvoiceDetails`,`idInvoice`, `idProduct`, `nameProduct`, `quanity`, `price`, `urlImage`, `Invoice_idInvoice`, `Product_idProduct`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [idInvoiceDetails, idInvoice, idProduct, nameProduct, quanity, price, urlImage, Invoice_idInvoice, Product_idProduct]
    );
    return results;
};

const getInvoiceDetailid = async (id) => {
    let [results, fields] = await connection.query('SELECT * FROM `rice_4_man`.`InvoiceDetails` WHERE idInvoiceDetails = ?;', [id])
    return results
}

const queryupdateInvoiceDetail = async (idInvoiceDetails, idInvoice, idProduct, nameProduct, quanity, price, urlImage, Invoice_idInvoice, Product_idProduct) => {

    let query = 'UPDATE `rice_4_man`.`InvoiceDetails` SET `idInvoice` = ?, `idProduct` = ?, `nameProduct` = ?, `quanity` = ?, `price` = ?, `Invoice_idInvoice` = ?, `Product_idProduct` = ? WHERE `idInvoiceDetails` = ?';
    let params = [idInvoice, idProduct, nameProduct, quanity, price, Invoice_idInvoice, Product_idProduct, idInvoiceDetails];
    if (urlImage) {
        query = 'UPDATE `rice_4_man`.`InvoiceDetails` SET `idInvoice` = ?, `idProduct` = ?, `nameProduct` = ?, `quanity` = ?, `price` = ?, `urlImage` = ?, `Invoice_idInvoice` = ?, `Product_idProduct` = ? WHERE `idInvoiceDetails` = ?';
        params = [idInvoice, idProduct, nameProduct, quanity, price, urlImage, Invoice_idInvoice, Product_idProduct, idInvoiceDetails];

    }
    let [results, fields] = await connection.query(query, params);
    return results;
};

const querydeleteInvoiceDetail = async (idInvoiceDetails) => {
    let [results, fields] = await connection.query(
        'DELETE FROM `rice_4_man`.`InvoiceDetails` WHERE `idInvoiceDetails` = ?',
        [idInvoiceDetails]
    );
    return results;
};

const getidmax = async () => {
    let [results, fields] = await connection.query('SELECT MAX(`idInvoiceDetails`) as max FROM `rice_4_man`.`InvoiceDetails`')
    return results[0].max
}

module.exports = {
    getidmax, querydeleteInvoiceDetail, queryupdateInvoiceDetail,
    getInvoiceDetailid, addInvoiceDetail, getInvoiceDetails
};