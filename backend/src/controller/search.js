import * as userModel from '../model/user.js';

export async function searchUsers(req, res) {
    let err, results;

    try {
        const { wildcard } = req.query;
        delete req.query.wildcard;

        [err, results] = await userModel.searchUsers(req.query, wildcard);
        if (err !== null) {
            return res.status(err.code).json({ error: err.message });
        }
    } catch (except) {
        console.error(except);
        return res.status(500).json({ error: 'Internal server error' });
    }

    return res.status(200).json(results);
}
