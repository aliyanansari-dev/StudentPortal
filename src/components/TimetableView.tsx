import { useState } from 'react';
import { TIMETABLES, COLLEGE_INFO } from '../data/portalData';
import { 
  Calendar, 
  Search, 
  Printer, 
  MapPin, 
  User, 
  Clock, 
  CheckCircle,
  Coffee,
  Sparkles
} from 'lucide-react';

export default function TimetableView() {
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(1); // Default to 2nd Year CIT
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'day' | 'matrix'>('day');

  const currentYearData = TIMETABLES[selectedYearIndex];
  const currentDaySchedule = currentYearData.schedule.find(d => d.day === selectedDay) || currentYearData.schedule[0];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const filteredDaySlots = currentDaySchedule.slots.filter(slot => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      slot.courseCode.toLowerCase().includes(query) ||
      slot.courseTitle.toLowerCase().includes(query) ||
      slot.instructor.toLowerCase().includes(query) ||
      slot.venue.toLowerCase().includes(query)
    );
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="timetable-view-container" className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <Calendar className="w-5 h-5" />
              </span>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  {COLLEGE_INFO.name} - CIT Timetable
                </h1>
                <p className="text-xs text-slate-500">
                  {COLLEGE_INFO.department} • {COLLEGE_INFO.session} • w.e.f {COLLEGE_INFO.effectiveDate}
                </p>
              </div>
            </div>
          </div>

          {/* Action controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="input-timetable-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subject or teacher..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48 sm:w-56"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs font-semibold">
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-1 rounded-md transition-all ${
                  viewMode === 'day' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Day View
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`px-3 py-1 rounded-md transition-all ${
                  viewMode === 'matrix' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Full Matrix
              </button>
            </div>

            {/* Print button */}
            <button
              id="btn-print-timetable"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
              title="Print Timetable"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>
          </div>
        </div>

        {/* Year Selector Tabs */}
        <div className="flex items-center gap-2 mt-5 border-t border-slate-100 pt-4 overflow-x-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">Class Year:</span>
          {TIMETABLES.map((item, idx) => (
            <button
              key={item.year}
              id={`tab-year-${idx}`}
              onClick={() => setSelectedYearIndex(idx)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                selectedYearIndex === idx
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item.year}
            </button>
          ))}
        </div>
      </div>

      {/* Day Selector (for Day View) */}
      {viewMode === 'day' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {daysOfWeek.map((day) => {
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                id={`btn-day-${day.toLowerCase()}`}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <span>{day}</span>
                {isSelected && <CheckCircle className="w-3 h-3 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Day View Slot Cards */}
      {viewMode === 'day' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="font-semibold text-slate-800">
              Showing {currentYearData.year} • {selectedDay} Schedule
            </span>
            <span>8 Lectures Total • 1 Break Period</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredDaySlots.map((slot) => {
              const isLab = slot.type === 'P' || slot.type === 'T,P';
              return (
                <div
                  key={slot.lectureNo}
                  id={`slot-card-${slot.lectureNo}`}
                  className="bg-white rounded-xl p-4 border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-xs">
                        #{slot.lectureNo}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{slot.timeSlot}</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5 group-hover:text-emerald-800">
                          {slot.courseCode}
                        </h3>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
                      isLab ? 'bg-purple-100 text-purple-800 border border-purple-200' : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {slot.type === 'P' ? 'Practical Lab' : slot.type === 'T,P' ? 'Theory + Lab' : 'Theory Lecture'}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-slate-700 mt-2.5">
                    {slot.courseTitle}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium text-slate-800">{slot.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-600 font-semibold bg-slate-100 px-2 py-0.5 rounded">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>{slot.venue}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* College Break Banner */}
          <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-200 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-amber-700" />
              <span className="font-bold">Scheduled College Break:</span>
              <span>10:45 AM - 11:15 AM (Refectory & Prayer Break)</span>
            </div>
            <span className="text-[11px] text-amber-800 font-medium">Campus Mosque & Canteen Open</span>
          </div>
        </div>
      )}

      {/* Complete Matrix View (Table Format matching the original notice board document) */}
      {viewMode === 'matrix' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold">{currentYearData.year} - Master Timetable Grid</h3>
              <p className="text-xs text-emerald-300">Govt. College of Technology, Bhakkar (Self Finance 2026-27)</p>
            </div>
            <span className="text-xs text-slate-300 bg-white/10 px-2.5 py-1 rounded">
              Lec 1 - Lec 8 with Scheduled Breaks
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                  <th className="p-3 border-r border-slate-200 w-24">Day</th>
                  <th className="p-3 border-r border-slate-200 text-center">Lec 1<br/><span className="text-[9px] font-normal">08:30-09:15</span></th>
                  <th className="p-3 border-r border-slate-200 text-center">Lec 2<br/><span className="text-[9px] font-normal">09:15-10:00</span></th>
                  <th className="p-3 border-r border-slate-200 text-center">Lec 3<br/><span className="text-[9px] font-normal">10:00-10:45</span></th>
                  <th className="p-2 bg-amber-100/70 border-r border-slate-200 text-center text-amber-900 font-bold w-14">BREAK</th>
                  <th className="p-3 border-r border-slate-200 text-center">Lec 4<br/><span className="text-[9px] font-normal">11:15-12:00</span></th>
                  <th className="p-3 border-r border-slate-200 text-center">Lec 5<br/><span className="text-[9px] font-normal">12:00-12:45</span></th>
                  <th className="p-3 border-r border-slate-200 text-center">Lec 6<br/><span className="text-[9px] font-normal">12:45-01:30</span></th>
                  <th className="p-3 text-center">Lec 7<br/><span className="text-[9px] font-normal">01:30-02:15</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {currentYearData.schedule.map((dayPlan) => (
                  <tr key={dayPlan.day} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900 border-r border-slate-200 bg-slate-50/70">
                      {dayPlan.day}
                    </td>

                    {/* Render lectures */}
                    {[1, 2, 3].map((lecNum) => {
                      const slot = dayPlan.slots.find(s => s.lectureNo === lecNum);
                      return (
                        <td key={lecNum} className="p-2.5 border-r border-slate-200 align-top text-center">
                          {slot ? (
                            <div className="p-1 rounded bg-slate-50 border border-slate-200 text-[11px]">
                              <div className="font-bold text-slate-900">{slot.courseCode}</div>
                              <div className="text-[10px] text-slate-600 truncate">{slot.instructor}</div>
                              <div className="text-[9px] text-emerald-700 font-semibold">{slot.venue}</div>
                            </div>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </td>
                      );
                    })}

                    {/* Break column */}
                    <td className="p-2 bg-amber-50/50 border-r border-slate-200 text-center text-[10px] text-amber-800 font-semibold writing-mode-vertical">
                      Break
                    </td>

                    {/* Lec 4 to 7 */}
                    {[4, 5, 6, 7].map((lecNum) => {
                      const slot = dayPlan.slots.find(s => s.lectureNo === lecNum);
                      return (
                        <td key={lecNum} className="p-2.5 border-r border-slate-200 align-top text-center">
                          {slot ? (
                            <div className="p-1 rounded bg-slate-50 border border-slate-200 text-[11px]">
                              <div className="font-bold text-slate-900">{slot.courseCode}</div>
                              <div className="text-[10px] text-slate-600 truncate">{slot.instructor}</div>
                              <div className="text-[9px] text-emerald-700 font-semibold">{slot.venue}</div>
                            </div>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Official Signatories Footer (Faithful to the original College document) */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-slate-700">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
          Official Academic Administration Verification
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
          <div className="border-t border-slate-300 pt-2">
            <div className="font-bold text-slate-900">{COLLEGE_INFO.timeTableIncharge}</div>
            <div className="text-slate-500 font-medium">Time Table Incharge</div>
          </div>
          <div className="border-t border-slate-300 pt-2">
            <div className="font-bold text-slate-900">{COLLEGE_INFO.hodCit}</div>
            <div className="text-slate-500 font-medium">HOD CIT Department</div>
          </div>
          <div className="border-t border-slate-300 pt-2">
            <div className="font-bold text-slate-900">{COLLEGE_INFO.academicIncharge}</div>
            <div className="text-slate-500 font-medium">Academic Incharge</div>
          </div>
        </div>
      </div>
    </div>
  );
}
