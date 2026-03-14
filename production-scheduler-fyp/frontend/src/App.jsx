import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import JobsPage from './pages/JobsPage';
import MachinesPage from './pages/MachinesPage';
import SchedulePage from './pages/SchedulePage';

function App() {
  return (
    <Router>
      <div className="flex bg-[#0f172a] min-h-screen text-slate-200">
        <Sidebar />
        <main className="flex-1 overflow-y-auto h-screen custom-scrollbar">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/machines" element={<MachinesPage />} />
            <Route path="/scheduler" element={<SchedulePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
