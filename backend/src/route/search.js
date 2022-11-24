import { Router } from 'express';
import { authorizeUserMiddleware } from '../middleware/auth.js';

import * as searchController from '../controller/search.js';

const searchRoute = Router();

searchRoute.get('/', function(req, res, next) {
    // If the user specifies a connection status, they must be logged in
    if (req.query.connected) {
        return authorizeUserMiddleware(req, res, next);
    }

    return next();
}, searchController.searchUsers);

export default searchRoute;
