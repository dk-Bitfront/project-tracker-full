import React from 'react';

export default function Button({
  text,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded transition duration-300 ${className}`}
      {...props}
    >
      {text}
    </button>
  );
}
