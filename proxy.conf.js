const CONF = {
    "/auth-api/v1/*": {
        "target": 'http://172.18.16.174:8080/',
        "secure": false,
        "changeOrigin": true
    },
    "logLevel": "debug"
};

module.exports = CONF;
