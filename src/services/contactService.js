const connection = require('../config/database')

//Get Contact
const getcontact = async () => {
    let [results, fields] = await connection.query('SELECT * FROM `rice_4_man`.`contact`;')
    return results
}


module.exports = {
    getcontact, 
    
}