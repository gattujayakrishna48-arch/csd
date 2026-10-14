import React, { useState } from 'react';
import { 
  DJANGO_FOLDER_STRUCTURE, 
  DJANGO_SETUP_COMMANDS, 
  DJANGO_STAGES, 
  DjangoStage, 
  DjangoFileSnippet 
} from '../../data/djangoGuideData';
import { 
  X, 
  Copy, 
  Check, 
  Terminal, 
  FolderTree, 
  Code2, 
  Layers, 
  BookOpen, 
  Rocket, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

interface DjangoCompanionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DjangoCompanionModal: React.FC<DjangoCompanionModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'structure' | 'commands' | 'stages'>('structure');
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const currentStage = DJANGO_STAGES[selectedStageIndex];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-2xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-inner">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight">
                  Django Full-Stack Blueprint for 1st Year B.Tech CSE
                </h2>
                <span className="bg-blue-500/20 text-blue-300 text-[10px] font-mono px-2 py-0.5 rounded border border-blue-400/30">
                  Python + SQLite + Bootstrap
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Complete directory tree, terminal commands, and 5-stage working code files ready to run locally or deploy to Render/PythonAnywhere.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('structure')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'structure'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FolderTree className="w-4 h-4 text-blue-700" />
              <span>1. Project Folder Tree</span>
            </button>

            <button
              onClick={() => setActiveTab('commands')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'commands'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-4 h-4 text-emerald-700" />
              <span>2. Setup Terminal Commands</span>
            </button>

            <button
              onClick={() => setActiveTab('stages')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'stages'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 text-purple-700" />
              <span>3. Five Build Stages (Working Code)</span>
            </button>
          </div>

          <span className="text-[11px] text-slate-500 font-medium">
            Designed for Python beginners
          </span>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {/* View 1: Folder Structure */}
          {activeTab === 'structure' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Recommended Django Project Directory Structure</h3>
                  <p className="text-xs text-slate-500">
                    Following standard Django MTV (Model-Template-View) convention with SQLite and Bootstrap 5 templates.
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(DJANGO_FOLDER_STRUCTURE, 'structure')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {copiedKey === 'structure' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'structure' ? 'Copied!' : 'Copy Tree'}</span>
                </button>
              </div>

              <div className="bg-slate-900 text-slate-200 p-5 rounded-xl font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
                <pre>{DJANGO_FOLDER_STRUCTURE}</pre>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-950 space-y-2">
                <div className="font-bold flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-800" />
                  <span>Beginner Explanation (C & Python Background):</span>
                </div>
                <p>
                  In C, you compile code into a <code>.exe</code> file. In Django, <code>manage.py</code> is your terminal control switch. You never edit <code>manage.py</code> directly. Instead, you run commands like <code>python manage.py runserver</code> to spin up the local web server.
                </p>
                <p>
                  <strong>MTV Architecture:</strong>
                  <br />• <strong>Model (models.py):</strong> Where you define database tables using Python classes (like C structs).
                  <br />• <strong>Template (templates/):</strong> HTML files with Bootstrap styling where data is displayed.
                  <br />• <strong>View (views.py):</strong> Python functions that receive the user request, query models, and render the HTML template.
                </p>
              </div>
            </div>
          )}

          {/* View 2: Setup Terminal Commands */}
          {activeTab === 'commands' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Step-by-Step Terminal Commands (Local Dev)</h3>
                  <p className="text-xs text-slate-500">Run these commands in order in VS Code Terminal or Command Prompt.</p>
                </div>
                <button
                  onClick={() => handleCopy(DJANGO_SETUP_COMMANDS.join('\n'), 'commands')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {copiedKey === 'commands' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'commands' ? 'Copied All!' : 'Copy All Commands'}</span>
                </button>
              </div>

              <div className="bg-slate-900 text-emerald-400 p-5 rounded-xl font-mono text-xs overflow-x-auto shadow-inner space-y-1">
                {DJANGO_SETUP_COMMANDS.map((cmd, i) => (
                  <div key={i} className={cmd.startsWith('#') ? 'text-slate-500 italic' : ''}>
                    {cmd || '\u00A0'}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">1. Virtual Environment</div>
                  <div className="text-slate-500">Isolates project packages so you don't mess up your computer's global Python.</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">2. Migrations</div>
                  <div className="text-slate-500"><code>python manage.py migrate</code> builds the initial SQLite tables automatically.</div>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">3. Superuser Account</div>
                  <div className="text-slate-500"><code>createsuperuser</code> sets up the login for Django's built-in <code>/admin</code> panel!</div>
                </div>
              </div>
            </div>
          )}

          {/* View 3: Five Build Stages Code Explorer */}
          {activeTab === 'stages' && (
            <div className="space-y-6">
              {/* Stages Sub-Navigator */}
              <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
                {DJANGO_STAGES.map((stage, idx) => (
                  <button
                    key={stage.id}
                    onClick={() => setSelectedStageIndex(idx)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      selectedStageIndex === idx
                        ? 'bg-blue-900 text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>{stage.title}</span>
                  </button>
                ))}
              </div>

              {/* Stage Overview Banner */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{currentStage.title}</h3>
                  <span className="text-xs text-blue-900 font-semibold">{currentStage.subtitle}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentStage.explanation}
                </p>
              </div>

              {/* Stage Code Files */}
              <div className="space-y-6">
                {currentStage.files.map((file, fileIdx) => (
                  <div key={fileIdx} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-100 px-4 py-2.5 flex items-center justify-between border-b border-slate-200 text-xs">
                      <div>
                        <span className="font-mono font-bold text-slate-900">{file.path}</span>
                        <span className="text-slate-400 mx-2">·</span>
                        <span className="text-slate-500">{file.description}</span>
                      </div>

                      <button
                        onClick={() => handleCopy(file.code, file.path)}
                        className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-md inline-flex items-center gap-1 cursor-pointer"
                      >
                        {copiedKey === file.path ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === file.path ? 'Copied!' : 'Copy File'}</span>
                      </button>
                    </div>

                    <div className="bg-slate-900 text-slate-100 p-4 font-mono text-xs overflow-x-auto max-h-96 leading-relaxed">
                      <pre>{file.code}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div>
            Tip: You can copy any snippet into your local project directory.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
          >
            Return to Live Portal
          </button>
        </div>
      </div>
    </div>
  );
};
