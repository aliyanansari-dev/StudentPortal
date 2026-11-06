import { useState } from 'react';
import { GRADE_DISTRIBUTION_DATA } from '../data/portalData';
import { 
  TrendingUp, 
  Award, 
  BarChart3, 
  Sliders, 
  Percent, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export default function GradeCurveView() {
  // Interactive Simulator States
  const [midtermScore, setMidtermScore] = useState<number>(82);
  const [labScore, setLabScore] = useState<number>(88);
  const [assignmentScore, setAssignmentScore] = useState<number>(90);
  const [quizScore, setQuizScore] = useState<number>(80);

  // Weighted calculation (Midterm: 30%, Lab Practical: 30%, Assignment: 25%, Quizzes: 15%)
  const calculatedTotal = Math.round(
    (midtermScore * 0.3) + 
    (labScore * 0.3) + 
    (assignmentScore * 0.25) + 
    (quizScore * 0.15)
  );

  const getGradeInfo = (score: number) => {
    if (score >= 85) return { grade: 'A+', gpa: '4.00', percentile: 'Top 8%', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' };
    if (score >= 80) return { grade: 'A', gpa: '3.70', percentile: 'Top 25%', color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' };
    if (score >= 75) return { grade: 'B+', gpa: '3.30', percentile: 'Top 45%', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' };
    if (score >= 70) return { grade: 'B', gpa: '3.00', percentile: 'Above Average', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' };
    if (score >= 60) return { grade: 'C', gpa: '2.50', percentile: 'Average', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' };
    return { grade: 'F', gpa: '0.00', percentile: 'Below Passing', color: 'text-red-700', bg: 'bg-red-50 border-red-200' };
  };

  const studentGrade = getGradeInfo(calculatedTotal);

  return (
    <div id="grade-curve-container" className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Academic Curve & Grading Analytics</h1>
              <p className="text-xs text-slate-500">
                Department of CIT • Normal Gaussian Distribution & Percentile Analysis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-teal-800 rounded-lg border border-teal-200">
              Mean: 78.4% • Median: 81.0%
            </span>
          </div>
        </div>
      </div>

      {/* Main Curve Analysis Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Visual Bell Curve & Grade Distribution */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-700" />
                <h2 className="text-sm font-bold text-slate-900">Department Grading Bell Curve</h2>
              </div>
              <span className="text-xs text-slate-400">Sample of 50 CIT Enrolled Students</span>
            </div>

            {/* Bell Curve Histogram visualization */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <div className="flex items-end justify-between h-48 gap-2 pt-6 px-2 border-b border-slate-300">
                {GRADE_DISTRIBUTION_DATA.map((band) => {
                  const isCurrentBand = studentGrade.grade === band.grade;
                  return (
                    <div key={band.grade} className="flex-1 flex flex-col items-center h-full justify-end group">
                      {/* Floating tooltip/pill */}
                      <span className={`text-[10px] font-bold mb-1.5 transition-transform ${
                        isCurrentBand ? 'text-emerald-700 scale-110' : 'text-slate-500 group-hover:scale-105'
                      }`}>
                        {band.studentCount} stds ({band.percentage}%)
                      </span>

                      {/* Bar */}
                      <div 
                        className={`w-full max-w-[48px] rounded-t-lg transition-all duration-500 relative ${
                          isCurrentBand 
                            ? 'bg-gradient-to-t from-emerald-600 to-teal-500 shadow-md shadow-emerald-500/20 ring-2 ring-emerald-400' 
                            : 'bg-slate-300 hover:bg-slate-400'
                        }`}
                        style={{ height: `${(band.percentage / 30) * 100}%` }}
                      >
                        {isCurrentBand && (
                          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold py-0.5 px-1.5 rounded whitespace-nowrap shadow-md">
                            You're here!
                          </span>
                        )}
                      </div>

                      {/* Grade X-axis label */}
                      <div className="text-center mt-2">
                        <span className={`block font-bold text-xs ${isCurrentBand ? 'text-emerald-800' : 'text-slate-800'}`}>
                          {band.grade}
                        </span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{band.range}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-4 px-2">
                <span>← Lower Percentiles (Academic Probation Risk)</span>
                <span className="font-semibold text-emerald-700">Median GPA: 3.30</span>
                <span>Upper Percentiles (Dean's Honor Roll) →</span>
              </div>
            </div>

            {/* Standard Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
                <span className="text-[11px] text-slate-500 font-semibold block">Class Mean</span>
                <span className="text-lg font-extrabold text-slate-800">78.4%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
                <span className="text-[11px] text-slate-500 font-semibold block">Std Deviation (σ)</span>
                <span className="text-lg font-extrabold text-slate-800">11.2</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
                <span className="text-[11px] text-slate-500 font-semibold block">Highest Score</span>
                <span className="text-lg font-extrabold text-emerald-700">97.0%</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
                <span className="text-[11px] text-slate-500 font-semibold block">Pass Percentage</span>
                <span className="text-lg font-extrabold text-teal-700">96.0%</span>
              </div>
            </div>
          </div>

          {/* PBTE Official Grade Scale Reference */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-700" />
              PBTE / TEVTA Official DAE Grading Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="py-2">Letter Grade</th>
                    <th className="py-2">Percentage Marks</th>
                    <th className="py-2">Grade Point (GPA)</th>
                    <th className="py-2">Academic Standing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr><td className="py-2 font-bold text-emerald-800">A+</td><td>85% and above</td><td>4.00</td><td>Exceptional / Gold Medal Tier</td></tr>
                  <tr><td className="py-2 font-bold text-emerald-700">A</td><td>80% - 84%</td><td>3.70</td><td>Excellent</td></tr>
                  <tr><td className="py-2 font-bold text-teal-700">B+</td><td>75% - 79%</td><td>3.30</td><td>Very Good</td></tr>
                  <tr><td className="py-2 font-bold text-blue-700">B</td><td>70% - 74%</td><td>3.00</td><td>Good</td></tr>
                  <tr><td className="py-2 font-bold text-amber-700">C</td><td>60% - 69%</td><td>2.50</td><td>Satisfactory Pass</td></tr>
                  <tr><td className="py-2 font-bold text-red-600">F</td><td>Below 60%</td><td>0.00</td><td>Failed / Remedial Exam Required</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Interactive Grade & Curve Simulator */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Sliders className="w-4 h-4 text-emerald-700" />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Interactive GPA Simulator</h3>
                <p className="text-xs text-slate-500">Calculate where you land on the curve</p>
              </div>
            </div>

            {/* Calculated Result Card */}
            <div className={`mt-4 p-4 rounded-xl border ${studentGrade.bg} text-center space-y-1`}>
              <span className="text-xs font-semibold text-slate-600">Projected Composite Score</span>
              <div className="text-3xl font-extrabold text-slate-900">{calculatedTotal}%</div>
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className={`text-base font-extrabold ${studentGrade.color}`}>
                  Grade {studentGrade.grade}
                </span>
                <span className="text-slate-400">•</span>
                <span className="font-mono text-sm font-bold text-slate-800">
                  {studentGrade.gpa} GPA
                </span>
              </div>
              <div className="text-xs font-medium text-emerald-800 pt-1">
                Curve Standing: {studentGrade.percentile}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4 mt-5">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Midterm Exam (30%)</span>
                  <span className="font-bold text-emerald-800 font-mono">{midtermScore}%</span>
                </div>
                <input
                  id="slider-midterm"
                  type="range"
                  min="40"
                  max="100"
                  value={midtermScore}
                  onChange={(e) => setMidtermScore(Number(e.target.value))}
                  className="w-full accent-emerald-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Practical Labs (30%)</span>
                  <span className="font-bold text-teal-800 font-mono">{labScore}%</span>
                </div>
                <input
                  id="slider-lab"
                  type="range"
                  min="40"
                  max="100"
                  value={labScore}
                  onChange={(e) => setLabScore(Number(e.target.value))}
                  className="w-full accent-teal-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Assignments (25%)</span>
                  <span className="font-bold text-blue-800 font-mono">{assignmentScore}%</span>
                </div>
                <input
                  id="slider-assignment"
                  type="range"
                  min="40"
                  max="100"
                  value={assignmentScore}
                  onChange={(e) => setAssignmentScore(Number(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Quizzes & Viva (15%)</span>
                  <span className="font-bold text-amber-800 font-mono">{quizScore}%</span>
                </div>
                <input
                  id="slider-quiz"
                  type="range"
                  min="40"
                  max="100"
                  value={quizScore}
                  onChange={(e) => setQuizScore(Number(e.target.value))}
                  className="w-full accent-amber-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
              Adjust sliders dynamically to simulate how upcoming lab practicals or assignment submissions shift your GPA.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
