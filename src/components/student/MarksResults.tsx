import React, { useState } from 'react';
import { STUDENT_GRADES_SEM1, INITIAL_STUDENT_PROFILE, COLLEGE_INFO } from '../../data/mockData';
import { GradeSubject } from '../../types';
import { 
  Award, 
  Printer, 
  Download, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  X
} from 'lucide-react';

export const MarksResults: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // Sem 1 results
  const grades = STUDENT_GRADES_SEM1;
  const totalCredits = grades.reduce((acc, curr) => acc + curr.credits, 0);
  const totalWeightedPoints = grades.reduce((acc, curr) => acc + (curr.credits * curr.gradePoint), 0);
  const calculatedSGPA = (totalWeightedPoints / totalCredits).toFixed(2);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1">
            Controller of Examinations · Academic Grading System
          </div>
          <h2 className="text-xl font-bold text-slate-900">Semester Grade Card & Marks</h2>
          <p className="text-xs text-slate-500 mt-1">
            10-Point Absolute Grading Scale with continuous internal evaluation and end-term university exams.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-center">
            <div className="text-[10px] text-blue-900 font-semibold uppercase">Latest SGPA</div>
            <div className="text-2xl font-bold text-blue-950 font-mono tabular-nums">{calculatedSGPA}</div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
            <div className="text-[10px] text-emerald-800 font-semibold uppercase">Cumulative CGPA</div>
            <div className="text-2xl font-bold text-emerald-950 font-mono tabular-nums">{INITIAL_STUDENT_PROFILE.cgpa}</div>
          </div>

          <button
            onClick={() => setShowPrintModal(true)}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Generate Official Grade Sheet</span>
          </button>
        </div>
      </div>

      {/* Semester Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setSelectedSemester(1)}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedSemester === 1
              ? 'bg-blue-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Semester I (Published Grade Card)
        </button>

        <button
          onClick={() => setSelectedSemester(2)}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            selectedSemester === 2
              ? 'bg-blue-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Semester II (Mid-Term Interim Evaluation)
        </button>
      </div>

      {/* Grade Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">
            {selectedSemester === 1 ? 'Semester I End-Term Examination Results' : 'Semester II Continuous Assessment Report'}
          </h3>
          <span className="text-xs text-slate-500 font-mono">Total Credits: {totalCredits}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                <th className="py-2.5 px-3 font-semibold">Course Code</th>
                <th className="py-2.5 px-3 font-semibold">Course Title</th>
                <th className="py-2.5 px-3 font-semibold text-center">Credits</th>
                <th className="py-2.5 px-3 font-semibold text-center">Internal (30)</th>
                <th className="py-2.5 px-3 font-semibold text-center">Mid-Term (30)</th>
                <th className="py-2.5 px-3 font-semibold text-center">End-Term (40)</th>
                <th className="py-2.5 px-3 font-semibold text-center">Total (100)</th>
                <th className="py-2.5 px-3 font-semibold text-center">Grade</th>
                <th className="py-2.5 px-3 font-semibold text-center">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {grades.map((item) => (
                <tr key={item.code} className="hover:bg-slate-50/60">
                  <td className="py-3 px-3 font-mono font-bold text-blue-900">{item.code}</td>
                  <td className="py-3 px-3 font-medium text-slate-900">{item.name}</td>
                  <td className="py-3 px-3 text-center font-mono">{item.credits}</td>
                  <td className="py-3 px-3 text-center font-mono tabular-nums">{item.internalMarks}</td>
                  <td className="py-3 px-3 text-center font-mono tabular-nums">{item.midTermMarks}</td>
                  <td className="py-3 px-3 text-center font-mono tabular-nums">{item.endTermMarks}</td>
                  <td className="py-3 px-3 text-center font-mono font-bold tabular-nums text-slate-900">
                    {item.totalMarks}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-blue-50 text-blue-900">
                      {item.letterGrade}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-semibold tabular-nums text-slate-900">
                    {item.gradePoint}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer summary */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Result Status: <strong className="text-emerald-700">PASSED IN FIRST CLASS WITH DISTINCTION</strong>
          </div>
          <div>
            Semester SGPA: <strong className="font-mono text-slate-900 font-bold">{calculatedSGPA} / 10.0</strong>
          </div>
        </div>
      </div>

      {/* Official Grade Sheet Printable Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            {/* Action Bar (Not visible in print) */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 no-print">
              <span className="text-xs font-semibold text-slate-500">Official Institutional Transcript Preview</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Print Document Body */}
            <div className="p-6 border-2 border-slate-300 rounded-xl space-y-6 bg-white text-slate-900">
              <div className="text-center space-y-1 border-b-2 border-slate-300 pb-4">
                <h1 className="text-xl font-bold tracking-tight uppercase text-blue-950">
                  {COLLEGE_INFO.name}
                </h1>
                <div className="text-xs text-slate-600">{COLLEGE_INFO.address}</div>
                <div className="text-xs font-semibold text-slate-700">{COLLEGE_INFO.accreditation}</div>
                <div className="text-sm font-bold tracking-wider text-slate-900 mt-2 underline">
                  SEMESTER GRADE CARD & STATEMENT OF MARKS
                </div>
              </div>

              {/* Student Metadata */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div>
                  <div><span className="font-semibold">Candidate Name:</span> {INITIAL_STUDENT_PROFILE.name}</div>
                  <div><span className="font-semibold">Roll Number:</span> <span className="font-mono">{INITIAL_STUDENT_PROFILE.rollNo}</span></div>
                  <div><span className="font-semibold">Registration No:</span> <span className="font-mono">{INITIAL_STUDENT_PROFILE.registrationNo}</span></div>
                </div>
                <div>
                  <div><span className="font-semibold">Degree & Branch:</span> {INITIAL_STUDENT_PROFILE.program}</div>
                  <div><span className="font-semibold">Examination:</span> Semester I End-Term (Regular)</div>
                  <div><span className="font-semibold">Academic Year:</span> {INITIAL_STUDENT_PROFILE.batch}</div>
                </div>
              </div>

              {/* Grades Table */}
              <table className="w-full text-left text-xs border border-slate-300 border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300">
                    <th className="p-2 border-r border-slate-300">Sub Code</th>
                    <th className="p-2 border-r border-slate-300">Subject Name</th>
                    <th className="p-2 border-r border-slate-300 text-center">Credits</th>
                    <th className="p-2 border-r border-slate-300 text-center">Marks (100)</th>
                    <th className="p-2 border-r border-slate-300 text-center">Grade</th>
                    <th className="p-2 text-center">Grade Point</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {grades.map(g => (
                    <tr key={g.code}>
                      <td className="p-2 border-r border-slate-300 font-mono">{g.code}</td>
                      <td className="p-2 border-r border-slate-300">{g.name}</td>
                      <td className="p-2 border-r border-slate-300 text-center font-mono">{g.credits}</td>
                      <td className="p-2 border-r border-slate-300 text-center font-mono">{g.totalMarks}</td>
                      <td className="p-2 border-r border-slate-300 text-center font-bold font-mono">{g.letterGrade}</td>
                      <td className="p-2 text-center font-mono">{g.gradePoint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* SGPA & CGPA Final Box */}
              <div className="flex justify-between items-center p-3 bg-slate-100 border border-slate-300 text-xs font-semibold">
                <div>Total Credits: {totalCredits}</div>
                <div>Semester SGPA: {calculatedSGPA} / 10.0</div>
                <div>Cumulative CGPA: {INITIAL_STUDENT_PROFILE.cgpa}</div>
                <div className="text-emerald-800">Result: PASS (FIRST CLASS)</div>
              </div>

              {/* Signatures */}
              <div className="pt-8 flex justify-between text-xs text-center">
                <div className="border-t border-slate-400 pt-1 w-40">
                  Faculty Advisor
                </div>
                <div className="border-t border-slate-400 pt-1 w-40">
                  Dean of Academics
                </div>
                <div className="border-t border-slate-400 pt-1 w-40 font-semibold text-slate-900">
                  Controller of Examinations
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
