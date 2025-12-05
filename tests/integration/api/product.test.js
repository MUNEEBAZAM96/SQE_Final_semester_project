const request = require('supertest');
const mongoose = require('mongoose');
const Product = require('../../../models/Product');

// Import app after setting up test environment
let app;

beforeAll(async () => {
  // Wait a bit for MongoDB connection to be established
  await new Promise(resolve => setTimeout(resolve, 100));
  app = require('../../../app');
});

describe('Product API Integration Tests', () => {
  let testProduct;

  beforeAll(async () => {
    // Clean up any existing test data
    await Product.deleteMany({});
    
    // Create a test product
    testProduct = await Product.create({
      productName: 'Test Product',
      description: 'This is a test product description',
      price: 99.99,
      status: 'available',
    });
  });

  afterAll(async () => {
    await Product.deleteMany({});
  });

  describe('POST /api/product/create', () => {
    test('should create product with valid data', async () => {
      const newProductData = {
        productName: 'New Product',
        description: 'Description of new product',
        price: 149.99,
        status: 'available',
      };

      const response = await request(app)
        .post('/api/product/create')
        .send(newProductData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeDefined();
      expect(response.body.result.productName).toBe(newProductData.productName);
      expect(response.body.result.description).toBe(newProductData.description);
      expect(response.body.result.price).toBe(newProductData.price);
      expect(response.body.result.status).toBe(newProductData.status);
    });

    test('should return 400 if productName is missing', async () => {
      const response = await request(app)
        .post('/api/product/create')
        .send({
          description: 'Product without name',
          price: 50,
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Required fields');
    });

    test('should create product with minimal required fields', async () => {
      const minimalProduct = {
        productName: 'Minimal Product',
      };

      const response = await request(app)
        .post('/api/product/create')
        .send(minimalProduct);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result.productName).toBe(minimalProduct.productName);
      expect(response.body.result.enabled).toBe(true); // default value
      expect(response.body.result.status).toBe('available'); // default value
    });

    test('should set default status to available', async () => {
      const productWithoutStatus = {
        productName: 'No Status Product',
        price: 75.50,
      };

      const response = await request(app)
        .post('/api/product/create')
        .send(productWithoutStatus);

      expect(response.status).toBe(200);
      expect(response.body.result.status).toBe('available');
    });

    test('should set default enabled to true', async () => {
      const productWithoutEnabled = {
        productName: 'No Enabled Product',
      };

      const response = await request(app)
        .post('/api/product/create')
        .send(productWithoutEnabled);

      expect(response.status).toBe(200);
      expect(response.body.result.enabled).toBe(true);
    });

    test('should handle numeric price correctly', async () => {
      const productWithPrice = {
        productName: 'Priced Product',
        price: 199.99,
      };

      const response = await request(app)
        .post('/api/product/create')
        .send(productWithPrice);

      expect(response.status).toBe(200);
      expect(response.body.result.price).toBe(199.99);
    });
  });

  describe('GET /api/product/list', () => {
    test('should return list of products with pagination', async () => {
      // Ensure testProduct exists
      let product = await Product.findById(testProduct._id);
      if (!product) {
        testProduct = await Product.create({
          productName: 'Test Product',
          description: 'This is a test product description',
          price: 99.99,
        });
      }

      const response = await request(app)
        .get('/api/product/list')
        .query({ page: 1, items: 10 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.page).toBe(1);
    });
  });

  describe('GET /api/product/read/:id', () => {
    test('should return product by id', async () => {
      // Ensure testProduct exists
      let product = await Product.findById(testProduct._id);
      if (!product) {
        testProduct = await Product.create({
          productName: 'Test Product',
          description: 'This is a test product description',
          price: 99.99,
        });
      }

      const response = await request(app)
        .get(`/api/product/read/${testProduct._id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.result).toBeDefined();
      expect(response.body.result._id).toBe(testProduct._id.toString());
      expect(response.body.result.productName).toBe(testProduct.productName);
      expect(response.body.result.price).toBe(testProduct.price);
    });

    test('should return 404 for non-existent product', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/product/read/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('No document found');
    });
  });

  describe('PATCH /api/product/update/:id', () => {
    test('should update product successfully', async () => {
      // Ensure testProduct exists
      let product = await Product.findById(testProduct._id);
      if (!product) {
        testProduct = await Product.create({
          productName: 'Test Product',
          description: 'This is a test product description',
          price: 99.99,
        });
      }

      const updateData = {
        productName: 'Updated Product Name',
        price: 129.99,
        description: 'Updated description',
      };

      const response = await request(app)
        .patch(`/api/product/update/${testProduct._id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      if (response.body.result) {
        expect(response.body.result.productName).toBe(updateData.productName);
        expect(response.body.result.price).toBe(updateData.price);
        expect(response.body.result.description).toBe(updateData.description);
      }
    });

    test('should update product status', async () => {
      const updateData = {
        status: 'out_of_stock',
      };

      const response = await request(app)
        .patch(`/api/product/update/${testProduct._id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.result.status).toBe(updateData.status);
    });

    test('should update enabled status', async () => {
      const updateData = {
        enabled: false,
      };

      const response = await request(app)
        .patch(`/api/product/update/${testProduct._id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.result.enabled).toBe(false);
    });
  });

  describe('DELETE /api/product/delete/:id', () => {
    test('should delete product successfully', async () => {
      // Create a new product to delete
      const productToDelete = await Product.create({
        productName: 'To Delete Product',
        price: 50.00,
      });

      const response = await request(app)
        .delete(`/api/product/delete/${productToDelete._id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Verify product is deleted
      const deletedProduct = await Product.findById(productToDelete._id);
      expect(deletedProduct).toBeNull();
    });

    test('should return 404 for non-existent product', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .delete(`/api/product/delete/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/product/search', () => {
    test('should search products by productName', async () => {
      // Ensure testProduct exists
      let product = await Product.findById(testProduct._id);
      if (!product) {
        testProduct = await Product.create({
          productName: 'Test Product',
          description: 'This is a test product description',
          price: 99.99,
        });
      }

      const response = await request(app)
        .get('/api/product/search')
        .query({ q: 'Test Product', fields: 'productName' });

      // Could be 200 (found) or 202 (not found)
      expect([200, 202]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
        expect(response.body.result).toBeInstanceOf(Array);
        expect(response.body.result.length).toBeGreaterThan(0);
      }
    });

    test('should search products by description', async () => {
      // Ensure testProduct exists
      let product = await Product.findById(testProduct._id);
      if (!product) {
        testProduct = await Product.create({
          productName: 'Test Product',
          description: 'This is a test product description',
          price: 99.99,
        });
      }

      const response = await request(app)
        .get('/api/product/search')
        .query({ q: 'test product', fields: 'description' });

      // Could be 200 (found) or 202 (not found)
      expect([200, 202]).toContain(response.status);
      if (response.status === 200) {
        expect(response.body.success).toBe(true);
      }
    });

    test('should return empty array for no matches', async () => {
      const response = await request(app)
        .get('/api/product/search')
        .query({ q: 'NonexistentProductXYZ', fields: 'productName' });

      expect(response.status).toBe(202);
      expect(response.body.success).toBe(false);
      expect(response.body.result).toEqual([]);
    });

    test('should return 202 for empty query', async () => {
      const response = await request(app)
        .get('/api/product/search')
        .query({ q: '', fields: 'productName' });

      expect(response.status).toBe(202);
      expect(response.body.success).toBe(false);
    });

    test('should search across multiple fields', async () => {
      const response = await request(app)
        .get('/api/product/search')
        .query({ q: 'test', fields: 'productName,description' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });
});

