/**
 * A short script for creating a new release. It can be run using `yarn`
 * with `yarn release VERSION`, passing it the new version. This script
 * updates the version in `package.json`, commits that change, and then
 * creates/pushes a new tag to GitHub. From there, GitHub actions take
 * over to do all of the building and changelog generation.
 */

const { execSync: exec } = require("child_process");
const { writeFileSync: write } = require("fs");
const config = require("../package.json");

// Update version in package.json
config.version = process.argv[2];
const message = `Release v${config.version}`;
write("package.json", JSON.stringify(config, null, 2));

// Commit new version changes
exec("git add package.json");
exec(`git commit -m "${message}"`);

// Tag latest release
exec(`git tag v${config.version} -m "${message}"`);

// Push updates to origin
exec("git push origin master");
exec("git push --tags");
