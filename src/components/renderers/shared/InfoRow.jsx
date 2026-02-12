import React from 'react';

/**
 * Shared presentational component that renders a label-value information row.
 * Uses existing CSS classes: info-row, label, value.
 *
 * Used by: PayslipRenderer, TaxFormRenderer, W2Renderer, and other document
 * renderers that display key-value information pairs.
 *
 * @param {Object} props
 * @param {string} props.label - The label text displayed on the left side of the row
 * @param {string|React.ReactNode} props.value - The value content displayed on the right side; accepts strings or React nodes
 */
const InfoRow = ({ label, value }) => (
  <div className="info-row">
    <span className="label">{label}</span>
    <span className="value">{value}</span>
  </div>
);

export default InfoRow;
