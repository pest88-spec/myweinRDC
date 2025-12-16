export const INITIAL_STATE = {
    company: {
        name: "Wayne Hills High School",
        address: "272 Berdan Avenue, Wayne, NJ 07470",
        phone: "(973) 317-2000",
        email: "hr@wayneschools.com",
        website: "www.wayneschools.com",
        logo: "",
        district: "Wayne Township Public Schools",
        county: "Passaic County, New Jersey"
    },
    bank: {
        bankName: "Chase Bank",
        accountNumber: "****9921",
        routingNumber: "021000021"
    },
    employee: {
        name: "John Doe",
        address: "42 Wallaby Way, Sydney",
        cityStateZip: "Sydney, NSW 2000",
        position: "Teacher - Mathematics",
        employeeId: "XXX-XX-9999",
        taxCode: "M-03",
        payRate: 8294.02,
        department: "Mathematics Department",
        hireDate: "2018-08-15"
    },
    meta: {
        payDate: new Date().toISOString().split('T')[0],
        payPeriodStart: new Date().toISOString().split('T')[0],
        payPeriodEnd: new Date().toISOString().split('T')[0],
        payLocation: "050",
        payCycle: "C1B",
        adviceNumber: "1234567",
        accrualDate: new Date().toISOString().split('T')[0]
    },
    earnings: [
        { id: 1, description: "Regular Salary", quantity: 1.00, rate: 8294.02, amount: 8294.02, ytd: 99528.24 }
    ],
    // Tax deductions (separate from other deductions)
    taxes: [
        { id: 1, description: "Federal Withholding (FWT)", amount: 945.96, ytd: 11351.52 },
        { id: 2, description: "State Withholding (SWT)", amount: 388.25, ytd: 4659.00 },
        { id: 3, description: "Medicare", amount: 117.95, ytd: 1415.40 },
        { id: 4, description: "Social Security", amount: 514.23, ytd: 6170.76 }
    ],
    // Pre-tax reductions
    preTaxReductions: [
        { id: 1, description: "STRS Reduction", amount: 846.40, ytd: 10156.80 },
        { id: 2, description: "Medical Premium", amount: 145.00, ytd: 1740.00 },
        { id: 3, description: "Vision (VSP)", amount: 14.34, ytd: 172.08 }
    ],
    // Other deductions
    deductions: [
        { id: 1, description: "Union Dues (CTA)", amount: 116.50, ytd: 1398.00 }
    ],
    // Employer contributions (paid by employer, not deducted from pay)
    employerContributions: [
        { id: 1, description: "STRS Contribution", amount: 1403.35, ytd: 16840.20 },
        { id: 2, description: "Medicare Match", amount: 117.95, ytd: 1415.40 },
        { id: 3, description: "State Unemployment (SUI)", amount: 40.67, ytd: 488.04 },
        { id: 4, description: "Workers Comp", amount: 185.87, ytd: 2230.44 },
        { id: 5, description: "Life Insurance", amount: 8.40, ytd: 100.80 },
        { id: 6, description: "Health Insurance (Kaiser)", amount: 805.00, ytd: 9660.00 },
        { id: 7, description: "Dental (Delta)", amount: 65.17, ytd: 782.04 }
    ],
    // Taxable wage bases
    taxableWages: {
        federal: { current: 7288.28, ytd: 87459.36 },
        state: { current: 7288.28, ytd: 87459.36 },
        medicare: { current: 8134.68, ytd: 97616.16 }
    },
    // Check/payment info
    checkInfo: {
        netPay: 5719.62,
        netPayWords: "Five Thousand Seven Hundred Nineteen and 62/100 Dollars",
        maxValidAmount: 24999.99
    }
};
