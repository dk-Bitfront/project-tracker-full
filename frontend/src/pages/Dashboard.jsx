import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { fetchProjects, deleteProject } from '../features/project/projectSlice';
import { TOAST_MESSAGES } from '../constants/messages';

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projects, loading, error } = useSelector((state) => state.project);


  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const getProgress = (tasks = []) => {
    if (!tasks.length) return 0;
    const done = tasks.filter((task) => task.status === 'Done').length;
    return Math.round((done / tasks.length) * 100);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(TOAST_MESSAGES.PROJECT_DELETED);
    if (!confirm) return;

    const res = await dispatch(deleteProject(id));

    if (res.meta.requestStatus === 'rejected') {
      alert('Failed to delete project');
      console.error(res.error || res.payload);
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
        <div className="space-x-2 flex">
          <Link to="/add-project">
            <Button
              text="+ Add Project"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            />
          </Link>
          <Button
            text="Logout"
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          />
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">📊 Dashboard</h2>

        {loading ? (
          <div className="text-gray-500">{TOAST_MESSAGES.LOADING_PROJECTS}</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : projects.length === 0 ? (
          <p className="text-gray-600">{TOAST_MESSAGES.NO_PROJECTS_FOUND}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  </div>

                  <div className="space-x-1 flex">
                    <Button
                      text={<FiEye />}
                      onClick={() => navigate(`/project/${project._id}`)}
                      className="text-blue-600 text-m hover:underline px-0 py-0"
                    />
                    <Button
                      text={<FiEdit />}
                      onClick={() => navigate(`/edit-project/${project._id}`)}
                      className="text-yellow-600 text-m hover:underline px-0 py-0"
                    />
                    <Button
                      text={<FiTrash />}
                      onClick={() => handleDelete(project._id)}
                      disabled={loading}
                      className="text-red-600 text-m hover:underline px-0 py-0"
                    />
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
