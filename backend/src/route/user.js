import { Router } from 'express';
import { authorizeUserMiddleware } from '../middleware/auth.js';
import * as userController from '../controller/user.js';

const userRoute = Router();

userRoute.post('/', userController.registerUser);
userRoute.get('/:uid', userController.getUser);
userRoute.patch('/:uid', authorizeUserMiddleware, userController.updateUser);
  
export default userRoute;
