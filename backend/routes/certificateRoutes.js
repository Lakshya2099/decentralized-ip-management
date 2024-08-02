const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

router.post('/upload', uploadMiddleware, certificateController.upload);
router.post('/register', certificateController.register);
router.post('/verify', certificateController.verify);

module.exports = router;
