import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import DataEntry from "./pages/DataEntry";
import OwnerPortal from "./pages/OwnerPortal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/entry" element={<DataEntry />} />
        <Route path="/owner" element={<OwnerPortal />} />
      </Routes>
    </Router>
  );
}

export default App;