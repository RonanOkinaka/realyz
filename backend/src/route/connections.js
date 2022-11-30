import { Router } from 'express';

import * as connectionController from '../controller/connections.js';
import { authorizeUserMiddleware } from '../middleware/auth.js';

const connectionsRoute = Router();

/*
 * Create new pending or accept existing (POST connections?to=...)
 *
 * Get pending (GET connections?from=...&to=...&pending=1)
 * Get accepted (GET connections?from=...&to=...) [implicit: &pending=0]
 *
 * Delete connection/reject pending (DELETE connections?from=...&to=...)
 */

connectionsRoute.post('/',
    authorizeUserMiddleware,
    connectionController.createConnection
);

connectionsRoute.get('/:uid/count',
    connectionController.countConnections
);

connectionsRoute.get('/',
    authorizeUserMiddleware,
    connectionController.viewConnections
);

connectionsRoute.delete('/',
    authorizeUserMiddleware,
    connectionController.deleteConnection
);

export default connectionsRoute;
