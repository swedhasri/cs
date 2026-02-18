import { HiShieldCheck, HiLightningBolt, HiUserGroup, HiAcademicCap } from 'react-icons/hi';

const About = () => {
    const features = [
        {
            icon: HiShieldCheck,
            title: 'Security First',
            description: 'All tools are designed for educational purposes with security best practices at their core.'
        },
        {
            icon: HiLightningBolt,
            title: 'Fast & Reliable',
            description: 'Instant results from our cybersecurity tools with a smooth, responsive user experience.'
        },
        {
            icon: HiUserGroup,
            title: 'Community Driven',
            description: 'Built by cybersecurity enthusiasts to help educate and raise awareness about digital threats.'
        },
        {
            icon: HiAcademicCap,
            title: 'Educational Focus',
            description: 'Each tool comes with explanations and context to help you understand cybersecurity concepts.'
        }
    ];

    return (
        <div className="page-container">
            <div className="section-container max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                        About <span className="gradient-text">CyberShield</span>
                    </h1>
                    <p className="text-cyber-muted max-w-2xl mx-auto text-lg leading-relaxed">
                        CyberShield is a comprehensive cybersecurity awareness platform designed to educate
                        users about digital security through hands‑on tools and real‑time threat intelligence.
                    </p>
                </div>

                {/* Mission */}
                <div className="glass-card p-8 mb-12">
                    <h2 className="text-2xl font-bold mb-4 gradient-text">Our Mission</h2>
                    <p className="text-cyber-muted leading-relaxed">
                        In an increasingly connected world, cybersecurity awareness is no longer optional—it's essential.
                        CyberShield provides accessible tools and resources to help individuals and organizations
                        understand, assess, and improve their security posture. We believe that education is the
                        strongest defense against cyber threats, and our platform makes learning about security
                        interactive and engaging.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {features.map(({ icon: Icon, title, description }) => (
                        <div key={title} className="glass-card p-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-blue flex items-center justify-center mb-4">
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{title}</h3>
                            <p className="text-sm text-cyber-muted leading-relaxed">{description}</p>
                        </div>
                    ))}
                </div>

                {/* Tech Stack */}
                <div className="glass-card p-8">
                    <h2 className="text-2xl font-bold mb-6 gradient-text">Technology Stack</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { name: 'React', desc: 'Frontend' },
                            { name: 'Node.js', desc: 'Backend' },
                            { name: 'Express', desc: 'API Server' },
                            { name: 'MySQL', desc: 'Database' },
                            { name: 'JWT', desc: 'Authentication' },
                            { name: 'Tailwind CSS', desc: 'Styling' },
                            { name: 'Sequelize', desc: 'ORM' },
                            { name: 'Vite', desc: 'Build Tool' }
                        ].map(({ name, desc }) => (
                            <div key={name} className="text-center p-4 bg-cyber-darker rounded-lg border border-cyber-border">
                                <p className="text-sm font-semibold text-cyber-cyan">{name}</p>
                                <p className="text-xs text-cyber-muted mt-1">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
