const Result = require('../models/Result');

exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find().populate('quizId', 'title').sort({ submittedAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.submitResult = async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};