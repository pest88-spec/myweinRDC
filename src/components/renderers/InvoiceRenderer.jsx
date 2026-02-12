import React from 'react';
import { calculateTotalEarnings, formatCurrency } from '../../utils/calculations';

/**
 * Standalone renderer for the Contractor Invoice document type.
 * Extracted from Preview.jsx renderInvoice() to improve maintainability.
 *
 * This renderer always operates in "contractor" mode, using contractor-specific
 * labels (e.g. "Contractor" instead of "Employee", "INVOICE" as title).
 *
 * @param {Object} props
 * @param {Object} props.state - Complete application state
 * @param {string} [props.companyLogo] - Base64 encoded company logo
 */
const InvoiceRenderer = ({ state, companyLogo }) => {
  const { company, bank, employee, meta, earnings } = state;

  const totalEarnings = calculateTotalEarnings(earnings);
  const totalAmount = totalEarnings;

  // Invoice always uses contractor mode labels
  const isContractor = true;
  const personLabel = isContractor ? 'Contractor' : 'Employee';
  const docTitle = isContractor ? 'INVOICE' : 'SALARY WARRANT';
  const statusLabel = isContractor ? 'Contract Type' : 'Employment Status';
  const statusValue = isContractor ? 'Independent Contractor' : 'Full Time';

  // Generate invoice number from employee ID and pay date
  const invoiceNumber = `INV-${(employee.employeeId || '').replace(/\D/g, '').slice(-6).padStart(6, '0')}-${meta.payDate?.replace(/-/g, '') || '00000000'}`;

  return (
    <>
      {/* Header */}
      <header className="payslip-header-centered" style={{ borderBottom: '2px solid #0f4c81', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            {companyLogo && <img src={companyLogo} alt="Logo" className="company-logo" />}
            <div style={{ fontWeight: 'bold', fontSize: '1.4rem', color: '#0f4c81' }}>{company.name}</div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>{company.address}</div>
            <div style={{ fontSize: '0.85rem', color: '#666' }}>{company.phone} | {company.email}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0f4c81' }}>{docTitle}</div>
            <div style={{ fontSize: '0.9rem', marginTop: '10px' }}>
              <strong>Invoice #:</strong> {invoiceNumber}
            </div>
            <div style={{ fontSize: '0.9rem' }}>
              <strong>Date:</strong> {meta.payDate}
            </div>
          </div>
        </div>
      </header>

      {/* Bill To */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', margin: '25px 0' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>Bill To</div>
          <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{employee.name}</div>
          <div style={{ fontSize: '0.9rem', color: '#555' }}>{employee.address}</div>
          <div style={{ fontSize: '0.9rem', color: '#555' }}>{employee.cityStateZip}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>{personLabel} Details</div>
          <div style={{ fontSize: '0.9rem' }}><strong>ID:</strong> {employee.employeeId}</div>
          <div style={{ fontSize: '0.9rem' }}><strong>{statusLabel}:</strong> {statusValue}</div>
          <div style={{ fontSize: '0.9rem' }}><strong>Service Period:</strong> {meta.payPeriodStart} - {meta.payPeriodEnd}</div>
        </div>
      </section>

      {/* Services Table */}
      <section style={{ marginBottom: '30px' }}>
        <table className="payslip-table-modern">
          <thead>
            <tr style={{ background: '#0f4c81', color: '#fff' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Hours/Qty</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Rate</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {earnings.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{item.description}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>{item.quantity || 1}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>{formatCurrency(item.rate)}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>{formatCurrency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Summary */}
      <section style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
        <div style={{ width: '300px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <span>Subtotal:</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <span>Tax (0%):</span>
            <span>{formatCurrency(0)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: '1.2rem', fontWeight: 'bold', background: '#f5f5f5', marginTop: '8px' }}>
            <span style={{ paddingLeft: '10px' }}>Total Due:</span>
            <span style={{ paddingRight: '10px', color: '#0f4c81' }}>{formatCurrency(totalAmount)}</span>
          </div>
        </div>
      </section>

      {/* Payment Info */}
      <section style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Payment Information</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '0.9rem' }}>
          <div><strong>Bank:</strong> {bank?.bankName || 'Chase Bank'}</div>
          <div><strong>Account:</strong> {bank?.accountNumber || '****9921'}</div>
          <div><strong>Routing:</strong> {bank?.routingNumber || '021000021'}</div>
          <div><strong>Due Date:</strong> Net 30</div>
        </div>
      </section>

      {/* Footer */}
      <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#888', borderTop: '1px solid #eee', paddingTop: '20px' }}>
        <p>Thank you for your business!</p>
        <p>{company.name} • {company.address} • {company.phone}</p>
      </div>
    </>
  );
};

export default InvoiceRenderer;
