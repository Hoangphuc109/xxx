const express = require('express')
const {getPost, getPostId, updatePost, deletePost, addPost
} = require('../controlers/post.controller')

const router = express.Router()

//Get all Post
router.get('/', getPost)
//Get Post by Id
router.get('/:idPots', getPostId)
//Add Post
router.post('/', addPost)
//Update Post by Id
router.put('/:idPots', updatePost)
//Delete Post by Id
router.delete('/:idPots', deletePost)

module.exports = router