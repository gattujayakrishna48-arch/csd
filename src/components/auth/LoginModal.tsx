import React, { useState } from 'react';
import { UserRole } from '../../types';
import { 
  X, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  Lock, 
  User, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: UserRole) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSelectRole,
}) => {
  if (!isOpen) return null;

  const [username, setUsername] = useState('rahul.24cs042');
  const [password, setPassword] = useState('password123');
  const [selectedRoleType, setSelectedRoleType] = useState<UserRole>('student');

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectRole(selectedRoleType);
    onClose();
  };

  const handleQuickLogin = (role: UserRole) => {
    onSelectRole(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center mb-2">
            <Lock className="w-5 h-5 text-blue-200" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Sign in to College Portal</h2>
          <p className="text-xs text-slate-500">
            Access student records, class attendance, marks, and administrative controls.
          </p>
        </div>

        {/* 1-Click Demo Profiles */}
        <div className="space-y-2">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Instant Demo Logins (1-Click Switch)</span>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleQuickLogin('student')}
              className="w-full p-3 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 text-left transition-colors flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-900">
                    Student: Rahul Sharma
                  </div>
                  <div className="text-[10px] text-slate-500">Roll: 24CS042 · B.Tech CSE Sem 2</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-900 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleQuickLogin('faculty')}
              className="w-full p-3 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 text-left transition-colors flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-900 text-white flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-900">
                    Faculty: Dr. Sunita Rao
                  </div>
                  <div className="text-[10px] text-slate-500">HOD Computer Science & Eng.</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-900 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleQuickLogin('admin')}
              className="w-full p-3 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-50 text-left transition-colors flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-900 text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-purple-900">
                    Admin: Registrar & Academic Cell
                  </div>
                  <div className="text-[10px] text-slate-500">Superuser Management</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-900 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-white px-2 text-slate-400 font-semibold">Or enter credentials</span>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleCustomLogin} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['student', 'faculty', 'admin'] as UserRole[]).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setSelectedRoleType(r)}
                  className={`py-1.5 text-xs font-semibold rounded-lg capitalize border cursor-pointer ${
                    selectedRoleType === r
                      ? 'border-blue-900 bg-blue-50 text-blue-900'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Username / Institutional ID
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            Authenticate & Open Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};
