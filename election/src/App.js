import './App.css';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import VoterHome from './pages/VoterHome';
import AdminSidebar from './pages/AdminSidebar';
import Voters from './pages/Voters';
import Dashboard from './pages/Dashboard';
import CreateElection from './pages/CreateElection';
import VoterSidebar from './pages/VoterSidebar';
import VoterProfile from './pages/VoterProfile';
import VoterCandidates from './pages/VoterCandidates';
import Ballot from './pages/Ballot';
import ElectionResults from './pages/Results';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/voter_home" element={<VoterSidebar><VoterHome/></VoterSidebar>} />
          <Route path="/voter_profile" element={<VoterSidebar><VoterProfile/></VoterSidebar>} />
          <Route path="/voter_candidates" element={<VoterSidebar><VoterCandidates/></VoterSidebar>} />
          <Route path="/ballot" element={<VoterSidebar><Ballot/></VoterSidebar>} />
          <Route path="/results" element={<VoterSidebar><ElectionResults/></VoterSidebar>} />
          <Route path="/voters" element={<AdminSidebar><Voters/></AdminSidebar>} />
          <Route path="/dashboard" element={<AdminSidebar><Dashboard/></AdminSidebar>} />
          <Route path="/create_election" element={<AdminSidebar><CreateElection/></AdminSidebar>} />
          <Route path="/election_results" element={<AdminSidebar><ElectionResults/></AdminSidebar>} />
          
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
