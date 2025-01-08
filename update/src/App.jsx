import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ApplicationProvider } from './context/ApplicationContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ApplicationProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </ApplicationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}