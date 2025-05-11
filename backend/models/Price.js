const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Transport', 'Food', 'Accommodation', 'Activities', 'Shopping', 'Other'],
  },
  item: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
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
priceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Price', priceSchema); 