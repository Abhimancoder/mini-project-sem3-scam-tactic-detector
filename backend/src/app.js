const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config/environment');

const healthRoutes = require('./routes/healthRoutes');
const analyzeRoutes = require('./routes/analyzeRoutes');
const samplesRoutes = require('./routes/samplesRoutes');
const tacticsRoutes = require('./routes/tacticsRoutes');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

const app = express();

// Security HTTP headers
app.use(helmet({
  contentSecurityPolicy: false // Allow inline styles/scripts used by Vite React bundle
}));

// Cross-Origin Resource Sharing
app.use(cors({
  origin: '*', // For local dev and demo simplicity; easily configured via config.clientUrl
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request body parser with strict size limit
app.use(express.json({ limit: '250kb' }));
app.use(express.urlencoded({ extended: false, limit: '250kb' }));

// Global Rate Limiter
const apiLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMaxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP address. Please try again after 15 minutes.'
  }
});

// Apply rate limiting to API routes
app.use('/api/', apiLimiter);

// Mount API routes
app.use('/api/health', healthRoutes);
app.use('/api/analyze', analyzeRoutes);
app.use('/api/samples', samplesRoutes);
app.use('/api/tactics', tacticsRoutes);

// Static client build serving for production deployment
const clientDistPath = path.resolve(__dirname, '../../frontend/dist');
const hasClientBuild = fs.existsSync(clientDistPath);

if (hasClientBuild) {
  app.use(express.static(clientDistPath));

  // SPA fallback for all non-API GET requests
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  // Root route friendly status when running in pure API mode
  app.get('/', (req, res) => {
    res.status(200).json({
      service: 'Scam Tactic Detector API',
      description: 'Explainable NLP Detection Engine for Investment Scam Tactics',
      version: config.version,
      documentation: '/api/tactics',
      health: '/api/health'
    });
  });
}

// 404 handler for unmatched API routes
app.use(notFoundHandler);

// Central error handler
app.use(errorHandler);

module.exports = app;
