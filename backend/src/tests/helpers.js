const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Create a test user and return their token
const createTestUser = async (role = 'user') => {
  const uniqueId = Date.now().toString();
  const user = await User.create({
    username: `testuser_${uniqueId}`,
    email: `test_${uniqueId}@example.com`,
    password: 'password123',
    role,
  });

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1h' }
  );

  return { user, token };
};

// Create test price data
const createTestPriceData = (userId) => ({
  country: 'Test Country',
  category: 'Food',
  item: 'Test Item',
  price: 10,
  currency: 'USD',
  location: 'Test Location',
  notes: 'Test notes',
  reportedBy: userId,
});

// Create test country data
const createTestCountryData = () => ({
  name: 'Test Country',
  code: 'TC',
  currency: 'USD',
  language: 'English',
  emergencyNumbers: {
    police: '911',
    ambulance: '911',
    fire: '911',
    touristPolice: '911',
  },
  visaRequirements: 'Test visa requirements',
  guides: [
    {
      title: 'Test Guide',
      content: 'Test content',
    },
  ],
  transport: [
    {
      type: 'Bus',
      description: 'Test transport',
      tips: 'Test tips',
    },
  ],
  hagglingTips: [
    {
      title: 'Test Tips',
      description: 'Test description',
    },
  ],
});

module.exports = {
  createTestUser,
  createTestPriceData,
  createTestCountryData,
}; 