const express = require('express');
const router = express.Router();
const { getAllQuizzes, createQuiz, getQuizById, updateQuiz, deleteQuiz } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getAllQuizzes);
router.post('/', protect, createQuiz);
router.get('/:id', protect, getQuizById);
router.put('/:id', protect, updateQuiz);
router.delete('/:id', protect, deleteQuiz);

module.exports = router;