"use strict";

var fs = require("fs");

var paths = [
    "/usr/bin/wascmd",
    "/usr/bin/was/wascmd",
    "/bin/wascmd"
];

var result = {
    node: true,
    version: process.version,
    tizen: typeof tizen !== "undefined",
    installerPaths: []
};

paths.forEach(function(path) {
    try {
        fs.statSync(path);
        result.installerPaths.push(path);
    } catch (e) {}
});

console.log("MEDIA_DIAGNOSTIC", JSON.stringify(result));

module.exports = result;
