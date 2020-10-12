const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

module.exports = class Parser {
    constructor(filename) {
        this.filename = path.resolve(filename);
    }

    parse() {
        return new Promise((resolve, reject) => {
            const results = [];

            fs.createReadStream(this.filename)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('error', (err) => reject(err))
                .on('end', () => {
                    resolve(results);
                });
        });
    }
};
