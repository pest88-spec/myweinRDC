export const calculateTotalEarnings = (earnings) => {
    return earnings.reduce((total, item) => total + (Number(item.amount) || 0), 0);
};

export const calculateTotalDeductions = (deductions) => {
    return deductions.reduce((total, item) => total + (Number(item.amount) || 0), 0);
};

export const calculateNetPay = (earnings, deductions) => {
    return calculateTotalEarnings(earnings) - calculateTotalDeductions(deductions);
};

// Format a numeric amount as USD currency string.
// Non-numeric inputs (undefined, null, NaN, non-numeric strings) are treated as 0.
export const formatCurrency = (amount) => {
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(0);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(numericAmount);
};

