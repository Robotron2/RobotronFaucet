import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import PageWrapper from './components/layout/PageWrapper';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <PageWrapper isDashboard={currentPath !== '/' && currentPath !== ''}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/faucet" element={<Dashboard />} />
        <Route path="/history" element={<Dashboard />} />
        <Route path="/leaderboard" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageWrapper>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
