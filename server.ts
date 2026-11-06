import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { 
  COLLEGE_INFO, 
  TIMETABLES, 
  COURSES, 
  INITIAL_ASSIGNMENTS, 
  INITIAL_ATTENDANCE, 
  ANNOUNCEMENTS, 
  GRADE_DISTRIBUTION_DATA, 
  INITIAL_NOTIFICATIONS, 
  FACULTY_DIRECTORY,
  DEFAULT_STUDENT_PROFILE,
  DEFAULT_TEACHER_PROFILE
} from './src/data/portalData';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory persistent state (mirroring MongoDB collections: users, assignments, attendance, notifications)
  let assignments = [...INITIAL_ASSIGNMENTS];
  let attendance = [...INITIAL_ATTENDANCE];
  let notifications = [...INITIAL_NOTIFICATIONS];
  let currentUser = { ...DEFAULT_STUDENT_PROFILE };

  // --- API Endpoints ---
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'online', 
      server: 'GCT Bhakkar CIT Portal Express Engine',
      mongoDbTarget: 'mongodb://localhost:27017/gct_portal',
      timestamp: new Date().toISOString() 
    });
  });

  // College & Timetable
  app.get('/api/college-info', (req, res) => {
    res.json(COLLEGE_INFO);
  });

  // Source Code ZIP Download endpoint
  app.get('/api/download-zip', (req, res) => {
    const zipPath = path.join(process.cwd(), 'public', 'gct_bhakkar_cit_portal.zip');
    if (fs.existsSync(zipPath)) {
      res.download(zipPath, 'gct_bhakkar_cit_portal.zip');
    } else {
      res.status(404).json({ error: 'ZIP file archive is being generated. Please retry shortly.' });
    }
  });

  app.get('/api/timetable', (req, res) => {
    const year = req.query.year as string;
    if (year) {
      const found = TIMETABLES.find(t => t.year.toLowerCase().includes(year.toLowerCase()));
      return res.json(found || TIMETABLES[1]); // default to 2nd year if not matched
    }
    res.json(TIMETABLES);
  });

  // Courses
  app.get('/api/courses', (req, res) => {
    res.json(COURSES);
  });

  // Assignments
  app.get('/api/assignments', (req, res) => {
    res.json(assignments);
  });

  app.post('/api/assignments/submit', (req, res) => {
    const { assignmentId, submissionNote, fileAttachment } = req.body;
    const target = assignments.find(a => a.id === assignmentId);
    if (!target) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    target.status = 'Submitted';
    target.submissionDate = new Date().toISOString();
    target.submissionNote = submissionNote || 'Uploaded via portal';
    target.fileAttachment = fileAttachment || 'assignment_submission.pdf';
    res.json({ success: true, assignment: target });
  });

  app.post('/api/assignments', (req, res) => {
    const newAsg = {
      id: `asg-${Date.now()}`,
      courseCode: req.body.courseCode || 'CIT-204',
      courseTitle: req.body.courseTitle || 'Database Management Systems',
      title: req.body.title || 'New Practical Task',
      description: req.body.description || '',
      dueDate: req.body.dueDate || new Date(Date.now() + 7 * 86400000).toISOString(),
      totalMarks: Number(req.body.totalMarks) || 20,
      status: 'Pending' as const,
      instructor: req.body.instructor || 'Engr. Rao M. Haziq',
    };
    assignments.unshift(newAsg);
    res.status(201).json({ success: true, assignment: newAsg });
  });

  // Attendance
  app.get('/api/attendance', (req, res) => {
    res.json(attendance);
  });

  app.post('/api/attendance/mark', (req, res) => {
    const { courseCode, present } = req.body;
    const record = attendance.find(a => a.courseCode === courseCode);
    if (!record) {
      return res.status(404).json({ error: 'Course record not found' });
    }
    record.totalClasses += 1;
    if (present) {
      record.attendedClasses += 1;
    }
    record.percentage = Number(((record.attendedClasses / record.totalClasses) * 100).toFixed(1));
    record.lastUpdated = new Date().toISOString().split('T')[0];
    res.json({ success: true, record });
  });

  // Notifications
  app.get('/api/notifications', (req, res) => {
    res.json(notifications);
  });

  app.post('/api/notifications/trigger', (req, res) => {
    const { type, title, message } = req.body;
    const newNotif = {
      id: `notif-${Date.now()}`,
      type: type || 'reminder',
      title: title || 'Campus Alert',
      message: message || 'Notification broadcast from College Administration.',
      timestamp: 'Just now',
      read: false,
    };
    notifications.unshift(newNotif);
    res.status(201).json({ success: true, notification: newNotif });
  });

  app.post('/api/notifications/mark-read', (req, res) => {
    const { id } = req.body;
    if (id === 'all') {
      notifications.forEach(n => { n.read = true; });
    } else {
      const target = notifications.find(n => n.id === id);
      if (target) target.read = true;
    }
    res.json({ success: true, notifications });
  });

  // Curve and Grades
  app.get('/api/curve', (req, res) => {
    res.json({
      averageScore: 78.4,
      medianScore: 81.0,
      standardDeviation: 11.2,
      topPercentile: 94.5,
      passRate: 96.0,
      distribution: GRADE_DISTRIBUTION_DATA,
    });
  });

  // Announcements
  app.get('/api/announcements', (req, res) => {
    res.json(ANNOUNCEMENTS);
  });

  // Profiles & Faculty
  app.get('/api/faculty', (req, res) => {
    res.json(FACULTY_DIRECTORY);
  });

  app.get('/api/user/profile', (req, res) => {
    res.json(currentUser);
  });

  app.post('/api/user/profile', (req, res) => {
    currentUser = { ...currentUser, ...req.body };
    res.json({ success: true, user: currentUser });
  });

  app.post('/api/auth/switch-role', (req, res) => {
    const { role } = req.body;
    if (role === 'teacher') {
      currentUser = { ...DEFAULT_TEACHER_PROFILE };
    } else {
      currentUser = { ...DEFAULT_STUDENT_PROFILE };
    }
    res.json({ success: true, user: currentUser });
  });

  // MongoDB MERN Integration Schema & Connection Guide
  app.get('/api/mongodb-info', (req, res) => {
    res.json({
      connectionString: 'mongodb://localhost:27017/gct_portal',
      suggestedCollections: [
        'users',
        'timetables',
        'courses',
        'assignments',
        'submissions',
        'attendance',
        'notifications',
        'announcements'
      ],
      sampleMongooseCode: `
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  studentRollNo: { type: String, required: true, index: true },
  courseCode: { type: String, required: true },
  totalClasses: { type: Number, default: 0 },
  attendedClasses: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

const AssignmentSchema = new mongoose.Schema({
  courseCode: String,
  title: String,
  dueDate: Date,
  totalMarks: Number,
  status: { type: String, enum: ['Pending', 'Submitted', 'Graded'], default: 'Pending' }
});

mongoose.connect('mongodb://localhost:27017/gct_portal')
  .then(() => console.log('MongoDB Connected to gct_portal database'))
  .catch(err => console.error('MongoDB connection error:', err));
      `
    });
  });

  // --- Vite middleware for development / static serving for production ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
