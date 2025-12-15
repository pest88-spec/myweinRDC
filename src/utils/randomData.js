// Salary ranges by position (annual salary in USD)
const SALARY_RANGES = {
    "Teacher": { min: 45000, max: 65000 },
    "Lecturer": { min: 45000, max: 65000 },
    "Assistant Professor": { min: 65000, max: 85000 },
    "Associate Professor": { min: 80000, max: 110000 },
    "Professor": { min: 100000, max: 140000 },
    "Head of Department": { min: 90000, max: 130000 },
    "Vice Principal": { min: 85000, max: 120000 },
    "Office Administrator": { min: 40000, max: 60000 },
    "Security Officer": { min: 35000, max: 50000 },
    "Accountant": { min: 55000, max: 80000 },
    "Researcher": { min: 60000, max: 90000 },
    "Lab Technician": { min: 40000, max: 55000 },
    "Clinical Professor": { min: 90000, max: 120000 }
};

// Get monthly salary based on position
function getMonthlySalary(position) {
    const range = SALARY_RANGES[position] || { min: 50000, max: 80000 };
    const annualSalary = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    return Math.round(annualSalary / 12);
}

export const generateRandomData = () => {
    const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen", "Hiroshi", "Yuki", "Wei", "Li", "Fatima", "Mohammed", "Sven", "Ingrid"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"];
    const positions = ["Teacher", "Lecturer", "Assistant Professor", "Associate Professor", "Professor", "Head of Department", "Vice Principal", "Office Administrator", "Researcher", "Lab Technician"];

    const schools = [
        { name: "Brooklyn Technical High School", address: "29 Fort Greene Place, Brooklyn, NY 11217", phone: "(718) 804-6400", website: "www.bths.edu" },
        { name: "Apex Solutions Group, LLC", address: "1234 Technology Drive, Suite 200, Innovation City, CA 90210", phone: "+1 (555) 123-4567", website: "www.apexsolutions.com" },
        { name: "GreenLeaf Organics Inc.", address: "5678 Garden Lane, Apt 10B, Harvest Town, OR 97007", phone: "+1 (555) 987-6543", website: "www.greenleaforganics.com" },
        { name: "Summit Financial Services", address: "910 Main Street, Floor 3, Metroburg, NY 10001", phone: "+1 (212) 555-0199", website: "www.summitfinancial.com" },
        { name: "Quantum Robotics Corp.", address: "112 Industry Way, Building C, Future Heights, TX 78704", phone: "+1 (512) 555-0123", website: "www.quantumrobotics.com" },
        { name: "Ocean Breeze Resorts Ltd.", address: "345 Palm Avenue, Unit 1A, Coastal Haven, FL 33139", phone: "+1 (305) 555-0188", website: "www.oceanbreezeresorts.com" },
        { name: "Stellar Software Innovations", address: "678 Pine Street, Suite 400, Techville, WA 98101", phone: "+1 (206) 555-0177", website: "www.stellarsoftware.com" },
        { name: "Cornerstone Construction Co.", address: "789 Builders Row, Industrial Park 5, Foundation City, IL 60607", phone: "+1 (312) 555-0166", website: "www.cornerstoneconstruction.com" },
        { name: "Harvard University", address: "Massachusetts Hall, Cambridge, MA 02138, USA", phone: "+1 (617) 495-1000", website: "www.harvard.edu" },
        { name: "University of Oxford", address: "Wellington Square, Oxford OX1 2JD, UK", phone: "+44 1865 270000", website: "www.ox.ac.uk" },
        { name: "The University of Melbourne", address: "Grattan Street, Parkville VIC 3010, Australia", phone: "+61 3 9035 5511", website: "www.unimelb.edu.au" },
        { name: "The University of Tokyo", address: "7-3-1 Hongo, Bunkyo-ku, Tokyo 113-8654, Japan", phone: "+81 3-3812-2111", website: "www.u-tokyo.ac.jp" },
        { name: "Stanford University", address: "450 Serra Mall, Stanford, CA 94305, USA", phone: "+1 (650) 723-2300", website: "www.stanford.edu" },
        { name: "University of Cambridge", address: "The Old Schools, Trinity Lane, Cambridge CB2 1TN, UK", phone: "+44 1223 337733", website: "www.cam.ac.uk" },
        { name: "ETH Zurich", address: "Rämistrasse 101, 8092 Zürich, Switzerland", phone: "+41 44 632 11 11", website: "ethz.ch" },
        { name: "National University of Singapore", address: "21 Lower Kent Ridge Rd, Singapore 119077", phone: "+65 6516 6666", website: "nus.edu.sg" },
        { name: "University of Toronto", address: "27 King's College Circle, Toronto, Ontario M5S 1A1, Canada", phone: "+1 416-978-2011", website: "www.utoronto.ca" },
        { name: "Tsinghua University", address: "30 Shuangqing Rd, Haidian District, Beijing, China", phone: "+86 10 6279 3001", website: "www.tsinghua.edu.cn" },
        { name: "RMIT University", address: "124 La Trobe St, Melbourne VIC 3000, Australia", phone: "+61 3 9925 2000", website: "www.rmit.edu.au" },
        // Tech Giants
        { name: "Google LLC", address: "1600 Amphitheatre Parkway, Mountain View, CA 94043", phone: "+1 (650) 253-0000", website: "www.google.com" },
        { name: "Microsoft Corporation", address: "One Microsoft Way, Redmond, WA 98052", phone: "+1 (425) 882-8080", website: "www.microsoft.com" },
        { name: "Apple Inc.", address: "One Apple Park Way, Cupertino, CA 95014", phone: "+1 (408) 996-1010", website: "www.apple.com" },
        { name: "Amazon.com Inc.", address: "410 Terry Avenue North, Seattle, WA 98109", phone: "+1 (206) 266-1000", website: "www.amazon.com" },
        { name: "Meta Platforms Inc.", address: "1 Hacker Way, Menlo Park, CA 94025", phone: "+1 (650) 543-4800", website: "www.meta.com" },
        { name: "Netflix Inc.", address: "100 Winchester Circle, Los Gatos, CA 95032", phone: "+1 (408) 540-3700", website: "www.netflix.com" },
        { name: "Tesla Inc.", address: "3500 Deer Creek Road, Palo Alto, CA 94304", phone: "+1 (650) 681-5000", website: "www.tesla.com" },
        { name: "NVIDIA Corporation", address: "2788 San Tomas Expressway, Santa Clara, CA 95051", phone: "+1 (408) 486-2000", website: "www.nvidia.com" },
        // Major Corps
        { name: "Goldman Sachs Group Inc.", address: "200 West Street, New York, NY 10282", phone: "+1 (212) 902-1000", website: "www.goldmansachs.com" },
        { name: "JPMorgan Chase & Co.", address: "383 Madison Avenue, New York, NY 10179", phone: "+1 (212) 270-6000", website: "www.jpmorganchase.com" },
        { name: "McKinsey & Company", address: "55 East 52nd Street, New York, NY 10022", phone: "+1 (212) 446-7000", website: "www.mckinsey.com" },
        { name: "Deloitte Touche Tohmatsu", address: "30 Rockefeller Plaza, New York, NY 10112", phone: "+1 (212) 492-4000", website: "www.deloitte.com" },
        { name: "PwC International Ltd.", address: "1 Embankment Place, London WC2N 6RH, UK", phone: "+44 20 7583 5000", website: "www.pwc.com" },
        { name: "Boeing Company", address: "929 Long Bridge Drive, Arlington, VA 22202", phone: "+1 (312) 544-2000", website: "www.boeing.com" },
        { name: "Lockheed Martin Corp.", address: "6801 Rockledge Drive, Bethesda, MD 20817", phone: "+1 (301) 897-6000", website: "www.lockheedmartin.com" }
    ];

    const banks = [
        "JPMorgan Chase", "Bank of America", "Wells Fargo", "Citigroup", "HSBC", "Barclays", "Royal Bank of Canada", "Commonwealth Bank", "Mitsubishi UFJ", "BNP Paribas"
    ];

    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const selectedSchool = random(schools);
    const selectedPosition = random(positions);
    const baseSalary = getMonthlySalary(selectedPosition);

    // Generate realistic international address
    const streetNames = ["Main St", "High St", "Park Ave", "Broadway", "Maple Dr", "Oak St", "Cedar Ln", "Sunset Blvd", "Victoria St", "George St"];
    const cities = ["New York", "London", "Sydney", "Tokyo", "Paris", "Berlin", "Toronto", "Singapore", "Los Angeles", "Melbourne"];

    const employeeAddress = `${randomInt(1, 999)} ${random(streetNames)}, ${random(cities)}`;

    // Calculate deductions based on base salary
    const federalTax = Math.round(baseSalary * (0.12 + Math.random() * 0.10)); // 12-22%
    const stateTax = Math.round(baseSalary * (0.04 + Math.random() * 0.06)); // 4-10%
    const cityTax = Math.round(baseSalary * (0.01 + Math.random() * 0.02)); // 1-3%
    const fica = Math.round(baseSalary * 0.0765); // 7.65% FICA
    const medicare = Math.round(baseSalary * 0.0145); // 1.45% Medicare

    return {
        company: {
            name: selectedSchool.name,
            address: selectedSchool.address,
            phone: selectedSchool.phone,
            email: `contact@${selectedSchool.website.replace('www.', '')}`,
            website: selectedSchool.website,
            logo: ""
        },
        bank: {
            bankName: random(banks),
            accountNumber: `${randomInt(1000000000, 9999999999)}`
        },
        employee: {
            name: `${random(firstNames)} ${random(lastNames)}`,
            address: employeeAddress,
            position: selectedPosition,
            employeeId: `EMP-${randomInt(100000, 999999)}`,
            taxCode: ["W-4", "1040-ES"][randomInt(0, 1)],
            payRate: baseSalary
        },
        meta: {
            payDate: new Date().toISOString().split('T')[0],
            payPeriodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            payPeriodEnd: new Date().toISOString().split('T')[0],
        },
        earnings: [
            { id: 1, description: "Regular Academic", quantity: 1, rate: baseSalary, amount: baseSalary },
            { id: 2, description: selectedPosition.includes("Professor") || selectedPosition.includes("Head") ? "Department Stipend" : "Per Diem", quantity: 1, rate: Math.round(baseSalary * 0.1), amount: Math.round(baseSalary * 0.1) },
            { id: 3, description: "Per Session", quantity: randomInt(0, 8), rate: 75, amount: 0 }
        ].map(item => ({ ...item, amount: item.amount || item.quantity * item.rate })),
        deductions: [
            { id: 1, description: "Federal Tax", amount: federalTax },
            { id: 2, description: "State Tax", amount: stateTax },
            { id: 3, description: "City Tax", amount: cityTax },
            { id: 4, description: "FICA", amount: fica },
            { id: 5, description: "Medicare", amount: medicare }
        ]
    };
};
