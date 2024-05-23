const express = require('express')
const { getUser, getUserId, createUser, deleteUser, updateUserById,
} = require('../controlers/user.controller')

const router = express.Router()

//Get all Post
router.get('/', getUser)
//Get Post by Id
router.get('/:id', getUserId)
//Add Post
router.post('/', createUser)
//Update Post by Id
router.put('/:id', updateUserById)
//Delete Post by Id
router.delete('/:id', deleteUser)

module.exports = router