import { useState } from 'react';
import { Course } from '../types';
import { COURSES } from '../data/portalData';
import { 
  BookOpen, 
  Clock, 
  MapPin, 
  User, 
  BookMarked, 
  CheckCircle, 
  Layers, 
  Search, 
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';

export default function CourseDetailView() {
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(COURSES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterYear, setFilterYear] = useState<string>('All');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = filterYear === 'All' || course.year === filterYear;
    return matchesSearch && matchesYear;
  });

  return (
    <div id="course-detail-container" className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">CIT Curriculum & Course Details</h1>
              <p className="text-xs text-slate-500">
                PBTE Approved Course Outlines • Theory Credits • Laboratory Manuals
              </p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="input-course-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search course or teacher..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48 sm:w-56"
              />
            </div>

            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Years</option>
              <option value="1st Year">1st Year CIT</option>
              <option value="2nd Year">2nd Year CIT</option>
              <option value="3rd Year">3rd Year CIT</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid: Course List on Left, Selected Course Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Course Cards */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Enrolled CIT Courses ({filteredCourses.length})
          </div>

          {filteredCourses.map((course) => {
            const isSelected = selectedCourse?.code === course.code;
            return (
              <div
                key={course.code}
                id={`course-card-${course.code}`}
                onClick={() => setSelectedCourse(course)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-1 ring-emerald-500'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                    {course.code}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Cr: {course.creditHours}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{course.title}</h3>

                <div className="flex items-center justify-between text-xs text-slate-500 mt-2.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1 truncate max-w-[150px]">
                    <User className="w-3 h-3 text-slate-400" />
                    <span className="truncate">{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1 font-medium text-emerald-700">
                    <span>Inspect</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Full Course Details Specification */}
        <div className="lg:col-span-2">
          {selectedCourse ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
              {/* Header Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold px-2.5 py-0.5 rounded-md bg-emerald-700 text-white font-mono">
                      {selectedCourse.code}
                    </span>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {selectedCourse.year} CIT
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 mt-2">
                    {selectedCourse.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <div className="text-center px-2">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Theory</div>
                    <div className="text-base font-extrabold text-slate-900">{selectedCourse.theoryHours}h/wk</div>
                  </div>
                  <div className="w-px h-8 bg-slate-200"></div>
                  <div className="text-center px-2">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Practical</div>
                    <div className="text-base font-extrabold text-emerald-700">{selectedCourse.practicalHours}h/wk</div>
                  </div>
                </div>
              </div>

              {/* Course Instructor & Venue */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Assigned Faculty</div>
                    <div className="text-xs font-bold text-slate-900">{selectedCourse.instructor}</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Teaching Venue</div>
                    <div className="text-xs font-bold text-slate-900">{selectedCourse.venue}</div>
                  </div>
                </div>
              </div>

              {/* Course Description */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Course Overview & Objectives
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                  {selectedCourse.description}
                </p>
              </div>

              {/* Syllabus Breakdown */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  PBTE Approved Syllabus Outline
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedCourse.syllabus.map((topic, i) => (
                    <div key={i} className="p-3 rounded-lg border border-slate-200 bg-white flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-xs font-medium text-slate-800">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Textbooks */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <BookMarked className="w-3.5 h-3.5 text-slate-500" />
                  Recommended Reference Books
                </h3>
                <ul className="space-y-1.5">
                  {selectedCourse.recommendedBooks.map((book, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      <span>{book}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-400 text-xs">
              Select a course from the list to view its complete details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
