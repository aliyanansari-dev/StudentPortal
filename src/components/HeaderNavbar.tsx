import { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { COLLEGE_INFO } from '../data/portalData';
import { 
  GraduationCap, 
  Bell, 
  Database, 
  Calendar, 
  TrendingUp, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  User, 
  LayoutDashboard,
  LogOut,
  UserCheck,
  Download
} from 'lucide-react';

interface HeaderNavbarProps {
  currentUser: UserProfile;
  activeView: string;
  setActiveView: (view: string) => void;
  unreadNotifsCount: number;
  onOpenNotifications: () => void;
  onOpenMongoDbModal: () => void;
  onOpenDownloadZip: () => void;
  onSwitchRole: () => void;
  onOpenLogin: () => void;
}

export default function HeaderNavbar({
  currentUser,
  activeView,
  setActiveView,
  unreadNotifsCount,
  onOpenNotifications,
  onOpenMongoDbModal,
  onOpenDownloadZip,
  onSwitchRole,
  onOpenLogin
}: HeaderNavbarProps) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: 'Info' },
    { id: 'timetable', label: 'TimeTable', icon: Calendar },
    { id: 'curve', label: 'Curve & Grades', icon: TrendingUp },
    { id: 'courses', label: 'Course Detail', icon: BookOpen },
    { id: 'assignments', label: 'Assignment', icon: FileText },
    { id: 'attendance', label: 'Attendence', icon: CheckCircle2 },
    { id: 'profile', label: currentUser.role === 'student' ? 'Student Profile' : 'Teacher Profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-sm">
      {/* Top institution alert banner */}
      <div className="bg-slate-900 text-slate-300 px-4 sm:px-6 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
            PBTE Affiliated
          </span>
          <span className="font-semibold text-white">{COLLEGE_INFO.name}</span>
          <span className="hidden md:inline text-slate-400">• CIT Dept ({COLLEGE_INFO.session})</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
            <span>Campus Time:</span>
            <span className="text-emerald-400 font-bold">{currentTime}</span>
          </div>

          <button
            id="btn-open-mongodb"
            onClick={onOpenMongoDbModal}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/40 text-[11px] font-medium transition-colors"
            title="View MERN Stack Local MongoDB Configuration"
          >
            <Database className="w-3 h-3 text-emerald-400" />
            <span>Local MongoDB</span>
          </button>

          <button
            id="btn-open-zip-download"
            onClick={onOpenDownloadZip}
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-semibold transition-colors shadow-xs"
            title="Download ZIP source code and VS Code setup guide"
          >
            <Download className="w-3 h-3" />
            <span>Download ZIP</span>
          </button>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div 
          onClick={() => setActiveView('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-brand"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-700 to-teal-800 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900">GCT Bhakkar</span>
              <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                CIT
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Computer Information Technology Portal</p>
          </div>
        </div>

        {/* Action icons & user profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick role toggle */}
          <button
            id="btn-switch-role-toggle"
            onClick={onSwitchRole}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-400 bg-slate-50 hover:bg-emerald-50/50 text-xs font-semibold text-slate-700 transition-colors"
            title="Switch between Student and Teacher Mode"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Switch to {currentUser.role === 'student' ? 'Teacher' : 'Student'}</span>
          </button>

          {/* Popup notification drawer button */}
          <button
            id="btn-open-notifications"
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Open Notifications"
            title="Open Notifications & Pop-ups"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifsCount > 0 && (
              <span 
                id="badge-unread-notifs"
                className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse"
              >
                {unreadNotifsCount}
              </span>
            )}
          </button>

          {/* User profile capsule */}
          <div 
            id="header-user-capsule"
            onClick={() => setActiveView('profile')}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
              {currentUser.name.charAt(0)}
            </div>
            <div className="text-left hidden md:block leading-tight">
              <div className="text-xs font-bold text-slate-800 truncate max-w-[130px]">{currentUser.name}</div>
              <div className="text-[10px] text-slate-500 capitalize">
                {currentUser.role === 'student' ? `${currentUser.rollNo}` : 'Faculty'}
              </div>
            </div>
          </div>

          {/* Switch/Login button */}
          <button
            id="btn-auth-switch"
            onClick={onOpenLogin}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title="Account Switch / Re-login"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation tab bar */}
      <nav className="bg-slate-50/90 border-t border-slate-200 px-4 sm:px-6 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 sm:space-x-2 py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => setActiveView(item.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-emerald-700 text-white shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1 py-0.2 rounded font-bold uppercase ${
                    isActive ? 'bg-emerald-800 text-emerald-200' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
