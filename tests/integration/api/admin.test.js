const request = require('supertest');
const mongoose = require('mongoose');
const Admin = require('../../../models/Admin');

// Import app after setting up test environment
let app;

beforeAll(async () => {
  // Wait a bit for MongoDB connection to be established
  await new Promise(resolve => setTimeout(resolve, 100));
  app = require('../../../app');
});

describe('Admin API Integration Tests', () => {
  let authToken;
  let testAdmin;

  beforeAll(async () => {
    // Create a test admin and login to get token
    const admin = new Admin();
    const passwordHash = admin.generateHash('testpassword123');
    testAdmin = await Admin.create({
      email: 'admin@test.com',
      password: passwordHash,
      name: 'Test',
      surname: 'Admin',
    });

    // Login to get auth token
    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        email: 'admin@test.com',
        password: 'testpassword123',
      });
    authToken = loginResponse.body.result.token;
  });

  afterAll(async () => {
    await Admin.deleteMany({});
  });

  describe('POST /api/admin/create', () => {
    test('should create admin with valid data', async () => {
      const newAdminData = {
        email: 'newadmin@example.com',
        password: 'password123456',
        name: 'New',
        surname: 'Admin',
      };

      const response = await request(app)
        .post('/api/admin/create')
        .send(newAdminData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.email).toBe(newAdminData.email);
      expect(response.body.result.name).toBe(newAdminData.name);
      expect(response.body.result.surname).toBe(newAdminData.surname);
      expect(response.body.result.password).toBeUndefined(); // Password should not be returned
    });

    test('should return 400 if email is missing', async () => {
      const response = await request(app)
        .post('/api/admin/create')
        .send({
          password: 'password123456',
          name: 'New',
          surname: 'Admin',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test('should return 400 if password is missing', async () => {
      const response = await request(app)
        .post('/api/admin/create')
        .send({
          email: 'newadmin@example.com',
          name: 'New',
          surname: 'Admin',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test('should return 400 if password is too short', async () => {
      const response = await request(app)
        .post('/api/admin/create')
        .send({
          email: 'newadmin@example.com',
          password: 'short',
          name: 'New',
          surname: 'Admin',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('at least 8 characters');
    });

    test('should return 400 if email already exists', async () => {
      const response = await request(app)
        .post('/api/admin/create')
        .send({
          email: 'admin@test.com', // Already exists
          password: 'password123456',
          name: 'New',
          surname: 'Admin',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already exists');
    });
  });

  describe('GET /api/admin/list', () => {
    test('should return list of admins with pagination', async () => {
      const response = await request(app)
        .get('/api/admin/list')
        .query({ page: 1, items: 10 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.page).toBe(1);
    });

    test('should return empty array if no admins exist', async () => {
      // Delete all admins first
      await Admin.deleteMany({});

      const response = await request(app)
        .get('/api/admin/list');

      expect(response.status).toBe(203);
      expect(response.body.success).toBe(false);
      expect(response.body.result).toEqual([]);
    });
  });

  describe('GET /api/admin/read/:id', () => {
    test('should return admin by id', async () => {
      const response = await request(app)
        .get(`/api/admin/read/${testAdmin._id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeDefined();
      expect(response.body.result._id).toBe(testAdmin._id.toString());
      expect(response.body.result.email).toBe(testAdmin.email);
    });

    test('should return 404 for non-existent admin', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/admin/read/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PATCH /api/admin/update/:id', () => {
    test('should update admin successfully', async () => {
      const updateData = {
        name: 'Updated',
        surname: 'Name',
      };

      const response = await request(app)
        .patch(`/api/admin/update/${testAdmin._id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result.name).toBe(updateData.name);
      expect(response.body.result.surname).toBe(updateData.surname);
    });

    test('should return 404 for non-existent admin', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .patch(`/api/admin/update/${fakeId}`)
        .send({ name: 'Updated' });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/admin/delete/:id', () => {
    test('should delete admin successfully', async () => {
      // Create a new admin to delete
      const admin = new Admin();
      const passwordHash = admin.generateHash('password123');
      const adminToDelete = await Admin.create({
        email: 'todelete@example.com',
        password: passwordHash,
        name: 'To',
        surname: 'Delete',
      });

      const response = await request(app)
        .delete(`/api/admin/delete/${adminToDelete._id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Verify admin is deleted
      const deletedAdmin = await Admin.findById(adminToDelete._id);
      expect(deletedAdmin).toBeNull();
    });

    test('should return 404 for non-existent admin', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .delete(`/api/admin/delete/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/admin/search', () => {
    test('should search admins by email', async () => {
      const response = await request(app)
        .get('/api/admin/search')
        .query({ q: 'admin@test.com', fields: 'email' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeInstanceOf(Array);
    });

    test('should return empty array for no matches', async () => {
      const response = await request(app)
        .get('/api/admin/search')
        .query({ q: 'nonexistent@example.com', fields: 'email' });

      expect(response.status).toBe(202);
      expect(response.body.success).toBe(false);
      expect(response.body.result).toEqual([]);
    });

    test('should return 202 for empty query', async () => {
      const response = await request(app)
        .get('/api/admin/search')
        .query({ q: '', fields: 'email' });

      expect(response.status).toBe(202);
      expect(response.body.success).toBe(false);
    });
  });
});

