import React, { useState } from 'react';
import { 
  GraduationCap, 
  Menu, 
  X, 
  User, 
  Code2, 
  ChevronDown, 
  LogOut, 
  ShieldCheck, 
  BookOpen, 
  Bell
} from 'lucide-react';
import { UserRole, PublicTab } from '../../types';
import { COLLEGE_INFO } from '../../data/mockData';

interface NavbarProps {
  currentPublicTab: PublicTab;
  onSelectPublicTab: (tab: PublicTab) => void;
  userRole: UserRole;
  onSetUserRole: (role: UserRole) => void;
  onOpenLoginModal: () => void;
  onOpenDjangoGuide: () => void;
  isStudentPortalActive: boolean;
  onToggleStudentPortal: (active: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPublicTab,
  onSelectPublicTab,
  userRole,
  onSetUserRole,
  onOpenLoginModal,
  onOpenDjangoGuide,
  isStudentPortalActive,
  onToggleStudentPortal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const navLinks: { id: PublicTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'departments', label: 'Departments' },
    { id: 'courses', label: 'Courses' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'fees', label: 'Fees' },
    { id: 'placements', label: 'Placements' },
    { id: 'events-notices', label: 'Notices' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: PublicTab) => {
    onSelectPublicTab(tabId);
    onToggleStudentPortal(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      {/* Top institution bar for B.Tech CSE learning reminder */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-medium text-slate-200">Autonomous Institution · NAAC A++ (3.74/4.0)</span>
            <span className="hidden sm:inline text-slate-500">·</span>
            <span className="hidden sm:inline text-slate-300">AICTE Approved</span>
            <span className="hidden md:inline text-slate-500">·</span>
            <span className="hidden md:inline text-slate-300">Affiliated to State Tech University</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenDjangoGuide}
              className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white transition-colors text-xs font-medium cursor-pointer"
              title="View Complete Django full-stack project code and step-by-step setup guide for 1st Year CSE"
            >
              <Code2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Django Code & Setup Guide</span>
              <span className="bg-blue-600/60 text-blue-100 text-[10px] px-1.5 py-0.2 rounded font-mono">5 Stages</span>
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-mono text-[11px]">Helpline: {COLLEGE_INFO.admissionsHelpline}</span>
          </div>
        </div>
      </div>

      {/* Main Top Bar (Strict 3-Zone Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center shadow-sm">
              <GraduationCap className="w-6 h-6 text-blue-200" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap block leading-tight">
                Apex Institute of Technology
              </span>
              <span className="text-[11px] text-slate-500 block">
                Knowledge City · Engineering & Research
              </span>
            </div>
          </div>

          {/* Zone 2: Nav Links, single line */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = !isStudentPortalActive && currentPublicTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer ${
                    isActive 
                      ? 'text-blue-900 font-semibold border-b-2 border-blue-900' 
                      : 'hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action & Portal Control */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Role & Portal Switcher */}
            <div className="relative">
              {userRole === 'guest' ? (
                <button
                  onClick={onOpenLoginModal}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Portal Login</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      onToggleStudentPortal(!isStudentPortalActive);
                    }}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap inline-flex items-center gap-1.5 cursor-pointer ${
                      isStudentPortalActive
                        ? 'bg-blue-900 text-white shadow-sm'
                        : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
                    }`}
                  >
                    {userRole === 'student' && <GraduationCap className="w-3.5 h-3.5" />}
                    {userRole === 'faculty' && <BookOpen className="w-3.5 h-3.5" />}
                    {userRole === 'admin' && <ShieldCheck className="w-3.5 h-3.5" />}
                    <span className="capitalize">{userRole} Portal</span>
                  </button>

                  <button
                    onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Switch user role or log out"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Role dropdown */}
              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-50 text-xs">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-slate-500 font-medium">
                    Simulate Role (Demo Switch):
                  </div>
                  <button
                    onClick={() => { onSetUserRole('student'); onToggleStudentPortal(true); setRoleMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 cursor-pointer ${userRole === 'student' ? 'text-blue-900 font-semibold bg-blue-50/50' : 'text-slate-700'}`}
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="font-medium">Student View</div>
                        <div className="text-[10px] text-slate-400">Rahul Sharma (24CS042)</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => { onSetUserRole('faculty'); onToggleStudentPortal(true); setRoleMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 cursor-pointer ${userRole === 'faculty' ? 'text-blue-900 font-semibold bg-blue-50/50' : 'text-slate-700'}`}
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <div>
                        <div className="font-medium">Faculty View</div>
                        <div className="text-[10px] text-slate-400">Dr. Sunita Rao (HOD CSE)</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => { onSetUserRole('admin'); onToggleStudentPortal(true); setRoleMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 cursor-pointer ${userRole === 'admin' ? 'text-blue-900 font-semibold bg-blue-50/50' : 'text-slate-700'}`}
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="font-medium">Admin View</div>
                        <div className="text-[10px] text-slate-400">Academic & Notice Cell</div>
                      </div>
                    </div>
                  </button>

                  <div className="border-t border-slate-100 my-1"></div>

                  <button
                    onClick={() => { onSetUserRole('guest'); onToggleStudentPortal(false); setRoleMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out (Public View)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
            Navigation
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2 text-sm rounded-md cursor-pointer ${
                currentPublicTab === link.id && !isStudentPortalActive
                  ? 'bg-blue-50 text-blue-900 font-medium'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={() => { onOpenDjangoGuide(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-blue-900 bg-blue-50 rounded-lg cursor-pointer"
            >
              <Code2 className="w-4 h-4 text-blue-700" />
              <span>Django Code & Architecture Guide</span>
            </button>

            {userRole === 'guest' ? (
              <button
                onClick={() => { onOpenLoginModal(); setMobileMenuOpen(false); }}
                className="w-full py-2 text-center text-xs font-semibold text-white bg-blue-900 rounded-lg cursor-pointer"
              >
                Sign In to Student Portal
              </button>
            ) : (
              <button
                onClick={() => { onToggleStudentPortal(true); setMobileMenuOpen(false); }}
                className="w-full py-2 text-center text-xs font-semibold text-white bg-blue-900 rounded-lg cursor-pointer"
              >
                Open {userRole.toUpperCase()} Portal
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
