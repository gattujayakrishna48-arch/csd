import React, { useState } from 'react';
import { LeaveRequest } from '../../types';
import { INITIAL_STUDENT_PROFILE } from '../../data/mockData';
import { 
  FileText, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert,
  Calendar
} from 'lucide-react';

interface LeaveGrievanceProps {
  leaves: LeaveRequest[];
  onAddLeave: (leave: LeaveRequest) => void;
}

export const LeaveGrievance: React.FC<LeaveGrievanceProps> = ({
  leaves,
  onAddLeave,
}) => {
  const [activeTab, setActiveTab] = useState<'leave' | 'grievance'>('leave');

  // Leave Form State
  const [leaveType, setLeaveType] = useState<LeaveRequest['leaveType']>('Medical');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  // Grievance Form State
  const [grievanceCat, setGrievanceCat] = useState('Campus Wi-Fi / Laboratory Network');
  const [grievanceText, setGrievanceText] = useState('');
  const [grievanceSubmitted, setGrievanceSubmitted] = useState(false);

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason.trim()) {
      setFormError('Please fill in start date, end date, and reason.');
      return;
    }

    const newLeave: LeaveRequest = {
      id: `lv-${Date.now()}`,
      studentName: INITIAL_STUDENT_PROFILE.name,
      rollNo: INITIAL_STUDENT_PROFILE.rollNo,
      leaveType,
      startDate,
      endDate,
      reason: reason.trim(),
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };

    onAddLeave(newLeave);
    setFormSuccess('Leave application submitted to Faculty Advisor & HOD for review.');
    setFormError('');
    setReason('');
    setStartDate('');
    setEndDate('');
  };

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grievanceText.trim()) return;
    setGrievanceSubmitted(true);
    setGrievanceText('');
  };

  return (
    <div className="space-y-8">
      {/* Header and Mode Switch */}
      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Student Leave & Grievance Redressal</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit medical/duty leave applications or register complaints with the university redressal cell.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveTab('leave')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'leave'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Leave Application
          </button>
          <button
            onClick={() => setActiveTab('grievance')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'grievance'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Grievance / Complaint
          </button>
        </div>
      </div>

      {activeTab === 'leave' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Leave Application Form */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Apply for Student Leave</h3>
            
            {formSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{formSuccess}</span>
              </div>
            )}

            {formError && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleApplyLeave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Leave Classification *
                </label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
                  <option value="Medical">Medical Leave (Doctor Slip Required)</option>
                  <option value="Academic Event">Academic Event / Paper Presentation / Hackathon</option>
                  <option value="Personal">Personal / Family Obligation</option>
                  <option value="Other">Other Reasons</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Reason & Academic Impact Summary *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain why leave is requested and dates of missed classes/labs..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Leave to Faculty Advisor</span>
              </button>
            </form>
          </div>

          {/* Past Leaves Status List */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Application History & Real-Time Status</h3>

            <div className="space-y-3">
              {leaves.map((item) => (
                <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-900">{item.leaveType}</span>
                    <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                      item.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'Rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">{item.reason}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    <span>Duration: <strong className="font-mono text-slate-800">{item.startDate} to {item.endDate}</strong></span>
                    <span>Applied: {item.appliedDate}</span>
                  </div>

                  {item.remarks && (
                    <div className="text-[11px] text-blue-900 bg-blue-50 p-2 rounded border border-blue-100">
                      <strong>Remarks:</strong> {item.remarks}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Grievance Redressal Form */
        <div className="max-w-2xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Student Grievance & Maintenance Cell</h3>
              <p className="text-xs text-slate-500">Confidential complaint registration monitored by the Dean of Student Welfare</p>
            </div>
          </div>

          {grievanceSubmitted ? (
            <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Grievance Logged Successfully</span>
              </div>
              <p className="text-xs text-emerald-700 leading-relaxed">
                Your issue has been logged into the University Ticketing System. A resolution status report will be updated on your student portal within 3 working days.
              </p>
              <button
                onClick={() => setGrievanceSubmitted(false)}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-100 rounded-lg cursor-pointer"
              >
                Log Another Issue
              </button>
            </div>
          ) : (
            <form onSubmit={handleGrievanceSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Complaint / Grievance Category *
                </label>
                <select
                  value={grievanceCat}
                  onChange={(e) => setGrievanceCat(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
                  <option value="Campus Wi-Fi / Laboratory Network">Campus Wi-Fi / Laboratory Network Issue</option>
                  <option value="Central Library Book Availability">Central Library Book / E-Resource Request</option>
                  <option value="Hostel Maintenance & Mess Food">Hostel Room Maintenance / Mess Food Quality</option>
                  <option value="Academic & Evaluation Query">Academic & Internal Assessment Clarification</option>
                  <option value="Transportation & Campus Bus">Campus Transportation / Bus Route Issue</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Detailed Description *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your issue with exact laboratory / classroom / hostel room location..."
                  value={grievanceText}
                  onChange={(e) => setGrievanceText(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Grievance</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
