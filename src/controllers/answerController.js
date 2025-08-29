const Answer = require('./../models/Answers');
const Question = require('./../models/Questions');

exports.createAnswer = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const questionId = req.params.id;

    const answer = new Answer({ userId, questionId, content });
    await answer.save();

    // Add answer to question
    const question = await Question.findById(questionId);
    question.answers.push(answer._id);
    await question.save();

    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
