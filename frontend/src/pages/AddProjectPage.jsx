import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProjectForm from '../components/ProjectForm';

export default function AddProjectPage() {
  const navigate = useNavigate();

  const handleCreate = async (projectData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('User not authenticated');
        return;
      }

      const res = await axios.post('http://localhost:5000/api/projects', projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('✅ Project created:', res.data);
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Error creating project:', err);
      alert('Failed to create project. Please check the console.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* ✅ Top navbar with Back button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Add Project</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>

      <ProjectForm onSubmit={handleCreate} />
    </div>
  );
}
