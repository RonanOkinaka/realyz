import jwt from 'jsonwebtoken';

import * as userModel from '../model/user.js';

// Attempt to add a user to the database and report an error if one occurs
export async function registerUser(req, res) {
    const { uid, pass } = req.body;

    if (!uid || !pass) {
        return res.status(400).json({ error: 'Missing username or password' });
    }

    // These are dealt with separately
    delete req.body.uid;
    delete req.body.pass;

    try {
        const err = await userModel.registerUser(uid, pass, req.body);

        if (err !== null) {
            console.error(err.message);
            return res.status(err.code).json({ error: err.message });
        }
    } catch (except) {
        console.error(except);
        return res.status(500).json({ error: 'Internal server error' });
    }

    // If we've successfully created the account, redirect to it
    return res.status(201).location(`/user/${req.body.uid}`);
}

// Check uid/pass for consistency
export async function login(req, res) {
    const { uid, pass } = req.body;
    if (!uid || !pass) {
        return res.status(400).json({
            error: 'Username or password not provided!'
        });
    }

    let token;
    try {
        if (!await userModel.checkPassword(uid, pass)) {
            return res.status(403).json({
                error: 'Incorrect username/password'
            });
        }

        token = jwt.sign(
            { uid: uid },
            process.env.JWT_SECRET,
            { expiresIn: '6h' }
        );
    } catch (except) {
        console.error(except);
        return res.status(500).json({ error: 'Internal server error' });
    }

    // Return a JWT
    return res.status(200).json({ uid: uid, token: token });
}
