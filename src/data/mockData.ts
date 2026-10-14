import { 
  Department, 
  Course, 
  Notice, 
  CollegeEvent, 
  AttendanceSubject, 
  GradeSubject, 
  TimetableSlot, 
  StudyMaterial, 
  Assignment, 
  FeeRecord, 
  LeaveRequest, 
  StudentProfile, 
  AdmissionInquiry 
} from '../types';

export const COLLEGE_INFO = {
  name: 'Apex Institute of Technology',
  shortName: 'AIT',
  tagline: 'Excellence in Engineering, Innovation & Research',
  established: 1998,
  affiliation: 'Autonomous Institution · Affiliated to State Tech University · Approved by AICTE, New Delhi',
  accreditation: 'NAAC A++ Grade (CGPA 3.74/4.0) · NBA Accredited Branches',
  address: 'Tech Innovation Enclave, Knowledge City, Sector 14, Hyderabad, Telangana 500081',
  phone: '+91 (040) 2345-6789 / 2345-6790',
  admissionsHelpline: '+91 98480 12345',
  email: 'info@apexinstitute.edu.in',
  admissionsEmail: 'admissions@apexinstitute.edu.in',
  principal: 'Dr. K. V. Ramanathan, Ph.D. (IIT Madras)',
  deanAcademics: 'Dr. Anita Deshmukh, Ph.D. (IISc Bangalore)',
};

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: 'Rahul Sharma',
  rollNo: '24CS042',
  registrationNo: 'AIT2024CSE0142',
  program: 'B.Tech Computer Science & Engineering',
  department: 'Computer Science & Engineering',
  semester: 2,
  batch: '2024 - 2028',
  email: 'rahul.24cs042@student.apexinstitute.edu.in',
  phone: '+91 98765 43210',
  bloodGroup: 'B+',
  advisor: 'Dr. Sunita Rao, Associate Prof., CSE',
  cgpa: 8.65,
  sgpaLatest: 8.72,
  totalCreditsEarned: 44,
};

