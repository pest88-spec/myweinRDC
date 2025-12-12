import React, { useState, useRef } from 'react';
import { calculateTotalEarnings, calculateTotalDeductions, calculateNetPay, formatCurrency } from '../utils/calculations';

const Preview = ({ state }) => {
    const { company, bank, employee, meta, earnings, deductions } = state;
    const totalEarnings = calculateTotalEarnings(earnings);
    const totalDeductions = calculateTotalDeductions(deductions);
    const netPay = calculateNetPay(earnings, deductions);

    // Zoom state
    const [zoomLevel, setZoomLevel] = useState(100);

    // Drag state
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const handleZoomIn = () => {
        if (zoomLevel < 200) setZoomLevel(prev => prev + 25);
    };

    const handleZoomOut = () => {
        if (zoomLevel > 25) setZoomLevel(prev => prev - 25);
    };

    const handleMouseDown = (e) => {
        if (e.target.closest('.zoom-controls')) return; // Don't drag when clicking zoom controls
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    return (
        <div
            className="preview-panel"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
            {/* Zoom Controls */}
            <div className="zoom-controls">
                <button onClick={handleZoomOut} className="zoom-btn" title="Zoom Out">−</button>
                <span className="zoom-level">{zoomLevel}%</span>
                <button onClick={handleZoomIn} className="zoom-btn" title="Zoom In">+</button>
            </div>

            <div
                className="payslip-container"
                ref={containerRef}
                style={{
                    transform: `scale(${zoomLevel / 100}) translate(${position.x}px, ${position.y}px)`,
                    transformOrigin: 'top center'
                }}
            >

                {/* Header Section */}
                <header className="payslip-header-centered">
                    <h1>Payslip</h1>
                    <h2 className="company-name">{company.name.toUpperCase()}</h2>
                    <div className="company-contact">
                        {company.phone && <span>Phone: {company.phone} | </span>}
                        {company.email && <span>Email: {company.email}</span>}
                    </div>
                    <div className="company-address">
                        Address: {company.address}
                    </div>
                    <div className="company-website">
                        <a href={company.website && company.website.startsWith('http') ? company.website : `https://${company.website}`} target="_blank" rel="noreferrer">{company.website}</a>
                    </div>
                </header>

                <hr className="divider-blue" />

                {/* Info Grid Section */}
                <section className="info-grid-compact">
                    <div className="info-column">
                        <div className="info-row">
                            <span className="label">Employee name:</span>
                            <span className="value">{employee.name.toUpperCase()}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Employment status:</span>
                            <span className="value">Full time</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Award/Agreement:</span>
                            <span className="value">2024-2025 Employment Contract</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Classification:</span>
                            <span className="value">{employee.position}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Hourly rate:</span>
                            <span className="value">{formatCurrency(employee.payRate)}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Annual salary:</span>
                            <span className="value">{formatCurrency(employee.payRate * 38 * 52)}</span>
                        </div>
                    </div>

                    <div className="info-column">
                        <div className="info-row">
                            <span className="label">Pay period:</span>
                            <span className="value">{meta.payPeriodStart} to {meta.payPeriodEnd}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Pay date:</span>
                            <span className="value">{meta.payDate}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Annual leave balance:</span>
                            <span className="value">48 hours</span>
                        </div>
                        <div className="info-row">
                            <span className="label">Sick/carer's leave:</span>
                            <span className="value">40 hours</span>
                        </div>
                    </div>
                </section>

                {/* Earnings Section */}
                <section className="table-section">
                    <h3 className="section-title">Entitlements</h3>
                    <table className="payslip-table-modern">
                        <thead>
                            <tr>
                                <th className="col-desc">Description</th>
                                <th className="col-center">Hours/units</th>
                                <th className="col-right">Rate</th>
                                <th className="col-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {earnings.map(item => (
                                <tr key={item.id}>
                                    <td>{item.description}</td>
                                    <td className="col-center">{item.quantity}</td>
                                    <td className="col-right">{formatCurrency(item.rate)}</td>
                                    <td className="col-right">{formatCurrency(item.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3" className="col-desc"><strong>Total</strong></td>
                                <td className="col-right"><strong>{formatCurrency(totalEarnings)}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </section>

                {/* Deductions Section */}
                <section className="table-section">
                    <h3 className="section-title">Deductions</h3>
                    <table className="payslip-table-modern">
                        <thead>
                            <tr>
                                <th className="col-desc">Description</th>
                                <th className="col-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deductions.map(item => (
                                <tr key={item.id}>
                                    <td>{item.description}</td>
                                    <td className="col-right">{formatCurrency(item.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="col-desc"><strong>Total</strong></td>
                                <td className="col-right"><strong>{formatCurrency(totalDeductions)}</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </section>

                {/* Footer Section */}
                <section className="footer-section">
                    <div className="net-pay-row">
                        <div className="net-pay-label">
                            <strong>Net pay</strong>
                            <div className="bank-details">
                                <div className="bank-row"><span className="bank-label">Bank details:</span> <span>{bank ? bank.bankName : 'CHASE BANK'}</span></div>
                                <div className="bank-row"><span className="bank-label">Account number:</span> <span>{bank ? bank.accountNumber : '892-5647391'}</span></div>
                                <div className="bank-row"><span className="bank-label">Total net pay:</span> <span className="net-amount">{formatCurrency(netPay)}</span></div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Preview;

