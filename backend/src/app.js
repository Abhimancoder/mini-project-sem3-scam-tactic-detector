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
app.use(helmet());

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

// Root route friendly status
app.get('/', (req, res) => {
  res.status(200).json({
    service: 'Scam Tactic Detector API',
    description: 'Explainable NLP Detection Engine for Investment Scam Tactics',
    version: config.version,
    documentation: '/api/tactics',
    health: '/api/health'
  });
});

// 404 handler
app.use(notFoundHandler);

// Central error handler
app.use(errorHandler);

module.exports = app;
