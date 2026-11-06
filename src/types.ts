export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  rollNo?: string;
  employeeId?: string;
  year?: '1st Year' | '2nd Year' | '3rd Year';
  department: string;
  program: string;
  shift: 'Morning' | 'Self Finance';
  avatar?: string;
  phone?: string;
  bloodGroup?: string;
  address?: string;
  guardianName?: string;
  designation?: string;
  officeRoom?: string;
  specialization?: string;
}

export interface TimetableSlot {
  lectureNo: number;
  timeSlot: string;
  courseCode: string;
  courseTitle: string;
  type: 'T' | 'P' | 'T,P';
  instructor: string;
  venue: string;
}

export interface DaySchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  slots: TimetableSlot[];
}

export interface YearTimetable {
  year: '1st Year CIT' | '2nd Year CIT' | '3rd Year CIT';
  schedule: DaySchedule[];
}

export interface Course {
  code: string;
  title: string;
  year: '1st Year' | '2nd Year' | '3rd Year';
  creditHours: string;
  theoryHours: number;
  practicalHours: number;
  instructor: string;
  venue: string;
  description: string;
  syllabus: string[];
  recommendedBooks: string[];
}

export interface Assignment {
  id: string;
  courseCode: string;
  courseTitle: string;
  title: string;
  description: string;
  dueDate: string;
  totalMarks: number;
  obtainedMarks?: number;
  status: 'Pending' | 'Submitted' | 'Graded';
  submissionDate?: string;
  submissionNote?: string;
  fileAttachment?: string;
  instructor: string;
}

export interface AttendanceRecord {
  courseCode: string;
  courseTitle: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  lastUpdated: string;
  instructor: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: 'Exam' | 'Academic' | 'Holiday' | 'Fee' | 'General';
  content: string;
  isUrgent?: boolean;
}

export type NotificationType = 'class_shift' | 'class_end' | 'next_class' | 'break_time' | 'reminder';

export interface PortalNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface GradeDistribution {
  grade: string;
  range: string;
  gpa: number;
  studentCount: number;
  percentage: number;
}
