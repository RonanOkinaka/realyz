import bcrypt from 'bcryptjs';

import pool from '../database.js';
import { ResError } from '../error.js';

// Lists all columns in the users table and whether they can be edited
// after account creation
const USERS_TABLE_COLUMNS = {
    uid: false,
    pass: false,
    email: true,
    fname: true,
    lname: true,
    type: true,
    company: true,
    biography: true
};

// Returns true iff. the column exists in the users table and can be changed
function canEditColumn(field) {
    return !!USERS_TABLE_COLUMNS[field];
}

// For now, this is only used to pepper the passwords (but that can change)
function processPass(pass) {
    return pass + process.env.PEPPER;
}

// Get user information given their uid
async function getUserData(uid, fields = '*') {
    const [user] = await pool.query(
        `SELECT ${fields} FROM users WHERE uid = ?`,
        [uid]
    );

    return user[0];
}

// Register a new user in the database
export async function registerUser(uid, pass, userData) {
    if (await getUserData(uid)) {
        return new ResError(409, `Username '${uid}' already taken`);
    }

    // Generate the salted, hashed password
    const salt = bcrypt.genSaltSync(8);
    const hashedPass = bcrypt.hashSync(processPass(pass), salt);

    // Generate our SQL query
    let userDataFields = ['uid'];
    let userDataValues = [uid];
    for (var key in userData) {
        if (!canEditColumn(key)) {
            return new ResError(400, `Invalid field '${key}'`);
        }

        userDataFields.push(key);
        userDataValues.push(userData[key]);
    }

    // Note that there are two tables here:
    //  - users (stores uid + some data about the user)
    //  - user_auth (stores uid + password representation)
    await pool.query(
        `INSERT INTO users (??) VALUES (?)`,
        [userDataFields, userDataValues]
    );
    await pool.query(
        'INSERT INTO user_auth (uid, pass) VALUES (?, ?)',
        [uid, hashedPass]
    );

    return null;
}

export async function getUserPublicData(uid) {
    // As is, this table stores ONLY public data (on purpose)
    const userData = await getUserData(uid);

    if (!userData) {
        return [new ResError(404, `No user exists with uid '${uid}'`), null];
    } else {
        return [null, userData];
    }
}

// Checks consistency between the hashed version of a user's password
// and their uid
export async function checkPassword(uid, pass) {
    // Get password given uid
    const [userAuth] = await pool.query(
        'SELECT * FROM user_auth WHERE uid = ?',
        [uid]
    );

    return userAuth[0] && userAuth[0].pass
        && bcrypt.compareSync(processPass(pass), userAuth[0].pass);
}
