import { useState, useEffect } from 'react';
import api from '../services/api';
import { HiExternalLink } from 'react-icons/hi';

const ThreatFeed = () => {
    const [threats, setThreats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchThreats();
    }, []);

    const fetchThreats = async () => {
        try {
            const { data } = await api.get('/threat-feed');
            if (data.success) {
                setThreats(data.results);
            }
        } catch (error) {
            console.error('Failed to fetch threats');
        } finally {
            setLoading(false);
        }
    };

    const getSeverityColor = (severity) => {
        const colors = {
            'Critical': 'bg-red-500/10 text-red-400 border-red-500/30',
            'High': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
            'Medium': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
            'Low': 'bg-green-500/10 text-green-400 border-green-500/30'
        };
        return colors[severity] || 'bg-gray-500/10 text-gray-400';
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Zero-Day': 'text-red-400',
            'Ransomware': 'text-orange-400',
            'Phishing': 'text-yellow-400',
            'Supply Chain': 'text-purple-400',
            'APT': 'text-red-400',
            'Hardware': 'text-blue-400',
            'Web Security': 'text-cyan-400',
            'Malware': 'text-orange-400',
            'Compliance': 'text-green-400',
            'ICS/SCADA': 'text-red-400'
        };
        return colors[category] || 'text-gray-400';
    };

    const filteredThreats = filter === 'all'
        ? threats
        : threats.filter(t => t.severity.toLowerCase() === filter);

    return (
        <div className="page-container">
            <div className="section-container max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 mb-4">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        <span className="text-xs font-medium text-red-400 uppercase tracking-wider">Live Feed</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                        Threat <span className="gradient-text">Intelligence</span>
                    </h1>
                    <p className="text-cyber-muted">Stay informed about the latest cybersecurity threats and news</p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-8 justify-center">
                    {['all', 'critical', 'high', 'medium', 'low'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${filter === f
                                    ? 'bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30'
                                    : 'bg-cyber-darker text-cyber-muted border border-cyber-border hover:border-cyber-muted'
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="flex flex-col items-center gap-4 py-16">
                        <div className="w-12 h-12 border-4 border-cyber-border border-t-cyber-cyan rounded-full animate-spin"></div>
                        <p className="text-cyber-muted text-sm">Loading threat feed...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredThreats.map((threat) => (
                            <div
                                key={threat.id}
                                className="glass-card p-6 hover:border-cyber-cyan/30 transition-all duration-300 group"
                            >
                                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(threat.severity)}`}>
                                            {threat.severity}
                                        </span>
                                        <span className={`text-xs font-medium ${getCategoryColor(threat.category)}`}>
                                            {threat.category}
                                        </span>
                                    </div>
                                    <span className="text-xs text-cyber-muted">{threat.date}</span>
                                </div>

                                <h3 className="text-lg font-semibold text-cyber-text group-hover:text-cyber-cyan transition-colors mb-2">
                                    {threat.title}
                                </h3>

                                <p className="text-sm text-cyber-muted leading-relaxed mb-4">
                                    {threat.summary}
                                </p>

                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div className="flex flex-wrap gap-2">
                                        {threat.tags.map((tag) => (
                                            <span key={tag} className="px-2 py-0.5 rounded text-xs bg-cyber-darker text-cyber-muted">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-xs text-cyber-muted">
                                        Source: {threat.source}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {filteredThreats.length === 0 && (
                            <div className="glass-card p-8 text-center">
                                <p className="text-cyber-muted">No threats matching the selected severity level.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThreatFeed;
