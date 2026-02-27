const express = require('express');
const router = express.Router();
const { listFiles, getFileUrl } = require('./fileController');
const { verifyToken } = require('../auth/authMiddleware');

router.get('/list', verifyToken, listFiles);
router.get('/url', verifyToken, getFileUrl);

module.exports = router;
