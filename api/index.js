const app = require('../backend/server');

// Initialize database connection for serverless
const sequelize = require('../backend/config/db');

// Ensure models are initialized
require('../backend/models/User');
require('../backend/models/Scan');

// Initialize database connection
const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

// Initialize DB on cold start
initDb();

module.exports = app;
