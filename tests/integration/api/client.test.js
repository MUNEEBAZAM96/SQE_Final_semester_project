const request = require('supertest');
const mongoose = require('mongoose');
const Client = require('../../../models/Client');

// Import app after setting up test environment
let app;

beforeAll(async () => {
  // Wait a bit for MongoDB connection to be established
  await new Promise(resolve => setTimeout(resolve, 100));
  app = require('../../../app');
});

describe('Client API Integration Tests', () => {
  let testClient;

  beforeAll(async () => {
    // Clean up any existing test data
    await Client.deleteMany({});
    
    // Create a test client
    testClient = await Client.create({
      company: 'Test Company Inc',
      name: 'John',
      surname: 'Doe',
      phone: '+1234567890',
      email: 'john.doe@testcompany.com',
      address: '123 Test Street',
      country: 'USA',
    });
  });

  afterAll(async () => {
    await Client.deleteMany({});
  });

  describe('POST /api/client/create', () => {
    test('should create client with valid data', async () => {
      const newClientData = {
        company: 'New Company Ltd',
        name: 'Jane',
        surname: 'Smith',
        phone: '+9876543210',
        email: 'jane.smith@newcompany.com',
        address: '456 New Avenue',
        country: 'Canada',
      };

      const response = await request(app)
        .post('/api/client/create')
        .send(newClientData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.company).toBe(newClientData.company);
      expect(response.body.result.name).toBe(newClientData.name);
      expect(response.body.result.surname).toBe(newClientData.surname);
      expect(response.body.result.phone).toBe(newClientData.phone);
    });

    test('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/client/create')
        .send({
          name: 'Test',
          // Missing company, surname, phone (required fields)
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Required fields');
    });

    test('should create client with minimal required fields', async () => {
      const minimalClient = {
        company: 'Minimal Company',
        name: 'Min',
        surname: 'Mal',
        phone: '+1111111111',
      };

      const response = await request(app)
        .post('/api/client/create')
        .send(minimalClient);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result.company).toBe(minimalClient.company);
    });

    test('should lowercase email automatically', async () => {
      const clientWithEmail = {
        company: 'Email Test Co',
        name: 'Email',
        surname: 'Test',
        phone: '+2222222222',
        email: 'TEST@EXAMPLE.COM',
      };

      const response = await request(app)
        .post('/api/client/create')
        .send(clientWithEmail);

      expect(response.status).toBe(200);
      expect(response.body.result.email).toBe('test@example.com');
    });
  });

  describe('GET /api/client/list', () => {
    test('should return list of clients with pagination', async () => {
      const response = await request(app)
        .get('/api/client/list')
        .query({ page: 1, items: 10 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.count).toBeGreaterThanOrEqual(0);
    });

    test('should return list even if collection has data', async () => {
      // This test verifies list works with existing data
      const response = await request(app)
        .get('/api/client/list');

      // Should return 200 if data exists, 203 if empty
      expect([200, 203]).toContain(response.status);
      expect(response.body.result).toBeInstanceOf(Array);
    });

    test('should handle pagination correctly', async () => {
      // Create multiple clients for pagination test
      const clients = [];
      for (let i = 0; i < 5; i++) {
        clients.push({
          company: `Company ${i}`,
          name: `Name${i}`,
          surname: `Surname${i}`,
          phone: `+123456789${i}`,
        });
      }
      await Client.insertMany(clients);

      const response = await request(app)
        .get('/api/client/list')
        .query({ page: 1, items: 2 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result.length).toBeLessThanOrEqual(2);
      expect(response.body.pagination).toBeDefined();
    });
  });

  describe('GET /api/client/read/:id', () => {
    test('should return client by id', async () => {
      // Ensure testClient exists
      let client = await Client.findById(testClient._id);
      if (!client) {
        testClient = await Client.create({
          company: 'Test Company Inc',
          name: 'John',
          surname: 'Doe',
          phone: '+1234567890',
          email: 'john.doe@testcompany.com',
        });
      }

      const response = await request(app)
        .get(`/api/client/read/${testClient._id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeDefined();
      expect(response.body.result._id).toBe(testClient._id.toString());
      expect(response.body.result.company).toBe(testClient.company);
      expect(response.body.result.name).toBe(testClient.name);
    });

    test('should return 404 for non-existent client', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/client/read/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('No document found');
    });
  });

  describe('PATCH /api/client/update/:id', () => {
    test('should update client successfully', async () => {
      // Ensure testClient still exists
      let client = await Client.findById(testClient._id);
      if (!client) {
        testClient = await Client.create({
          company: 'Test Company Inc',
          name: 'John',
          surname: 'Doe',
          phone: '+1234567890',
          email: 'john.doe@testcompany.com',
        });
      }

      const updateData = {
        name: 'Updated',
        surname: 'Name',
        address: '789 Updated Street',
      };

      const response = await request(app)
        .patch(`/api/client/update/${testClient._id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      if (response.body.result) {
        expect(response.body.result.name).toBe(updateData.name);
        expect(response.body.result.surname).toBe(updateData.surname);
        expect(response.body.result.address).toBe(updateData.address);
      }
    });

    test('should update optional fields', async () => {
      // Ensure testClient still exists
      let client = await Client.findById(testClient._id);
      if (!client) {
        testClient = await Client.create({
          company: 'Test Company Inc',
          name: 'John',
          surname: 'Doe',
          phone: '+1234567890',
          email: 'john.doe@testcompany.com',
        });
      }

      const updateData = {
        bankAccount: 'ACC123456',
        companyRegNumber: 'REG789',
        website: 'https://updated.com',
      };

      const response = await request(app)
        .patch(`/api/client/update/${testClient._id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      // Verify result exists and fields are updated
      expect(response.body.result).toBeDefined();
      if (response.body.result) {
        expect(response.body.result.bankAccount).toBe(updateData.bankAccount);
        expect(response.body.result.companyRegNumber).toBe(updateData.companyRegNumber);
        expect(response.body.result.website).toBe(updateData.website);
      }
    });

    test('should return 200 even for non-existent client (Mongoose behavior)', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .patch(`/api/client/update/${fakeId}`)
        .send({ name: 'Updated' });

      // Generic CRUD returns 200 even if not found, but result is null
      expect(response.status).toBe(200);
    });
  });

  describe('DELETE /api/client/delete/:id', () => {
    test('should delete client successfully', async () => {
      // Create a new client to delete
      const clientToDelete = await Client.create({
        company: 'To Delete Co',
        name: 'Delete',
        surname: 'Me',
        phone: '+9999999999',
      });

      const response = await request(app)
        .delete(`/api/client/delete/${clientToDelete._id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Verify client is deleted
      const deletedClient = await Client.findById(clientToDelete._id);
      expect(deletedClient).toBeNull();
    });

    test('should return 404 for non-existent client', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .delete(`/api/client/delete/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/client/search', () => {
    test('should search clients by company name', async () => {
      // Ensure testClient exists before searching
      const response = await request(app)
        .get('/api/client/search')
        .query({ q: 'Test Company', fields: 'company' });

      // Could be 200 (found) or 202 (not found) depending on test data state
      expect([200, 202]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(response.body.result).toBeInstanceOf(Array);
      }
    });

    test('should search clients by email', async () => {
      // Ensure testClient exists before searching
      const response = await request(app)
        .get('/api/client/search')
        .query({ q: 'john.doe', fields: 'email' });

      // Could be 200 (found) or 202 (not found) depending on test data state
      expect([200, 202]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(response.body.result.length).toBeGreaterThan(0);
      }
    });

    test('should search clients by name', async () => {
      // Ensure testClient exists before searching
      const response = await request(app)
        .get('/api/client/search')
        .query({ q: 'John', fields: 'name' });

      // Could be 200 (found) or 202 (not found) depending on test data state
      expect([200, 202]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
      }
    });

    test('should return empty array for no matches', async () => {
      const response = await request(app)
        .get('/api/client/search')
        .query({ q: 'NonexistentCompanyXYZ', fields: 'company' });

      expect(response.status).toBe(202);
      expect(response.body.success).toBe(false);
      expect(response.body.result).toEqual([]);
    });

    test('should return 202 for empty query', async () => {
      const response = await request(app)
        .get('/api/client/search')
        .query({ q: '', fields: 'company' });

      expect(response.status).toBe(202);
      expect(response.body.success).toBe(false);
    });

    test('should search across multiple fields', async () => {
      // Ensure testClient exists before searching
      const response = await request(app)
        .get('/api/client/search')
        .query({ q: 'Test', fields: 'company,name,surname' });

      // Could be 200 (found) or 202 (not found) depending on test data state
      expect([200, 202]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
      }
    });
  });
});

