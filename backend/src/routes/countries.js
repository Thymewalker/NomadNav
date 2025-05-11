const express = require('express');
const router = express.Router();
const Country = require('../models/Country');
const { auth, isAdmin } = require('../middleware/auth');

// Get all countries
router.get('/', async (req, res) => {
  try {
    const countries = await Country.find();
    console.log('All countries in DB:', countries.map(c => c.name));
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single country by code
router.get('/:code', async (req, res) => {
  try {
    console.log('Searching for country with code:', req.params.code);
    const country = await Country.findOne({ code: req.params.code.toUpperCase() });
    
    if (!country) {
      console.log('Country not found with code:', req.params.code);
      return res.status(404).json({ message: 'Country not found' });
    }

    res.json({ country });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new country (admin only)
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const {
      name,
      code,
      currency,
      language,
      emergencyNumbers,
      visaRequirements,
      guides,
      transport,
      hagglingTips,
    } = req.body;

    const newCountry = new Country({
      name,
      code: code.toUpperCase(),
      currency,
      language,
      emergencyNumbers,
      visaRequirements,
      guides,
      transport,
      hagglingTips,
    });

    await newCountry.save();

    res.status(201).json({
      message: 'Country created successfully',
      country: newCountry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a country (admin only)
router.patch('/:code', auth, isAdmin, async (req, res) => {
  try {
    console.log('Updating country with code:', req.params.code);
    const country = await Country.findOne({ code: req.params.code.toUpperCase() });
    
    if (!country) {
      console.log('Country not found for update:', req.params.code);
      return res.status(404).json({ message: 'Country not found' });
    }

    // Update fields
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'name',
      'currency',
      'language',
      'emergencyNumbers',
      'visaRequirements',
      'guides',
      'transport',
      'hagglingTips',
    ];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }

    updates.forEach(update => country[update] = req.body[update]);
    await country.save();

    res.json({
      message: 'Country updated successfully',
      country,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a country (admin only)
router.delete('/:code', auth, isAdmin, async (req, res) => {
  try {
    console.log('Deleting country with code:', req.params.code);
    const country = await Country.findOne({ code: req.params.code.toUpperCase() });
    
    if (!country) {
      console.log('Country not found for delete:', req.params.code);
      return res.status(404).json({ message: 'Country not found' });
    }

    await Country.findByIdAndDelete(country._id);
    res.json({ message: 'Country deleted successfully' });
  } catch (error) {
    console.error('Error deleting country:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 