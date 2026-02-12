import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DocumentHeader from '../shared/DocumentHeader';

/**
 * Unit tests for DocumentHeader shared component.
 * Validates: Requirements 10.1
 */

const mockCompany = {
  name: 'Saint Ignatius College Prep',
  address: '123 Main Street, Wayne, NJ 07470',
  phone: '(555) 987-6543',
  email: 'info@waynehills.edu',
};

describe('DocumentHeader', () => {
  describe('Centered layout (default)', () => {
    it('renders with payslip-header-centered class by default', () => {
      const { container } = render(
        <DocumentHeader company={mockCompany} />
      );
      const header = container.querySelector('header');
      expect(header).toHaveClass('payslip-header-centered');
    });

    it('renders company logo when provided', () => {
      render(
        <DocumentHeader company={mockCompany} companyLogo="data:image/png;base64,abc123" />
      );
      const logo = screen.getByAltText('Company logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveClass('company-logo');
      expect(logo).toHaveAttribute('src', 'data:image/png;base64,abc123');
    });

    it('does not render logo when companyLogo is not provided', () => {
      render(
        <DocumentHeader company={mockCompany} />
      );
      expect(screen.queryByAltText('Company logo')).not.toBeInTheDocument();
    });

    it('renders title as h1 when provided', () => {
      render(
        <DocumentHeader company={mockCompany} title="TAX WITHHOLDING STATEMENT" />
      );
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('TAX WITHHOLDING STATEMENT');
    });

    it('does not render h1 when title is not provided', () => {
      render(
        <DocumentHeader company={mockCompany} />
      );
      expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    });

    it('renders subtitle as h2 with company-name class', () => {
      render(
        <DocumentHeader company={mockCompany} subtitle="WAYNE HILLS HIGH SCHOOL" />
      );
      const subtitle = screen.getByRole('heading', { level: 2 });
      expect(subtitle).toHaveTextContent('WAYNE HILLS HIGH SCHOOL');
      expect(subtitle).toHaveClass('company-name');
    });

    it('does not render h2 when subtitle is not provided', () => {
      render(
        <DocumentHeader company={mockCompany} />
      );
      expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
    });

    it('renders company address with company-address class', () => {
      const { container } = render(
        <DocumentHeader company={mockCompany} />
      );
      const addressDiv = container.querySelector('.company-address');
      expect(addressDiv).toBeInTheDocument();
      expect(addressDiv).toHaveTextContent('123 Main Street, Wayne, NJ 07470');
    });

    it('renders all elements together for Tax Form pattern', () => {
      render(
        <DocumentHeader
          company={mockCompany}
          companyLogo="data:image/png;base64,logo"
          title="TAX WITHHOLDING STATEMENT"
          subtitle="WAYNE HILLS HIGH SCHOOL"
        />
      );
      expect(screen.getByAltText('Company logo')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('TAX WITHHOLDING STATEMENT');
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('WAYNE HILLS HIGH SCHOOL');
    });
  });

  describe('Left-aligned layout', () => {
    it('does not use payslip-header-centered class', () => {
      const { container } = render(
        <DocumentHeader company={mockCompany} centered={false} />
      );
      const header = container.querySelector('header');
      expect(header).not.toHaveClass('payslip-header-centered');
    });

    it('renders company name in uppercase', () => {
      render(
        <DocumentHeader company={mockCompany} centered={false} />
      );
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('SAINT IGNATIUS COLLEGE PREP');
    });

    it('renders company address', () => {
      render(
        <DocumentHeader company={mockCompany} centered={false} />
      );
      expect(screen.getByText('123 Main Street, Wayne, NJ 07470')).toBeInTheDocument();
    });

    it('renders company logo with margin-right style when provided', () => {
      render(
        <DocumentHeader company={mockCompany} companyLogo="data:image/png;base64,abc" centered={false} />
      );
      const logo = screen.getByAltText('Company logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveClass('company-logo');
      expect(logo.style.marginRight).toBe('20px');
    });

    it('does not render logo when companyLogo is not provided', () => {
      render(
        <DocumentHeader company={mockCompany} centered={false} />
      );
      expect(screen.queryByAltText('Company logo')).not.toBeInTheDocument();
    });

    it('shows phone and email when showContactInfo is true', () => {
      render(
        <DocumentHeader company={mockCompany} centered={false} showContactInfo={true} />
      );
      expect(screen.getByText(/Phone: \(555\) 987-6543/)).toBeInTheDocument();
      expect(screen.getByText(/Email: info@waynehills.edu/)).toBeInTheDocument();
    });

    it('does not show phone and email when showContactInfo is false (default)', () => {
      render(
        <DocumentHeader company={mockCompany} centered={false} />
      );
      expect(screen.queryByText(/Phone:/)).not.toBeInTheDocument();
    });

    it('does not show contact info when phone or email is missing', () => {
      const companyNoContact = { name: 'Test School', address: '456 Oak Ave' };
      render(
        <DocumentHeader company={companyNoContact} centered={false} showContactInfo={true} />
      );
      expect(screen.queryByText(/Phone:/)).not.toBeInTheDocument();
    });

    it('uses flex layout for left-aligned mode', () => {
      const { container } = render(
        <DocumentHeader company={mockCompany} centered={false} />
      );
      const flexDiv = container.querySelector('header > div');
      expect(flexDiv.style.display).toBe('flex');
      expect(flexDiv.style.alignItems).toBe('center');
    });
  });
});
