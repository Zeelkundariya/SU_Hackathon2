import React from 'react';

const JobForm = ({ machines, newJob, setNewJob, handleAddJob }) => {
  return (
    <form onSubmit={handleAddJob} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 mb-8 grid grid-cols-2 gap-6 shadow-2xl">
      <input 
        placeholder="Job ID (e.g. J1)" 
        className="bg-slate-800 border-none rounded-xl p-3 text-sm focus:ring-2 ring-blue-500"
        value={newJob.jobId}
        onChange={e => setNewJob({...newJob, jobId: e.target.value})}
        required
      />
      <input 
        placeholder="Job Name" 
        className="bg-slate-800 border-none rounded-xl p-3 text-sm focus:ring-2 ring-blue-500"
        value={newJob.jobName}
        onChange={e => setNewJob({...newJob, jobName: e.target.value})}
        required
      />
      <select 
        className="bg-slate-800 border-none rounded-xl p-3 text-sm"
        value={newJob.priority}
        onChange={e => setNewJob({...newJob, priority: parseInt(e.target.value)})}
      >
        <option value="1">Priority 1 (Low)</option>
        <option value="3">Priority 3 (Med)</option>
        <option value="5">Priority 5 (High)</option>
      </select>
      <div className="flex gap-2 items-center">
        <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Machine:</span>
        <select 
          className="bg-slate-800 border-none rounded-xl p-3 text-sm flex-1"
          onChange={e => {
            const ops = [...newJob.operations];
            ops[0].machineId = e.target.value;
            setNewJob({...newJob, operations: ops});
          }}
          required
        >
          <option value="">Select Machine</option>
          {machines.map(m => <option key={m.machineId} value={m.machineId}>{m.machineName}</option>)}
        </select>
      </div>
      <button type="submit" className="col-span-2 bg-blue-600 p-3 rounded-xl font-black text-white uppercase tracking-widest text-sm">Add Job to Queue</button>
    </form>
  );
};

export default JobForm;
