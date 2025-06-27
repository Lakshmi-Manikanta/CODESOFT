import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkStyle = {
    display: 'block',
    padding: '10px 15px',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#333',
    fontWeight: 500,
    marginBottom: '10px',
    transition: 'background-color 0.2s, color 0.2s',
  };

  const activeStyle = {
    backgroundColor: '#134e5e',
    color: '#fff',
  };

  return (
    <aside
      style={{
        width: '220px',
        background: '#F5FFF4',
        height: '100vh',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h3 style={{ marginBottom: '20px', color: '#134e5e', textAlign:'center',borderBottom: '2px solid #134e5e',paddingBottom: '6px',marginTop: '10px',fontWeight: '700'}}> ☰ Menu</h3>
      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
        >
          🏠 Dashboard
        </NavLink>
        <NavLink
          to="/create-project"
          style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
        >
          ➕ Create Project
        </NavLink>
        <NavLink
          to="/register"
          style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
        >
          🧾 Register
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
