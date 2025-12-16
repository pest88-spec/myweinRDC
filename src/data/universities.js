// University Database for Teacher ID Cards and Payslip Generator
// Full international data synced from student-card-generator

export const UNIVERSITIES = [
    // ===== USA =====
    {
        name: "Pennsylvania State University-Main Campus",
        shortName: "Penn State",
        domain: "psu.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/psu.png",
        color: "#041E42",
        address: "University Park, PA 16802, USA",
        departments: ["Computer Science", "Engineering", "Business", "Education", "Agriculture"]
    },
    {
        name: "Massachusetts Institute of Technology",
        shortName: "MIT",
        domain: "mit.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/mit_official.svg",
        color: "#A31F34",
        address: "77 Massachusetts Ave, Cambridge, MA 02139, USA",
        departments: ["Computer Science", "Mechanical Engineering", "Physics", "Mathematics", "Electrical Engineering"]
    },
    {
        name: "Harvard University",
        shortName: "Harvard",
        domain: "harvard.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/harvard.svg",
        color: "#A51C30",
        address: "Cambridge, MA 02138, USA",
        departments: ["Law", "Medicine", "Business", "Political Science", "Economics"]
    },
    {
        name: "Stanford University",
        shortName: "Stanford",
        domain: "stanford.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/stanford.svg",
        color: "#8C1515",
        address: "450 Serra Mall, Stanford, CA 94305, USA",
        departments: ["Computer Science", "Engineering", "Business", "Law", "Medicine"]
    },
    {
        name: "University of California, Berkeley",
        shortName: "UC Berkeley",
        domain: "berkeley.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/berkeley.svg",
        color: "#003262",
        address: "Berkeley, CA 94720, USA",
        departments: ["Computer Science", "Economics", "Engineering", "Business", "Political Science"]
    },
    {
        name: "Yale University",
        shortName: "Yale",
        domain: "yale.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/yale.svg",
        color: "#00356B",
        address: "New Haven, CT 06520, USA",
        departments: ["Law", "History", "Economics", "Political Science", "Psychology"]
    },
    {
        name: "Princeton University",
        shortName: "Princeton",
        domain: "princeton.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/princeton.png",
        color: "#FF6600",
        address: "Princeton, NJ 08544, USA",
        departments: ["Mathematics", "Physics", "Economics", "Computer Science", "Public Policy"]
    },
    {
        name: "Columbia University",
        shortName: "Columbia",
        domain: "columbia.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/columbia.png",
        color: "#B9D9EB",
        address: "116th St & Broadway, New York, NY 10027, USA",
        departments: ["Business", "Law", "Journalism", "Medicine", "International Relations"]
    },
    {
        name: "New York University",
        shortName: "NYU",
        domain: "nyu.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/nyu.png",
        color: "#57068C",
        address: "70 Washington Square S, New York, NY 10012, USA",
        departments: ["Business", "Film", "Law", "Arts", "Media"]
    },
    {
        name: "University of California, Los Angeles",
        shortName: "UCLA",
        domain: "ucla.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/ucla.png",
        color: "#2774AE",
        address: "Los Angeles, CA 90095, USA",
        departments: ["Film", "Business", "Engineering", "Medicine", "Psychology"]
    },
    {
        name: "University of Chicago",
        shortName: "UChicago",
        domain: "uchicago.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/uchicago.png",
        color: "#800000",
        address: "5801 S Ellis Ave, Chicago, IL 60637, USA",
        departments: ["Economics", "Law", "Business", "Physics", "Political Science"]
    },
    {
        name: "Duke University",
        shortName: "Duke",
        domain: "duke.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/duke.png",
        color: "#003087",
        address: "Durham, NC 27708, USA",
        departments: ["Medicine", "Business", "Law", "Engineering", "Public Policy"]
    },
    {
        name: "Cornell University",
        shortName: "Cornell",
        domain: "cornell.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/cornell.png",
        color: "#B31B1B",
        address: "Ithaca, NY 14850, USA",
        departments: ["Engineering", "Hotel Administration", "Agriculture", "Business", "Computer Science"]
    },
    {
        name: "Northwestern University",
        shortName: "Northwestern",
        domain: "northwestern.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/northwestern.png",
        color: "#4E2A84",
        address: "Evanston, IL 60208, USA",
        departments: ["Journalism", "Business", "Engineering", "Law", "Medicine"]
    },
    {
        name: "University of Michigan",
        shortName: "Michigan",
        domain: "umich.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/michigan.png",
        color: "#00274C",
        address: "500 S State St, Ann Arbor, MI 48109, USA",
        departments: ["Engineering", "Business", "Medicine", "Law", "Psychology"]
    },
    {
        name: "University of Texas at Austin",
        shortName: "UT Austin",
        domain: "utexas.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/ut_austin.png",
        color: "#BF5700",
        address: "Austin, TX 78712, USA",
        departments: ["Business", "Engineering", "Communications", "Biology", "Computer Science"]
    },
    {
        name: "University of Washington",
        shortName: "UW",
        domain: "washington.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/washington.png",
        color: "#4B2E83",
        address: "Seattle, WA 98195, USA",
        departments: ["Computer Science", "Medicine", "Business", "Engineering", "Biology"]
    },
    {
        name: "University of Florida",
        shortName: "UF",
        domain: "ufl.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/florida.png",
        color: "#FA4616",
        address: "Gainesville, FL 32611, USA",
        departments: ["Engineering", "Business", "Biology", "Psychology", "Health Sciences"]
    },
    {
        name: "Ohio State University",
        shortName: "Ohio State",
        domain: "osu.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/ohio_state.png",
        color: "#BB0000",
        address: "Columbus, OH 43210, USA",
        departments: ["Business", "Engineering", "Psychology", "Biology", "Finance"]
    },
    {
        name: "University of Pennsylvania",
        shortName: "UPenn",
        domain: "upenn.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/upenn.png",
        color: "#990000",
        address: "Philadelphia, PA 19104, USA",
        departments: ["Business", "Medicine", "Law", "Economics", "Nursing"]
    },
    {
        name: "Brown University",
        shortName: "Brown",
        domain: "brown.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/brown.png",
        color: "#4E3629",
        address: "Providence, RI 02912, USA",
        departments: ["Computer Science", "Economics", "Biology", "History", "Applied Mathematics"]
    },
    {
        name: "Johns Hopkins University",
        shortName: "JHU",
        domain: "jhu.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/johns_hopkins.png",
        color: "#002D72",
        address: "Baltimore, MD 21218, USA",
        departments: ["Medicine", "Public Health", "International Studies", "Bioengineering", "Neuroscience"]
    },
    {
        name: "University of Southern California",
        shortName: "USC",
        domain: "usc.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/usc.png",
        color: "#990000",
        address: "Los Angeles, CA 90007, USA",
        departments: ["Film", "Business", "Communication", "Engineering", "Architecture"]
    },
    {
        name: "Carnegie Mellon University",
        shortName: "CMU",
        domain: "cmu.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/cmu.png",
        color: "#C41230",
        address: "Pittsburgh, PA 15213, USA",
        departments: ["Computer Science", "Robotics", "Drama", "Engineering", "Design"]
    },

    // ===== CANADA =====
    {
        name: "University of Toronto",
        shortName: "UofT",
        domain: "utoronto.ca",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/uoft.png",
        color: "#002A5C",
        address: "27 King's College Cir, Toronto, ON M5S 1A1, Canada",
        departments: ["Computer Science", "Engineering", "Business", "Medicine", "Law"]
    },
    {
        name: "McGill University",
        shortName: "McGill",
        domain: "mcgill.ca",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/mcgill.png",
        color: "#ED1B2F",
        address: "845 Sherbrooke St W, Montreal, Quebec H3A 0G4, Canada",
        departments: ["Medicine", "Law", "Engineering", "Arts", "Science"]
    },
    {
        name: "University of British Columbia",
        shortName: "UBC",
        domain: "ubc.ca",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/ubc.svg",
        color: "#002145",
        address: "Vancouver, BC V6T 1Z4, Canada",
        departments: ["Forestry", "Oceanography", "Computer Science", "Business", "Engineering"]
    },

    // ===== UK =====
    {
        name: "University of Oxford",
        shortName: "Oxford",
        domain: "ox.ac.uk",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/oxford.svg",
        color: "#002147",
        address: "Wellington Square, Oxford OX1 2JD, UK",
        departments: ["Philosophy, Politics and Economics", "Law", "Medicine", "History", "Mathematics"]
    },
    {
        name: "University of Cambridge",
        shortName: "Cambridge",
        domain: "cam.ac.uk",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/cambridge.png",
        color: "#A3C1AD",
        address: "The Old Schools, Trinity Ln, Cambridge CB2 1TN, UK",
        departments: ["Natural Sciences", "Engineering", "Medicine", "Law", "Computer Science"]
    },
    {
        name: "Imperial College London",
        shortName: "Imperial",
        domain: "imperial.ac.uk",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/imperial.png",
        color: "#003E74",
        address: "Exhibition Rd, South Kensington, London SW7 2BX, UK",
        departments: ["Medicine", "Computing", "Physics", "Mechanical Engineering", "Civil Engineering"]
    },

    // ===== JAPAN =====
    {
        name: "The University of Tokyo",
        shortName: "UTokyo",
        domain: "u-tokyo.ac.jp",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/utokyo.png",
        color: "#0080FF",
        address: "7-3-1 Hongo, Bunkyo City, Tokyo 113-8654, Japan",
        departments: ["Law", "Medicine", "Engineering", "Economics", "Science"]
    },
    {
        name: "Kyoto University",
        shortName: "KyotoU",
        domain: "kyoto-u.ac.jp",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/kyoto.svg",
        color: "#003865",
        address: "Yoshidahonmachi, Sakyo Ward, Kyoto, 606-8501, Japan",
        departments: ["Integrated Human Studies", "Education", "Law", "Economics", "Science"]
    },

    // ===== SOUTH KOREA =====
    {
        name: "Seoul National University",
        shortName: "SNU",
        domain: "snu.ac.kr",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/snu.svg",
        color: "#0F0F70",
        address: "1 Gwanak-ro, Gwanak-gu, Seoul, South Korea",
        departments: ["Business Administration", "Engineering", "Medicine", "Law", "Social Sciences"]
    },
    {
        name: "Yonsei University",
        shortName: "Yonsei",
        domain: "yonsei.ac.kr",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/yonsei.png",
        color: "#00205B",
        address: "50 Yonsei-ro, Seodaemun-gu, Seoul, South Korea",
        departments: ["Business", "Engineering", "Medicine", "International Studies", "Political Science"]
    },
    {
        name: "Korea University",
        shortName: "KU",
        domain: "korea.ac.kr",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/korea.svg",
        color: "#8C002B",
        address: "145 Anam-ro, Seongbuk-gu, Seoul, South Korea",
        departments: ["Business Administration", "Media & Communication", "International Studies", "Psychology", "Computer Science"]
    },

    // ===== GERMANY =====
    {
        name: "Technical University of Munich",
        shortName: "TUM",
        domain: "tum.de",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/tum_official.png",
        color: "#3070B3",
        address: "Arcisstraße 21, 80333 München, Germany",
        departments: ["Informatics", "Mechanical Engineering", "Electrical Engineering", "Physics", "Management"]
    },
    {
        name: "Ludwig Maximilian University of Munich",
        shortName: "LMU",
        domain: "lmu.de",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/lmu.svg",
        color: "#00883A",
        address: "Geschwister-Scholl-Platz 1, 80539 München, Germany",
        departments: ["Physics", "Chemistry", "Biology", "Medicine", "Law"]
    },

    // ===== SINGAPORE =====
    {
        name: "National University of Singapore",
        shortName: "NUS",
        domain: "nus.edu.sg",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/nus_official.png",
        color: "#EF7C00",
        address: "21 Lower Kent Ridge Rd, Singapore 119077",
        departments: ["Computer Science", "Engineering", "Business", "Medicine", "Law"]
    },
    {
        name: "Nanyang Technological University",
        shortName: "NTU",
        domain: "ntu.edu.sg",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/ntu_official.png",
        color: "#C20430",
        address: "50 Nanyang Ave, Singapore 639798",
        departments: ["Engineering", "Business", "Science", "Humanities", "Medicine"]
    },

    // ===== CHINA =====
    {
        name: "Tsinghua University",
        shortName: "Tsinghua",
        domain: "tsinghua.edu.cn",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/tsinghua.svg",
        color: "#660099",
        address: "30 Shuangqing Rd, Haidian District, Beijing, China",
        departments: ["Engineering", "Computer Science", "Physics", "Economics", "Architecture"]
    },
    {
        name: "Peking University",
        shortName: "PKU",
        domain: "pku.edu.cn",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/pku.svg",
        color: "#8B0000",
        address: "5 Yiheyuan Rd, Haidian District, Beijing, China",
        departments: ["Literature", "History", "Philosophy", "Science", "Economics"]
    },
    {
        name: "Fudan University",
        shortName: "Fudan",
        domain: "fudan.edu.cn",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/fudan.svg",
        color: "#003366",
        address: "220 Handan Rd, Yangpu District, Shanghai, China",
        departments: ["Journalism", "Economics", "Management", "Mathematics", "Medicine"]
    },

    // ===== AUSTRALIA =====
    {
        name: "The University of Melbourne",
        shortName: "UniMelb",
        domain: "unimelb.edu.au",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/unimelb_official.svg",
        color: "#094183",
        address: "Parkville VIC 3010, Australia",
        departments: ["Medicine", "Law", "Business", "Arts", "Engineering"]
    },
    {
        name: "Australian National University",
        shortName: "ANU",
        domain: "anu.edu.au",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/anu_official.png",
        color: "#BE830E",
        address: "Canberra ACT 2601, Australia",
        departments: ["Political Science", "International Relations", "Law", "Economics", "Asian Studies"]
    },
    {
        name: "The University of Sydney",
        shortName: "USYD",
        domain: "sydney.edu.au",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/usyd_official.png",
        color: "#E64626",
        address: "Camperdown NSW 2006, Australia",
        departments: ["Medicine", "Law", "Business", "Arts", "Engineering"]
    },

    // ===== VIETNAM =====
    {
        name: "Hanoi University of Science and Technology",
        shortName: "HUST",
        domain: "hust.edu.vn",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/hust.png",
        color: "#C8102E",
        address: "No. 1 Dai Co Viet, Hai Ba Trung, Hanoi, Vietnam",
        departments: ["Information Technology", "Computer Science", "Electronics & Telecommunications", "Mechanical Engineering", "Chemical Engineering"]
    },
    {
        name: "VNU University of Engineering and Technology",
        shortName: "VNU-UET",
        domain: "uet.vnu.edu.vn",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/uet.svg",
        color: "#003DA5",
        address: "144 Xuan Thuy, Cau Giay, Hanoi, Vietnam",
        departments: ["Computer Science", "Information Technology", "Electronics Engineering", "Data Science", "Network Engineering"]
    },
    {
        name: "VNU University of Information Technology",
        shortName: "VNU-UIT",
        domain: "uit.edu.vn",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/uit_official.png",
        color: "#0066CC",
        address: "Linh Trung Ward, Thu Duc District, Ho Chi Minh City, Vietnam",
        departments: ["Software Engineering", "Information Systems", "Network & Communications", "AI & Machine Learning", "Cybersecurity"]
    },
    {
        name: "FPT University",
        shortName: "FPT",
        domain: "fpt.edu.vn",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/fpt.jpg",
        color: "#FF6900",
        address: "Hoa Lac Hi-Tech Park, Km 29 Thang Long Blvd, Hanoi, Vietnam",
        departments: ["Software Engineering", "Information Technology", "Digital Marketing", "Business Administration", "Graphic Design"]
    },
    {
        name: "Posts and Telecommunications Institute of Technology",
        shortName: "PTIT",
        domain: "ptit.edu.vn",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/ptit.jpg",
        color: "#0052A5",
        address: "122 Hoang Quoc Viet, Cau Giay, Hanoi, Vietnam",
        departments: ["Telecommunications Engineering", "Information Technology", "Electronics Engineering", "Network Administration", "Computer Engineering"]
    },
    {
        name: "VNU University of Science",
        shortName: "HCMUS",
        domain: "hcmus.edu.vn",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/hcmus.png",
        color: "#003366",
        address: "227 Nguyen Van Cu, District 5, Ho Chi Minh City, Vietnam",
        departments: ["Information Technology", "Computer Science", "Data Science", "Mathematics", "Physics"]
    },

    // ===== INDIA =====
    {
        name: "Indian Institute of Technology Delhi",
        shortName: "IIT Delhi",
        domain: "iitd.ac.in",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/iitd_official.png",
        color: "#B31B1B",
        address: "Hauz Khas, New Delhi, Delhi 110016, India",
        departments: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Chemical Engineering"]
    },
    {
        name: "University of Mumbai",
        shortName: "Mumbai University",
        domain: "mu.ac.in",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/mumbai.svg",
        color: "#A6192E",
        address: "CST Road, Kalina, Santacruz East, Mumbai, Maharashtra 400098, India",
        departments: ["Commerce", "Arts", "Science", "Law", "Engineering"]
    },

    // ===== FRANCE =====
    {
        name: "École Polytechnique",
        shortName: "X",
        domain: "polytechnique.edu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/polytechnique.svg",
        color: "#CE2029",
        address: "Route de Saclay, 91128 Palaiseau, France",
        departments: ["Mathematics", "Physics", "Computer Science", "Economics", "Mechanics"]
    },
    {
        name: "PSL Research University",
        shortName: "PSL",
        domain: "psl.eu",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/psl.svg",
        color: "#000000",
        address: "60 Rue Mazarine, 75006 Paris, France",
        departments: ["Science", "Engineering", "Humanities", "Social Sciences", "Arts"]
    },

    // ===== BRAZIL =====
    {
        name: "University of São Paulo",
        shortName: "USP",
        domain: "usp.br",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/usp.svg",
        color: "#0055A4",
        address: "Butantã, São Paulo - State of São Paulo, Brazil",
        departments: ["Engineering", "Medicine", "Law", "Architecture", "Economics"]
    },
    {
        name: "University of Campinas",
        shortName: "Unicamp",
        domain: "unicamp.br",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/unicamp_official.png",
        color: "#CC0000",
        address: "Cidade Universitária, Campinas - SP, Brazil",
        departments: ["Engineering", "Physics", "Medicine", "Biology", "Computer Science"]
    },
    {
        name: "Federal University of Rio de Janeiro",
        shortName: "UFRJ",
        domain: "ufrj.br",
        logo: "https://thanhnguyxn.github.io/student-card-generator/img/logos/ufrj.svg",
        color: "#003399",
        address: "Cidade Universitária, Rio de Janeiro - RJ, Brazil",
        departments: ["Engineering", "Medicine", "Law", "Architecture", "Economics"]
    }
];

// Get random university
export function getRandomUniversity() {
    return UNIVERSITIES[Math.floor(Math.random() * UNIVERSITIES.length)];
}

// Get university by index (for deterministic selection based on hash)
export function getUniversityByIndex(index) {
    return UNIVERSITIES[index % UNIVERSITIES.length];
}

// Get university by name
export function getUniversityByName(name) {
    return UNIVERSITIES.find(u => u.name === name || u.shortName === name) || UNIVERSITIES[0];
}

// Get university index from hash (deterministic based on name)
export function getUniversityFromHash(hashString) {
    const hash = hashString.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return UNIVERSITIES[hash % UNIVERSITIES.length];
}

export default UNIVERSITIES;
