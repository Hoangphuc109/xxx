const { json } = require('express');

const { getallusers, getuserid, getidmax, adduser, updateuser, deleteuser
} = require('../services/userService')

//Get user
const getUser = async (req, res) => {
    let results = await getallusers();
    results = results.map(product => {
        product.email_verified_at = product.updated_at.toISOString().split('T')[0];
        product.created_at = product.created_at.toISOString().split('T')[0];
        product.updated_at = product.updated_at.toISOString().split('T')[0];
        return product;
    });
    return res.json({ user: results })

}

//Get User by Id
const getUserId = async (req, res) => {
    const userid = req.params.id;
    let user = await getuserid(userid);
    return res.json({ user })
}

//Add user
const createUser = async (req, res) => {
    try {
        const idMax = await getidmax()
        let id = idMax + 1
        let { name, email, phone, avatar, role, active, password, address, remember_token, } = req.body;
        await adduser(id, name, email, phone, avatar, address, role, active, password, remember_token,)
        return res.json('Add user successful!')
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

};

//delete user by id
const deleteUser = async (req, res) => {
    try {
        const userid = req.params.id;
        await deleteuser(userid);
        return res.json('Delete successful!')
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

};



//update user by id
const updateUserById = async (req, res) => {
    try {
        let { id, name, email, phone, avatar, role, active, password, address, email_verified_at, remember_token, created_at, updated_at, } = req.body;
        await updateuser(id, name, email, phone, avatar, address, role, active, password, email_verified_at, remember_token, created_at, updated_at)
        return res.json('Update successful!')
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

};


module.exports = {
    getUser, getUserId, createUser, deleteUser, updateUserById,
};