import React from 'react';

const InputGroup = ({ label, value, onChange, type = "text", placeholder = "" }) => {
    return (
        <div className="input-group">
            <label>{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputGroup;
