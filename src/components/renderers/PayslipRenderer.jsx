import React from 'react';
import { calculateTotalEarnings, calculateNetPay, formatCurrency } from '../../utils/calculations';

/**
 * Standalone renderer for the Salary Warrant (payslip) document type.
 * Extracted from Preview.jsx renderPayslip() to improve maintainability.
 *
 * All currency values are formatted via the shared formatCurrency utility,
 * replacing previous hardcoded `$` + toLocaleString patterns.
 *
 * @param {Object} props
 * @param {Object} props.state - Complete application state
 * @param {string} [props.companyLogo] - Base64 encoded company logo (unused in payslip header but kept for interface consistency)
 */
const PayslipRenderer = ({ state, companyLogo }) => {
  const {
    company,
    bank,
    employee,
    meta,
    earnings,
    deductions,
    taxes,
    preTaxReductions,
    employerContributions,
    taxableWages,
    checkInfo,
  } = state;

  const totalEarnings = calculateTotalEarnings(earnings);
  const netPay = checkInfo?.netPay || calculateNetPay(earnings, deductions);

  // Calculate totals from arrays
  const totalTaxes = (taxes || []).reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalPreTax = (preTaxReductions || []).reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalOtherDed = (deductions || []).reduce((sum, t) => sum + (t.amount || 0), 0);

  return (
    <>
      {/* Header - Salary Warrant Style */}
      <header className="payslip-header-centered" style={{ borderBottom: '2px solid #000', paddingBottom: '15px' }}>
        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.3rem', letterSpacing: '1px' }}>SALARY WARRANT</div>
        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', marginTop: '5px' }}>CERTIFICATED</div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <div style={{ fontSize: '0.9rem' }}>{company.county || 'District County'}</div>
          <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{company.district || company.name}</div>
          <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{company.name}</div>
        </div>
      </header>

      {/* Employee Info + Pay Period Info */}
      <section style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <div className="info-row"><span className="label">EMPLOYEE:</span> <span className="value">{employee.name}</span></div>
          <div className="info-row"><span className="label">ID:</span> <span className="value">{employee.employeeId}</span></div>
          <div className="info-row"><span className="label">POSITION:</span> <span className="value">{employee.position}</span></div>
        </div>
        <div style={{ minWidth: '220px' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.85rem' }}>
            <tbody>
              <tr><td style={{ border: '1px solid #000', padding: '4px 8px', fontWeight: 'bold' }}>PAY LOCATION</td><td style={{ border: '1px solid #000', padding: '4px 8px' }}>{meta.payLocation || '050'}</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '4px 8px', fontWeight: 'bold' }}>PAY CYCLE</td><td style={{ border: '1px solid #000', padding: '4px 8px' }}>{meta.payCycle || 'C1B'}</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '4px 8px', fontWeight: 'bold' }}>ISSUE DATE</td><td style={{ border: '1px solid #000', padding: '4px 8px' }}>{meta.payDate}</td></tr>
              <tr><td style={{ border: '1px solid #000', padding: '4px 8px', fontWeight: 'bold' }}>ADVICE NUMBER</td><td style={{ border: '1px solid #000', padding: '4px 8px' }}>{meta.adviceNumber || '1234567'}</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Tax Status Row */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <table className="payslip-table-modern" style={{ fontSize: '0.85rem' }}>
          <tbody>
            <tr><td style={{ fontWeight: 'bold', border: '1px solid #000', padding: '4px 8px' }}>EMPLOYEE NAME</td><td style={{ border: '1px solid #000', padding: '4px 8px' }}>{employee.name}</td></tr>
            <tr><td style={{ fontWeight: 'bold', border: '1px solid #000', padding: '4px 8px' }}>EMPLOYEE ID</td><td style={{ border: '1px solid #000', padding: '4px 8px' }}>{employee.employeeId}</td></tr>
          </tbody>
        </table>
        <table className="payslip-table-modern" style={{ fontSize: '0.85rem' }}>
          <tbody>
            <tr><td style={{ fontWeight: 'bold', border: '1px solid #000', padding: '4px 8px' }}>FEDERAL ALLOWANCES</td><td style={{ border: '1px solid #000', padding: '4px 8px' }}>{employee.taxCode || 'M-03'}</td></tr>
            <tr><td style={{ fontWeight: 'bold', border: '1px solid #000', padding: '4px 8px' }}>STATE ALLOWANCES</td><td style={{ border: '1px solid #000', padding: '4px 8px' }}>{employee.taxCode || 'M-03'}</td></tr>
          </tbody>
        </table>
      </section>

      {/* Main Content: Left=Earnings+Deductions, Right=Employer Contributions */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '20px' }}>
        {/* LEFT SIDE */}
        <div>
          {/* Earnings */}
          <h3 style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', margin: '10px 0 5px' }}>EARNINGS - COMPENSATION</h3>
          <table className="payslip-table-modern" style={{ fontSize: '0.8rem' }}>
            <thead><tr><th>DESCRIPTION</th><th>END DATE</th><th>RATE</th><th className="col-right">AMOUNT</th><th className="col-right">YTD</th></tr></thead>
            <tbody>
              {earnings.map(item => (
                <tr key={item.id}><td>{item.description}</td><td>{meta.payPeriodEnd}</td><td>{formatCurrency(item.rate)}</td><td className="col-right">{formatCurrency(item.amount)}</td><td className="col-right">{formatCurrency(item.ytd || item.amount * 12)}</td></tr>
              ))}
            </tbody>
          </table>

          {/* Pre-Tax Reductions */}
          {preTaxReductions && preTaxReductions.length > 0 && (
            <>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', margin: '15px 0 5px' }}>PRE-TAX REDUCTIONS</h3>
              <table className="payslip-table-modern" style={{ fontSize: '0.8rem' }}>
                <thead><tr><th>DESCRIPTION</th><th className="col-right">CURRENT</th><th className="col-right">YTD</th></tr></thead>
                <tbody>
                  {preTaxReductions.map(item => (
                    <tr key={item.id}><td>{item.description}</td><td className="col-right">{formatCurrency(item.amount)}</td><td className="col-right">{formatCurrency(item.ytd)}</td></tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* Taxes */}
          {taxes && taxes.length > 0 && (
            <>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', margin: '15px 0 5px' }}>EMPLOYEE DEDUCTIONS (TAXES)</h3>
              <table className="payslip-table-modern" style={{ fontSize: '0.8rem' }}>
                <thead><tr><th>DESCRIPTION</th><th className="col-right">CURRENT</th><th className="col-right">YTD</th></tr></thead>
                <tbody>
                  {taxes.map(item => (
                    <tr key={item.id}><td>{item.description}</td><td className="col-right">{formatCurrency(item.amount)}</td><td className="col-right">{formatCurrency(item.ytd)}</td></tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* Other Deductions */}
          {deductions && deductions.length > 0 && (
            <>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', margin: '15px 0 5px' }}>OTHER DEDUCTIONS</h3>
              <table className="payslip-table-modern" style={{ fontSize: '0.8rem' }}>
                <thead><tr><th>DESCRIPTION</th><th className="col-right">CURRENT</th><th className="col-right">YTD</th></tr></thead>
                <tbody>
                  {deductions.map(item => (
                    <tr key={item.id}><td>{item.description}</td><td className="col-right">{formatCurrency(item.amount)}</td><td className="col-right">{formatCurrency(item.ytd)}</td></tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div>
          {/* Employer Contributions */}
          {employerContributions && employerContributions.length > 0 && (
            <>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', margin: '10px 0 5px' }}>EMPLOYER CONTRIBUTIONS</h3>
              <table className="payslip-table-modern" style={{ fontSize: '0.8rem' }}>
                <thead><tr><th>DESCRIPTION</th><th className="col-right">CURRENT</th><th className="col-right">YTD</th></tr></thead>
                <tbody>
                  {employerContributions.map(item => (
                    <tr key={item.id}><td>{item.description}</td><td className="col-right">{formatCurrency(item.amount)}</td><td className="col-right">{formatCurrency(item.ytd)}</td></tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* Taxable Wages */}
          {taxableWages && (
            <>
              <h3 style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', margin: '15px 0 5px' }}>CURRENT TAXABLE BALANCES</h3>
              <table className="payslip-table-modern" style={{ fontSize: '0.8rem' }}>
                <thead><tr><th>TYPE</th><th className="col-right">CURRENT</th><th className="col-right">YTD</th></tr></thead>
                <tbody>
                  <tr><td>FEDERAL</td><td className="col-right">{formatCurrency(taxableWages.federal?.current)}</td><td className="col-right">{formatCurrency(taxableWages.federal?.ytd)}</td></tr>
                  <tr><td>STATE</td><td className="col-right">{formatCurrency(taxableWages.state?.current)}</td><td className="col-right">{formatCurrency(taxableWages.state?.ytd)}</td></tr>
                  <tr><td>MEDICARE GROSS</td><td className="col-right">{formatCurrency(taxableWages.medicare?.current)}</td><td className="col-right">{formatCurrency(taxableWages.medicare?.ytd)}</td></tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </section>

      {/* Bottom Summary + Check Area */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '20px', marginTop: '20px' }}>
        {/* Summary Box */}
        <table className="payslip-table-modern" style={{ fontSize: '0.85rem' }}>
          <tbody>
            <tr><td style={{ fontWeight: 'bold', border: '1px solid #000', padding: '4px 8px' }}>GROSS PAY</td><td style={{ border: '1px solid #000', padding: '4px 8px', textAlign: 'right' }}>{formatCurrency(totalEarnings)}</td></tr>
            <tr><td style={{ fontWeight: 'bold', border: '1px solid #000', padding: '4px 8px' }}>REDUCTIONS</td><td style={{ border: '1px solid #000', padding: '4px 8px', textAlign: 'right' }}>{formatCurrency(totalPreTax)}</td></tr>
            <tr><td style={{ fontWeight: 'bold', border: '1px solid #000', padding: '4px 8px' }}>TAXES</td><td style={{ border: '1px solid #000', padding: '4px 8px', textAlign: 'right' }}>{formatCurrency(totalTaxes)}</td></tr>
            <tr><td style={{ fontWeight: 'bold', border: '1px solid #000', padding: '4px 8px' }}>DEDUCTIONS</td><td style={{ border: '1px solid #000', padding: '4px 8px', textAlign: 'right' }}>{formatCurrency(totalOtherDed)}</td></tr>
            <tr><td style={{ fontWeight: 'bold', border: '1px solid #000', padding: '4px 8px' }}>GROSS YTD</td><td style={{ border: '1px solid #000', padding: '4px 8px', textAlign: 'right' }}>{formatCurrency(earnings[0]?.ytd || totalEarnings * 12)}</td></tr>
            <tr style={{ background: '#f0f0f0' }}><td style={{ fontWeight: 'bold', border: '1px solid #000', padding: '4px 8px' }}>NET PAY</td><td style={{ border: '1px solid #000', padding: '4px 8px', textAlign: 'right', fontWeight: 'bold', fontSize: '1rem' }}>{formatCurrency(checkInfo?.netPay || netPay)}</td></tr>
          </tbody>
        </table>

        {/* Check Area */}
        <div style={{ border: '1px solid #000', padding: '12px', fontSize: '0.85rem' }}>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: 'bold' }}>{company.district || company.name}</span> – {company.name}<br />
            NO. {meta.adviceNumber || '1234567'}&nbsp;&nbsp;&nbsp;Date Issued: {meta.payDate}
          </div>
          <div style={{ marginBottom: '10px' }}>THE TREASURER OF {(company.county || 'COUNTY').toUpperCase()} will pay exactly:</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span>AMOUNT</span>
            <div style={{ border: '1px solid #000', padding: '5px 12px', fontWeight: 'bold', minWidth: '110px', textAlign: 'right' }}>
              {formatCurrency(checkInfo?.netPay || netPay)}
            </div>
          </div>
          <div style={{ fontSize: '0.8rem', marginBottom: '10px' }}>{checkInfo?.netPayWords || 'Amount in words'}</div>
          <div style={{ fontSize: '0.75rem', color: '#666' }}>NOT VALID FOR MORE THAN {formatCurrency(checkInfo?.maxValidAmount || 24999.99)}</div>
          <div style={{ marginTop: '10px', fontSize: '0.8rem' }}>
            <strong>WILL PAY TO:</strong> {employee.name}<br />
            <strong>BANK:</strong> {bank?.bankName || 'Chase Bank'} ({bank?.accountNumber || '****9921'})<br />
            <strong>ACCRUAL DATE:</strong> {meta.accrualDate || meta.payDate}
          </div>
        </div>
      </section>

      {/* Footer - School Address */}
      <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px dashed #000', fontSize: '0.8rem' }}>
        <strong>School Address:</strong> {company.name}, {company.address}
      </div>
    </>
  );
};

export default PayslipRenderer;
