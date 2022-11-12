import { Router } from 'express';
import * as userController from '../controller/user.js';

const userRoute = Router();

userRoute.post('/', userController.registerUser);
userRoute.get('/:uid', userController.getUser);

export default userRoute;
