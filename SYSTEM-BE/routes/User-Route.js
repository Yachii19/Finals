const express = require("express");
// Express routing component
const router = express.Router();
const userController = require("../controllers/User-Controllers.js");
const { verify } = require("../auth.js")


// User Registration
router.post("/register", userController.registerUser);

// User Login
router.post("/login", userController.loginUser);

// Check if email exists
router.post("/check-email", userController.checkEmail);

// Check User Details
router.post("/details", verify, userController.getProfile);

// 
router.post("/enroll", verify, userController.enroll);

// Update user password
router.put("/update/:userId", verify, userController.updatePassword);

module.exports = router;