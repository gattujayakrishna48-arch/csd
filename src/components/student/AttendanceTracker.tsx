import React, { useState } from 'react';
import { AttendanceSubject } from '../../types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Calculator, 
  BarChart3, 
  Info,
  CalendarCheck
} from 'lucide-react';

interface AttendanceTrackerProps {
  attendanceList: AttendanceSubject[];
}

export const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({ attendanceList }) => {
  // Target calculator state
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>(attendanceList[0]?.code || 'CS201');
  const [targetPercentage, setTargetPercentage] = useState<number>(75);

  const selectedSubject = attendanceList.find(s => s.code === selectedSubjectCode) || attendanceList[0];

  // Overall attendance calculation
  const totalAttendedAll = attendanceList.reduce((acc, curr) => acc + curr.attended, 0);
  const totalClassesAll = attendanceList.reduce((acc, curr) => acc + curr.total, 0);
  const overallPercentage = totalClassesAll > 0 
    ? ((totalAttendedAll / totalClassesAll) * 100).toFixed(1)
    : '0.0';

  // Calculator logic for selected subject:
  // Current: attended / total = currentPct
  // If currentPct < target: Need x consecutive classes: (attended + x)/(total + x) >= target/100
  // x * (1 - target/100) >= (target/100 * total) - attended
  // x = ceil( (target/100 * total - attended) / (1 - target/100) )
  // If currentPct >= target: Can bunk y classes: attended / (total + y) >= target/100
  // y = floor( (attended - (target/100 * total)) / (target/100) )
  const p = targetPercentage / 100;
  const currentPct = (selectedSubject.attended / selectedSubject.total) * 100;

  let classesNeeded = 0;
  let classesCanBunk = 0;

  if (currentPct < targetPercentage) {
    if (p < 1) {
      classesNeeded = Math.max(0, Math.ceil((p * selectedSubject.total - selectedSubject.attended) / (1 - p)));
    }
  } else {
    if (p > 0) {
      classesCanBunk = Math.max(0, Math.floor((selectedSubject.attended - p * selectedSubject.total) / p));
    }
  }

  return (
    <div className="space-y-8">
      {/* Overall Attendance Summary Banner */}
      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1">
            Autonomous Academic Regulation 2026
          </div>
          <h2 className="text-xl font-bold text-slate-900">Aggregate Semester Attendance</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            As per AICTE norms, 75% minimum attendance in every theory and laboratory course is strictly mandatory to generate Semester-End Examination Hall Tickets.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0">
          <div className="text-right">
            <div className="text-xs text-slate-500">Aggregate Total</div>
            <div className="text-xs font-mono text-slate-700">
              {totalAttendedAll} / {totalClassesAll} Classes
            </div>
          </div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-slate-900">
            {overallPercentage}%
          </div>
          <div className={`px-2 py-1 text-xs font-bold rounded ${
            parseFloat(overallPercentage) >= 75 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {parseFloat(overallPercentage) >= 75 ? 'ELIGIBLE' : 'CONDONATION'}
          </div>
        </div>
      </div>

      {/* Subject-wise Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">Course-Wise Attendance Records</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {attendanceList.map((subject) => {
            const pct = ((subject.attended / subject.total) * 100).toFixed(1);
            const isEligible = parseFloat(pct) >= 75;

            return (
              <div 
                key={subject.code}
                className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                      {subject.code}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded flex items-center gap-1 ${
                      isEligible 
                        ? 'bg-emerald-50 text-emerald-800' 
                        : 'bg-red-50 text-red-800'
                    }`}>
                      {isEligible ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      <span>{pct}%</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {subject.name}
                  </h4>
                  <div className="text-xs text-slate-400 mt-0.5">Faculty: {subject.faculty}</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>Attended: {subject.attended}</span>
                    <span>Total Held: {subject.total}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        isEligible ? 'bg-emerald-600' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, parseFloat(pct))}%` }}
                    ></div>
                  </div>

                  <div className="text-[11px] text-slate-400">
                    {isEligible 
                      ? 'Safe zone. Meeting autonomous criteria.' 
                      : 'Attention: Shortage of attendance! Attend next classes.'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Attendance & Safe Bunk Calculator */}
      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Attendance Target & Safe Bunk Calculator</h3>
            <p className="text-xs text-slate-500">Find out how many classes you must attend or can safely miss</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Subject:
            </label>
            <select
              value={selectedSubjectCode}
              onChange={(e) => setSelectedSubjectCode(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              {attendanceList.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.code}: {s.name} ({((s.attended / s.total) * 100).toFixed(1)}%)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Attendance %:
            </label>
            <select
              value={targetPercentage}
              onChange={(e) => setTargetPercentage(parseInt(e.target.value))}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value={75}>75% (Mandatory Exam Eligibility)</option>
              <option value={80}>80% (Safe Buffer)</option>
              <option value={85}>85% (Distinction Goal)</option>
              <option value={90}>90% (Placement Screening Benchmark)</option>
            </select>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col justify-center">
            {currentPct < targetPercentage ? (
              <div>
                <div className="text-xs font-bold text-red-700 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Action Needed:</span>
                </div>
                <div className="text-xs text-slate-700 mt-1">
                  You must attend the next <strong className="font-mono text-sm text-slate-900">{classesNeeded}</strong> consecutive classes without absenting to reach {targetPercentage}%.
                </div>
              </div>
            ) : (
              <div>
                <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Safe Margin:</span>
                </div>
                <div className="text-xs text-slate-700 mt-1">
                  You can safely miss <strong className="font-mono text-sm text-slate-900">{classesCanBunk}</strong> classes and still maintain at least {targetPercentage}%.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
