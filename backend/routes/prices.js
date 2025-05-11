const express = require('express');
const router = express.Router();
const Price = require('../models/Price');
const auth = require('../middleware/auth');

// Get all prices with optional filtering
router.get('/', async (req, res) => {
  try {
    const { country, category, limit = 50, skip = 0 } = req.query;
    const query = {};

    if (country) query.country = country;
    if (category) query.category = category;

    const prices = await Price.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .populate('reportedBy', 'username');

    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single price by ID
router.get('/:id', async (req, res) => {
  try {
    const price = await Price.findById(req.params.id)
      .populate('reportedBy', 'username');
    
    if (!price) {
      return res.status(404).json({ message: 'Price not found' });
    }
    
    res.json(price);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new price report
router.post('/', auth, async (req, res) => {
  try {
    const price = new Price({
      ...req.body,
      reportedBy: req.user._id,
    });

    const newPrice = await price.save();
    res.status(201).json(newPrice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a price report
router.patch('/:id', auth, async (req, res) => {
  try {
    const price = await Price.findById(req.params.id);
    
    if (!price) {
      return res.status(404).json({ message: 'Price not found' });
    }

    // Check if user is the reporter or an admin
    if (price.reportedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this price' });
    }

    Object.assign(price, req.body);
    const updatedPrice = await price.save();
    res.json(updatedPrice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a price report
router.delete('/:id', auth, async (req, res) => {
  try {
    const price = await Price.findById(req.params.id);
    
    if (!price) {
      return res.status(404).json({ message: 'Price not found' });
    }

    // Check if user is the reporter or an admin
    if (price.reportedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this price' });
    }

    await Price.findByIdAndDelete(req.params.id);
    res.json({ message: 'Price deleted successfully' });
  } catch (error) {
    console.error('Error deleting price:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 