import React, { useState } from 'react';
import PayslipRenderer from './renderers/PayslipRenderer';
import InvoiceRenderer from './renderers/InvoiceRenderer';
import TaxFormRenderer from './renderers/TaxFormRenderer';
import W2Renderer from './renderers/W2Renderer';
import EmploymentLetterRenderer from './renderers/EmploymentLetterRenderer';
import OfferLetterRenderer from './renderers/OfferLetterRenderer';
import FacultyListingRenderer from './renderers/FacultyListingRenderer';
import TeacherCardRenderer from './renderers/TeacherCardRenderer';
import EducatorLicenseRenderer from './renderers/EducatorLicenseRenderer';

/**
 * Preview panel component that handles zoom/drag interactions
 * and routes to the appropriate document renderer based on docType.
 */
const Preview = ({ state, docType = 'payslip', mode = 'employee', companyLogo, cardStyle = 'original', photoBase64 }) => {
  // Zoom state
  const [zoomLevel, setZoomLevel] = useState(70);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => {
    if (zoomLevel < 150) setZoomLevel(prev => prev + 10);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 30) setZoomLevel(prev => prev - 10);
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.zoom-controls')) return;
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

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // Map each docType to its corresponding renderer component
  const rendererMap = {
    payslip: mode === 'contractor'
      ? <InvoiceRenderer state={state} companyLogo={companyLogo} />
      : <PayslipRenderer state={state} companyLogo={companyLogo} />,
    tax: <TaxFormRenderer state={state} companyLogo={companyLogo} />,
    w2: <W2Renderer state={state} companyLogo={companyLogo} />,
    employment: <EmploymentLetterRenderer state={state} companyLogo={companyLogo} />,
    offer: <OfferLetterRenderer state={state} companyLogo={companyLogo} />,
    faculty: <FacultyListingRenderer state={state} companyLogo={companyLogo} photoBase64={photoBase64} />,
    teacherCard: <TeacherCardRenderer state={state} cardStyle={cardStyle} photoBase64={photoBase64} />,
    educatorLicense: <EducatorLicenseRenderer state={state} />,
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
      <div className="zoom-controls">
        <button onClick={handleZoomOut} className="zoom-btn" title="Zoom Out" aria-label="Zoom out">−</button>
        <span className="zoom-level">{zoomLevel}%</span>
        <button onClick={handleZoomIn} className="zoom-btn" title="Zoom In" aria-label="Zoom in">+</button>
      </div>

      <div
        className="payslip-container"
        style={{
          transform: `scale(${zoomLevel / 100}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: 'top center'
        }}
      >
        {rendererMap[docType]}
      </div>
    </div>
  );
};

export default Preview;
