import { useState, useEffect } from 'react';
import { 
  UserProfile, 
  Assignment, 
  AttendanceRecord, 
  PortalNotification, 
  NotificationType,
  Announcement 
} from './types';
import { 
  DEFAULT_STUDENT_PROFILE, 
  DEFAULT_TEACHER_PROFILE, 
  INITIAL_ASSIGNMENTS, 
  INITIAL_ATTENDANCE, 
  INITIAL_NOTIFICATIONS, 
  ANNOUNCEMENTS 
} from './data/portalData';

import SplashScreen from './components/SplashScreen';
import LoginModal from './components/LoginModal';
import HeaderNavbar from './components/HeaderNavbar';
import DashboardView from './components/DashboardView';
import TimetableView from './components/TimetableView';
import GradeCurveView from './components/GradeCurveView';
import CourseDetailView from './components/CourseDetailView';
import AssignmentView from './components/AssignmentView';
import AttendanceView from './components/AttendanceView';
import NotificationCenter from './components/NotificationCenter';
import ProfileView from './components/ProfileView';
import MongoDbInfoModal from './components/MongoDbInfoModal';
import DownloadZipModal from './components/DownloadZipModal';

export default function App() {
  // 1) Splash screen state (5 seconds)
  const [showSplash, setShowSplash] = useState(true);

  // 2) Authentication state
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_STUDENT_PROFILE);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Active navigation view
  const [activeView, setActiveView] = useState<string>('dashboard');

  // Core data states
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [notifications, setNotifications] = useState<PortalNotification[]>(INITIAL_NOTIFICATIONS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(ANNOUNCEMENTS);

  // Notifications Drawer & Floating Toast system
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);
  const [activeToast, setActiveToast] = useState<PortalNotification | null>(null);

  // MongoDB Guide Modal
  const [isMongoDbModalOpen, setIsMongoDbModalOpen] = useState(false);

  // ZIP Download Modal
  const [isZipModalOpen, setIsZipModalOpen] = useState(false);

  // Dismiss active toast after 6 seconds
  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  // Handle Triggering college notifications (Class Shift, Class End, Next Class, Break Time, Reminder)
  const handleTriggerNotification = (type: NotificationType, customTitle?: string, customMessage?: string) => {
    let title = customTitle || '';
    let message = customMessage || '';

    if (!title) {
      switch (type) {
        case 'class_shift':
          title = '⚠️ Class Shift Notice';
          message = 'CIT-204 Database Systems shifted to Software Lab for hands-on SQL query demonstration.';
          break;
        case 'class_end':
          title = '🔔 Lecture Concluded';
          message = 'Current lecture has ended. Please proceed to the next classroom or laboratory.';
          break;
        case 'next_class':
          title = '⏰ Next Class Starting Soon';
          message = 'Up Next: CIT-293 Web Development in Software Lab with Mr. Ehsan Ullah in 10 minutes.';
          break;
        case 'break_time':
          title = '☕ Campus Break Commenced';
          message = 'College break time: 10:45 AM to 11:15 AM. Refreshment canteen and campus mosque open.';
          break;
        case 'reminder':
          title = '📌 Assignment Deadline Reminder';
          message = 'Assignment No: 1 (CIT-204 Schema Design) is due tonight. Submit before 11:59 PM.';
          break;
      }
    }

    const newNotif: PortalNotification = {
      id: `notif-${Date.now()}`,
      type,
      title,
      message,
      timestamp: 'Just now',
      read: false,
    };

    setNotifications(prev => [newNotif, ...prev]);
    setActiveToast(newNotif);
  };

  const handleMarkAllNotifsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Switch between Student and Teacher roles
  const handleSwitchRole = () => {
    if (currentUser.role === 'student') {
      setCurrentUser(DEFAULT_TEACHER_PROFILE);
      handleTriggerNotification('class_shift', 'Switched to Teacher Mode', 'You are now signed in as Engr. Rao M. Haziq (Academic Incharge).');
    } else {
      setCurrentUser(DEFAULT_STUDENT_PROFILE);
      handleTriggerNotification('next_class', 'Switched to Student Mode', 'You are now signed in as Aliyan Ansari (Roll: 24CIT105).');
    }
  };

  // Submit assignment
  const handleSubmitAssignment = (assignmentId: string, note: string, fileName: string) => {
    setAssignments(prev => prev.map(asg => {
      if (asg.id === assignmentId) {
        return {
          ...asg,
          status: 'Submitted',
          submissionDate: new Date().toISOString(),
          submissionNote: note,
          fileAttachment: fileName,
        };
      }
      return asg;
    }));

    handleTriggerNotification('reminder', 'Assignment Submitted Successfully', `Your submission for task has been logged.`);
  };

  // Create new assignment (Teacher mode)
  const handleCreateAssignment = (newAsgData: Partial<Assignment>) => {
    const newAsg: Assignment = {
      id: `asg-${Date.now()}`,
      courseCode: newAsgData.courseCode || 'CIT-204',
      courseTitle: newAsgData.courseTitle || 'Database Management Systems',
      title: newAsgData.title || 'New Assignment Task',
      description: newAsgData.description || 'Complete the assigned exercises.',
      dueDate: newAsgData.dueDate || new Date(Date.now() + 7 * 86400000).toISOString(),
      totalMarks: newAsgData.totalMarks || 20,
      status: 'Pending',
      instructor: currentUser.name,
    };

    setAssignments(prev => [newAsg, ...prev]);
    handleTriggerNotification('reminder', 'New Assignment Published', `${newAsg.courseCode}: ${newAsg.title} has been assigned by faculty.`);
  };

  // Mark attendance
  const handleMarkAttendance = (courseCode: string, present: boolean) => {
    setAttendance(prev => prev.map(item => {
      if (item.courseCode === courseCode) {
        const total = item.totalClasses + 1;
        const attended = present ? item.attendedClasses + 1 : item.attendedClasses;
        const pct = Number(((attended / total) * 100).toFixed(1));
        return {
          ...item,
          totalClasses: total,
          attendedClasses: attended,
          percentage: pct,
          lastUpdated: new Date().toISOString().split('T')[0],
        };
      }
      return item;
    }));

    handleTriggerNotification(
      present ? 'next_class' : 'class_end',
      present ? `Marked Present in ${courseCode}` : `Marked Absent in ${courseCode}`,
      `Attendance updated for ${courseCode}.`
    );
  };

  // Update profile
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setCurrentUser(prev => ({ ...prev, ...updated }));
    handleTriggerNotification('reminder', 'Profile Updated', 'Your student contact records have been saved.');
  };

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* 1) 5-Second Splash Screen */}
      {showSplash && (
        <SplashScreen 
          onComplete={() => setShowSplash(false)} 
          duration={5} 
        />
      )}

      {/* 2) Login Screen Modal (Sign in / Sign up / Email / Preview Demo) */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsLoginModalOpen(false);
          handleTriggerNotification('next_class', `Logged in as ${user.name}`, `Welcome to ${user.department} portal.`);
        }}
        onClose={() => setIsLoginModalOpen(false)}
      />

      {/* Top Navigation Bar */}
      <HeaderNavbar
        currentUser={currentUser}
        activeView={activeView}
        setActiveView={setActiveView}
        unreadNotifsCount={unreadNotifsCount}
        onOpenNotifications={() => setIsNotifDrawerOpen(true)}
        onOpenMongoDbModal={() => setIsMongoDbModalOpen(true)}
        onOpenDownloadZip={() => setIsZipModalOpen(true)}
        onSwitchRole={handleSwitchRole}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {activeView === 'dashboard' && (
          <DashboardView
            currentUser={currentUser}
            announcements={announcements}
            attendance={attendance}
            assignments={assignments}
            setActiveView={setActiveView}
            onTriggerNotification={handleTriggerNotification}
            onOpenDownloadZip={() => setIsZipModalOpen(true)}
          />
        )}

        {activeView === 'timetable' && (
          <TimetableView />
        )}

        {activeView === 'curve' && (
          <GradeCurveView />
        )}

        {activeView === 'courses' && (
          <CourseDetailView />
        )}

        {activeView === 'assignments' && (
          <AssignmentView
            assignments={assignments}
            currentUser={currentUser}
            onSubmitAssignment={handleSubmitAssignment}
            onCreateAssignment={handleCreateAssignment}
          />
        )}

        {activeView === 'attendance' && (
          <AttendanceView
            attendanceList={attendance}
            onMarkAttendance={handleMarkAttendance}
          />
        )}

        {activeView === 'profile' && (
          <ProfileView
            currentUser={currentUser}
            onUpdateProfile={handleUpdateProfile}
            onSwitchRole={handleSwitchRole}
          />
        )}
      </main>

      {/* 9) Popup Notifications Center & Floating Toast */}
      <NotificationCenter
        isOpen={isNotifDrawerOpen}
        onClose={() => setIsNotifDrawerOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotifsAsRead}
        onTriggerNotification={handleTriggerNotification}
        activeToast={activeToast}
        onDismissToast={() => setActiveToast(null)}
      />

      {/* Local MongoDB MERN Setup Modal */}
      <MongoDbInfoModal
        isOpen={isMongoDbModalOpen}
        onClose={() => setIsMongoDbModalOpen(false)}
        onOpenDownloadZip={() => setIsZipModalOpen(true)}
      />

      {/* Download Source Code ZIP & VS Code Setup Modal */}
      <DownloadZipModal
        isOpen={isZipModalOpen}
        onClose={() => setIsZipModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-4 px-4 sm:px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Government College of Technology, Bhakkar • Computer Information Technology (DAE CIT)
          </span>
          <span className="text-emerald-700 font-medium">
            Assignment No: 1 • MERN Stack Architecture
          </span>
        </div>
      </footer>
    </div>
  );
}
