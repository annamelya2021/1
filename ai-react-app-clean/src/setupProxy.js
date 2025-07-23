const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // Backend server URL
      changeOrigin: true,
      secure: false,
      onProxyReq: (proxyReq, req, res) => {
        // Add any custom headers here if needed
        proxyReq.setHeader('x-added', 'foobar');
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'Proxy error', details: err.message });
      }
    })
  );
};
