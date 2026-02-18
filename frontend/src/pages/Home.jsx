import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiShieldCheck, HiKey, HiFingerPrint, HiGlobeAlt, HiExclamation, HiChevronRight, HiLightningBolt } from 'react-icons/hi';

const tools = [
    {
        title: 'Password Strength Checker',
        description: 'Analyze your passwords and get improvement tips to create unbreakable credentials.',
        icon: HiKey,
        to: '/tools/password-checker',
        gradient: 'from-cyber-cyan to-cyan-500',
        shadow: 'shadow-cyber'
    },
    {
        title: 'Hash Generator',
        description: 'Generate MD5, SHA-1, and SHA-256 hashes for any text input instantly.',
        icon: HiFingerPrint,
        to: '/tools/hash-generator',
        gradient: 'from-cyber-blue to-indigo-500',
        shadow: 'shadow-blue-glow'
    },
    {
        title: 'Port Scanner',
        description: 'Simulate network port scanning to identify potentially open services and ports.',
        icon: HiGlobeAlt,
        to: '/tools/port-scanner',
        gradient: 'from-cyber-purple to-purple-500',
        shadow: 'shadow-purple-glow'
    },
    {
        title: 'CVE Lookup',
        description: 'Search the vulnerability database for known CVEs by keyword or ID.',
        icon: HiExclamation,
        to: '/tools/cve-lookup',
        gradient: 'from-orange-500 to-cyber-red',
        shadow: 'shadow-[0_0_30px_rgba(249,115,22,0.3)]'
    }
];

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="page-container">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 bg-grid opacity-30"></div>
                <div className="absolute inset-0 bg-hero-gradient"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-3xl"></div>

                <div className="relative section-container py-24 lg:py-32">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 mb-8 animate-fade-in-up">
                            <HiLightningBolt className="w-4 h-4 text-cyber-cyan animate-glow" />
                            <span className="text-xs font-medium text-cyber-cyan uppercase tracking-wider">Cybersecurity Awareness Platform</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6 animate-fade-in-up delay-100">
                            Defend Your{' '}
                            <span className="gradient-text">Digital World</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-cyber-muted max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
                            Access powerful cybersecurity tools, real-time threat intelligence, and educational
                            resources to strengthen your digital defense and stay ahead of cyber threats.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
                            {!isAuthenticated ? (
                                <Link to="/register" className="cyber-button-primary text-lg !px-8 !py-4 hover-lift">
                                    Get Started Free
                                </Link>
                            ) : (
                                <Link to="/dashboard" className="cyber-button-primary text-lg !px-8 !py-4 hover-lift">
                                    Go to Dashboard
                                </Link>
                            )}
                            <Link to="/tools" className="cyber-button-secondary text-lg !px-8 !py-4 hover-lift">
                                Explore Tools
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 animate-fade-in-up delay-400">
                            {[
                                { label: 'Security Tools', value: '4+' },
                                { label: 'Threat Feeds', value: 'Live' },
                                { label: 'CVE Database', value: '12+' },
                                { label: 'Free to Use', value: '100%' }
                            ].map(({ label, value }, index) => (
                                <div key={label} className="text-center animate-scale-in" style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
                                    <p className="text-2xl sm:text-3xl font-bold text-cyber-cyan">{value}</p>
                                    <p className="text-xs text-cyber-muted mt-1 uppercase tracking-wider">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools Section */}
            <section className="section-container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-fade-in-up">
                        Powerful <span className="gradient-text">Security Tools</span>
                    </h2>
                    <p className="text-cyber-muted max-w-2xl mx-auto animate-fade-in-up delay-100">
                        Everything you need to assess and improve your cybersecurity posture, all in one place.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {tools.map(({ title, description, icon: Icon, to, gradient, shadow }, index) => (
                        <Link
                            key={to}
                            to={to}
                            className={`glass-card p-6 group hover:${shadow} hover:border-cyber-cyan/30 transition-all duration-500 animate-fade-in-up hover-lift`}
                            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-float`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-cyber-text group-hover:text-cyber-cyan transition-colors duration-300 mb-2">
                                        {title}
                                    </h3>
                                    <p className="text-sm text-cyber-muted leading-relaxed">{description}</p>
                                </div>
                                <HiChevronRight className="w-5 h-5 text-cyber-muted group-hover:text-cyber-cyan group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Threat Feed Preview */}
            <section className="section-container">
                <div className="glass-card p-8 sm:p-12 text-center animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-red/10 border border-cyber-red/30 mb-6 animate-glow">
                        <span className="w-2 h-2 rounded-full bg-cyber-red animate-pulse"></span>
                        <span className="text-xs font-medium text-cyber-red uppercase tracking-wider">Live Threats</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 animate-fade-in-up delay-100">
                        Stay Informed with <span className="gradient-text">Threat Intelligence</span>
                    </h2>
                    <p className="text-cyber-muted max-w-xl mx-auto mb-8 animate-fade-in-up delay-200">
                        Monitor latest cybersecurity threats and vulnerabilities. Our threat feed keeps you
                        updated with real-time intelligence to protect your assets.
                    </p>
                    <Link to="/threat-feed" className="cyber-button-primary hover-lift animate-fade-in-up delay-300">
                        View Threat Feed
                    </Link>
                </div>
            </section>

            {/* CTA Section */}
            {!isAuthenticated && (
                <section className="section-container pb-24">
                    <div className="relative rounded-2xl overflow-hidden p-8 sm:p-16 animate-fade-in-up">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20"></div>
                        <div className="absolute inset-0 bg-cyber-card/50 backdrop-blur-sm"></div>
                        <div className="relative text-center">
                            <HiShieldCheck className="w-16 h-16 text-cyber-cyan mx-auto mb-6 animate-float" />
                            <h2 className="text-2xl sm:text-4xl font-bold mb-4 animate-fade-in-up delay-100">
                                Ready to Secure Your Digital Presence?
                            </h2>
                            <p className="text-cyber-muted max-w-lg mx-auto mb-8 animate-fade-in-up delay-200">
                                Join CyberShield today and get access to all tools, personalized dashboard,
                                and scan history tracking.
                            </p>
                            <Link to="/register" className="cyber-button-primary text-lg !px-8 !py-4 hover-lift animate-fade-in-up delay-300">
                                Create Free Account
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;