export const DEPARTMENTS_DATA: Department[] = [
  {
    id: 'cse',
    name: 'Computer Science & Engineering',
    shortName: 'CSE',
    code: 'CS',
    hodName: 'Dr. Sunita Rao',
    hodQualification: 'Ph.D. (IIT Bombay), M.Tech (NITK)',
    description: 'Equipping students with deep algorithmic thinking, software engineering rigor, systems architecture, and cutting-edge computing skills.',
    intake: 180,
    established: 1998,
    laboratories: [
      'Advanced Data Structures & Algorithms Lab',
      'High-Performance Cloud Computing Facility',
      'Open Source Software & Linux Lab',
      'Database Systems & Big Data Center'
    ],
    keySpecializations: ['Full Stack Web Architecture', 'Distributed Systems', 'Cybersecurity', 'Cloud Infrastructure']
  },
  {
    id: 'aids',
    name: 'Artificial Intelligence & Data Science',
    shortName: 'AI & DS',
    code: 'AD',
    hodName: 'Dr. Rajesh Nair',
    hodQualification: 'Ph.D. (IIIT Hyderabad)',
    description: 'Pioneering intelligent systems, machine learning engineering, computer vision, natural language processing, and deep predictive analytics.',
    intake: 120,
    established: 2020,
    laboratories: [
      'NVIDIA GPU Computing & Deep Learning Lab',
      'Computer Vision & Autonomous Systems Center',
      'Natural Language Processing & Speech Lab'
    ],
    keySpecializations: ['Deep Neural Networks', 'Generative AI & LLMs', 'Robotic Vision', 'Statistical Machine Learning']
  },
  {
    id: 'ece',
    name: 'Electronics & Communication Engineering',
    shortName: 'ECE',
    code: 'EC',
    hodName: 'Dr. P. Venkatasubramanian',
    hodQualification: 'Ph.D. (IIT Kharagpur)',
    description: 'Bridging the physical and digital domains with VLSI design, wireless communications, edge IoT, and signal processing.',
    intake: 120,
    established: 1998,
    laboratories: [
      'Cadence VLSI Chip Design Suite',
      '5G & RF Microwave Engineering Lab',
      'Embedded IoT & Microcontrollers Center'
    ],
    keySpecializations: ['VLSI Circuit Design', 'IoT Sensor Networks', 'Robotics Hardware', 'Signal Processing']
  },
  {
    id: 'me',
    name: 'Mechanical Engineering',
    shortName: 'ME',
    code: 'ME',
    hodName: 'Dr. Anand Kulkarni',
    hodQualification: 'Ph.D. (IIT Roorkee)',
    description: 'Empowering future automotive, aerospace, and energy innovators through solid mechanics, robotics, thermodynamics, and additive manufacturing.',
    intake: 60,
    established: 2002,
    laboratories: [
      'CAD / CAM & Rapid Prototyping (3D Printing) Lab',
      'Thermal & Fluid Dynamics Facility',
      'Mechatronics & Industrial Automation Center'
    ],
    keySpecializations: ['Robotics & Mechatronics', 'Electric Vehicle Powertrains', 'Computational Fluid Dynamics', 'Renewable Energy']
  },
  {
    id: 'ce',
    name: 'Civil Engineering',
    shortName: 'CE',
    code: 'CE',
    hodName: 'Dr. Meera Nambiar',
    hodQualification: 'Ph.D. (IIT Delhi)',
    description: 'Building sustainable infrastructure, smart transportation systems, resilient structural engineering, and environmental stewardship.',
    intake: 60,
    established: 2005,
    laboratories: [
      'Advanced Structural Testing Center',
      'Geotechnical & Soil Mechanics Lab',
      'GIS & Remote Sensing Surveying Center'
    ],
    keySpecializations: ['Smart Cities Infrastructure', 'Earthquake Resistant Structures', 'Geotechnical Engineering', 'Water Resources']
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: 'btech-cse',
    title: 'B.Tech in Computer Science & Engineering',
    degree: 'B.Tech',
    department: 'Computer Science & Engineering',
    durationYears: 4,
    totalSemesters: 8,
    annualFee: 145000,
    eligibility: '10+2 with Physics, Mathematics & Chemistry (Min 60%) + Valid State CET / JEE Main Score',
    seats: 180,
    syllabusHighlights: [
      'Programming in C & Data Structures',
      'Object Oriented Programming with Python & Java',
      'Operating Systems & Computer Architecture',
      'Database Management Systems & SQL',
      'Web Development & Cloud Computing',
      'Design & Analysis of Algorithms',
      'Artificial Intelligence & Machine Learning'
    ]
  },
  {
    id: 'btech-aids',
    title: 'B.Tech in AI & Data Science',
    degree: 'B.Tech',
    department: 'Artificial Intelligence & Data Science',
    durationYears: 4,
    totalSemesters: 8,
    annualFee: 155000,
    eligibility: '10+2 with Physics, Mathematics & Chemistry (Min 60%) + Valid State CET / JEE Main Score',
    seats: 120,
    syllabusHighlights: [
      'Mathematical Foundations for Machine Learning',
      'Python for Data Science & Pandas',
      'Applied Deep Learning & Neural Networks',
      'Computer Vision & Image Processing',
      'Natural Language Processing',
      'Big Data Analytics with Apache Spark'
    ]
  },
  {
    id: 'btech-ece',
    title: 'B.Tech in Electronics & Communication Engineering',
    degree: 'B.Tech',
    department: 'Electronics & Communication Engineering',
    durationYears: 4,
    totalSemesters: 8,
    annualFee: 135000,
    eligibility: '10+2 with PCM (Min 60%) + Valid CET / JEE Main Rank',
    seats: 120,
    syllabusHighlights: [
      'Electronic Devices & Circuit Theory',
      'Digital Logic & Microprocessors',
      'Signals & Systems / Digital Signal Processing',
      'Analog & Digital Communications',
      'VLSI Design with Verilog / VHDL',
      'Internet of Things & Embedded C'
    ]
  },
  {
    id: 'mtech-cse',
    title: 'M.Tech in Advanced Computer Science',
    degree: 'M.Tech',
    department: 'Computer Science & Engineering',
    durationYears: 2,
    totalSemesters: 4,
    annualFee: 120000,
    eligibility: 'B.Tech / B.E. in CSE/IT/ECE with Min 55% + Valid GATE / State PGECET Score',
    seats: 24,
    syllabusHighlights: [
      'Advanced Algorithms & Computational Complexity',
      'Distributed Systems & Microservices',
      'Cloud Architecture & Virtualization',
      'Research Methodology & Master Thesis Dissertation'
    ]
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'not-01',
    title: 'End-Term Semester II Examination Schedule & Hall Ticket Notification',
    category: 'Examination',
    date: '2026-10-10',
    referenceNo: 'AIT/COE/2026/142',
    author: 'Controller of Examinations',
    isImportant: true,
    content: 'All First Year B.Tech students (2024-2028 batch) are informed that End-Term Semester II Practical and Theory Examinations will commence from November 12, 2026. Hall tickets can be downloaded from the Student Portal after fee clearance by October 31, 2026.',
    attachmentName: 'Circular_EndTerm_Schedule_2026.pdf'
  },
  {
    id: 'not-02',
    title: 'Annual Technical Symposium "InnoTech 2026" & Hackathon Registrations Open',
    category: 'Event',
    date: '2026-10-08',
    referenceNo: 'AIT/TECH/2026/089',
    author: 'Dean of Student Affairs',
    isImportant: true,
    content: 'Apex Institute of Technology is pleased to announce its flagship National Tech Symposium "InnoTech 2026" featuring a 36-Hour Hackathon, Robotics Arena, Paper Presentations, and Coding Challenge with a prize pool of ₹3,50,000. Registration open for all branches.',
    attachmentName: 'InnoTech_2026_Brochure_Rules.pdf'
  },
  {
    id: 'not-03',
    title: 'Campus Recruitment Drive: Tier-1 Technology Firms Visiting Campus',
    category: 'Placement',
    date: '2026-10-05',
    referenceNo: 'AIT/TPO/2026/054',
    author: 'Training & Placement Officer',
    isImportant: false,
    content: 'Phase-1 Campus Placement Drives begin from next week. Eligible 3rd and 4th year students must verify their CGPA and resume uploads on the T&P portal. Mandatory mock technical interviews and resume clinics will be held on Saturday.',
    attachmentName: 'Placement_Company_List_Schedule.pdf'
  },
  {
    id: 'not-04',
    title: 'Academic Notice: 75% Minimum Attendance Requirement for Final Exams',
    category: 'Academic',
    date: '2026-09-28',
    referenceNo: 'AIT/ACAD/2026/310',
    author: 'Dean of Academic Affairs',
    isImportant: true,
    content: 'Students are sternly reminded that as per Autonomous College Regulations and AICTE guidelines, a minimum of 75% aggregate attendance is mandatory to appear for Semester End Examinations. Condonation up to 10% is granted strictly on approved medical grounds.',
    attachmentName: 'Attendance_Rules_Notification.pdf'
  },
  {
    id: 'not-05',
    title: 'Hostel Night Curfew and Central Library Extended Hours during Exams',
    category: 'General',
    date: '2026-09-25',
    referenceNo: 'AIT/ADM/2026/212',
    author: 'Chief Warden & Librarian',
    isImportant: false,
    content: 'In view of forthcoming examinations, the Central Digital Library reading halls will remain open until 11:30 PM on all working days and Sundays. High-speed Wi-Fi and reference desks will be staffed.',
    attachmentName: 'Library_Extended_Timings.pdf'
  }
];

