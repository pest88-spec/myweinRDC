import React from 'react';

/**
 * Shared document header component that renders company branding information.
 * Supports two layout modes:
 * - Centered: Logo, title, subtitle, and address stacked vertically (used by Tax Form, W-2)
 * - Left-aligned: Logo on the left with company info beside it (used by Employment Letter, Offer Letter)
 *
 * @param {Object} props
 * @param {Object} props.company - Company data object with name, address, phone, email
 * @param {string} [props.companyLogo] - Base64 encoded company logo image
 * @param {string} [props.title] - Document title (displayed as h1, primarily for centered layout)
 * @param {string} [props.subtitle] - Subtitle text (displayed as h2 with company-name class in centered layout)
 * @param {boolean} [props.centered=true] - Whether to use centered layout (true) or left-aligned layout (false)
 * @param {boolean} [props.showContactInfo=false] - Whether to display phone and email in left-aligned layout
 */
const DocumentHeader = ({ company, companyLogo, title, subtitle, centered = true, showContactInfo = false }) => {
  if (centered) {
    return (
      <header className="payslip-header-centered">
        {companyLogo && <img src={companyLogo} alt="Company logo" className="company-logo" />}
        {title && <h1>{title}</h1>}
        {subtitle && <h2 className="company-name">{subtitle}</h2>}
        <div className="company-address">{company.address}</div>
      </header>
    );
  }

  // Left-aligned layout: logo on the left, company info on the right
  return (
    <header style={{ marginBottom: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        {companyLogo && (
          <img
            src={companyLogo}
            alt="Company logo"
            className="company-logo"
            style={{ marginRight: '20px' }}
          />
        )}
        <div>
          <h2 style={{ margin: 0, color: '#0f4c81' }}>{company.name.toUpperCase()}</h2>
          <div style={{ fontSize: '0.85rem', color: '#555' }}>{company.address}</div>
          {showContactInfo && company.phone && company.email && (
            <div style={{ fontSize: '0.85rem', color: '#555' }}>
              Phone: {company.phone} | Email: {company.email}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DocumentHeader;
