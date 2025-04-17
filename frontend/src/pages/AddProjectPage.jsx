import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProjectForm from '../components/ProjectForm';
import Button from '../components/Button';
import { addProject } from '../features/project/projectSlice';

export default function AddProjectPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreate = async (projectData) => {
    const res = await dispatch(addProject(projectData));

    if (res.meta.requestStatus === 'fulfilled') {
      console.log('Project created successfully:', res.payload);
      navigate('/dashboard');
    } else {
      console.error('Error creating project:', res.payload || res.error);
      alert('Failed to create project.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Top navbar with Back button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Add Project</h1>
        <Button
          text="Back to Dashboard"
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        />
      </div>

      <ProjectForm onSubmit={handleCreate} />
    </div>
  );
}