export const UPCOMING_EVENTS: CollegeEvent[] = [
  {
    id: 'ev-01',
    title: 'InnoTech 2026 - National Tech Fest & Hackathon',
    date: '2026-11-05',
    time: '09:00 AM - 08:00 PM',
    venue: 'Campus Innovation Arena & CS Auditorium',
    category: 'Tech Fest',
    description: 'Flagship 36-hour hackathon, robotics wars, code golf, and guest keynotes by industry tech leaders.',
    registrationOpen: true
  },
  {
    id: 'ev-02',
    title: 'Hands-on Workshop: Building Full-Stack Apps with Python & Django',
    date: '2026-10-24',
    time: '10:00 AM - 04:00 PM',
    venue: 'Computer Center Lab 3',
    category: 'Workshop',
    description: 'Exclusive hands-on bootcamp for First Year CSE students on developing real-world web apps with Django, SQLite, and responsive Bootstrap/Tailwind UI.',
    registrationOpen: true
  },
  {
    id: 'ev-03',
    title: 'Apex Inter-Collegiate Sports Championship (AIT Cup 2026)',
    date: '2026-11-20',
    time: '08:00 AM - 06:00 PM',
    venue: 'University Sports Complex & Stadium',
    category: 'Sports',
    description: 'Annual sports meet featuring Cricket, Football, Basketball, Badminton, and Table Tennis competitions across 24 participating engineering colleges.',
    registrationOpen: false
  }
];

