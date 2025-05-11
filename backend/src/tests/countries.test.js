const request = require('supertest');
const app = require('../server');
const Country = require('../models/Country');
const { createTestUser, createTestCountryData } = require('./helpers');

describe('Country Endpoints', () => {
  let admin;
  let adminToken;
  let user;
  let userToken;
  let countryData;

  beforeEach(async () => {
    const testAdmin = await createTestUser('admin');
    const testUser = await createTestUser();
    admin = testAdmin.user;
    adminToken = testAdmin.token;
    user = testUser.user;
    userToken = testUser.token;
    countryData = createTestCountryData();
  });

  describe('GET /api/countries', () => {
    it('should get all countries', async () => {
      await Country.create(countryData);

      const response = await request(app)
        .get('/api/countries');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get country by code', async () => {
      await Country.create(countryData);

      const response = await request(app)
        .get(`/api/countries/${countryData.code}`);

      expect(response.status).toBe(200);
      expect(response.body.country).toHaveProperty('code', countryData.code);
    });
  });

  describe('POST /api/countries', () => {
    it('should create new country as admin', async () => {
      const response = await request(app)
        .post('/api/countries')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(countryData);

      expect(response.status).toBe(201);
      expect(response.body.country).toHaveProperty('code', countryData.code);
    });

    it('should not create country as regular user', async () => {
      const response = await request(app)
        .post('/api/countries')
        .set('Authorization', `Bearer ${userToken}`)
        .send(countryData);

      expect(response.status).toBe(403);
    });

    it('should not create country without authentication', async () => {
      const response = await request(app)
        .post('/api/countries')
        .send(countryData);

      expect(response.status).toBe(401);
    });
  });

  describe('PATCH /api/countries/:code', () => {
    it('should update country as admin', async () => {
      const country = await Country.create(countryData);
      const updateData = { currency: 'EUR' };

      const response = await request(app)
        .patch(`/api/countries/${country.code}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.country).toHaveProperty('currency', updateData.currency);
    });

    it('should not update country as regular user', async () => {
      const country = await Country.create(countryData);

      const response = await request(app)
        .patch(`/api/countries/${country.code}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ currency: 'EUR' });

      expect(response.status).toBe(403);
    });
  });

  describe('DELETE /api/countries/:code', () => {
    it('should delete country as admin', async () => {
      const country = await Country.create(countryData);

      const response = await request(app)
        .delete(`/api/countries/${country.code}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      const deletedCountry = await Country.findOne({ code: country.code });
      expect(deletedCountry).toBeNull();
    });

    it('should not delete country as regular user', async () => {
      const country = await Country.create(countryData);

      const response = await request(app)
        .delete(`/api/countries/${country.code}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(403);
    });
  });
}); 