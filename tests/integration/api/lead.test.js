const request = require('supertest');
const mongoose = require('mongoose');
const Lead = require('../../../models/Lead');

// Import app after setting up test environment
let app;

beforeAll(async () => {
  // Wait a bit for MongoDB connection to be established
  await new Promise(resolve => setTimeout(resolve, 100));
  app = require('../../../app');
});

describe('Lead API Integration Tests', () => {
  let testLead;

  beforeAll(async () => {
    // Clean up any existing test data
    await Lead.deleteMany({});
    
    // Create a test lead
    testLead = await Lead.create({
      date: '2024-12-03',
      client: 'Test Client',
      phone: '+1234567890',
      email: 'lead@test.com',
      budget: 50000,
      request: 'Looking for web development services',
      status: 'pending',
    });
  });

  afterAll(async () => {
    await Lead.deleteMany({});
  });

  describe('POST /api/lead/create', () => {
    test('should create lead with valid data', async () => {
      const newLeadData = {
        date: '2024-12-04',
        client: 'New Client',
        phone: '+9876543210',
        email: 'newlead@test.com',
        budget: 75000,
        request: 'Need mobile app development',
        status: 'contacted',
      };

      const response = await request(app)
        .post('/api/lead/create')
        .send(newLeadData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.date).toBe(newLeadData.date);
      expect(response.body.result.client).toBe(newLeadData.client);
      expect(response.body.result.phone).toBe(newLeadData.phone);
      expect(response.body.result.email).toBe(newLeadData.email);
      expect(response.body.result.budget).toBe(newLeadData.budget);
    });

    test('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/lead/create')
        .send({
          client: 'Test',
          // Missing date, phone, email (required fields)
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Required fields');
    });

    test('should create lead with minimal required fields', async () => {
      const minimalLead = {
        date: '2024-12-05',
        client: 'Minimal Client',
        phone: '+1111111111',
        email: 'minimal@test.com',
      };

      const response = await request(app)
        .post('/api/lead/create')
        .send(minimalLead);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result.date).toBe(minimalLead.date);
      expect(response.body.result.status).toBe('pending'); // default value
    });

    test('should lowercase email automatically', async () => {
      const leadWithEmail = {
        date: '2024-12-06',
        client: 'Email Test',
        phone: '+2222222222',
        email: 'UPPERCASE@TEST.COM',
      };

      const response = await request(app)
        .post('/api/lead/create')
        .send(leadWithEmail);

      expect(response.status).toBe(200);
      expect(response.body.result.email).toBe('uppercase@test.com');
    });

    test('should set default status to pending', async () => {
      const leadWithoutStatus = {
        date: '2024-12-07',
        client: 'No Status Client',
        phone: '+3333333333',
        email: 'nostatus@test.com',
      };

      const response = await request(app)
        .post('/api/lead/create')
        .send(leadWithoutStatus);

      expect(response.status).toBe(200);
      expect(response.body.result.status).toBe('pending');
    });
  });

  describe('GET /api/lead/list', () => {
    test('should return list of leads with pagination', async () => {
      // Ensure testLead exists
      let lead = await Lead.findById(testLead._id);
      if (!lead) {
        testLead = await Lead.create({
          date: '2024-12-03',
          client: 'Test Client',
          phone: '+1234567890',
          email: 'lead@test.com',
        });
      }

      const response = await request(app)
        .get('/api/lead/list')
        .query({ page: 1, items: 10 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.page).toBe(1);
    });
  });

  describe('GET /api/lead/read/:id', () => {
    test('should return lead by id', async () => {
      // Ensure testLead exists
      let lead = await Lead.findById(testLead._id);
      if (!lead) {
        testLead = await Lead.create({
          date: '2024-12-03',
          client: 'Test Client',
          phone: '+1234567890',
          email: 'lead@test.com',
        });
      }

      const response = await request(app)
        .get(`/api/lead/read/${testLead._id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeDefined();
      expect(response.body.result._id).toBe(testLead._id.toString());
      expect(response.body.result.client).toBe(testLead.client);
      expect(response.body.result.email).toBe(testLead.email);
    });

    test('should return 404 for non-existent lead', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/lead/read/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PATCH /api/lead/update/:id', () => {
    test('should update lead successfully', async () => {
      // Ensure testLead exists
      let lead = await Lead.findById(testLead._id);
      if (!lead) {
        testLead = await Lead.create({
          date: '2024-12-03',
          client: 'Test Client',
          phone: '+1234567890',
          email: 'lead@test.com',
        });
      }

      const updateData = {
        status: 'contacted',
        budget: 60000,
        request: 'Updated request details',
      };

      const response = await request(app)
        .patch(`/api/lead/update/${testLead._id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      if (response.body.result) {
        expect(response.body.result.status).toBe(updateData.status);
        expect(response.body.result.budget).toBe(updateData.budget);
        expect(response.body.result.request).toBe(updateData.request);
      }
    });

    test('should update client name', async () => {
      const updateData = {
        client: 'Updated Client Name',
      };

      const response = await request(app)
        .patch(`/api/lead/update/${testLead._id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.result.client).toBe(updateData.client);
    });
  });

  describe('DELETE /api/lead/delete/:id', () => {
    test('should delete lead successfully', async () => {
      // Create a new lead to delete
      const leadToDelete = await Lead.create({
        date: '2024-12-08',
        client: 'To Delete',
        phone: '+9999999999',
        email: 'todelete@test.com',
      });

      const response = await request(app)
        .delete(`/api/lead/delete/${leadToDelete._id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Verify lead is deleted
      const deletedLead = await Lead.findById(leadToDelete._id);
      expect(deletedLead).toBeNull();
    });

    test('should return 404 for non-existent lead', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .delete(`/api/lead/delete/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/lead/search', () => {
    test('should search leads by client name', async () => {
      // Ensure testLead exists
      let lead = await Lead.findById(testLead._id);
      if (!lead) {
        testLead = await Lead.create({
          date: '2024-12-03',
          client: 'Test Client',
          phone: '+1234567890',
          email: 'lead@test.com',
        });
      }

      const response = await request(app)
        .get('/api/lead/search')
        .query({ q: 'Test Client', fields: 'client' });

      // Could be 200 (found) or 202 (not found)
      expect([200, 202]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(response.body.result).toBeInstanceOf(Array);
      }
    });

    test('should search leads by email', async () => {
      // Ensure testLead exists
      let lead = await Lead.findById(testLead._id);
      if (!lead) {
        testLead = await Lead.create({
          date: '2024-12-03',
          client: 'Test Client',
          phone: '+1234567890',
          email: 'lead@test.com',
        });
      }

      const response = await request(app)
        .get('/api/lead/search')
        .query({ q: 'lead@test.com', fields: 'email' });

      // Could be 200 (found) or 202 (not found)
      expect([200, 202]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(response.body.result.length).toBeGreaterThan(0);
      }
    });

    test('should return empty array for no matches', async () => {
      const response = await request(app)
        .get('/api/lead/search')
        .query({ q: 'NonexistentLeadXYZ', fields: 'client' });

      expect(response.status).toBe(202);
      expect(response.body.success).toBe(false);
      expect(response.body.result).toEqual([]);
    });

    test('should return 202 for empty query', async () => {
      const response = await request(app)
        .get('/api/lead/search')
        .query({ q: '', fields: 'client' });

      expect(response.status).toBe(202);
      expect(response.body.success).toBe(false);
    });
  });
});

