import React, { useState } from 'react';
import { createProject } from '../api/projectApi';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Not Started');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      description,
      startDate,
      deadline,
      priority,
      status,
      tags: tags.split(',').map(tag => tag.trim()),
    };

    try {
      await createProject(data);
      alert('✅ Project created successfully!');
      navigate('/');
    } catch (err) {
      console.error('❌ Failed to create project:', err);
      alert('Failed to create project.');
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '30px',
      backgroundColor: '#F5FFF4',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
    }}>
      <h1 style={{
        fontWeight: '800',
        color: '#333',
        textAlign: 'center',
        marginBottom: '25px'
      }}>
        📝 Create New Project
      </h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px'}}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Project Name"
          required
          style={inputStyle}
        />

        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Project Description"
          required
          rows="4"
          style={{ ...inputStyle, resize: 'vertical' }}
        />

        <div style={{ display: 'flex', gap: '15px' }}>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
            style={{ ...inputStyle, flex: 1 }}
          />
          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            required
            style={{ ...inputStyle, flex: 1 }}
          />
        </div>

        <select value={priority} onChange={e => setPriority(e.target.value)} style={inputStyle}>
          <option value="Low">Priority: Low</option>
          <option value="Medium">Priority: Medium</option>
          <option value="High">Priority: High</option>
        </select>

        <select value={status} onChange={e => setStatus(e.target.value)} style={inputStyle}>
          <option value="Not Started">Status: Not Started</option>
          <option value="In Progress">Status: In Progress</option>
          <option value="Completed">Status: Completed</option>
        </select>

        <input
          type="text"
          value={tags}
          onChange={e => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          ➕ Create Project
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: '12px 15px',
  fontSize: '16px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  backgroundColor: '#fff',
  outline: 'none',
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
};

const buttonStyle = {
  padding: '12px',
  fontSize: '16px',
  fontWeight: '600',
  color: '#fff',
  backgroundColor: '#134e5e',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s'
};

export default CreateProject;
