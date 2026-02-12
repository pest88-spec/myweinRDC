import React from 'react';
import { formatCurrency } from '../../utils/calculations';

/**
 * Standalone renderer for the Offer of Employment letter document type.
 * Extracted from Preview.jsx renderOfferLetter() to improve maintainability.
 *
 * Renders a formal job offer letter with company letterhead, position details,
 * compensation information, and dual signature blocks.
 *
 * @param {Object} props
 * @param {Object} props.state - Complete application state
 * @param {string} [props.companyLogo] - Base64 encoded company logo
 */
const OfferLetterRenderer = ({ state, companyLogo }) => {
  const { company, employee, meta } = state;

  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <header style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          {companyLogo && <img src={companyLogo} alt="Logo" className="company-logo" style={{ marginRight: '20px' }} />}
          <div>
            <h2 style={{ margin: 0, color: '#0f4c81' }}>{company.name.toUpperCase()}</h2>
            <div style={{ fontSize: '0.85rem', color: '#555' }}>{company.address}</div>
          </div>
        </div>
      </header>

      <div style={{ textAlign: 'right', marginBottom: '30px', fontSize: '0.9rem' }}>
        Date: {today}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <strong>{employee.name}</strong><br />
        {employee.address}
      </div>

      <h1 style={{ textAlign: 'center', fontSize: '1.3rem', marginBottom: '30px', color: '#0f4c81' }}>
        OFFER OF EMPLOYMENT
      </h1>

      <div style={{ lineHeight: 1.8, fontSize: '0.95rem' }}>
        <p>Dear {employee.name},</p>

        <p style={{ marginTop: '20px' }}>
          We are pleased to offer you the position of <strong>{employee.position}</strong> at <strong>{company.name}</strong>.
          We believe your skills and experience will be a valuable asset to our team.
        </p>

        <p style={{ marginTop: '20px' }}><strong>Position Details:</strong></p>
        <ul style={{ marginLeft: '20px' }}>
          <li><strong>Title:</strong> {employee.position}</li>
          <li><strong>Start Date:</strong> {meta.payPeriodStart}</li>
          <li><strong>Compensation:</strong> {formatCurrency(employee.payRate * 38 * 52)} per year ({formatCurrency(employee.payRate)}/hour)</li>
          <li><strong>Employment Type:</strong> Full-time</li>
          <li><strong>Benefits:</strong> Health insurance, 401(k), Paid time off</li>
        </ul>

        <p style={{ marginTop: '20px' }}>
          This offer is contingent upon successful completion of a background check and reference verification.
        </p>

        <p style={{ marginTop: '20px' }}>
          Please sign and return this letter within <strong>7 business days</strong> to confirm your acceptance.
        </p>

        <p style={{ marginTop: '40px' }}>We look forward to welcoming you to our team!</p>

        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ borderTop: '1px solid #333', width: '200px', paddingTop: '5px', marginTop: '50px' }}>
              <strong>HR Manager</strong><br />
              {company.name}
            </div>
          </div>
          <div>
            <div style={{ borderTop: '1px solid #333', width: '200px', paddingTop: '5px', marginTop: '50px' }}>
              <strong>Acceptance Signature</strong><br />
              {employee.name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferLetterRenderer;
