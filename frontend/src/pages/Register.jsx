import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { HiUser, HiMail, HiLockClosed, HiShieldCheck } from 'react-icons/hi';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await register(name, email, password);
            toast.success('Account created successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container flex items-center justify-center min-h-screen py-12">
            <div className="absolute inset-0 bg-grid opacity-20"></div>
            <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl"></div>

            <div className="relative w-full max-w-md px-4">
                <div className="glass-card p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyber-purple to-cyber-blue mb-4">
                            <HiShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-cyber-text">Create Account</h1>
                        <p className="text-sm text-cyber-muted mt-2">Join CyberShield and start protecting</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="cyber-label">Full Name</label>
                            <div className="relative">
                                <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-muted" />
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="cyber-input !pl-11"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="cyber-label">Email Address</label>
                            <div className="relative">
                                <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-muted" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="cyber-input !pl-11"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="cyber-label">Password</label>
                            <div className="relative">
                                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-muted" />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="cyber-input !pl-11"
                                    placeholder="Min. 6 characters"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="cyber-label">Confirm Password</label>
                            <div className="relative">
                                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-muted" />
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="cyber-input !pl-11"
                                    placeholder="Re-enter password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full cyber-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-cyber-dark border-t-transparent rounded-full animate-spin"></div>
                                    Creating account...
                                </span>
                            ) : 'Create Account'}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-cyber-muted mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-cyber-cyan hover:text-cyber-green transition-colors font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
