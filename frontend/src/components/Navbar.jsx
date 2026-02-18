import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiMenu, HiX, HiShieldCheck } from 'react-icons/hi';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/tools', label: 'Tools' },
        { to: '/threat-feed', label: 'Threat Feed' },
        ...(isAuthenticated ? [{ to: '/dashboard', label: 'Dashboard' }] : [])
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cyber-darker/95 backdrop-blur-xl shadow-lg shadow-black/20' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <HiShieldCheck className="w-8 h-8 text-cyber-cyan group-hover:text-cyber-green transition-colors duration-300" />
                        <span className="text-xl font-bold gradient-text">CyberShield</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${isActive(to)
                                        ? 'text-cyber-cyan bg-cyber-cyan/10'
                                        : 'text-cyber-muted hover:text-cyber-text hover:bg-white/5'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-cyber-muted hover:text-cyber-text hover:bg-white/5 transition-all duration-300"
                                >
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-blue flex items-center justify-center text-cyber-dark text-xs font-bold">
                                        {user?.name?.charAt(0)?.toUpperCase()}
                                    </div>
                                    {user?.name}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-cyber-red hover:bg-cyber-red/10 transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="cyber-button-secondary !py-2 !px-4 text-sm">
                                    Login
                                </Link>
                                <Link to="/register" className="cyber-button-primary !py-2 !px-4 text-sm">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-cyber-muted hover:text-cyber-text hover:bg-white/5 transition-all"
                    >
                        {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-cyber-darker/95 backdrop-blur-xl border-t border-cyber-border">
                    <div className="px-4 py-4 space-y-2">
                        {navLinks.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${isActive(to)
                                        ? 'text-cyber-cyan bg-cyber-cyan/10'
                                        : 'text-cyber-muted hover:text-cyber-text hover:bg-white/5'
                                    }`}
                            >
                                {label}
                            </Link>
                        ))}
                        <hr className="border-cyber-border" />
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="block px-4 py-3 rounded-lg text-sm font-medium text-cyber-muted hover:text-cyber-text hover:bg-white/5"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-cyber-red hover:bg-cyber-red/10"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex gap-3 pt-2">
                                <Link to="/login" className="flex-1 text-center cyber-button-secondary !py-2 text-sm">
                                    Login
                                </Link>
                                <Link to="/register" className="flex-1 text-center cyber-button-primary !py-2 text-sm">
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
