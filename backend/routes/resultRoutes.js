const express = require('express');
const router = express.Router();
const { getAllResults, submitResult } = require('../controllers/resultController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAllResults);
router.post('/', submitResult); // public - students submit

module.exports = router;