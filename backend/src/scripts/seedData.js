const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Country = require('../models/Country');
const Price = require('../models/Price');
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nomadnav', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Country.deleteMany({});
    await Price.deleteMany({});
    console.log('Cleared existing data');

    // Create test users
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@test.com',
      password: 'admin123',
      role: 'admin',
    });

    const regularUser = await User.create({
      username: 'user',
      email: 'user@test.com',
      password: 'user123',
      role: 'user',
    });
    console.log('Created test users');

    // Create test countries
    const egypt = await Country.create({
      name: 'Egypt',
      code: 'EG',
      currency: 'EGP',
      language: 'Arabic',
      emergencyNumbers: {
        police: '122',
        ambulance: '123',
        fire: '180',
        touristPolice: '126',
      },
      visaRequirements: 'Most nationalities can get a visa on arrival for 30 days.',
      guides: [
        {
          title: 'Pyramids of Giza',
          content: 'Visit early morning to avoid crowds and heat.',
        },
      ],
      transport: [
        {
          type: 'Metro',
          description: 'Cairo Metro is the main public transport system.',
          tips: 'Avoid rush hours and keep your belongings close.',
        },
      ],
      hagglingTips: [
        {
          title: 'Markets',
          description: 'Start at 30% of the asking price and negotiate up.',
        },
      ],
    });

    const thailand = await Country.create({
      name: 'Thailand',
      code: 'TH',
      currency: 'THB',
      language: 'Thai',
      emergencyNumbers: {
        police: '191',
        ambulance: '1669',
        fire: '199',
        touristPolice: '1155',
      },
      visaRequirements: 'Many nationalities get 30 days visa exemption.',
      guides: [
        {
          title: 'Bangkok Temples',
          content: 'Dress modestly and remove shoes before entering.',
        },
      ],
      transport: [
        {
          type: 'Tuk-tuk',
          description: 'Traditional three-wheeled taxi.',
          tips: 'Always negotiate the price before getting in.',
        },
      ],
      hagglingTips: [
        {
          title: 'Night Markets',
          description: 'Start at 50% of the asking price.',
        },
      ],
    });
    console.log('Created test countries');

    // Create test prices
    await Price.create([
      {
        country: 'Egypt',
        category: 'Transport',
        item: 'Metro Ticket',
        price: 5,
        currency: 'EGP',
        location: 'Cairo',
        notes: 'Single journey ticket',
        reportedBy: regularUser._id,
      },
      {
        country: 'Egypt',
        category: 'Food',
        item: 'Falafel Sandwich',
        price: 10,
        currency: 'EGP',
        location: 'Cairo',
        notes: 'Local street food',
        reportedBy: regularUser._id,
      },
      {
        country: 'Thailand',
        category: 'Transport',
        item: 'BTS Skytrain',
        price: 35,
        currency: 'THB',
        location: 'Bangkok',
        notes: 'Single journey ticket',
        reportedBy: adminUser._id,
      },
      {
        country: 'Thailand',
        category: 'Food',
        item: 'Pad Thai',
        price: 50,
        currency: 'THB',
        location: 'Bangkok',
        notes: 'Street food version',
        reportedBy: adminUser._id,
      },
    ]);
    console.log('Created test prices');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData(); 