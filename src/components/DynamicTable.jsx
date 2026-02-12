import React from 'react';

const DynamicTable = ({ title, items, onUpdate, onAdd, onRemove, columns }) => {
    return (
        <div className="dynamic-table">
            <h3>{title}</h3>
            <div className="table-header">
                {columns.map(col => <span key={col.key}>{col.label}</span>)}
                <span>Actions</span>
            </div>
            {items.map((item) => (
                <div key={item.id} className="table-row">
                    {columns.map(col => (
                        <input
                            key={col.key}
                            type={col.type || "text"}
                            value={item[col.key]}
                            onChange={(e) => onUpdate(item.id, col.key, e.target.value)}
                            placeholder={col.label}
                            className={`input-${col.key}`}
                        />
                    ))}
                    <button onClick={() => onRemove(item.id)} className="btn-remove" aria-label="Remove item">×</button>
                </div>
            ))}
            <button onClick={onAdd} className="btn-add" aria-label="Add new item">+ Add {title}</button>
        </div>
    );
};

export default DynamicTable;
