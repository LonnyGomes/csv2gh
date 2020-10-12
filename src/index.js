require('dotenv').config();

const { Octokit } = require('@octokit/rest');
const Parser = require('./parse');
const octokit = new Octokit();

const parser = new Parser('MOCK_DATA.csv');

const genTitle = (data) => {
    const { req_id, title } = data;
    return `CTLR-${req_id} - ${title}`;
};

const genBody = (data) => {
    const { title, public_impl, notes, priority } = data;

    const msg = `## ${title}

**Priority:** ${priority}

### Public Implementation

${public_impl}

### Notes

<details>
  <summary>Additional Notes</summary>
  <p>${notes}</p>
</details>

`;

    return msg;
};

const genLabels = (data) => {
    return data.type;
};

const init = async () => {
    let results = null;

    try {
        results = await parser.parse();
    } catch (error) {
        console.error(`Error encountered while parsing: ${error.message}`);
    }

    results.forEach((item) => {
        const title = genTitle(item);
        const body = genBody(item);
        const labels = genLabels(item);

        console.log(title, body, labels);
    });
};

init();
