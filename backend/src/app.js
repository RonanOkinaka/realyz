import express from 'express';

// Workaround to enforce early configuration
import './config.js';
import sessionRoute from './route/session.js';
import userRoute from './route/user.js';
import connectionRoute from './route/connections.js';
import searchRoute from './route/search.js';

// Set up Express.js routing
// TODO: some CORS and HTTPS configuration may be necessary here
const server = express();
server.use(express.json());
server.use('/session', sessionRoute);
server.use('/user', userRoute);
server.use('/connections', connectionRoute);
server.use('/search', searchRoute);

server.listen(process.env.PORT, function(err, _data) {
    if (err) {
        console.error(err);
    } else {
        console.log(`Listening on port ${process.env.PORT}`);
    }
});
