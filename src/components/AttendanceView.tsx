import { useState } from 'react';
import { AttendanceRecord } from '../types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Calculator, 
  TrendingUp, 
  Clock, 
  UserCheck, 
  UserX, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface AttendanceViewProps {
  attendanceList: AttendanceRecord[];
  onMarkAttendance: (courseCode: string, present: boolean) => void;
}

export default function AttendanceView({
  attendanceList,
  onMarkAttendance
}: AttendanceViewProps) {
  const [selectedCourseCode, setSelectedCourseCode] = useState<string>(attendanceList[0]?.courseCode || 'CIT-204');
  const [simulatedFutureClasses, setSimulatedFutureClasses] = useState<number>(5);
  const [simulatedAttended, setSimulatedAttended] = useState<number>(5);

  const totalClassesAll = attendanceList.reduce((acc, curr) => acc + curr.totalClasses, 0);
  const attendedClassesAll = attendanceList.reduce((acc, curr) => acc + curr.attendedClasses, 0);
  const overallPct = totalClassesAll > 0 ? ((attendedClassesAll / totalClassesAll) * 100).toFixed(1) : '85.0';
  const isEligible = Number(overallPct) >= 75.0;

  const selectedRecord = attendanceList.find(a => a.courseCode === selectedCourseCode) || attendanceList[0];

  // Calculate simulated percentage for selected course
  const simTotal = selectedRecord.totalClasses + simulatedFutureClasses;
  const simAttended = selectedRecord.attendedClasses + simulatedAttended;
  const simPercentage = ((simAttended / simTotal) * 100).toFixed(1);

  // Calculate classes needed to reach 75% if below
  const getClassesNeeded = (attended: number, total: number) => {
    // (attended + x) / (total + x) >= 0.75
    // attended + x >= 0.75 * total + 0.75 * x
    // 0.25 * x >= 0.75 * total - attended
    // x >= 3 * total - 4 * attended
    const needed = Math.ceil(3 * total - 4 * attended);
    return Math.max(0, needed);
  };

  return (
    <div id="attendance-view-container" className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Attendance & Board Exam Eligibility</h1>
              <p className="text-xs text-slate-500">
                PBTE Regulation • Strict 75% Minimum Attendance Threshold Enforced
              </p>
            </div>
          </div>

          <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${
            isEligible 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
              : 'bg-red-50 border-red-200 text-red-900'
          }`}>
            {isEligible ? (
              <>
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <div>
                  <div className="text-xs font-bold">Board Exam Eligible</div>
                  <div className="text-[10px] text-emerald-700">Overall: {overallPct}% (Above 75%)</div>
                </div>
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <div>
                  <div className="text-xs font-bold">Attendance Warning</div>
                  <div className="text-[10px] text-red-700">Overall: {overallPct}% (Below 75%)</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Subject-wise attendance list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="font-bold text-slate-800">Enrolled Courses Attendance Records</span>
            <span>Total Attended: {attendedClassesAll} / {totalClassesAll} classes</span>
          </div>

          <div className="space-y-3">
            {attendanceList.map((rec) => {
              const meetsTarget = rec.percentage >= 75;
              const classesNeeded = getClassesNeeded(rec.attendedClasses, rec.totalClasses);

              return (
                <div
                  key={rec.courseCode}
                  id={`attendance-card-${rec.courseCode}`}
                  className={`bg-white rounded-xl border p-4 transition-all shadow-xs ${
                    meetsTarget ? 'border-slate-200 hover:border-emerald-500' : 'border-red-200 bg-red-50/20'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                          {rec.courseCode}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{rec.courseTitle}</h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Instructor: {rec.instructor}</p>
                    </div>

                    <div className="flex items-center gap-3 text-right">
                      <div>
                        <span className={`text-xl font-extrabold ${
                          meetsTarget ? 'text-emerald-700' : 'text-red-600'
                        }`}>
                          {rec.percentage}%
                        </span>
                        <span className="text-[11px] text-slate-500 block font-medium">
                          {rec.attendedClasses} of {rec.totalClasses} classes
                        </span>
                      </div>

                      {/* Quick mark action buttons */}
                      <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
                        <button
                          onClick={() => onMarkAttendance(rec.courseCode, true)}
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                          title="Simulate Attend Today"
                        >
                          <UserCheck className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onMarkAttendance(rec.courseCode, false)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors"
                          title="Simulate Miss Today"
                        >
                          <UserX className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
                    {/* 75% target marker */}
                    <div className="absolute top-0 bottom-0 left-[75%] w-0.5 bg-slate-400 z-10"></div>
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        meetsTarget ? 'bg-emerald-600' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, rec.percentage)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] mt-2">
                    <span className="text-slate-400">Target Line: 75%</span>
                    {meetsTarget ? (
                      <span className="text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Eligible for final exams
                      </span>
                    ) : (
                      <span className="text-red-700 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Must attend next {classesNeeded} consecutive classes to reach 75%
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Column: What-If Attendance Calculator & Simulator */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Calculator className="w-4 h-4 text-emerald-700" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Attendance What-If Planner</h3>
                <p className="text-xs text-slate-500">Forecast your eligibility</p>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Subject</label>
                <select
                  value={selectedCourseCode}
                  onChange={(e) => setSelectedCourseCode(e.target.value)}
                  className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white font-semibold text-slate-800"
                >
                  {attendanceList.map(a => (
                    <option key={a.courseCode} value={a.courseCode}>
                      {a.courseCode} ({a.percentage}%) - {a.courseTitle}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-700 mb-1">
                  <span>Upcoming Classes</span>
                  <span className="font-bold text-slate-900">{simulatedFutureClasses} classes</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={simulatedFutureClasses}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSimulatedFutureClasses(val);
                    if (simulatedAttended > val) setSimulatedAttended(val);
                  }}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-700 mb-1">
                  <span>Classes You Will Attend</span>
                  <span className="font-bold text-emerald-800">{simulatedAttended} classes</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={simulatedFutureClasses}
                  value={simulatedAttended}
                  onChange={(e) => setSimulatedAttended(Number(e.target.value))}
                  className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Simulation Result */}
              <div className={`p-4 rounded-xl border text-center space-y-1 ${
                Number(simPercentage) >= 75 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
              }`}>
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Predicted Final Attendance</span>
                <div className="text-3xl font-extrabold text-slate-900">{simPercentage}%</div>
                <p className={`text-xs font-bold ${
                  Number(simPercentage) >= 75 ? 'text-emerald-700' : 'text-red-700'
                }`}>
                  {Number(simPercentage) >= 75 
                    ? '✓ Will retain exam eligibility' 
                    : '⚠️ Still short of 75% requirement'}
                </p>
              </div>

              <div className="text-[11px] text-slate-500">
                Current Standing: {selectedRecord.attendedClasses} / {selectedRecord.totalClasses} classes ({selectedRecord.percentage}%)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
