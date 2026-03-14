import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Cpu } from 'lucide-react';
import MachineForm from '../components/MachineForm';

const MachinesPage = () => {
  const [machines, setMachines] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newMachine, setNewMachine] = useState({ machineId: '', machineName: '', status: 'idle' });

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    const res = await api.get('/machines');
    setMachines(res.data);
  };

  const handleAddMachine = async (e) => {
    e.preventDefault();
    try {
      await api.post('/machines', newMachine);
      fetchMachines();
      setShowForm(false);
      setNewMachine({ machineId: '', machineName: '', status: 'idle' });
    } catch (err) {
      alert("Error adding machine.");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-white">Machine Cluster</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-bold text-sm flex items-center gap-2"
        >
          <Plus size={18} /> {showForm ? 'Cancel' : 'Add Machine'}
        </button>
      </header>

      {showForm && (
        <MachineForm 
          newMachine={newMachine} 
          setNewMachine={setNewMachine} 
          handleAddMachine={handleAddMachine} 
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {machines.map(m => (
          <div key={m.machineId} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
            <div className={`p-2 w-fit rounded-lg mb-4 bg-blue-500/10 text-blue-500`}>
              <Cpu size={24} />
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-widest mb-1">{m.machineName}</h3>
            <p className="text-xs font-bold text-slate-500 mb-4">{m.machineId}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachinesPage;
