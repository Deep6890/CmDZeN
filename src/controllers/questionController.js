const Question = require('./../models/Questions');
const Answer = require('./../models/Answers');

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('userId', 'name avatar');
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('userId', 'name avatar')
      .populate({
        path: 'answers',
        populate: { path: 'userId', select: 'name avatar' }
      });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const { userId, title, content } = req.body;
    const question = new Question({ userId, title, content });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
