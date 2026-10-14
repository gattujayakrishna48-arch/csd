import React, { useState } from 'react';
import { 
  FacultyTab, 
  StudyMaterial, 
  Notice 
} from '../../types';
import { 
  BookOpen, 
  CalendarCheck, 
  Award, 
  Upload, 
  Plus, 
  CheckCircle2, 
  ArrowLeft,
  Users,
  Search
} from 'lucide-react';

interface FacultyPortalProps {
  onBackToPublic: () => void;
  onAddStudyMaterial: (material: StudyMaterial) => void;
  onPostNotice: (notice: Notice) => void;
}

export const FacultyPortal: React.FC<FacultyPortalProps> = ({
  onBackToPublic,
  onAddStudyMaterial,
  onPostNotice,
}) => {
  const [activeTab, setActiveTab] = useState<FacultyTab>('attendance');

  // Attendance Marking State
  const initialClassStudents = [
    { roll: '24CS001', name: 'Aarav Patel', status: 'Present' },
    { roll: '24CS014', name: 'Bhavna Sharma', status: 'Present' },
    { roll: '24CS028', name: 'Chetan Verma', status: 'Absent' },
    { roll: '24CS042', name: 'Rahul Sharma', status: 'Present' },
    { roll: '24CS055', name: 'Deepa Narayanan', status: 'Present' },
    { roll: '24CS069', name: 'Eshwar Reddy', status: 'Present' },
    { roll: '24CS082', name: 'Fatima Zahra', status: 'Absent' },
    { roll: '24CS094', name: 'Girish Kumar', status: 'Present' },
  ];

  const [studentRoster, setStudentRoster] = useState(initialClassStudents);
  const [attendanceSaved, setAttendanceSaved] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('CS201 - Data Structures & Algorithms');

  // Study Material Form State
  const [matTitle, setMatTitle] = useState('');
  const [matSubject, setMatSubject] = useState('CS201');
  const [matUnit, setMatUnit] = useState('Unit 3');
  const [matSuccess, setMatSuccess] = useState(false);

  // Marks Entry Form State
  const [marksStudent, setMarksStudent] = useState('24CS042');
  const [internalMarks, setInternalMarks] = useState(28);
  const [midTermMarks, setMidTermMarks] = useState(27);
  const [endTermMarks, setEndTermMarks] = useState(36);
  const [marksSuccess, setMarksSuccess] = useState(false);

  const toggleStudentStatus = (index: number) => {
    const updated = [...studentRoster];
    updated[index].status = updated[index].status === 'Present' ? 'Absent' : 'Present';
    setStudentRoster(updated);
    setAttendanceSaved(false);
  };

  const handleSaveAttendance = () => {
    setAttendanceSaved(true);
  };

  const handleUploadMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matTitle.trim()) return;

    const newMaterial: StudyMaterial = {
      id: `mat-${Date.now()}`,
      title: matTitle.trim(),
      subjectCode: matSubject,
      subjectName: matSubject === 'CS201' ? 'Data Structures & Algorithms' : 'Python OOP',
      unit: matUnit,
      uploadedBy: 'Dr. Sunita Rao (HOD CSE)',
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: '3.4 MB',
      fileType: 'PDF'
    };

    onAddStudyMaterial(newMaterial);
    setMatSuccess(true);
    setMatTitle('');
  };

  const handleSaveMarks = (e: React.FormEvent) => {
    e.preventDefault();
    setMarksSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Faculty Profile Banner */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center text-lg">
            SR
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Dr. Sunita Rao, Ph.D.</h1>
            <div className="text-xs text-slate-300 mt-0.5">
              Professor & Head of Department, Computer Science & Engineering
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Active Courses: CS201 (Data Structures), CS208 (Algorithms Lab) · Section A & B
            </div>
          </div>
        </div>

        <button
          onClick={onBackToPublic}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors inline-flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Faculty Panel</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('attendance')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer ${
            activeTab === 'attendance'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Mark Class Attendance</span>
        </button>

        <button
          onClick={() => setActiveTab('marks')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer ${
            activeTab === 'marks'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Enter Student Marks</span>
        </button>

        <button
          onClick={() => setActiveTab('materials')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer ${
            activeTab === 'materials'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload Study Materials</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Live Period Attendance Marking</h2>
              <p className="text-xs text-slate-500">Click any student badge to toggle between Present and Absent</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
              >
                <option value="CS201 - Data Structures & Algorithms">CS201 - Data Structures (CSE Sec A)</option>
                <option value="CS208 - Algorithms Lab">CS208 - DSA Lab (Batch 1)</option>
              </select>

              <button
                onClick={handleSaveAttendance}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
              >
                Save Period Attendance
              </button>
            </div>
          </div>

          {attendanceSaved && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Attendance saved and committed to Academic Database successfully!</span>
              </div>
              <span className="font-mono text-[11px]">
                {studentRoster.filter(s => s.status === 'Present').length} / {studentRoster.length} Present
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {studentRoster.map((s, index) => (
              <div 
                key={s.roll}
                onClick={() => toggleStudentStatus(index)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  s.status === 'Present'
                    ? 'border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50'
                    : 'border-red-200 bg-red-50/40 hover:bg-red-50'
                }`}
              >
                <div>
                  <div className="font-mono text-xs font-bold text-slate-900">{s.roll}</div>
                  <div className="text-xs text-slate-600">{s.name}</div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  s.status === 'Present' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'marks' && (
        <div className="max-w-2xl bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Enter Student Examination Marks</h2>
            <p className="text-xs text-slate-500">Record Continuous Evaluation and Mid-Term scores</p>
          </div>

          {marksSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Marks recorded for Roll No {marksStudent}! Total: {internalMarks + midTermMarks + endTermMarks}/100</span>
            </div>
          )}

          <form onSubmit={handleSaveMarks} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Candidate Roll Number:
              </label>
              <select
                value={marksStudent}
                onChange={(e) => setMarksStudent(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
              >
                {studentRoster.map(s => (
                  <option key={s.roll} value={s.roll}>
                    {s.roll} - {s.name} (B.Tech CSE Sem 2)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Internals (Max 30)
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={internalMarks}
                  onChange={(e) => setInternalMarks(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mid-Term (Max 30)
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={midTermMarks}
                  onChange={(e) => setMidTermMarks(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  End-Term (Max 40)
                </label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={endTermMarks}
                  onChange={(e) => setEndTermMarks(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg font-mono"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg text-xs flex justify-between font-semibold text-slate-900">
              <span>Computed Aggregate Marks:</span>
              <span className="font-mono text-blue-900">{internalMarks + midTermMarks + endTermMarks} / 100</span>
            </div>

            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
            >
              Commit Marks Entry
            </button>
          </form>
        </div>
      )}

      {activeTab === 'materials' && (
        <div className="max-w-2xl bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Upload New Study Material PDF</h2>
            <p className="text-xs text-slate-500">Uploaded notes will appear instantly in the student portal</p>
          </div>

          {matSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Material published and made available for student downloads!</span>
            </div>
          )}

          <form onSubmit={handleUploadMaterial} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Document Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Unit 4: Graph Traversals (BFS & DFS Solved Problems)"
                value={matTitle}
                onChange={(e) => setMatTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject *
                </label>
                <select
                  value={matSubject}
                  onChange={(e) => setMatSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                >
                  <option value="CS201">CS201 - Data Structures</option>
                  <option value="CS204">CS204 - Python OOP</option>
                  <option value="CS205">CS205 - Digital Logic</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Unit / Module *
                </label>
                <input
                  type="text"
                  value={matUnit}
                  onChange={(e) => setMatUnit(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-500">
              <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
              <span>Simulated PDF Attachment: <strong>Lecture_Notes_Unit4.pdf (2.8 MB)</strong></span>
            </div>

            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer"
            >
              Publish to Student Portal
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
