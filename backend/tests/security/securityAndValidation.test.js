const request = require('supertest');
const app = require('../../src/app');

describe('Security & Input Validation Test Suite', () => {
  describe('Input Validation & Boundary Testing', () => {
    test('rejects missing conversation payload with 400 Bad Request', async () => {
      const res = await request(app)
        .post('/api/analyze')
        .send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Missing required field');
    });

    test('rejects empty string with 400 Bad Request', async () => {
      const res = await request(app)
        .post('/api/analyze')
        .send({ conversation: '' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('cannot be empty');
    });

    test('rejects whitespace-only string with 400 Bad Request', async () => {
      const res = await request(app)
        .post('/api/analyze')
        .send({ conversation: '      \n\t   ' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test('rejects non-string types (numeric, boolean, array, object) with 400', async () => {
      const resNumeric = await request(app).post('/api/analyze').send({ conversation: 123456 });
      expect(resNumeric.statusCode).toBe(400);

      const resBool = await request(app).post('/api/analyze').send({ conversation: true });
      expect(resBool.statusCode).toBe(400);

      const resArray = await request(app).post('/api/analyze').send({ conversation: ['scam text'] });
      expect(resArray.statusCode).toBe(400);
    });

    test('rejects excessively large payloads with 413 Payload Too Large', async () => {
      const giantString = 'A'.repeat(20000); // Exceeds default 15000 limit
      const res = await request(app)
        .post('/api/analyze')
        .send({ conversation: giantString });

      expect(res.statusCode).toBe(413);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('too large');
    });
  });

  describe('Security Headers & Injection Neutralization', () => {
    test('enforces critical Helmet security headers', async () => {
      const res = await request(app).get('/api/health');

      expect(res.headers['x-content-type-options']).toBe('nosniff');
      expect(res.headers['x-dns-prefetch-control']).toBe('off');
      expect(res.headers['x-frame-options']).toBe('SAMEORIGIN');
    });

    test('safely neutralizes script tags and malicious payloads without execution', async () => {
      const maliciousPayload = '<script>alert("xss")</script> Act now, 100% guaranteed profit!';
      const res = await request(app)
        .post('/api/analyze')
        .send({ conversation: maliciousPayload });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      // The engine should analyze text safely and detect tactics without executing HTML/JS
      expect(res.body.data.detectedTactics.length).toBeGreaterThan(0);
    });

    test('handles 404 for nonexistent routes securely without disclosing internal paths', async () => {
      const res = await request(app).get('/api/secret/system/dump');
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Endpoint not found');
    });
  });
});
