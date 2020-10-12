const { Octokit } = require('@octokit/rest');

module.exports = class GitHub {
    constructor(token, owner, repo) {
        this.token = token;
        this.owner = owner;
        this.repo = repo;
    }

    init() {
        this.octokit = new Octokit({ auth: this.token });
    }

    async createIssue(title, body, labels = []) {
        if (!this.octokit) {
            throw new Error('Must call init()');
        }

        const owner = this.owner;
        const repo = this.repo;
        let results = null;

        try {
            results = await this.octokit.issues.create({
                owner,
                repo,
                title,
                body,
                labels,
            });
        } catch (error) {
            throw new Error(error);
        }

        return results;
    }
};
