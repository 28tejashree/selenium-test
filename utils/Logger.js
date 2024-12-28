import fs from 'fs';

export class Logger {
    constructor(filename) {
        this.filename = filename;
    }

    log(testName, status, message) {
        const logEntry = `${new Date().toISOString()} - ${testName}: ${status} - ${message}\n`;
        fs.appendFileSync(this.filename, logEntry);
    }
}