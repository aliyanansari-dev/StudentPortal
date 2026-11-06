import { useState } from 'react';
import { UserProfile } from '../types';
import { FACULTY_DIRECTORY, COLLEGE_INFO } from '../data/portalData';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Edit3, 
  ShieldCheck, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Search,
  X
} from 'lucide-react';

interface ProfileViewProps {
  currentUser: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onSwitchRole: () => void;
}

export default function ProfileView({
  currentUser,
  onUpdateProfile,
  onSwitchRole
}: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState<'myProfile' | 'facultyDirectory'>('myProfile');
  const [searchFaculty, setSearchFaculty] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Edit fields
  const [editName, setEditName] = useState(currentUser.name);
  const [editEmail, setEditEmail] = useState(currentUser.email);
  const [editPhone, setEditPhone] = useState(currentUser.phone || '+92 300 1234567');
  const [editAddress, setEditAddress] = useState(currentUser.address || 'Bhakkar City, Punjab, Pakistan');
  const [editBloodGroup, setEditBloodGroup] = useState(currentUser.bloodGroup || 'B+');
  const [editGuardian, setEditGuardian] = useState(currentUser.guardianName || 'M. Ansari');

  const filteredFaculty = FACULTY_DIRECTORY.filter(f => 
    f.name.toLowerCase().includes(searchFaculty.toLowerCase()) ||
    f.designation?.toLowerCase().includes(searchFaculty.toLowerCase()) ||
    f.specialization?.toLowerCase().includes(searchFaculty.toLowerCase())
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: editName,
      email: editEmail,
      phone: editPhone,
      address: editAddress,
      bloodGroup: editBloodGroup,
      guardianName: editGuardian,
    });
    setIsEditing(false);
  };

  return (
    <div id="profile-view-container" className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                {currentUser.role === 'student' ? 'Student Profile & Faculty Directory' : 'Faculty Profile & CIT Directory'}
              </h1>
              <p className="text-xs text-slate-500">
                Government College of Technology, Bhakkar • Verified Academic Identity
              </p>
            </div>
          </div>

          {/* Tab selector */}
          <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('myProfile')}
              className={`px-3.5 py-1.5 rounded-md transition-all ${
                activeTab === 'myProfile' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              My Profile
            </button>
            <button
              onClick={() => setActiveTab('facultyDirectory')}
              className={`px-3.5 py-1.5 rounded-md transition-all ${
                activeTab === 'facultyDirectory' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              CIT Faculty Directory
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: My Profile */}
      {activeTab === 'myProfile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-600 text-white font-extrabold text-3xl flex items-center justify-center shadow-lg shadow-emerald-700/20 mb-4 border-2 border-white">
              {currentUser.name.charAt(0)}
            </div>

            <h2 className="text-lg font-bold text-slate-900">{currentUser.name}</h2>
            <p className="text-xs font-semibold text-emerald-700 mt-0.5">
              {currentUser.role === 'student' ? `Roll No: ${currentUser.rollNo}` : currentUser.designation}
            </p>
            <p className="text-xs text-slate-500 mt-1">{COLLEGE_INFO.name}</p>

            <div className="w-full mt-5 pt-5 border-t border-slate-100 space-y-2.5 text-xs text-left">
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Department:</span>
                <span className="font-semibold text-slate-900">{currentUser.department}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Program:</span>
                <span className="font-semibold text-slate-900">{currentUser.program}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400">Session / Shift:</span>
                <span className="font-semibold text-slate-900">{currentUser.shift}</span>
              </div>
              {currentUser.role === 'student' && (
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Current Year:</span>
                  <span className="font-semibold text-emerald-700">{currentUser.year || '2nd Year'} CIT</span>
                </div>
              )}
            </div>

            <div className="w-full mt-6 space-y-2">
              <button
                id="btn-edit-profile"
                onClick={() => setIsEditing(true)}
                className="w-full py-2 px-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Personal Information
              </button>

              <button
                onClick={onSwitchRole}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                Switch Role to {currentUser.role === 'student' ? 'Faculty / Teacher' : 'Student'}
              </button>
            </div>
          </div>

          {/* Academic & Contact Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Verified Registration & Personal Credentials
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[11px] block">Full Name</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{currentUser.name}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[11px] block">Email Address</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block truncate">{currentUser.email}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[11px] block">Contact Phone</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{currentUser.phone || '+92 300 1234567'}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[11px] block">Blood Group</span>
                  <span className="font-bold text-emerald-700 text-sm mt-0.5 block">{currentUser.bloodGroup || 'B+'}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[11px] block">Guardian / Father's Name</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{currentUser.guardianName || 'M. Ansari'}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 text-[11px] block">Residential Address</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{currentUser.address || 'Bhakkar City, Punjab'}</span>
                </div>
              </div>

              {/* Institutional Affiliation Badge */}
              <div className="mt-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Punjab Board of Technical Education (PBTE) Registration</div>
                  <p className="text-emerald-800 mt-0.5 text-[11px] leading-relaxed">
                    Student is officially enrolled under DAE Computer Information Technology 3-year curriculum. Eligible for PBTE board diploma examinations upon meeting 75% attendance criteria.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: CIT Faculty Directory */}
      {activeTab === 'facultyDirectory' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
            <div>
              <h3 className="text-sm font-bold text-slate-900">CIT Department Faculty Directory</h3>
              <p className="text-xs text-slate-500">Instructors and lecturers from the official 2026-27 timetable</p>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFaculty}
                onChange={(e) => setSearchFaculty(e.target.value)}
                placeholder="Search faculty by name or subject..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-56 sm:w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFaculty.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-emerald-500 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-sm flex items-center justify-center">
                    {teacher.name.split(' ').slice(-1)[0]?.charAt(0) || 'T'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{teacher.name}</h4>
                    <p className="text-xs text-emerald-700 font-medium">{teacher.designation}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-2.5">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{teacher.specialization}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{teacher.officeRoom}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate text-slate-500">{teacher.email}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Edit Profile Information</h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full p-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full p-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Blood Group</label>
                  <input
                    type="text"
                    value={editBloodGroup}
                    onChange={(e) => setEditBloodGroup(e.target.value)}
                    className="w-full p-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Guardian / Father Name</label>
                <input
                  type="text"
                  value={editGuardian}
                  onChange={(e) => setEditGuardian(e.target.value)}
                  className="w-full p-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Address</label>
                <input
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className="w-full p-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
