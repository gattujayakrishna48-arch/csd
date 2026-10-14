import React from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Award, 
  Users, 
  TrendingUp, 
  Calendar, 
  Bell, 
  Building2, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  FileText
} from 'lucide-react';
import { COLLEGE_INFO, DEPARTMENTS_DATA, INITIAL_NOTICES, UPCOMING_EVENTS, RECRUITERS } from '../../data/mockData';
import { PublicTab, Notice } from '../../types';

interface HomePageProps {
  onSelectTab: (tab: PublicTab) => void;
  onOpenNotice: (notice: Notice) => void;
  onOpenPortal: () => void;
  onOpenDjangoGuide: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectTab,
  onOpenNotice,
  onOpenPortal,
  onOpenDjangoGuide,
}) => {
  const latestNotice = INITIAL_NOTICES[0];

  return (
    <div className="space-y-12 pb-12">
      {/* 1. Urgent Announcement / Notice Ticker */}
      <div className="bg-blue-50 border-b border-blue-200/80 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="bg-blue-900 text-white font-semibold px-2 py-0.5 rounded text-[11px] shrink-0">
              CIRCULAR
            </span>
            <span className="font-semibold text-blue-950 truncate">
              {latestNotice.title}
            </span>
            <span className="hidden md:inline text-blue-600">·</span>
            <span className="hidden md:inline text-slate-500 font-mono text-[11px]">
              Ref: {latestNotice.referenceNo}
            </span>
          </div>

          <button
            onClick={() => onOpenNotice(latestNotice)}
            className="text-blue-800 font-semibold hover:text-blue-950 hover:underline shrink-0 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View Circular</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-8 sm:p-12 lg:p-14 text-white shadow-xl relative overflow-hidden">
          {/* Subtle geometric backdrop pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-blue-200">
              <span className="font-semibold tracking-wide uppercase text-blue-300">
                Autonomous Institution
              </span>
              <span>·</span>
              <span>AICTE Approved</span>
              <span>·</span>
              <span className="font-semibold text-amber-300">NAAC A++ Accredited (3.74/4.0)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Shaping Next-Gen Engineers, Innovators & Tech Leaders
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Welcome to {COLLEGE_INFO.name}. A premier center for technological research, engineering excellence, and holistic student development with 100% placement assistance and modern state-of-the-art laboratories.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectTab('courses')}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-white rounded-lg hover:bg-slate-100 transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Explore Degree Programs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPortal}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Student Portal Login</span>
              </button>

              <button
                onClick={onOpenDjangoGuide}
                className="px-4 py-2.5 text-xs sm:text-sm font-medium text-blue-200 hover:text-white bg-blue-900/60 hover:bg-blue-900 rounded-lg transition-colors border border-blue-400/30 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Django Project Blueprint</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Proof of Impact: Quantitative Metric Strip (Below Hero) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="text-center md:text-left md:border-r border-slate-100 md:pr-4">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">4,500+</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Undergraduate & PG Students</div>
          </div>
          <div className="text-center md:text-left md:border-r border-slate-100 md:pr-4">
            <div className="text-2xl sm:text-3xl font-bold text-blue-900 font-mono tabular-nums">94.2%</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Placement Track Record (2025-26)</div>
          </div>
          <div className="text-center md:text-left md:border-r border-slate-100 md:pr-4">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-700 font-mono tabular-nums">₹44 LPA</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Highest International CTC Offer</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">180+</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">Doctoral & Research Faculty</div>
          </div>
        </div>
      </section>

      {/* 4. Quick Action Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => onSelectTab('admissions')}
            className="p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center mb-3 group-hover:bg-blue-900 group-hover:text-white transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
              Admissions 2026-27
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Check eligibility, CET/JEE cutoffs, and submit online inquiry.
            </p>
          </div>

          <div 
            onClick={() => onSelectTab('fees')}
            className="p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
              Fee Calculator & Schemes
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Calculate semester fees with hostel, bus, and merit waivers.
            </p>
          </div>

          <div 
            onClick={() => onSelectTab('events-notices')}
            className="p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center mb-3 group-hover:bg-amber-800 group-hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
              Notice & Exam Desk
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Official notifications, time tables, and hall ticket schedules.
            </p>
          </div>

          <div 
            onClick={onOpenPortal}
            className="p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center mb-3 group-hover:bg-purple-800 group-hover:text-white transition-colors">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
              Student Attendance ERP
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Subject-wise 75% attendance tracker, grades, and notes.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Split Section: Academic Departments & Notice Board */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Featured Departments */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Academic Engineering Departments</h2>
                <p className="text-xs text-slate-500 mt-0.5">Autonomous curriculum aligned with Industry 4.0 standards</p>
              </div>
              <button
                onClick={() => onSelectTab('departments')}
                className="text-xs font-semibold text-blue-900 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View All Departments</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEPARTMENTS_DATA.slice(0, 4).map((dept) => (
                <div 
                  key={dept.id} 
                  className="p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-mono font-semibold text-blue-900">{dept.shortName}</span>
                    <span>Intake: {dept.intake} Seats</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{dept.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                    {dept.description}
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">HOD: {dept.hodName}</span>
                    <button
                      onClick={() => onSelectTab('departments')}
                      className="text-blue-900 hover:underline font-medium cursor-pointer"
                    >
                      Labs & Faculty →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Live Notice Board */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Notice Board</h2>
                <p className="text-xs text-slate-500 mt-0.5">Official circulars & updates</p>
              </div>
              <button
                onClick={() => onSelectTab('events-notices')}
                className="text-xs font-semibold text-blue-900 hover:underline cursor-pointer"
              >
                All Notices
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-sm overflow-hidden">
              {INITIAL_NOTICES.slice(0, 4).map((not) => (
                <div 
                  key={not.id}
                  onClick={() => onOpenNotice(not)}
                  className="p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span className="font-semibold text-blue-900">{not.category}</span>
                    <span className="font-mono">{not.date}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 line-clamp-2 hover:text-blue-900">
                    {not.title}
                  </h4>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                    <FileText className="w-3 h-3 text-slate-400" />
                    <span>Issued by {not.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/70 rounded-2xl p-6 sm:p-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Upcoming Campus Events</h2>
              <p className="text-xs text-slate-500 mt-0.5">Workshops, Hackathons, and Inter-Collegiate Competitions</p>
            </div>
            <button
              onClick={() => onSelectTab('events-notices')}
              className="text-xs font-semibold text-blue-900 hover:underline cursor-pointer"
            >
              Event Calendar →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {UPCOMING_EVENTS.map((event) => (
              <div key={event.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-blue-900">{event.category}</span>
                    <span className="font-mono text-[11px]">{event.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{event.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
                    {event.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">{event.time}</span>
                  {event.registrationOpen ? (
                    <span className="text-emerald-700 font-semibold">Open</span>
                  ) : (
                    <span className="text-slate-400">Closed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Top Recruiters & Placement Partners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="text-xl font-bold text-slate-900">Our Esteemed Recruitment Partners</h2>
          <p className="text-xs text-slate-500 mt-1">Tier-1 Multinational Technology and Engineering Enterprises</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {RECRUITERS.slice(0, 6).map((rec, i) => (
            <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 text-center hover:border-blue-300 transition-colors">
              <div className="font-bold text-sm text-slate-900">{rec.name}</div>
              <div className="text-[11px] text-blue-900 font-mono mt-1">{rec.packages}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{rec.tier}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
