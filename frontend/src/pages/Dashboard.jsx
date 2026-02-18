import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { HiKey, HiFingerPrint, HiGlobeAlt, HiExclamation, HiClock, HiChartBar, HiShieldCheck } from 'react-icons/hi';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ totalScans: 0 });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const { data } = await api.get('/user/profile');
            if (data.success) {
                setStats(data.stats);
            }
        } catch (error) {
            console.error('Failed to fetch dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const tools = [
        { title: 'Password Checker', icon: HiKey, to: '/tools/password-checker', color: 'from-cyber-cyan to-cyan-500', desc: 'Test password strength' },
        { title: 'Hash Generator', icon: HiFingerPrint, to: '/tools/hash-generator', color: 'from-cyber-blue to-indigo-500', desc: 'Generate text hashes' },
        { title: 'Port Scanner', icon: HiGlobeAlt, to: '/tools/port-scanner', color: 'from-cyber-purple to-purple-500', desc: 'Scan network ports' },
        { title: 'CVE Lookup', icon: HiExclamation, to: '/tools/cve-lookup', color: 'from-orange-500 to-cyber-red', desc: 'Search vulnerabilities' }
    ];

    const getGreetingTime = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="page-container">
            <div className="section-container">
                {/* Welcome Header */}
                <div className={`mb-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-blue flex items-center justify-center text-cyber-dark text-lg font-bold ${isVisible ? 'animate-float' : ''}`}>
                            {user?.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold">
                                {getGreetingTime()}, <span className="gradient-text">{user?.name}</span>
                            </h1>
                            <p className="text-sm text-cyber-muted">Welcome to your security dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    <div className={`glass-card p-5 ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-cyber-cyan/10 flex items-center justify-center">
                                <HiChartBar className="w-5 h-5 text-cyber-cyan" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-cyber-text">{stats.totalScans}</p>
                                <p className="text-xs text-cyber-muted">Total Scans</p>
                            </div>
                        </div>
                    </div>
                    <div className={`glass-card p-5 ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-cyber-green/10 flex items-center justify-center">
                                <HiShieldCheck className="w-5 h-5 text-cyber-green" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-cyber-text">4</p>
                                <p className="text-xs text-cyber-muted">Tools Available</p>
                            </div>
                        </div>
                    </div>
                    <div className={`glass-card p-5 ${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-cyber-purple/10 flex items-center justify-center">
                                <HiClock className="w-5 h-5 text-cyber-purple" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-cyber-text">
                                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                </p>
                                <p className="text-xs text-cyber-muted">Member Since</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Access Tools */}
                <div className="mb-10">
                    <h2 className={`text-xl font-semibold mb-5 ${isVisible ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>Quick Access</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {tools.map(({ title, icon: Icon, to, color, desc }, index) => (
                            <Link
                                key={to}
                                to={to}
                                className={`glass-card p-5 group hover:border-cyber-cyan/30 transition-all duration-300 hover-lift ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                            >
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 ${isVisible ? 'animate-float' : ''}`} style={{ animationDelay: `${0.8 + index * 0.2}s` }}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-sm font-semibold text-cyber-text group-hover:text-cyber-cyan transition-colors">{title}</h3>
                                <p className="text-xs text-cyber-muted mt-1">{desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to="/threat-feed" className={`glass-card p-6 group hover:border-cyber-red/30 transition-all duration-300 hover-lift ${isVisible ? 'animate-fade-in-up delay-600' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-cyber-red/10 flex items-center justify-center">
                                <span className="w-2 h-2 rounded-full bg-cyber-red animate-pulse"></span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-cyber-text group-hover:text-cyber-red transition-colors">Threat Feed</h3>
                                <p className="text-xs text-cyber-muted">View latest cyber threats</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/profile" className={`glass-card p-6 group hover:border-cyber-blue/30 transition-all duration-300 hover-lift ${isVisible ? 'animate-fade-in-up delay-700' : 'opacity-0'}`} style={{ animationDelay: '1.4s' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 flex items-center justify-center">
                                <HiKey className="w-5 h-5 text-cyber-blue" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-cyber-text group-hover:text-cyber-blue transition-colors">Profile Settings</h3>
                                <p className="text-xs text-cyber-muted">Manage your account</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
