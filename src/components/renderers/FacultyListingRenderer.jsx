import React from 'react';

/**
 * Standalone renderer for the Faculty Listing (school website screenshot) document type.
 * Extracted from Preview.jsx renderFacultyListing() to improve maintainability.
 *
 * Renders a simulated school website faculty directory page, complete with
 * browser chrome, navigation, search bar, and a faculty profile card.
 *
 * @param {Object} props
 * @param {Object} props.state - Complete application state
 * @param {string} [props.companyLogo] - Base64 encoded company logo
 * @param {string} [props.photoBase64] - Base64 encoded faculty photo
 */
const FacultyListingRenderer = ({ state, companyLogo, photoBase64 }) => {
  const { company, employee } = state;

  return (
    <>
      {/* Browser Chrome */}
      <div style={{
        background: 'linear-gradient(180deg, #dee1e6 0%, #c8ccd3 100%)',
        borderRadius: '8px 8px 0 0',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca3f' }}></div>
        </div>
        <div style={{
          flex: 1,
          background: 'white',
          borderRadius: '4px',
          padding: '6px 12px',
          fontSize: '0.75rem',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ color: '#5a5a5a' }}>🔒</span>
          <span>https://www.{company.name?.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu/faculty/directory</span>
        </div>
      </div>

      {/* Website Content */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '0 0 8px 8px', border: '1px solid #ddd', borderTop: 'none' }}>
        {/* School Header */}
        <div style={{ borderBottom: '3px solid #0f4c81', paddingBottom: '15px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {companyLogo && <img src={companyLogo} alt="Logo" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />}
            <div>
              <h1 style={{ margin: 0, color: '#0f4c81', fontSize: '1.5rem' }}>{company.name}</h1>
              <p style={{ margin: '5px 0 0', color: '#666', fontSize: '0.85rem' }}>Excellence in Education Since 1965</p>
            </div>
          </div>
          <nav style={{ marginTop: '15px', display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
            <a href="#" style={{ color: '#0f4c81', textDecoration: 'none' }}>Home</a>
            <a href="#" style={{ color: '#0f4c81', textDecoration: 'none' }}>About</a>
            <a href="#" style={{ color: '#0f4c81', textDecoration: 'none', fontWeight: 'bold', borderBottom: '2px solid #0f4c81' }}>Faculty & Staff</a>
            <a href="#" style={{ color: '#0f4c81', textDecoration: 'none' }}>Academics</a>
            <a href="#" style={{ color: '#0f4c81', textDecoration: 'none' }}>Contact</a>
          </nav>
        </div>

        {/* Breadcrumb */}
        <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '20px' }}>
          <a href="#" style={{ color: '#0f4c81' }}>Home</a> ›
          <a href="#" style={{ color: '#0f4c81' }}> Faculty & Staff</a> ›
          <span> Directory</span>
        </div>

        <h2 style={{ color: '#333', fontSize: '1.3rem', marginBottom: '20px' }}>Faculty Directory</h2>

        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          <input
            type="text"
            value={employee.name}
            readOnly
            style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem' }}
          />
          <button style={{ background: '#0f4c81', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>Search</button>
        </div>

        {/* Results */}
        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '15px' }}>Showing 1 result for "{employee.name}"</p>

        {/* Faculty Card */}
        <div style={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '20px',
          display: 'flex',
          gap: '20px',
          background: '#fafafa'
        }}>
          {photoBase64 ? (
            <img
              src={photoBase64}
              alt={employee.name}
              style={{
                width: '120px',
                height: '150px',
                borderRadius: '8px',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div style={{
              width: '120px',
              height: '150px',
              background: '#ddd',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem',
              color: '#999'
            }}>
              👤
            </div>
          )}
          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 5px', color: '#0f4c81', fontSize: '1.2rem' }}>{employee.name}</h3>
            <p style={{ margin: '0 0 10px', color: '#666', fontSize: '0.95rem' }}>{employee.position}</p>
            <table style={{ fontSize: '0.85rem', color: '#555' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '3px 15px 3px 0', fontWeight: 'bold' }}>Department:</td>
                  <td>Education</td>
                </tr>
                <tr>
                  <td style={{ padding: '3px 15px 3px 0', fontWeight: 'bold' }}>Email:</td>
                  <td style={{ color: '#0f4c81' }}>{employee.name?.toLowerCase().replace(' ', '.')}@{company.name?.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu</td>
                </tr>
                <tr>
                  <td style={{ padding: '3px 15px 3px 0', fontWeight: 'bold' }}>Phone:</td>
                  <td>{company.phone}</td>
                </tr>
                <tr>
                  <td style={{ padding: '3px 15px 3px 0', fontWeight: 'bold' }}>Office:</td>
                  <td>Room 204, Main Building</td>
                </tr>
                <tr>
                  <td style={{ padding: '3px 15px 3px 0', fontWeight: 'bold' }}>Years of Service:</td>
                  <td>{((employee.name?.split('').reduce((a, b) => a + b.charCodeAt(0), 0) || 10) % 15) + 3} years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '30px', paddingTop: '15px', borderTop: '1px solid #ddd', fontSize: '0.75rem', color: '#888', textAlign: 'center' }}>
          © {new Date().getFullYear()} {company.name}. All rights reserved. | {company.address}
        </div>
      </div>
    </>
  );
};

export default FacultyListingRenderer;
