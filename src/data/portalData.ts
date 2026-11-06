import { 
  YearTimetable, 
  Course, 
  Assignment, 
  AttendanceRecord, 
  Announcement, 
  PortalNotification, 
  UserProfile,
  GradeDistribution
} from '../types';

export const COLLEGE_INFO = {
  name: 'Government College of Technology, Bhakkar',
  shortName: 'GCT Bhakkar',
  department: 'Computer Information Technology (CIT)',
  session: 'Self Finance (2026-27)',
  effectiveDate: '01-09-2026',
  timeTableIncharge: 'Prof. Muhammad Hasnain',
  hodCit: 'Engr. Mahmood Hassan',
  academicIncharge: 'Engr. Rao M. Haziq',
  location: 'D.G Khan Road, Bhakkar, Punjab, Pakistan',
  established: '1995',
  affiliation: 'Punjab Board of Technical Education (PBTE), Lahore / TEVTA',
};

export const DEFAULT_STUDENT_PROFILE: UserProfile = {
  id: 'std-24cit105',
  name: 'Aliyan Ansari',
  email: 'aliyanansari24cit105@gmail.com',
  role: 'student',
  rollNo: '24CIT105',
  year: '2nd Year',
  department: 'Computer Information Technology',
  program: 'Diploma of Associate Engineering (DAE CIT)',
  shift: 'Self Finance',
  phone: '+92 300 1234567',
  bloodGroup: 'B+',
  address: 'Bhakkar City, Punjab, Pakistan',
  guardianName: 'M. Ansari',
};

export const DEFAULT_TEACHER_PROFILE: UserProfile = {
  id: 'tch-cit01',
  name: 'Engr. Rao M. Haziq',
  email: 'rao.haziq@gctbhakkar.edu.pk',
  role: 'teacher',
  employeeId: 'GCT-CIT-F04',
  designation: 'Senior Instructor & Academic Incharge',
  department: 'Computer Information Technology',
  program: 'DAE Computer Information Technology',
  shift: 'Self Finance',
  officeRoom: 'Room-6 / Software Lab Cabin A',
  specialization: 'Database Systems & Computer Networks',
  phone: '+92 312 9876543',
};

export const FACULTY_DIRECTORY: UserProfile[] = [
  {
    id: 'tch-01',
    name: 'Engr. Mahmood Hassan',
    email: 'mahmood.hassan@gctbhakkar.edu.pk',
    role: 'teacher',
    employeeId: 'GCT-CIT-01',
    designation: 'HOD & Associate Professor',
    department: 'CIT',
    program: 'DAE CIT',
    shift: 'Self Finance',
    officeRoom: 'HOD Office / Computer Lab-1',
    specialization: 'Operating Systems & Computer Applications (CIT-114, CIT-314, CIT-372)',
    phone: '+92 301 5550101',
  },
  {
    id: 'tch-02',
    name: 'Engr. Rao M. Haziq',
    email: 'rao.haziq@gctbhakkar.edu.pk',
    role: 'teacher',
    employeeId: 'GCT-CIT-02',
    designation: 'Senior Instructor / Academic Incharge',
    department: 'CIT',
    program: 'DAE CIT',
    shift: 'Self Finance',
    officeRoom: 'Cabin 2, Computer Lab-1',
    specialization: 'Database Management Systems & Projects (CIT-204, CIT-392)',
    phone: '+92 302 5550202',
  },
  {
    id: 'tch-03',
    name: 'Mr. Ehsan Ullah',
    email: 'm.ehsan@gctbhakkar.edu.pk',
    role: 'teacher',
    employeeId: 'GCT-CIT-03',
    designation: 'Lecturer in Computer Science',
    department: 'CIT',
    program: 'DAE CIT',
    shift: 'Self Finance',
    officeRoom: 'Software Lab Faculty Desk',
    specialization: 'Web Development & Network Systems (CIT-203, CIT-293, CIT-313, CIT-381)',
    phone: '+92 303 5550303',
  },
  {
    id: 'tch-04',
    name: 'Engr. Muhammad Hasnain',
    email: 'm.hasnain@gctbhakkar.edu.pk',
    role: 'teacher',
    employeeId: 'GCT-CIT-04',
    designation: 'Instructor & Timetable Incharge',
    department: 'CIT',
    program: 'DAE CIT',
    shift: 'Self Finance',
    officeRoom: 'Electronics Lab / Room-6',
    specialization: 'Electronics & Microprocessors (CIT-124, CIT-273, CIT-343)',
    phone: '+92 304 5550404',
  },
  {
    id: 'tch-05',
    name: 'Engr. Ijaz Ahmad',
    email: 'ijaz.ahmad@gctbhakkar.edu.pk',
    role: 'teacher',
    employeeId: 'GCT-CIT-05',
    designation: 'Lecturer in CAD / Programming',
    department: 'CIT',
    program: 'DAE CIT',
    shift: 'Self Finance',
    officeRoom: 'Autocad Lab',
    specialization: 'AutoCAD, OOP & Multimedia (CIT-103, CIT-283, CIT-222, CIT-322)',
    phone: '+92 305 5550505',
  },
  {
    id: 'tch-06',
    name: 'Prof. Khuram Shahzad',
    email: 'khuram.shahzad@gctbhakkar.edu.pk',
    role: 'teacher',
    employeeId: 'GCT-GEN-06',
    designation: 'Assistant Professor (Mathematics)',
    department: 'Related Studies',
    program: 'DAE CIT',
    shift: 'Self Finance',
    officeRoom: 'Staff Room 2',
    specialization: 'Applied Mathematics (Math-123, Math-223)',
    phone: '+92 306 5550606',
  },
  {
    id: 'tch-07',
    name: 'Mr. Joun Abbas',
    email: 'joun.abbas@gctbhakkar.edu.pk',
    role: 'teacher',
    employeeId: 'GCT-ENG-07',
    designation: 'Lecturer in English',
    department: 'Related Studies',
    program: 'DAE CIT',
    shift: 'Self Finance',
    officeRoom: 'Room-6',
    specialization: 'Technical Report Writing (Eng-112)',
    phone: '+92 307 5550707',
  },
  {
    id: 'tch-08',
    name: 'Mr. Inyat Ali Khan',
    email: 'inyat.khan@gctbhakkar.edu.pk',
    role: 'teacher',
    employeeId: 'GCT-GEN-08',
    designation: 'Lecturer in Islamiat & Pak Studies',
    department: 'Related Studies',
    program: 'DAE CIT',
    shift: 'Self Finance',
    officeRoom: 'Staff Room 1',
    specialization: 'General Studies (Gen-111, Gen-211, Gen-311)',
    phone: '+92 308 5550808',
  }
];