export const STUDENT_ATTENDANCE: AttendanceSubject[] = [
  { code: 'CS201', name: 'Data Structures & Algorithms', attended: 42, total: 48, faculty: 'Dr. Sunita Rao' },
  { code: 'CS202', name: 'Discrete Mathematics', attended: 38, total: 44, faculty: 'Prof. K. Narayana' },
  { code: 'CS203', name: 'Computer Organization & Architecture', attended: 33, total: 42, faculty: 'Prof. R. Sengupta' },
  { code: 'CS204', name: 'Python & Object Oriented Programming', attended: 26, total: 28, faculty: 'Dr. A. Verma' },
  { code: 'CS205', name: 'Digital Logic Design & Microprocessors', attended: 24, total: 34, faculty: 'Prof. P. Venkat' },
  { code: 'CS208', name: 'DSA & Python Practice Laboratory', attended: 15, total: 16, faculty: 'Er. S. Mehra' },
];

export const STUDENT_GRADES_SEM1: GradeSubject[] = [
  { code: 'CS101', name: 'Problem Solving & Programming in C', credits: 4, internalMarks: 28, midTermMarks: 27, endTermMarks: 36, totalMarks: 91, letterGrade: 'A+', gradePoint: 10 },
  { code: 'MA101', name: 'Engineering Mathematics I (Calculus & Linear Algebra)', credits: 4, internalMarks: 26, midTermMarks: 25, endTermMarks: 33, totalMarks: 84, letterGrade: 'A', gradePoint: 9 },
  { code: 'PH101', name: 'Applied Engineering Physics', credits: 3, internalMarks: 27, midTermMarks: 24, endTermMarks: 32, totalMarks: 83, letterGrade: 'A', gradePoint: 9 },
  { code: 'EE101', name: 'Basic Electrical & Electronics Engineering', credits: 3, internalMarks: 25, midTermMarks: 22, endTermMarks: 31, totalMarks: 78, letterGrade: 'B+', gradePoint: 8 },
  { code: 'CS102', name: 'C Programming Laboratory', credits: 2, internalMarks: 29, midTermMarks: 29, endTermMarks: 38, totalMarks: 96, letterGrade: 'O', gradePoint: 10 },
  { code: 'EN101', name: 'Professional English & Technical Writing', credits: 2, internalMarks: 26, midTermMarks: 26, endTermMarks: 33, totalMarks: 85, letterGrade: 'A', gradePoint: 9 },
];

