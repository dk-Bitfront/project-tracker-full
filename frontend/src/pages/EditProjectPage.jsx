import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios'; 
import ProjectForm from '../components/ProjectForm';

export default function EditProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get('/projects');
        const project = res.data.find((proj) => proj._id === id);

        if (project) {
          setInitialData({
            name: project.name,
            description: project.description,
            deadline: project.deadline?.split('T')[0] || '',
          });
        } else {
          alert('Project not found');
          navigate('/dashboard');
        }
      } catch (err) {
        console.error('❌ Error fetching project:', err);
        alert('Failed to load project');
      }
    };

    fetchProject();
  }, [id, navigate]);

  const handleUpdate = async (updatedData) => {
    try {
      const res = await api.put(`/projects/${id}`, updatedData);
      console.log('Project updated:', res.data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error updating project:', err);
      alert('Update failed');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Edit Project</h2>
        <button
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
      {initialData ? (
        <ProjectForm onSubmit={handleUpdate} initialData={initialData} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
