import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiMail, HiUser, HiChat, HiLocationMarker, HiPhone } from 'react-icons/hi';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate sending (mock)
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success('Message sent successfully! We\'ll get back to you soon.');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setLoading(false);
    };

    return (
        <div className="page-container">
            <div className="section-container max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                        Get in <span className="gradient-text">Touch</span>
                    </h1>
                    <p className="text-cyber-muted max-w-lg mx-auto">
                        Have questions, feedback, or want to report a security issue? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-4">
                        <div className="glass-card p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-cyber-cyan/10 flex items-center justify-center">
                                    <HiMail className="w-5 h-5 text-cyber-cyan" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-cyber-text">Email</p>
                                    <p className="text-xs text-cyber-muted">contact@cybershield.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-cyber-blue/10 flex items-center justify-center">
                                    <HiLocationMarker className="w-5 h-5 text-cyber-blue" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-cyber-text">Location</p>
                                    <p className="text-xs text-cyber-muted">Global / Online</p>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card p-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-cyber-purple/10 flex items-center justify-center">
                                    <HiPhone className="w-5 h-5 text-cyber-purple" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-cyber-text">Support</p>
                                    <p className="text-xs text-cyber-muted">24/7 Online Support</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-2 glass-card p-6">
                        <h2 className="text-lg font-semibold mb-5">Send a Message</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="contact-name" className="cyber-label">Name</label>
                                <div className="relative">
                                    <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-muted" />
                                    <input
                                        id="contact-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="cyber-input !pl-11"
                                        placeholder="Your name"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="contact-email" className="cyber-label">Email</label>
                                <div className="relative">
                                    <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-muted" />
                                    <input
                                        id="contact-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="cyber-input !pl-11"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contact-subject" className="cyber-label">Subject</label>
                            <input
                                id="contact-subject"
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="cyber-input"
                                placeholder="How can we help?"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="contact-message" className="cyber-label">Message</label>
                            <textarea
                                id="contact-message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="cyber-input min-h-[120px] resize-y"
                                placeholder="Your message..."
                                rows={4}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full cyber-button-primary disabled:opacity-50"
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
