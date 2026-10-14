import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle, 
  FileCheck, 
  Calendar, 
  HelpCircle, 
  Award,
  Send,
  AlertCircle
} from 'lucide-react';
import { COURSES_DATA, COLLEGE_INFO } from '../../data/mockData';
import { AdmissionInquiry } from '../../types';

interface AdmissionsPageProps {
  onAddInquiry: (inquiry: AdmissionInquiry) => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ onAddInquiry }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: COURSES_DATA[0].title,
    marks: '',
    state: 'Telangana',
  });

  const [submittedInquiry, setSubmittedInquiry] = useState<AdmissionInquiry | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in your name, email, and phone number.');
      return;
    }

    const marksNum = parseFloat(formData.marks);
    if (isNaN(marksNum) || marksNum < 40 || marksNum > 100) {
      setErrorMessage('Please enter a valid 12th standard percentage between 40 and 100.');
      return;
    }

    const newInquiry: AdmissionInquiry = {
      id: `inq-${Date.now()}`,
      studentName: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      courseInterested: formData.course,
      twelfthMarksPercentage: marksNum,
      state: formData.state,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };

    onAddInquiry(newInquiry);
    setSubmittedInquiry(newInquiry);
    setErrorMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Admissions 2026-2027</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
          Join a community of aspiring engineers and technocrats. Review eligibility guidelines, important counseling schedules, and submit your online admission inquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Columns: Process, Eligibility & Scholarships */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step by Step Process */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Admission Procedure (Step-by-Step)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1.5">
                <div className="font-bold text-blue-900">Step 1: Online Registration</div>
                <p className="text-slate-500 leading-relaxed">
                  Submit basic academic profile, 12th Board marks, and entrance exam ranks (CET/JEE).
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1.5">
                <div className="font-bold text-blue-900">Step 2: Document Verification</div>
                <p className="text-slate-500 leading-relaxed">
                  Verification of marksheets, transfer certificate, and category proof by Academic Desk.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1.5">
                <div className="font-bold text-blue-900">Step 3: Counseling & Seat Allotment</div>
                <p className="text-slate-500 leading-relaxed">
                  Branch preference selection based on cutoff merit list and availability.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm space-y-1.5">
                <div className="font-bold text-blue-900">Step 4: Admission Confirmation</div>
                <p className="text-slate-500 leading-relaxed">
                  Semester-1 fee clearance and issuance of official student roll number and ID card.
                </p>
              </div>
            </div>
          </div>

          {/* Eligibility Criteria Box */}
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Minimum Academic Eligibility Criteria</h3>
            <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-blue-800 shrink-0 mt-0.5" />
                <span><strong>B.Tech Programs:</strong> Passed 10+2 / Intermediate Examination with Physics and Mathematics as compulsory subjects along with Chemistry/CS, securing minimum 60% aggregate marks (55% for reserved categories).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-blue-800 shrink-0 mt-0.5" />
                <span><strong>Entrance Examinations:</strong> Valid rank in State Engineering CET or JEE Main 2026. Management quota seats open for high-merit candidates.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-blue-800 shrink-0 mt-0.5" />
                <span><strong>M.Tech Programs:</strong> B.Tech/B.E in appropriate discipline with minimum 55% marks and valid GATE / PGECET score.</span>
              </li>
            </ul>
          </div>

          {/* Institutional Merit Scholarships */}
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900">Merit Scholarship Schemes</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/60">
                <div className="font-bold text-amber-900">95%+ in 12th Board</div>
                <div className="text-slate-600 mt-1">50% Tuition Fee Waiver for all 4 years</div>
              </div>
              <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-200/60">
                <div className="font-bold text-blue-900">90% - 94.9% in 12th</div>
                <div className="text-slate-600 mt-1">25% Tuition Fee Waiver for Year 1</div>
              </div>
              <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-200/60">
                <div className="font-bold text-purple-900">State / National Sports</div>
                <div className="text-slate-600 mt-1">Special Sports Quota fee subsidies</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Interactive Admission Inquiry Form */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-24 space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">Apply / Admission Inquiry 2026</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Submit your credentials for counseling seat assessment.
              </p>
            </div>

            {submittedInquiry ? (
              <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle className="w-5 h-5" />
                  <span>Inquiry Submitted Successfully!</span>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Thank you, <strong>{submittedInquiry.studentName}</strong>. Your inquiry reference ID has been recorded. Our admissions counselor will call you within 24 hours.
                </p>
                <div className="p-3 bg-white rounded-lg border border-emerald-200 text-xs font-mono">
                  <div>Reference No: <strong>{submittedInquiry.id}</strong></div>
                  <div>Course: {submittedInquiry.courseInterested}</div>
                  <div>Date: {submittedInquiry.date}</div>
                </div>
                <button
                  onClick={() => setSubmittedInquiry(null)}
                  className="w-full py-2 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sravan Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Degree Course *
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white"
                  >
                    {COURSES_DATA.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      12th / Intermediate % *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="40"
                      max="100"
                      required
                      placeholder="e.g. 88.5"
                      value={formData.marks}
                      onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Home State
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Telangana"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Admission Inquiry</span>
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  Or call Admissions Helpline directly at {COLLEGE_INFO.admissionsHelpline}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
