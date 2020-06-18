import express from 'express';
import questions from '../controller/questions';

const questionRouter = express.Router();

questionRouter.route('/api/v1/questions').get(questions.getAllQuestions);
questionRouter.route('/api/v1/questions/:id').get(questions.getSingleQuestion);
questionRouter.route('/api/v1/questions').post(questions.postQuestion);
questionRouter.route('/api/v1/questions/:id/answers').post(questions.postAnswer);

export default questionRouter;