export const TIMETABLES: YearTimetable[] = [
  {
    year: '1st Year CIT',
    schedule: [
      {
        day: 'Monday',
        slots: [
          { lectureNo: 1, timeSlot: '08:30 - 09:15', courseCode: 'CIT-114(P)', courseTitle: 'Computer Applications Lab', type: 'P', instructor: 'Mahmood-Ul-Hassan', venue: 'Computer Lab-1' },
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'CIT-114(P)', courseTitle: 'Computer Applications Lab', type: 'P', instructor: 'Mahmood-Ul-Hassan', venue: 'Computer Lab-1' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'CH-132(T,P)', courseTitle: 'Applied Chemistry', type: 'T,P', instructor: 'Zohaib Hassan', venue: 'Chemistry Lab' },
          { lectureNo: 4, timeSlot: '10:45 - 11:30', courseCode: 'CH-132(T,P)', courseTitle: 'Applied Chemistry', type: 'T,P', instructor: 'Zohaib Hassan', venue: 'Chemistry Lab' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'CIT-103(P)', courseTitle: 'AutoCAD Lab', type: 'P', instructor: 'Ijaz Ahmad', venue: 'Autocad Lab' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'CIT-103(P)', courseTitle: 'AutoCAD Lab', type: 'P', instructor: 'Ijaz Ahmad', venue: 'Autocad Lab' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'Eng-112', courseTitle: 'English Communication', type: 'T', instructor: 'Joun Abbas', venue: 'Room-6' },
          { lectureNo: 8, timeSlot: '02:15 - 03:00', courseCode: 'Math-123', courseTitle: 'Applied Mathematics-I', type: 'T', instructor: 'Khuram Shahzad', venue: 'Room-6' },
        ]
      },
      {
        day: 'Tuesday',
        slots: [
          { lectureNo: 1, timeSlot: '08:30 - 09:15', courseCode: 'CIT-114(P)', courseTitle: 'Computer Applications Lab', type: 'P', instructor: 'Mahmood-Ul-Hassan', venue: 'Computer Lab-1' },
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'CIT-114(P)', courseTitle: 'Computer Applications Lab', type: 'P', instructor: 'Mahmood-Ul-Hassan', venue: 'Computer Lab-1' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'CH-132(P)', courseTitle: 'Chemistry Practical', type: 'P', instructor: 'Zohaib Hassan', venue: 'Chemistry Lab' },
          { lectureNo: 4, timeSlot: '10:45 - 11:30', courseCode: 'CH-132(P)', courseTitle: 'Chemistry Practical', type: 'P', instructor: 'Zohaib Hassan', venue: 'Chemistry Lab' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'Phy-132(T,P)', courseTitle: 'Applied Physics', type: 'T,P', instructor: 'Shah Hussain', venue: 'Physics Lab' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'Phy-132(T,P)', courseTitle: 'Applied Physics', type: 'T,P', instructor: 'Shah Hussain', venue: 'Physics Lab' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'Math-123', courseTitle: 'Applied Mathematics-I', type: 'T', instructor: 'Khuram Shahzad', venue: 'Room-6' },
          { lectureNo: 8, timeSlot: '02:15 - 03:00', courseCode: 'CIT-103(T)', courseTitle: 'AutoCAD Theory', type: 'T', instructor: 'Ijaz Ahmad', venue: 'Software Lab' },
        ]
      },
      {
        day: 'Wednesday',
        slots: [
          { lectureNo: 1, timeSlot: '08:30 - 09:15', courseCode: 'CIT-114(T)', courseTitle: 'Computer Applications Theory', type: 'T', instructor: 'Mahmood Hassan', venue: 'Computer Lab-1' },
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'CIT-124(P)', courseTitle: 'Electronics Lab', type: 'P', instructor: 'Muhammad Hasnain', venue: 'Electronics Lab/Room-6' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'CIT-124(P)', courseTitle: 'Electronics Lab', type: 'P', instructor: 'Muhammad Hasnain', venue: 'Electronics Lab/Room-6' },
          { lectureNo: 4, timeSlot: '10:45 - 11:30', courseCode: 'Eng-112', courseTitle: 'English Communication', type: 'T', instructor: 'Joun Abbas', venue: 'Room-6' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'CIT-103(P)', courseTitle: 'AutoCAD Lab', type: 'P', instructor: 'Ijaz Ahmad', venue: 'Autocad Lab' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'CIT-103(P)', courseTitle: 'AutoCAD Lab', type: 'P', instructor: 'Ijaz Ahmad', venue: 'Autocad Lab' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'Math-123', courseTitle: 'Applied Mathematics-I', type: 'T', instructor: 'Khuram Shahzad', venue: 'Room-6' },
          { lectureNo: 8, timeSlot: '02:15 - 03:00', courseCode: 'Gen-111', courseTitle: 'Islamiat / Pak Studies', type: 'T', instructor: 'Inyat Ali Khan', venue: 'Room-6' },
        ]
      },
      {
        day: 'Thursday',
        slots: [
          { lectureNo: 1, timeSlot: '08:30 - 09:15', courseCode: 'CIT-114(P)', courseTitle: 'Computer Applications Lab', type: 'P', instructor: 'Mahmood-Ul-Hassan', venue: 'Computer Lab-1' },
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'CIT-114(P)', courseTitle: 'Computer Applications Lab', type: 'P', instructor: 'Mahmood-Ul-Hassan', venue: 'Computer Lab-1' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'Eng-112', courseTitle: 'English Communication', type: 'T', instructor: 'Joun Abbas', venue: 'Room-6' },
          { lectureNo: 4, timeSlot: '10:45 - 11:30', courseCode: 'CIT-124(T)', courseTitle: 'Electronic Devices Theory', type: 'T', instructor: 'Muhammad Hasnain', venue: 'Room-6' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'CIT-124(P)', courseTitle: 'Electronics Lab', type: 'P', instructor: 'Muhammad Hasnain', venue: 'Electronics Lab/Room-6' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'Math-123', courseTitle: 'Applied Mathematics-I', type: 'T', instructor: 'Khuram Shahzad', venue: 'Room-6' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'CIT-103(P)', courseTitle: 'AutoCAD Lab', type: 'P', instructor: 'Ijaz Ahmad', venue: 'Autocad Lab' },
          { lectureNo: 8, timeSlot: '02:15 - 03:00', courseCode: 'CIT-103(P)', courseTitle: 'AutoCAD Lab', type: 'P', instructor: 'Ijaz Ahmad', venue: 'Autocad Lab' },
        ]
      },
      {
        day: 'Friday',
        slots: [
          { lectureNo: 1, timeSlot: '08:30 - 09:15', courseCode: 'CIT-114(T)', courseTitle: 'Computer Applications Theory', type: 'T', instructor: 'Mahmood Hassan', venue: 'Computer Lab-1' },
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'Career Counseling', courseTitle: 'Career Counseling & Soft Skills', type: 'T', instructor: 'Umair Khalil', venue: 'Multipurpose Hall' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'CIT-124(T)', courseTitle: 'Electronic Devices Theory', type: 'T', instructor: 'Muhammad Hasnain', venue: 'Room-6' },
          { lectureNo: 4, timeSlot: '11:15 - 12:00', courseCode: 'CIT-124(P)', courseTitle: 'Electronics Lab', type: 'P', instructor: 'Muhammad Hasnain', venue: 'Electronics Lab/Room-6' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'Math-123', courseTitle: 'Applied Mathematics-I', type: 'T', instructor: 'Khuram Shahzad', venue: 'Room-6' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'CIT-141(P)', courseTitle: 'Workshop & Safety', type: 'P', instructor: 'Mr. Ijaz Ahmad', venue: 'Autocad Lab' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'CIT-141(P)', courseTitle: 'Workshop & Safety', type: 'P', instructor: 'Mr. Ijaz Ahmad', venue: 'Autocad Lab' },
        ]
      },
      {
        day: 'Saturday',
        slots: [
          { lectureNo: 1, timeSlot: '08:30 - 09:15', courseCode: 'TTQ-111', courseTitle: 'Tarjuma Tul Quran', type: 'T', instructor: 'Mohib Mahdi', venue: 'Room-6' },
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'CIT-124(P)', courseTitle: 'Electronics Lab', type: 'P', instructor: 'Muhammad Hasnain', venue: 'Electronics Lab/Room-6' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'CIT-124(P)', courseTitle: 'Electronics Lab', type: 'P', instructor: 'Muhammad Hasnain', venue: 'Electronics Lab/Room-6' },
          { lectureNo: 4, timeSlot: '10:45 - 11:30', courseCode: 'Eng-112', courseTitle: 'English Communication', type: 'T', instructor: 'Joun Abbas', venue: 'Room-6' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'Phy-132(P)', courseTitle: 'Physics Practical', type: 'P', instructor: 'Shah Hussain', venue: 'Physics Lab' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'Phy-132(P)', courseTitle: 'Physics Practical', type: 'P', instructor: 'Shah Hussain', venue: 'Physics Lab' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'CIT-101(T)', courseTitle: 'Intro to Computing', type: 'T', instructor: 'Ijaz Ahmad', venue: 'Software Lab' },
        ]
      }
    ]
  },
  {
    year: '2nd Year CIT',
    schedule: [
      {
        day: 'Monday',
        slots: [
          { lectureNo: 1, timeSlot: '08:30 - 09:15', courseCode: 'MGM-211', courseTitle: 'Principles of Management', type: 'T', instructor: 'Mr. Inam Kaifi', venue: 'Software Lab' },
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'CIT-204(T,P)', courseTitle: 'Database Management Systems', type: 'T,P', instructor: 'Rao M. Haziq', venue: 'Computer Lab-1' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'CIT-204(T,P)', courseTitle: 'Database Management Systems', type: 'T,P', instructor: 'Rao M. Haziq', venue: 'Computer Lab-1' },
          { lectureNo: 4, timeSlot: '11:15 - 12:00', courseCode: 'CIT-203(T)', courseTitle: 'Data Communication', type: 'T', instructor: 'Mr. Ehsan', venue: 'Software Lab' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'Math-223', courseTitle: 'Applied Mathematics-II', type: 'T', instructor: 'Khuram Shahzad', venue: 'Software Lab' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'CIT-283(T)', courseTitle: 'Object Oriented Programming', type: 'T', instructor: 'Ijaz Ahmad', venue: 'Software Lab' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'CIT-283(T)', courseTitle: 'Object Oriented Programming', type: 'T', instructor: 'Ijaz Ahmad', venue: 'Software Lab' },
        ]
      },
      {
        day: 'Tuesday',
        slots: [
          { lectureNo: 1, timeSlot: '08:30 - 09:15', courseCode: 'CIT-283(P)', courseTitle: 'OOP Practical Lab', type: 'P', instructor: 'Ijaz Ahmad', venue: 'Software Lab' },
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'CIT-204(T,P)', courseTitle: 'Database Management Systems', type: 'T,P', instructor: 'Rao M. Haziq', venue: 'Computer Lab-1' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'CIT-204(T,P)', courseTitle: 'Database Management Systems', type: 'T,P', instructor: 'Rao M. Haziq', venue: 'Computer Lab-1' },
          { lectureNo: 4, timeSlot: '11:15 - 12:00', courseCode: 'CIT-293(P)', courseTitle: 'Web Development Lab', type: 'P', instructor: 'Mr. Ehsan', venue: 'Software Lab' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'CIT-293(P)', courseTitle: 'Web Development Lab', type: 'P', instructor: 'Mr. Ehsan', venue: 'Software Lab' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'CIT-273(T)', courseTitle: 'Digital Electronics Theory', type: 'T', instructor: 'Muhammad Hasnain', venue: 'Electronics Lab' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'Math-223', courseTitle: 'Applied Mathematics-II', type: 'T', instructor: 'Khuram Shahzad', venue: 'Room-6' },
        ]
      },
      {
        day: 'Wednesday',
        slots: [
          { lectureNo: 1, timeSlot: '08:30 - 09:15', courseCode: 'CIT-283(P)', courseTitle: 'OOP Practical Lab', type: 'P', instructor: 'Ijaz Ahmad', venue: 'Software Lab' },
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'CIT-203(T,P)', courseTitle: 'Data Communication Lab', type: 'T,P', instructor: 'Mr. Ehsan', venue: 'Software Lab' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'CIT-203(T,P)', courseTitle: 'Data Communication Lab', type: 'T,P', instructor: 'Mr. Ehsan', venue: 'Software Lab' },
          { lectureNo: 4, timeSlot: '11:15 - 12:00', courseCode: 'CIT-273(T,P)', courseTitle: 'Digital Electronics Lab', type: 'T,P', instructor: 'Muhammad Hasnain', venue: 'Electronics Lab' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'CIT-273(T,P)', courseTitle: 'Digital Electronics Lab', type: 'T,P', instructor: 'Muhammad Hasnain', venue: 'Electronics Lab' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'Gen-211', courseTitle: 'Islamiat & Pakistan Studies', type: 'T', instructor: 'Inyat Ali Khan', venue: 'Software Lab' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'Math-223', courseTitle: 'Applied Mathematics-II', type: 'T', instructor: 'Khuram Shahzad', venue: 'Software Lab' },
        ]
      },
      {
        day: 'Thursday',
        slots: [
          { lectureNo: 1, timeSlot: '08:30 - 09:15', courseCode: 'CIT-283(P)', courseTitle: 'OOP Practical Lab', type: 'P', instructor: 'Ijaz Ahmad', venue: 'Software Lab' },
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'CIT-204(P)', courseTitle: 'Database Practical Lab', type: 'P', instructor: 'Rao M. Haziq', venue: 'Computer Lab-1' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'CIT-204(P)', courseTitle: 'Database Practical Lab', type: 'P', instructor: 'Rao M. Haziq', venue: 'Computer Lab-1' },
          { lectureNo: 4, timeSlot: '11:15 - 12:00', courseCode: 'CIT-293(P)', courseTitle: 'Web Development Lab', type: 'P', instructor: 'Mr. Ehsan', venue: 'Software Lab' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'CIT-293(P)', courseTitle: 'Web Development Lab', type: 'P', instructor: 'Mr. Ehsan', venue: 'Software Lab' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'Math-223', courseTitle: 'Applied Mathematics-II', type: 'T', instructor: 'Khuram Shahzad', venue: 'Software Lab' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'Career Counseling', courseTitle: 'Career Counseling', type: 'T', instructor: 'Umair Khalil', venue: 'Multipurpose Hall' },
        ]
      },
      {
        day: 'Friday',
        slots: [
          { lectureNo: 1, timeSlot: '08:30 - 09:15', courseCode: 'TTQ-211', courseTitle: 'Tarjuma Tul Quran', type: 'T', instructor: 'Mohib Mahdi', venue: 'Software Lab' },
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'CIT-204(P)', courseTitle: 'Database Practical Lab', type: 'P', instructor: 'Rao M. Haziq', venue: 'Computer Lab-1' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'CIT-204(P)', courseTitle: 'Database Practical Lab', type: 'P', instructor: 'Rao M. Haziq', venue: 'Computer Lab-1' },
          { lectureNo: 4, timeSlot: '11:15 - 12:00', courseCode: 'CIT-222(T)', courseTitle: 'Computer Networks', type: 'T', instructor: 'Ijaz Ahmad', venue: 'Software Lab' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'CIT-222(T)', courseTitle: 'Computer Networks', type: 'T', instructor: 'Ijaz Ahmad', venue: 'Software Lab' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'Math-223', courseTitle: 'Applied Mathematics-II', type: 'T', instructor: 'Khuram Shahzad', venue: 'Software Lab' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'CIT-203(P)', courseTitle: 'Data Communication Lab', type: 'P', instructor: 'Mr. Ehsan', venue: 'Software Lab' },
        ]
      },
      {
        day: 'Saturday',
        slots: [
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'CIT-293(P)', courseTitle: 'Web Development Lab', type: 'P', instructor: 'Mr. Ehsan', venue: 'Software Lab' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'CIT-293(P)', courseTitle: 'Web Development Lab', type: 'P', instructor: 'Mr. Ehsan', venue: 'Software Lab' },
          { lectureNo: 4, timeSlot: '11:15 - 12:00', courseCode: 'CIT-222(P)', courseTitle: 'Networking Lab', type: 'P', instructor: 'Ijaz Ahmad', venue: 'Software Lab' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'CIT-222(P)', courseTitle: 'Networking Lab', type: 'P', instructor: 'Ijaz Ahmad', venue: 'Software Lab' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'CIT-273(P)', courseTitle: 'Digital Electronics Lab', type: 'P', instructor: 'Muhammad Hasnain', venue: 'Electronics Lab' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'CIT-273(P)', courseTitle: 'Digital Electronics Lab', type: 'P', instructor: 'Muhammad Hasnain', venue: 'Electronics Lab' },
        ]
      }
    ]
  },
  {
    year: '3rd Year CIT',
    schedule: [
      {
        day: 'Monday',
        slots: [
          { lectureNo: 1, timeSlot: '08:30 - 09:15', courseCode: 'CIT-343(T)', courseTitle: 'Microprocessor Architecture', type: 'T', instructor: 'Muhammad Hasnain', venue: 'Room-6' },
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'CIT-312(T,P)', courseTitle: 'System Administration', type: 'T,P', instructor: 'Mahmood-ul-Hassan', venue: 'Software Lab' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'CIT-312(T,P)', courseTitle: 'System Administration', type: 'T,P', instructor: 'Mahmood-ul-Hassan', venue: 'Software Lab' },
          { lectureNo: 4, timeSlot: '11:15 - 12:00', courseCode: 'Gen-311', courseTitle: 'Management & Industrial Relations', type: 'T', instructor: 'Inyat Ali Khan', venue: 'Room-6' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'CIT-381(P)', courseTitle: 'Cloud Computing Lab', type: 'P', instructor: 'Mr. Ehsan', venue: 'Computer Lab-1' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'CIT-381(P)', courseTitle: 'Cloud Computing Lab', type: 'P', instructor: 'Mr. Ehsan', venue: 'Computer Lab-1' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'CIT-381(P)', courseTitle: 'Cloud Computing Lab', type: 'P', instructor: 'Mr. Ehsan', venue: 'Computer Lab-1' },
        ]
      },
      {
        day: 'Tuesday',
        slots: [
          { lectureNo: 1, timeSlot: '08:30 - 09:15', courseCode: 'CIT-313(T)', courseTitle: 'Software Engineering', type: 'T', instructor: 'Mr. Ehsan', venue: 'Room-6' },
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'CIT-372(T,P)', courseTitle: 'Cyber Security & Forensics', type: 'T,P', instructor: 'Mahmood-ul-Hassan', venue: 'Software Lab' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'CIT-372(T,P)', courseTitle: 'Cyber Security & Forensics', type: 'T,P', instructor: 'Mahmood-ul-Hassan', venue: 'Software Lab' },
          { lectureNo: 4, timeSlot: '11:15 - 12:00', courseCode: 'CIT-322(T,P)', courseTitle: 'Mobile App Development', type: 'T,P', instructor: 'Ijaz Ahmad', venue: 'Computer Lab-1' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'CIT-322(T,P)', courseTitle: 'Mobile App Development', type: 'T,P', instructor: 'Ijaz Ahmad', venue: 'Computer Lab-1' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'CIT-313(P)', courseTitle: 'Software Engineering Lab', type: 'P', instructor: 'Mr. Ehsan', venue: 'Computer Lab-1' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'CIT-313(P)', courseTitle: 'Software Engineering Lab', type: 'P', instructor: 'Mr. Ehsan', venue: 'Computer Lab-1' },
        ]
      },
      {
        day: 'Wednesday',
        slots: [
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'CIT-392(P)', courseTitle: 'Final Year Capstone Project', type: 'P', instructor: 'Rao M. Haziq', venue: 'Computer Lab-1' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'CIT-392(P)', courseTitle: 'Final Year Capstone Project', type: 'P', instructor: 'Rao M. Haziq', venue: 'Computer Lab-1' },
          { lectureNo: 4, timeSlot: '11:15 - 12:00', courseCode: 'CIT-314(P)', courseTitle: 'Operating Systems Lab', type: 'P', instructor: 'Mahmood-ul-Hassan', venue: 'Computer Lab-1' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'CIT-314(P)', courseTitle: 'Operating Systems Lab', type: 'P', instructor: 'Mahmood-ul-Hassan', venue: 'Computer Lab-1' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'CIT-322(P)', courseTitle: 'Mobile App Lab', type: 'P', instructor: 'Ijaz Ahmad', venue: 'Computer Lab-1' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'CIT-322(P)', courseTitle: 'Mobile App Lab', type: 'P', instructor: 'Ijaz Ahmad', venue: 'Computer Lab-1' },
        ]
      },
      {
        day: 'Thursday',
        slots: [
          { lectureNo: 1, timeSlot: '08:30 - 09:15', courseCode: 'CIT-343(T,P)', courseTitle: 'Microprocessor Architecture', type: 'T,P', instructor: 'Muhammad Hasnain', venue: 'Room-6/Electronics Lab' },
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'CIT-343(T,P)', courseTitle: 'Microprocessor Architecture', type: 'T,P', instructor: 'Muhammad Hasnain', venue: 'Room-6/Electronics Lab' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'CIT-314(T)', courseTitle: 'Operating Systems Theory', type: 'T', instructor: 'Mahmood-ul-Hassan', venue: 'Software Lab' },
          { lectureNo: 4, timeSlot: '11:15 - 12:00', courseCode: 'CIT-372(P)', courseTitle: 'Cyber Security Lab', type: 'P', instructor: 'Mahmood-ul-Hassan', venue: 'Computer Lab-1' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'CIT-372(P)', courseTitle: 'Cyber Security Lab', type: 'P', instructor: 'Mahmood-ul-Hassan', venue: 'Computer Lab-1' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'CIT-313(P)', courseTitle: 'Software Engineering Lab', type: 'P', instructor: 'Mr. Ehsan', venue: 'Computer Lab-1' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'CIT-313(P)', courseTitle: 'Software Engineering Lab', type: 'P', instructor: 'Mr. Ehsan', venue: 'Computer Lab-1' },
        ]
      },
      {
        day: 'Friday',
        slots: [
          { lectureNo: 1, timeSlot: '08:30 - 09:15', courseCode: 'Career Counseling', courseTitle: 'Career Counseling', type: 'T', instructor: 'Umair Khalil', venue: 'Multipurpose Hall' },
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'CIT-314(P)', courseTitle: 'Operating Systems Lab', type: 'P', instructor: 'Mahmood-ul-Hassan', venue: 'Software Lab' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'CIT-314(P)', courseTitle: 'Operating Systems Lab', type: 'P', instructor: 'Mahmood-ul-Hassan', venue: 'Software Lab' },
          { lectureNo: 4, timeSlot: '11:15 - 12:00', courseCode: 'CIT-314(T)', courseTitle: 'Operating Systems Theory', type: 'T', instructor: 'Mahmood-ul-Hassan', venue: 'Computer Lab-1' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'CIT-313(P)', courseTitle: 'Software Engineering Lab', type: 'P', instructor: 'Mr. Ehsan', venue: 'Computer Lab-1' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'CIT-343(T,P)', courseTitle: 'Microprocessor Architecture', type: 'T,P', instructor: 'Muhammad Hasnain', venue: 'Room-6/Electronics Lab' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'CIT-343(T,P)', courseTitle: 'Microprocessor Architecture', type: 'T,P', instructor: 'Muhammad Hasnain', venue: 'Room-6/Electronics Lab' },
        ]
      },
      {
        day: 'Saturday',
        slots: [
          { lectureNo: 2, timeSlot: '09:15 - 10:00', courseCode: 'CIT-392(P)', courseTitle: 'Capstone Project Evaluation', type: 'P', instructor: 'Rao M. Haziq', venue: 'Computer Lab-1' },
          { lectureNo: 3, timeSlot: '10:00 - 10:45', courseCode: 'CIT-392(P)', courseTitle: 'Capstone Project Evaluation', type: 'P', instructor: 'Rao M. Haziq', venue: 'Computer Lab-1' },
          { lectureNo: 4, timeSlot: '11:15 - 12:00', courseCode: 'CIT-312(P)', courseTitle: 'System Administration Lab', type: 'P', instructor: 'Mahmood-ul-Hassan', venue: 'Computer Lab-1' },
          { lectureNo: 5, timeSlot: '12:00 - 12:45', courseCode: 'CIT-312(P)', courseTitle: 'System Administration Lab', type: 'P', instructor: 'Mahmood-ul-Hassan', venue: 'Computer Lab-1' },
          { lectureNo: 6, timeSlot: '12:45 - 01:30', courseCode: 'CIT-314(P)', courseTitle: 'Operating Systems Lab', type: 'P', instructor: 'Mahmood-ul-Hassan', venue: 'Computer Lab-1' },
          { lectureNo: 7, timeSlot: '01:30 - 02:15', courseCode: 'CIT-314(P)', courseTitle: 'Operating Systems Lab', type: 'P', instructor: 'Mahmood-ul-Hassan', venue: 'Computer Lab-1' },
        ]
      }
    ]
  }
];

