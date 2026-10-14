import React, { useState } from 'react';
import { STUDENT_FEES, INITIAL_STUDENT_PROFILE, COLLEGE_INFO } from '../../data/mockData';
import { FeeRecord } from '../../types';
import { 
  CreditCard, 
  Receipt, 
  CheckCircle2, 
  Clock, 
  Download, 
  Printer, 
  X,
  AlertCircle
} from 'lucide-react';

export const FeeStatus: React.FC = () => {
  const [fees, setFees] = useState<FeeRecord[]>(STUDENT_FEES);
  const [activeReceipt, setActiveReceipt] = useState<FeeRecord | null>(null);
  const [payingFeeIndex, setPayingFeeIndex] = useState<number | null>(null);

  const handlePayFee = (index: number) => {
    setPayingFeeIndex(index);
    setTimeout(() => {
      const updated = [...fees];
      updated[index] = {
        ...updated[index],
        status: 'Paid',
        receiptNo: `AIT-REC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        paymentDate: new Date().toISOString().split('T')[0]
      };
      setFees(updated);
      setPayingFeeIndex(null);
      setActiveReceipt(updated[index]);
    }, 800);
  };

  const handleDownloadReceipt = (record: FeeRecord) => {
    const element = document.createElement("a");
    const total = record.tuitionFee + record.examFee + record.libraryFee;
    const file = new Blob([
      `OFFICIAL FEE RECEIPT - APEX INSTITUTE OF TECHNOLOGY\nReceipt No: ${record.receiptNo || 'N/A'}\nDate of Payment: ${record.paymentDate || 'N/A'}\n\nStudent Name: ${INITIAL_STUDENT_PROFILE.name}\nRoll Number: ${INITIAL_STUDENT_PROFILE.rollNo}\nRegistration No: ${INITIAL_STUDENT_PROFILE.registrationNo}\nDepartment: ${INITIAL_STUDENT_PROFILE.department}\nSemester: ${record.semester}\nAcademic Year: ${record.academicYear}\n\nFEE BREAKDOWN:\nTuition Fee: ₹${record.tuitionFee.toLocaleString('en-IN')}\nExamination Fee: ₹${record.examFee.toLocaleString('en-IN')}\nLibrary & Lab Deposit: ₹${record.libraryFee.toLocaleString('en-IN')}\n----------------------------------------\nTotal Amount Paid: ₹${total.toLocaleString('en-IN')}\nStatus: PAID (ELECTRONIC VERIFICATION CLEARED)\n\nApex Institute of Technology Accounts Department`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Fee_Receipt_${record.receiptNo || 'Statement'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Semester Fee Clearance & Receipts</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            View transaction history, pay upcoming semester dues, and generate authentic e-receipts for bank loans and tax deductions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
            <div className="text-[10px] text-emerald-800 font-bold uppercase">No Dues Certificate</div>
            <div className="text-xs font-semibold text-emerald-950 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Current Sem Cleared</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Records Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900">Academic Fee Statements</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                <th className="py-2.5 px-3 font-semibold">Semester</th>
                <th className="py-2.5 px-3 font-semibold">Academic Year</th>
                <th className="py-2.5 px-3 font-semibold">Tuition Fee</th>
                <th className="py-2.5 px-3 font-semibold">Exam & Lab Fee</th>
                <th className="py-2.5 px-3 font-semibold">Total Fee</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {fees.map((record, index) => {
                const total = record.tuitionFee + record.examFee + record.libraryFee;
                const isPaid = record.status === 'Paid';

                return (
                  <tr key={index} className="hover:bg-slate-50/60">
                    <td className="py-3 px-3 font-bold text-slate-900">{record.semester}</td>
                    <td className="py-3 px-3 font-mono">{record.academicYear}</td>
                    <td className="py-3 px-3 font-mono tabular-nums">₹{record.tuitionFee.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 font-mono tabular-nums">₹{(record.examFee + record.libraryFee).toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 font-mono font-bold tabular-nums text-slate-900">
                      ₹{total.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                        isPaid ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {isPaid ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setActiveReceipt(record)}
                            className="px-2.5 py-1 text-xs font-semibold text-blue-900 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                          >
                            View Receipt
                          </button>
                          <button
                            onClick={() => handleDownloadReceipt(record)}
                            className="p-1 text-slate-600 hover:text-slate-900 rounded cursor-pointer"
                            title="Download Receipt text"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handlePayFee(index)}
                          disabled={payingFeeIndex === index}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {payingFeeIndex === index ? 'Processing...' : 'Pay Online'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Modal */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setActiveReceipt(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center border-b border-slate-200 pb-4 space-y-1">
              <h3 className="text-base font-bold text-blue-950 uppercase">{COLLEGE_INFO.name}</h3>
              <div className="text-xs text-slate-500">Accounts & Bursar Department</div>
              <div className="text-sm font-bold text-slate-900 mt-2">OFFICIAL FEE RECEIPT</div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg">
              <div>
                <div><strong>Receipt No:</strong> <span className="font-mono">{activeReceipt.receiptNo}</span></div>
                <div><strong>Student Name:</strong> {INITIAL_STUDENT_PROFILE.name}</div>
                <div><strong>Roll No:</strong> <span className="font-mono">{INITIAL_STUDENT_PROFILE.rollNo}</span></div>
              </div>
              <div>
                <div><strong>Date:</strong> {activeReceipt.paymentDate || '2025-01-14'}</div>
                <div><strong>Semester:</strong> {activeReceipt.semester}</div>
                <div><strong>Payment Mode:</strong> Net Banking / UPI</div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs divide-y divide-slate-100">
              <div className="flex justify-between py-1">
                <span>Tuition Fee:</span>
                <span className="font-mono tabular-nums">₹{activeReceipt.tuitionFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Examination & Grade Card Fee:</span>
                <span className="font-mono tabular-nums">₹{activeReceipt.examFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Library & Digital Resources:</span>
                <span className="font-mono tabular-nums">₹{activeReceipt.libraryFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-slate-900 text-sm border-t-2 border-slate-300">
                <span>Total Amount Paid:</span>
                <span className="font-mono tabular-nums">
                  ₹{(activeReceipt.tuitionFee + activeReceipt.examFee + activeReceipt.libraryFee).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Transaction Verified & Reconciled</span>
              </div>
              <button
                onClick={() => handleDownloadReceipt(activeReceipt)}
                className="text-xs font-bold underline cursor-pointer"
              >
                Download Receipt Text
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
