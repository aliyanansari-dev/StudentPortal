import { useState } from 'react';
import { Database, Check, Copy, X, Terminal, Server, Layers, ShieldCheck, Download } from 'lucide-react';

interface MongoDbInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDownloadZip?: () => void;
}

export default function MongoDbInfoModal({ isOpen, onClose, onOpenDownloadZip }: MongoDbInfoModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const connectionCode = `// server/db.js - Local MongoDB MERN Connection
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gct_portal';

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB successfully connected to gct_portal database');
  } catch (error) {
    console.error('MongoDB connection failure:', error);
    process.exit(1);
  }
}

module.exports = connectDB;`;

  const schemaCode = `// models/Attendance.js & models/Assignment.js
const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, index: true },
  courseCode: { type: String, required: true },
  courseTitle: { type: String, required: true },
  totalClasses: { type: Number, default: 0 },
  attendedClasses: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

const AssignmentSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  dueDate: { type: Date, required: true },
  totalMarks: { type: Number, default: 20 },
  status: { type: String, enum: ['Pending', 'Submitted', 'Graded'], default: 'Pending' },
  instructor: String,
  submissions: [{
    studentRollNo: String,
    submissionDate: { type: Date, default: Date.now },
    fileUrl: String,
    obtainedMarks: Number,
    feedback: String
  }]
});

module.exports = {
  Attendance: mongoose.model('Attendance', AttendanceSchema),
  Assignment: mongoose.model('Assignment', AssignmentSchema)
};`;

  return (
    <div 
      id="mongodb-info-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 text-slate-800 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">MERN Stack & Local MongoDB Architecture</h2>
              <p className="text-xs text-slate-500">Government College of Technology, Bhakkar Student Portal</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 mt-4 text-xs">
          {/* Connection Status Capsule */}
          <div className="p-3.5 bg-slate-900 text-emerald-400 rounded-xl font-mono flex items-center justify-between border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-slate-300">Local MongoDB URI:</span>
              <span className="text-white font-bold">mongodb://localhost:27017/gct_portal</span>
            </div>
            <button
              onClick={() => handleCopy('mongodb://localhost:27017/gct_portal', 0)}
              className="p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
              title="Copy connection string"
            >
              {copiedIndex === 0 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Setup Guide */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-700" />
              How to Connect Your Local MongoDB Instance:
            </h3>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-600 leading-relaxed">
              <li>Open your local terminal and start MongoDB service: <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-mono">mongod --dbpath /data/db</code> or <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-mono">net start MongoDB</code>.</li>
              <li>Verify it is listening on standard port <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-mono">27017</code>.</li>
              <li>When running the Express server (<code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-mono">server.ts</code>), the portal initializes Mongoose schemas for collections: <span className="font-semibold text-emerald-800">users, timetables, courses, assignments, attendance, notifications</span>.</li>
            </ol>
          </div>

          {/* Connection Code Snippet */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <Server className="w-3.5 h-3.5 text-emerald-600" /> Express & Mongoose Connection File
              </span>
              <button
                onClick={() => handleCopy(connectionCode, 1)}
                className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
              >
                {copiedIndex === 1 ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>Copy Code</span>
              </button>
            </div>
            <pre className="bg-slate-900 text-slate-200 p-3 rounded-xl overflow-x-auto text-[11px] font-mono leading-relaxed border border-slate-800 max-h-36">
              {connectionCode}
            </pre>
          </div>

          {/* Collection Schemas */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-emerald-600" /> Mongoose Schemas (Attendance & Assignments)
              </span>
              <button
                onClick={() => handleCopy(schemaCode, 2)}
                className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
              >
                {copiedIndex === 2 ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>Copy Schemas</span>
              </button>
            </div>
            <pre className="bg-slate-900 text-slate-200 p-3 rounded-xl overflow-x-auto text-[11px] font-mono leading-relaxed border border-slate-800 max-h-40">
              {schemaCode}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-emerald-800 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Ready for Assignment No: 1 Submission</span>
          </div>
          <div className="flex items-center gap-2">
            {onOpenDownloadZip && (
              <button
                onClick={() => {
                  onClose();
                  onOpenDownloadZip();
                }}
                className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Project ZIP</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold text-xs transition-colors"
            >
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
