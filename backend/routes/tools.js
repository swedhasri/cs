const express = require('express');
const router = express.Router();
const { checkPasswordStrength, generateHash, portScan, cveLookup } = require('../controllers/toolsController');
const auth = require('../middleware/auth');

/**
 * Tools routes
 * The auth middleware is optional – tools work for both authenticated and anonymous users,
 * but scan history is only recorded for authenticated users.
 */
const optionalAuth = (req, res, next) => {
    const token = req.cookies?.token;
    if (token) {
        return auth(req, res, next);
    }
    req.user = null;
    next();
};

// POST /api/tools/password-strength
router.post('/password-strength', optionalAuth, checkPasswordStrength);

// POST /api/tools/hash
router.post('/hash', optionalAuth, generateHash);

// POST /api/tools/port-scan
router.post('/port-scan', optionalAuth, portScan);

// GET /api/tools/cve
router.get('/cve', optionalAuth, cveLookup);

module.exports = router;
