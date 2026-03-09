import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Bell, Check, X, Shield, Clock, BrainCircuit, Activity, Zap, Cpu, Search, Filter, RefreshCw } from 'lucide-react';

const OwnerPortal = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());

    const fetchRequests = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/ai/requests');
            setRequests(res.data.filter(r => r.status === 'Pending'));
            setLoading(false);
        } catch (err) {
            console.error('Error fetching requests:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
        const interval = setInterval(fetchRequests, 3000);
        const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => {
            clearInterval(interval);
            clearInterval(timeInterval);
        };
    }, []);

    const handleAction = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/ai/request/${id}`, { status });
            fetchRequests();
        } catch (err) {
            console.error('Error updating request:', err);
        }
    };

    return (
        <div className="flex flex-col min-h-screen text-white font-sans relative overflow-hidden" style={{ background: '#05060f' }}>
            {/* Premium Animated Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-indigo-600/10 rounded-full blur-[100px]"></div>

            {/* Cyber Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="relative z-10 flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 py-8">
                {/* Compact Header */}
                <header className="flex flex-row justify-between items-center mb-8 px-2">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center shadow-2xl border border-white/10">
                            <Shield size={24} className="text-indigo-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-white leading-none">SmartFactory <span className="text-indigo-400">Executive</span> Terminal</h1>
                            <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mt-1.5 opacity-80">System Integrity: <span className="text-emerald-500">VALIDATED</span> • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-md">
                            <User size={14} className="text-indigo-400" />
                            <span className="text-[11px] font-black tracking-tight text-gray-300">ADMIN.BHILWARA</span>
                        </div>
                        <button className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
                            <Bell size={18} className="text-gray-400" />
                        </button>
                    </div>
                </header>

                {/* Compact Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {[
                        { label: 'Agents', val: '52/52', icon: BrainCircuit, color: 'text-indigo-400' },
                        { label: 'Latency', val: '0.8ms', icon: Activity, color: 'text-blue-400' },
                        { label: 'Pending', val: requests.length, icon: Zap, color: 'text-amber-500' },
                        { label: 'Node', val: 'Bhilwara', icon: Cpu, color: 'text-emerald-400' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl">
                            <div className="flex items-center gap-2 mb-1">
                                <stat.icon size={12} className={stat.color} />
                                <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">{stat.label}</span>
                            </div>
                            <div className={`text-lg font-black ${stat.label === 'Pending' && requests.length > 0 ? 'text-amber-500 animate-pulse' : 'text-white'}`}>{stat.val}</div>
                        </div>
                    ))}
                </div>

                {/* Main Action Feed */}
                <main className="flex-1">
                    <div className="flex items-center justify-between mb-6 px-2">
                        <div className="flex items-center gap-3">
                            <h2 className="text-sm font-black tracking-[0.2em] text-indigo-400 uppercase">Approval Stack</h2>
                            <div className="h-5 w-px bg-white/10"></div>
                            <span className="text-[12px] text-gray-500 font-bold uppercase tracking-tight">{requests.length} Strategic Signals Detected</span>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
                            <input type="text" placeholder="Search signals..." className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs w-48 focus:outline-none focus:border-indigo-500/50 transition-all focus:w-60" />
                        </div>
                    </div>

                    {loading ? (
                        <div className="py-24 text-center bg-white/[0.02] border border-white/5 rounded-3xl">
                            <RefreshCw size={32} className="animate-spin text-indigo-500 mx-auto mb-4" />
                            <div className="text-sm font-bold text-gray-500 tracking-widest uppercase">Syncing Neural Nexus...</div>
                        </div>
                    ) : requests.length === 0 ? (
                        <div className="py-20 px-8 text-center bg-white/[0.02] border border-white/10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                            <div className="absolute inset-0 bg-indigo-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-emerald-500/20 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]">
                                    <CheckCircle size={40} className="text-emerald-500/80" />
                                </div>
                                <h2 className="text-2xl font-black text-white mb-3 tracking-tight">Operational Equilibrium Reached</h2>
                                <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed mb-10 opacity-70">Neural agents are performing within optimal parameters. System state is currently stabilized across all Bhilwara sectors.</p>

                                <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto border-t border-white/5 pt-10">
                                    <div className="text-center">
                                        <div className="text-[10px] font-black tracking-[0.2em] text-gray-600 uppercase mb-2">Cycle Sync</div>
                                        <div className="text-sm font-black text-gray-300">REALTIME</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-[10px] font-black tracking-[0.2em] text-gray-600 uppercase mb-2">Factory Load</div>
                                        <div className="text-sm font-black text-emerald-500 uppercase tracking-tighter">Optimized</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-[10px] font-black tracking-[0.2em] text-gray-600 uppercase mb-2">Confidence</div>
                                        <div className="text-sm font-black text-white">99.98%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 pb-10">
                            {requests.map((req) => (
                                <div key={req._id} className="relative bg-white/[0.06] backdrop-blur-3xl border border-white/10 rounded-[1.5rem] p-7 hover:bg-white/[0.08] transition-all group border-l-[6px] border-l-indigo-600 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                                <div className="flex items-center gap-2 bg-indigo-500/20 px-3 py-1 rounded-lg text-[10px] font-black tracking-widest text-indigo-300 uppercase border border-indigo-500/30">
                                                    <BrainCircuit size={12} className="opacity-70" />
                                                    {req.agentName}
                                                </div>
                                                <div className="text-[10px] text-gray-500 font-bold flex items-center gap-1.5 uppercase tracking-wider">
                                                    <Clock size={12} className="opacity-70" />
                                                    {new Date(req.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                                <div className="text-[10px] font-black text-gray-600 tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                                    SIG / {req._id.toString().slice(-8).toUpperCase()}
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-black text-white tracking-tight mb-2 group-hover:text-indigo-400 transition-colors">{req.requestType}</h3>
                                            <p className="text-[14px] text-gray-400 font-medium leading-[1.6] max-w-2xl opacity-90">{req.details}</p>
                                        </div>

                                        <div className="flex items-center gap-4 shrink-0 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-white/5">
                                            <div className="text-right flex-1 lg:flex-none mr-4">
                                                <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-1 opacity-80">Strategic Utility</div>
                                                <div className="text-xs text-gray-300 font-bold italic tracking-tight">
                                                    {req.agentName === 'InventoryAI' ? 'Working Capital Optimization' : 'Direct Margin Enhancement'}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleAction(req._id, 'Rejected')}
                                                    className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 text-gray-500 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/40 transition-all flex items-center justify-center group/btn shadow-xl active:scale-95"
                                                    title="Reject Signal"
                                                >
                                                    <X size={22} className="group-hover/btn:scale-110 transition-transform" />
                                                </button>
                                                <button
                                                    onClick={() => handleAction(req._id, 'Approved')}
                                                    className="px-8 h-12 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black text-[13px] text-white flex items-center gap-3 shadow-[0_15px_30px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_40px_rgba(79,70,229,0.5)] transition-all active:scale-[0.97] group/approve"
                                                >
                                                    <Check size={20} className="group-hover/approve:scale-110 transition-transform" strokeWidth={3} />
                                                    Execute Action
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>

                {/* Footer Logistics */}
                <footer className="mt-auto py-12 border-t border-white/5">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-10 opacity-30 hover:opacity-100 transition-opacity">
                        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-12 gap-y-6">
                            <div>
                                <div className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-1">Gateway Hub</div>
                                <div className="text-xs font-bold text-gray-300 tracking-tight">Port 5000 (Neural Engine v4.2)</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-1">Sovereign Layer</div>
                                <div className="text-xs font-bold text-gray-300 tracking-tight">AES-256-QUBIT / RSA-8192</div>
                            </div>
                            <div>
                                <div className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-1">Local Identity</div>
                                <div className="text-xs font-bold text-gray-300 tracking-tight">admin@bhilwara.mill</div>
                            </div>
                        </div>
                        <div className="flex flex-col lg:items-end gap-2">
                            <div className="flex items-center gap-2 lg:justify-end">
                                <Shield size={16} className="text-indigo-500" />
                                <span className="text-[11px] font-black tracking-[0.4em] text-white uppercase opacity-90">Secure Sovereign Factory OS</span>
                            </div>
                            <span className="text-[9px] font-bold text-gray-600 tracking-widest uppercase lg:text-right">Bhilwara Smart Architecture © 2026</span>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Subliminal Brand Text */}
            <div className="fixed bottom-[-100px] left-1/2 -translate-x-1/2 text-[18rem] font-black text-white/[0.01] pointer-events-none select-none tracking-tighter uppercase">
                Executive
            </div>
        </div>
    );
};

// Internal Components (Using icons already imported)
const ArrowRight = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
);

const CheckCircle = ({ className, size }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

export default OwnerPortal;
