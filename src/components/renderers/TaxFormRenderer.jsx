import React from 'react';
import { calculateTotalEarnings, formatCurrency } from '../../utils/calculations';

/**
 * Standalone renderer for the Tax Withholding Statement document type.
 * Extracted from Preview.jsx renderTaxForm() to improve maintainability.
 *
 * Displays employer/employee information and a year-to-date tax summary
 * with calculated federal, state, social security, and medicare withholdings.
 *
 * @param {Object} props
 * @param {Object} props.state - Complete application state
 * @param {string} [props.companyLogo] - Base64 encoded company logo
 */
const TaxFormRenderer = ({ state, companyLogo }) => {
  const { company, employee, earnings } = state;

  const totalEarnings = calculateTotalEarnings(earnings);
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <header className="payslip-header-centered">
        {companyLogo && <img src={companyLogo} alt="Logo" className="company-logo" />}
        <h1 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>TAX WITHHOLDING STATEMENT</h1>
        <h2 className="company-name">{company.name.toUpperCase()}</h2>
        <div className="company-address">Address: {company.address}</div>
      </header>

      <hr className="divider-blue" />

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ background: '#d1d5db', padding: '8px 12px', margin: '0 0 15px 0', fontSize: '1rem' }}>EMPLOYER INFORMATION</h3>
        <div className="info-row"><span className="label">Employer Name:</span><span className="value">{company.name}</span></div>
        <div className="info-row"><span className="label">Employer ID (EIN):</span><span className="value">XX-XXXXXXX</span></div>
        <div className="info-row"><span className="label">Address:</span><span className="value">{company.address}</span></div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ background: '#d1d5db', padding: '8px 12px', margin: '0 0 15px 0', fontSize: '1rem' }}>EMPLOYEE INFORMATION</h3>
        <div className="info-row"><span className="label">Employee Name:</span><span className="value">{employee.name}</span></div>
        <div className="info-row"><span className="label">Employee ID:</span><span className="value">{employee.employeeId}</span></div>
        <div className="info-row"><span className="label">Tax Code:</span><span className="value">{employee.taxCode}</span></div>
        <div className="info-row"><span className="label">Address:</span><span className="value">{employee.address}</span></div>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h3 style={{ background: '#d1d5db', padding: '8px 12px', margin: '0 0 15px 0', fontSize: '1rem' }}>TAX SUMMARY - YEAR TO DATE</h3>
        <table className="payslip-table-modern">
          <thead><tr><th>Description</th><th className="col-right">Amount</th></tr></thead>
          <tbody>
            <tr><td>Gross Wages</td><td className="col-right">{formatCurrency(totalEarnings * 12)}</td></tr>
            <tr><td>Federal Income Tax Withheld</td><td className="col-right">{formatCurrency(totalEarnings * 12 * 0.22)}</td></tr>
            <tr><td>State Income Tax Withheld</td><td className="col-right">{formatCurrency(totalEarnings * 12 * 0.05)}</td></tr>
            <tr><td>Social Security Tax</td><td className="col-right">{formatCurrency(totalEarnings * 12 * 0.062)}</td></tr>
            <tr><td>Medicare Tax</td><td className="col-right">{formatCurrency(totalEarnings * 12 * 0.0145)}</td></tr>
          </tbody>
          <tfoot>
            <tr><td><strong>Total Tax Withheld</strong></td><td className="col-right"><strong>{formatCurrency(totalEarnings * 12 * 0.3565)}</strong></td></tr>
          </tfoot>
        </table>
      </section>

      <div style={{ marginTop: '50px', fontSize: '0.8rem', color: '#666' }}>
        <p>This statement is provided for informational purposes. Please consult a tax professional for advice.</p>
        <p style={{ marginTop: '10px' }}>Generated on: {today}</p>
      </div>
    </>
  );
};

export default TaxFormRenderer;
