const express = require('express');
const router = express.Router();
const Price = require('../models/Price');
const { auth, isAdmin } = require('../middleware/auth');

// Get all prices with optional filtering
router.get('/', async (req, res) => {
  try {
    const { country, category, limit = 20, skip = 0 } = req.query;
    
    // Build query
    const query = {};
    if (country) query.country = country;
    if (category) query.category = category;

    // Execute query with pagination
    const prices = await Price.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .populate('reportedBy', 'username');

    // Get total count for pagination
    const total = await Price.countDocuments(query);

    res.json({
      prices,
      total,
      hasMore: total > (parseInt(skip) + parseInt(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prices', error: error.message });
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
    res.status(500).json({ message: 'Error fetching price', error: error.message });
  }
});

// Create a new price report
router.post('/', auth, async (req, res) => {
  try {
    const { country, category, item, price, currency, location, notes } = req.body;

    const newPrice = new Price({
      country,
      category,
      item,
      price,
      currency,
      location,
      notes,
      reportedBy: req.user._id,
    });

    await newPrice.save();

    res.status(201).json({
      message: 'Price report created successfully',
      price: newPrice,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating price report', error: error.message });
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
      return res.status(403).json({ message: 'Not authorized to update this price report' });
    }

    // Update fields
    const updates = Object.keys(req.body);
    const allowedUpdates = ['country', 'category', 'item', 'price', 'currency', 'location', 'notes'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    updates.forEach(update => price[update] = req.body[update]);
    await price.save();

    res.json({
      message: 'Price report updated successfully',
      price,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating price report', error: error.message });
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
      return res.status(403).json({ message: 'Not authorized to delete this price report' });
    }

    await price.remove();

    res.json({ message: 'Price report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting price report', error: error.message });
  }
});

module.exports = router; 