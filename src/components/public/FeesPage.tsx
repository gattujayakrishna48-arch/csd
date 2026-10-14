import React, { useState } from 'react';
import { 
  Calculator, 
  IndianRupee, 
  Building2, 
  Bus, 
  Award, 
  CreditCard,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { COURSES_DATA } from '../../data/mockData';

export const FeesPage: React.FC = () => {
  // Calculator state
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [hostelOption, setHostelOption] = useState<'none' | 'non_ac' | 'ac'>('none');
  const [transportOption, setTransportOption] = useState<'none' | 'zone1' | 'zone2'>('none');
  const [scholarshipTier, setScholarshipTier] = useState<number>(0); // 0%, 25%, 50%

  const activeCourse = COURSES_DATA[selectedCourseIndex] || COURSES_DATA[0];
  const semesterTuitionBase = Math.round(activeCourse.annualFee / 2);
  const examFee = 2500;
  const labTechFee = 5000;

  // Hostel fee per semester
  let semesterHostelFee = 0;
  if (hostelOption === 'non_ac') semesterHostelFee = 38000;
  if (hostelOption === 'ac') semesterHostelFee = 52000;

  // Transport fee per semester
  let semesterTransportFee = 0;
  if (transportOption === 'zone1') semesterTransportFee = 14000;
  if (transportOption === 'zone2') semesterTransportFee = 19000;

  // Scholarship waiver on tuition
  const scholarshipDiscount = Math.round(semesterTuitionBase * (scholarshipTier / 100));
  const finalSemesterTuition = semesterTuitionBase - scholarshipDiscount;
  const totalSemesterPayable = finalSemesterTuition + examFee + labTechFee + semesterHostelFee + semesterTransportFee;
  const estimatedAnnualTotal = totalSemesterPayable * 2;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Fee Structure & Financial Aid</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
          Transparent, approved fee schedules for undergraduate and postgraduate degree courses with interactive semester cost simulation.
        </p>
      </div>

      {/* Interactive Fee Calculator Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Interactive Semester Fee Estimator</h2>
            <p className="text-xs text-slate-500">Configure your degree, residential hostel, bus transport, and scholarship</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-5">
            {/* Course select */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Select Academic Course:
              </label>
              <select
                value={selectedCourseIndex}
                onChange={(e) => setSelectedCourseIndex(parseInt(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
              >
                {COURSES_DATA.map((c, i) => (
                  <option key={c.id} value={i}>
                    {c.title} — (₹{c.annualFee.toLocaleString('en-IN')}/year)
                  </option>
                ))}
              </select>
            </div>

            {/* Hostel accommodation */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Hostel & Mess Accommodation:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setHostelOption('none')}
                  className={`p-2.5 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                    hostelOption === 'none'
                      ? 'border-blue-900 bg-blue-50 text-blue-900 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  Day Scholar (₹0)
                </button>
                <button
                  type="button"
                  onClick={() => setHostelOption('non_ac')}
                  className={`p-2.5 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                    hostelOption === 'non_ac'
                      ? 'border-blue-900 bg-blue-50 text-blue-900 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  Non-AC Room (₹38k/sem)
                </button>
                <button
                  type="button"
                  onClick={() => setHostelOption('ac')}
                  className={`p-2.5 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                    hostelOption === 'ac'
                      ? 'border-blue-900 bg-blue-50 text-blue-900 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  AC Room (₹52k/sem)
                </button>
              </div>
            </div>

            {/* Transport Bus */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Campus Bus Transportation:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTransportOption('none')}
                  className={`p-2.5 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                    transportOption === 'none'
                      ? 'border-blue-900 bg-blue-50 text-blue-900 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  Own Transport (₹0)
                </button>
                <button
                  type="button"
                  onClick={() => setTransportOption('zone1')}
                  className={`p-2.5 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                    transportOption === 'zone1'
                      ? 'border-blue-900 bg-blue-50 text-blue-900 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  Zone 1 (&lt;15 km, ₹14k)
                </button>
                <button
                  type="button"
                  onClick={() => setTransportOption('zone2')}
                  className={`p-2.5 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                    transportOption === 'zone2'
                      ? 'border-blue-900 bg-blue-50 text-blue-900 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  Zone 2 (&gt;15 km, ₹19k)
                </button>
              </div>
            </div>

            {/* Merit Scholarship Tier */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Merit Scholarship Eligibility:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setScholarshipTier(0)}
                  className={`p-2.5 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                    scholarshipTier === 0
                      ? 'border-blue-900 bg-blue-50 text-blue-900 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  Standard (0% off)
                </button>
                <button
                  type="button"
                  onClick={() => setScholarshipTier(25)}
                  className={`p-2.5 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                    scholarshipTier === 25
                      ? 'border-blue-900 bg-blue-50 text-blue-900 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  90-95% Board (25% off)
                </button>
                <button
                  type="button"
                  onClick={() => setScholarshipTier(50)}
                  className={`p-2.5 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                    scholarshipTier === 50
                      ? 'border-blue-900 bg-blue-50 text-blue-900 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  95%+ Board (50% off)
                </button>
              </div>
            </div>
          </div>

          {/* Breakdown Result Card */}
          <div className="lg:col-span-5 bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Estimated Semester Breakdown
              </div>

              <div className="space-y-2 text-xs divide-y divide-slate-200">
                <div className="flex justify-between py-1 text-slate-600">
                  <span>Semester Base Tuition:</span>
                  <span className="font-mono tabular-nums">₹{semesterTuitionBase.toLocaleString('en-IN')}</span>
                </div>

                {scholarshipDiscount > 0 && (
                  <div className="flex justify-between py-1 text-emerald-700 font-medium">
                    <span>Merit Scholarship ({scholarshipTier}% off tuition):</span>
                    <span className="font-mono tabular-nums">-₹{scholarshipDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between py-1 text-slate-600">
                  <span>Semester Lab & Tech Maintenance:</span>
                  <span className="font-mono tabular-nums">₹{labTechFee.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between py-1 text-slate-600">
                  <span>Examination & Grade Card Fee:</span>
                  <span className="font-mono tabular-nums">₹{examFee.toLocaleString('en-IN')}</span>
                </div>

                {semesterHostelFee > 0 && (
                  <div className="flex justify-between py-1 text-slate-600">
                    <span>Hostel & Mess Boarding:</span>
                    <span className="font-mono tabular-nums">₹{semesterHostelFee.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {semesterTransportFee > 0 && (
                  <div className="flex justify-between py-1 text-slate-600">
                    <span>Transportation Facility:</span>
                    <span className="font-mono tabular-nums">₹{semesterTransportFee.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t-2 border-slate-300 space-y-2">
              <div className="flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Total Payable / Semester:</span>
                <span className="text-base text-blue-900 font-mono tabular-nums">
                  ₹{totalSemesterPayable.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Estimated Full Academic Year:</span>
                <span className="font-mono tabular-nums font-medium text-slate-700">
                  ₹{estimatedAnnualTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Standard Annual Fee Comparison Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-900">Approved Annual Tuition Schedule (All Programs)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                <th className="py-2.5 px-3 font-semibold">Course Title</th>
                <th className="py-2.5 px-3 font-semibold">Duration</th>
                <th className="py-2.5 px-3 font-semibold">Annual Tuition</th>
                <th className="py-2.5 px-3 font-semibold">Per Semester</th>
                <th className="py-2.5 px-3 font-semibold">Deposit (Refundable)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {COURSES_DATA.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 font-medium text-slate-900">{c.title}</td>
                  <td className="py-2.5 px-3">{c.durationYears} Years</td>
                  <td className="py-2.5 px-3 font-mono tabular-nums font-semibold text-slate-900">
                    ₹{c.annualFee.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">
                    ₹{Math.round(c.annualFee / 2).toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 px-3 font-mono tabular-nums">₹10,000 (One-time)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
