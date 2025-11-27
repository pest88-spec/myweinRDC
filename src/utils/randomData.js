export const generateRandomData = () => {
    const firstNames = ["James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "David", "Elizabeth"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
    const positions = ["Software Engineer", "Project Manager", "Designer", "Data Analyst", "Product Owner", "HR Specialist"];
    const companies = ["Tech Global Pty Ltd", "Innovative Solutions", "Future Corp", "Alpha Industries", "Omega Systems"];

    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

    return {
        company: {
            name: random(companies),
            address: `${randomInt(1, 999)} Business Park, Suite ${randomInt(100, 500)}, Tech City`,
            phone: `(0${randomInt(2, 9)}) ${randomInt(1000, 9999)} ${randomInt(1000, 9999)}`,
            email: `contact@${random(companies).toLowerCase().replace(/\s/g, '')}.com`,
            logo: ""
        },
        employee: {
            name: `${random(firstNames)} ${random(lastNames)}`,
            address: `${randomInt(1, 999)} Residential St, Suburbia, State ${randomInt(1000, 9999)}`,
            position: random(positions),
            employeeId: `EMP${randomInt(1000, 9999)}`,
            taxCode: ["TFT", "NO-TFT", "H.E.C.S"][randomInt(0, 2)],
            payRate: parseFloat(randomFloat(25, 150))
        },
        meta: {
            payDate: new Date().toISOString().split('T')[0],
            payPeriodStart: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            payPeriodEnd: new Date().toISOString().split('T')[0],
        },
        earnings: [
            { id: 1, description: "Ordinary Hours", quantity: 76, rate: parseFloat(randomFloat(25, 150)), amount: 0 }, // Amount calc handled by UI/logic usually, but we can pre-fill or let logic handle
            { id: 2, description: "Overtime (1.5x)", quantity: randomInt(0, 10), rate: parseFloat(randomFloat(37.5, 225)), amount: 0 },
            { id: 3, description: "Bonus", quantity: 1, rate: randomInt(0, 1000), amount: 0 }
        ].map(item => ({ ...item, amount: item.quantity * item.rate })),
        deductions: [
            { id: 1, description: "PAYG Tax", amount: randomInt(200, 1500) },
            { id: 2, description: "Superannuation", amount: randomInt(100, 500) }
        ]
    };
};
