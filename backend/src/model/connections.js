import pool from '../database.js';
import { ResError } from '../error.js';

export const CONNECTION_STATUS = {
    PENDING: 0,
    ACCEPTED: 1
}

export async function getConnections(from, to, status) {
    let choice, args;
    if (from && to) {
        choice = 'uid_from = ? AND uid_to = ?';
        args = [from, to];
    } else if (from) {
        choice = 'uid_from = ?';
        args = [from];
    } else if (to) {
        choice = 'uid_to = ?';
        args = [to];
    } else {
        return [
            new ResError(400, 'Either to or from must be non-null'),
            null
        ];
    }

    if (status != undefined) {
        choice += ' AND status = ?';
        args.push(status);
    }

    const [connections] = await pool.query(`
        SELECT uid_to AS uidTo, uid_from AS uidFrom, status
        FROM connections WHERE ${choice}`,
        args
    );
    return [null, connections];
}

export async function getOneConnection(from, to, status) {
    const [_, connections] = await getConnections(from, to, status);
    return (!connections.length) ? null : connections[0];
}

async function addConnection(from, to, status) {
    await pool.query(
        'INSERT INTO connections (uid_to, uid_from, status) VALUES (?, ?, ?)',
        [to, from, status]
    );

    return null;
}

export async function addPendingConnection(from, to) {
    return await addConnection(from, to, CONNECTION_STATUS.PENDING);
}

export async function acceptPendingConnection(from, to) {
    const acceptQuery = `
    UPDATE connections
    SET status = ?
    WHERE uid_to = ? AND uid_from = ?`;

    // Upgrade pending to accepted (original `from` is current `to`)
    await pool.query(acceptQuery, [CONNECTION_STATUS.ACCEPTED, from, to]);

    // Then, create mutual connection the other direction
    await addConnection(from, to, CONNECTION_STATUS.ACCEPTED);
    return null;
}

export async function deleteConnection(from, to) {
    const delQuery = `
    DELETE FROM connections
    WHERE (uid_to = ? AND uid_from = ?) OR (uid_from = ? AND uid_to = ?)`;

    // Connections are mutual, so delete both
    await pool.query(delQuery, [from, to, from, to]);
    return null;
}
