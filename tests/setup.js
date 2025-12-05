const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const glob = require('glob');
const path = require('path');

let mongoServer;
let sessionStore = null;

// Set test environment variables BEFORE importing app
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only';
process.env.SECRET = 'test-secret-key';
process.env.KEY = 'test-key';
process.env.JWT_TOKEN_EXPIRATION = '18000000';
process.env.DATABASE = ''; // Will be set in beforeAll

// Setup before all tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.DATABASE = mongoUri;
  
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  // Load all models (similar to server.js)
  glob.sync('./models/*.js').forEach(function (file) {
    require(path.resolve(file));
  });
}, 30000); // 30 second timeout for setup

// Cleanup after each test - but preserve test data created in beforeAll
// We'll handle cleanup in individual test files if needed
// afterEach(async () => {
//   const collections = mongoose.connection.collections;
//   for (const key in collections) {
//     await collections[key].deleteMany({});
//   }
// });

// Cleanup after all tests
afterAll(async () => {
  try {
    // Close session store if it exists
    if (sessionStore && typeof sessionStore.close === 'function') {
      await new Promise((resolve) => {
        sessionStore.close(() => resolve());
      });
    }
    
    // Close all mongoose connections
    if (mongoose.connection.readyState === 1) { // 1 = connected
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
    }
    
    // Force disconnect all connections
    await mongoose.disconnect();
    
    // Stop MongoDB Memory Server
    if (mongoServer) {
      await mongoServer.stop();
    }
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
  
  // Give time for cleanup
  await new Promise(resolve => setTimeout(resolve, 200));
}, 15000); // 15 second timeout for cleanup

