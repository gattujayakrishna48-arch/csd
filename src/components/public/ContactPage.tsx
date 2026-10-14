import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2,
  AlertCircle
} from 'lucide-react';
import { COLLEGE_INFO } from '../../data/mockData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Admissions Inquiry',
    subject: '',
    message: '',
  });

  const [submittedTicket, setSubmittedTicket] = useState<{ id: string; name: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    const ticketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedTicket({ id: ticketId, name: formData.name });
    setErrorMsg('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Contact Us & Campus Helpdesk</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
          Get in touch with the admissions cell, examination controller, or academic department offices. We are here to assist students, parents, and recruiters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 5 Columns: Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">Campus Address & Central Office</h2>
            
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">{COLLEGE_INFO.name}</div>
                  <div>{COLLEGE_INFO.address}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-900 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-900">General Campus PBX</div>
                  <div className="font-mono">{COLLEGE_INFO.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-900">Admissions Desk Direct</div>
                  <div className="font-mono text-emerald-800 font-semibold">{COLLEGE_INFO.admissionsHelpline}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-900 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-900">Official Correspondence</div>
                  <div>{COLLEGE_INFO.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-blue-900 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-900">Administrative Working Hours</div>
                  <div>Monday to Saturday: 09:00 AM – 05:00 PM (2nd Saturdays closed)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Department Hotlines */}
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
            <h3 className="font-bold text-slate-900">Specialized Helpdesks</h3>
            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>Controller of Examinations:</span>
                <span className="font-mono font-medium text-slate-900">coe@apexinstitute.edu.in</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>Training & Placement Cell:</span>
                <span className="font-mono font-medium text-slate-900">placements@apexinstitute.edu.in</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>Student Grievance Cell:</span>
                <span className="font-mono font-medium text-slate-900">grievance@apexinstitute.edu.in</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Hostel Warden Desk:</span>
                <span className="font-mono font-medium text-slate-900">+91 (040) 2345-6799</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 7 Columns: Interactive Inquiry Dispatch */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Send an Official Message / Query</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Your message is routed directly to the concerned deanery or administrative officer.
              </p>
            </div>

            {submittedTicket ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Inquiry Ticket Dispatched!</span>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Thank you, <strong>{submittedTicket.name}</strong>. Your query has been assigned Helpdesk Ticket Number <strong>{submittedTicket.id}</strong>. A designated officer will contact you within 24–48 business hours.
                </p>
                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="px-4 py-2 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Department / Query Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 bg-white"
                    >
                      <option value="Admissions Inquiry">Admissions & Eligibility</option>
                      <option value="Academics & Syllabus">Academics & Syllabus</option>
                      <option value="Examinations & Results">Examinations & Results</option>
                      <option value="Placement & Recruitment">Training & Placements</option>
                      <option value="Hostel & Facilities">Hostel & Campus Facilities</option>
                      <option value="General Administration">General Administration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject / Concern Summary *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brief subject of your query"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Detailed Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your detailed inquiry or question here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Helpdesk Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
