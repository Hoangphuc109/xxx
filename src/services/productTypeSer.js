const connection = require('../config/database')

//Get all Product Type
const gettype = async (req, res) => {
    let [results, fields] = await connection.query('SELECT * FROM rice_4_man.producttype;')
    return results
}

// Product Type by Id
const gettypeid = async (idType) => {
    let [results, fields] = await connection.query('SELECT * FROM rice_4_man.producttype WHERE idType = ?;', [idType])
    let type = results && results.length > 0 ? results[0] : {}
    return type
}

//Get id Type max
const getidmax = async() => {
    let [results, fields] = await connection.query( 'SELECT MAX(`idType`) as max FROM `rice_4_man`.`producttype`' )
    return results[0].max
}

//Add Product Type
const addtype = async (idType, nameType, slug, order, anHien) => {
    let [results, fields] = await connection.query('INSERT INTO `rice_4_man`.`ProductType` (idType, nameType, slug, `order`, anHien) VALUES (?, ?, ?, ?, ?);', [idType, nameType, slug, order, anHien])
}

//Update Product Type
const updatetype = async (idType, nameType, slug, order, anHien) => {
    let [results, fields] = await connection.query('UPDATE `rice_4_man`.`ProductType` SET nameType = ?, slug = ?, `order` = ?, anHien = ? WHERE idType = ?;', [nameType, slug, order, anHien, idType])
}

//Delete Product Type
const deletetype = async (idType) => {
    let[results, fields] = await connection.query('DELETE FROM `rice_4_man`.`ProductType` WHERE idType =?;', [idType])
}

module.exports = {
    gettype, gettypeid, getidmax, addtype, updatetype, deletetype
}