const express = require("express");

const authController = require("../controllers/user.controller")

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login)

module.exports = router;