// K-12 School Districts for Teacher Payslips
const K12_SCHOOLS = [
    { name: "Wayne Hills High School", district: "Wayne Township Public Schools", county: "Passaic County, New Jersey", address: "272 Berdan Avenue, Wayne, NJ 07470", phone: "(973) 317-2000", website: "www.wayneschools.com" },
    { name: "Dallas Independent School District", district: "Dallas ISD", county: "Dallas County, Texas", address: "9400 N Central Expy, Dallas, TX 75231", phone: "(972) 925-3700", website: "www.dallasisd.org" },
    { name: "Los Angeles Unified School District", district: "LAUSD", county: "Los Angeles County, California", address: "333 S Beaudry Ave, Los Angeles, CA 90017", phone: "(213) 241-1000", website: "www.lausd.net" },
    { name: "Chicago Public Schools", district: "CPS", county: "Cook County, Illinois", address: "42 W Madison St, Chicago, IL 60602", phone: "(773) 553-1000", website: "www.cps.edu" },
    { name: "New York City Dept of Education", district: "NYCDOE", county: "New York, New York", address: "52 Chambers St, New York, NY 10007", phone: "(718) 935-2000", website: "www.schools.nyc.gov" },
    { name: "Clark County School District", district: "CCSD", county: "Clark County, Nevada", address: "5100 W Sahara Ave, Las Vegas, NV 89146", phone: "(702) 799-5000", website: "www.ccsd.net" },
    { name: "Fairfax County Public Schools", district: "FCPS", county: "Fairfax County, Virginia", address: "8115 Gatehouse Rd, Falls Church, VA 22042", phone: "(571) 423-1000", website: "www.fcps.edu" }
];

// Salary ranges by position (annual salary in USD for K-12 teachers)
const SALARY_RANGES = {
    "Teacher": { min: 55000, max: 85000 },
    "Lead Teacher": { min: 65000, max: 95000 },
    "Department Head": { min: 75000, max: 110000 },
    "Assistant Principal": { min: 85000, max: 120000 },
    "Principal": { min: 100000, max: 150000 },
    "Counselor": { min: 55000, max: 80000 },
    "Librarian": { min: 50000, max: 75000 },
    "Special Ed Teacher": { min: 55000, max: 85000 }
};

const DEPARTMENTS = [
    "Mathematics", "English", "Science", "History", "Physical Education",
    "Art", "Music", "Foreign Languages", "Computer Science", "Social Studies"
];

// Convert number to words for check amount
function numberToWords(num) {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const intPart = Math.floor(num);
    const cents = Math.round((num - intPart) * 100);

    let words = '';

    if (intPart >= 1000) {
        words += ones[Math.floor(intPart / 1000)] + ' Thousand ';
        const remainder = intPart % 1000;
        if (remainder >= 100) {
            words += ones[Math.floor(remainder / 100)] + ' Hundred ';
            const tens_part = remainder % 100;
            if (tens_part >= 20) {
                words += tens[Math.floor(tens_part / 10)] + ' ' + ones[tens_part % 10];
            } else if (tens_part > 0) {
                words += ones[tens_part];
            }
        } else if (remainder >= 20) {
            words += tens[Math.floor(remainder / 10)] + ' ' + ones[remainder % 10];
        } else if (remainder > 0) {
            words += ones[remainder];
        }
    } else if (intPart >= 100) {
        words += ones[Math.floor(intPart / 100)] + ' Hundred ';
        const remainder = intPart % 100;
        if (remainder >= 20) {
            words += tens[Math.floor(remainder / 10)] + ' ' + ones[remainder % 10];
        } else if (remainder > 0) {
            words += ones[remainder];
        }
    } else if (intPart >= 20) {
        words += tens[Math.floor(intPart / 10)] + ' ' + ones[intPart % 10];
    } else {
        words += ones[intPart];
    }

    return words.trim() + ' and ' + cents.toString().padStart(2, '0') + '/100 Dollars';
}

