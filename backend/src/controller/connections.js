import * as connectionsModel from '../model/connections.js';

export async function createConnection(req, res) {
    // `from` is essentially useless here but is included for
    // consistency with other endpoints
    let { from, to } = req.query;

    if (from && from !== req.body.uid) {
        return res.status(403).json({
            error: 'Cannot add connections for other users'
        });
    } else if (!from) {
        // Not RESTful, but more intuitive
        from = req.body.uid;
    }

    if (!to || to === from) {
        return res.status(400).json({
            error: 'Must provide connection target'
        });
    }

    const connLoc = `/connections?from=${from}&to=${to}`;

    // First, check if we're already connected
    const connection = await connectionsModel.getOneConnection(from, to);

    if (connection !== null) {
        if (connection.status == connectionsModel.CONNECTION_STATUS.PENDING) {
            return res.status(409).json({
                error: 'Pending request already exists',
                href: connLoc
            });
        }
        if (connection.status == connectionsModel.CONNECTION_STATUS.ACCEPTED) {
            return res.status(409).json({
                error: 'Already connected',
                href: connLoc
            });
        }
    }

    // We also need to check if they have requested to connect with us
    // Note that connections are mutual so this can only be pending
    const request = await connectionsModel.getOneConnection(to, from);
    if (request !== null) {
        await connectionsModel.acceptPendingConnection(from, to);
    } else {
        await connectionsModel.addPendingConnection(from, to);
    }

    return res.status(201).location(connLoc).send();
}

export async function viewConnections(req, res) {
    const { from, to, pending } = req.query;

    if (!from && !to) {
        return res.status(400).json({
            error: 'Must provide requester or requestee of connection'
        });
    } if (from !== req.body.uid && to !== req.body.uid) {
        return res.status(403).json({
            error: 'Cannot see connections from other users'
        });
    }

    let status = connectionsModel.CONNECTION_STATUS.PENDING;
    if (!pending) {
        status = connectionsModel.CONNECTION_STATUS.ACCEPTED;
    }

    const [err, connections] = await connectionsModel.getConnections(
        from, to, status
    );

    if (err !== null) {
        return res.status(err.code).json({ error: err.message });
    } else {
        return res.status(200).json({ connections: connections });
    }
}

export async function deleteConnection(req, res) {
    let { from, to } = req.query;
    const uid = req.body.uid;

    if (!from && !to) {
        return res.status(400).json({
            error: 'Must provide requester or requestee of connection'
        });
    } else if (!from) {
        // If only `to`, delete connection from us
        from = uid;
    } else if (!to) {
        // If only `from`, delete connection from someone else to us
        to = uid;
    } else if (from !== uid && to !== uid) {
        // If they both exist, at least one must be us
        return res.status(403).json({
            error: 'Cannot delete connections for other users'
        });
    }

    if (from === uid && to === uid) {
        return res.status(400).json({
            error: 'Cannot delete connection to self'
        });
    }

    await connectionsModel.deleteConnection(from, to);
    return res.status(204).send();
}
