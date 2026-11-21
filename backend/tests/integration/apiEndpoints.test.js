const request = require('supertest');
const app = require('../../src/app');

describe('API Integration Test Suite', () => {
  describe('GET /api/health', () => {
    test('returns healthy service status and timestamp', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.service).toBe('scam-tactic-detector-backend');
      expect(res.body.timestamp).toBeDefined();
    });
  });

  describe('GET /api/tactics', () => {
    test('returns metadata for all 5 core tactics', async () => {
      const res = await request(app).get('/api/tactics');
      expect(res.statusCode).toBe(200);
      expect(res.body.count).toBe(5);
      expect(res.body.data.map(t => t.id)).toEqual(
        expect.arrayContaining(['urgency', 'authority', 'guaranteed_returns', 'social_proof', 'escalation'])
      );
    });

    test('returns single tactic details by id', async () => {
      const res = await request(app).get('/api/tactics/guaranteed_returns');
      expect(res.statusCode).toBe(200);
      expect(res.body.data.name).toContain('Guaranteed Returns');
      expect(res.body.data.redFlags).toBeDefined();
    });

    test('returns 404 for non-existent tactic', async () => {
      const res = await request(app).get('/api/tactics/unknown_tactic_xyz');
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/samples', () => {
    test('returns curated test conversations for instant testing', async () => {
      const res = await request(app).get('/api/samples');
      expect(res.statusCode).toBe(200);
      expect(res.body.count).toBeGreaterThanOrEqual(4);
      expect(res.body.data[0]).toHaveProperty('conversation');
    });
  });

  describe('POST /api/analyze', () => {
    test('analyzes conversation and returns complete tactic and risk payload', async () => {
      const res = await request(app)
        .post('/api/analyze')
        .send({
          conversation: 'Act now! 100% guaranteed profit of 30% daily. Over 5,000 members have joined.'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.detectedTactics.length).toBeGreaterThanOrEqual(2);
      expect(res.body.data.highlights.length).toBeGreaterThanOrEqual(1);
      expect(res.body.data.riskAssessment.level).not.toBe('SAFE');
    });

    test('returns SAFE evaluation for legitimate financial planning text', async () => {
      const res = await request(app)
        .post('/api/analyze')
        .send({
          conversation: 'Mutual funds are subject to market risks, read all scheme related documents carefully. Consult your financial planner.'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.detectedTacticsCount).toBe(0);
      expect(res.body.data.riskAssessment.level).toBe('SAFE');
    });
  });
});
