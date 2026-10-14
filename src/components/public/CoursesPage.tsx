import React, { useState } from 'react';
import { COURSES_DATA } from '../../data/mockData';
import { Course, PublicTab } from '../../types';
import { 
  BookOpen, 
  Clock, 
  Users, 
  IndianRupee, 
  CheckCircle2, 
  Download, 
  ArrowRight 
} from 'lucide-react';

interface CoursesPageProps {
  onSelectTab: (tab: PublicTab) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onSelectTab }) => {
  const [downloadingCourseId, setDownloadingCourseId] = useState<string | null>(null);

  const handleDownloadSyllabus = (course: Course) => {
    setDownloadingCourseId(course.id);
    setTimeout(() => {
      setDownloadingCourseId(null);
      // Simulate file download trigger
      const element = document.createElement("a");
      const file = new Blob([
        `SYLLABUS DOCUMENT - APEX INSTITUTE OF TECHNOLOGY\nCourse: ${course.title}\nDegree: ${course.degree}\nDuration: ${course.durationYears} Years (${course.totalSemesters} Semesters)\nAccreditation: Autonomous / AICTE Approved\n\nCurriculum Highlights:\n${course.syllabusHighlights.map((h, i) => `${i + 1}. ${h}`).join('\n')}\n\nApproved by Academic Council - Apex Institute of Technology`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${course.id}_curriculum_syllabus_2026.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Academic Programs & Curriculum</h1>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
            AICTE-approved Autonomous undergraduate and postgraduate degree courses engineered for high industry relevance and research excellence.
          </p>
        </div>

        <button
          onClick={() => onSelectTab('admissions')}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors inline-flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
        >
          <span>Apply for Admissions</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {COURSES_DATA.map((course) => (
          <div 
            key={course.id}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:border-blue-300 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-900 rounded-md">
                  {course.degree} · {course.durationYears} Years ({course.totalSemesters} Semesters)
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {course.seats} Seats
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900">
                {course.title}
              </h2>

              <p className="text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Department:</span> {course.department}
              </p>

              {/* Key Details Strip */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-lg text-xs text-slate-600">
                <div>
                  <div className="text-[11px] text-slate-400">Annual Tuition Fee:</div>
                  <div className="font-bold text-slate-900 font-mono tabular-nums">
                    ₹{course.annualFee.toLocaleString('en-IN')} / year
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Degree Conferred:</div>
                  <div className="font-bold text-slate-900">{course.degree} Autonomous</div>
                </div>
              </div>

              {/* Eligibility */}
              <div className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Eligibility: </span>
                <span>{course.eligibility}</span>
              </div>

              {/* Curriculum Highlights */}
              <div className="space-y-1.5 pt-1">
                <div className="text-xs font-semibold text-slate-900">Key Syllabus Modules:</div>
                <ul className="space-y-1 text-xs text-slate-600">
                  {course.syllabusHighlights.slice(0, 4).map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-800 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => handleDownloadSyllabus(course)}
                disabled={downloadingCourseId === course.id}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloadingCourseId === course.id ? 'Preparing PDF...' : 'Download Syllabus'}</span>
              </button>

              <button
                onClick={() => onSelectTab('fees')}
                className="text-xs font-semibold text-blue-900 hover:underline cursor-pointer"
              >
                Calculate Semester Fee →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
