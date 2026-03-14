import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Trash2, Cpu, Clock, Zap } from 'lucide-react';
import GanttChart from '../components/GanttChart';

const SchedulePage = () => {
  const [schedule, setSchedule] = useState([]);
  const [machines, setMachines] = useState([]);
  const [stats, setStats] = useState({ makespan: 0, util: {} });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const mRes = await api.get('/machines');
      const sRes = await api.get('/schedules/latest');
      setMachines(mRes.data);
      setSchedule(sRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOptimize = async () => {
    setLoading(true);
    try {
      const res = await api.get('/schedules/optimize');
      setSchedule(res.data.schedule);
      setStats({
        makespan: res.data.makespan,
        util: res.data.machineUtilization
      });
    } catch (err) {
      alert("Optimization failed. Check if jobs and machines exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">AI Production Optimizer</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-1">Evolving optimal makespan using Genetic Algorithm</p>
        </div>
        <button 
          onClick={handleOptimize}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_8px_32px_rgba(37,99,235,0.3)] transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? 'Crunching GA...' : 'Run GA Optimizer'}
        </button>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <GanttChart schedule={schedule} machines={machines} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
            <h3 className="text-slate-500 font-black text-[10px] uppercase tracking-widest mb-4">Optimization Results</h3>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-white">{stats.makespan || 0}h</span>
              <span className="text-slate-500 font-bold mb-1">Total Makespan</span>
            </div>
          </div>
          
          <div className="col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
             <h3 className="text-slate-500 font-black text-[10px] uppercase tracking-widest mb-4">Resource Utilization</h3>
             <div className="flex gap-6 overflow-x-auto">
                {Object.entries(stats.util).map(([id, val]) => (
                  <div key={id} className="min-w-[120px]">
                    <div className="text-xs font-bold text-slate-400 mb-1">{id}</div>
                    <div className="text-lg font-black text-blue-400">{val}%</div>
                    <div className="w-full h-1 bg-slate-800 rounded-full mt-1">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${val}%` }}></div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
