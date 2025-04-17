import React, { useState, useEffect } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';

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

      <InputField
        label="Project Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <InputField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        required
        textarea
      />

      <InputField
        label="Deadline"
        name="deadline"
        type="date"
        value={form.deadline}
        onChange={handleChange}
        required
      />
      <Button
        type="submit"
        text={initialData ? "Update Project" : "Create Project"}
        className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded'
      />
    </form>
  );
}
