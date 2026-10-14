export type UserRole = 'guest' | 'student' | 'faculty' | 'admin';

export type PublicTab = 
  | 'home' 
  | 'about' 
  | 'departments' 
  | 'courses' 
  | 'admissions' 
  | 'fees' 
  | 'placements' 
  | 'events-notices' 
  | 'gallery' 
  | 'contact';

export type StudentTab = 
  | 'overview' 
  | 'attendance' 
  | 'marks' 
  | 'timetable' 
  | 'materials' 
  | 'fees' 
  | 'leave';

export type FacultyTab = 'attendance' | 'marks' | 'materials' | 'students';

export type AdminTab = 'notices' | 'leaves' | 'admissions' | 'users';

export interface Department {
  id: string;
  name: string;
  shortName: string;
  code: string;
  hodName: string;
  hodQualification: string;
  description: string;
  intake: number;
  established: number;
  laboratories: string[];
  keySpecializations: string[];
}

export interface Course {
  id: string;
  title: string;
  degree: string;
  department: string;
  durationYears: number;
  totalSemesters: number;
  annualFee: number;
  eligibility: string;
  seats: number;
  syllabusHighlights: string[];
}

export interface Notice {
  id: string;
  title: string;
  category: 'Academic' | 'Examination' | 'Placement' | 'General' | 'Event';
  date: string;
  content: string;
  author: string;
  isImportant: boolean;
  referenceNo: string;
  attachmentName?: string;
}

export interface CollegeEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: 'Tech Fest' | 'Workshop' | 'Cultural' | 'Sports' | 'Seminar';
  description: string;
  registrationOpen: boolean;
}

export interface AttendanceSubject {
  code: string;
  name: string;
  attended: number;
  total: number;
  faculty: string;
}

export interface GradeSubject {
  code: string;
  name: string;
  credits: number;
  internalMarks: number; // out of 30
  midTermMarks: number;   // out of 30
  endTermMarks: number;   // out of 40
  totalMarks: number;     // out of 100
  letterGrade: string;
  gradePoint: number;
}

export interface TimetableSlot {
  time: string;
  subjectCode: string;
  subjectName: string;
  faculty: string;
  room: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
}

export interface StudyMaterial {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  unit: string;
  uploadedBy: string;
  uploadDate: string;
  fileSize: string;
  fileType: 'PDF' | 'PPT' | 'ZIP';
}

export interface Assignment {
  id: string;
  title: string;
  subjectName: string;
  dueDate: string;
  maxMarks: number;
  description: string;
  status: 'Pending' | 'Submitted' | 'Graded';
  submittedDate?: string;
  obtainedMarks?: number;
}

export interface FeeRecord {
  semester: string;
  academicYear: string;
  tuitionFee: number;
  examFee: number;
  libraryFee: number;
  status: 'Paid' | 'Pending' | 'Partial';
  receiptNo?: string;
  paymentDate?: string;
}

export interface LeaveRequest {
  id: string;
  studentName: string;
  rollNo: string;
  leaveType: 'Medical' | 'Personal' | 'Academic Event' | 'Other';
  startDate: string;
  endDate: string;
  reason: string;
  appliedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  remarks?: string;
}

export interface AdmissionInquiry {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  courseInterested: string;
  twelfthMarksPercentage: number;
  state: string;
  date: string;
  status: 'New' | 'Contacted' | 'Approved';
}

export interface StudentProfile {
  name: string;
  rollNo: string;
  registrationNo: string;
  program: string;
  department: string;
  semester: number;
  batch: string;
  email: string;
  phone: string;
  bloodGroup: string;
  advisor: string;
  cgpa: number;
  sgpaLatest: number;
  totalCreditsEarned: number;
}
