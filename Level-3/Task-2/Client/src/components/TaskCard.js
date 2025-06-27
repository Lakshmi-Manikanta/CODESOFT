import React from 'react';

const TaskCard = ({ task }) => {
  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : 'N/A';
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '12px',
      backgroundColor: '#f9f9f9'
    }}>
      <h4 style={{ marginBottom: '6px', color: '#333' }}>{task.title || 'Untitled Task'}</h4>
      <p style={{ margin: '4px 0' }}><b>Description:</b> {task.description || 'No description'}</p>
      <p style={{ margin: '4px 0' }}><b>Status:</b> {task.status || 'Unknown'}</p>
      <p style={{ margin: '4px 0' }}><b>Assigned To:</b> {task.assignedTo || 'Unassigned'}</p>
      <p style={{ margin: '4px 0' }}><b>Due Date:</b> {formatDate(task.dueDate)}</p>
    </div>
  );
};

export default TaskCard;
