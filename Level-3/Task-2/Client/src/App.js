import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './styles/global.css';
import './styles/layout.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <AppRoutes />
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
