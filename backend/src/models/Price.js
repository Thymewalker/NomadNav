const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Transport', 'Food', 'Accommodation', 'Activities', 'Shopping', 'Other'],
  },
  item: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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

// Update timestamp before saving
priceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add indexes for better query performance
priceSchema.index({ country: 1, category: 1 });
priceSchema.index({ reportedBy: 1 });
priceSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Price', priceSchema); 