import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        name,
        email,
        password
      });
      alert('✅ Registered successfully');
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('❌ Registration failed');
    }
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px'
    }}>
      <form
        onSubmit={handleRegister}
        style={{
          background: '#F5FFF4',
          padding: '30px 40px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          width: '100%'
        }}
      >
        <h2 style={{ marginBottom: '20px', fontWeight: '700', textAlign: 'center', color: '#333' }}>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#134e5e',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '10px',
            transition: 'background-color 0.3s'
          }}>
          Register
        </button>
      </form>
    </div>
  );
};

// ✅ Reusable input style
const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '16px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontSize: '15px'
};

export default Register;
