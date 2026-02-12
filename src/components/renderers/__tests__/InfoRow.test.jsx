import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InfoRow from '../shared/InfoRow';

/**
 * Unit tests for InfoRow shared component.
 * Validates: Requirements 10.3
 */

describe('InfoRow', () => {
  it('renders a div with info-row class', () => {
    const { container } = render(<InfoRow label="EMPLOYEE:" value="John Doe" />);
    const row = container.querySelector('.info-row');
    expect(row).toBeInTheDocument();
  });

  it('renders the label inside a span with label class', () => {
    const { container } = render(<InfoRow label="EMPLOYEE:" value="John Doe" />);
    const labelSpan = container.querySelector('.info-row .label');
    expect(labelSpan).toBeInTheDocument();
    expect(labelSpan).toHaveTextContent('EMPLOYEE:');
  });

  it('renders the value inside a span with value class', () => {
    const { container } = render(<InfoRow label="EMPLOYEE:" value="John Doe" />);
    const valueSpan = container.querySelector('.info-row .value');
    expect(valueSpan).toBeInTheDocument();
    expect(valueSpan).toHaveTextContent('John Doe');
  });

  it('renders string values correctly', () => {
    render(<InfoRow label="ID:" value="EMP-001" />);
    expect(screen.getByText('ID:')).toBeInTheDocument();
    expect(screen.getByText('EMP-001')).toBeInTheDocument();
  });

  it('renders React node values correctly', () => {
    const valueNode = <strong>Important Value</strong>;
    render(<InfoRow label="Status:" value={valueNode} />);
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('Important Value')).toBeInTheDocument();
    expect(screen.getByText('Important Value').tagName).toBe('STRONG');
  });

  it('renders empty string value without error', () => {
    const { container } = render(<InfoRow label="Notes:" value="" />);
    const valueSpan = container.querySelector('.info-row .value');
    expect(valueSpan).toBeInTheDocument();
    expect(valueSpan).toHaveTextContent('');
  });

  it('renders numeric value converted to string', () => {
    render(<InfoRow label="Amount:" value={1234} />);
    expect(screen.getByText('1234')).toBeInTheDocument();
  });

  it('produces the same HTML structure as the original inline pattern', () => {
    const { container } = render(<InfoRow label="EMPLOYEE:" value="Jane Smith" />);
    const row = container.querySelector('.info-row');
    expect(row.children).toHaveLength(2);
    expect(row.children[0].tagName).toBe('SPAN');
    expect(row.children[0]).toHaveClass('label');
    expect(row.children[1].tagName).toBe('SPAN');
    expect(row.children[1]).toHaveClass('value');
  });
});
