import { useState } from 'react';
import { Assignment, UserProfile } from '../types';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  Upload, 
  Plus, 
  AlertCircle, 
  FileUp, 
  X,
  Calendar,
  Sparkles
} from 'lucide-react';

interface AssignmentViewProps {
  assignments: Assignment[];
  currentUser: UserProfile;
  onSubmitAssignment: (assignmentId: string, note: string, fileName: string) => void;
  onCreateAssignment: (assignment: Partial<Assignment>) => void;
}

export default function AssignmentView({
  assignments,
  currentUser,
  onSubmitAssignment,
  onCreateAssignment
}: AssignmentViewProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Pending' | 'Submitted' | 'Graded'>('All');
  const [selectedForSubmit, setSelectedForSubmit] = useState<Assignment | null>(null);
  const [submissionNote, setSubmissionNote] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  
  // Teacher create assignment modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCourseCode, setNewCourseCode] = useState('CIT-204');
  const [newCourseTitle, setNewCourseTitle] = useState('Database Management Systems');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newMarks, setNewMarks] = useState('20');

  const filtered = assignments.filter(a => {
    if (activeFilter === 'All') return true;
    return a.status === activeFilter;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleDoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForSubmit) return;
    onSubmitAssignment(
      selectedForSubmit.id, 
      submissionNote || 'Assignment submitted on time via portal', 
      uploadedFileName || 'assignment_submission.pdf'
    );
    setSelectedForSubmit(null);
    setSubmissionNote('');
    setUploadedFileName('');
  };

  const handleDoCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    onCreateAssignment({
      courseCode: newCourseCode,
      courseTitle: newCourseTitle,
      title: newTitle,
      description: newDescription,
      dueDate: newDueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      totalMarks: Number(newMarks) || 20,
      status: 'Pending',
      instructor: currentUser.name,
    });
    setShowCreateModal(false);
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div id="assignment-view-container" className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">CIT Assignments & Lab Tasks</h1>
              <p className="text-xs text-slate-500">
                Department Course Submissions • Graded Feedback • PBTE Evaluation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser.role === 'teacher' && (
              <button
                id="btn-create-assignment"
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" /> Create New Assignment
              </button>
            )}

            {/* Status Filter Pills */}
            <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs font-semibold">
              {(['All', 'Pending', 'Submitted', 'Graded'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeFilter === tab ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((asg) => {
          const isPending = asg.status === 'Pending';
          const isSubmitted = asg.status === 'Submitted';
          const isGraded = asg.status === 'Graded';

          return (
            <div
              key={asg.id}
              id={`assignment-card-${asg.id}`}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-emerald-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono">
                    {asg.courseCode}
                  </span>

                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    isPending ? 'bg-amber-100 text-amber-800' :
                    isSubmitted ? 'bg-blue-100 text-blue-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {asg.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{asg.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{asg.courseTitle}</p>
                <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                  {asg.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Due: {new Date(asg.dueDate).toLocaleDateString()}</span>
                  </div>

                  <div className="font-semibold text-slate-700">
                    Total: <span className="text-slate-900 font-bold">{asg.totalMarks} Marks</span>
                    {asg.obtainedMarks !== undefined && (
                      <span className="ml-2 text-emerald-700 font-bold">
                        (Obtained: {asg.obtainedMarks})
                      </span>
                    )}
                  </div>
                </div>

                {/* Submissions or actions */}
                {isPending && (
                  <button
                    id={`btn-submit-task-${asg.id}`}
                    onClick={() => setSelectedForSubmit(asg)}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" /> Submit Assignment
                  </button>
                )}

                {isSubmitted && (
                  <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-100 text-[11px] text-blue-900 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Submitted & Awaiting Grading</span>
                    </div>
                    <span className="font-mono text-[10px] text-blue-700">{asg.fileAttachment || 'PDF'}</span>
                  </div>
                )}

                {isGraded && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-900 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Graded by {asg.instructor}</span>
                    </div>
                    <span className="font-bold text-emerald-800">{asg.obtainedMarks} / {asg.totalMarks}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Assignment Modal */}
      {selectedForSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Submit Assignment</h3>
              <button 
                onClick={() => setSelectedForSubmit(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDoSubmit} className="space-y-4 mt-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-xs font-bold text-emerald-800 font-mono">{selectedForSubmit.courseCode}</div>
                <div className="text-sm font-bold text-slate-800 mt-0.5">{selectedForSubmit.title}</div>
                <div className="text-xs text-slate-500 mt-1">Instructor: {selectedForSubmit.instructor}</div>
              </div>

              {/* File input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upload Submission File (PDF / DOCX / ZIP)
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-4 text-center cursor-pointer relative bg-slate-50/50">
                  <input
                    id="input-file-submission"
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <FileUp className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                  <span className="text-xs font-medium text-slate-700 block">
                    {uploadedFileName ? uploadedFileName : 'Click to select or drag & drop assignment file'}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Max file size: 25MB</span>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Submission Notes / Comments
                </label>
                <textarea
                  rows={3}
                  value={submissionNote}
                  onChange={(e) => setSubmissionNote(e.target.value)}
                  placeholder="Explain any specific assumptions, lab tests, or queries..."
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedForSubmit(null)}
                  className="flex-1 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  id="btn-confirm-submit"
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm"
                >
                  Upload & Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Create Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Create New Assignment (Faculty)</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDoCreate} className="space-y-3.5 mt-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Course Code</label>
                  <select
                    value={newCourseCode}
                    onChange={(e) => {
                      setNewCourseCode(e.target.value);
                      if (e.target.value === 'CIT-204') setNewCourseTitle('Database Management Systems');
                      if (e.target.value === 'CIT-293') setNewCourseTitle('Web Application Development');
                      if (e.target.value === 'CIT-283') setNewCourseTitle('Object Oriented Programming');
                    }}
                    className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="CIT-204">CIT-204 (DBMS)</option>
                    <option value="CIT-293">CIT-293 (Web Dev)</option>
                    <option value="CIT-283">CIT-283 (OOP)</option>
                    <option value="CIT-273">CIT-273 (Digital Elec)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Total Marks</label>
                  <input
                    type="number"
                    value={newMarks}
                    onChange={(e) => setNewMarks(e.target.value)}
                    className="w-full p-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assignment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Assignment 2: Normalization & BCNF"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Instructions / Description</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Specify problem statement, schema constraints, and format..."
                  className="w-full p-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm"
                >
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
