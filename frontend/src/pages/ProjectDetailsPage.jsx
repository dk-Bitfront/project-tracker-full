import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({ name: '', status: 'Pending', dueDate: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);

  const fetchProject = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:5000/api/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const found = res.data.find(p => p._id === id);
    setProject(found);
  };

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:5000/api/projects/${id}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(res.data);
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (editingTaskId) {
      await axios.put(
        `http://localhost:5000/api/projects/task/${editingTaskId}`,
        taskForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      await axios.post(
        `http://localhost:5000/api/projects/${id}/tasks`,
        taskForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    setTaskForm({ name: '', status: 'Pending', dueDate: '' });
    setEditingTaskId(null);
    fetchTasks();
  };

  const toggleTaskStatus = async (taskId, newStatus) => {
    const token = localStorage.getItem('token');
    await axios.put(
      `http://localhost:5000/api/projects/task/${taskId}`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchTasks();
  };

  const handleEditTask = (task) => {
    setTaskForm({
      name: task.name,
      status: task.status,
      dueDate: task.dueDate?.split('T')[0],
    });
    setEditingTaskId(task._id);
  };

  const handleDeleteTask = async (taskId) => {
    const confirm = window.confirm('Are you sure you want to delete this task?');
    if (!confirm) return;

    const token = localStorage.getItem('token');
    try {
      await axios.delete(
        `http://localhost:5000/api/projects/${id}/tasks/${taskId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error('❌ Failed to delete task:', err);
      alert('Failed to delete task. Check console for details.');
    }
  };


  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [id]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Navbar for back button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Details</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Back to Dashboard
        </button>
      </div>

      {project && (
        <>
          <h2 className="text-2xl font-bold">{project.name}</h2>
          <p className="mb-4">{project.description}</p>
        </>
      )}

      <form onSubmit={handleTaskSubmit} className="space-y-2 mb-6 border p-4 rounded bg-gray-50">
        <h3 className="text-lg font-semibold">{editingTaskId ? 'Edit Task' : 'Add Task'}</h3>
        <input
          type="text"
          placeholder="Task Name"
          value={taskForm.name}
          onChange={(e) => setTaskForm({ ...taskForm, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={taskForm.status}
          onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option>Pending</option>
          <option>Done</option>
        </select>
        <input
          type="date"
          value={taskForm.dueDate}
          onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {editingTaskId ? 'Update Task' : 'Add Task'}
        </button>
      </form>

      <h3 className="text-xl font-bold mb-2">Tasks</h3>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task._id} className="p-3 border rounded bg-white flex justify-between items-center">
          <div>
            <p className="font-semibold">{task.name}</p>
            <p className="text-sm text-gray-600">Due: {task.dueDate?.split('T')[0]}</p>
          </div>
        
          <div className="flex items-center gap-2">
            <select
              value={task.status}
              onChange={(e) => toggleTaskStatus(task._id, e.target.value)}
              className="border p-1 rounded"
            >
              <option>Pending</option>
              <option>Done</option>
            </select>
            <button
              onClick={() => setTaskForm(task)}
              className="text-blue-600 hover:underline text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTask(task._id)}
              className="text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
          </div>
        </li>
        
        ))}
      </ul>
    </div>
  );
}
