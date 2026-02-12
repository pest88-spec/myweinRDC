import { describe, it, expect } from 'vitest';
import { test, fc } from '@fast-check/vitest';
import { calculateTotalEarnings, calculateTotalDeductions, calculateNetPay, formatCurrency } from './calculations';

describe('Calculation Utilities', () => {
    it('should calculate total earnings correctly', () => {
        const earnings = [
            { amount: 1000 },
            { amount: 500 },
            { amount: 250.50 }
        ];
        expect(calculateTotalEarnings(earnings)).toBe(1750.50);
    });

    it('should handle empty earnings array', () => {
        expect(calculateTotalEarnings([])).toBe(0);
    });

    it('should calculate total deductions correctly', () => {
        const deductions = [
            { amount: 200 },
            { amount: 50.25 }
        ];
        expect(calculateTotalDeductions(deductions)).toBe(250.25);
    });

    it('should calculate net pay correctly', () => {
        const earnings = [{ amount: 2000 }];
        const deductions = [{ amount: 500 }];
        expect(calculateNetPay(earnings, deductions)).toBe(1500);
    });
});

// Feature: payslip-generator-overhaul, Property 1: Currency format consistency
// **Validates: Requirements 2.1, 2.2, 2.3**
describe('formatCurrency Property Tests', () => {
    test.prop(
        [fc.double({ noNaN: true, noDefaultInfinity: true })],
        { numRuns: 100 }
    )(
        'Property 1: formatCurrency produces valid USD format for all numeric values',
        (amount) => {
            const result = formatCurrency(amount);
            // USD format: optional minus sign, dollar sign, digits with commas, dot, exactly 2 decimal digits
            expect(result).toMatch(/^-?\$[\d,]+\.\d{2}$/);
        }
    );

    // Feature: payslip-generator-overhaul, Property 2: Non-numeric currency handling
    // **Validates: Requirements 2.1, 2.2, 2.3**
    test.prop(
        [
            fc.oneof(
                fc.constant(null),
                fc.constant(undefined),
                fc.constant(NaN),
                fc.string().filter(s => isNaN(Number(s)))
            )
        ],
        { numRuns: 100 }
    )(
        'Property 2: formatCurrency returns $0.00 for all non-numeric inputs',
        (input) => {
            const result = formatCurrency(input);
            expect(result).toBe('$0.00');
        }
    );
});

// Feature: payslip-generator-overhaul, Task 1.3: formatCurrency specific value unit tests
// **Validates: Requirements 8.3**
describe('formatCurrency Unit Tests', () => {
    it('should format zero as $0.00', () => {
        expect(formatCurrency(0)).toBe('$0.00');
    });

    it('should format decimal number with thousands separator', () => {
        expect(formatCurrency(1234.5)).toBe('$1,234.50');
    });

    it('should format negative number with minus sign before dollar sign', () => {
        expect(formatCurrency(-500)).toBe('-$500.00');
    });

    it('should format large number with thousands separators', () => {
        expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    });

    it('should format small decimal correctly', () => {
        expect(formatCurrency(0.99)).toBe('$0.99');
    });

    it('should treat undefined as 0', () => {
        expect(formatCurrency(undefined)).toBe('$0.00');
    });

    it('should treat null as 0', () => {
        expect(formatCurrency(null)).toBe('$0.00');
    });

    it('should treat non-numeric string as 0', () => {
        expect(formatCurrency('abc')).toBe('$0.00');
    });

    it('should treat empty string as 0 (Number("") === 0)', () => {
        expect(formatCurrency('')).toBe('$0.00');
    });
});
