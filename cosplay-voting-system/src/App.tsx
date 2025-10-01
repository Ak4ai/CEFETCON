import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { useAuth } from './contexts/AuthContext';
import { GlobalStyle } from './styles/GlobalStyle';
import './App.css';

// Importações dos componentes
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import JurorVoting from './pages/JurorVoting';
import SpectatorView from './pages/SpectatorView';

const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  allowedRole?: 'admin' | 'juror' 
}> = ({ children, allowedRole }) => {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && state.user?.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/spectator" element={<SpectatorView />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/juror"
        element={
          <ProtectedRoute allowedRole="juror">
            <JurorVoting />
          </ProtectedRoute>
        }
      />
      <Route
        path="/unauthorized"
        element={
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            flexDirection: 'column'
          }}>
            <h1>Acesso Negado</h1>
            <p>Você não tem permissão para acessar esta página.</p>
            <button onClick={() => window.location.href = '/login'}>
              Voltar ao Login
            </button>
          </div>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <GlobalStyle />
        <Router>
          <AppRoutes />
        </Router>
      </AppProvider>
    </AuthProvider>
  );
};

export default App