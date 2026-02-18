/**
 * Mock CVE data for demonstration purposes
 * Structured to mimic real NVD data
 */
const mockCves = [
    {
        id: 'CVE-2024-21762',
        description: 'A out-of-bounds write vulnerability in Fortinet FortiOS allows a remote unauthenticated attacker to execute arbitrary code via specially crafted HTTP requests.',
        severity: 'Critical',
        cvssScore: 9.8,
        product: 'FortiOS',
        vendor: 'Fortinet',
        publishedDate: '2024-02-08',
        lastModified: '2024-02-12',
        references: ['https://fortiguard.com/advisory/FG-IR-24-015']
    },
    {
        id: 'CVE-2024-3400',
        description: 'A command injection as a result of arbitrary file creation vulnerability in the GlobalProtect feature of Palo Alto Networks PAN-OS software.',
        severity: 'Critical',
        cvssScore: 10.0,
        product: 'PAN-OS',
        vendor: 'Palo Alto Networks',
        publishedDate: '2024-04-12',
        lastModified: '2024-04-15',
        references: ['https://security.paloaltonetworks.com/CVE-2024-3400']
    },
    {
        id: 'CVE-2024-1709',
        description: 'ConnectWise ScreenConnect authentication bypass vulnerability using an alternate path or channel allows direct access to confidential information.',
        severity: 'Critical',
        cvssScore: 10.0,
        product: 'ScreenConnect',
        vendor: 'ConnectWise',
        publishedDate: '2024-02-19',
        lastModified: '2024-02-22',
        references: ['https://www.connectwise.com/company/trust/security-bulletins']
    },
    {
        id: 'CVE-2023-44228',
        description: 'A deserialization of untrusted data vulnerability in Apache Struts allows remote code execution via crafted parameters.',
        severity: 'High',
        cvssScore: 8.8,
        product: 'Apache Struts',
        vendor: 'Apache',
        publishedDate: '2023-12-07',
        lastModified: '2024-01-10',
        references: ['https://lists.apache.org/thread/security']
    },
    {
        id: 'CVE-2024-0204',
        description: 'Authentication bypass in Fortra GoAnywhere MFT prior to 7.4.1 allows an unauthorized user to create an admin user via the administration portal.',
        severity: 'Critical',
        cvssScore: 9.8,
        product: 'GoAnywhere MFT',
        vendor: 'Fortra',
        publishedDate: '2024-01-22',
        lastModified: '2024-01-25',
        references: ['https://www.fortra.com/security/advisory']
    },
    {
        id: 'CVE-2023-46805',
        description: 'An authentication bypass vulnerability in the web component of Ivanti Connect Secure and Policy Secure allows a remote attacker to access restricted resources.',
        severity: 'High',
        cvssScore: 8.2,
        product: 'Connect Secure',
        vendor: 'Ivanti',
        publishedDate: '2024-01-10',
        lastModified: '2024-01-15',
        references: ['https://forums.ivanti.com/s/article/CVE-2023-46805']
    },
    {
        id: 'CVE-2024-23897',
        description: 'Jenkins CLI arbitrary file read vulnerability allows attackers to read arbitrary files on the Jenkins controller file system.',
        severity: 'Critical',
        cvssScore: 9.8,
        product: 'Jenkins',
        vendor: 'Jenkins Project',
        publishedDate: '2024-01-24',
        lastModified: '2024-01-30',
        references: ['https://www.jenkins.io/security/advisory/2024-01-24/']
    },
    {
        id: 'CVE-2024-27198',
        description: 'Authentication bypass vulnerability in JetBrains TeamCity allows performing admin actions via specially crafted requests.',
        severity: 'Critical',
        cvssScore: 9.8,
        product: 'TeamCity',
        vendor: 'JetBrains',
        publishedDate: '2024-03-04',
        lastModified: '2024-03-08',
        references: ['https://www.jetbrains.com/privacy-security/issues-fixed/']
    },
    {
        id: 'CVE-2023-50164',
        description: 'An attacker can manipulate file upload params to enable path traversal in Apache Struts, leading to remote code execution.',
        severity: 'Critical',
        cvssScore: 9.8,
        product: 'Apache Struts',
        vendor: 'Apache',
        publishedDate: '2023-12-07',
        lastModified: '2023-12-15',
        references: ['https://cwiki.apache.org/confluence/display/WW/S2-066']
    },
    {
        id: 'CVE-2024-21887',
        description: 'Command injection vulnerability in web components of Ivanti Connect Secure and Ivanti Policy Secure allows an authenticated administrator to send specially crafted requests.',
        severity: 'Critical',
        cvssScore: 9.1,
        product: 'Connect Secure',
        vendor: 'Ivanti',
        publishedDate: '2024-01-10',
        lastModified: '2024-01-18',
        references: ['https://forums.ivanti.com/s/article/CVE-2024-21887']
    },
    {
        id: 'CVE-2024-6387',
        description: 'A signal handler race condition in OpenSSH server sshd allows unauthenticated remote code execution as root on glibc-based Linux systems.',
        severity: 'High',
        cvssScore: 8.1,
        product: 'OpenSSH',
        vendor: 'OpenBSD',
        publishedDate: '2024-07-01',
        lastModified: '2024-07-05',
        references: ['https://www.openssh.com/security.html']
    },
    {
        id: 'CVE-2024-4577',
        description: 'PHP CGI argument injection vulnerability allows remote attackers to execute arbitrary code on Windows servers running PHP in CGI mode.',
        severity: 'Critical',
        cvssScore: 9.8,
        product: 'PHP',
        vendor: 'PHP Group',
        publishedDate: '2024-06-06',
        lastModified: '2024-06-10',
        references: ['https://www.php.net/ChangeLog-8.php']
    }
];

module.exports = mockCves;
