import express from 'express';
import questions from '../controller/questions';
import AuthUser from '../middleware/authenticateUser';
import validateQuestion from '../middleware/validateQuestion';

const questionRouter = express.Router();

questionRouter.route('/api/v1/questions').post(
  AuthUser.verifyUser,
  validateQuestion.questionValidationRules(), validateQuestion.validate,
  questions.postQuestion,
);

export default questionRouter;
