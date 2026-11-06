import { useState } from 'react';
import { 
  Download, 
  X, 
  Check, 
  Terminal, 
  FolderArchive, 
  FileCode2, 
  ExternalLink, 
  Copy, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface DownloadZipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadZipModal({ isOpen, onClose }: DownloadZipModalProps) {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, stepId: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepId);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div 
      id="download-zip-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 text-slate-800 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Download Complete Source Code (ZIP)</h2>
              <p className="text-xs text-slate-500">Government College of Technology, Bhakkar • Full MERN Project</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 mt-4 text-xs">
          {/* Main Download Button Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-white/20 text-white font-bold text-[10px] tracking-wide uppercase">
                  Production Ready
                </span>
                <span className="text-emerald-200 text-xs font-semibold">gct_bhakkar_cit_portal.zip</span>
              </div>
              <h3 className="font-extrabold text-base mt-1">GCT Bhakkar CIT Student Portal Package</h3>
              <p className="text-xs text-emerald-100 mt-0.5">
                Includes Express Backend, React 19 UI, Official Timetable Data, and MongoDB configuration.
              </p>
            </div>

            <a
              id="btn-trigger-download-zip"
              href="/gct_bhakkar_cit_portal.zip"
              download="gct_bhakkar_cit_portal.zip"
              className="px-5 py-2.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs flex items-center gap-2 shadow-lg shrink-0 transition-transform active:scale-95"
            >
              <Download className="w-4 h-4 text-emerald-700" />
              <span>Download ZIP</span>
            </a>
          </div>

          {/* Step-by-Step VS Code Execution Guide */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <Terminal className="w-4 h-4 text-emerald-700" />
              How to Open & Run in Visual Studio Code:
            </h3>

            {/* Step 1 */}
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-800">1. Extract the downloaded ZIP file</span>
              </div>
              <p className="text-slate-600">
                Right-click <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-emerald-800">gct_bhakkar_cit_portal.zip</code> and select <strong>"Extract All..."</strong> (Windows) or double-click to unzip (Mac/Linux).
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-800">2. Open the extracted folder in VS Code</span>
              </div>
              <p className="text-slate-600">
                Launch <strong>Visual Studio Code</strong>, click <strong>File &gt; Open Folder...</strong>, and select the unzipped <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-emerald-800">gct_bhakkar_cit_portal</code> folder.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-800">3. Open VS Code Integrated Terminal</span>
              </div>
              <p className="text-slate-600 mb-2">
                Press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[11px]">Ctrl + `</kbd> (Windows) or <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[11px]">Cmd + `</kbd> (Mac), or navigate to menu <strong>Terminal &gt; New Terminal</strong>.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-800">4. Install Dependencies</span>
                <button
                  onClick={() => copyToClipboard('npm install', 1)}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
                >
                  {copiedStep === 1 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy</span>
                </button>
              </div>
              <div className="bg-slate-900 text-emerald-400 p-2.5 rounded-md font-mono text-[11px]">
                npm install
              </div>
              <p className="text-slate-500 text-[11px] mt-1.5">
                Installs React 19, Vite, Express, Lucide icons, Tailwind CSS, and Mongoose.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-3 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-800">5. Start Dev Server (Express + Vite)</span>
                <button
                  onClick={() => copyToClipboard('npm run dev', 2)}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
                >
                  {copiedStep === 2 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy</span>
                </button>
              </div>
              <div className="bg-slate-900 text-emerald-400 p-2.5 rounded-md font-mono text-[11px]">
                npm run dev
              </div>
              <p className="text-slate-600 mt-2">
                Open your browser at <a href="http://localhost:3000" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold underline">http://localhost:3000</a> to view the live portal!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Node.js v18+ or v20+ recommended. Contains complete documentation in <code className="font-mono font-bold text-slate-700">README.md</code>.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
