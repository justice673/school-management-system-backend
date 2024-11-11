const {Router} = require("express");
const router = Router();

const passwordController = require("../src/controllers/passwordReset.controller");
const passwordMiddleware = require("../src/middlewares/passworReset.middleware");
router.post("/forgotpassword",passwordController.passwordReset);
router.post("/resetpassword/:token",passwordController.resetPassword);
router.post('/verifyotp', passwordController.verifyOtp);

module.exports = router;