export const generateRandomData = () => {
    const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee"];
    const positions = Object.keys(SALARY_RANGES);
    const banks = ["Chase Bank", "Bank of America", "Wells Fargo", "Citibank", "PNC Bank", "TD Bank", "Capital One"];

    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const round2 = (num) => Math.round(num * 100) / 100;

    const selectedSchool = random(K12_SCHOOLS);
    const selectedPosition = random(positions);
    const selectedDept = random(DEPARTMENTS);
    const salaryRange = SALARY_RANGES[selectedPosition];
    const annualSalary = randomInt(salaryRange.min, salaryRange.max);
    const monthlySalary = round2(annualSalary / 12);

    // Calculate months worked (for YTD)
    const monthsWorked = randomInt(9, 12);

    // Generate dates
    const today = new Date();
    const payDate = new Date(today);
    payDate.setDate(randomInt(1, 28));

    const periodEnd = new Date(payDate);
    periodEnd.setDate(periodEnd.getDate() - randomInt(1, 5));

    const periodStart = new Date(periodEnd);
    periodStart.setMonth(periodStart.getMonth() - 1);
    periodStart.setDate(1);

    // Tax calculations (realistic US rates)
    const federalTax = round2(monthlySalary * 0.12); // ~12% federal
    const stateTax = round2(monthlySalary * 0.05); // ~5% state
    const medicare = round2(monthlySalary * 0.0145); // 1.45% Medicare
    const socialSecurity = round2(monthlySalary * 0.062); // 6.2% SS

    // Pre-tax deductions
    const strsReduction = round2(monthlySalary * 0.102); // ~10.2% STRS
    const medicalPremium = round2(randomInt(100, 200));
    const visionPremium = round2(randomInt(10, 25));

    // Post-tax deductions
    const unionDues = round2(randomInt(80, 150));

    // Employer contributions
    const strsContribution = round2(monthlySalary * 0.169); // ~16.9% employer STRS
    const medicareMatch = medicare;
    const sui = round2(monthlySalary * 0.005);
    const workersComp = round2(monthlySalary * 0.022);
    const lifeIns = round2(randomInt(5, 15));
    const healthIns = round2(randomInt(600, 1000));
    const dentalIns = round2(randomInt(40, 80));

    // Calculate totals
    const totalTaxes = federalTax + stateTax + medicare + socialSecurity;
    const totalPreTax = strsReduction + medicalPremium + visionPremium;
    const totalDeductions = unionDues;
    const grossPay = monthlySalary;
    const netPay = round2(grossPay - totalTaxes - totalPreTax - totalDeductions);

    // Taxable wages
    const federalTaxable = round2(grossPay - totalPreTax);
    const stateTaxable = federalTaxable;
    const medicareTaxable = grossPay;

    // Address generation
    const streets = ["Oak St", "Maple Ave", "Main St", "Cedar Ln", "Park Dr", "Elm Way", "Birch Rd"];
    const cities = ["Springfield", "Franklin", "Clinton", "Madison", "Georgetown", "Bristol", "Chester"];
    const states = ["NJ", "NY", "PA", "CA", "TX", "FL", "VA"];

    const formatDate = (d) => {
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const yyyy = d.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    };

    return {
        company: {
            name: selectedSchool.name,
            address: selectedSchool.address,
            phone: selectedSchool.phone,
            email: `hr@${selectedSchool.website.replace('www.', '')}`,
            website: selectedSchool.website,
            logo: "",
            district: selectedSchool.district,
            county: selectedSchool.county
        },
        bank: {
            bankName: random(banks),
            accountNumber: `****${randomInt(1000, 9999)}`,
            routingNumber: `0${randomInt(10000000, 99999999)}`
        },
        employee: {
            name: `${random(firstNames)} ${random(lastNames)}`,
            address: `${randomInt(100, 9999)} ${random(streets)}`,
            cityStateZip: `${random(cities)}, ${random(states)} ${randomInt(10000, 99999)}`,
            position: `${selectedPosition} - ${selectedDept}`,
            employeeId: `XXX-XX-${randomInt(1000, 9999)}`,
            taxCode: `M-0${randomInt(1, 4)}`,
            payRate: monthlySalary,
            department: `${selectedDept} Department`,
            hireDate: `${2015 + randomInt(0, 8)}-08-${randomInt(10, 28).toString().padStart(2, '0')}`
        },
        meta: {
            payDate: formatDate(payDate),
            payPeriodStart: formatDate(periodStart),
            payPeriodEnd: formatDate(periodEnd),
            payLocation: `0${randomInt(10, 99)}`,
            payCycle: `C${randomInt(1, 2)}${['A', 'B', 'C'][randomInt(0, 2)]}`,
            adviceNumber: `${randomInt(1000000, 9999999)}`,
            accrualDate: formatDate(payDate)
        },
        earnings: [
            { id: 1, description: "Regular Salary", quantity: 1.00, rate: monthlySalary, amount: monthlySalary, ytd: round2(monthlySalary * monthsWorked) }
        ],
        taxes: [
            { id: 1, description: "Federal Withholding (FWT)", amount: federalTax, ytd: round2(federalTax * monthsWorked) },
            { id: 2, description: "State Withholding (SWT)", amount: stateTax, ytd: round2(stateTax * monthsWorked) },
            { id: 3, description: "Medicare", amount: medicare, ytd: round2(medicare * monthsWorked) },
            { id: 4, description: "Social Security", amount: socialSecurity, ytd: round2(socialSecurity * monthsWorked) }
        ],
        preTaxReductions: [
            { id: 1, description: "STRS Reduction", amount: strsReduction, ytd: round2(strsReduction * monthsWorked) },
            { id: 2, description: "Medical Premium", amount: medicalPremium, ytd: round2(medicalPremium * monthsWorked) },
            { id: 3, description: "Vision (VSP)", amount: visionPremium, ytd: round2(visionPremium * monthsWorked) }
        ],
        deductions: [
            { id: 1, description: "Union Dues (CTA)", amount: unionDues, ytd: round2(unionDues * monthsWorked) }
        ],
        employerContributions: [
            { id: 1, description: "STRS Contribution", amount: strsContribution, ytd: round2(strsContribution * monthsWorked) },
            { id: 2, description: "Medicare Match", amount: medicareMatch, ytd: round2(medicareMatch * monthsWorked) },
            { id: 3, description: "State Unemployment (SUI)", amount: sui, ytd: round2(sui * monthsWorked) },
            { id: 4, description: "Workers Comp", amount: workersComp, ytd: round2(workersComp * monthsWorked) },
            { id: 5, description: "Life Insurance", amount: lifeIns, ytd: round2(lifeIns * monthsWorked) },
            { id: 6, description: "Health Insurance (Kaiser)", amount: healthIns, ytd: round2(healthIns * monthsWorked) },
            { id: 7, description: "Dental (Delta)", amount: dentalIns, ytd: round2(dentalIns * monthsWorked) }
        ],
        taxableWages: {
            federal: { current: federalTaxable, ytd: round2(federalTaxable * monthsWorked) },
            state: { current: stateTaxable, ytd: round2(stateTaxable * monthsWorked) },
            medicare: { current: medicareTaxable, ytd: round2(medicareTaxable * monthsWorked) }
        },
        checkInfo: {
            netPay: netPay,
            netPayWords: numberToWords(netPay),
            maxValidAmount: 24999.99
        }
    };
};
