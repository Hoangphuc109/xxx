const connection = require('../config/database')

//Get all Users
const getallusers = async () => {
    let [results, fields] = await connection.query('SELECT * FROM `rice_4_man`.`users`;')
    return results
}

//Get user by Id
const getuserid = async (id) => {
    let [results, fields] = await connection.query('SELECT * FROM `rice_4_man`.`users` WHERE id = ?;', [id])
    let user = results && results.length > 0 ? results[0] : {}
    return user
}

//Get id User max
const getidmax = async() => {
    let [results, fields] = await connection.query( 'SELECT MAX(`id`) as max FROM `rice_4_man`.`users`' )
    return results[0].max
}

//Add user
const adduser = async (id, name, email, phone, avatar, address, role, active, password, remember_token,) => {
    let [results, fields] = await connection.query(
        'INSERT INTO `rice_4_man`.`users` (`id`, `name`, `email`, `phone`,`avatar`,`address`, `role`, `active`, `password`,`email_verified_at`,`remember_token`,`created_at`,`updated_at` ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
        [id, name, email, phone, avatar, address, role, active, password, remember_token,],
    );
}

//delete user
const deleteuser = async (id) => {
    let [results, fields] = await connection.query(
        'DELETE FROM `rice_4_man`.`users`WHERE `id` = ?;',
        [id]
    )
}

//update user
const updateuser = async (id, name, email, phone, avatar, address, role, active, password, remember_token,) => {

    let query = 'UPDATE `rice_4_man`.`users` SET `name` = ?, `email` = ?, `phone` = ?, `address` = ?, `role` = ?, `active` = ?, `password` = ?, `email_verified_at` = CURRENT_TIMESTAMP, `remember_token` = ?, `created_at` = CURRENT_TIMESTAMP, `updated_at` = CURRENT_TIMESTAMP WHERE `id` = ?';
    let params = [name, email, phone, address, role, active, password, remember_token, id];

    // if (avatar) {
    //     query = 'UPDATE `rice_4_man`.`users` SET `name` = ?, `email` = ?, `phone` = ?, `avatar` = ?, `address` = ?, `role` = ?, `active` = ?, `password` = ?, `email_verified_at` = CURRENT_TIMESTAMP, `remember_token` = ?, `created_at` = CURRENT_TIMESTAMP, `updated_at` = CURRENT_TIMESTAMP WHERE `id` = ?';
    //     params = [name, email, phone, avatar, address, role, active, password, remember_token, id];
    // }

    let [results, fields] = await connection.query(query, params);
    return results;

}


module.exports = {
   getallusers, getuserid, getidmax,adduser, updateuser, deleteuser
}