export const TIMETABLE_DAYS: { [day: string]: TimetableSlot[] } = {
  'Monday': [
    { time: '09:00 - 10:00 AM', subjectCode: 'CS201', subjectName: 'Data Structures & Algorithms', faculty: 'Dr. Sunita Rao', room: 'CS-302', type: 'Lecture' },
    { time: '10:00 - 11:00 AM', subjectCode: 'CS202', subjectName: 'Discrete Mathematics', faculty: 'Prof. K. Narayana', room: 'CS-302', type: 'Lecture' },
    { time: '11:15 - 12:15 PM', subjectCode: 'CS203', subjectName: 'Computer Org & Architecture', faculty: 'Prof. R. Sengupta', room: 'CS-302', type: 'Lecture' },
    { time: '01:15 - 03:15 PM', subjectCode: 'CS208', subjectName: 'Data Structures Lab (Batch A)', faculty: 'Dr. Sunita Rao', room: 'Lab 2', type: 'Lab' },
    { time: '03:30 - 04:30 PM', subjectCode: 'CS204', subjectName: 'Python OOP', faculty: 'Dr. A. Verma', room: 'CS-302', type: 'Lecture' }
  ],
  'Tuesday': [
    { time: '09:00 - 10:00 AM', subjectCode: 'CS205', subjectName: 'Digital Logic Design', faculty: 'Prof. P. Venkat', room: 'CS-302', type: 'Lecture' },
    { time: '10:00 - 11:00 AM', subjectCode: 'CS201', subjectName: 'Data Structures & Algorithms', faculty: 'Dr. Sunita Rao', room: 'CS-302', type: 'Lecture' },
    { time: '11:15 - 12:15 PM', subjectCode: 'CS204', subjectName: 'Python OOP Tutorial', faculty: 'Dr. A. Verma', room: 'CS-302', type: 'Tutorial' },
    { time: '01:15 - 02:15 PM', subjectCode: 'CS202', subjectName: 'Discrete Mathematics', faculty: 'Prof. K. Narayana', room: 'CS-302', type: 'Lecture' },
    { time: '02:15 - 04:15 PM', subjectCode: 'LIB', subjectName: 'Central Library & Research Hour', faculty: 'Faculty In-Charge', room: 'Central Lib', type: 'Tutorial' }
  ],
  'Wednesday': [
    { time: '09:00 - 10:00 AM', subjectCode: 'CS203', subjectName: 'Computer Org & Architecture', faculty: 'Prof. R. Sengupta', room: 'CS-302', type: 'Lecture' },
    { time: '10:00 - 11:00 AM', subjectCode: 'CS205', subjectName: 'Digital Logic Design', faculty: 'Prof. P. Venkat', room: 'CS-302', type: 'Lecture' },
    { time: '11:15 - 01:15 PM', subjectCode: 'CS209', subjectName: 'Python Programming Lab', faculty: 'Dr. A. Verma', room: 'Lab 4', type: 'Lab' },
    { time: '02:00 - 03:00 PM', subjectCode: 'CS201', subjectName: 'Data Structures & Algorithms', faculty: 'Dr. Sunita Rao', room: 'CS-302', type: 'Lecture' },
    { time: '03:15 - 04:15 PM', subjectCode: 'CS202', subjectName: 'Discrete Math Problem Solving', faculty: 'Prof. K. Narayana', room: 'CS-302', type: 'Tutorial' }
  ],
  'Thursday': [
    { time: '09:00 - 10:00 AM', subjectCode: 'CS204', subjectName: 'Python OOP', faculty: 'Dr. A. Verma', room: 'CS-302', type: 'Lecture' },
    { time: '10:00 - 11:00 AM', subjectCode: 'CS201', subjectName: 'Data Structures Tutorial', faculty: 'Dr. Sunita Rao', room: 'CS-302', type: 'Tutorial' },
    { time: '11:15 - 12:15 PM', subjectCode: 'CS205', subjectName: 'Digital Logic Design', faculty: 'Prof. P. Venkat', room: 'CS-302', type: 'Lecture' },
    { time: '01:15 - 03:15 PM', subjectCode: 'EC208', subjectName: 'Digital Electronics Lab', faculty: 'Prof. P. Venkat', room: 'Hardware Lab', type: 'Lab' },
    { time: '03:30 - 04:30 PM', subjectCode: 'SPORTS', subjectName: 'Physical Education & Games', faculty: 'Coach Sharma', room: 'Sports Complex', type: 'Tutorial' }
  ],
  'Friday': [
    { time: '09:00 - 10:00 AM', subjectCode: 'CS202', subjectName: 'Discrete Mathematics', faculty: 'Prof. K. Narayana', room: 'CS-302', type: 'Lecture' },
    { time: '10:00 - 11:00 AM', subjectCode: 'CS203', subjectName: 'Computer Org & Architecture', faculty: 'Prof. R. Sengupta', room: 'CS-302', type: 'Lecture' },
    { time: '11:15 - 12:15 PM', subjectCode: 'CS204', subjectName: 'Python OOP', faculty: 'Dr. A. Verma', room: 'CS-302', type: 'Lecture' },
    { time: '01:15 - 02:45 PM', subjectCode: 'SEMINAR', subjectName: 'Technical Seminar & Soft Skills', faculty: 'Dr. Sunita Rao', room: 'Seminar Hall 1', type: 'Lecture' },
    { time: '03:00 - 04:30 PM', subjectCode: 'CLUB', subjectName: 'Coding Club / IEEE Student Branch', faculty: 'Student Leads', room: 'CS-302', type: 'Tutorial' }
  ]
};

