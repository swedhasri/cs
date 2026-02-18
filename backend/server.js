const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const sequelize = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const toolsRoutes = require('./routes/tools');
const threatFeedRoutes = require('./routes/threatFeed');

// Import models to ensure associations are set up
require('./models/User');
require('./models/Scan');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/api/threat-feed', threatFeedRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use('/api/*', (req, res) => {
    res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// Error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log('✅ Database connection established');

        // Sync models (creates tables if they don\'t exist)
        await sequelize.sync({ alter: false });
        console.log('✅ Database models synchronized');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📡 API available at http://localhost:${PORT}/api`);
        });
    } catch (error) {
        console.error('❌ Unable to start server:', error.message);
        console.log('💡 Make sure MySQL is running and the database exists.');
        console.log('💡 Run the schema.sql script: mysql -u root < database/schema.sql');

        // Start server anyway without DB for development
        console.log('\n⚠️  Starting server without database connection...');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT} (no DB)`);
        });
    }
};

startServer();
