import express, { application } from 'express';
import cors from 'cors';

// Workaround to enforce early configuration
import './config.js';
import sessionRoute from './route/session.js';
import userRoute from './route/user.js';
import connectionRoute from './route/connections.js';
import mediaRoute from './route/media.js';

const corsOptions = {
    origin: 'http://localhost:9500',
    credentials: true,
    optionsSuccessStatus: 200,
}

const PORT = process.env.PORT;  //localhost port
// Set up Express.js routing
// TODO: some CORS and HTTPS configuration may be necessary here
const server = express();
server.use(cors(corsOptions));
server.use(express.json());
server.use('/session', sessionRoute);
server.use('/user', userRoute);
server.use('/connections', connectionRoute);
server.use('/media', mediaRoute);

server.listen(PORT, function(err, _data) {
    if (err) {
        console.error(err);
    } else {
        console.log(`Listening on port ${process.env.PORT}`);
    }
});
