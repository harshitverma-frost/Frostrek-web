import { useState, useRef, useEffect } from 'react';
import {
    Bot, Mic, Database, Workflow, BarChart3,
    ArrowRight, Sparkles, MessageCircle, Volume2,
    Search, GitBranch, TrendingUp, CheckCircle2
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const SOLUTIONS = [
    {
        id: 'ai-agents',
        title: 'AI Agents',
        tagline: 'Intelligent Conversations',
        description: 'Deploy conversational AI agents that understand context, handle complex queries, and provide human-like support 24/7. From customer service to sales, our agents adapt to your business needs.',
        icon: Bot,
        demo: { type: 'chat' },
        features: [
            'Natural language understanding with 98% accuracy',
            'Multi-turn conversation memory',
            'Seamless handoff to human agents',
            'Custom personality & brand voice'
        ],
        link: '/services',
        gradient: 'from-cyan-400 to-teal-500'
    },
    {
        id: 'voice-ai',
        title: 'Voice AI',
        tagline: 'Natural Voice Interactions',
        description: 'Low-latency voice bots that sound natural and respond instantly. Perfect for customer support calls, appointment scheduling, and interactive voice responses.',
        icon: Mic,
        demo: { type: 'voice' },
        features: [
            'Sub-200ms response latency',
            'Natural text-to-speech voices',
            'Multi-language support',
            'Real-time transcription & analytics'
        ],
        link: '/services',
        gradient: 'from-purple-400 to-indigo-500'
    },
    {
        id: 'rag-solutions',
        title: 'RAG Solutions',
        tagline: 'Enterprise Knowledge Access',
        description: 'Transform your documents into an intelligent knowledge base. Our RAG solutions let your team and customers find answers instantly from any data source.',
        icon: Database,
        demo: { type: 'search' },
        features: [
            'Index PDFs, docs, databases & more',
            'Semantic search with context',
            'Citation & source tracking',
            'Secure enterprise deployment'
        ],
        link: '/services',
        gradient: 'from-cyan-500 to-blue-500'
    },
    {
        id: 'workflow-automation',
        title: 'Workflow Automation',
        tagline: 'End-to-End Process Intelligence',
        description: 'Automate complex business processes with AI-powered workflows. Connect your existing tools, eliminate manual tasks, and scale operations without scaling headcount.',
        icon: Workflow,
        demo: { type: 'workflow' },
        features: [
            '500+ native integrations',
            'Visual workflow builder',
            'AI decision branching',
            'Error handling & retry logic'
        ],
        link: '/services',
        gradient: 'from-teal-400 to-emerald-500'
    },
    {
        id: 'data-intelligence',
        title: 'Data Intelligence',
        tagline: 'Actionable Insights',
        description: 'Turn raw data into strategic decisions. Our AI analyzes patterns, predicts trends, and surfaces insights that drive business growth, all in real-time.',
        icon: BarChart3,
        demo: { type: 'analytics' },
        features: [
            'Real-time dashboard analytics',
            'Predictive modeling & forecasting',
            'Anomaly detection alerts',
            'Custom report generation'
        ],
        link: '/services',
        gradient: 'from-indigo-400 to-purple-500'
    }
];

// Mini Demo Components
const ChatDemo = () => {
    const messages = [
        { role: 'user', text: 'How can I track my order?' },
        { role: 'agent', text: "I can help! Please share your order ID and I'll look that up." },
        { role: 'user', text: 'ORD-2024-7823' },
    ];
    return (
        <div className="rounded-xl p-4 h-[200px] overflow-hidden border bg-zinc-900/80 border-white/10">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                <div className="w-2 h-2 rounded-full bg-[#2EE1C7] animate-pulse" />
                <span className="text-xs text-slate-400">Frosty AI Agent</span>
            </div>
            <div className="space-y-3">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-[80%] px-3 py-2 rounded-xl text-xs ${msg.role === 'user'
                                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-br-sm'
                                : 'bg-zinc-800 text-slate-300 rounded-bl-sm border border-white/10'
                                }`}
                            style={{ animationDelay: `${i * 0.8}s` }}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div className="flex justify-start">
                    <div className="flex gap-1 px-3 py-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2EE1C7] animate-bounce" style={{ animationDelay: '0s' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2EE1C7] animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2EE1C7] animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const WAVE_HEIGHTS = [20, 32, 16, 28, 12, 24, 30, 18, 26, 14, 22, 20];

const VoiceDemo = () => (
    <div className="rounded-xl p-4 h-[200px] border flex flex-col items-center justify-center bg-zinc-900/80 border-white/10">
        <div className="relative mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center animate-pulse">
                <Volume2 className="w-8 h-8 text-white" />
            </div>
            <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-cyan-400/50 animate-ping" />
        </div>
        <div className="flex items-center gap-1 mb-2">
            {WAVE_HEIGHTS.map((height, i) => (
                <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-cyan-500 to-teal-300 rounded-full"
                    style={{
                        height: `${height}px`,
                        animation: `voiceWave 1.2s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`
                    }}
                />
            ))}
        </div>
        <span className="text-xs text-slate-400">Voice AI responding...</span>
        <style>{`
            @keyframes voiceWave {
                0%, 100% { transform: scaleY(0.5); }
                50% { transform: scaleY(1); }
            }
        `}</style>
    </div>
);

const SearchDemo = () => {
    const results = [
        { title: 'Q3 Financial Report', match: '94%' },
        { title: 'Employee Handbook', match: '87%' },
        { title: 'Product Roadmap 2024', match: '72%' },
    ];
    return (
        <div className="rounded-xl p-2 h-[200px] border bg-zinc-900/80 border-white/10">
            <div className="flex items-center gap-2 rounded-lg px-3 py-2 mb-3 bg-zinc-800 border border-white/10">
                <Search className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-300">What were last quarter's revenue targets?</span>
            </div>
            <div className="space-y-2">
                {results.map((result, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg px-3 py-2 bg-zinc-800 border border-white/10">
                        <div className="flex items-center gap-2">
                            <Database className="w-3 h-3 text-[#2EE1C7]" />
                            <span className="text-xs text-slate-300">{result.title}</span>
                        </div>
                        <span className="text-xs font-medium text-[#2EE1C7]">{result.match}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const WorkflowDemo = () => {
    const steps = ['Trigger', 'Process', 'Validate', 'Output'];
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px", once: true });
    const [autoPlay, setAutoPlay] = useState(false);

    useEffect(() => {
        if (isInView) {
            setAutoPlay(true);
            const timer = setTimeout(() => setAutoPlay(false), 2400);
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    const isActive = isHovered || autoPlay;

    return (
        <div
            ref={containerRef}
            className="rounded-xl p-4 h-[200px] border flex items-center justify-center overflow-hidden relative bg-zinc-900/80 border-white/10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center gap-1">
                {steps.map((step, i) => (
                    <div key={i} className="flex items-center">
                        <motion.div
                            className="relative flex flex-col items-center"
                            animate={{ scale: isActive ? [1, 1.1, 1] : 1 }}
                            transition={{ duration: 0.6, delay: i * 0.3, ease: "easeInOut" }}
                        >
                            <motion.div
                                className={`w-12 h-12 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-cyan-500' : i === 3 ? 'bg-teal-500' : 'bg-zinc-800'}`}
                                animate={{
                                    backgroundColor: isActive
                                        ? (i === 0 ? ['#06b6d4', '#27272a'] : i === 3 ? '#14b8a6' : '#27272a')
                                        : (i === 0 ? '#06b6d4' : i === 3 ? '#14b8a6' : '#27272a')
                                }}
                                transition={{ duration: 0.6, delay: i * 0.3, ease: "easeInOut" }}
                            >
                                {i === 0 && <Sparkles className="w-5 h-5 text-white" />}
                                {i === 1 && <GitBranch className="w-5 h-5 text-slate-300" />}
                                {i === 2 && <CheckCircle2 className="w-5 h-5 text-slate-300" />}
                                {i === 3 && <ArrowRight className="w-5 h-5 text-white" />}
                            </motion.div>
                            <span className="text-[10px] mt-1 font-medium text-slate-400">{step}</span>
                        </motion.div>
                        {i < steps.length - 1 && (
                            <div className="hidden md:block relative w-5 mx-1 h-0.5 overflow-hidden bg-zinc-700">
                                <motion.div
                                    className="absolute inset-0 bg-[#2EE1C7]"
                                    initial={{ x: '-100%' }}
                                    animate={{ x: isActive ? '0%' : '-100%' }}
                                    transition={{ duration: 0.6, delay: i * 0.3 + 0.2, ease: "easeInOut" }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const AnalyticsDemo = () => {
    const bars = [35, 55, 45, 70, 60, 80, 75];
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px", once: true });
    const [autoPlay, setAutoPlay] = useState(false);

    useEffect(() => {
        if (isInView) {
            setAutoPlay(true);
            const timer = setTimeout(() => setAutoPlay(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    const isActive = isHovered || autoPlay;

    return (
        <div
            ref={containerRef}
            className="rounded-xl p-4 h-[200px] border overflow-hidden relative bg-zinc-900/80 border-white/10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400">Revenue Growth</span>
                <motion.div
                    className="flex items-center gap-1 text-[#2EE1C7]"
                    animate={{ scale: isActive ? [1, 1.1, 1] : 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs font-semibold">+24%</span>
                </motion.div>
            </div>
            <div className="flex items-end justify-between gap-2 h-[120px] pt-4">
                {bars.map((height, i) => (
                    <motion.div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-cyan-500 to-teal-300 rounded-t-sm"
                        initial={{ height: '0%' }}
                        animate={{ height: isActive ? `${height}%` : '15%' }}
                        transition={{ duration: 1.2, delay: i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                    />
                ))}
            </div>
            <div className="flex justify-between mt-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <span key={day} className="text-[9px] flex-1 text-center text-slate-500">{day}</span>
                ))}
            </div>
        </div>
    );
};

const DemoComponent = ({ type }) => {
    switch (type) {
        case 'chat': return <ChatDemo />;
        case 'voice': return <VoiceDemo />;
        case 'search': return <SearchDemo />;
        case 'workflow': return <WorkflowDemo />;
        case 'analytics': return <AnalyticsDemo />;
        default: return null;
    }
};

const AISolutionsShowcase = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef(null);
    const activeSolution = SOLUTIONS[activeIndex];

    const handleTabChange = (index) => {
        if (index === activeIndex) return;
        setActiveIndex(index);
    };

    return (
        <section ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden bg-black">
            {/* Decorative blur elements */}
            <div className="absolute top-20 right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 left-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-3 bg-zinc-900/80 border-cyan-500/30">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#2EE1C7]/60" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2EE1C7]" />
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#2EE1C7]">
                            AI Solutions
                        </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 text-white">
                        Our AI Business <span className="text-[#2EE1C7] font-Raleway">Solutions</span>
                    </h2>
                    <p className="text-base max-w-2xl mx-auto text-slate-400">
                        AI Agents and agentic workflows that embed AI where the value is.
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto">
                    {/* MOBILE VIEW */}
                    <div className="lg:hidden mb-8">
                        <div className="flex justify-center gap-4 mb-6 overflow-x-auto p-2" style={{ scrollbarWidth: 'none' }}>
                            {SOLUTIONS.map((solution, index) => {
                                const Icon = solution.icon;
                                const isActive = index === activeIndex;
                                return (
                                    <button
                                        key={solution.id}
                                        onClick={() => handleTabChange(index)}
                                        className={`flex-shrink-0 relative transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100 active:scale-95'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${isActive
                                            ? 'bg-gradient-to-br from-cyan-500 to-teal-600 shadow-lg shadow-cyan-500/30'
                                            : 'bg-zinc-900 border border-white/20'
                                            }`}>
                                            <Icon className={`w-6 h-6 transition-colors ${isActive ? 'text-white' : 'text-[#2EE1C7]'}`} />
                                        </div>
                                        {isActive && (
                                            <motion.div
                                                className="absolute inset-0 rounded-full border-2 border-[#2EE1C7]"
                                                initial={{ scale: 1 }}
                                                animate={{ scale: 1.25 }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                                style={{ opacity: 0.4 }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="text-center mb-4">
                            <h3 className="text-lg font-bold text-white">{activeSolution.title}</h3>
                            <p className="text-sm text-slate-400">{activeSolution.tagline}</p>
                        </div>

                        <motion.div
                            key={activeIndex}
                            className="rounded-2xl border shadow-lg overflow-hidden bg-zinc-950/50 border-[#2EE1C7]/20"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="p-4 border-b border-white/5">
                                <p className="text-sm leading-relaxed text-slate-400">{activeSolution.description}</p>
                            </div>
                            <div className="p-4">
                                <DemoComponent type={activeSolution.demo.type} />
                            </div>
                            <div className="px-4 pb-4 space-y-2">
                                {activeSolution.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#2EE1C7] mt-0.5 flex-shrink-0" />
                                        <span className="text-xs text-slate-400">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="px-4 pb-4 flex flex-col gap-2">
                                <Link to={activeSolution.link} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white rounded-lg font-medium text-sm transition-all hover:shadow-lg hover:shadow-cyan-500/25">
                                    Learn More <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link to="/get-in-touch" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-white/20 hover:border-[#2EE1C7]/60 rounded-lg font-medium text-sm text-slate-300 hover:text-[#2EE1C7] transition-all">
                                    <MessageCircle className="w-4 h-4" /> Book Demo
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* DESKTOP VIEW */}
                    <div className="hidden lg:flex gap-8">
                        {/* Left Panel - Tabs */}
                        <motion.div
                            className="lg:w-1/3"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="space-y-2">
                                {SOLUTIONS.map((solution, index) => {
                                    const Icon = solution.icon;
                                    const isActive = index === activeIndex;
                                    return (
                                        <button
                                            key={solution.id}
                                            onClick={() => handleTabChange(index)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group ${isActive
                                                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg shadow-cyan-500/20'
                                                : 'bg-zinc-900/50 hover:bg-zinc-800/80 text-slate-300 border border-white/10 hover:border-[#2EE1C7]/30'
                                                }`}
                                        >
                                            <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white/10' : 'bg-zinc-800 group-hover:bg-cyan-500/10'}`}>
                                                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#2EE1C7]'}`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-slate-200'}`}>{solution.title}</div>
                                                <div className={`text-xs ${isActive ? 'text-cyan-100/70' : 'text-slate-500'}`}>{solution.tagline}</div>
                                            </div>
                                            {isActive && <div className="w-1.5 h-8 bg-[#2EE1C7]/60 rounded-full" />}
                                        </button>
                                    );
                                })}
                            </div>
                            <Link to="/services" className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-white/20 text-sm font-medium text-slate-400 hover:border-[#2EE1C7]/50 hover:text-[#2EE1C7] transition-all group">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-sm font-medium">View Full AI Ecosystem</span>
                                <ArrowRight className="w-4 h-4 ml-auto transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Right Panel - Content */}
                        <motion.div
                            key={activeIndex}
                            className="lg:w-2/3"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                        >
                            <div className="rounded-2xl border shadow-xl overflow-hidden bg-zinc-950/60 border-[#2EE1C7]/15">
                                <div className="p-6 border-b border-white/5">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-14 h-14 shrink-0 rounded-full bg-gradient-to-br ${activeSolution.gradient} flex items-center justify-center shadow-lg`}>
                                            <activeSolution.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-1 text-white">
                                                AI for <span className="text-[#2EE1C7]">{activeSolution.title}</span>
                                            </h3>
                                            <p className="text-sm leading-relaxed text-slate-400">{activeSolution.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 grid md:grid-cols-2 gap-6">
                                    <div><DemoComponent type={activeSolution.demo.type} /></div>
                                    <div className="space-y-3">
                                        {activeSolution.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-[#2EE1C7] mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-slate-400">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="px-6 pb-6 flex flex-wrap gap-3">
                                    <Link to={activeSolution.link} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white rounded-lg font-medium text-sm transition-all hover:shadow-lg hover:shadow-cyan-500/25">
                                        Learn More <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link to="/get-in-touch" className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 hover:border-[#2EE1C7]/60 rounded-lg font-medium text-sm text-slate-300 hover:text-[#2EE1C7] transition-all">
                                        <MessageCircle className="w-4 h-4" /> Book Demo
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AISolutionsShowcase;
