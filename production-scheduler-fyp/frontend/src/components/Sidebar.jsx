import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Cpu, Clock, Settings, Factory } from 'lucide-react';

const Sidebar = () => {
  const links = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Job Queue', path: '/jobs', icon: <Briefcase size={20} /> },
    { name: 'Machines', path: '/machines', icon: <Cpu size={20} /> },
    { name: 'Optimizer', path: '/scheduler', icon: <Clock size={20} /> },
  ];

  return (
    <div className="w-64 bg-[#1e293b] h-screen border-r border-slate-800 flex flex-col shrink-0">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800/50">
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <Factory size={24} />
        </div>
        <span className="font-black text-xl tracking-tight">SmartSchedule AI</span>
      </div>
      
      <nav className="flex-1 p-4 flex flex-col gap-2 mt-4">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-sm
              ${isActive 
                ? 'bg-blue-600/10 text-blue-500 border border-blue-600/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
            `}
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 mt-auto border-t border-slate-800/50">
        <div className="flex items-center gap-3 text-slate-500 hover:text-white cursor-pointer transition-colors text-sm font-bold">
          <Settings size={20} />
          Settings
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
