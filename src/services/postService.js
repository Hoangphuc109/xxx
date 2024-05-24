const connection = require('../config/database')

//Get all Post
const getposts = async () => {
    let [results, fields] = await connection.query('SELECT * FROM `rice_4_man`.`posts`;')
    return results
}

//Get Post by Id
const getpostsId = async (id) => {
    let [results, fields] = await connection.query('SELECT * FROM `rice_4_man`.`posts` WHERE idPots = ?;', [id])
    let post = results && results.length > 0 ? results[0] : {}
    return post
}

//Get id Post max
const getidmax = async() => {
    let [results, fields] = await connection.query( 'SELECT MAX(`idPots`) as max FROM `rice_4_man`.`posts`' )
    return results[0].max
}

//Add Post
const addpost = async (idPots, thumbNail, content, author, postingDate, anHien, noiBat, title, slug) => {
    let [results, fields] = await connection.query(
        'INSERT INTO `rice_4_man`.`Posts` (`idPots`, `thumbNail`, `content`, `author`, `postingDate`, `anHien`, `noiBat`, `title`, `slug`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [idPots, thumbNail, content, author, postingDate, anHien, noiBat, title, slug]
    );
    return results;
}

//Delete Post by Id
const deletepost = async (idPots) => {
    let [results, fields] = await connection.query(
        'DELETE FROM `rice_4_man`.`posts`WHERE `idPots` = ?;',
        [idPots]
    )
}

//Update Post by Id
const updatepost = async (idPots, thumbNail, content, author, postingDate, anHien, noiBat, title, slug) => {
    let [results, fields] = await connection.query(
        'UPDATE `rice_4_man`.`Posts` SET `thumbNail` = ?, `content` = ?, `author` = ?, `postingDate` = ?, `anHien` = ?, `noiBat` = ?, `title` = ?, `slug` = ? WHERE `idPots` = ?',
        [thumbNail, content, author, postingDate, anHien, noiBat, title, slug, idPots]
    );
    return results;
}


module.exports = {
    getposts, getpostsId, getidmax, addpost, deletepost, updatepost
}