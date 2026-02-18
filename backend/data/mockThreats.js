/**
 * Mock threat intelligence feed data
 * Simulates real cybersecurity news and threat alerts
 */
const mockThreats = [
    {
        id: 1,
        title: 'Critical Zero-Day Vulnerability Found in Popular VPN Software',
        summary: 'Security researchers have discovered a critical zero-day vulnerability affecting millions of VPN users worldwide. The flaw allows remote code execution without authentication and is being actively exploited in the wild.',
        category: 'Zero-Day',
        severity: 'Critical',
        date: '2024-12-15',
        source: 'CyberThreat Intel',
        link: 'https://example.com/threat/vpn-zero-day',
        tags: ['VPN', 'RCE', 'Zero-Day']
    },
    {
        id: 2,
        title: 'Massive Ransomware Campaign Targets Healthcare Sector',
        summary: 'A new ransomware variant dubbed "MedLock" has been targeting healthcare institutions across North America and Europe. The malware encrypts patient records and demands cryptocurrency payment.',
        category: 'Ransomware',
        severity: 'High',
        date: '2024-12-14',
        source: 'HealthSec Watch',
        link: 'https://example.com/threat/medlock-ransomware',
        tags: ['Ransomware', 'Healthcare', 'Data Breach']
    },
    {
        id: 3,
        title: 'AI-Powered Phishing Attacks Surge by 300%',
        summary: 'Cybersecurity firms report a dramatic increase in AI-generated phishing emails that are nearly indistinguishable from legitimate communications. The attacks leverage large language models to craft personalized lures.',
        category: 'Phishing',
        severity: 'High',
        date: '2024-12-13',
        source: 'PhishGuard Reports',
        link: 'https://example.com/threat/ai-phishing',
        tags: ['AI', 'Phishing', 'Social Engineering']
    },
    {
        id: 4,
        title: 'Supply Chain Attack Compromises Popular NPM Packages',
        summary: 'Multiple popular NPM packages have been found to contain malicious code injected through a compromised maintainer account. The packages collectively have over 10 million weekly downloads.',
        category: 'Supply Chain',
        severity: 'Critical',
        date: '2024-12-12',
        source: 'DevSecOps Alert',
        link: 'https://example.com/threat/npm-supply-chain',
        tags: ['Supply Chain', 'NPM', 'Malware']
    },
    {
        id: 5,
        title: 'New Bluetooth Vulnerability Affects Billions of Devices',
        summary: 'A newly discovered Bluetooth protocol vulnerability allows attackers within radio range to intercept and modify data transmitted between paired devices. Patches are being rolled out by major vendors.',
        category: 'Hardware',
        severity: 'Medium',
        date: '2024-12-11',
        source: 'HardwareSec',
        link: 'https://example.com/threat/bluetooth-vuln',
        tags: ['Bluetooth', 'IoT', 'Hardware']
    },
    {
        id: 6,
        title: 'State-Sponsored APT Group Launches New Espionage Campaign',
        summary: 'A sophisticated advanced persistent threat (APT) group linked to a nation-state has been conducting targeted espionage operations against government agencies and defense contractors using novel malware.',
        category: 'APT',
        severity: 'Critical',
        date: '2024-12-10',
        source: 'Mandiant Research',
        link: 'https://example.com/threat/apt-espionage',
        tags: ['APT', 'Espionage', 'Nation-State']
    },
    {
        id: 7,
        title: 'Critical SQL Injection Flaw in Popular CMS Platform',
        summary: 'A critical SQL injection vulnerability has been discovered in a widely-used content management system, potentially affecting over 500,000 websites. An emergency patch has been released.',
        category: 'Web Security',
        severity: 'High',
        date: '2024-12-09',
        source: 'WebSec Bulletin',
        link: 'https://example.com/threat/cms-sqli',
        tags: ['SQL Injection', 'CMS', 'Web']
    },
    {
        id: 8,
        title: 'Cryptojacking Malware Spreads Through Docker Containers',
        summary: 'A new cryptojacking campaign is targeting misconfigured Docker containers to mine cryptocurrency. The malware spreads laterally through container orchestration platforms.',
        category: 'Malware',
        severity: 'Medium',
        date: '2024-12-08',
        source: 'CloudSec Monitor',
        link: 'https://example.com/threat/docker-cryptojack',
        tags: ['Cryptojacking', 'Docker', 'Cloud']
    },
    {
        id: 9,
        title: 'New Data Privacy Regulations Take Effect Globally',
        summary: 'Several new data privacy regulations have come into effect across different regions, imposing stricter requirements on data handling and breach notification. Organizations must update their compliance programs.',
        category: 'Compliance',
        severity: 'Low',
        date: '2024-12-07',
        source: 'ComplianceWire',
        link: 'https://example.com/threat/privacy-regulations',
        tags: ['Privacy', 'Compliance', 'GDPR']
    },
    {
        id: 10,
        title: 'Critical Vulnerability in Industrial Control Systems',
        summary: 'CISA has issued an emergency advisory regarding critical vulnerabilities in industrial control systems used in power plants and water treatment facilities. Immediate patching is recommended.',
        category: 'ICS/SCADA',
        severity: 'Critical',
        date: '2024-12-06',
        source: 'CISA Advisory',
        link: 'https://example.com/threat/ics-vulnerability',
        tags: ['ICS', 'SCADA', 'Critical Infrastructure']
    }
];

module.exports = mockThreats;
