const config = require("../package.json")
const tar = require("tar")
const file = `${config.name}-${config.version}.tar.gz`

tar.create({ gzip: true, file }, ["build/benchwarmer.js"])
   .then(function() { console.log("Tarball has been created") })
