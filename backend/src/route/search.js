import { Router } from 'express';

import * as searchController from '../controller/search.js';

const searchRoute = Router();

searchRoute.get('/', searchController.searchUsers);

export default searchRoute;
