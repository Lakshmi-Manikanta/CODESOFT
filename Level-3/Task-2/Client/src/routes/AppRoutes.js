import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import CreateProject from '../pages/CreateProject';
import ProjectDetail from '../pages/ProjectDetail';
import TaskList from '../pages/TaskList';
import AssignTask from '../pages/AssignTask';
import NotFound from '../pages/NotFound';

import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-project"
        element={
          <ProtectedRoute>
            <CreateProject />
          </ProtectedRoute>
        }
      />

      <Route
        path="/project/:id"
        element={
          <ProtectedRoute>
            <ProjectDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/project/:id/tasks"
        element={
          <ProtectedRoute>
            <TaskList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/project/:id/assign-task"
        element={
          <ProtectedRoute>
            <AssignTask />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
