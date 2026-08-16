import { useNavigate } from 'react-router-dom';
import { Edit3, Eye, Trash2, MoreVertical, FileText, Clock } from 'lucide-react';
import { calculateReadingTime, GENRE_COLOR_MAP } from '../../utils/helper';
import Dropdown from '../ui/Dropdown';

const BookCard = ({ book, onDelete }) => {
  const navigate = useNavigate();

  const gradient =
    book.coverColor || GENRE_COLOR_MAP[book.genre] || 'from-purple-600 to-indigo-600';
  const chapterCount = book.chapters ? book.chapters.length : 1;
  const wordCount = book.wordCount || 0;

  const menuItems = [
    {
      label: 'Edit Studio',
      icon: Edit3,
      onClick: () => navigate(`/editor/${book._id}`),
    },
    {
      label: 'Read eBook',
      icon: Eye,
      onClick: () => navigate(`/view-book/${book._id}`),
    },
    {
      label: 'Delete eBook',
      icon: Trash2,
      danger: true,
      onClick: () => onDelete?.(book._id),
    },
  ];

  return (
    <div className="group bg-white rounded-3xl border border-gray-100 shadow-xs hover:shadow-xl hover:border-purple-200 transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1">
      {/* Cover Header */}
      <div className={`h-40 bg-gradient-to-tr ${gradient} p-4 sm:p-5 relative flex flex-col justify-between overflow-hidden`}>
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center justify-between z-10">
          <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
            {book.genre || 'Non-Fiction'}
          </span>
          <Dropdown
            trigger={
              <button className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
                <MoreVertical className="w-4 h-4" />
              </button>
            }
            items={menuItems}
          />
        </div>

        <div className="z-10">
          <h3 className="text-white font-bold text-base sm:text-lg leading-snug line-clamp-2 drop-shadow-xs">
            {book.title}
          </h3>
          {book.author && (
            <p className="text-white/80 text-[11px] line-clamp-1 mt-0.5 font-medium">
              by {book.author}
            </p>
          )}
        </div>
      </div>

      {/* Body Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
          {book.description || 'Comprehensive AI generated eBook.'}
        </p>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-purple-500" />
            <span>{chapterCount} {chapterCount === 1 ? 'Chapter' : 'Chapters'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-purple-500" />
            <span>{wordCount.toLocaleString()} words</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => navigate(`/editor/${book._id}`)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold text-xs rounded-full transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Studio Editor
          </button>
          <button
            onClick={() => navigate(`/view-book/${book._id}`)}
            className="inline-flex items-center justify-center p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors cursor-pointer"
            title="Read eBook"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
