import React from 'react';

/**
 * Shared data table component for rendering tabular data across document types.
 * Supports configurable columns with alignment, optional title, footer row,
 * and custom styling for table and header elements.
 *
 * Used by: PayslipRenderer, TaxFormRenderer, W2Renderer, InvoiceRenderer, etc.
 *
 * @param {Object} props
 * @param {string} [props.title] - Optional section title displayed above the table (rendered as h3 with section-title class)
 * @param {Array<{key: string, label: string, align?: string}>} props.columns - Column definitions; align 'right' applies col-right class
 * @param {Array<Object>} props.rows - Array of row data objects; each row is keyed by column.key
 * @param {boolean} [props.showFooter=false] - Whether to render the tfoot section
 * @param {Object} [props.footerRow] - Footer row data object keyed by column.key; rendered when showFooter is true
 * @param {Object} [props.style] - Optional inline style overrides applied to the table element
 * @param {Object} [props.headerStyle] - Optional inline style applied to the thead tr element (e.g., colored headers)
 */
const DataTable = ({ title, columns, rows, showFooter = false, footerRow, style, headerStyle }) => (
  <div className="table-section">
    {title && <h3 className="section-title">{title}</h3>}
    <table className="payslip-table-modern" style={style}>
      <thead>
        <tr style={headerStyle}>
          {columns.map(col => (
            <th key={col.key} className={col.align === 'right' ? 'col-right' : ''}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map(col => (
              <td key={col.key} className={col.align === 'right' ? 'col-right' : ''}>
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {showFooter && footerRow && (
        <tfoot>
          <tr>
            {columns.map(col => (
              <td key={col.key} className={col.align === 'right' ? 'col-right' : ''}>
                {footerRow[col.key]}
              </td>
            ))}
          </tr>
        </tfoot>
      )}
    </table>
  </div>
);

export default DataTable;
