import * as searchModel from '../model/search.js';

export async function searchUsers(req, res) {
    try {
        const { wildcard, connected } = req.query;
        delete req.query.wildcard;
        delete req.query.connected;

        const { uid } = req.body;

        const [err, results] = await searchModel.searchUsers(
            req.query, wildcard, connected, uid
        );
        if (err !== null) {
            return res.status(err.code).json({ error: err.message });
        }

        return res.status(200).json(results);
    } catch (except) {
        console.error(except);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
