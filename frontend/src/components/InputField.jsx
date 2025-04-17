import React from 'react';

export default function InputField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
  textarea = false,
}) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-semibold mb-1 text-gray-700">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full p-2 border rounded"
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full p-2 border rounded"
        />
      )}
    </div>
  );
}
