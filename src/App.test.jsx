import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import App from './App';

// Mock fetch to prevent actual network requests during tests
beforeEach(() => {
  localStorage.clear();
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      blob: () => Promise.resolve(new Blob(['fake-image'], { type: 'image/jpeg' })),
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('App Component', () => {
  it('renders the header correctly', () => {
    render(<App />);
    const elements = screen.getAllByText(/Payslip Generator/i);
    expect(elements.length).toBeGreaterThan(0);
  });

  it('renders the editor and preview sections', () => {
    render(<App />);
    expect(screen.getByText(/Company Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Employee Details/i)).toBeInTheDocument();
  });

  it('updates company name in preview when edited', () => {
    render(<App />);
    const companyNameInput = screen.getByDisplayValue(/Saint Ignatius College Prep/i);
    fireEvent.change(companyNameInput, { target: { value: 'New Test Company' } });

    // Check if preview updates with the new company name
    const previewElements = screen.getAllByText(/New Test Company/i);
    expect(previewElements.length).toBeGreaterThan(0);
  });

  it('adds a new earning item', () => {
    render(<App />);
    const addButton = screen.getByText(/\+ Add Earnings/i);
    fireEvent.click(addButton);

    // Check if a new row appears (default description is "New Item")
    const newItems = screen.getAllByDisplayValue(/New Item/i);
    expect(newItems.length).toBeGreaterThan(0);
  });
});

describe('Document Type Rendering', () => {
  it('renders Payslip document type by default', () => {
    render(<App />);
    // Payslip is the default doc type; verify the nav button is active
    const payslipBtn = screen.getByRole('button', { name: /^Payslip$/i });
    expect(payslipBtn).toHaveAttribute('aria-current', 'page');
  });

  it('renders Tax Form document type', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^Tax Form$/i }));
    // Verify the Tax Form button becomes active
    expect(screen.getByRole('button', { name: /^Tax Form$/i })).toHaveAttribute('aria-current', 'page');
  });

  it('renders W-2 document type', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^W-2$/i }));
    expect(screen.getByRole('button', { name: /^W-2$/i })).toHaveAttribute('aria-current', 'page');
  });

  it('renders Employment document type', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^Employment$/i }));
    expect(screen.getByRole('button', { name: /^Employment$/i })).toHaveAttribute('aria-current', 'page');
  });

  it('renders Offer Letter document type', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^Offer Letter$/i }));
    expect(screen.getByRole('button', { name: /^Offer Letter$/i })).toHaveAttribute('aria-current', 'page');
  });

  it('renders Faculty Listing document type', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^Faculty Listing$/i }));
    expect(screen.getByRole('button', { name: /^Faculty Listing$/i })).toHaveAttribute('aria-current', 'page');
  });

  it('renders Teacher ID document type', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^Teacher ID$/i }));
    expect(screen.getByRole('button', { name: /^Teacher ID$/i })).toHaveAttribute('aria-current', 'page');
  });

  // Educator License navigation tests (Requirements 4.1, 4.2, 4.3)
  it('renders Educator License button in navigation', () => {
    render(<App />);
    const educatorLicenseBtn = screen.getByRole('button', { name: /^Educator License$/i });
    expect(educatorLicenseBtn).toBeInTheDocument();
  });

  it('renders Educator License document type', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^Educator License$/i }));
    expect(screen.getByRole('button', { name: /^Educator License$/i })).toHaveAttribute('aria-current', 'page');
  });
});
