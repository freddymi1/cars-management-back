/**
 * All route for users auth
 * get('/') for fetching all users
 * get('/user') for fetching all user where user.role as user
 * get('/moderator') for fetching all user where user.role as moderator
 * get('/admin') for fetching all user where user.role as admin
 * get('/:id') for fetching one user
 */

const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");
const router = require("express").Router()

router.get("/all", userController.allAccess);

router.get("/user", [authJwt.verifyToken], userController.userBoard);

router.get(
  "/moderator",
  [authJwt.verifyToken, authJwt.isModerator],
  userController.moderatorBoard
);

router.get(
  "/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.adminBoard
);
router.get("/", userController.getAllUsers)
router.get("/:id", userController.getOneUser)

module.exports = router;