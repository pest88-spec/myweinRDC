import React from 'react';
import InputGroup from './InputGroup';
import DynamicTable from './DynamicTable';
import PhotoUploader from './PhotoUploader';
import { UNIVERSITIES } from '../data/universities';

const Editor = ({ state, onChange, onArrayChange, onAdd, onRemove, companyLogo, onLogoUpload, logoInputRef, docType, photoBase64, onPhotoChange, onFetchRandom }) => {
    const { company, bank, employee, meta, earnings, deductions, teacherCard, educatorLicense } = state;

    return (
        <div className="editor-panel">
            <p className="sidebar-subtitle">Generate professional payslips and employment documents</p>

            {/* Company Logo Upload */}
            <section className="editor-section">
                <h2>Company Logo</h2>
                <div className="logo-upload-wrapper">
                    {companyLogo ? (
                        <img src={companyLogo} alt="Company Logo" className="logo-preview" />
                    ) : (
                        <div className="logo-preview" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', fontSize: '0.7rem' }}>
                            No Logo
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        ref={logoInputRef}
                        onChange={onLogoUpload}
                        style={{ display: 'none' }}
                    />
                    <button
                        className="logo-upload-btn"
                        onClick={() => logoInputRef && logoInputRef.current && logoInputRef.current.click()}
                    >
                        📤 Upload Logo
                    </button>
                </div>
            </section>

            <section className="editor-section">
                <h2>Company Details</h2>
                <InputGroup label="Company Name" value={company.name} onChange={(val) => onChange('company', 'name', val)} />
                <InputGroup label="Address" value={company.address} onChange={(val) => onChange('company', 'address', val)} />
                <InputGroup label="Phone" value={company.phone} onChange={(val) => onChange('company', 'phone', val)} />
                <InputGroup label="Email" value={company.email} onChange={(val) => onChange('company', 'email', val)} />
                <InputGroup label="Website" value={company.website || ''} onChange={(val) => onChange('company', 'website', val)} />
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
                <h2>Bank Details</h2>
                <InputGroup label="Bank Name" value={bank ? bank.bankName : ''} onChange={(val) => onChange('bank', 'bankName', val)} />
                <InputGroup label="Account Number" value={bank ? bank.accountNumber : ''} onChange={(val) => onChange('bank', 'accountNumber', val)} />
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

            {/* Teacher Card Editor - shown only when docType is teacherCard */}
            {docType === 'teacherCard' && (
                <section className="editor-section">
                    <h2>Teacher Card Details</h2>

                    {/* University dropdown */}
                    <div className="input-group">
                        <label htmlFor="teacherCard-universityId">University</label>
                        <select
                            id="teacherCard-universityId"
                            value={teacherCard?.universityId ?? ''}
                            onChange={(e) => {
                                const val = e.target.value === '' ? null : Number(e.target.value);
                                onChange('teacherCard', 'universityId', val);
                                // Reset department when university changes
                                onChange('teacherCard', 'department', '');
                            }}
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '6px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.1)',
                                color: 'inherit',
                                fontSize: '0.9rem'
                            }}
                        >
                            <option value="" style={{ color: '#333' }}>Auto (based on name hash)</option>
                            {UNIVERSITIES.map((uni, index) => (
                                <option key={index} value={index} style={{ color: '#333' }}>
                                    {uni.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Department dropdown - dynamically loaded based on selected university */}
                    <div className="input-group">
                        <label htmlFor="teacherCard-department">Department</label>
                        <select
                            id="teacherCard-department"
                            value={teacherCard?.department || ''}
                            onChange={(e) => onChange('teacherCard', 'department', e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '6px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.1)',
                                color: 'inherit',
                                fontSize: '0.9rem'
                            }}
                        >
                            <option value="" style={{ color: '#333' }}>Auto (based on name hash)</option>
                            {teacherCard?.universityId != null && UNIVERSITIES[teacherCard.universityId] &&
                                UNIVERSITIES[teacherCard.universityId].departments.map((dept, index) => (
                                    <option key={index} value={dept} style={{ color: '#333' }}>
                                        {dept}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <InputGroup
                        label="Emergency Phone"
                        value={teacherCard?.emergencyPhone || ''}
                        onChange={(val) => onChange('teacherCard', 'emergencyPhone', val)}
                    />
                    <InputGroup
                        label="Office Room"
                        value={teacherCard?.officeRoom || ''}
                        onChange={(val) => onChange('teacherCard', 'officeRoom', val)}
                    />
                    <InputGroup
                        label="Years of Service"
                        type="number"
                        value={teacherCard?.yearsOfService || ''}
                        onChange={(val) => onChange('teacherCard', 'yearsOfService', val)}
                    />
                    <InputGroup
                        label="Valid Until"
                        type="date"
                        value={teacherCard?.validUntil || ''}
                        onChange={(val) => onChange('teacherCard', 'validUntil', val)}
                    />

                    {/* Photo uploader for teacher card */}
                    <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Teacher Photo</h3>
                    <PhotoUploader
                        photoBase64={photoBase64}
                        onPhotoChange={onPhotoChange}
                        onFetchRandom={onFetchRandom}
                    />
                </section>
            )}

            {/* Photo uploader for faculty listing */}
            {docType === 'faculty' && (
                <section className="editor-section">
                    <h2>Faculty Photo</h2>
                    <PhotoUploader
                        photoBase64={photoBase64}
                        onPhotoChange={onPhotoChange}
                        onFetchRandom={onFetchRandom}
                    />
                </section>
            )}

            {/* Educator License Editor - shown only when docType is educatorLicense */}
            {docType === 'educatorLicense' && (
                <>
                    <section className="editor-section">
                        <h2>License Information</h2>
                        <InputGroup
                            label="State Name"
                            value={educatorLicense?.stateName || ''}
                            onChange={(val) => onChange('educatorLicense', 'stateName', val)}
                        />
                        <InputGroup
                            label="Department Name"
                            value={educatorLicense?.departmentName || ''}
                            onChange={(val) => onChange('educatorLicense', 'departmentName', val)}
                        />
                        <InputGroup
                            label="Certificate Number (top-right)"
                            value={educatorLicense?.certificateNumber || ''}
                            onChange={(val) => onChange('educatorLicense', 'certificateNumber', val)}
                        />
                        <InputGroup
                            label="Issued To ID"
                            value={educatorLicense?.issuedToId || ''}
                            onChange={(val) => onChange('educatorLicense', 'issuedToId', val)}
                        />
                        <InputGroup
                            label="Licensee Name"
                            value={educatorLicense?.licenseeName || ''}
                            onChange={(val) => onChange('educatorLicense', 'licenseeName', val)}
                        />
                        <InputGroup
                            label="Number"
                            value={educatorLicense?.licenseNumber || ''}
                            onChange={(val) => onChange('educatorLicense', 'licenseNumber', val)}
                        />
                        <InputGroup
                            label="Type"
                            value={educatorLicense?.licenseType || ''}
                            onChange={(val) => onChange('educatorLicense', 'licenseType', val)}
                        />
                        <InputGroup
                            label="Issued Date"
                            type="date"
                            value={educatorLicense?.issueDate || ''}
                            onChange={(val) => onChange('educatorLicense', 'issueDate', val)}
                        />
                        <InputGroup
                            label="Valid For"
                            value={educatorLicense?.validFor || ''}
                            onChange={(val) => onChange('educatorLicense', 'validFor', val)}
                        />
                        <InputGroup
                            label="Additional Information"
                            value={educatorLicense?.renewalRequirements || ''}
                            onChange={(val) => onChange('educatorLicense', 'renewalRequirements', val)}
                        />
                    </section>

                    {/* Teaching Areas and Endorsements */}
                    <section className="editor-section">
                        <h2>Teaching Areas &amp; Endorsements</h2>
                        {(educatorLicense?.teachingAreas || []).map((ta, index) => (
                            <div key={ta.id} className="teaching-area-item" style={{
                                padding: '0.75rem',
                                marginBottom: '0.5rem',
                                border: '1px solid rgba(255,255,255,0.15)',
                                borderRadius: '8px',
                                background: 'rgba(255,255,255,0.05)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Program {index + 1}</span>
                                    <button
                                        onClick={() => {
                                            const updated = educatorLicense.teachingAreas.filter(item => item.id !== ta.id);
                                            onChange('educatorLicense', 'teachingAreas', updated);
                                        }}
                                        className="btn-remove"
                                        aria-label={`Remove teaching area ${index + 1}`}
                                        style={{
                                            background: 'rgba(239,68,68,0.2)',
                                            border: 'none',
                                            color: '#ef4444',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            padding: '2px 8px',
                                            fontSize: '1rem'
                                        }}
                                    >×</button>
                                </div>
                                <InputGroup
                                    label="Completed State Approved Program In"
                                    value={ta.area}
                                    onChange={(val) => {
                                        const updated = educatorLicense.teachingAreas.map(item =>
                                            item.id === ta.id ? { ...item, area: val } : item
                                        );
                                        onChange('educatorLicense', 'teachingAreas', updated);
                                    }}
                                />
                                {/* Endorsement rows */}
                                <div style={{ marginTop: '0.5rem' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Endorsements</span>
                                    {(ta.endorsements || []).map((end, endIdx) => {
                                        const subject = typeof end === 'string' ? end : (end.subject || '');
                                        const gradeLevel = typeof end === 'object' ? (end.gradeLevel || '') : '';
                                        const date = typeof end === 'object' ? (end.date || '') : '';
                                        return (
                                            <div key={endIdx} style={{
                                                display: 'flex', gap: '4px', marginBottom: '4px', alignItems: 'center'
                                            }}>
                                                <InputGroup
                                                    label="Subject"
                                                    value={subject}
                                                    onChange={(val) => {
                                                        const updatedEndorsements = [...(ta.endorsements || [])];
                                                        updatedEndorsements[endIdx] = typeof end === 'object'
                                                            ? { ...end, subject: val }
                                                            : { subject: val, gradeLevel: '', date: '' };
                                                        const updated = educatorLicense.teachingAreas.map(item =>
                                                            item.id === ta.id ? { ...item, endorsements: updatedEndorsements } : item
                                                        );
                                                        onChange('educatorLicense', 'teachingAreas', updated);
                                                    }}
                                                />
                                                <InputGroup
                                                    label="Grade Level"
                                                    value={gradeLevel}
                                                    onChange={(val) => {
                                                        const updatedEndorsements = [...(ta.endorsements || [])];
                                                        updatedEndorsements[endIdx] = typeof end === 'object'
                                                            ? { ...end, gradeLevel: val }
                                                            : { subject: end, gradeLevel: val, date: '' };
                                                        const updated = educatorLicense.teachingAreas.map(item =>
                                                            item.id === ta.id ? { ...item, endorsements: updatedEndorsements } : item
                                                        );
                                                        onChange('educatorLicense', 'teachingAreas', updated);
                                                    }}
                                                />
                                                <InputGroup
                                                    label="Date"
                                                    type="date"
                                                    value={date}
                                                    onChange={(val) => {
                                                        const updatedEndorsements = [...(ta.endorsements || [])];
                                                        updatedEndorsements[endIdx] = typeof end === 'object'
                                                            ? { ...end, date: val }
                                                            : { subject: end, gradeLevel: '', date: val };
                                                        const updated = educatorLicense.teachingAreas.map(item =>
                                                            item.id === ta.id ? { ...item, endorsements: updatedEndorsements } : item
                                                        );
                                                        onChange('educatorLicense', 'teachingAreas', updated);
                                                    }}
                                                />
                                                <button
                                                    onClick={() => {
                                                        const updatedEndorsements = ta.endorsements.filter((_, i) => i !== endIdx);
                                                        const updated = educatorLicense.teachingAreas.map(item =>
                                                            item.id === ta.id ? { ...item, endorsements: updatedEndorsements } : item
                                                        );
                                                        onChange('educatorLicense', 'teachingAreas', updated);
                                                    }}
                                                    aria-label={`Remove endorsement ${endIdx + 1}`}
                                                    style={{
                                                        background: 'rgba(239,68,68,0.2)',
                                                        border: 'none',
                                                        color: '#ef4444',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        padding: '2px 6px',
                                                        fontSize: '0.9rem',
                                                        flexShrink: 0,
                                                    }}
                                                >×</button>
                                            </div>
                                        );
                                    })}
                                    <button
                                        onClick={() => {
                                            const newEndorsement = { subject: '', gradeLevel: '', date: '' };
                                            const updatedEndorsements = [...(ta.endorsements || []), newEndorsement];
                                            const updated = educatorLicense.teachingAreas.map(item =>
                                                item.id === ta.id ? { ...item, endorsements: updatedEndorsements } : item
                                            );
                                            onChange('educatorLicense', 'teachingAreas', updated);
                                        }}
                                        aria-label="Add endorsement"
                                        style={{
                                            width: '100%',
                                            padding: '0.3rem',
                                            marginTop: '0.25rem',
                                            background: 'rgba(59,130,246,0.15)',
                                            border: '1px dashed rgba(59,130,246,0.4)',
                                            borderRadius: '6px',
                                            color: '#60a5fa',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem'
                                        }}
                                    >+ Add Endorsement</button>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => {
                                const newArea = {
                                    id: Date.now(),
                                    area: '',
                                    endorsements: []
                                };
                                const updated = [...(educatorLicense?.teachingAreas || []), newArea];
                                onChange('educatorLicense', 'teachingAreas', updated);
                            }}
                            className="btn-add"
                            aria-label="Add teaching area"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                marginTop: '0.5rem',
                                background: 'rgba(59,130,246,0.2)',
                                border: '1px dashed rgba(59,130,246,0.5)',
                                borderRadius: '8px',
                                color: '#60a5fa',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >+ Add Teaching Area</button>
                    </section>

                    {/* Signatories editing - 3 signatories */}
                    <section className="editor-section">
                        <h2>Signatories</h2>
                        {[0, 1, 2].map((idx) => {
                            const signatory = educatorLicense?.signatories?.[idx] || { name: '', title: '' };
                            return (
                                <div key={idx} style={{
                                    padding: '0.75rem',
                                    marginBottom: '0.5rem',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    borderRadius: '8px',
                                    background: 'rgba(255,255,255,0.05)'
                                }}>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                                        Signatory {idx + 1}
                                    </span>
                                    <InputGroup
                                        label="Name"
                                        value={signatory.name}
                                        onChange={(val) => {
                                            const defaultSigs = [{ name: '', title: '' }, { name: '', title: '' }, { name: '', title: '' }];
                                            const updatedSignatories = [...(educatorLicense?.signatories || defaultSigs)];
                                            while (updatedSignatories.length <= idx) updatedSignatories.push({ name: '', title: '' });
                                            updatedSignatories[idx] = { ...updatedSignatories[idx], name: val };
                                            onChange('educatorLicense', 'signatories', updatedSignatories);
                                        }}
                                    />
                                    <InputGroup
                                        label="Title"
                                        value={signatory.title}
                                        onChange={(val) => {
                                            const defaultSigs = [{ name: '', title: '' }, { name: '', title: '' }, { name: '', title: '' }];
                                            const updatedSignatories = [...(educatorLicense?.signatories || defaultSigs)];
                                            while (updatedSignatories.length <= idx) updatedSignatories.push({ name: '', title: '' });
                                            updatedSignatories[idx] = { ...updatedSignatories[idx], title: val };
                                            onChange('educatorLicense', 'signatories', updatedSignatories);
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </section>
                </>
            )}

            {/* Employment Letter Editor - shown only when docType is employment */}
            {docType === 'employment' && (
                <section className="editor-section">
                    <h2>Employment Letter Details</h2>
                    <InputGroup
                        label="Employment Status"
                        value={employee.employmentStatus || ''}
                        onChange={(val) => onChange('employee', 'employmentStatus', val)}
                    />
                    <InputGroup
                        label="Telecommute"
                        value={employee.telecommute || ''}
                        onChange={(val) => onChange('employee', 'telecommute', val)}
                    />
                    <InputGroup
                        label="Federal Tax Status"
                        value={employee.federalTaxStatus || ''}
                        onChange={(val) => onChange('employee', 'federalTaxStatus', val)}
                    />
                    <InputGroup
                        label="Last 4 SSN"
                        value={employee.lastFourSSN || ''}
                        onChange={(val) => onChange('employee', 'lastFourSSN', val)}
                    />
                    <InputGroup
                        label="Grade Level"
                        value={employee.gradeLevel || ''}
                        onChange={(val) => onChange('employee', 'gradeLevel', val)}
                    />
                    <InputGroup
                        label="Subjects"
                        value={employee.subjects || ''}
                        onChange={(val) => onChange('employee', 'subjects', val)}
                    />
                    <InputGroup
                        label="Signatory Name"
                        value={employee.signatoryName || ''}
                        onChange={(val) => onChange('employee', 'signatoryName', val)}
                    />
                    <InputGroup
                        label="Signatory Title"
                        value={employee.signatoryTitle || ''}
                        onChange={(val) => onChange('employee', 'signatoryTitle', val)}
                    />
                </section>
            )}

            {/* Footer Links */}
            <div style={{ marginTop: '2rem', textAlign: 'center', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <a href="https://github.com/ThanhNguyxn/payslip-generator" target="_blank" rel="noopener noreferrer" style={{ color: '#888', fontSize: '0.75rem', textDecoration: 'none', marginRight: '1rem' }}>
                    ⭐ GitHub
                </a>
                <a href="https://buymeacoffee.com/thanhnguyxn" target="_blank" rel="noopener noreferrer" style={{ color: '#888', fontSize: '0.75rem', textDecoration: 'none' }}>
                    ☕ Buy Me a Coffee
                </a>
            </div>
        </div>
    );
};

export default Editor;
