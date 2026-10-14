import React from 'react';
import { 
  Award, 
  BookOpen, 
  Target, 
  Compass, 
  CheckCircle2, 
  Users, 
  Building2,
  GraduationCap
} from 'lucide-react';
import { COLLEGE_INFO } from '../../data/mockData';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1">
          <span>Institutional Legacy Since 1998</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">About {COLLEGE_INFO.name}</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl leading-relaxed">
          {COLLEGE_INFO.tagline}. An autonomous technical institute established to nurture engineering ingenuity, scientific research, and ethical leadership in technology.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Our Vision</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            To evolve into a globally recognized institution of technical excellence and groundbreaking research, producing visionary engineers and technopreneurs who address complex societal and industrial challenges with integrity and sustainable innovation.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-900 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Our Mission</h2>
          <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-800 shrink-0 mt-0.5" />
              <span>Deliver outcome-based undergraduate and postgraduate curricula continuously updated with global technology advancements.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-800 shrink-0 mt-0.5" />
              <span>Provide experiential learning through specialized laboratory centers of excellence and active industrial collaborations.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-800 shrink-0 mt-0.5" />
              <span>Inculcate critical thinking, algorithmic logic, multidisciplinary teamwork, and entrepreneurial zeal.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Leadership Messages */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Academic Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                KR
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{COLLEGE_INFO.principal}</h3>
                <div className="text-xs text-blue-900 font-medium">Principal & Professor of CSE</div>
                <div className="text-[11px] text-slate-500">Former Senior Scientist, DRDO & IIT Madras</div>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Engineering education is no longer just about passing examinations; it is about building systems that scale, solving problems with rigor, and cultivating an unyielding passion for lifelong discovery. At Apex, we push every student to build real software and hardware systems from Day One."
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-slate-800 text-white font-bold flex items-center justify-center text-lg shadow-sm">
                AD
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{COLLEGE_INFO.deanAcademics}</h3>
                <div className="text-xs text-blue-900 font-medium">Dean of Academic Affairs</div>
                <div className="text-[11px] text-slate-500">Ph.D. Computer Systems (IISc Bangalore)</div>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Our autonomous credit framework gives students the flexibility to pursue electives in Artificial Intelligence, Distributed Cloud Computing, Robotics, and Financial Engineering. We emphasize continuous internal evaluation, coding hackathons, and laboratory mastery."
            </p>
          </div>
        </div>
      </div>

      {/* Accreditations & Recognitions Grid */}
      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Accreditations & Autonomous Recognition</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="font-bold text-sm text-slate-900 mb-1">NAAC A++ Grade</div>
            <div>Scored 3.74/4.0 in 2023 cycle for outstanding academic infrastructure, faculty research output, and student progression.</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="font-bold text-sm text-slate-900 mb-1">NBA Tier-1 Accredited</div>
            <div>B.Tech Computer Science & Engineering, ECE, and Mechanical Engineering accredited under Washington Accord.</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div className="font-bold text-sm text-slate-900 mb-1">AICTE & UGC Autonomous</div>
            <div>Conferred autonomous status by UGC, enabling rapid curriculum updates matching Silicon Valley & Indian tech hubs.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
