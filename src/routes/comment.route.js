/**
 * All routes for  comment
 */

const router = require("express").Router();
const {verifyCar, authJwt} = require("../middleware")

const CommentContoller = require("../controllers/comment.contoller")

router.get('/:id', [authJwt.verifyToken], CommentContoller.getAllComment);
router.post('/:id',[authJwt.verifyToken], CommentContoller.PostComment)

module.exports = router;