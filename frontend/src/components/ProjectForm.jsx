// src/components/ProjectForm.jsx
import React, { useState, useEffect } from 'react';

export default function ProjectForm({ onSubmit, initialData }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    deadline: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 shadow-md rounded"
    >
      <h2 className="text-xl font-bold mb-4">
        {initialData ? 'Edit Project' : 'Create Project'}
      </h2>

      <div className="mb-4">
        <label className="block font-semibold">Project Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Deadline</label>
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        {initialData ? 'Update Project' : 'Create Project'}
      </button>
    </form>
  );
}
