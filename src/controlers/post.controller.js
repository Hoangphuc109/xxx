const { json } = require('express');

const { getposts, getpostsId, getidmax, addpost, updatepost, deletepost

} = require('../services/postService')


//Get all Post
const getPost = async (req, res) => {
    let results = await getposts();
    return res.json({ Posts: results })
}

//Get Post by Id
const getPostId = async (req, res) => {
    const postid = req.params.idPots;
    let post = await getpostsId(postid);
    return res.json({ Post: post })
}

//Add Post
const addPost = async (req, res) => {
    try {
        const idMax = await getidmax()
        let idPots = idMax + 1
        let { thumbNail, content, author, postingDate, anHien, noiBat, title, slug } = req.body;
        await addpost(idPots, thumbNail, content, author, postingDate, anHien, noiBat, title, slug)
        return res.json('Add successful!')
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

//Delete Post by Id
const deletePost = async (req, res) => {
    try {
        const postid = req.params.idPots;
        await deletepost(postid);
        return res.json('Delete successful!')
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

//Update Post by Id
const updatePost = async (req, res) => {
    try {
        let { idPots, thumbNail, content, author, postingDate, anHien, noiBat, title, slug } = req.body;
        await updatepost(idPots, thumbNail, content, author, postingDate, anHien, noiBat, title, slug);
        return res.json('Update successful!');
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
};

module.exports = {
    getPost, getPostId, addPost, deletePost, updatePost,
};