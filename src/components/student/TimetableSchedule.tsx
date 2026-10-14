import React, { useState } from 'react';
import { TIMETABLE_DAYS } from '../../data/mockData';
import { Clock, MapPin, User, BookOpen } from 'lucide-react';

export const TimetableSchedule: React.FC = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const slots = TIMETABLE_DAYS[selectedDay] || TIMETABLE_DAYS['Monday'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Weekly Class Timetable</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Semester II · Section A (Computer Science & Engineering) · Room CS-302 & Labs
          </p>
        </div>

        {/* Day buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                selectedDay === day
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Slots List */}
      <div className="space-y-3">
        {slots.map((slot, index) => (
          <div 
            key={index}
            className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start md:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 font-mono font-bold flex flex-col items-center justify-center shrink-0 border border-blue-100">
                <span className="text-[10px] text-blue-600 uppercase">Period</span>
                <span className="text-base leading-none">{index + 1}</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-900 bg-slate-100 px-2 py-0.5 rounded">
                    {slot.subjectCode}
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                    slot.type === 'Lab' 
                      ? 'bg-purple-50 text-purple-800' 
                      : slot.type === 'Tutorial'
                        ? 'bg-amber-50 text-amber-800'
                        : 'bg-emerald-50 text-emerald-800'
                  }`}>
                    {slot.type}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{slot.subjectName}</h3>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{slot.faculty}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold text-slate-700">{slot.room}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-xs font-mono text-slate-700">
              <Clock className="w-3.5 h-3.5 text-blue-900" />
              <span>{slot.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
