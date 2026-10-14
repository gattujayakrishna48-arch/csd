import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Code2, 
  ExternalLink,
  Award,
  BookOpen
} from 'lucide-react';
import { COLLEGE_INFO } from '../../data/mockData';
import { PublicTab } from '../../types';

interface FooterProps {
  onSelectTab: (tab: PublicTab) => void;
  onOpenDjangoGuide: () => void;
  onOpenPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenDjangoGuide,
  onOpenPortal,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: College Brand & Accreditations */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Apex Institute of Technology
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Established in 1998 as an Autonomous Centre of Excellence in Technical Education. Committed to research-driven learning, industry partnerships, and entrepreneurial innovation.
            </p>
            <div className="pt-1 flex flex-col gap-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>NAAC A++ Grade (CGPA 3.74/4.0)</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>NBA Accredited Programs · AICTE Approved</span>
              </div>
            </div>
          </div>

          {/* Column 2: Academic Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Academics & Admissions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onSelectTab('departments')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Departments & Labs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('courses')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Degree Courses & Curriculum
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('admissions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  B.Tech Admissions 2026-27
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('fees')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Fee Structure & Scholarships
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('placements')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Campus Placement Statistics
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Student Services & Portals */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Student Desk & Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={onOpenPortal}
                  className="hover:text-white transition-colors text-blue-400 font-medium cursor-pointer"
                >
                  Student ERP Portal Login
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('events-notices')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Examination Notices & Hall Tickets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Campus Life & Photo Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dean of Students & Grievance Desk
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenDjangoGuide}
                  className="hover:text-blue-300 transition-colors inline-flex items-center gap-1 cursor-pointer text-blue-300"
                >
                  <Code2 className="w-3 h-3" />
                  <span>Django Project Source Files</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Campus Info */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Campus Location
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{COLLEGE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-mono">{COLLEGE_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{COLLEGE_INFO.email}</span>
              </div>
              <div className="pt-2">
                <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs">
                  <div className="text-slate-200 font-semibold mb-0.5">Admissions Cell Helpline</div>
                  <div className="text-blue-400 font-mono font-medium">{COLLEGE_INFO.admissionsHelpline}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: B.Tech Full Stack Project Credits & Django Link */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 {COLLEGE_INFO.name}. All Academic & Portal Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenDjangoGuide}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Full-Stack Django & SQLite Architecture Reference</span>
            </button>
            <span className="text-slate-700">·</span>
            <span className="text-slate-400 font-mono text-[11px]">B.Tech CSE Capstone Project</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