export const COURSES: Course[] = [
  {
    code: 'CIT-204',
    title: 'Database Management Systems',
    year: '2nd Year',
    creditHours: '3-3-4',
    theoryHours: 3,
    practicalHours: 3,
    instructor: 'Engr. Rao M. Haziq',
    venue: 'Computer Lab-1',
    description: 'Comprehensive study of relational databases, relational algebra, SQL querying, schema normalization (1NF to BCNF), transaction concurrency, ACID properties, and database administration with MySQL & MongoDB.',
    syllabus: [
      'Introduction to DBMS Architecture and Data Models',
      'Entity-Relationship (ER) & Enhanced ER Modeling',
      'Relational Schema Mapping & Functional Dependencies',
      'Advanced SQL: DDL, DML, Joins, Triggers, and Stored Procedures',
      'Indexing, B-Trees, and Query Optimization',
      'NoSQL and MongoDB Document Stores'
    ],
    recommendedBooks: [
      'Database System Concepts by Silberschatz, Korth and Sudarshan',
      'Fundamentals of Database Systems by Elmasri & Navathe'
    ]
  },
  {
    code: 'CIT-293',
    title: 'Web Application Development',
    year: '2nd Year',
    creditHours: '2-3-3',
    theoryHours: 2,
    practicalHours: 3,
    instructor: 'Mr. Ehsan Ullah',
    venue: 'Software Lab',
    description: 'Modern front-end and full-stack web application development covering HTML5 semantics, Tailwind CSS, asynchronous JavaScript (ES6+), React components, Node.js, Express REST APIs, and state management.',
    syllabus: [
      'Modern Web Standards, DOM, and Semantic Markup',
      'Responsive CSS Grid, Flexbox, and Tailwind Utility Architecture',
      'JavaScript Asynchronous Programming (Promises, Async/Await)',
      'React Fundamentals: Components, Hooks, Context, Virtual DOM',
      'Building RESTful APIs with Node.js & Express',
      'Deployment to Cloud Platforms and Security Best Practices'
    ],
    recommendedBooks: [
      'Eloquent JavaScript by Marijn Haverbeke',
      'Learning React: Modern Patterns for Developing React Apps'
    ]
  },
  {
    code: 'CIT-283',
    title: 'Object Oriented Programming with C++/Java',
    year: '2nd Year',
    creditHours: '2-3-3',
    theoryHours: 2,
    practicalHours: 3,
    instructor: 'Engr. Ijaz Ahmad',
    venue: 'Software Lab',
    description: 'Core object-oriented design principles: encapsulation, inheritance, polymorphism, abstract classes, interface programming, exception handling, and generic collections.',
    syllabus: [
      'Procedural vs Object-Oriented Paradigm',
      'Classes, Constructors, Destructors, and Memory Allocation',
      'Operator Overloading and Friend Functions',
      'Inheritance Hierarchies & Dynamic Binding',
      'Templates, Generic Programming, and STL Vectors',
      'File Stream I/O Operations'
    ],
    recommendedBooks: [
      'Object-Oriented Programming in C++ by Robert Lafore',
      'Thinking in C++ by Bruce Eckel'
    ]
  },
  {
    code: 'CIT-273',
    title: 'Digital Electronics & Logic Design',
    year: '2nd Year',
    creditHours: '2-3-3',
    theoryHours: 2,
    practicalHours: 3,
    instructor: 'Engr. Muhammad Hasnain',
    venue: 'Electronics Lab',
    description: 'Binary number systems, Boolean algebra, logic gates, Karnaugh mapping simplification, combinational circuits (adders, multiplexers), and sequential circuits (flip-flops, registers, counters).',
    syllabus: [
      'Number Systems, 1s/2s Complements, and Binary Codes',
      'Boolean Theorems and DeMorgan Laws',
      'K-Map Simplification up to 5 Variables',
      'Combinational Logic: Half/Full Adders, Decoders, Encoders',
      'Latches and Edge-Triggered Flip-Flops (SR, JK, D, T)',
      'Synchronous Counters and Shift Registers'
    ],
    recommendedBooks: [
      'Digital Fundamentals by Thomas L. Floyd',
      'Digital Design by M. Morris Mano'
    ]
  },
  {
    code: 'CIT-222',
    title: 'Data Communication & Computer Networks',
    year: '2nd Year',
    creditHours: '2-2-3',
    theoryHours: 2,
    practicalHours: 2,
    instructor: 'Engr. Ijaz Ahmad',
    venue: 'Software Lab',
    description: 'OSI 7-Layer and TCP/IP protocol suites, physical transmission media, packet switching, IPv4/IPv6 subnetting, CIDR, routing algorithms, transport layer protocols (TCP/UDP), and DNS.',
    syllabus: [
      'Network Topologies and Standards (IEEE 802.3, 802.11)',
      'Data Link Layer: Framing, Flow Control, and Error Detection (CRC)',
      'Network Layer: IPv4 Addressing, Subnet Masks, VLSM',
      'Routing Protocols: RIP, OSPF, and Static Routing',
      'Transport Layer: Sliding Window, Flow Control, TCP Handshake',
      'Application Protocols: HTTP/HTTPS, DNS, DHCP, FTP'
    ],
    recommendedBooks: [
      'Computer Networking: A Top-Down Approach by Kurose & Ross',
      'Data and Computer Communications by William Stallings'
    ]
  },
  {
    code: 'Math-223',
    title: 'Applied Mathematics-II',
    year: '2nd Year',
    creditHours: '3-0-3',
    theoryHours: 3,
    practicalHours: 0,
    instructor: 'Prof. Khuram Shahzad',
    venue: 'Software Lab / Room-6',
    description: 'Integral calculus, techniques of integration, differential equations of first and second order, Laplace transforms, and complex number series for technological applications.',
    syllabus: [
      'Definite and Indefinite Integrals with Applications',
      'Integration by Parts and Partial Fractions',
      'First-Order Separable and Linear Differential Equations',
      'Second-Order Homogeneous Differential Equations',
      'Matrices, Determinants, and Eigenvalues',
      'Introduction to Laplace Transformations'
    ],
    recommendedBooks: [
      'Applied Mathematics for Polytechnics by H.K. Dass',
      'Calculus and Analytical Geometry by Thomas and Finney'
    ]
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-01',
    courseCode: 'CIT-204',
    courseTitle: 'Database Management Systems',
    title: 'Assignment No: 1 - Relational Schema & ERD for College Portal',
    description: 'Design a complete Entity-Relationship Diagram (ERD) with cardinalities for a College Student Portal. Map the ERD to 3NF relational tables with primary and foreign key constraints.',
    dueDate: '2026-09-25T23:59:00',
    totalMarks: 20,
    status: 'Pending',
    instructor: 'Engr. Rao M. Haziq',
  },
  {
    id: 'asg-02',
    courseCode: 'CIT-293',
    courseTitle: 'Web Application Development',
    title: 'Assignment No: 1 - Responsive Timetable & MERN REST API',
    description: 'Create a responsive college timetable viewer using React and Tailwind CSS. Implement full CRUD endpoints in Express and test with MongoDB collection schemas.',
    dueDate: '2026-09-22T23:59:00',
    totalMarks: 25,
    status: 'Submitted',
    submissionDate: '2026-09-18T14:30:00',
    submissionNote: 'Completed responsive timetable grid with filter by day and year. Exported schemas in src/data.',
    instructor: 'Mr. Ehsan Ullah',
  },
  {
    id: 'asg-03',
    courseCode: 'CIT-283',
    courseTitle: 'Object Oriented Programming',
    title: 'Assignment No: 1 - Class Hierarchy & Polymorphism',
    description: 'Implement a C++ program modeling a College Management hierarchy: Base class Person, derived classes Student and Teacher, utilizing virtual functions and file handling.',
    dueDate: '2026-09-15T23:59:00',
    totalMarks: 20,
    obtainedMarks: 19,
    status: 'Graded',
    submissionDate: '2026-09-14T20:15:00',
    submissionNote: 'Submitted single cpp source with comments and test cases.',
    instructor: 'Engr. Ijaz Ahmad',
  },
  {
    id: 'asg-04',
    courseCode: 'CIT-273',
    courseTitle: 'Digital Electronics & Logic Design',
    title: 'Lab Report No: 2 - 4-bit Binary Full Adder & K-Map',
    description: 'Simulate and document truth tables for 4-bit adder using 74LS83 IC. Compare theoretical gate propagation delay with Proteus simulation waveforms.',
    dueDate: '2026-09-28T17:00:00',
    totalMarks: 15,
    status: 'Pending',
    instructor: 'Engr. Muhammad Hasnain',
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    courseCode: 'CIT-204',
    courseTitle: 'Database Management Systems',
    totalClasses: 28,
    attendedClasses: 25,
    percentage: 89.2,
    lastUpdated: '2026-09-18',
    instructor: 'Engr. Rao M. Haziq',
  },
  {
    courseCode: 'CIT-293',
    courseTitle: 'Web Application Development',
    totalClasses: 30,
    attendedClasses: 27,
    percentage: 90.0,
    lastUpdated: '2026-09-18',
    instructor: 'Mr. Ehsan Ullah',
  },
  {
    courseCode: 'CIT-283',
    courseTitle: 'Object Oriented Programming',
    totalClasses: 26,
    attendedClasses: 22,
    percentage: 84.6,
    lastUpdated: '2026-09-17',
    instructor: 'Engr. Ijaz Ahmad',
  },
  {
    courseCode: 'CIT-273',
    courseTitle: 'Digital Electronics',
    totalClasses: 24,
    attendedClasses: 19,
    percentage: 79.1,
    lastUpdated: '2026-09-16',
    instructor: 'Engr. Muhammad Hasnain',
  },
  {
    courseCode: 'CIT-222',
    courseTitle: 'Computer Networks',
    totalClasses: 22,
    attendedClasses: 16,
    percentage: 72.7, // Below 75% warning trigger
    lastUpdated: '2026-09-18',
    instructor: 'Engr. Ijaz Ahmad',
  },
  {
    courseCode: 'Math-223',
    courseTitle: 'Applied Mathematics-II',
    totalClasses: 32,
    attendedClasses: 28,
    percentage: 87.5,
    lastUpdated: '2026-09-17',
    instructor: 'Prof. Khuram Shahzad',
  }
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'PBTE Annual Examination 2026 - Registration Notice',
    date: '18 Sep 2026',
    category: 'Exam',
    isUrgent: true,
    content: 'All DAE CIT 1st, 2nd & 3rd year students are informed that examination admission forms for PBTE Annual Examination 2026 must be submitted before September 30, 2026 along with verified challan slips.',
  },
  {
    id: 'ann-2',
    title: 'Compulsory 75% Attendance Requirement for Board Eligibility',
    date: '15 Sep 2026',
    category: 'Academic',
    isUrgent: true,
    content: 'As per TEVTA / PBTE regulations, students having attendance below 75% in theoretical or laboratory courses will strictly not be permitted to appear in final board practical and theory exams.',
  },
  {
    id: 'ann-3',
    title: 'CIT Department Computer Lab-1 Network Infrastructure Upgrade',
    date: '12 Sep 2026',
    category: 'General',
    isUrgent: false,
    content: 'High-speed gigabit switches and updated database server hosts have been commissioned in Computer Lab-1 and Software Lab. Students working on final year projects can access the local server instances.',
  },
  {
    id: 'ann-4',
    title: 'Career Counseling Seminar by Engr. Umair Khalil',
    date: '10 Sep 2026',
    category: 'Academic',
    isUrgent: false,
    content: 'Special Friday career mentoring session scheduled every Friday at 09:15 AM in the Multipurpose Hall. Industry guest speakers will share software engineering career roadmaps.',
  }
];

