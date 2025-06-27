import React from 'react';

const ProgressBar = ({ completed }) => {
  return (
    <div style={{ background: 'black', borderRadius: '5px', height: '20px', marginBottom: '10px' }}>
      <div
        style={{
          width: `${completed}%`,
          background: '#4F46E5',
          height: '100%',
          borderRadius: '5px',
          textAlign: 'center',
          color: 'white'
        }}
      >
        {completed}%
      </div>
    </div>
  );
};

export default ProgressBar;
