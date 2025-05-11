const request = require('supertest');
const app = require('../server');
const Price = require('../models/Price');
const { createTestUser, createTestPriceData } = require('./helpers');

describe('Price Endpoints', () => {
  let user;
  let token;
  let priceData;

  beforeEach(async () => {
    const testUser = await createTestUser();
    user = testUser.user;
    token = testUser.token;
    priceData = createTestPriceData(user._id);
  });

  describe('GET /api/prices', () => {
    it('should get all prices', async () => {
      await Price.create(priceData);

      const response = await request(app)
        .get('/api/prices');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.prices)).toBe(true);
      expect(response.body.prices.length).toBeGreaterThan(0);
    });

    it('should filter prices by country', async () => {
      await Price.create(priceData);

      const response = await request(app)
        .get('/api/prices')
        .query({ country: priceData.country });

      expect(response.status).toBe(200);
      expect(response.body.prices.every(p => p.country === priceData.country)).toBe(true);
    });

    it('should filter prices by category', async () => {
      await Price.create(priceData);

      const response = await request(app)
        .get('/api/prices')
        .query({ category: priceData.category });

      expect(response.status).toBe(200);
      expect(response.body.prices.every(p => p.category === priceData.category)).toBe(true);
    });
  });

  describe('POST /api/prices', () => {
    it('should create a new price report', async () => {
      const response = await request(app)
        .post('/api/prices')
        .set('Authorization', `Bearer ${token}`)
        .send(priceData);

      expect(response.status).toBe(201);
      expect(response.body.price).toHaveProperty('item', priceData.item);
      expect(response.body.price).toHaveProperty('price', priceData.price);
      expect(response.body.price.reportedBy.toString()).toBe(user._id.toString());
    });

    it('should not create price report without authentication', async () => {
      const response = await request(app)
        .post('/api/prices')
        .send(priceData);

      expect(response.status).toBe(401);
    });
  });

  describe('PATCH /api/prices/:id', () => {
    it('should update own price report', async () => {
      const price = await Price.create(priceData);
      const updateData = { price: 200 };

      const response = await request(app)
        .patch(`/api/prices/${price._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.price).toHaveProperty('price', updateData.price);
    });

    it('should not update someone else\'s price report', async () => {
      const otherUser = await createTestUser();
      const price = await Price.create({
        ...priceData,
        reportedBy: otherUser.user._id
      });

      const response = await request(app)
        .patch(`/api/prices/${price._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ price: 200 });

      expect(response.status).toBe(403);
    });
  });

  describe('DELETE /api/prices/:id', () => {
    it('should delete own price report', async () => {
      const price = await Price.create(priceData);

      const response = await request(app)
        .delete(`/api/prices/${price._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      const deletedPrice = await Price.findById(price._id);
      expect(deletedPrice).toBeNull();
    });

    it('should not delete someone else\'s price report', async () => {
      const otherUser = await createTestUser();
      const price = await Price.create({
        ...priceData,
        reportedBy: otherUser.user._id
      });

      const response = await request(app)
        .delete(`/api/prices/${price._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(403);
    });
  });
}); 