import { describe, it, expect } from 'vitest';
import { calculateTotalEarnings, calculateTotalDeductions, calculateNetPay } from './calculations';

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
