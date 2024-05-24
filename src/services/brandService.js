const connection = require('../config/database')

//Get all Brand 
const getbrands = async (req, res) => {
    let [results, fields] = await connection.query('SELECT * FROM rice_4_man.brand')
    return results
}

//Get Brand by Id
const getbrandid = async (idBrand) =>{
    let [results, fields] = await connection.query('SELECT * FROM rice_4_man.brand WHERE idBrand = ?', [idBrand])
    let brand = results && results.length > 0 ? results[0] : {};
    return brand
}

//Get id Brand max
const getidmax = async() => {
    let [results, fields] = await connection.query( 'SELECT MAX(`idBrand`) as max FROM `rice_4_man`.`Brand`' )
    return results[0].max
}

//Add Brand
const addbrand = async (idBrand, nameBrand, slug, urlImageBrand, order, anHien) => {
    let [results, fields] = await connection.query('INSERT INTO `rice_4_man`.`Brand` (`idBrand`, `nameBrand`, `slug`, `urlImageBrand`, `order`, `anHien`) VALUES (?, ?, ?, ?, ?, ?);', [idBrand, nameBrand, slug, urlImageBrand, order, anHien])
}
//Update Brand 
const updatebrand = async (idBrand, nameBrand, slug, urlImageBrand, order, anHien) => {
    let [results, fields] = await connection.query('UPDATE `rice_4_man`.`Brand` SET  `nameBrand` = ?, `slug` = ?, `urlImageBrand` = ?,`order` = ?, `anHien` = ? WHERE `idBrand` = ?;', [nameBrand, slug, urlImageBrand, order, anHien, idBrand])
}

//Delete Brand
const deletebrand = async(idBrand) =>{
    let [results, fields] = await connection.query('DELETE FROM rice_4_man.brand WHERE idBrand = ?;',[idBrand])
}

module.exports = {
    getbrands, getbrandid, getidmax, addbrand, updatebrand, deletebrand
}