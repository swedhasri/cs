import { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { HiFingerPrint, HiClipboardCopy } from 'react-icons/hi';

const HashGenerator = () => {
    const [text, setText] = useState('');
    const [algorithm, setAlgorithm] = useState('sha256');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const algorithms = [
        { value: 'md5', label: 'MD5', desc: '128-bit hash' },
        { value: 'sha1', label: 'SHA-1', desc: '160-bit hash' },
        { value: 'sha256', label: 'SHA-256', desc: '256-bit hash' }
    ];

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!text) return;
        setLoading(true);

        try {
            const { data } = await api.post('/tools/hash', { text, algorithm });
            setResult(data);
        } catch (error) {
            toast.error('Failed to generate hash');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (result?.hash) {
            navigator.clipboard.writeText(result.hash);
            toast.success('Hash copied to clipboard');
        }
    };

    return (
        <div className="page-container">
            <div className="section-container max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyber-blue to-indigo-500 mb-4">
                        <HiFingerPrint className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold gradient-text mb-2">Hash Generator</h1>
                    <p className="text-cyber-muted">Generate cryptographic hashes for any text</p>
                </div>

                {/* Input Form */}
                <form onSubmit={handleGenerate} className="glass-card p-6 mb-6">
                    <div className="mb-4">
                        <label htmlFor="hash-text" className="cyber-label">Input Text</label>
                        <textarea
                            id="hash-text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="cyber-input min-h-[100px] font-mono resize-y"
                            placeholder="Enter text to hash..."
                            rows={3}
                        />
                    </div>

                    <div className="mb-5">
                        <label className="cyber-label">Algorithm</label>
                        <div className="grid grid-cols-3 gap-3">
                            {algorithms.map(({ value, label, desc }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setAlgorithm(value)}
                                    className={`p-3 rounded-lg border text-center transition-all duration-300 ${algorithm === value
                                            ? 'border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan'
                                            : 'border-cyber-border bg-cyber-darker text-cyber-muted hover:border-cyber-muted'
                                        }`}
                                >
                                    <span className="block text-sm font-semibold">{label}</span>
                                    <span className="block text-xs mt-1 opacity-70">{desc}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !text}
                        className="w-full cyber-button-primary disabled:opacity-50"
                    >
                        {loading ? 'Generating...' : 'Generate Hash'}
                    </button>
                </form>

                {/* Result */}
                {result && (
                    <div className="glass-card p-6 animate-[fadeIn_0.3s_ease-in]">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-semibold">
                                {result.algorithm.toUpperCase()} Hash
                            </h3>
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-cyber-cyan hover:bg-cyber-cyan/10 transition-all"
                            >
                                <HiClipboardCopy className="w-4 h-4" />
                                Copy
                            </button>
                        </div>
                        <div className="bg-cyber-darker rounded-lg p-4 break-all">
                            <code className="text-sm text-cyber-green font-mono">{result.hash}</code>
                        </div>
                        <p className="text-xs text-cyber-muted mt-3">
                            Input length: {result.inputLength} characters
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HashGenerator;
