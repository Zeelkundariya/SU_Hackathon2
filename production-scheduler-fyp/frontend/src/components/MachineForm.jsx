import React from 'react';

const MachineForm = ({ newMachine, setNewMachine, handleAddMachine }) => {
  return (
    <form onSubmit={handleAddMachine} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 mb-8 grid grid-cols-2 gap-6 shadow-2xl">
      <input 
        placeholder="ID (e.g. M1)" 
        className="bg-slate-800 border-none rounded-xl p-3 text-sm focus:ring-2 ring-blue-500"
        value={newMachine.machineId}
        onChange={e => setNewMachine({...newMachine, machineId: e.target.value})}
        required
      />
      <input 
        placeholder="Machine Name" 
        className="bg-slate-800 border-none rounded-xl p-3 text-sm focus:ring-2 ring-blue-500"
        value={newMachine.machineName}
        onChange={e => setNewMachine({...newMachine, machineName: e.target.value})}
        required
      />
      <button type="submit" className="col-span-2 bg-blue-600 p-3 rounded-xl font-black text-white uppercase tracking-widest text-sm">Register Resource</button>
    </form>
  );
};

export default MachineForm;
