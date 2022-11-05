import { STATUS_CODES } from 'http';

export class ResError {
    constructor(code, message) {
        if (!(code in STATUS_CODES)) {
            throw TypeError(`Bad status code ${code}`);
        }

        this.code = code;
        this.message = message;
    }
}