export const INITIAL_STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-01',
    title: 'Unit 3: Balanced Trees (AVL Trees & Red-Black Trees Complete Notes)',
    subjectCode: 'CS201',
    subjectName: 'Data Structures & Algorithms',
    unit: 'Unit 3',
    uploadedBy: 'Dr. Sunita Rao',
    uploadDate: '2026-10-09',
    fileSize: '4.2 MB',
    fileType: 'PDF'
  },
  {
    id: 'mat-02',
    title: 'Python Classes, Inheritance & Dunder Methods Lecture Deck',
    subjectCode: 'CS204',
    subjectName: 'Python OOP',
    unit: 'Unit 2',
    uploadedBy: 'Dr. A. Verma',
    uploadDate: '2026-10-07',
    fileSize: '6.8 MB',
    fileType: 'PPT'
  },
  {
    id: 'mat-03',
    title: 'Graph Algorithms Code Implementations (Dijkstra, Prim, Kruskal in C & Python)',
    subjectCode: 'CS201',
    subjectName: 'Data Structures & Algorithms',
    unit: 'Unit 4',
    uploadedBy: 'Dr. Sunita Rao',
    uploadDate: '2026-10-04',
    fileSize: '1.8 MB',
    fileType: 'ZIP'
  },
  {
    id: 'mat-04',
    title: 'Boolean Algebra Simplification & Karnaugh Map (K-Map) Problem Workbook',
    subjectCode: 'CS205',
    subjectName: 'Digital Logic Design',
    unit: 'Unit 1 & 2',
    uploadedBy: 'Prof. P. Venkat',
    uploadDate: '2026-09-30',
    fileSize: '3.1 MB',
    fileType: 'PDF'
  },
  {
    id: 'mat-05',
    title: 'Previous 5-Year Solved Question Papers for Semester II',
    subjectCode: 'ALL',
    subjectName: 'B.Tech CSE Semester II',
    unit: 'Units 1-5',
    uploadedBy: 'Department Academic Cell',
    uploadDate: '2026-09-22',
    fileSize: '14.5 MB',
    fileType: 'PDF'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-01',
    title: 'Assignment 3: Implement AVL Tree Self-Balancing Rotations in C',
    subjectName: 'Data Structures & Algorithms (CS201)',
    dueDate: '2026-10-20',
    maxMarks: 20,
    description: 'Write complete, memory-leak free C code implementing LL, RR, LR, and RL rotations. Include print traversal function.',
    status: 'Pending'
  },
  {
    id: 'asg-02',
    title: 'Assignment 2: Object-Oriented Banking System using Python OOP',
    subjectName: 'Python & OOP (CS204)',
    dueDate: '2026-10-15',
    maxMarks: 20,
    description: 'Develop a modular banking console simulation utilizing inheritance, encapsulation, and custom exception handling.',
    status: 'Submitted',
    submittedDate: '2026-10-11'
  },
  {
    id: 'asg-03',
    title: 'Assignment 1: Propositional Logic Proofs & Truth Tables',
    subjectName: 'Discrete Mathematics (CS202)',
    dueDate: '2026-09-28',
    maxMarks: 20,
    description: 'Solve the 10 formal proof problems using modus ponens, resolution, and induction principles.',
    status: 'Graded',
    submittedDate: '2026-09-26',
    obtainedMarks: 19
  }
];

export const STUDENT_FEES: FeeRecord[] = [
  {
    semester: 'Semester II (Current)',
    academicYear: '2024-2025',
    tuitionFee: 72500,
    examFee: 2500,
    libraryFee: 1500,
    status: 'Paid',
    receiptNo: 'AIT-REC-2025-0842',
    paymentDate: '2025-01-14'
  },
  {
    semester: 'Semester I',
    academicYear: '2024-2025',
    tuitionFee: 72500,
    examFee: 2500,
    libraryFee: 3000,
    status: 'Paid',
    receiptNo: 'AIT-REC-2024-0112',
    paymentDate: '2024-08-02'
  },
  {
    semester: 'Semester III (Upcoming)',
    academicYear: '2025-2026',
    tuitionFee: 75000,
    examFee: 2500,
    libraryFee: 1500,
    status: 'Pending'
  }
];

