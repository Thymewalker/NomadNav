const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
  },
  currency: {
    type: String,
    required: true,
    trim: true,
  },
  language: {
    type: String,
    required: true,
    trim: true,
  },
  emergencyNumbers: {
    police: {
      type: String,
      required: true,
    },
    ambulance: {
      type: String,
      required: true,
    },
    fire: {
      type: String,
      required: true,
    },
    touristPolice: {
      type: String,
      required: true,
    },
  },
  visaRequirements: {
    type: String,
    required: true,
  },
  guides: [{
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  }],
  transport: [{
    type: {
      type: String,
      required: true,
      enum: ['Bus', 'Train', 'Metro', 'Taxi', 'Ride-hailing', 'Other'],
    },
    description: {
      type: String,
      required: true,
    },
    tips: {
      type: String,
      required: true,
    },
  }],
  hagglingTips: [{
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
countrySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country; 