const { execSync: exec } = require("child_process")
const { writeFileSync: write } = require("fs")
const config = require("../package.json")

// Update version in package.json
config.version = process.argv[2]
const message = `Release v${config.version}`
write("package.json", JSON.stringify(config, null, 2))

// Commit new version changes
exec("git add package.json")
exec(`git commit -m "${message}"`)

// Tag latest release
exec(`git tag v${config.version} -m "${message}"`)

// Push updates to origin
exec("git push origin master")
exec("git push --tags")
