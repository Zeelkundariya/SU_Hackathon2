import React, { useState, useEffect } from 'react';
import api from '../api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatsCards from '../components/StatsCards';
import Dashboard from '../components/Dashboard';
import { Calendar, Cpu, Clock, AlertCircle } from 'lucide-react';

const DashboardPage = () => {
  const [data, setData] = useState({
    totalJobs: 0,
    totalMachines: 0,
    avgUtil: 0,
    makespan: 0,
    utilHistory: [
      { t: '10:00', v: 40 },
      { t: '11:00', v: 45 },
      { t: '12:00', v: 80 },
      { t: '13:00', v: 92 },
      { t: '14:00', v: 88 },
    ]
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const jRes = await api.get('/jobs');
      const mRes = await api.get('/machines');
      const sRes = await api.get('/schedules/latest');
      
      const makespan = Math.max(...sRes.data.map(s => s.end), 0);
      
      setData(prev => ({
        ...prev,
        totalJobs: jRes.data.length,
        totalMachines: mRes.data.length,
        makespan
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-white flex items-center gap-3">
          Manufacturing Command Center
        </h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">Factory ID: CLUSTER-BRAVO-7</p>
      </header>

      <StatsCards stats={data} />
      
      <div className="mb-8">
        <Dashboard stats={data} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-lg font-black text-white flex items-center gap-2 mb-6 uppercase tracking-widest text-blue-500">
            Resource Utilization Trend
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.utilHistory}>
                <defs>
                  <linearGradient id="colorUtil" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="t" stroke="#475569" fontSize={10} />
                <YAxis stroke="#475569" fontSize={10} />
                <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="v" stroke="#3b82f6" fill="url(#colorUtil)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-lg font-black text-white flex items-center gap-2 mb-6 uppercase tracking-widest text-emerald-500">
            System Alerts
          </h2>
          <div className="space-y-4">
            {[
              { id: 1, msg: 'Machine M-02 Maintenance Due in 4h', type: 'warning', icon: <AlertCircle size={16} /> },
              { id: 2, msg: 'AI Scheduler optimized makespan to 12.5h', type: 'info', icon: <Clock size={16} /> },
              { id: 3, msg: 'New Priority Order #JP-882 Added', type: 'success', icon: <Calendar size={16} /> },
            ].map(alert => (
              <div key={alert.id} className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-2xl border border-slate-800">
                <div className={`p-2 rounded-lg ${
                  alert.type === 'warning' ? 'bg-orange-500/10 text-orange-500' :
                  alert.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
                }`}>
                  {alert.icon}
                </div>
                <span className="text-sm font-bold text-slate-300">{alert.msg}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
