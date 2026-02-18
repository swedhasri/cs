import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ThreatFeed from './pages/ThreatFeed';
import About from './pages/About';
import Contact from './pages/Contact';

// Tool pages
import ToolsIndex from './pages/tools/ToolsIndex';
import PasswordChecker from './pages/tools/PasswordChecker';
import HashGenerator from './pages/tools/HashGenerator';
import PortScanner from './pages/tools/PortScanner';
import CveLookup from './pages/tools/CveLookup';

function App() {
    return (
        <div className="min-h-screen bg-cyber-dark flex flex-col">
            {/* Toast Notifications */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#0f0f2e',
                        color: '#e2e8f0',
                        border: '1px solid #1a1a3e',
                        borderRadius: '12px',
                        fontSize: '14px'
                    },
                    success: {
                        iconTheme: { primary: '#00f5d4', secondary: '#0a0a1a' }
                    },
                    error: {
                        iconTheme: { primary: '#ef4444', secondary: '#0a0a1a' }
                    }
                }}
            />

            <Navbar />

            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/tools" element={<ToolsIndex />} />
                    <Route path="/tools/password-checker" element={<PasswordChecker />} />
                    <Route path="/tools/hash-generator" element={<HashGenerator />} />
                    <Route path="/tools/port-scanner" element={<PortScanner />} />
                    <Route path="/tools/cve-lookup" element={<CveLookup />} />
                    <Route path="/threat-feed" element={<ThreatFeed />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />

                    {/* Protected Routes */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute><Dashboard /></ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                        <ProtectedRoute><Profile /></ProtectedRoute>
                    } />

                    {/* 404 */}
                    <Route path="*" element={
                        <div className="page-container flex items-center justify-center min-h-screen">
                            <div className="text-center">
                                <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
                                <p className="text-cyber-muted mb-6">Page not found</p>
                                <a href="/" className="cyber-button-primary">Go Home</a>
                            </div>
                        </div>
                    } />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
