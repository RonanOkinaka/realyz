import jwt from 'jsonwebtoken';

export function authorizeUserMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized user' });
    }

    // Takes the form 'Bearer: (token)'
    const token = authHeader.split(' ')[1];
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (except) {
        return res.status(401).json({ error: 'Unauthorized user' });
    }

    req.body.uid = decoded['uid'];
    return next();
}