export const INITIAL_LEAVES: LeaveRequest[] = [
  {
    id: 'lv-01',
    studentName: 'Rahul Sharma',
    rollNo: '24CS042',
    leaveType: 'Medical',
    startDate: '2026-09-18',
    endDate: '2026-09-20',
    reason: 'Suffering from viral fever and prescribed 3 days clinical rest by doctor.',
    appliedDate: '2026-09-17',
    status: 'Approved',
    remarks: 'Approved by Dr. Sunita Rao. Medical certificate verified.'
  },
  {
    id: 'lv-02',
    studentName: 'Rahul Sharma',
    rollNo: '24CS042',
    leaveType: 'Academic Event',
    startDate: '2026-10-28',
    endDate: '2026-10-29',
    reason: 'Selected as finalist to present paper at IEEE All-India Student Congress at IIT Hyderabad.',
    appliedDate: '2026-10-11',
    status: 'Pending'
  }
];

export const INITIAL_ADMISSION_INQUIRIES: AdmissionInquiry[] = [
  {
    id: 'inq-01',
    studentName: 'Pooja Reddy',
    email: 'pooja.reddy@gmail.com',
    phone: '+91 94401 23456',
    courseInterested: 'B.Tech Computer Science & Engineering',
    twelfthMarksPercentage: 94.2,
    state: 'Telangana',
    date: '2026-10-11',
    status: 'New'
  },
  {
    id: 'inq-02',
    studentName: 'Aditya Verma',
    email: 'aditya.v@outlook.com',
    phone: '+91 98850 67890',
    courseInterested: 'B.Tech in AI & Data Science',
    twelfthMarksPercentage: 88.5,
    state: 'Andhra Pradesh',
    date: '2026-10-10',
    status: 'Contacted'
  }
];

export const RECRUITERS = [
  { name: 'Google', tier: 'Dream Tier', packages: '₹38 - ₹44 LPA' },
  { name: 'Microsoft', tier: 'Dream Tier', packages: '₹40 - ₹43 LPA' },
  { name: 'Amazon', tier: 'Dream Tier', packages: '₹32 - ₹42 LPA' },
  { name: 'Oracle', tier: 'Super Dream', packages: '₹18 - ₹24 LPA' },
  { name: 'Cisco', tier: 'Super Dream', packages: '₹17 - ₹22 LPA' },
  { name: 'Deloitte', tier: 'Dream Tier', packages: '₹10 - ₹14 LPA' },
  { name: 'TCS Digital', tier: 'Core IT', packages: '₹7.5 - ₹9 LPA' },
  { name: 'Infosys Power', tier: 'Core IT', packages: '₹6.5 - ₹9.5 LPA' },
  { name: 'Accenture', tier: 'Core IT', packages: '₹6.5 - ₹8.5 LPA' }
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'Main Academic Block & Innovation Lawn',
    category: 'Campus',
    tag: 'Architectural View'
  },
  {
    id: 'gal-2',
    title: 'NVIDIA GPU Accelerated AI Laboratory',
    category: 'Labs',
    tag: 'Department of CSE & AI'
  },
  {
    id: 'gal-3',
    title: 'Central Digital Library & Research Atrium',
    category: 'Library',
    tag: 'Knowledge Resource Center'
  },
  {
    id: 'gal-4',
    title: 'Annual InnoTech National Hackathon Arena',
    category: 'Events',
    tag: '36-Hour Hackathon'
  },
  {
    id: 'gal-5',
    title: 'Robotics & Embedded Systems Research Wing',
    category: 'Labs',
    tag: 'Hardware & IoT'
  },
  {
    id: 'gal-6',
    title: 'Convocation Ceremony at University Auditorium',
    category: 'Events',
    tag: 'Graduation Class'
  }
];
