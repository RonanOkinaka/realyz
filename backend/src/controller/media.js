import * as ftype from 'file-type';

import * as mediaModel from '../model/media.js';

export async function uploadMedia(req, res) {
    let { uid, type } = req.params;

    if (uid != req.body.uid) {
        return res.status(403).json({
            error: 'Cannot upload files for other users'
        });
    }

    type = parseInt(type);
    if (!mediaModel.VALID_MEDIA_TYPES.includes(type)) {
        return res.status(400).json({
            error: 'Must provide media type'
        });
    }

    try {
        if (!req.files || !Object.keys(req.files).length) {
            return res.status(400).json({
                error: 'Must upload a file'
            });
        }

        const file = req.files.file;
        const mime = (await ftype.fileTypeFromBuffer(file.data)).mime;

        if (type == mediaModel.MEDIA_TYPE.PROFILE_IMAGE) {
            if (!['image/jpeg', 'image/png'].includes(mime)) {
                return res.status(400).json({
                    error: 'Only jpeg and png images are supported'
                });
            }
        } else if (type == mediaModel.MEDIA_TYPE.PROFILE_VIDEO) {
            if (mime != 'video/mp4') {
                return res.status(400).json({
                    error: 'Only mp4 videos are supported'
                });
            }
        }

        const [err, path] = await mediaModel.uploadMedia(
            uid, type, file
        );
        if (err !== null) {
            return res.status(err.code).json({
                error: err.message
            });
        }

        return res.status(201).location(path).send();
    } catch (exception) {
        console.log(exception);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}

async function sendVideoPartial(uid, type, range, res) {
    // Takes the form `bytes=start-end`
    let [start, end] = range.slice(6).split('-');

    const [err, stream, begin, len, total] = await mediaModel.openFileStream(
            uid, type, parseInt(start), parseInt(end)
    );

    if (err !== null) {
        return res.status(err.code).json({
            error: err.message
        });
    }

    res.writeHead(206, {
        'Content-Length': len,
        'Content-Type': 'video/mp4',
        'Content-Range': `bytes ${begin}-${begin + len - 1}/${total}`,
        'Accept-Ranges': 'bytes',
    });

    stream.pipe(res);
    return null;
}

async function sendVideoFull(uid, type, res) {
    const [err, stream, _, total] = await mediaModel.openFileStream(
        uid, type, NaN, NaN
    );

    if (err !== null) {
        return res.status(err.code).json({
            error: err.message
        });
    }

    // We don't want to close the connection just yet, as with send()
    res.writeHead(200, {
        'Content-Length': total,
        'Content-Type': 'video/mp4'
    });

    stream.pipe(res);
    return null;
}

export async function getMedia(req, res) {
    const { uid, type } = req.params;
    const { range } = req.headers;

    if (!uid || !type) {
        return res.status(400).json({
            error: 'Must provide both uid and media type'
        });
    }

    if (type == mediaModel.MEDIA_TYPE.PROFILE_IMAGE) {
        const [path, exists] = mediaModel.getMediaPath(uid, type);
        if (!exists) {
            return res.status(400).json({
                error: 'No such file exists'
            });
        }

        return res.sendFile(path);
    } else if (range) {
        return await sendVideoPartial(uid, type, range, res);
    } else {
        return await sendVideoFull(uid, type, res);
    }
}

export async function deleteMedia(req, res) {
    let { uid, type } = req.params;

    if (uid != req.body.uid) {
        return res.status(403).json({
            error: 'Cannot delete the files of other users'
        });
    }

    type = parseInt(type);
    if (!mediaModel.VALID_MEDIA_TYPES.includes(type)) {
        return res.status(400).json({
            error: 'Must provide media type'
        });
    }

    try {
        const err = await mediaModel.deleteMedia(uid, type);
        if (err !== null) {
            return res.status(err.code).json({
                error: err.message
            });
        }

        return res.status(204).send();
    } catch (exception) {
        console.log(exception);
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}
