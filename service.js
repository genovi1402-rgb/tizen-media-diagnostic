"use strict";

var fs = require("fs");
var http = require("http");

var result = {
    node: process.version,
    tizen: typeof tizen !== "undefined",
    childProcess: false,
    installerPaths: [],
    errors: []
};

try {
    require("child_process");
    result.childProcess = true;
} catch (e) {
    result.errors.push(String(e));
}

var paths = [
    "/usr/bin/wascmd",
    "/usr/bin/was/wascmd",
    "/bin/wascmd"
];

paths.forEach(function(path) {
    try {
        fs.statSync(path);
        result.installerPaths.push(path);
    } catch (e) {}
});

var server = http.createServer(function(req, res) {
    res.setHeader("Access-Control-Allow-Origin",
        "http://127.0.0.1:8081");
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result));
});

server.listen(18765, "127.0.0.1");
module.exports = result;
