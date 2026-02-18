const crypto = require('crypto');
const Scan = require('../models/Scan');
const mockCves = require('../data/mockCves');

/**
 * Password Strength Checker
 * POST /api/tools/password-strength
 */
const checkPasswordStrength = async (req, res, next) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: 'Password is required'
            });
        }

        let score = 0;
        const tips = [];
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            numbers: /[0-9]/.test(password),
            special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
            longPassword: password.length >= 12,
            veryLong: password.length >= 16,
            noCommon: !['password', '123456', 'qwerty', 'abc123', 'letmein', 'admin', 'welcome'].includes(password.toLowerCase())
        };

        if (checks.length) score += 1; else tips.push('Use at least 8 characters');
        if (checks.uppercase) score += 1; else tips.push('Add uppercase letters (A-Z)');
        if (checks.lowercase) score += 1; else tips.push('Add lowercase letters (a-z)');
        if (checks.numbers) score += 1; else tips.push('Include numbers (0-9)');
        if (checks.special) score += 2; else tips.push('Add special characters (!@#$%...)');
        if (checks.longPassword) score += 1;
        if (checks.veryLong) score += 1;
        if (!checks.noCommon) { score = Math.max(score - 3, 0); tips.push('Avoid common passwords'); }

        let strength;
        if (score <= 2) strength = 'Weak';
        else if (score <= 4) strength = 'Medium';
        else if (score <= 6) strength = 'Strong';
        else strength = 'Very Strong';

        const result = { strength, score, maxScore: 8, checks, tips };

        // Record scan if user is authenticated
        if (req.user) {
            await Scan.create({
                user_id: req.user.id,
                scan_type: 'password_check',
                input_data: JSON.stringify({ passwordLength: password.length }),
                result: JSON.stringify({ strength, score })
            });
        }

        res.json({ success: true, ...result });
    } catch (error) {
        next(error);
    }
};

/**
 * Hash Generator
 * POST /api/tools/hash
 */
const generateHash = async (req, res, next) => {
    try {
        const { text, algorithm } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: 'Text is required'
            });
        }

        const validAlgorithms = ['md5', 'sha1', 'sha256'];
        const algo = (algorithm || 'sha256').toLowerCase();

        if (!validAlgorithms.includes(algo)) {
            return res.status(400).json({
                success: false,
                message: `Invalid algorithm. Use one of: ${validAlgorithms.join(', ')}`
            });
        }

        const hash = crypto.createHash(algo).update(text).digest('hex');

        // Record scan if authenticated
        if (req.user) {
            await Scan.create({
                user_id: req.user.id,
                scan_type: 'hash',
                input_data: JSON.stringify({ textLength: text.length, algorithm: algo }),
                result: JSON.stringify({ hash, algorithm: algo })
            });
        }

        res.json({
            success: true,
            hash,
            algorithm: algo,
            inputLength: text.length
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Simulated Port Scanner
 * POST /api/tools/port-scan
 */
const portScan = async (req, res, next) => {
    try {
        const { host, startPort, endPort } = req.body;

        if (!host) {
            return res.status(400).json({
                success: false,
                message: 'Host is required'
            });
        }

        const start = parseInt(startPort) || 1;
        const end = parseInt(endPort) || 1024;

        if (start < 1 || end > 65535 || start > end) {
            return res.status(400).json({
                success: false,
                message: 'Invalid port range. Use 1-65535.'
            });
        }

        // Simulate scanning with common ports
        const commonPorts = {
            21: 'FTP', 22: 'SSH', 23: 'Telnet', 25: 'SMTP',
            53: 'DNS', 80: 'HTTP', 110: 'POP3', 143: 'IMAP',
            443: 'HTTPS', 993: 'IMAPS', 995: 'POP3S',
            3306: 'MySQL', 3389: 'RDP', 5432: 'PostgreSQL',
            6379: 'Redis', 8080: 'HTTP-Alt', 8443: 'HTTPS-Alt',
            27017: 'MongoDB'
        };

        const openPorts = [];

        for (const [port, service] of Object.entries(commonPorts)) {
            const portNum = parseInt(port);
            if (portNum >= start && portNum <= end) {
                // Randomly decide if port is "open" (60% chance for common ports)
                if (Math.random() > 0.4) {
                    openPorts.push({
                        port: portNum,
                        state: 'open',
                        service
                    });
                }
            }
        }

        // Add a few random ports
        const randomCount = Math.floor(Math.random() * 3);
        for (let i = 0; i < randomCount; i++) {
            const randomPort = Math.floor(Math.random() * (end - start + 1)) + start;
            if (!openPorts.find(p => p.port === randomPort)) {
                openPorts.push({
                    port: randomPort,
                    state: 'open',
                    service: 'Unknown'
                });
            }
        }

        openPorts.sort((a, b) => a.port - b.port);

        const result = {
            host,
            portRange: `${start}-${end}`,
            totalScanned: end - start + 1,
            openPorts,
            scanTime: `${(Math.random() * 2 + 0.5).toFixed(2)}s`
        };

        // Record scan if authenticated
        if (req.user) {
            await Scan.create({
                user_id: req.user.id,
                scan_type: 'port_scan',
                input_data: JSON.stringify({ host, startPort: start, endPort: end }),
                result: JSON.stringify({ openPortCount: openPorts.length })
            });
        }

        // Add artificial delay to simulate real scanning
        await new Promise(resolve => setTimeout(resolve, 1500));

        res.json({ success: true, ...result });
    } catch (error) {
        next(error);
    }
};

/**
 * CVE Lookup
 * GET /api/tools/cve?keyword=...
 */
const cveLookup = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json({
                success: false,
                message: 'Search keyword is required'
            });
        }

        const searchTerm = keyword.toLowerCase();
        const results = mockCves.filter(cve =>
            cve.id.toLowerCase().includes(searchTerm) ||
            cve.description.toLowerCase().includes(searchTerm) ||
            cve.product.toLowerCase().includes(searchTerm)
        );

        // Record scan if authenticated
        if (req.user) {
            await Scan.create({
                user_id: req.user.id,
                scan_type: 'cve_lookup',
                input_data: JSON.stringify({ keyword }),
                result: JSON.stringify({ resultsFound: results.length })
            });
        }

        res.json({
            success: true,
            keyword,
            totalResults: results.length,
            results
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { checkPasswordStrength, generateHash, portScan, cveLookup };
