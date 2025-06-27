import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser({ email, password });
      login(user);
      navigate('/');
    } catch {
      alert('❌ Invalid credentials');
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#F5FFF4',
          padding: '30px 40px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          maxWidth: '400px',
          width: '90%',
        }}
      >
        <h2
          style={{
            marginBottom: '24px',
            fontWeight: '700',
            textAlign: 'center',
            color: '#333',
          }}
        >
          Login
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          style={inputStyle}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: '#134e5e',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '12px',
            transition: 'background-color 0.3s',
          }}>
          Login
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '15px',
  marginBottom: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontSize: '15px',
};

export default Login;
