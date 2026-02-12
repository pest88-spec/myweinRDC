export const INITIAL_STATE = {
    company: {
        name: "Saint Ignatius College Prep",
        address: "1076 W. Roosevelt Road, Chicago, IL 60608",
        phone: "(312) 421-5900",
        email: "info@ignatius.org",
        website: "www.ignatius.org",
        logo: "",
        district: "Archdiocese of Chicago",
        county: "Cook County, Illinois"
    },
    bank: {
        bankName: "Chase Bank",
        accountNumber: "****9921",
        routingNumber: "021000021"
    },
    employee: {
        name: "Matt Monroe",
        address: "291 Elkview Drive, Chicago, IL 60608",
        cityStateZip: "Chicago, IL 60608",
        position: "Employee",
        employeeId: "amb2218226",
        taxCode: "M",
        payRate: 50.00,
        department: "Mathematics Department",
        hireDate: "2024-12-15",
        employmentStatus: "Full-time Employee",
        telecommute: "No",
        federalTaxStatus: "Married",
        lastFourSSN: "3019",
        gradeLevel: "Grade 6-8",
        subjects: "Mathematics",
        signatoryName: "",
        signatoryTitle: "Principal / HR Director"
    },
    meta: {
        payDate: "2026-02-15",
        payPeriodStart: "2026-02-01",
        payPeriodEnd: "2026-02-15",
        payLocation: "050",
        payCycle: "Semi-Monthly",
        adviceNumber: "1234567",
        accrualDate: new Date().toISOString().split('T')[0]
    },
    earnings: [
        { id: 1, description: "Regular", quantity: 80.00, rate: 50.00, amount: 4000.00, ytd: 16000.00 }
    ],
    // Tax deductions (separate from other deductions)
    taxes: [
        { id: 1, description: "FICA MED TAX", amount: 58.00, ytd: 232.00 },
        { id: 2, description: "FICA SS TAX", amount: 248.00, ytd: 992.00 },
        { id: 3, description: "FED TAX", amount: 298.33, ytd: 1216.92 },
        { id: 4, description: "IL STATE TAX", amount: 0.00, ytd: 0.00 }
    ],
    // Pre-tax reductions
    preTaxReductions: [],
    // Other deductions
    deductions: [],
    // Employer contributions (paid by employer, not deducted from pay)
    employerContributions: [],
    // Taxable wage bases
    taxableWages: {
        federal: { current: 4000.00, ytd: 16000.00 },
        state: { current: 4000.00, ytd: 16000.00 },
        medicare: { current: 4000.00, ytd: 16000.00 }
    },
    // Check/payment info
    checkInfo: {
        netPay: 3395.67,
        netPayWords: "Three Thousand Three Hundred Ninety-Five and 67/100 Dollars",
        maxValidAmount: 24999.99
    },
    // Teacher card fields for user-editable teacher ID card data
    teacherCard: {
        universityId: null,        // Selected university index or null for auto
        department: '',            // Selected department
        emergencyPhone: '',        // Emergency contact phone
        officeRoom: '',            // Office room number
        yearsOfService: '',        // Years of service
        validUntil: '',            // Card expiry date (YYYY-MM-DD)
    },
    // Educator license certificate fields
    educatorLicense: {
        stateName: 'Illinois',
        departmentName: 'State Educator Preparation and Licensure Board',
        licenseType: 'Initial Elementary Teaching',
        licenseeName: 'Oestmann, Nicole M.',
        issuedToId: '884368',
        licenseNumber: '2573571',
        issueDate: '2013-06-02',
        validFor: 'Kindergarten to Grade 9',
        teachingAreas: [
            {
                id: 1,
                area: 'Elementary Education',
                endorsements: [
                    { subject: 'Language Arts', gradeLevel: 'Middle School', date: '2013-06-02' },
                    { subject: 'Self Contained General Education, Kindergarten - Grade 9', gradeLevel: 'Grade level of Certificate', date: '2013-06-02' },
                    { subject: 'Social Science', gradeLevel: 'Middle School', date: '2013-06-02' }
                ]
            }
        ],
        renewalRequirements: '-State law requires that you register this certificate within 6 months of the issue date in the region in which you work or reside, whether or not you are employed. Failure to do so will result in a lapsed certificate.\n-This certificate may be registered in four year periods and is valid until June 30 of the year in which four years of teaching have been completed.',
        certificateNumber: '1729082',
        signatories: [
            { name: 'Harry J. Chico', title: 'Chairman of the Board' },
            { name: 'Vicki Phillips', title: 'Secretary' },
            { name: 'Chris A. Koch', title: 'State Superintendent of Education' }
        ]
    }
};
