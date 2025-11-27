export const calculateTotalEarnings = (earnings) => {
    return earnings.reduce((total, item) => total + (Number(item.amount) || 0), 0);
};

export const calculateTotalDeductions = (deductions) => {
    return deductions.reduce((total, item) => total + (Number(item.amount) || 0), 0);
};

export const calculateNetPay = (earnings, deductions) => {
    return calculateTotalEarnings(earnings) - calculateTotalDeductions(deductions);
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);
};
