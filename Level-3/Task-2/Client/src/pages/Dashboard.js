import React, { useEffect, useState } from 'react';
import { fetchProjects, deleteProject } from '../api/projectApi';
import ProjectCard from '../components/ProjectCard';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const loadProjects = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetchProjects();
      setProjects(res.data);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadProjects();
  }, [user, navigate]);

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      // Refresh the projects list after deletion
      loadProjects();
    } catch (err) {
      setError('Failed to delete project');
    }
  };

  return (
    <div
      style={{
        padding: '30px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#121212', fontWeight:'800', textAlign:'center'}}>
        📋 Project Dashboard
      </h2>

      {loading && (
        <p style={{ fontSize: '16px', color: '#666' }}>Loading projects...</p>
      )}

      {error && (
        <p style={{ color: 'red', fontSize: '16px', fontWeight: 500 }}>
          {error}
        </p>
      )}

      {!loading && !error && projects.length === 0 && (
        <p style={{ fontSize: '16px', color: '#555' }}>
          No projects found. Start by creating one!
        </p>
      )}

      {!loading && !error && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onDelete={handleDelete} // pass delete handler
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;