const mongoose = require('mongoose');
require('dotenv').config();

// Connect to test database before running tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nomadnav_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear database after each test
afterEach(async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
});

// Close database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
}); 