import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/tasks`)
      .then(res => setTasks(res.data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>All Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map(task => <TaskCard key={task._id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;
