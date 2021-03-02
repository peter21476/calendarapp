const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware("/events", {
            target: "https://api.bizzabo.com/api",
            changeOrigin: true
        })
    );
}