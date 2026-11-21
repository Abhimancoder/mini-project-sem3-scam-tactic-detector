const express = require('express');
const router = express.Router();
const config = require('../config/environment');

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'scam-tactic-detector-backend',
    version: config.version,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router;
