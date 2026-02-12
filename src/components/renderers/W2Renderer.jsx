import React from 'react';
import { calculateTotalEarnings, formatCurrency } from '../../utils/calculations';

/**
 * Standalone renderer for the W-2 Wage and Tax Statement document type.
 * Extracted from Preview.jsx renderW2() to improve maintainability.
 *
 * Renders a W-2 form layout with employer/employee identification,
 * and standard wage/tax boxes (1-6) with calculated amounts.
 *
 * @param {Object} props
 * @param {Object} props.state - Complete application state
 * @param {string} [props.companyLogo] - Base64 encoded company logo
 */
const W2Renderer = ({ state, companyLogo }) => {
  const { company, employee, earnings } = state;

  const totalEarnings = calculateTotalEarnings(earnings);

  return (
    <>
      <header className="payslip-header-centered">
        {companyLogo && <img src={companyLogo} alt="Logo" className="company-logo" />}
        <h1 style={{ fontSize: '1.5rem', color: '#0f4c81' }}>Form W-2 Wage and Tax Statement</h1>
        <p style={{ fontSize: '0.8rem', color: '#666' }}>Copy B — To Be Filed With Employee's FEDERAL Tax Return</p>
      </header>

      <hr className="divider-blue" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{ border: '1px solid #ccc', padding: '15px' }}>
          <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '5px' }}>a. Employee's social security number</div>
          <div style={{ fontWeight: 'bold' }}>XXX-XX-{employee.employeeId?.slice(-4) || '1234'}</div>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px' }}>
          <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '5px' }}>b. Employer identification number (EIN)</div>
          <div style={{ fontWeight: 'bold' }}>XX-XXXXXXX</div>
        </div>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
        <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '5px' }}>c. Employer's name, address, and ZIP code</div>
        <div style={{ fontWeight: 'bold' }}>{company.name}</div>
        <div>{company.address}</div>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
        <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '5px' }}>e. Employee's name, address, and ZIP code</div>
        <div style={{ fontWeight: 'bold' }}>{employee.name}</div>
        <div>{employee.address}</div>
      </div>

      <table className="payslip-table-modern" style={{ marginBottom: '20px' }}>
        <thead><tr><th>Box</th><th>Description</th><th className="col-right">Amount</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Wages, tips, other compensation</td><td className="col-right">{formatCurrency(totalEarnings * 12)}</td></tr>
          <tr><td>2</td><td>Federal income tax withheld</td><td className="col-right">{formatCurrency(totalEarnings * 12 * 0.22)}</td></tr>
          <tr><td>3</td><td>Social security wages</td><td className="col-right">{formatCurrency(totalEarnings * 12)}</td></tr>
          <tr><td>4</td><td>Social security tax withheld</td><td className="col-right">{formatCurrency(totalEarnings * 12 * 0.062)}</td></tr>
          <tr><td>5</td><td>Medicare wages and tips</td><td className="col-right">{formatCurrency(totalEarnings * 12)}</td></tr>
          <tr><td>6</td><td>Medicare tax withheld</td><td className="col-right">{formatCurrency(totalEarnings * 12 * 0.0145)}</td></tr>
        </tbody>
      </table>

      <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '30px' }}>
        <p>This information is being furnished to the Internal Revenue Service.</p>
        <p style={{ marginTop: '10px' }}>Tax Year: {new Date().getFullYear()}</p>
      </div>
    </>
  );
};

export default W2Renderer;
