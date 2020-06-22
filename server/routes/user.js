import express from 'express';
import users from '../controller/userCtrl';
import userValidation from '../middleware/validateUser';

const userRouter = express.Router();

userRouter.route('/api/v1/auth/signup').post(userValidation.userValidationRules(), userValidation.validate, users.createUser);

userRouter.route('/api/v1/auth/signin').post(userValidation.userLoginRules(), userValidation.validate, users.login);

export default userRouter;
