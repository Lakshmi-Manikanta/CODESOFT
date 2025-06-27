import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProjectById } from '../api/projectApi';
import TaskCard from '../components/TaskCard';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProject = async () => {
      try {
        const res = await fetchProjectById(id);
        setProject(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch project:', err);
        setError('Failed to load project. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString() : 'N/A';

  const handleAssignTask = () => {
    navigate(`/project/${id}/assign-task`);
  };

  if (loading)
    return <div style={{ padding: 30, fontSize: '18px' }}>Loading project...</div>;
  if (error)
    return <div style={{ padding: 30, fontSize: '16px', color: 'red' }}>{error}</div>;
  if (!project)
    return <div style={{ padding: 30, fontSize: '16px' }}>No project found.</div>;

  return (
    <div
      style={{
        padding: '40px 24px',
        maxWidth: '1000px',
        margin: '0 auto',
        background: '#F5FFF4',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div style={{ marginBottom: '30px' }}>
        <h1
          style={{
            fontSize: '30px',
            color: '#1e1e2f',
            marginBottom: '12px',
            fontWeight: '600',
          }}
        >
          {project.name || 'Untitled Project'}
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: '#4b4b5e',
            marginBottom: '16px',
            lineHeight: '1.6',
          }}
        >
          {project.description || 'No description provided.'}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <DetailItem label="Status" value={project.status || 'N/A'} />
          <DetailItem label="Priority" value={project.priority || 'N/A'} />
          <DetailItem label="Start Date" value={formatDate(project.startDate)} />
          <DetailItem label="Deadline" value={formatDate(project.deadline)} />
          <DetailItem
            label="Tags"
            value={project.tags?.length ? project.tags.join(', ') : 'No tags'}
          />
        </div>
        <button
          onClick={handleAssignTask}
          style={{
            marginTop: '30px',
            padding: '12px 24px',
            background: '#134e5e',
            color: '#fff',
            fontSize: '15px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease-in-out',
          }}>
          ➕ Assign Task
        </button>
      </div>

      <div>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 600,
            marginBottom: '16px',
            color: '#212529',
            borderBottom: '1px solid #e0e0e0',
            paddingBottom: '8px',
          }}
        >
          Tasks
        </h2>
        {project.tasks?.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {project.tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        ) : (
          <p style={{ fontSize: '15px', color: '#6c757d' }}>No tasks assigned yet.</p>
        )}
      </div>
    </div>
  );
};

// 👇 Reusable component for key-value project detail
const DetailItem = ({ label, value }) => (
  <div>
    <p
      style={{
        margin: 0,
        fontSize: '13px',
        color: '#134e5e',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
	fontWeight:'bold',
	textDecoration:'underline',
      }}
    >
      {label}
    </p>
    <p
      style={{
        fontSize: '15px',
        fontWeight: '500',
        color: '#333',
        marginTop: '4px',
      }}
    >
      {value}
    </p>
  </div>
);

export default ProjectDetail;
