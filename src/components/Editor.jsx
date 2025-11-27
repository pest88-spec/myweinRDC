import React from 'react';
import InputGroup from './InputGroup';
import DynamicTable from './DynamicTable';

const Editor = ({ state, onChange, onArrayChange, onAdd, onRemove }) => {
    const { company, employee, meta, earnings, deductions } = state;

    return (
        <div className="editor-panel">
            <section className="editor-section">
                <h2>Company Details</h2>
                <InputGroup label="Company Name" value={company.name} onChange={(val) => onChange('company', 'name', val)} />
                <InputGroup label="Address" value={company.address} onChange={(val) => onChange('company', 'address', val)} />
                <InputGroup label="Phone" value={company.phone} onChange={(val) => onChange('company', 'phone', val)} />
                <InputGroup label="Email" value={company.email} onChange={(val) => onChange('company', 'email', val)} />
            </section>

            <section className="editor-section">
                <h2>Employee Details</h2>
                <InputGroup label="Full Name" value={employee.name} onChange={(val) => onChange('employee', 'name', val)} />
                <InputGroup label="Address" value={employee.address} onChange={(val) => onChange('employee', 'address', val)} />
                <InputGroup label="Position" value={employee.position} onChange={(val) => onChange('employee', 'position', val)} />
                <InputGroup label="Employee ID" value={employee.employeeId} onChange={(val) => onChange('employee', 'employeeId', val)} />
                <InputGroup label="Tax Code" value={employee.taxCode} onChange={(val) => onChange('employee', 'taxCode', val)} />
                <InputGroup label="Hourly Rate" type="number" value={employee.payRate} onChange={(val) => onChange('employee', 'payRate', val)} />
            </section>

            <section className="editor-section">
                <h2>Pay Period</h2>
                <InputGroup label="Pay Date" type="date" value={meta.payDate} onChange={(val) => onChange('meta', 'payDate', val)} />
                <InputGroup label="Start Date" type="date" value={meta.payPeriodStart} onChange={(val) => onChange('meta', 'payPeriodStart', val)} />
                <InputGroup label="End Date" type="date" value={meta.payPeriodEnd} onChange={(val) => onChange('meta', 'payPeriodEnd', val)} />
            </section>

            <section className="editor-section">
                <DynamicTable
                    title="Earnings"
                    items={earnings}
                    onUpdate={(id, field, val) => onArrayChange('earnings', id, field, val)}
                    onAdd={() => onAdd('earnings', { id: Date.now(), description: "New Item", quantity: 1, rate: 0, amount: 0 })}
                    onRemove={(id) => onRemove('earnings', id)}
                    columns={[
                        { key: 'description', label: 'Description' },
                        { key: 'quantity', label: 'Hours/Units', type: 'number' },
                        { key: 'rate', label: 'Rate', type: 'number' },
                        { key: 'amount', label: 'Amount', type: 'number' }
                    ]}
                />
            </section>

            <section className="editor-section">
                <DynamicTable
                    title="Deductions"
                    items={deductions}
                    onUpdate={(id, field, val) => onArrayChange('deductions', id, field, val)}
                    onAdd={() => onAdd('deductions', { id: Date.now(), description: "New Deduction", amount: 0 })}
                    onRemove={(id) => onRemove('deductions', id)}
                    columns={[
                        { key: 'description', label: 'Description' },
                        { key: 'amount', label: 'Amount', type: 'number' }
                    ]}
                />
            </section>
        </div>
    );
};

export default Editor;
