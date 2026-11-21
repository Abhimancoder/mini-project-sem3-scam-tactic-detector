const app = require('./app');
const config = require('./config/environment');

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`[Scam Tactic Detector Backend] Server listening on port ${PORT} in ${config.env} mode`);
  console.log(`[Health Endpoint] http://localhost:${PORT}/api/health`);
  console.log(`[Analyze Endpoint] http://localhost:${PORT}/api/analyze`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

module.exports = server;
