import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import LandingPage from './pages/LandingPage';
import InputPage from './pages/InputPage';
import ResultPage from './pages/ResultPage';
import TermsPage from './pages/TermsPage';
import RefundPage from './pages/RefundPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/refund" element={<RefundPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;
