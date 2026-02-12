import React from 'react';
import { UNIVERSITIES, getUniversityFromHash } from '../../data/universities';

/**
 * Standalone renderer for the Teacher ID Card (2-sided) document type.
 * Extracted from Preview.jsx renderTeacherCard() to improve maintainability.
 *
 * Renders a front and back side of a faculty ID card with university branding,
 * employee photo, personal details, and emergency contact information.
 *
 * University/department selection reads from state.teacherCard fields when the
 * user has explicitly set them, falling back to hash-based deterministic
 * selection when values are not provided.
 *
 * @param {Object} props
 * @param {Object} props.state - Complete application state
 * @param {string} [props.photoBase64] - Base64 encoded faculty photo
 * @param {string} [props.cardStyle='original'] - Card visual style: 'original' | 'modern' | 'simple'
 */
const TeacherCardRenderer = ({ state, photoBase64, cardStyle = 'original' }) => {
  const { company, employee } = state;
  const teacherCardData = state.teacherCard;

  // Generate deterministic hash for consistent university/department selection (fallback)
  const nameHash = employee.name?.split('').reduce((a, b) => a + b.charCodeAt(0), 0) || 1;

  // Use fetched photo or fallback
  const photoUrl = photoBase64 || `https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}`;

  // Generate dates - use user-provided validUntil or fallback to +4 years
  const issueDate = new Date();
  let expiryDate;
  if (teacherCardData?.validUntil) {
    expiryDate = new Date(teacherCardData.validUntil);
  } else {
    expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 4);
  }

  // Determine university: user-selected via universityId takes priority
  let university;
  if (teacherCardData?.universityId != null && UNIVERSITIES[teacherCardData.universityId]) {
    // User explicitly selected a university from the dropdown
    university = UNIVERSITIES[teacherCardData.universityId];
  } else if (company.name && company.name !== 'Your Company Name') {
    // If user has set company name, try to find matching university or use hash
    const matchedUni = UNIVERSITIES.find(u =>
      company.name.toLowerCase().includes(u.shortName.toLowerCase()) ||
      u.name.toLowerCase().includes(company.name.toLowerCase())
    );
    university = matchedUni || getUniversityFromHash(employee.name || 'default');
  } else {
    // Use hash-based selection for consistency
    university = getUniversityFromHash(employee.name || 'default');
  }

  const universityName = university.name;
  const universityShort = university.shortName;
  const universityColor = university.color;
  const universityLogo = university.logo;
  const universityAddress = university.address;

  // Determine department: user-provided value takes priority over hash-based selection
  const department = (teacherCardData?.department)
    ? teacherCardData.department
    : university.departments[nameHash % university.departments.length];

  // Determine emergency phone: user-provided value takes priority over hardcoded default
  const emergencyPhone = (teacherCardData?.emergencyPhone)
    ? teacherCardData.emergencyPhone
    : '(555) 123-4567';

  // Years of service: user-provided value takes priority over hash-based calculation
  // (kept available for FacultyListingRenderer or future use)
  // const yearsOfService = teacherCardData?.yearsOfService || ...hash-based fallback...;

  // Style configurations
  const styles = {
    original: {
      frontBg: `linear-gradient(135deg, ${universityColor} 0%, ${universityColor}dd 100%)`,
      backBg: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
      borderRadius: '16px',
      shadow: '0 25px 70px rgba(0,0,0,0.6)',
      headerBg: '#fff',
      accentColor: '#4fc3f7',
      textColor: '#fff',
      headerTextColor: universityColor
    },
    modern: {
      frontBg: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, ${universityColor} 100%)`,
      backBg: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)',
      borderRadius: '24px',
      shadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(102,126,234,0.3)',
      headerBg: 'rgba(255,255,255,0.95)',
      accentColor: '#667eea',
      textColor: '#fff',
      headerTextColor: universityColor
    },
    simple: {
      frontBg: '#ffffff',
      backBg: '#fafafa',
      borderRadius: '8px',
      shadow: '0 4px 20px rgba(0,0,0,0.15)',
      headerBg: universityColor,
      accentColor: universityColor,
      textColor: '#333',
      headerTextColor: '#fff'
    }
  };

  const style = styles[cardStyle] || styles.original;

  return (
    <>
      {/* FRONT SIDE */}
      <div id="teacher-card-front" style={{
        width: '850px',
        maxWidth: '100%',
        background: style.frontBg,
        borderRadius: style.borderRadius,
        overflow: 'hidden',
        boxShadow: style.shadow,
        fontFamily: 'Arial, sans-serif'
      }}>
        {/* Header */}
        <div style={{
          background: style.headerBg,
          padding: '20px 30px',
          display: 'flex',
          alignItems: 'center',
          gap: '18px'
        }}>
          <img
            src={universityLogo}
            alt={universityShort}
            style={{
              width: '70px',
              height: '70px',
              objectFit: 'contain',
              padding: '8px',
              background: '#fff',
              borderRadius: '12px'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div style={{
            width: '70px',
            height: '70px',
            background: universityColor,
            borderRadius: '50%',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>{universityShort}</div>
          <div>
            <div style={{ fontWeight: 'bold', color: style.headerTextColor || universityColor, fontSize: '1.8rem', fontFamily: 'Georgia, serif' }}>{universityShort}</div>
            <div style={{ fontSize: '0.9rem', color: style.headerTextColor ? style.headerTextColor : '#666', opacity: style.headerTextColor ? 0.8 : 1 }}>{universityName}</div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '30px', display: 'flex', gap: '25px' }}>
          {/* Photo */}
          <div style={{
            width: '140px',
            height: '140px',
            background: '#ccc',
            borderRadius: '14px',
            overflow: 'hidden',
            border: '4px solid #fff',
            boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
            flexShrink: 0
          }}>
            <img
              src={photoUrl}
              alt="Faculty"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${employee.name}`; }}
            />
          </div>

          {/* Info */}
          <div style={{ flex: 1, color: style.textColor, fontSize: '1rem' }}>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px' }}>FULL NAME:</div>
              <div style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>{employee.name}</div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px' }}>EMPLOYEE ID:</div>
              <div style={{ color: style.accentColor, fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 'bold' }}>{employee.employeeId}</div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px' }}>DEPARTMENT:</div>
              <div>{department}</div>
            </div>
            <div style={{ display: 'flex', gap: '40px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px' }}>ISSUED:</div>
                <div>{issueDate.toLocaleDateString('en-US')}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px' }}>VALID THRU:</div>
                <div>{expiryDate.toLocaleDateString('en-US')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          background: 'rgba(0,0,0,0.2)',
          padding: '16px 30px',
          color: style.textColor,
          fontSize: '0.9rem'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem' }}>CARDHOLDER ADDRESS</div>
          <div style={{ color: style.accentColor, fontWeight: '500' }}>{employee.name}</div>
          <div style={{ opacity: 0.8 }}>{universityAddress}</div>
        </div>
      </div>

      {/* BACK SIDE */}
      <div id="teacher-card-back" style={{
        width: '850px',
        maxWidth: '100%',
        background: style.backBg,
        borderRadius: style.borderRadius,
        overflow: 'hidden',
        boxShadow: style.shadow,
        fontFamily: 'Arial, sans-serif',
        marginTop: '30px',
        color: style.textColor
      }}>
        {/* Header stripe */}
        <div style={{ background: universityColor, padding: '12px 30px', color: '#fff' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1.5px', textTransform: 'uppercase' }}>CARDHOLDER ADDRESS</div>
        </div>

        <div style={{ padding: '25px 30px' }}>
          {/* Address section */}
          <div style={{ marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #ddd' }}>
            <div style={{ fontWeight: '600', color: universityColor, fontSize: '1.1rem' }}>{employee.name}</div>
            <div style={{ color: '#555', fontSize: '1rem' }}>{universityAddress}</div>
          </div>

          {/* Terms & Disclaimer */}
          <div style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, marginBottom: '20px' }}>
            This card is the property of {universityName} and must be returned upon request.
            Faculty members are required to carry this card while on university premises.
            If found, please return to the nearest security department.
          </div>

          {/* Emergency Contact */}
          <div style={{ background: 'rgba(0,0,0,0.03)', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#333', letterSpacing: '0.5px', marginBottom: '8px' }}>EMERGENCY CONTACT:</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>University Security: {emergencyPhone}</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>HR Department: (555) 123-4568</div>
          </div>

          {/* Signature and Photo section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '15px', borderTop: '1px solid #ddd' }}>
            <div>
              <div style={{ fontFamily: 'Georgia, cursive', fontSize: '2rem', color: '#333' }}>{employee.name}</div>
              <div style={{ fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', marginTop: '5px' }}>Cardholder Signature</div>
            </div>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '2px solid #ddd'
            }}>
              <img src={photoUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherCardRenderer;
