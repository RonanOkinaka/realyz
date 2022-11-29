import { createHash } from 'crypto';
import * as fs from 'fs';

import pool from '../database.js';
import { ResError } from '../error.js';

export const MEDIA_TYPE = {
    PROFILE_IMAGE: 1,
    PROFILE_VIDEO: 2
}

export const VALID_MEDIA_TYPES = Object.values(MEDIA_TYPE);

// In a very similar approach to git, we compute the hash and organize
// everything as a shallow trie
function getFileHash(uid, type) {
    const hasher = createHash('sha256');

    // For now, each type of file is unique and will be overwrriten
    hasher.update(uid + ':' + type);

    return hasher.digest('hex');
}

function formatAbsolutePath(hash) {
    return [
        process.env.MEDIA_PATH + '/' +
        hash.slice(0, 2) + '/' +
        hash.slice(2, 4) + '/',
        hash.slice(4, 60)
    ];
}

async function mediaExists(hash) {
    const [exists] = await pool.query(
        'SELECT 1 FROM media WHERE hash = ?',
        [hash]
    );

    return exists && exists.length;
}

export async function uploadMedia(uid, type, file) {
    const hash = getFileHash(uid, type);

    // Insert into the database only if it is not already known
    // Note: completely pointless right now (but useful for extensibility)
    if (!await mediaExists(hash)) {
        await pool.query(
            'INSERT INTO media (uid, type, hash) VALUES (?, ?, ?)',
            [uid, type, hash]
        );
    }

    const [path, filename] = formatAbsolutePath(hash);
    await file.mv(path + filename);

    return [null, hash];
}

export function getMediaPath(uid, type) {
    const path = formatAbsolutePath(getFileHash(uid, type)).join('');
    return [path, fs.existsSync(path)];
}

export async function openFileStream(uid, type, start, end) {
    try {
        const [path, exists] = getMediaPath(uid, type);
        if (!exists) {
            return [
                new ResError(400, 'No such file exists'),
                null, null, null, null
            ];
        }

        const fstats = await fs.promises.stat(path);

        if (isNaN(start) && isNaN(end)) {
            return [
                null, fs.createReadStream(path),
                0, fstats.size, fstats.size
            ];
        }

        // I don't believe this case is possible
        if (isNaN(start)) {
            return [
                new ResError(400, 'Must provide start of range'),
                null, null, null, null
            ];
        }
        if (isNaN(end)) {
            // Two notes: first, the stream ranges are inclusive (why??);
            // second, we limit the amount of bytes per request for now
            end = Math.min(start + 2**15 + 1, fstats.size - 1);
        }

        return [
            null, fs.createReadStream(path, { start: start, end: end }),
            start, end + 1 - start, fstats.size
        ];
    } catch (exception) {
        console.error(exception);
        return [
            new ResError(500, 'Internal server error'),
            null, null, null, null
        ];
    }
}

export async function deleteMedia(uid, type) {
    const hash = getFileHash(uid, type);

    if (!await mediaExists(hash)) {
        return new ResError(400, 'No such media file exists');
    }

    await fs.promises.unlink(formatAbsolutePath(hash).join(''));

    await pool.query(
        'DELETE FROM media WHERE uid = ? AND type = ?',
        [uid, type]
    );

    return null;
}
