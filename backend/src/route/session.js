import { Router } from 'express';

import * as userController from '../controller/user.js';
import { authorizeUserMiddleware } from '../middleware/auth.js'

const sessionRoute = Router();

sessionRoute.post('/login', userController.login);
sessionRoute.get('/user',
    authorizeUserMiddleware,
    function(req, res) {
        return res.status(200).json({ uid: req.body.uid });
    }
);

export default sessionRoute;
