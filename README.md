# csv2gh

Imports data from CSV/TSV files into GitHub

## Usage

To use this tool, create a `.env` file in the root of the repository with the following key/value pairs

| Variable name | Description                              |
| ------------- | ---------------------------------------- |
| GITHUB_TOKEN  | Personal GitHub token provided by GitHub |
| GITHUB_OWNER  | The owner/org name for the repo          |
| GITHUB_REPO   | The repository name                      |
| CSV_FILE      | The CSV file to import                   |

For example, to import the `MOCK_DATA.csv` file into the `LonnyGomes/cssv2gh-import` repository with a GitHub token of `0123456789abcdef` the `.env` file should look like like the following

```bash
GITHUB_TOKEN=0123456789abcdef
GITHUB_OWNER=LonnyGomes
GITHUB_REPO=csv2gh-import
CSV_FILE=MOCK_DATA.csv
```

> **NOTE:** any of the defined parameters can be overridden as environment variables

Once you have configured the parameters, you can then run the script via npm:

```bash
npm start
```

## Resources

-   Mock data generation - https://www.mockaroo.com
