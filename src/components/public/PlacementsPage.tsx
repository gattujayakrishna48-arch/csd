import React from 'react';
import { 
  TrendingUp, 
  Award, 
  Building, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  GraduationCap 
} from 'lucide-react';
import { RECRUITERS } from '../../data/mockData';

export const PlacementsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Training & Campus Placements</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
          The Training & Placement Cell (T&P) bridges the classroom to the tech industry through structured problem solving bootcamps, mock interviews, and tier-1 campus recruitment drives.
        </p>
      </div>

      {/* Placement Highlights KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="text-center md:text-left md:border-r border-slate-100 md:pr-4">
          <div className="text-xs text-slate-500 font-medium">Highest International CTC</div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 font-mono tabular-nums mt-1">₹44.0 LPA</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Offered to B.Tech CSE Graduate</div>
        </div>

        <div className="text-center md:text-left md:border-r border-slate-100 md:pr-4">
          <div className="text-xs text-slate-500 font-medium">Average Campus CTC</div>
          <div className="text-2xl sm:text-3xl font-bold text-blue-900 font-mono tabular-nums mt-1">₹8.50 LPA</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Across All Branches</div>
        </div>

        <div className="text-center md:text-left md:border-r border-slate-100 md:pr-4">
          <div className="text-xs text-slate-500 font-medium">Median CTC Package</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums mt-1">₹7.80 LPA</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Core & IT Sectors</div>
        </div>

        <div className="text-center md:text-left">
          <div className="text-xs text-slate-500 font-medium">Placement Percentage</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums mt-1">94.2%</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Registered Eligible Students</div>
        </div>
      </div>

      {/* Recruiter Showcase Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Visiting Corporate Recruiters</h2>
            <p className="text-xs text-slate-500">Tier-1 Multinational Product & Services Firms hiring on campus</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RECRUITERS.map((rec, i) => (
            <div key={i} className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-blue-300 transition-colors">
              <div>
                <h3 className="text-base font-bold text-slate-900">{rec.name}</h3>
                <div className="text-xs text-slate-500 mt-0.5">{rec.tier}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-blue-900 font-mono">{rec.packages}</div>
                <div className="text-[10px] text-emerald-700 font-medium mt-0.5">Active Recruiter</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-Placement Training Roadmap */}
      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Our 4-Year Career Readiness Program</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-1.5">
            <div className="font-bold text-blue-900">Year 1: Foundations</div>
            <p className="text-slate-500 leading-relaxed">
              C programming fundamentals, algorithmic thinking, and professional communication skills.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-1.5">
            <div className="font-bold text-blue-900">Year 2: Core Engineering</div>
            <p className="text-slate-500 leading-relaxed">
              Data Structures & Algorithms in C/Python, DBMS SQL query optimization, and mini-projects.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-1.5">
            <div className="font-bold text-blue-900">Year 3: Advanced Tech</div>
            <p className="text-slate-500 leading-relaxed">
              Full-stack web architectures, cloud deployment, competitive coding, and mandatory summer internships.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-1.5">
            <div className="font-bold text-blue-900">Year 4: Corporate Drives</div>
            <p className="text-slate-500 leading-relaxed">
              System design interviews, HR behavioral clinics, on-campus recruitments, and final capstone thesis.
            </p>
          </div>
        </div>
      </div>

      {/* Alumni Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center text-xs">
              AK
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Ananya Kulkarni (Batch of 2024)</div>
              <div className="text-[11px] text-slate-500">Software Development Engineer @ Google Cloud</div>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed italic">
            "The rigorous coding labs in Data Structures and the guidance from our CSE professors helped me crack the Google campus hiring challenge. The practical project-first environment at Apex made all the difference."
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-xs">
              RT
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Rohan Tiwari (Batch of 2024)</div>
              <div className="text-[11px] text-slate-500">Cloud Systems Architect @ Amazon AWS</div>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed italic">
            "From learning basic C syntax in first year to designing distributed applications in final year, the faculty and the T&P interview clinics provided unwavering mentorship every single semester."
          </p>
        </div>
      </div>
    </div>
  );
};
