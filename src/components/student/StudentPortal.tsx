import React, { useState } from 'react';
import { 
  StudentProfile, 
  StudentTab, 
  AttendanceSubject, 
  StudyMaterial, 
  Assignment, 
  LeaveRequest, 
  Notice 
} from '../../types';
import { AttendanceTracker } from './AttendanceTracker';
import { MarksResults } from './MarksResults';
import { TimetableSchedule } from './TimetableSchedule';
import { StudyMaterials } from './StudyMaterials';
import { FeeStatus } from './FeeStatus';
import { LeaveGrievance } from './LeaveGrievance';
import { 
  User, 
  Award, 
  Calendar, 
  Clock, 
  FileText, 
  CreditCard, 
  AlertCircle, 
  BookOpen, 
  GraduationCap, 
  ChevronRight,
  TrendingUp,
  Download,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';

interface StudentPortalProps {
  profile: StudentProfile;
  attendanceList: AttendanceSubject[];
  materials: StudyMaterial[];
  assignments: Assignment[];
  leaves: LeaveRequest[];
  latestNotices: Notice[];
  onSubmitAssignment: (asgId: string) => void;
  onAddLeave: (leave: LeaveRequest) => void;
  onBackToPublic: () => void;
  onOpenNotice: (notice: Notice) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  profile,
  attendanceList,
  materials,
  assignments,
  leaves,
  latestNotices,
  onSubmitAssignment,
  onAddLeave,
  onBackToPublic,
  onOpenNotice,
}) => {
  const [activeTab, setActiveTab] = useState<StudentTab>('overview');

  const tabs: { id: StudentTab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Dashboard Overview', icon: User },
    { id: 'attendance', label: 'Attendance (75%)', icon: Clock },
    { id: 'marks', label: 'Marks & Results', icon: Award },
    { id: 'timetable', label: 'Weekly Timetable', icon: Calendar },
    { id: 'materials', label: 'Notes & Assignments', icon: BookOpen },
    { id: 'fees', label: 'Fee Clearance', icon: CreditCard },
    { id: 'leave', label: 'Leave & Grievance', icon: FileText },
  ];

  // Overall calculations for overview
  const totalAttended = attendanceList.reduce((acc, curr) => acc + curr.attended, 0);
  const totalClasses = attendanceList.reduce((acc, curr) => acc + curr.total, 0);
  const overallAttPct = totalClasses > 0 ? ((totalAttended / totalClasses) * 100).toFixed(1) : '0.0';
  const pendingAssignmentsCount = assignments.filter(a => a.status === 'Pending').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner with Student Profile Details */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-white font-extrabold flex items-center justify-center text-xl shadow-inner">
              RS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{profile.name}</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30">
                  REGULAR · BATCH {profile.batch}
                </span>
              </div>
              <div className="text-xs text-blue-200 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>Roll No: <strong className="font-mono text-white">{profile.rollNo}</strong></span>
                <span>·</span>
                <span>Reg No: <strong className="font-mono text-white">{profile.registrationNo}</strong></span>
                <span>·</span>
                <span>{profile.program}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={onBackToPublic}
              className="px-3 py-1.5 text-xs font-semibold text-blue-100 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </button>
          </div>
        </div>

        {/* Quick Academic Meta Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs">
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
            <div className="text-[10px] text-blue-300 uppercase">Current Semester</div>
            <div className="font-bold text-white mt-0.5">Semester {profile.semester} (Even)</div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
            <div className="text-[10px] text-blue-300 uppercase">Faculty Advisor</div>
            <div className="font-bold text-white mt-0.5 truncate">{profile.advisor}</div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
            <div className="text-[10px] text-blue-300 uppercase">Cumulative CGPA</div>
            <div className="font-bold font-mono text-emerald-300 mt-0.5">{profile.cgpa} / 10.0</div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
            <div className="text-[10px] text-blue-300 uppercase">Earned Credits</div>
            <div className="font-bold font-mono text-white mt-0.5">{profile.totalCreditsEarned} Credits</div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap inline-flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => setActiveTab('attendance')}
              className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Attendance Aggregate</span>
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                {overallAttPct}%
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                {parseFloat(overallAttPct) >= 75 ? '✓ Exam Eligible (>75%)' : '⚠ Action required!'}
              </div>
            </div>

            <div 
              onClick={() => setActiveTab('marks')}
              className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Semester 1 SGPA</span>
                <Award className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                {profile.sgpaLatest}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                First Class with Distinction
              </div>
            </div>

            <div 
              onClick={() => setActiveTab('materials')}
              className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Course Assignments</span>
                <FileText className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                {pendingAssignmentsCount} Pending
              </div>
              <div className="text-[11px] text-amber-700 font-semibold mt-1">
                AVL Tree in C due in 8 days
              </div>
            </div>

            <div 
              onClick={() => setActiveTab('fees')}
              className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>Accounts & Fee Desk</span>
                <CreditCard className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-emerald-800">
                Cleared
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                No outstanding semester dues
              </div>
            </div>
          </div>

          {/* 2-Column Split: Timetable Preview & Notice Board */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Columns: Today's Class Schedule Preview */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Today's Class Schedule (Monday)</h3>
                  <p className="text-xs text-slate-500">Current day active lectures and labs</p>
                </div>
                <button
                  onClick={() => setActiveTab('timetable')}
                  className="text-xs font-semibold text-blue-900 hover:underline cursor-pointer"
                >
                  Full Week Schedule →
                </button>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-blue-900">CS201 · 09:00 - 10:00 AM</span>
                    <div className="font-semibold text-slate-900 mt-0.5">Data Structures & Algorithms</div>
                    <div className="text-slate-500 text-[11px]">Dr. Sunita Rao · Room CS-302</div>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-900 text-white rounded text-[10px] font-bold">
                    LECTURE
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-slate-700">CS202 · 10:00 - 11:00 AM</span>
                    <div className="font-semibold text-slate-900 mt-0.5">Discrete Mathematics</div>
                    <div className="text-slate-500 text-[11px]">Prof. K. Narayana · Room CS-302</div>
                  </div>
                  <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px] font-bold">
                    LECTURE
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-purple-50/60 border border-purple-200/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-purple-900">CS208 · 01:15 - 03:15 PM</span>
                    <div className="font-semibold text-slate-900 mt-0.5">Data Structures & Python Lab</div>
                    <div className="text-slate-500 text-[11px]">Dr. Sunita Rao · Computing Lab 2</div>
                  </div>
                  <span className="px-2 py-0.5 bg-purple-900 text-white rounded text-[10px] font-bold">
                    LABORATORY
                  </span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Urgent University Notices */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Official Notices</h3>
                  <p className="text-xs text-slate-500">Latest administrative circulars</p>
                </div>
                <button
                  onClick={() => onOpenNotice(latestNotices[0])}
                  className="text-xs font-semibold text-blue-900 hover:underline cursor-pointer"
                >
                  View All →
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {latestNotices.slice(0, 3).map((n) => (
                  <div 
                    key={n.id}
                    onClick={() => onOpenNotice(n)}
                    className="py-2.5 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-0.5">
                      <span className="font-semibold text-blue-900">{n.category}</span>
                      <span className="font-mono">{n.date}</span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-900 hover:text-blue-900 line-clamp-1">
                      {n.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'attendance' && <AttendanceTracker attendanceList={attendanceList} />}
      {activeTab === 'marks' && <MarksResults />}
      {activeTab === 'timetable' && <TimetableSchedule />}
      {activeTab === 'materials' && (
        <StudyMaterials 
          materials={materials} 
          assignments={assignments} 
          onSubmitAssignment={onSubmitAssignment} 
        />
      )}
      {activeTab === 'fees' && <FeeStatus />}
      {activeTab === 'leave' && <LeaveGrievance leaves={leaves} onAddLeave={onAddLeave} />}
    </div>
  );
};
