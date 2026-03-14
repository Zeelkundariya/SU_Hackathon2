import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Trash2 } from 'lucide-react';
import JobForm from '../components/JobForm';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [machines, setMachines] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({
    jobId: '',
    jobName: '',
    priority: 3,
    color: '#6366f1',
    operations: [{ machineId: '', duration: 1, task: 'Op-1' }]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [jRes, mRes] = await Promise.all([api.get('/jobs'), api.get('/machines')]);
      setJobs(jRes.data);
      setMachines(mRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      await api.post('/jobs', newJob);
      fetchData();
      setShowForm(false);
      setNewJob({ jobId: '', jobName: '', priority: 3, color: '#6366f1', operations: [{ machineId: '', duration: 1, task: 'Op-1' }] });
    } catch (err) {
      alert("Error adding job. Check ID uniqueness.");
    }
  };

  const deleteJob = async (id) => {
    if (window.confirm("Delete this job?")) {
      await api.delete(`/jobs/${id}`);
      fetchData();
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-white">Job Management</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2"
        >
          <Plus size={18} /> {showForm ? 'Cancel' : 'New Job'}
        </button>
      </header>

      {showForm && (
        <JobForm 
          machines={machines} 
          newJob={newJob} 
          setNewJob={setNewJob} 
          handleAddJob={handleAddJob} 
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(job => (
          <div key={job.jobId} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl group shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-slate-800 px-3 py-1 rounded text-[10px] font-black text-slate-500 uppercase tracking-widest">{job.jobId}</span>
              <button onClick={() => deleteJob(job.jobId)} className="text-slate-700 hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
            <h3 className="text-xl font-black text-white mb-1">{job.jobName}</h3>
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-2 h-2 rounded-full ${job.priority >= 5 ? 'bg-red-500' : job.priority >= 3 ? 'bg-blue-500' : 'bg-slate-500'}`}></div>
              <span className="text-xs font-bold text-slate-400">Priority {job.priority}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
