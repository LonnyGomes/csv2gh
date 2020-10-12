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
                .on('data', (data) => {
                    data.type = this.processType(data.type);
                    results.push(data);
                })
                .on('error', (err) => reject(err))
                .on('end', () => {
                    resolve(results);
                });
        });
    }

    processType(str) {
        if (!str) {
            return [];
        }

        if (str.indexOf('|') > -1) {
            return str.split('|');
        } else {
            return [str];
        }
    }
};
