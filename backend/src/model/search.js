import pool from '../database.js';
import { ResError } from '../error.js';
import * as userModel from './user.js';

function canSearchField(field) {
    const colData = userModel.USERS_TABLE_COLUMNS[field];
    return colData && colData.isReal && colData.canSearch;
}

function generateSimpleSql(queryData) {
    let args = [];
    const err = userModel.generateUserColumnSql(
        queryData, args, args, canSearchField
    );

    if (err !== null) {
        return [err, null, null];
    }

    return [null, Array(args.length / 2).fill('(?? = ?)'), args];
}

function generateWildcardSql(queryData) {
    let args = [], whereClauses = [];
    for (var field in queryData) {
        // Cannot search with LIKE for this field
        if (field == 'type') {
            args.push(field);
            args.push(queryData[field]);

            whereClauses.push('(?? = ?)');
            continue;
        }

        if (!canSearchField(field)) {
            return [new ResError(400, `Invalid field '${field}'`), null, null];
        }

        // To prevent a full table scan, we don't allow strings that would
        // take the form '%', and escape all wildcards
        const argStr = queryData[field];
        if (!argStr.length) {
            return [
                new ResError(400, 'No empty strings allowed with wildcard'),
                null, null
            ];
        }

        args.push(field);
        args.push(argStr.replaceAll('%', '\\%').replaceAll('_', '\\_') + '%');
        whereClauses.push('(?? LIKE ?)')
    }

    return [null, whereClauses, args];
}

export async function searchUsers(queryData, wildcard, connected, uid) {
    const [err, whereClauses, args] = (wildcard)
        ? generateWildcardSql(queryData)
        : generateSimpleSql(queryData);

    if (err !== null) {
        return [err, null];
    }

    let joinClause = '';
    if (connected) {
        joinClause = `
            INNER JOIN connections
            ON users.uid = connections.uid_to
        `;
        whereClauses.push('(connections.uid_from = ?)');
        args.push(uid);
    }

    if (!args.length) {
        return [
            new ResError(400, 'Must provide fields by which to search'),
            null
        ];
    }

    console.log(`
    SELECT * FROM users
    ${joinClause}
    WHERE ${whereClauses.join(' AND ')}`);
    console.log(args);

    const [results] = await pool.query(`
        SELECT * FROM users
        ${joinClause}
        WHERE ${whereClauses.join(' AND ')}`, args
    );
    return [null, results];
}

export async function getRandomUsers() {
    const [results] = await pool.query(
        'SELECT * FROM users ORDER BY RAND() LIMIT 20'
    );
    return results;
}
