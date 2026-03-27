import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BackToHome from './components/BackToHome';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Marketplaces from './pages/Marketplaces';
import Events from './pages/Events';
import Feedback from './pages/Feedback';
import NotFound from './pages/NotFound';
import Itinerary from './pages/Itinerary';

function App() {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-gray-900 transition-colors">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/Marketplaces" element={<Marketplaces />} />
        <Route path="/events" element={<Events />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BackToHome />
    </div>
  );
}

export default App;
