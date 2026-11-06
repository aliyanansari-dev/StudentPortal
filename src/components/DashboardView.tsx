import { useState } from 'react';
import { UserProfile, Announcement, AttendanceRecord, Assignment } from '../types';
import { COLLEGE_INFO, TIMETABLES } from '../data/portalData';
import { 
  AlertTriangle, 
  Calendar, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  FileText, 
  Bell, 
  ChevronRight, 
  GraduationCap, 
  Megaphone,
  BookOpen,
  ArrowUpRight,
  ShieldAlert,
  Sparkles,
  Download
} from 'lucide-react';

interface DashboardViewProps {
  currentUser: UserProfile;
  announcements: Announcement[];
  attendance: AttendanceRecord[];
  assignments: Assignment[];
  setActiveView: (view: string) => void;
  onTriggerNotification: (type: 'class_shift' | 'class_end' | 'next_class' | 'break_time' | 'reminder') => void;
  onOpenDownloadZip?: () => void;
}

export default function DashboardView({
  currentUser,
  announcements,
  attendance,
  assignments,
  setActiveView,
  onTriggerNotification,
  onOpenDownloadZip
}: DashboardViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Compute metrics
  const totalClasses = attendance.reduce((sum, item) => sum + item.totalClasses, 0);
  const attendedClasses = attendance.reduce((sum, item) => sum + item.attendedClasses, 0);
  const overallAttendance = totalClasses > 0 ? ((attendedClasses / totalClasses) * 100).toFixed(1) : '85.0';
  const pendingAssignments = assignments.filter(a => a.status === 'Pending').length;

  const filteredAnnouncements = selectedCategory === 'All' 
    ? announcements 
    : announcements.filter(a => a.category === selectedCategory);

  // Today's schedule preview (e.g. Monday schedule from 2nd Year CIT)
  const currentTimetable = TIMETABLES[1]; // 2nd year default for demo
  const todaySchedule = currentTimetable.schedule[0]; // Monday

  return (
    <div id="dashboard-view-container" className="space-y-6 pb-12">
      {/* Welcome & Status Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/10 pointer-events-none rounded-l-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-500/30">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{COLLEGE_INFO.department} • {currentUser.shift} Session</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {currentUser.name}!
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              {currentUser.role === 'student' 
                ? `Roll No: ${currentUser.rollNo} • DAE CIT ${currentUser.year || '2nd Year'} • Affiliated with PBTE Lahore & TEVTA`
                : `${currentUser.designation} • ${currentUser.specialization}`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              id="btn-dash-timetable"
              onClick={() => setActiveView('timetable')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md"
            >
              <Calendar className="w-4 h-4" /> View Full TimeTable
            </button>
            {onOpenDownloadZip && (
              <button
                id="btn-dash-download-zip"
                onClick={onOpenDownloadZip}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-emerald-50 font-bold text-xs transition-all shadow-md"
              >
                <Download className="w-4 h-4 text-emerald-700" /> Download ZIP
              </button>
            )}
            <button
              id="btn-dash-notifications"
              onClick={() => onTriggerNotification('next_class')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/15 transition-colors backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" /> Test Alert
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Metric */}
        <div 
          onClick={() => setActiveView('attendance')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Overall Attendance</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{overallAttendance}%</span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              PBTE Req: 75%
            </span>
          </div>
          <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-600 h-full rounded-full" 
              style={{ width: `${Math.min(100, Number(overallAttendance))}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5">
            {Number(overallAttendance) >= 75 ? '✓ Board exam eligible' : '⚠️ Warning: below threshold'}
          </p>
        </div>

        {/* CGPA / Curve Metric */}
        <div 
          onClick={() => setActiveView('curve')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Current CGPA</span>
            <TrendingUp className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">3.68</span>
            <span className="text-xs text-slate-400">/ 4.00</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-medium mt-2.5 flex items-center gap-1">
            Top 15% on Department Bell Curve <ArrowUpRight className="w-3 h-3" />
          </p>
        </div>

        {/* Pending Assignments Metric */}
        <div 
          onClick={() => setActiveView('assignments')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Pending Tasks</span>
            <FileText className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{pendingAssignments}</span>
            <span className="text-xs text-amber-600 font-medium">Due this week</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2.5 truncate">
            CIT-204 ERD Diagram due Sep 25
          </p>
        </div>

        {/* Daily Schedule Metric */}
        <div 
          onClick={() => setActiveView('timetable')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold">Today's Lectures</span>
            <Clock className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{todaySchedule.slots.length}</span>
            <span className="text-xs text-blue-600 font-medium">Lectures & Labs</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2.5 truncate">
            Next: CIT-204 in Computer Lab-1
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Important Info & Announcements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Important College Notices Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold">
                  <Megaphone className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Important College Notices & Circulars</h2>
                  <p className="text-xs text-slate-500">Government College of Technology, Bhakkar Official Notice Board</p>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto text-xs">
                {['All', 'Exam', 'Academic', 'General'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Announcement Items */}
            <div className="divide-y divide-slate-100 mt-3">
              {filteredAnnouncements.map((item) => (
                <div key={item.id} className="py-3.5 first:pt-2 last:pb-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    {item.isUrgent && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 uppercase tracking-wide">
                        <ShieldAlert className="w-3 h-3" /> Urgent
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono ml-auto">{item.date}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-800 hover:text-emerald-700 cursor-pointer">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Notification Trigger Bar */}
          <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-sm">Interactive Pop-up Notification Simulator</span>
              </div>
              <span className="text-slate-400 text-xs">Simulate College Events</span>
            </div>
            <p className="text-slate-300 text-xs mb-3">
              Test the real-time notification popups specified in the assignment criteria:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                id="btn-sim-shift"
                onClick={() => onTriggerNotification('class_shift')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-amber-300 transition-colors"
              >
                🔄 Class Shift
              </button>
              <button
                id="btn-sim-end"
                onClick={() => onTriggerNotification('class_end')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                🔔 Class End
              </button>
              <button
                id="btn-sim-next"
                onClick={() => onTriggerNotification('next_class')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-emerald-300 transition-colors"
              >
                ⏰ Next Class
              </button>
              <button
                id="btn-sim-break"
                onClick={() => onTriggerNotification('break_time')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-cyan-300 transition-colors"
              >
                ☕ Break Time
              </button>
              <button
                id="btn-sim-reminder"
                onClick={() => onTriggerNotification('reminder')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-pink-300 transition-colors"
              >
                📌 Reminder
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Today's Schedule & Academic Quick Links */}
        <div className="space-y-6">
          {/* Today's Schedule Widget */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-sm text-slate-900">Today's Class Schedule</h3>
              </div>
              <button
                onClick={() => setActiveView('timetable')}
                className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-0.5"
              >
                Full Grid <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5 mt-3">
              {todaySchedule.slots.slice(0, 5).map((slot) => (
                <div 
                  key={slot.lectureNo} 
                  className="p-2.5 rounded-lg bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-800 font-mono">Lec {slot.lectureNo} ({slot.timeSlot})</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      slot.type === 'P' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {slot.type === 'P' ? 'Lab / Practical' : 'Theory'}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">{slot.courseCode} - {slot.courseTitle}</div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                    <span>{slot.instructor}</span>
                    <span className="font-semibold text-emerald-700">{slot.venue}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 flex items-center justify-between">
              <span className="font-semibold">☕ Break Time:</span>
              <span>10:45 AM - 11:15 AM</span>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Portal Navigation</h4>

            <button
              onClick={() => setActiveView('courses')}
              className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>CIT Courses & Syllabus</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveView('curve')}
              className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-600" />
                <span>Grade Curve & GPA Analysis</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => setActiveView('attendance')}
              className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>75% Attendance Planner</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
