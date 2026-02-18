const express = require('express');
const router = express.Router();
const mockThreats = require('../data/mockThreats');

/**
 * Threat Intelligence Feed
 * GET /api/threat-feed
 * Public endpoint – no authentication required
 */
router.get('/', (req, res) => {
    const { severity, category, limit } = req.query;

    let results = [...mockThreats];

    // Filter by severity
    if (severity) {
        results = results.filter(t => t.severity.toLowerCase() === severity.toLowerCase());
    }

    // Filter by category
    if (category) {
        results = results.filter(t => t.category.toLowerCase() === category.toLowerCase());
    }

    // Limit results
    if (limit) {
        results = results.slice(0, parseInt(limit));
    }

    res.json({
        success: true,
        totalResults: results.length,
        results
    });
});

module.exports = router;
