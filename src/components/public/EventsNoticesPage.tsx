import React, { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  Search, 
  FileText, 
  Download, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  X
} from 'lucide-react';
import { INITIAL_NOTICES, UPCOMING_EVENTS } from '../../data/mockData';
import { Notice, CollegeEvent } from '../../types';

interface EventsNoticesPageProps {
  onOpenNoticeModal: (notice: Notice) => void;
  selectedNoticeModal: Notice | null;
  onCloseNoticeModal: () => void;
}

export const EventsNoticesPage: React.FC<EventsNoticesPageProps> = ({
  onOpenNoticeModal,
  selectedNoticeModal,
  onCloseNoticeModal,
}) => {
  const [activeTab, setActiveTab] = useState<'notices' | 'events'>('notices');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Academic', 'Examination', 'Placement', 'Event', 'General'];

  const filteredNotices = INITIAL_NOTICES.filter(notice => {
    const matchesCategory = categoryFilter === 'All' || notice.category === categoryFilter;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          notice.referenceNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownloadNotice = (notice: Notice) => {
    const element = document.createElement("a");
    const file = new Blob([
      `OFFICIAL CIRCULAR - APEX INSTITUTE OF TECHNOLOGY\nReference No: ${notice.referenceNo}\nDate: ${notice.date}\nCategory: ${notice.category}\nIssued By: ${notice.author}\n\nSUBJECT: ${notice.title.toUpperCase()}\n\n${notice.content}\n\nBy Order,\nRegistrar & Controller of Examinations\nApex Institute of Technology`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${notice.referenceNo.replace(/\//g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Events & Official Circulars</h1>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
            Central repository for autonomous examination circulars, academic notices, university events, and student development workshops.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start md:self-auto">
          <button
            onClick={() => setActiveTab('notices')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'notices'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Notices & Circulars ({INITIAL_NOTICES.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'events'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Events & Fests ({UPCOMING_EVENTS.length})
          </button>
        </div>
      </div>

      {activeTab === 'notices' ? (
        <div className="space-y-6">
          {/* Filters & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
            {/* Category Segmented Controls */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-blue-900 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search circulars, ref no..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
            </div>
          </div>

          {/* Notices List */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
            {filteredNotices.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No circulars match your current filter or query.
              </div>
            ) : (
              filteredNotices.map((notice) => (
                <div 
                  key={notice.id}
                  onClick={() => onOpenNoticeModal(notice)}
                  className="p-5 hover:bg-slate-50/80 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-blue-900">{notice.category}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500 font-mono text-[11px]">{notice.date}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-400 font-mono text-[11px]">Ref: {notice.referenceNo}</span>
                      {notice.isImportant && (
                        <>
                          <span className="text-slate-400">·</span>
                          <span className="text-red-600 font-bold text-[11px]">IMPORTANT</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 hover:text-blue-900 transition-colors">
                      {notice.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {notice.content}
                    </p>

                    <div className="text-[11px] text-slate-400">
                      Issued by {notice.author}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadNotice(notice);
                      }}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      title="Download text circular"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>

                    <button
                      onClick={() => onOpenNoticeModal(notice)}
                      className="px-3 py-1.5 text-xs font-semibold text-blue-900 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    >
                      Read Full →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* Events Section */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UPCOMING_EVENTS.map((event) => (
            <div key={event.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-blue-900">{event.category}</span>
                  <span className="font-mono">{event.date}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{event.title}</h3>
                
                <p className="text-xs text-slate-600 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-1 pt-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                {event.registrationOpen ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Registration Open</span>
                  </span>
                ) : (
                  <span className="text-slate-400">Registration Closed</span>
                )}
                
                <span className="text-slate-400 font-mono text-[11px]">Free for Students</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for viewing single Notice */}
      {selectedNoticeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={onCloseNoticeModal}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-slate-200 pb-4 pr-8">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-blue-900">{selectedNoticeModal.category}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 font-mono">{selectedNoticeModal.date}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500 font-mono">Ref: {selectedNoticeModal.referenceNo}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {selectedNoticeModal.title}
              </h2>
            </div>

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
              <p>{selectedNoticeModal.content}</p>
              <p className="text-slate-500 italic">
                For further clarifications, please contact the office of {selectedNoticeModal.author} during working hours (09:30 AM to 04:30 PM).
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-semibold text-slate-900">Official Circular Attachment</div>
                <div className="text-slate-500 font-mono text-[11px]">
                  {selectedNoticeModal.attachmentName || 'Official_Notification_Signed.pdf'}
                </div>
              </div>

              <button
                onClick={() => handleDownloadNotice(selectedNoticeModal)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors inline-flex items-center gap-2 self-start sm:self-auto cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Circular Document</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
