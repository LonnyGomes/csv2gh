require('dotenv').config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const CSV_FILE = process.env.CSV_FILE;

const GitHub = require('./github');
const Parser = require('./parse');
const parser = new Parser(CSV_FILE);

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

    const github = new GitHub(GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO);
    github.init();

    for (const item of results) {
        const title = genTitle(item);
        const body = genBody(item);
        const labels = genLabels(item);

        console.log(`Adding ${title}`);

        try {
            await github.createIssue(title, body, labels);
        } catch (error) {
            console.error(`Error while creating issue: ${error.message}`);
        }
    }
};

init();
