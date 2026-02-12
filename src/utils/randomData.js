// K-12 School Districts for Teacher Payslips
const K12_SCHOOLS = [
    { name: "Wayne Hills High School", district: "Wayne Township Public Schools", county: "Passaic County, New Jersey", address: "272 Berdan Avenue, Wayne, NJ 07470", phone: "(973) 317-2000", website: "www.wayneschools.com" },
    { name: "Dallas Independent School District", district: "Dallas ISD", county: "Dallas County, Texas", address: "9400 N Central Expy, Dallas, TX 75231", phone: "(972) 925-3700", website: "www.dallasisd.org" },
    { name: "Los Angeles Unified School District", district: "LAUSD", county: "Los Angeles County, California", address: "333 S Beaudry Ave, Los Angeles, CA 90017", phone: "(213) 241-1000", website: "www.lausd.net" },
    { name: "Chicago Public Schools", district: "CPS", county: "Cook County, Illinois", address: "42 W Madison St, Chicago, IL 60602", phone: "(773) 553-1000", website: "www.cps.edu" },
    { name: "New York City Dept of Education", district: "NYCDOE", county: "New York, New York", address: "52 Chambers St, New York, NY 10007", phone: "(718) 935-2000", website: "www.schools.nyc.gov" },
    { name: "Clark County School District", district: "CCSD", county: "Clark County, Nevada", address: "5100 W Sahara Ave, Las Vegas, NV 89146", phone: "(702) 799-5000", website: "www.ccsd.net" },
    { name: "Fairfax County Public Schools", district: "FCPS", county: "Fairfax County, Virginia", address: "8115 Gatehouse Rd, Falls Church, VA 22042", phone: "(571) 423-1000", website: "www.fcps.edu" },
    { name: "Houston Independent School District", district: "HISD", county: "Harris County, Texas", address: "4400 W 18th St, Houston, TX 77092", phone: "(713) 556-6000", website: "www.houstonisd.org" },
    { name: "Miami-Dade County Public Schools", district: "M-DCPS", county: "Miami-Dade County, Florida", address: "1450 NE 2nd Ave, Miami, FL 33132", phone: "(305) 995-1000", website: "www.dadeschools.net" },
    { name: "Hillsborough County Public Schools", district: "HCPS", county: "Hillsborough County, Florida", address: "901 E Kennedy Blvd, Tampa, FL 33602", phone: "(813) 272-4000", website: "www.hillsboroughschools.org" },
    { name: "Orange County Public Schools", district: "OCPS", county: "Orange County, Florida", address: "445 W Amelia St, Orlando, FL 32801", phone: "(407) 317-3200", website: "www.ocps.net" },
    { name: "Broward County Public Schools", district: "BCPS", county: "Broward County, Florida", address: "600 SE 3rd Ave, Fort Lauderdale, FL 33301", phone: "(754) 321-0000", website: "www.browardschools.com" },
    { name: "Gwinnett County Public Schools", district: "GCPS", county: "Gwinnett County, Georgia", address: "437 Old Peachtree Rd NW, Suwanee, GA 30024", phone: "(678) 301-6000", website: "www.gcpsk12.org" },
    { name: "Charlotte-Mecklenburg Schools", district: "CMS", county: "Mecklenburg County, North Carolina", address: "4421 Stuart Andrew Blvd, Charlotte, NC 28217", phone: "(980) 343-3000", website: "www.cms.k12.nc.us" },
    { name: "School District of Philadelphia", district: "SDP", county: "Philadelphia County, Pennsylvania", address: "440 N Broad St, Philadelphia, PA 19130", phone: "(215) 400-4000", website: "www.philasd.org" },
    { name: "San Diego Unified School District", district: "SDUSD", county: "San Diego County, California", address: "4100 Normal St, San Diego, CA 92103", phone: "(619) 725-8000", website: "www.sandiegounified.org" },
    { name: "Denver Public Schools", district: "DPS", county: "Denver County, Colorado", address: "1860 Lincoln St, Denver, CO 80203", phone: "(720) 423-3200", website: "www.dpsk12.org" },
    { name: "Austin Independent School District", district: "AISD", county: "Travis County, Texas", address: "4000 S IH 35, Austin, TX 78704", phone: "(512) 414-1700", website: "www.austinisd.org" },
    { name: "Boston Public Schools", district: "BPS", county: "Suffolk County, Massachusetts", address: "2300 Washington St, Boston, MA 02119", phone: "(617) 635-9000", website: "www.bostonpublicschools.org" },
    { name: "Seattle Public Schools", district: "SPS", county: "King County, Washington", address: "2445 3rd Ave S, Seattle, WA 98134", phone: "(206) 252-0000", website: "www.seattleschools.org" },
    { name: "Portland Public Schools", district: "PPS", county: "Multnomah County, Oregon", address: "501 N Dixon St, Portland, OR 97227", phone: "(503) 916-2000", website: "www.pps.net" },
    { name: "Minneapolis Public Schools", district: "MPS", county: "Hennepin County, Minnesota", address: "1250 W Broadway Ave, Minneapolis, MN 55411", phone: "(612) 668-0000", website: "www.mpls.k12.mn.us" },
    { name: "Detroit Public Schools", district: "DPSCD", county: "Wayne County, Michigan", address: "3011 W Grand Blvd, Detroit, MI 48202", phone: "(313) 873-7490", website: "www.detroitk12.org" },
    { name: "Atlanta Public Schools", district: "APS", county: "Fulton County, Georgia", address: "130 Trinity Ave SW, Atlanta, GA 30303", phone: "(404) 802-3500", website: "www.atlantapublicschools.us" },
    { name: "San Francisco Unified School District", district: "SFUSD", county: "San Francisco County, California", address: "555 Franklin St, San Francisco, CA 94102", phone: "(415) 241-6000", website: "www.sfusd.edu" },
    { name: "Baltimore City Public Schools", district: "City Schools", county: "Baltimore City, Maryland", address: "200 E North Ave, Baltimore, MD 21202", phone: "(443) 984-2000", website: "www.baltimorecityschools.org" },
    { name: "Saint Ignatius College Prep", district: "Archdiocese of Chicago", county: "Cook County, Illinois", address: "1076 W Roosevelt Rd, Chicago, IL 60608", phone: "(312) 421-5900", website: "www.ignatius.org" },
    { name: "Phillips Academy Andover", district: "Independent", county: "Essex County, Massachusetts", address: "180 Main St, Andover, MA 01810", phone: "(978) 749-4000", website: "www.andover.edu" },
    { name: "Thomas Jefferson High School for Science and Technology", district: "FCPS", county: "Fairfax County, Virginia", address: "6560 Braddock Rd, Alexandria, VA 22312", phone: "(703) 750-8300", website: "www.tjhsst.fcps.edu" },
    { name: "Stuyvesant High School", district: "NYCDOE", county: "New York, New York", address: "345 Chambers St, New York, NY 10282", phone: "(212) 312-4800", website: "www.stuy.edu" },
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

// Educator License data pools
const LICENSE_STATES = [
    { name: 'Ohio', abbreviation: 'OH', department: 'Department of Education' },
    { name: 'California', abbreviation: 'CA', department: 'Commission on Teacher Credentialing' },
    { name: 'Texas', abbreviation: 'TX', department: 'State Board for Educator Certification' },
    { name: 'New York', abbreviation: 'NY', department: 'Department of Education' },
    { name: 'Florida', abbreviation: 'FL', department: 'Department of Education' },
    { name: 'Illinois', abbreviation: 'IL', department: 'State Board of Education' },
    { name: 'Pennsylvania', abbreviation: 'PA', department: 'Department of Education' },
    { name: 'Georgia', abbreviation: 'GA', department: 'Professional Standards Commission' },
    { name: 'Michigan', abbreviation: 'MI', department: 'Department of Education' },
    { name: 'Virginia', abbreviation: 'VA', department: 'Department of Education' }
];

const LICENSE_TYPES = [
    '4 Year Resident Educator License',
    '5 Year Professional License',
    'Provisional License',
    'Permanent Certificate',
    'Initial Teaching License',
    'Standard Teaching Certificate',
    'Advanced Professional Certificate'
];

const TEACHING_AREAS = [
    'Intervention Specialist (K-12)',
    'Mathematics (7-12)',
    'English Language Arts (4-9)',
    'Science (7-12)',
    'Social Studies (7-12)',
    'Early Childhood Education (PK-3)',
    'Middle Childhood Education (4-9)',
    'Adolescence to Young Adult (7-12)',
    'Physical Education (PK-12)',
    'Music Education (PK-12)',
    'Special Education (K-12)',
    'Reading/Literacy (K-12)',
    'World Languages - Spanish (PK-12)',
    'Computer Science (PK-12)',
    'Health Education (PK-12)'
];

const ENDORSEMENTS = [
    'Mild/Moderate',
    'Moderate/Intensive',
    'Gifted Education',
    'Reading Endorsement',
    'TESOL',
    'Early Childhood Generalist',
    'Adaptive Physical Education',
    'Bilingual Education',
    'Autism Spectrum',
    'Transition to Work'
];

const SIGNATORY_TITLES = [
    'Chairman of the Board',
    'Secretary',
    'State Superintendent of Education',
    'Superintendent of Public Instruction',
    'Deputy Superintendent',
    'Commissioner of Education'
];

const RENEWAL_REQUIREMENTS = [
    '-State law requires that you register this certificate within 6 months of the issue date in the region in which you work or reside, whether or not you are employed. Failure to do so will result in a lapsed certificate.\n-This certificate may be registered in four year periods and is valid until June 30 of the year in which four years of teaching have been completed.',
    '-This certificate must be renewed every 5 years. Completion of 120 clock hours of professional development is required.\n-Contact your regional office of education for renewal procedures.',
    '-Holder must complete 8 semester hours of coursework in content area within the validity period.\n-Certificate is valid for 4 years from the date of issuance.',
    '-Professional development requirements: 6 semester hours or equivalent.\n-Must maintain active employment in an approved educational institution.',
    '-Renewal requires completion of a state-approved mentoring program.\n-Submit evidence of 2 years of successful teaching experience.'
];

const GRADE_LEVELS = [
    'Middle School',
    'High School',
    'Elementary School',
    'Grade level of Certificate',
    'K-12',
    'Early Childhood',
    'Secondary'
];

const VALID_FOR_OPTIONS = [
    'Kindergarten to Grade 9',
    'Kindergarten to Grade 12',
    'Grade 6 to Grade 12',
    'Grade 9 to Grade 12',
    'Pre-K to Grade 3',
    'Pre-K to Grade 6',
    'All Grade Levels (K-12)'
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

/**
 * Generate a random educator license data object with realistic values.
 * Uses data pools for states, license types, teaching areas, endorsements, etc.
 * @param {string[]} firstNames - Pool of first names
 * @param {string[]} lastNames - Pool of last names
 * @param {function} random - Helper to pick a random element from an array
 * @param {function} randomInt - Helper to generate a random integer in [min, max]
 * @returns {Object} A complete educatorLicense object matching the state structure
 */
function generateEducatorLicense(firstNames, lastNames, random, randomInt) {
    const selectedState = random(LICENSE_STATES);

    // Generate licensee name in "Last, First M." format
    const firstName = random(firstNames);
    const lastName = random(lastNames);
    const middleInitial = String.fromCharCode(randomInt(65, 90));
    const licenseeName = `${lastName}, ${firstName} ${middleInitial}.`;

    // Generate issued-to ID: 6-digit number
    const issuedToId = String(randomInt(100000, 999999));

    // Generate license number: 7 digits
    const licenseNumber = String(randomInt(1000000, 9999999));

    // Generate realistic date range
    const issueYear = randomInt(2010, 2023);
    const issueMonth = randomInt(1, 12);
    const issueDay = randomInt(1, 28);
    const issueDate = `${issueYear}-${String(issueMonth).padStart(2, '0')}-${String(issueDay).padStart(2, '0')}`;

    // Valid For field
    const validFor = random(VALID_FOR_OPTIONS);

    // Generate 1-2 random teaching areas, each with 1-4 structured endorsements
    const numAreas = randomInt(1, 2);
    const usedAreaIndices = new Set();
    const teachingAreas = [];
    for (let i = 0; i < numAreas; i++) {
        let areaIndex;
        do {
            areaIndex = randomInt(0, TEACHING_AREAS.length - 1);
        } while (usedAreaIndices.has(areaIndex));
        usedAreaIndices.add(areaIndex);

        // Generate 1-4 structured endorsements for this area
        const numEndorsements = randomInt(1, 4);
        const usedEndorsementIndices = new Set();
        const endorsements = [];
        for (let j = 0; j < numEndorsements; j++) {
            let endorsementIndex;
            do {
                endorsementIndex = randomInt(0, ENDORSEMENTS.length - 1);
            } while (usedEndorsementIndices.has(endorsementIndex));
            usedEndorsementIndices.add(endorsementIndex);
            endorsements.push({
                subject: ENDORSEMENTS[endorsementIndex],
                gradeLevel: random(GRADE_LEVELS),
                date: issueDate,
            });
        }

        teachingAreas.push({
            id: i + 1,
            area: TEACHING_AREAS[areaIndex],
            endorsements
        });
    }

    // Generate certificate number: 7-digit number for top-right display
    const certificateNumber = String(randomInt(1000000, 9999999));

    // Generate 3 signatories with random names and appropriate titles
    const signatoryTitles = ['Chairman of the Board', 'Secretary', 'State Superintendent of Education'];
    const signatories = signatoryTitles.map((title) => ({
        name: `${random(firstNames)} ${random(lastNames)}`,
        title
    }));

    return {
        stateName: selectedState.name,
        departmentName: selectedState.department,
        licenseType: random(LICENSE_TYPES),
        licenseeName,
        issuedToId,
        licenseNumber,
        issueDate,
        validFor,
        teachingAreas,
        renewalRequirements: random(RENEWAL_REQUIREMENTS),
        certificateNumber,
        signatories
    };
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
            hireDate: `${2015 + randomInt(0, 8)}-08-${randomInt(10, 28).toString().padStart(2, '0')}`,
            employmentStatus: random(['Full-time Employee', 'Part-time Employee', 'Contract Employee']),
            telecommute: random(['No', 'Yes', 'Hybrid']),
            federalTaxStatus: random(['Married', 'Single', 'Head of Household']),
            lastFourSSN: `${randomInt(1000, 9999)}`,
            gradeLevel: random(['Grade K-5', 'Grade 6-8', 'Grade 9-12', 'Grade K-8', 'Grade 6-12']),
            subjects: random([selectedDept, 'General Education', `${selectedDept} & Special Education`, `Advanced ${selectedDept}`]),
            signatoryName: `${random(firstNames)} ${random(lastNames)}`,
            signatoryTitle: random(['Principal', 'HR Director', 'Vice Principal', 'Dean of Faculty', 'Superintendent'])
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
        },
        educatorLicense: generateEducatorLicense(firstNames, lastNames, random, randomInt)
    };
};
