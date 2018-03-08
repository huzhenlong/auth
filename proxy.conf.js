var arguments = process.argv.splice(2);
var target = arguments[4]||"https://admin.jmz.dev";
console.log("Origin:",target);

const CONF = {
    "/auth-api/v1/*": {
        "target": 'http://172.18.16.174:8080/',
        "secure": false,
        "changeOrigin": true
    },
    "logLevel": "debug"
};

module.exports = CONF;
