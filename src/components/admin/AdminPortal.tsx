import React, { useState } from 'react';
import { 
  AdminTab, 
  Notice, 
  LeaveRequest, 
  AdmissionInquiry 
} from '../../types';
import { 
  ShieldCheck, 
  Bell, 
  FileCheck, 
  Users, 
  Building2, 
  ArrowLeft,
  Check,
  X,
  Plus,
  Send,
  AlertCircle
} from 'lucide-react';

interface AdminPortalProps {
  leaves: LeaveRequest[];
  onApproveLeave: (leaveId: string, remarks: string) => void;
  onRejectLeave: (leaveId: string) => void;
  inquiries: AdmissionInquiry[];
  onUpdateInquiryStatus: (inquiryId: string, status: AdmissionInquiry['status']) => void;
  onPostNotice: (notice: Notice) => void;
  onBackToPublic: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  leaves,
  onApproveLeave,
  onRejectLeave,
  inquiries,
  onUpdateInquiryStatus,
  onPostNotice,
  onBackToPublic,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('notices');

  // Notice Creation Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Notice['category']>('Academic');
  const [content, setContent] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [noticePostedSuccess, setNoticePostedSuccess] = useState(false);

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newNotice: Notice = {
      id: `not-${Date.now()}`,
      title: title.trim(),
      category,
      date: new Date().toISOString().split('T')[0],
      referenceNo: `AIT/ADMIN/2026/${Math.floor(100 + Math.random() * 900)}`,
      author: 'Office of the Registrar & Dean',
      isImportant,
      content: content.trim(),
      attachmentName: 'Official_Order_Circular.pdf'
    };

    onPostNotice(newNotice);
    setNoticePostedSuccess(true);
    setTitle('');
    setContent('');
    setIsImportant(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Admin Header */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-700 text-white font-bold flex items-center justify-center text-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">University Administration & Academic Registry</h1>
            <div className="text-xs text-slate-300 mt-0.5">
              Super Admin Console · Autonomous College Operations
            </div>
          </div>
        </div>

        <button
          onClick={onBackToPublic}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors inline-flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Admin Panel</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('notices')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer ${
            activeTab === 'notices'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Publish College Notices</span>
        </button>

        <button
          onClick={() => setActiveTab('leaves')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer ${
            activeTab === 'leaves'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Student Leave Approvals ({leaves.filter(l => l.status === 'Pending').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('admissions')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer ${
            activeTab === 'admissions'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Admission Inquiries ({inquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer ${
            activeTab === 'users'
              ? 'bg-blue-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Directory & Roles</span>
        </button>
      </div>

      {/* Tab 1: Notices */}
      {activeTab === 'notices' && (
        <div className="max-w-2xl bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Issue College-Wide Official Circular</h2>
            <p className="text-xs text-slate-500">Notice will broadcast to public home page and student portals</p>
          </div>

          {noticePostedSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Official Circular published and broadcasted successfully!</span>
            </div>
          )}

          <form onSubmit={handlePostNotice} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Notice Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Schedule for Annual Technical Festival & Project Exhibition"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Academic">Academic</option>
                  <option value="Examination">Examination</option>
                  <option value="Placement">Placement</option>
                  <option value="Event">Event</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="impNotice"
                  checked={isImportant}
                  onChange={(e) => setIsImportant(e.target.checked)}
                  className="rounded text-blue-900"
                />
                <label htmlFor="impNotice" className="text-xs font-semibold text-slate-700">
                  Mark as High-Priority Notice
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Circular Content & Instructions *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Write the official administrative order..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Circular</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Leaves */}
      {activeTab === 'leaves' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Student Leave Approval Desk</h2>

          <div className="space-y-3">
            {leaves.map((leave) => (
              <div key={leave.id} className="p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-slate-900">{leave.studentName}</span>
                    <span className="font-mono text-slate-500">({leave.rollNo})</span>
                    <span className="font-semibold text-blue-900">[{leave.leaveType}]</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      leave.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {leave.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{leave.reason}</p>
                  <div className="text-[11px] text-slate-400">
                    Duration: {leave.startDate} to {leave.endDate} · Applied on {leave.appliedDate}
                  </div>
                </div>

                {leave.status === 'Pending' && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onApproveLeave(leave.id, 'Approved by Academic Dean Office')}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => onRejectLeave(leave.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Inquiries */}
      {activeTab === 'admissions' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Prospective Student Inquiries</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <th className="py-2.5 px-3 font-semibold">Candidate Name</th>
                  <th className="py-2.5 px-3 font-semibold">Course Applied</th>
                  <th className="py-2.5 px-3 font-semibold">12th Marks</th>
                  <th className="py-2.5 px-3 font-semibold">Contact Details</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-3 font-bold text-slate-900">{inq.studentName}</td>
                    <td className="py-3 px-3">{inq.courseInterested}</td>
                    <td className="py-3 px-3 font-mono tabular-nums font-semibold text-blue-900">
                      {inq.twelfthMarksPercentage}%
                    </td>
                    <td className="py-3 px-3">
                      <div>{inq.email}</div>
                      <div className="font-mono text-slate-400">{inq.phone}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        inq.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : inq.status === 'Contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                      }`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onUpdateInquiryStatus(inq.id, 'Approved')}
                        className="px-2 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 rounded cursor-pointer mr-1"
                      >
                        Allot Seat
                      </button>
                      <button
                        onClick={() => onUpdateInquiryStatus(inq.id, 'Contacted')}
                        className="px-2 py-1 text-xs font-semibold text-blue-900 hover:bg-blue-50 rounded cursor-pointer"
                      >
                        Call
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: User Directory */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Registered Users & Role-Based Access Control (RBAC)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-sm text-slate-900 mb-1">Students Role (4,500+)</div>
              <p className="text-slate-500">Permissions: Read courses, track personal attendance, view results, download study notes, apply for leave.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-sm text-slate-900 mb-1">Faculty Role (180+)</div>
              <p className="text-slate-500">Permissions: Record period attendance, enter mid-term & internal grades, upload study notes and syllabus modules.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-sm text-slate-900 mb-1">Admin / Registrar Role</div>
              <p className="text-slate-500">Permissions: Issue circulars, approve student leaves, manage admissions counseling, grant role access in Django /admin.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
