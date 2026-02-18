import { Link } from 'react-router-dom';
import { HiShieldCheck } from 'react-icons/hi';

const Footer = () => {
    return (
        <footer className="bg-cyber-darker border-t border-cyber-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <HiShieldCheck className="w-7 h-7 text-cyber-cyan" />
                            <span className="text-lg font-bold gradient-text">CyberShield</span>
                        </Link>
                        <p className="text-cyber-muted text-sm leading-relaxed max-w-md">
                            Your comprehensive cybersecurity awareness platform. Access powerful tools,
                            stay updated with threat intelligence, and strengthen your digital defense.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-cyber-text uppercase tracking-wider mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { to: '/tools', label: 'Tools' },
                                { to: '/threat-feed', label: 'Threat Feed' },
                                { to: '/about', label: 'About' },
                                { to: '/contact', label: 'Contact' }
                            ].map(({ to, label }) => (
                                <li key={to}>
                                    <Link to={to} className="text-sm text-cyber-muted hover:text-cyber-cyan transition-colors duration-300">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tools */}
                    <div>
                        <h3 className="text-sm font-semibold text-cyber-text uppercase tracking-wider mb-4">Tools</h3>
                        <ul className="space-y-3">
                            {[
                                { to: '/tools/password-checker', label: 'Password Checker' },
                                { to: '/tools/hash-generator', label: 'Hash Generator' },
                                { to: '/tools/port-scanner', label: 'Port Scanner' },
                                { to: '/tools/cve-lookup', label: 'CVE Lookup' }
                            ].map(({ to, label }) => (
                                <li key={to}>
                                    <Link to={to} className="text-sm text-cyber-muted hover:text-cyber-cyan transition-colors duration-300">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-cyber-border flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-cyber-muted">
                        &copy; {new Date().getFullYear()} CyberShield. All rights reserved.
                    </p>
                    <p className="text-xs text-cyber-muted">
                        Built for cybersecurity awareness and education
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
