const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Scan = sequelize.define('Scan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    scan_type: {
        type: DataTypes.ENUM('password_check', 'hash', 'port_scan', 'cve_lookup'),
        allowNull: false
    },
    input_data: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    result: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'scans',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

// Define association
User.hasMany(Scan, { foreignKey: 'user_id', as: 'scans' });
Scan.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Scan;
