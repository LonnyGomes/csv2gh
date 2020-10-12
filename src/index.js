require('dotenv').config();

const { Octokit } = require('@octokit/rest');
const Parser = require('./parse');
const octokit = new Octokit();

const parser = new Parser('MOCK_DATA.csv');

const init = async () => {
    try {
        const results = await parser.parse();
        console.log('results', results);
    } catch (error) {
        console.error(`Error encountered while parsing: ${error.message}`);
    }
};

init();
