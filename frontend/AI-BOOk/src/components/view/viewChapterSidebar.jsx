import { BookOpen, FileText } from 'lucide-react';

const ViewChapterSidebar = ({ chapters = [], activeChapterId, onSelectChapter }) => {
  return (
    <aside className="w-full md:w-72 bg-white rounded-2xl border border-gray-100 p-4 shadow-xs">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-orange-500" />
        Table of Contents
      </h3>
      <nav className="space-y-1">
        {chapters.map((chapter, index) => {
          const isActive = chapter._id === activeChapterId;
          return (
            <button
              key={chapter._id || index}
              onClick={() => onSelectChapter(chapter._id)}
              className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 ${
                isActive
                  ? 'bg-orange-50 text-orange-600 font-semibold shadow-2xs border border-orange-100'
                  : 'text-gray-700 hover:bg-gray-50 font-medium'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-md text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                  isActive ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-xs truncate">{chapter.title}</div>
                <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                  <FileText className="w-3 h-3" />
                  {chapter.wordCount || 0} words
                </div>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default ViewChapterSidebar;
