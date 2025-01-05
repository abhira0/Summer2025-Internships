const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const APPLICATIONS_FILE = path.join(__dirname, '../../docs/data/user_applications.json');

// Get all applications
router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(APPLICATIONS_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to read applications' });
    }
});

// Update applications
router.post('/', async (req, res) => {
    try {
        await fs.writeFile(APPLICATIONS_FILE, JSON.stringify(req.body, null, 2));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save applications' });
    }
});

module.exports = router;
