import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DataTable from '../shared/DataTable';

/**
 * Unit tests for DataTable shared component.
 * Validates: Requirements 10.2
 */

const sampleColumns = [
  { key: 'description', label: 'Description' },
  { key: 'amount', label: 'Amount', align: 'right' },
];

const sampleRows = [
  { description: 'Federal Income Tax', amount: '$5,000.00' },
  { description: 'State Income Tax', amount: '$1,200.00' },
];

describe('DataTable', () => {
  describe('Title rendering', () => {
    it('renders section title when title prop is provided', () => {
      render(<DataTable title="TAX SUMMARY" columns={sampleColumns} rows={sampleRows} />);
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('TAX SUMMARY');
      expect(heading).toHaveClass('section-title');
    });

    it('does not render title when title prop is not provided', () => {
      render(<DataTable columns={sampleColumns} rows={sampleRows} />);
      expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
    });
  });

  describe('Table structure', () => {
    it('renders a table with payslip-table-modern class', () => {
      const { container } = render(
        <DataTable columns={sampleColumns} rows={sampleRows} />
      );
      const table = container.querySelector('table');
      expect(table).toHaveClass('payslip-table-modern');
    });

    it('wraps content in a div with table-section class', () => {
      const { container } = render(
        <DataTable columns={sampleColumns} rows={sampleRows} />
      );
      const wrapper = container.querySelector('.table-section');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Column headers', () => {
    it('renders column headers from columns prop', () => {
      render(<DataTable columns={sampleColumns} rows={sampleRows} />);
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Amount')).toBeInTheDocument();
    });

    it('applies col-right class to right-aligned column headers', () => {
      const { container } = render(
        <DataTable columns={sampleColumns} rows={sampleRows} />
      );
      const headers = container.querySelectorAll('thead th');
      expect(headers[0]).not.toHaveClass('col-right');
      expect(headers[1]).toHaveClass('col-right');
    });

    it('does not apply col-right class when align is not right', () => {
      const cols = [
        { key: 'name', label: 'Name', align: 'left' },
        { key: 'value', label: 'Value' },
      ];
      const { container } = render(<DataTable columns={cols} rows={[]} />);
      const headers = container.querySelectorAll('thead th');
      expect(headers[0]).not.toHaveClass('col-right');
      expect(headers[1]).not.toHaveClass('col-right');
    });
  });

  describe('Row rendering', () => {
    it('renders all data rows', () => {
      render(<DataTable columns={sampleColumns} rows={sampleRows} />);
      expect(screen.getByText('Federal Income Tax')).toBeInTheDocument();
      expect(screen.getByText('$5,000.00')).toBeInTheDocument();
      expect(screen.getByText('State Income Tax')).toBeInTheDocument();
      expect(screen.getByText('$1,200.00')).toBeInTheDocument();
    });

    it('applies col-right class to right-aligned data cells', () => {
      const { container } = render(
        <DataTable columns={sampleColumns} rows={sampleRows} />
      );
      const firstRowCells = container.querySelectorAll('tbody tr:first-child td');
      expect(firstRowCells[0]).not.toHaveClass('col-right');
      expect(firstRowCells[1]).toHaveClass('col-right');
    });

    it('renders empty tbody when rows array is empty', () => {
      const { container } = render(
        <DataTable columns={sampleColumns} rows={[]} />
      );
      const tbody = container.querySelector('tbody');
      expect(tbody).toBeInTheDocument();
      expect(tbody.children).toHaveLength(0);
    });
  });

  describe('Footer rendering', () => {
    it('renders footer when showFooter is true and footerRow is provided', () => {
      const footerRow = { description: 'Total', amount: '$6,200.00' };
      const { container } = render(
        <DataTable
          columns={sampleColumns}
          rows={sampleRows}
          showFooter={true}
          footerRow={footerRow}
        />
      );
      const tfoot = container.querySelector('tfoot');
      expect(tfoot).toBeInTheDocument();
      expect(screen.getByText('Total')).toBeInTheDocument();
      expect(screen.getByText('$6,200.00')).toBeInTheDocument();
    });

    it('applies col-right class to right-aligned footer cells', () => {
      const footerRow = { description: 'Total', amount: '$6,200.00' };
      const { container } = render(
        <DataTable
          columns={sampleColumns}
          rows={sampleRows}
          showFooter={true}
          footerRow={footerRow}
        />
      );
      const footerCells = container.querySelectorAll('tfoot td');
      expect(footerCells[0]).not.toHaveClass('col-right');
      expect(footerCells[1]).toHaveClass('col-right');
    });

    it('does not render footer when showFooter is false (default)', () => {
      const { container } = render(
        <DataTable columns={sampleColumns} rows={sampleRows} />
      );
      expect(container.querySelector('tfoot')).not.toBeInTheDocument();
    });

    it('does not render footer when showFooter is true but footerRow is not provided', () => {
      const { container } = render(
        <DataTable columns={sampleColumns} rows={sampleRows} showFooter={true} />
      );
      expect(container.querySelector('tfoot')).not.toBeInTheDocument();
    });
  });

  describe('Custom styling', () => {
    it('applies style prop to the table element', () => {
      const { container } = render(
        <DataTable
          columns={sampleColumns}
          rows={sampleRows}
          style={{ fontSize: '0.8rem' }}
        />
      );
      const table = container.querySelector('table');
      expect(table.style.fontSize).toBe('0.8rem');
    });

    it('applies headerStyle prop to the thead tr element', () => {
      const { container } = render(
        <DataTable
          columns={sampleColumns}
          rows={sampleRows}
          headerStyle={{ background: '#0f4c81', color: '#fff' }}
        />
      );
      const headerRow = container.querySelector('thead tr');
      expect(headerRow.style.background).toBeTruthy();
      expect(headerRow.style.color).toBeTruthy();
    });

    it('renders without style props when not provided', () => {
      const { container } = render(
        <DataTable columns={sampleColumns} rows={sampleRows} />
      );
      const table = container.querySelector('table');
      expect(table.getAttribute('style')).toBeNull();
      const headerRow = container.querySelector('thead tr');
      expect(headerRow.getAttribute('style')).toBeNull();
    });
  });

  describe('Multi-column tables', () => {
    it('renders tables with many columns correctly', () => {
      const multiColumns = [
        { key: 'desc', label: 'DESCRIPTION' },
        { key: 'endDate', label: 'END DATE' },
        { key: 'rate', label: 'RATE' },
        { key: 'amount', label: 'AMOUNT', align: 'right' },
        { key: 'ytd', label: 'YTD', align: 'right' },
      ];
      const multiRows = [
        { desc: 'Base Salary', endDate: '2024-01-31', rate: '$4,500.00', amount: '$4,500.00', ytd: '$54,000.00' },
      ];
      render(<DataTable columns={multiColumns} rows={multiRows} />);

      expect(screen.getByText('DESCRIPTION')).toBeInTheDocument();
      expect(screen.getByText('END DATE')).toBeInTheDocument();
      expect(screen.getByText('RATE')).toBeInTheDocument();
      expect(screen.getByText('AMOUNT')).toBeInTheDocument();
      expect(screen.getByText('YTD')).toBeInTheDocument();
      expect(screen.getByText('Base Salary')).toBeInTheDocument();
    });
  });
});
