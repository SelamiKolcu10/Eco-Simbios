const express = require('express');
const router = express.Router();
const Facility = require('../models/Facility');

// @route   GET /api/facilities
// @desc    Get all facilities
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { region, type } = req.query;
        const filter = {};
        if (region) filter.region = region;
        if (type)   filter.type   = type;

        const facilities = await Facility.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, count: facilities.length, data: facilities });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   POST /api/facilities
// @desc    Create a new facility
// @access  Public
router.post('/', async (req, res) => {
    try {
        const facility = await Facility.create(req.body);
        res.status(201).json({ success: true, data: facility });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// @route   GET /api/facilities/:id
// @desc    Get single facility
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const facility = await Facility.findById(req.params.id);
        if (!facility) {
            return res.status(404).json({ success: false, message: 'Facility not found' });
        }
        res.json({ success: true, data: facility });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   DELETE /api/facilities/:id
// @desc    Delete a facility
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const facility = await Facility.findByIdAndDelete(req.params.id);
        if (!facility) {
            return res.status(404).json({ success: false, message: 'Facility not found' });
        }
        res.json({ success: true, message: 'Facility deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
