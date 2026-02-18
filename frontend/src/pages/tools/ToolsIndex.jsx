import { Link } from 'react-router-dom';
import { HiKey, HiFingerPrint, HiGlobeAlt, HiExclamation, HiChevronRight } from 'react-icons/hi';

const tools = [
    {
        title: 'Password Strength Checker',
        description: 'Test your passwords against multiple criteria including length, character variety, and common password detection. Get actionable tips to create stronger passwords.',
        icon: HiKey,
        to: '/tools/password-checker',
        gradient: 'from-cyber-cyan to-cyan-500',
        features: ['Strength scoring', 'Character analysis', 'Improvement tips']
    },
    {
        title: 'Hash Generator',
        description: 'Generate cryptographic hashes using MD5, SHA-1, and SHA-256 algorithms. Perfect for verifying file integrity or understanding hashing concepts.',
        icon: HiFingerPrint,
        to: '/tools/hash-generator',
        gradient: 'from-cyber-blue to-indigo-500',
        features: ['MD5, SHA-1, SHA-256', 'Instant generation', 'Copy to clipboard']
    },
    {
        title: 'Port Scanner',
        description: 'Simulate network port scanning to learn about open services and potential attack surfaces. Identifies common ports and their associated services.',
        icon: HiGlobeAlt,
        to: '/tools/port-scanner',
        gradient: 'from-cyber-purple to-purple-500',
        features: ['Custom port ranges', 'Service detection', 'Scan simulation']
    },
    {
        title: 'CVE Lookup',
        description: 'Search the vulnerability database for known CVEs by keyword or ID. View severity levels, CVSS scores, and detailed descriptions of security flaws.',
        icon: HiExclamation,
        to: '/tools/cve-lookup',
        gradient: 'from-orange-500 to-cyber-red',
        features: ['Keyword search', 'Severity filtering', 'CVSS scoring']
    }
];

const ToolsIndex = () => {
    return (
        <div className="page-container">
            <div className="section-container">
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                        Security <span className="gradient-text">Tools</span>
                    </h1>
                    <p className="text-cyber-muted max-w-2xl mx-auto">
                        Access our suite of cybersecurity tools designed for education and awareness.
                        Each tool simulates real-world security operations in a safe environment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {tools.map(({ title, description, icon: Icon, to, gradient, features }) => (
                        <Link
                            key={to}
                            to={to}
                            className="glass-card p-6 group hover:shadow-cyber hover:border-cyber-cyan/30 transition-all duration-500"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <Icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-cyber-text group-hover:text-cyber-cyan transition-colors duration-300 mb-2">
                                {title}
                            </h3>
                            <p className="text-sm text-cyber-muted leading-relaxed mb-4">
                                {description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {features.map((feat) => (
                                    <span key={feat} className="px-2.5 py-1 rounded-full text-xs bg-cyber-darker text-cyber-muted border border-cyber-border">
                                        {feat}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-1 text-sm font-medium text-cyber-cyan">
                                Launch Tool
                                <HiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ToolsIndex;
