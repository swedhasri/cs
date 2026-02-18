import { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { HiGlobeAlt } from 'react-icons/hi';

const PortScanner = () => {
    const [host, setHost] = useState('');
    const [startPort, setStartPort] = useState('1');
    const [endPort, setEndPort] = useState('1024');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleScan = async (e) => {
        e.preventDefault();
        if (!host) return;
        setLoading(true);
        setResult(null);

        try {
            const { data } = await api.post('/tools/port-scan', {
                host,
                startPort: parseInt(startPort),
                endPort: parseInt(endPort)
            });
            setResult(data);
        } catch (error) {
            toast.error(error.message || 'Scan failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="section-container max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyber-purple to-purple-500 mb-4">
                        <HiGlobeAlt className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold gradient-text mb-2">Port Scanner</h1>
                    <p className="text-cyber-muted">Simulate a network port scan (demo purposes only)</p>
                </div>

                {/* Input Form */}
                <form onSubmit={handleScan} className="glass-card p-6 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                        <div className="sm:col-span-1">
                            <label htmlFor="host" className="cyber-label">Hostname / IP</label>
                            <input
                                id="host"
                                type="text"
                                value={host}
                                onChange={(e) => setHost(e.target.value)}
                                className="cyber-input font-mono"
                                placeholder="example.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="start-port" className="cyber-label">Start Port</label>
                            <input
                                id="start-port"
                                type="number"
                                value={startPort}
                                onChange={(e) => setStartPort(e.target.value)}
                                className="cyber-input font-mono"
                                min="1"
                                max="65535"
                            />
                        </div>
                        <div>
                            <label htmlFor="end-port" className="cyber-label">End Port</label>
                            <input
                                id="end-port"
                                type="number"
                                value={endPort}
                                onChange={(e) => setEndPort(e.target.value)}
                                className="cyber-input font-mono"
                                min="1"
                                max="65535"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !host}
                        className="w-full cyber-button-primary disabled:opacity-50"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-3">
                                <div className="w-4 h-4 border-2 border-cyber-dark border-t-transparent rounded-full animate-spin"></div>
                                Scanning ports...
                            </span>
                        ) : 'Start Scan'}
                    </button>
                </form>

                {/* Loading Animation */}
                {loading && (
                    <div className="glass-card p-8 text-center mb-6">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                            <div className="absolute inset-0 rounded-full border-4 border-cyber-border"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-cyber-purple border-t-transparent animate-spin"></div>
                            <div className="absolute inset-3 rounded-full border-4 border-cyber-cyan border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                        </div>
                        <p className="text-cyber-muted animate-pulse">Scanning {host}:{startPort}-{endPort}...</p>
                    </div>
                )}

                {/* Results */}
                {result && !loading && (
                    <div className="space-y-4 animate-[fadeIn_0.3s_ease-in]">
                        {/* Summary */}
                        <div className="glass-card p-6">
                            <h3 className="text-lg font-semibold mb-4">Scan Results</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <p className="text-xl font-bold text-cyber-text font-mono">{result.host}</p>
                                    <p className="text-xs text-cyber-muted">Target</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xl font-bold text-cyber-text">{result.portRange}</p>
                                    <p className="text-xs text-cyber-muted">Port Range</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xl font-bold text-cyber-cyan">{result.openPorts.length}</p>
                                    <p className="text-xs text-cyber-muted">Open Ports</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xl font-bold text-cyber-text">{result.scanTime}</p>
                                    <p className="text-xs text-cyber-muted">Scan Time</p>
                                </div>
                            </div>
                        </div>

                        {/* Open Ports Table */}
                        {result.openPorts.length > 0 ? (
                            <div className="glass-card overflow-hidden">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-cyber-border">
                                            <th className="text-left px-6 py-4 text-xs font-semibold text-cyber-muted uppercase tracking-wider">Port</th>
                                            <th className="text-left px-6 py-4 text-xs font-semibold text-cyber-muted uppercase tracking-wider">State</th>
                                            <th className="text-left px-6 py-4 text-xs font-semibold text-cyber-muted uppercase tracking-wider">Service</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-cyber-border">
                                        {result.openPorts.map((port, i) => (
                                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-3 text-sm font-mono text-cyber-text">{port.port}</td>
                                                <td className="px-6 py-3">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                                        {port.state}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3 text-sm text-cyber-muted">{port.service}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="glass-card p-8 text-center">
                                <p className="text-cyber-muted">No open ports found in the specified range.</p>
                            </div>
                        )}

                        <p className="text-xs text-cyber-muted text-center italic">
                            ⚠️ This is a simulated scan for educational purposes only. Results are randomly generated.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PortScanner;
