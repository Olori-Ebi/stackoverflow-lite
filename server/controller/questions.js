import Questions from '../model/question';
import Answers from '../model/answers';

class questions {
  static getAllQuestions(req, res) {
    return res.send(Questions);
  }

  static getSingleQuestion(req, res) {
    // Check if id exists
    const found = Questions.some((Question) => Question.id === +(req.params.id));
    if (found) {
      res.send(Questions.filter((Question) => Question.id === +(req.params.id)));
    } else {
      return res.status(400).send({
        msg: `no question with the id of ${req.params.id}`,
      });
    }
  }

  static postQuestion(req, res) {
    const newQuestion = {
      id: req.body.id,
      title: req.body.title,
      body: req.body.body,
    };

    if (!newQuestion.title || !newQuestion.title || !newQuestion.body) {
      return res.status(400).send({
        msg: 'Please include an id, title and body',
      });
    }
    Questions.push(newQuestion);
    return res.send(Questions);
  }

  static postAnswer(req, res) {
    const id = +(req.params.id);
    const found = Questions.some((Question) => Question.id === id);

    if (found) {
      const newAnswer = {
        id,
        body: req.body.body,
      };
      if (!newAnswer.body) {
        res.status(400).send({
          msg: 'Body cannot be empty',
        });
      }
      Answers.push(newAnswer);
      res.send(Answers);
    } else {
      return res.status(400).send({
        msg: `no question with the id of ${req.params.id}`,
      });
    }
  }
}

export default questions;
