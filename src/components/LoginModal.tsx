import { useState } from 'react';
import { UserRole, UserProfile } from '../types';
import { 
  DEFAULT_STUDENT_PROFILE, 
  DEFAULT_TEACHER_PROFILE, 
  COLLEGE_INFO 
} from '../data/portalData';
import { 
  GraduationCap, 
  UserCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  Briefcase
} from 'lucide-react';

interface LoginModalProps {
  onLoginSuccess: (user: UserProfile) => void;
  isOpen: boolean;
  onClose?: () => void;
}

export default function LoginModal({ onLoginSuccess, isOpen, onClose }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'preview'>('login');
  const [role, setRole] = useState<UserRole>('student');
  
  // Login fields
  const [emailOrRoll, setEmailOrRoll] = useState('aliyanansari24cit105@gmail.com');
  const [password, setPassword] = useState('student123');
  
  // Signup fields
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupRoll, setSignupRoll] = useState('');
  const [signupYear, setSignupYear] = useState<'1st Year' | '2nd Year' | '3rd Year'>('2nd Year');
  const [signupPassword, setSignupPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!emailOrRoll || !password) {
      setErrorMessage('Please provide your Email or Roll Number and password.');
      return;
    }

    if (role === 'teacher') {
      onLoginSuccess({
        ...DEFAULT_TEACHER_PROFILE,
        email: emailOrRoll.includes('@') ? emailOrRoll : DEFAULT_TEACHER_PROFILE.email,
      });
    } else {
      onLoginSuccess({
        ...DEFAULT_STUDENT_PROFILE,
        email: emailOrRoll.includes('@') ? emailOrRoll : DEFAULT_STUDENT_PROFILE.email,
        rollNo: !emailOrRoll.includes('@') ? emailOrRoll.toUpperCase() : '24CIT105',
      });
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail) {
      setErrorMessage('Please fill in your name and email.');
      return;
    }

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: signupName,
      email: signupEmail,
      role: role,
      rollNo: signupRoll || '24CIT999',
      year: signupYear,
      department: 'Computer Information Technology',
      program: 'DAE CIT',
      shift: 'Self Finance',
    };

    onLoginSuccess(newUser);
  };

  const handleQuickPreview = (roleType: 'student' | 'teacher') => {
    if (roleType === 'student') {
      onLoginSuccess(DEFAULT_STUDENT_PROFILE);
    } else {
      onLoginSuccess(DEFAULT_TEACHER_PROFILE);
    }
  };

  return (
    <div 
      id="login-modal-overlay" 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto"
    >
      <div 
        id="login-card" 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
      >
        {/* Header Header banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-700 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <GraduationCap className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight">{COLLEGE_INFO.shortName} Portal</h2>
              <p className="text-xs text-emerald-200">Computer Information Technology (CIT)</p>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="flex gap-1 mt-4 p-1 bg-black/20 rounded-lg">
            <button
              id="tab-btn-login"
              type="button"
              onClick={() => { setActiveTab('login'); setErrorMessage(''); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'login' ? 'bg-white text-emerald-950 shadow-sm' : 'text-emerald-100 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              id="tab-btn-signup"
              type="button"
              onClick={() => { setActiveTab('signup'); setErrorMessage(''); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'signup' ? 'bg-white text-emerald-950 shadow-sm' : 'text-emerald-100 hover:text-white'
              }`}
            >
              Sign Up
            </button>
            <button
              id="tab-btn-preview"
              type="button"
              onClick={() => { setActiveTab('preview'); setErrorMessage(''); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'preview' ? 'bg-emerald-400 text-slate-950 shadow-sm' : 'text-emerald-100 hover:text-white'
              }`}
            >
              ⚡ Preview Demo
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6">
          {/* Quick Preview Tab */}
          {activeTab === 'preview' && (
            <div id="preview-tab-content" className="space-y-4">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Instant One-Click Login (Assignment Evaluation)
                </div>
                Access all 10 portal features immediately without typing credentials. Choose either profile:
              </div>

              <div className="space-y-3">
                <button
                  id="btn-preview-student"
                  type="button"
                  onClick={() => handleQuickPreview('student')}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-900 group-hover:text-emerald-700">
                        Aliyan Ansari (Student)
                      </div>
                      <div className="text-xs text-slate-500">Roll: 24CIT105 • 2nd Year CIT</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  id="btn-preview-teacher"
                  type="button"
                  onClick={() => handleQuickPreview('teacher')}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-slate-900 group-hover:text-teal-700">
                        Engr. Rao M. Haziq (Teacher)
                      </div>
                      <div className="text-xs text-slate-500">Academic Incharge • DBMS & Project Lead</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-medium py-1"
                >
                  Or enter credentials manually
                </button>
              </div>
            </div>
          )}

          {/* Login Form Tab */}
          {activeTab === 'login' && (
            <form id="form-login" onSubmit={handleLogin} className="space-y-4">
              {/* Role selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Portal Role</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-2 transition-all ${
                      role === 'student'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('teacher')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border flex items-center justify-center gap-2 transition-all ${
                      role === 'teacher'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" /> Faculty / Teacher
                  </button>
                </div>
              </div>

              {/* Email / Roll input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {role === 'student' ? 'College Email or Roll Number (e.g. 24CIT105)' : 'Faculty Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-login-email"
                    type="text"
                    value={emailOrRoll}
                    onChange={(e) => setEmailOrRoll(e.target.value)}
                    placeholder={role === 'student' ? '24CIT105 or email@gct' : 'teacher@gctbhakkar.edu.pk'}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Password input */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">Password</label>
                  <span className="text-[11px] text-emerald-600 hover:underline cursor-pointer">Forgot?</span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-2.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              <button
                id="btn-submit-login"
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                Sign In to CIT Portal <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Or click here for 1-click Quick Preview
                </button>
              </div>
            </form>
          )}

          {/* Sign Up Form Tab */}
          {activeTab === 'signup' && (
            <form id="form-signup" onSubmit={handleSignUp} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  id="input-signup-name"
                  type="text"
                  required
                  placeholder="e.g. Aliyan Ansari"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    id="input-signup-email"
                    type="email"
                    required
                    placeholder="student@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Roll Number</label>
                  <input
                    id="input-signup-roll"
                    type="text"
                    placeholder="24CIT105"
                    value={signupRoll}
                    onChange={(e) => setSignupRoll(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Class Year</label>
                  <select
                    value={signupYear}
                    onChange={(e) => setSignupYear(e.target.value as any)}
                    className="w-full px-2.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="1st Year">1st Year CIT</option>
                    <option value="2nd Year">2nd Year CIT</option>
                    <option value="3rd Year">3rd Year CIT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-2 bg-red-50 text-red-700 rounded-lg text-xs">
                  {errorMessage}
                </div>
              )}

              <button
                id="btn-submit-signup"
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-colors shadow-sm mt-2"
              >
                Create Account & Enter Portal
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>{COLLEGE_INFO.department}</span>
          <span className="text-emerald-700 font-medium">DAE Self Finance 2026-27</span>
        </div>
      </div>
    </div>
  );
}
