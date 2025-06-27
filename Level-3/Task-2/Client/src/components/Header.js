import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { logout } = useAuth();

  return (
    <header style={{ 
      background: '#134e5e', 
      color: '#fff', 
      padding: '30px 40px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      borderRadius: '10px', 
      position: 'relative' 
    }}>
      
      {/* Left - Logo */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src="/project.jpg" 
          alt="Logo" 
          width="60" 
          height="60" 
          style={{ marginRight: '10px' }} 
        />
      </div>

      {/* Center - Title */}
      <h1 style={{ 
        fontSize: '40px', 
        color: '#F5FFF4', 
        position: 'absolute', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        margin: 0 
      }}>
        👤Project Manager
      </h1>

      {/* Right - Logout Button */}
      <button 
        onClick={logout} 
        style={{ 
          background: '#F5FFF4', 
          color: 'black', 
          border: 'none', 
          padding: '8px 16px', 
          borderRadius: '4px', 
          cursor: 'pointer', 
          fontWeight: 'bold' 
        }}
      >
        🚪 Logout
      </button>
    </header>
  );
};

export default Header;
