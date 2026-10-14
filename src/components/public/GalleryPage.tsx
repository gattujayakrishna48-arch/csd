import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../../data/mockData';
import { 
  Building2, 
  FlaskConical, 
  BookOpen, 
  Sparkles, 
  Camera, 
  X,
  Maximize2
} from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const categories = ['All', 'Campus', 'Labs', 'Library', 'Events'];

  const filteredItems = filter === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Campus Gallery & Infrastructure</h1>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
            Take a visual tour across our 45-acre green academic campus, high-tech computing labs, research facilities, and lively student celebrations.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                filter === cat
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
          >
            {/* Styled Illustration Container */}
            <div className="relative h-48 bg-gradient-to-br from-slate-800 to-blue-950 flex flex-col items-center justify-center p-6 text-center text-white overflow-hidden">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]"></div>
              
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                {item.category === 'Campus' && <Building2 className="w-6 h-6 text-blue-300" />}
                {item.category === 'Labs' && <FlaskConical className="w-6 h-6 text-emerald-300" />}
                {item.category === 'Library' && <BookOpen className="w-6 h-6 text-amber-300" />}
                {item.category === 'Events' && <Sparkles className="w-6 h-6 text-purple-300" />}
              </div>

              <div className="text-xs font-semibold text-blue-200 tracking-wider uppercase text-[10px]">
                {item.tag}
              </div>
              <div className="text-sm font-bold text-white mt-1 line-clamp-1">
                {item.title}
              </div>

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="p-1.5 bg-black/40 backdrop-blur-sm rounded-lg text-white inline-block">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-900">{item.title}</span>
                <div className="text-[11px] text-slate-400 mt-0.5">{item.category} Facility</div>
              </div>
              <span className="text-blue-900 font-semibold group-hover:underline">
                Inspect →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 relative">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 rounded-xl bg-gradient-to-br from-slate-900 to-blue-900 flex flex-col items-center justify-center text-white p-6 text-center">
              <Camera className="w-12 h-12 text-blue-300/80 mb-3" />
              <div className="text-lg font-bold">{activeItem.title}</div>
              <div className="text-xs text-blue-200 mt-1">{activeItem.tag} · {activeItem.category} Division</div>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900">{activeItem.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modern academic facility outfitted with high-speed fiber local area network, uninterrupted power backup, ergonomic seating, and air conditioning for continuous engineering research.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveItem(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
