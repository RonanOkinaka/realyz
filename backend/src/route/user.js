import { Router } from 'express';
import * as userController from '../controller/user.js';

const userRoute = Router();

userRoute.post('/', userController.registerUser);

export default userRoute;
