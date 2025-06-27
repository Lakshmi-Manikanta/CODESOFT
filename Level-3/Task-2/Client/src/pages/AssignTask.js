import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AssignTask = () => {
  const { id: projectId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Not Started');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      assignedTo,
      dueDate,
      status,
      project: projectId,
    };

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/tasks`, taskData);
      alert('✅ Task created successfully!');
      navigate(`/project/${projectId}`);
    } catch (err) {
      console.error('❌ Failed to create task:', err.response?.data || err.message);
      alert('❌ Failed to create task. See console for details.');
    }
  };

  return (
    <div
      style={{
        padding: '40px 20px',
        maxWidth: '600px',
        margin: '70px auto',
        backgroundColor: '#F5FFF4',
        borderRadius: '20px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
      }}
    >
      <h2 style={{ fontSize: '26px', marginBottom: '20px', color: '#212529', textAlign:'center',borderBottom: '2px solid #134e5e',paddingBottom: '6px'}}>
        ➕ Assign New Task
      </h2>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter task title"
          style={inputStyle}
        />

        <label style={labelStyle}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          rows="4"
          style={{ ...inputStyle, resize: 'vertical' }}
        />

        <label style={labelStyle}>Assigned To</label>
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder="Name of assignee"
          style={inputStyle}
        />

        <label style={labelStyle}>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={inputStyle}
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          type="submit"
          style={{
            marginTop: '20px',
            padding: '12px',
            width: '100%',
            backgroundColor: '#134e5e',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease-in-out',
          }}>
          🚀 Create Task
        </button>
      </form>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  marginTop: '18px',
  fontSize: '15px',
  fontWeight: 500,
  color: '#495057',
};

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  fontSize: '15px',
  border: '1px solid #ced4da',
  borderRadius: '8px',
  backgroundColor: '#f8f9fa',
  outline: 'none',
  boxSizing: 'border-box',
};

export default AssignTask;
