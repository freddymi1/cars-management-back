/**
 * All route for users auth
 * post('/signup') for adding users
 * post('/signin') for login user
 */

const {verifySignUp} = require("../middleware");
const authController = require("../controllers/auth.controller");
const router = require("express").Router()



router.post(
  "/signup",
  [
    verifySignUp.checkNameOrEmail,
    verifySignUp.checkRoleExiste
  ],
  authController.signup
);

router.post("/signin", authController.signin);

module.exports = router;
