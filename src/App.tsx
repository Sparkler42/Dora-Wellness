import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WellnessProvider } from './context/WellnessContext';
import NavBar from './components/ui/NavBar';
import HomePage from './pages/HomePage';
import GoalsPage from './pages/GoalsPage';
import InsightsPage from './pages/InsightsPage';
import CheckInPage from './pages/CheckInPage';

export default function App() {
  return (
    <BrowserRouter>
      <WellnessProvider>
        <div className="min-h-screen bg-sage-50 pb-20">
          <main className="max-w-md mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/goals" element={<GoalsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/checkin" element={<CheckInPage />} />
            </Routes>
          </main>
          <NavBar />
        </div>
      </WellnessProvider>
    </BrowserRouter>
  );
}
