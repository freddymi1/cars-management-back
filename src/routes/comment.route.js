/**
 * All routes for  comment
 */

const router = require("express").Router();
const {verifyCar} = require("../middleware")

const CommentContoller = require("../controllers/comment.contoller")

router.get('/:id', CommentContoller.getAllComment);
router.post('/:id', CommentContoller.PostComment)

module.exports = router;