import React from 'react';
import { Zap, Clock, Cpu, Users } from 'lucide-react';

const StatsCards = ({ stats }) => {
  const items = [
    { label: 'Avg Utilization', value: stats.avgUtil + '%', icon: <Zap size={18} />, color: 'text-emerald-400' },
    { label: 'Total Jobs', value: stats.totalJobs, icon: <Clock size={18} />, color: 'text-blue-400' },
    { label: 'Active Machines', value: stats.totalMachines, icon: <Cpu size={18} />, color: 'text-orange-400' },
    { label: 'Completion Predict', value: stats.makespan + 'h', icon: <Users size={18} />, color: 'text-purple-400' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {items.map((item, i) => (
        <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl hover:border-blue-500/20 transition-all">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 bg-slate-800 rounded-lg ${item.color}`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.label}</span>
          </div>
          <h3 className="text-3xl font-black text-white">{item.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
