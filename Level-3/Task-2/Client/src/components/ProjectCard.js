import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProjectCard = ({ project, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : 'N/A');

  const handleViewProject = () => {
    navigate(user ? `/project/${project._id}` : '/login');
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete the project "${project.name}"?`)) {
      onDelete(project._id);
    }
  };

  return (
    <div
      style={{
        border: '1px solid #dee2e6',
        borderRadius: '12px',
        backgroundColor: '#F5FFFA',
        padding: '24px',
        marginBottom: '20px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        position: 'relative', // for delete button positioning
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.05)';
      }}
    >
      <h3 style={{ marginBottom: '10px', fontSize: '22px', color: '#212529' }}>
        {project.name || 'Untitled Project'}
      </h3>
      <p style={{ marginBottom: '12px', color: '#495057' }}>
        {project.description || 'No description available.'}
      </p>

      <div style={{ fontSize: '15px', lineHeight: '1.6', color: '#495057' }}>
        <p><strong>Status:</strong> {project.status || 'Not set'}</p>
        <p><strong>Priority:</strong> {project.priority || 'Normal'}</p>
        <p><strong>Start Date:</strong> {formatDate(project.startDate)}</p>
        <p><strong>Deadline:</strong> {formatDate(project.deadline)}</p>
        <p><strong>Tags:</strong> {project.tags?.length ? project.tags.join(', ') : 'None'}</p>
      </div>

      <button
        onClick={handleViewProject}
        style={{
          marginTop: '18px',
          padding: '10px 20px',
          backgroundColor: '#134e5e',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background-color 0.2s ease-in-out',
          marginRight: '10px',
        }}>
        🔍 View Project
      </button>

      <button
        onClick={handleDeleteClick}
        style={{
          marginTop: '18px',
          padding: '10px 20px',
          backgroundColor: '#71b280',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background-color 0.2s ease-in-out',
        }}>
        🗑️ Delete
      </button>
    </div>
  );
};

export default ProjectCard;
