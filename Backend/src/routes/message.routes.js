const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const messageController = require('../controllers/message.controller');

const router = express.Router();

router.get(
  "/:chatId",
  authMiddleware.authUser,
  messageController.getMessage
);

module.exports = router;