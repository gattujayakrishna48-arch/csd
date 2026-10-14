import React, { useState } from 'react';
import { StudyMaterial, Assignment } from '../../types';
import { 
  Download, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  FolderDown,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface StudyMaterialsProps {
  materials: StudyMaterial[];
  assignments: Assignment[];
  onSubmitAssignment: (assignmentId: string) => void;
}

export const StudyMaterials: React.FC<StudyMaterialsProps> = ({
  materials,
  assignments,
  onSubmitAssignment,
}) => {
  const [activeTab, setActiveTab] = useState<'materials' | 'assignments'>('materials');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('All');
  const [submittingAsgId, setSubmittingAsgId] = useState<string | null>(null);

  const subjects = ['All', 'CS201', 'CS204', 'CS205', 'ALL'];

  const filteredMaterials = selectedSubjectFilter === 'All'
    ? materials
    : materials.filter(m => m.subjectCode === selectedSubjectFilter || m.subjectCode === 'ALL');

  const handleDownloadMaterial = (mat: StudyMaterial) => {
    setDownloadingId(mat.id);
    setTimeout(() => {
      setDownloadingId(null);
      const element = document.createElement("a");
      const file = new Blob([
        `STUDY MATERIAL LECTURE NOTES - APEX INSTITUTE OF TECHNOLOGY\nTitle: ${mat.title}\nCourse: ${mat.subjectName} (${mat.subjectCode})\nUnit: ${mat.unit}\nFaculty: ${mat.uploadedBy}\nDate: ${mat.uploadDate}\n\nContents Summary:\nKey algorithms, theoretical principles, memory models, and practice questions curated by the Department of Computer Science & Engineering.`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${mat.subjectCode}_${mat.unit.replace(/\s+/g, '_')}_Notes.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 500);
  };

  const handleTriggerSubmit = (asgId: string) => {
    setSubmittingAsgId(asgId);
    setTimeout(() => {
      onSubmitAssignment(asgId);
      setSubmittingAsgId(null);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header and Tab Switch */}
      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Study Materials & Assignments</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Download teacher lecture slides, solved past papers, and upload course assignments.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'materials'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Study Notes ({materials.length})
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'assignments'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Assignments ({assignments.length})
          </button>
        </div>
      </div>

      {activeTab === 'materials' ? (
        <div className="space-y-4">
          {/* Subject Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-slate-500 font-semibold mr-1">Filter Course:</span>
            {subjects.map(sub => (
              <button
                key={sub}
                onClick={() => setSelectedSubjectFilter(sub)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedSubjectFilter === sub
                    ? 'bg-blue-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Materials List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMaterials.map((mat) => (
              <div 
                key={mat.id}
                className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-blue-300 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                      {mat.subjectCode} · {mat.unit}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">{mat.fileSize} ({mat.fileType})</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{mat.title}</h3>
                  <div className="text-xs text-slate-500">
                    Course: <span className="font-medium text-slate-700">{mat.subjectName}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Uploaded by {mat.uploadedBy} on {mat.uploadDate}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Free Download</span>
                  </span>

                  <button
                    onClick={() => handleDownloadMaterial(mat)}
                    disabled={downloadingId === mat.id}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloadingId === mat.id ? 'Downloading...' : 'Download File'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Assignments View */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {assignments.map((asg) => (
              <div 
                key={asg.id}
                className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-blue-900">{asg.subjectName}</span>
                    <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                      asg.status === 'Submitted'
                        ? 'bg-blue-50 text-blue-800'
                        : asg.status === 'Graded'
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-amber-50 text-amber-800'
                    }`}>
                      {asg.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{asg.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{asg.description}</p>
                  
                  <div className="text-xs text-slate-500 pt-1">
                    <div>Due Date: <strong className="font-mono text-slate-800">{asg.dueDate}</strong></div>
                    <div>Max Marks: <strong className="font-mono text-slate-800">{asg.maxMarks} Marks</strong></div>
                    {asg.obtainedMarks !== undefined && (
                      <div className="text-emerald-700 font-bold mt-1">
                        Obtained Marks: {asg.obtainedMarks} / {asg.maxMarks}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  {asg.status === 'Pending' ? (
                    <button
                      onClick={() => handleTriggerSubmit(asg.id)}
                      disabled={submittingAsgId === asg.id}
                      className="w-full py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{submittingAsgId === asg.id ? 'Submitting Code File...' : 'Upload & Submit Solution'}</span>
                    </button>
                  ) : (
                    <div className="p-2 bg-slate-50 rounded-lg text-center text-xs text-slate-600 font-medium">
                      ✓ Assignment Submitted on {asg.submittedDate || 'Recent'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
