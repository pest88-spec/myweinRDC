export const INITIAL_STATE = {
    company: {
        name: "Example Company Pty Ltd",
        address: "123 Business Rd, Tech City, TC 90210",
        phone: "03 9000 0000",
        email: "accounts@example.com",
        website: "www.example.com",
        logo: ""
    },
    bank: {
        bankName: "Example Bank",
        accountNumber: "1234567890"
    },
    employee: {
        name: "John Doe",
        address: "42 Wallaby Way, Sydney",
        position: "Software Engineer",
        employeeId: "EMP001",
        taxCode: "TFT",
        payRate: 50.00
    },
    meta: {
        payDate: new Date().toISOString().split('T')[0],
        payPeriodStart: new Date().toISOString().split('T')[0],
        payPeriodEnd: new Date().toISOString().split('T')[0],
    },
    earnings: [
        { id: 1, description: "Ordinary Hours", quantity: 38, rate: 50.00, amount: 1900.00 }
    ],
    deductions: [
        { id: 1, description: "PAYG Tax", amount: 450.00 }
    ]
};
