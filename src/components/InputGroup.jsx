import React, { useId, useState } from 'react';

/**
 * Enhanced input group component with label-input association,
 * number type conversion, non-numeric rejection, required field
 * validation, negative number warning, and error state styling.
 */
const InputGroup = ({ label, value, onChange, type = "text", required = false, placeholder = "" }) => {
  const id = useId();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    let newValue = e.target.value;

    if (type === 'number') {
      // Allow empty string and lone minus sign to pass through
      if (newValue === '' || newValue === '-') {
        onChange(newValue);
        setError('');
        return;
      }
      const num = Number(newValue);
      // Block non-numeric input
      if (isNaN(num)) return;
      // Convert to Number type and pass to parent
      onChange(num);
      // Show warning for negative values
      if (num < 0) setError('Value is negative');
      else setError('');
      return;
    }

    // For text and other types, pass string value
    onChange(newValue);
    // Validate required fields
    if (required && !newValue.trim()) setError('This field is required');
    else setError('');
  };

  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={error ? 'input-error' : ''}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && <span id={`${id}-error`} className="error-text" role="alert">{error}</span>}
    </div>
  );
};

export default InputGroup;
