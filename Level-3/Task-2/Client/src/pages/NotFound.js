import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFound;
