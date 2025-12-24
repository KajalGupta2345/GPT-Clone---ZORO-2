const express = require('express');
const authController = require('../controllers/auth.controllers');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.post("/register",authController.registerUser);
router.post("/login",authController.loginUser);
router.post("/logout",authController.logoutUser);

router.get("/me", authMiddleware.authUser, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = router;