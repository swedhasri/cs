/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                cyber: {
                    dark: '#0a0a1a',
                    darker: '#050510',
                    card: '#0f0f2e',
                    border: '#1a1a3e',
                    cyan: '#00f5d4',
                    green: '#39ff14',
                    blue: '#6366f1',
                    purple: '#a855f7',
                    pink: '#ec4899',
                    red: '#ef4444',
                    yellow: '#facc15',
                    orange: '#f97316',
                    text: '#e2e8f0',
                    muted: '#94a3b8'
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace']
            },
            boxShadow: {
                'cyber': '0 0 15px rgba(0, 245, 212, 0.15)',
                'cyber-lg': '0 0 30px rgba(0, 245, 212, 0.2)',
                'cyber-glow': '0 0 40px rgba(0, 245, 212, 0.3)',
                'blue-glow': '0 0 30px rgba(99, 102, 241, 0.3)',
                'purple-glow': '0 0 30px rgba(168, 85, 247, 0.3)'
            },
            backgroundImage: {
                'grid-pattern': 'linear-gradient(to right, rgba(26, 26, 62, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(26, 26, 62, 0.5) 1px, transparent 1px)',
                'hero-gradient': 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)'
            },
            backgroundSize: {
                'grid': '50px 50px'
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
                'scan-line': 'scanLine 3s linear infinite'
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(0, 245, 212, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(0, 245, 212, 0.4)' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                scanLine: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' }
                }
            }
        },
    },
    plugins: [],
};
