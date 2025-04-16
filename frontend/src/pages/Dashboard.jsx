import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const getProgress = (tasks = []) => {
    if (!tasks.length) return 0;
    const done = tasks.filter((task) => task.status === 'Done').length;
    return Math.round((done / tasks.length) * 100);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this project?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prev) => prev.filter((proj) => proj._id !== id));
    } catch (err) {
      console.error('❌ Error deleting project:', err);
      alert('Failed to delete project');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">📁 Project Tracker</h1>
        <div className="space-x-2">
          <Link to="/add-project">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              + Add Project
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">📊 Dashboard</h2>

        {loading ? (
          <div className="text-gray-500">Loading projects...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : projects.length === 0 ? (
          <p className="text-gray-600">No projects found. Start by creating one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  </div>
                  <div className="space-x-1">
                    <button
                      onClick={() => navigate(`/project/${project._id}`)}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/edit-project/${project._id}`)}
                      className="text-yellow-600 text-sm hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-green-500 h-3"
                    style={{ width: `${getProgress(project.tasks)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-right text-gray-500 mt-1">
                  {getProgress(project.tasks)}% complete
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
