import { Router } from 'express';
import fileUpload from 'express-fileupload';

import * as mediaController from '../controller/media.js';
import { authorizeUserMiddleware } from '../middleware/auth.js';

const mediaRoute = Router();

mediaRoute.post('/:uid/:type',
    fileUpload({ createParentPath: true }),
    authorizeUserMiddleware,
    mediaController.uploadMedia
);

// This /u/ to allow for other access patterns later (/h/ in particular)
mediaRoute.get('/u/:uid/:type', mediaController.getMedia);

mediaRoute.delete('/u/:uid/:type',
    authorizeUserMiddleware,
    mediaController.deleteMedia
);

export default mediaRoute;
