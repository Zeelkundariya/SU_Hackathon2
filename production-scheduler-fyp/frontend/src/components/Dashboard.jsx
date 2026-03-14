import React from 'react';
import { Activity, Cpu, Briefcase, CheckCircle } from 'lucide-react';

const Dashboard = ({ stats }) => {
  const cards = [
    { title: 'System Status', value: 'Optimal', icon: <Activity size={24} />, color: 'bg-emerald-500' },
    { title: 'Machine Load', value: '72%', icon: <Cpu size={24} />, color: 'bg-blue-500' },
    { title: 'Pending Jobs', value: stats.totalJobs || 0, icon: <Briefcase size={24} />, color: 'bg-purple-500' },
    { title: 'Goal Completion', value: '94%', icon: <CheckCircle size={24} />, color: 'bg-orange-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div key={i} className="bg-[#1e293b] p-6 rounded-3xl border border-slate-800 shadow-xl overflow-hidden relative group transition-all hover:scale-[1.02]">
          <div className="relative z-10">
            <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:rotate-12 transition-transform`}>
              {card.icon}
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{card.title}</p>
            <h3 className="text-2xl font-black text-white">{card.value}</h3>
          </div>
          <div className={`absolute -right-4 -bottom-4 w-24 h-24 ${card.color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform`}></div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
