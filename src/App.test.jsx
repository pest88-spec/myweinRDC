import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
    it('renders the header correctly', () => {
        render(<App />);
        expect(screen.getByText(/Payslip Generator/i)).toBeInTheDocument();
    });

    it('renders the editor and preview sections', () => {
        render(<App />);
        expect(screen.getByText(/Company Details/i)).toBeInTheDocument();
        expect(screen.getByText(/Employee Details/i)).toBeInTheDocument();
    });

    it('updates company name in preview when edited', () => {
        render(<App />);
        const companyNameInput = screen.getByDisplayValue(/Example Company Pty Ltd/i);
        fireEvent.change(companyNameInput, { target: { value: 'New Test Company' } });

        // Check if preview updates (it might be in uppercase in preview due to CSS/Logic)
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
