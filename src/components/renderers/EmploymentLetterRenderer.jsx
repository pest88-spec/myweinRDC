import React from 'react';
import { formatCurrency } from '../../utils/calculations';

/**
 * Renderer for the Employment Verification Letter.
 * Layout based on a formal school letterhead style:
 *   - Top center: uploaded school logo/crest
 *   - School name in elegant serif, address centered
 *   - Decorative divider with "United States"
 *   - Date right-aligned
 *   - Formal letter body with employee info block
 *   - Bottom left: same logo as official seal
 *   - Bottom right: signature + title + school name
 *
 * @param {Object} props
 * @param {Object} props.state - Complete application state
 * @param {string} [props.companyLogo] - Base64 encoded company logo
 */
const EmploymentLetterRenderer = ({ state, companyLogo }) => {
  const { company, employee, meta } = state;

  // Default letter date: today minus 2 days
  const letterDate = new Date();
  letterDate.setDate(letterDate.getDate() - 2);
  const today = letterDate.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  // Parse address parts for multi-line display
  const addressParts = (company.address || '').split(',').map(s => s.trim());
  const streetLine = addressParts[0] || '';
  const cityStateZip = addressParts.slice(1).join(', ');

  return (
    <div style={{
      fontFamily: "'Times New Roman', Times, serif",
      fontSize: '12px',
      lineHeight: 1.6,
      color: '#222',
      padding: '15mm 20mm',
      minHeight: '260mm',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── SECURITY WATERMARK LAYERS ── */}
      {/* Layer 1: Fine anti-forgery pattern — repeating micro-text grid */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 18px,
          rgba(180, 200, 220, 0.08) 18px,
          rgba(180, 200, 220, 0.08) 19px
        ), repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 18px,
          rgba(180, 200, 220, 0.08) 18px,
          rgba(180, 200, 220, 0.08) 19px
        )`,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Layer 2: Center logo watermark (if logo uploaded) */}
      {companyLogo && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '280px',
          height: '280px',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.04,
        }}>
          <img
            src={companyLogo}
            alt=""
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: 'grayscale(100%) brightness(1.2)',
            }}
          />
        </div>
      )}

      {/* Layer 3: Subtle "OFFICIAL DOCUMENT" repeating diagonal text watermark */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-20%',
        right: '-20%',
        bottom: '-20%',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
        transform: 'rotate(-35deg)',
        pointerEvents: 'none',
        zIndex: 0,
        gap: '60px 40px',
      }}>
        {Array.from({ length: 30 }, (_, i) => (
          <span key={i} style={{
            fontSize: '13px',
            fontFamily: "'Arial', sans-serif",
            fontWeight: '600',
            color: 'rgba(170, 195, 220, 0.07)',
            letterSpacing: '4px',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}>
            OFFICIAL DOCUMENT
          </span>
        ))}
      </div>

      {/* ── LETTERHEAD: Logo + School Name + Address ── */}
      <div style={{ textAlign: 'center', marginBottom: '5mm', position: 'relative', zIndex: 1 }}>
        {/* Top center logo */}
        {companyLogo && (
          <div style={{ marginBottom: '4mm' }}>
            <img
              src={companyLogo}
              alt="School logo"
              style={{
                width: '70px',
                height: '70px',
                objectFit: 'contain',
              }}
            />
          </div>
        )}

        {/* School name — elegant serif */}
        <div style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: '24px',
          fontWeight: '400',
          color: '#4a1c1c',
          letterSpacing: '0.5px',
          marginBottom: '2mm',
        }}>
          {company.name}
        </div>

        {/* Address lines */}
        <div style={{ fontSize: '11px', color: '#444', lineHeight: 1.5 }}>
          <div>{streetLine}</div>
          <div>{cityStateZip}</div>
        </div>

        {/* Decorative divider with "United States" */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '3mm 0',
          gap: '3mm',
        }}>
          <div style={{
            flex: '1',
            maxWidth: '80mm',
            height: '1.5px',
            background: 'linear-gradient(to right, transparent, #8b2020, #8b2020)',
          }} />
          <span style={{
            fontSize: '10px',
            color: '#8b2020',
            whiteSpace: 'nowrap',
            fontStyle: 'italic',
          }}>
            United States
          </span>
          <div style={{
            flex: '1',
            maxWidth: '80mm',
            height: '1.5px',
            background: 'linear-gradient(to left, transparent, #8b2020, #8b2020)',
          }} />
        </div>
      </div>

      {/* ── DATE ── right-aligned */}
      <div style={{
        textAlign: 'right',
        fontSize: '12px',
        marginBottom: '8mm',
        position: 'relative',
        zIndex: 1,
      }}>
        {today}
      </div>

      {/* ── SALUTATION ── */}
      <div style={{ marginBottom: '6mm', position: 'relative', zIndex: 1 }}>
        To Whom It May Concern,
      </div>

      {/* ── INTRO PARAGRAPH ── */}
      <div style={{ marginBottom: '6mm', textAlign: 'justify', position: 'relative', zIndex: 1 }}>
        This letter is to formally verify the employment and teaching position of
        Mr. {employee.name} at {company.name}, a K-12 educational institution
        located at {company.address}, United States.
      </div>

      {/* ── EMPLOYEE INFORMATION BLOCK ── */}
      <div style={{ marginBottom: '6mm', position: 'relative', zIndex: 1 }}>
        <div style={{ fontWeight: 'bold', textDecoration: 'underline', marginBottom: '3mm' }}>
          Employee Information:
        </div>
        <table style={{
          borderCollapse: 'collapse',
          fontSize: '12px',
          fontFamily: 'inherit',
          lineHeight: 1.8,
        }}>
          <tbody>
            {[
              ['Name:', employee.name, true],
              ['Employee ID:', employee.employeeId, false],
              ['Position/Title:', employee.position, false],
              ['Employment Status:', employee.employmentStatus || 'Full-time Employee', false],
              ['Work Location:', `${company.name},\u00A0\u00A0\u00A0\u00A0${cityStateZip}`, true],
              ['Telecommute:', employee.telecommute || 'No', false],
              ['Federal Tax Status:', employee.federalTaxStatus || '', true],
              ['Last 4 digits of SSN:', employee.lastFourSSN || '', false],
              ['Email:', company.email || '', false],
            ].map(([label, value, bold]) => (
              <tr key={label}>
                <td style={{
                  paddingRight: '5mm',
                  whiteSpace: 'nowrap',
                  verticalAlign: 'top',
                  color: '#333',
                }}>{label}</td>
                <td style={{
                  verticalAlign: 'top',
                  fontWeight: bold ? 'bold' : 'normal',
                }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── CONFIRMATION PARAGRAPH ── */}
      <div style={{ marginBottom: '6mm', textAlign: 'justify', position: 'relative', zIndex: 1 }}>
        This is to confirm that Mr. {employee.name} is currently employed by {company.name},
        and based on his credentials and performance, is qualified to teach{' '}
        {employee.subjects || '[Subject(s)]'} / {employee.gradeLevel || '[Grade Level]'}.
        His duties include instructional teaching, classroom management, student
        assessment, planning curriculum, and other related responsibilities typical of a K-12 teacher
        in the State of Illinois.
      </div>

      {/* ── CONTACT PARAGRAPH ── */}
      <div style={{ marginBottom: '10mm', position: 'relative', zIndex: 1 }}>
        Please feel free to contact our Human Resources Office at{' '}
        {company.phone} or {company.email} for any further information.
      </div>

      {/* ── SPACER ── pushes footer to bottom */}
      <div style={{ flex: '1 1 auto', minHeight: '10mm' }} />

      {/* ── FOOTER: Seal (left) + Signature (right) ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Bottom-left: official seal logo */}
        <div>
          {companyLogo && (
            <img
              src={companyLogo}
              alt="Official seal"
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'contain',
                opacity: 0.85,
                borderRadius: '50%',
                border: '2px solid #6b2020',
                padding: '2px',
              }}
            />
          )}
        </div>

        {/* Bottom-right: signature block */}
        <div style={{ textAlign: 'center' }}>
          {/* Handwritten signature */}
          <div style={{
            fontFamily: "'Mrs Saint Delafield', cursive",
            fontSize: '28px',
            color: '#1a1a1a',
            marginBottom: '1mm',
          }}>
            {employee.signatoryName || employee.name || ''}
          </div>
          <div style={{ fontWeight: 'bold', fontSize: '11px' }}>
            {employee.signatoryName || employee.name || ''}
          </div>
          <div style={{ fontSize: '10px', color: '#555' }}>
            {employee.signatoryTitle || 'Principal'}
          </div>
          <div style={{ fontSize: '10px', color: '#555' }}>
            {company.name}
          </div>
        </div>
      </div>

    </div>
  );
};

export default EmploymentLetterRenderer;
