-- Cybersecurity Awareness & Toolkit Database Setup
-- Run this script in MySQL to create the database and tables.

CREATE DATABASE IF NOT EXISTS cyber_toolkit;
USE cyber_toolkit;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Scans table (records user activity)
CREATE TABLE IF NOT EXISTS scans (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  scan_type ENUM('password_check', 'hash', 'port_scan', 'cve_lookup') NOT NULL,
  input_data TEXT,
  result TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Index for faster user activity lookups
CREATE INDEX idx_scans_user_id ON scans(user_id);
CREATE INDEX idx_scans_created_at ON scans(created_at);
