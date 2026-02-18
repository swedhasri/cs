import { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { HiExclamation, HiSearch } from 'react-icons/hi';

const CveLookup = () => {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!keyword) return;
        setLoading(true);

        try {
            const { data } = await api.get(`/tools/cve?keyword=${encodeURIComponent(keyword)}`);
            setResults(data);
        } catch (error) {
            toast.error('Search failed');
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
        return colors[severity] || 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    };

    return (
        <div className="page-container">
            <div className="section-container max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-4">
                        <HiExclamation className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold gradient-text mb-2">CVE Lookup</h1>
                    <p className="text-cyber-muted">Search the vulnerability database by keyword or CVE ID</p>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="glass-card p-6 mb-6">
                    <label htmlFor="cve-search" className="cyber-label">Search CVEs</label>
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-muted" />
                            <input
                                id="cve-search"
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="cyber-input !pl-11 font-mono"
                                placeholder="e.g. CVE-2024-3400 or FortiOS"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !keyword}
                            className="cyber-button-primary !px-6 disabled:opacity-50"
                        >
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                </form>

                {/* Results */}
                {results && (
                    <div className="space-y-4 animate-[fadeIn_0.3s_ease-in]">
                        <p className="text-sm text-cyber-muted">
                            Found <span className="text-cyber-cyan font-semibold">{results.totalResults}</span> results for "{results.keyword}"
                        </p>

                        {results.results.length > 0 ? (
                            results.results.map((cve) => (
                                <div key={cve.id} className="glass-card p-6 hover:border-cyber-cyan/30 transition-all duration-300">
                                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                                        <div>
                                            <h3 className="text-lg font-bold font-mono text-cyber-cyan">{cve.id}</h3>
                                            <p className="text-xs text-cyber-muted mt-1">
                                                {cve.vendor} — {cve.product}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(cve.severity)}`}>
                                                {cve.severity}
                                            </span>
                                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyber-darker text-cyber-text border border-cyber-border">
                                                CVSS {cve.cvssScore}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-cyber-muted leading-relaxed mb-4">
                                        {cve.description}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4 text-xs text-cyber-muted">
                                        <span>Published: <span className="text-cyber-text">{cve.publishedDate}</span></span>
                                        <span>Modified: <span className="text-cyber-text">{cve.lastModified}</span></span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="glass-card p-8 text-center">
                                <HiSearch className="w-12 h-12 text-cyber-muted mx-auto mb-3" />
                                <p className="text-cyber-muted">No vulnerabilities found matching your search.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CveLookup;