export const GRADE_DISTRIBUTION_DATA: GradeDistribution[] = [
  { grade: 'A+', range: '85 - 100%', gpa: 4.0, studentCount: 8, percentage: 16 },
  { grade: 'A', range: '80 - 84%', gpa: 3.7, studentCount: 14, percentage: 28 },
  { grade: 'B+', range: '75 - 79%', gpa: 3.3, studentCount: 12, percentage: 24 },
  { grade: 'B', range: '70 - 74%', gpa: 3.0, studentCount: 9, percentage: 18 },
  { grade: 'C', range: '60 - 69%', gpa: 2.5, studentCount: 5, percentage: 10 },
  { grade: 'F', range: '< 60%', gpa: 0.0, studentCount: 2, percentage: 4 },
];

export const INITIAL_NOTIFICATIONS: PortalNotification[] = [
  {
    id: 'notif-1',
    type: 'class_shift',
    title: 'Class Shift Notice',
    message: 'CIT-204 DBMS lecture has been shifted from Room-6 to Computer Lab-1 for live SQL demonstration.',
    timestamp: '10 mins ago',
    read: false,
  },
  {
    id: 'notif-2',
    type: 'next_class',
    title: 'Next Class Alert',
    message: 'Next Lecture: CIT-293 Web Development Lab with Mr. Ehsan starts at 11:15 AM in Software Lab.',
    timestamp: '25 mins ago',
    read: false,
  },
  {
    id: 'notif-3',
    type: 'break_time',
    title: 'Break Time Active',
    message: 'Midday refreshment break is from 10:45 AM to 11:15 AM. Canteen and library facilities are open.',
    timestamp: '1 hour ago',
    read: true,
  },
  {
    id: 'notif-4',
    type: 'reminder',
    title: 'Assignment Deadline Reminder',
    message: 'Assignment No: 1 (CIT-204 Database Schema) is due on Sep 25, 2026. Submit before midnight.',
    timestamp: '3 hours ago',
    read: true,
  },
  {
    id: 'notif-5',
    type: 'class_end',
    title: 'Class Concluded',
    message: 'Lec 1: Principles of Management (MGM-211) concluded at 09:15 AM.',
    timestamp: 'Yesterday',
    read: true,
  }
];
