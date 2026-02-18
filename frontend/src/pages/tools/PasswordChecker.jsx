import { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { HiKey, HiCheckCircle, HiXCircle } from 'react-icons/hi';

const PasswordChecker = () => {
    const [password, setPassword] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCheck = async (e) => {
        e.preventDefault();
        if (!password) return;
        setLoading(true);

        try {
            const { data } = await api.post('/tools/password-strength', { password });
            setResult(data);
        } catch (error) {
            toast.error('Failed to check password');
        } finally {
            setLoading(false);
        }
    };

    const getStrengthColor = (strength) => {
        const colors = {
            'Weak': 'bg-red-500',
            'Medium': 'bg-yellow-500',
            'Strong': 'bg-green-500',
            'Very Strong': 'bg-cyber-cyan'
        };
        return colors[strength] || 'bg-gray-500';
    };

    const getStrengthTextColor = (strength) => {
        const colors = {
            'Weak': 'text-red-400',
            'Medium': 'text-yellow-400',
            'Strong': 'text-green-400',
            'Very Strong': 'text-cyber-cyan'
        };
        return colors[strength] || 'text-gray-400';
    };

    return (
        <div className="page-container">
            <div className="section-container max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyber-cyan to-cyan-500 mb-4">
                        <HiKey className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold gradient-text mb-2">Password Strength Checker</h1>
                    <p className="text-cyber-muted">Analyze your password and get improvement tips</p>
                </div>

                {/* Input */}
                <form onSubmit={handleCheck} className="glass-card p-6 mb-6">
                    <label htmlFor="password-input" className="cyber-label">Enter a password to check</label>
                    <div className="flex gap-3">
                        <input
                            id="password-input"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="cyber-input font-mono flex-1"
                            placeholder="Type or paste a password..."
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            disabled={loading || !password}
                            className="cyber-button-primary !px-6 disabled:opacity-50"
                        >
                            {loading ? 'Checking...' : 'Check'}
                        </button>
                    </div>
                </form>

                {/* Results */}
                {result && (
                    <div className="space-y-4 animate-[fadeIn_0.3s_ease-in]">
                        {/* Strength Meter */}
                        <div className="glass-card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Strength</h3>
                                <span className={`text-lg font-bold ${getStrengthTextColor(result.strength)}`}>
                                    {result.strength}
                                </span>
                            </div>
                            <div className="w-full h-3 bg-cyber-darker rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${getStrengthColor(result.strength)}`}
                                    style={{ width: `${(result.score / result.maxScore) * 100}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-cyber-muted mt-2">Score: {result.score} / {result.maxScore}</p>
                        </div>

                        {/* Checks */}
                        <div className="glass-card p-6">
                            <h3 className="text-lg font-semibold mb-4">Criteria</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {Object.entries(result.checks).map(([key, passed]) => (
                                    <div key={key} className="flex items-center gap-2">
                                        {passed ? (
                                            <HiCheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                        ) : (
                                            <HiXCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                        )}
                                        <span className={`text-sm ${passed ? 'text-cyber-text' : 'text-cyber-muted'}`}>
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tips */}
                        {result.tips.length > 0 && (
                            <div className="glass-card p-6 border-l-4 border-cyber-yellow">
                                <h3 className="text-lg font-semibold mb-3">Improvement Tips</h3>
                                <ul className="space-y-2">
                                    {result.tips.map((tip, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-cyber-yellow mt-0.5">•</span>
                                            <span className="text-sm text-cyber-muted">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordChecker;
