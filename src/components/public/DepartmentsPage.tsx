import React, { useState } from 'react';
import { 
  DEPARTMENTS_DATA 
} from '../../data/mockData';
import { 
  Cpu, 
  Binary, 
  Radio, 
  Cog, 
  Compass, 
  FlaskConical, 
  CheckCircle,
  GraduationCap
} from 'lucide-react';

export const DepartmentsPage: React.FC = () => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>('cse');

  const getDeptIcon = (code: string) => {
    switch (code) {
      case 'CS': return <Cpu className="w-5 h-5" />;
      case 'AD': return <Binary className="w-5 h-5" />;
      case 'EC': return <Radio className="w-5 h-5" />;
      case 'ME': return <Cog className="w-5 h-5" />;
      default: return <Compass className="w-5 h-5" />;
    }
  };

  const activeDept = DEPARTMENTS_DATA.find(d => d.id === selectedDeptId) || DEPARTMENTS_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Academic Engineering Departments</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl leading-relaxed">
          Explore our specialized engineering branches, research laboratories, curriculum highlights, and esteemed departmental faculty.
        </p>
      </div>

      {/* Department Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {DEPARTMENTS_DATA.map((dept) => {
          const isActive = dept.id === selectedDeptId;
          return (
            <button
              key={dept.id}
              onClick={() => setSelectedDeptId(dept.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {getDeptIcon(dept.code)}
              <span>{dept.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Department Detailed Dossier */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-900 font-semibold mb-1">
              <span>Department Code: {activeDept.code}</span>
              <span>·</span>
              <span>Est. {activeDept.established}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{activeDept.name}</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-blue-50 text-blue-900 rounded-lg text-xs font-medium text-center">
              <div className="font-bold text-sm font-mono">{activeDept.intake}</div>
              <div className="text-[10px] text-slate-500 uppercase">Annual Intake</div>
            </div>
          </div>
        </div>

        {/* Description & HOD Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">
              Overview & Academic Philosophy
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeDept.description} The department follows a student-centric learning pedagogy, prioritizing practical laboratory work, live industry projects, and active participation in competitive hackathons and research publications.
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-900 mb-2.5">Key Core Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {activeDept.keySpecializations.map((spec, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium border border-slate-200"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* HOD Card */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                HOD
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{activeDept.hodName}</h4>
                <div className="text-xs text-blue-900 font-medium">Head of Department</div>
              </div>
            </div>
            <div className="text-xs text-slate-500">
              <div className="font-semibold text-slate-700">Highest Degree:</div>
              <div>{activeDept.hodQualification}</div>
            </div>
            <p className="text-xs text-slate-600 italic border-t border-slate-200 pt-2 leading-relaxed">
              "We challenge our students to think algorithmically, embrace debugging, and build robust software products that solve real problems."
            </p>
          </div>
        </div>

        {/* Department Laboratories */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-blue-900" />
            <h3 className="text-base font-bold text-slate-900">Department Laboratories & Research Facilities</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeDept.laboratories.map((lab, i) => (
              <div key={i} className="p-4 bg-slate-50/70 rounded-lg border border-slate-200 flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900">{lab}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Equipped with licensed enterprise toolchains, high-speed fiber internet, and dedicated lab faculty.</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
