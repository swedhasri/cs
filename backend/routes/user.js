const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, changePassword, deleteAccount } = require('../controllers/userController');
const { profileValidation, passwordChangeValidation } = require('../middleware/validate');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// GET /api/user/profile
router.get('/profile', getProfile);

// PUT /api/user/profile
router.put('/profile', profileValidation, updateProfile);

// POST /api/user/change-password
router.post('/change-password', passwordChangeValidation, changePassword);

// DELETE /api/user/delete
router.delete('/delete', deleteAccount);

module.exports = router;
