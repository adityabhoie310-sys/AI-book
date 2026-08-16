import { useState } from 'react';
import ViewChapterSidebar from './viewChapterSidebar';
import { Download, Edit3, ArrowLeft, Sun, Moon, FileDown } from 'lucide-react';
import Button from '../ui/Button';
import { exportAsFile } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ViewBook = ({ book }) => {
  const navigate = useNavigate();
  const [activeChapterId, setActiveChapterId] = useState(
    book.chapters && book.chapters.length > 0 ? book.chapters[0]._id : ''
  );
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState('base');

  const activeChapter =
    book.chapters?.find((ch) => ch._id === activeChapterId) || book.chapters?.[0];

  const themeStyles = {
    light: 'bg-white text-gray-900 border-gray-100 shadow-sm',
    sepia: 'bg-[#FAF4E8] text-[#3E2C1C] border-[#E8DCBE] shadow-sm',
    dark: 'bg-[#0F111D] text-gray-100 border-gray-800 shadow-md',
  };

  const fontSizes = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
    xl: 'text-xl leading-relaxed',
  };

  const handleExportTxt = () => {
    let fullText = `# ${book.title}\n${book.subtitle ? `## ${book.subtitle}\n` : ''}\nAuthor: ${book.author || 'Alex Doe'}\nCategory: ${book.genre || 'Non-Fiction'}\n\n`;
    if (book.chapters) {
      book.chapters.forEach((ch, idx) => {
        fullText += `\n========================================\n`;
        fullText += `Chapter ${idx + 1}: ${ch.title}\n`;
        fullText += `========================================\n\n`;
        fullText += `${ch.content || ''}\n\n`;
      });
    }
    const filename = `${book.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_ebook.txt`;
    exportAsFile(filename, fullText, 'text/plain');
    toast.success('eBook exported as TXT');
  };

  const handleExportPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" icon={ArrowLeft} onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
          <div>
            <h1 className="font-bold text-lg text-gray-900">{book.title}</h1>
            <p className="text-xs text-gray-500">{book.genre} • {book.chapters?.length || 0} Chapters</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Reader Theme Switcher */}
          <div className="flex items-center bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => setTheme('light')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                theme === 'light' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Light Theme"
            >
              <Sun className="w-3.5 h-3.5" /> Light
            </button>
            <button
              onClick={() => setTheme('sepia')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                theme === 'sepia' ? 'bg-[#F2E5C9] text-[#3E2C1C] font-bold shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Sepia Theme"
            >
              Sepia
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${
                theme === 'dark' ? 'bg-gray-900 text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Dark Theme"
            >
              <Moon className="w-3.5 h-3.5" /> Dark
            </button>
          </div>

          {/* Font Size Selector */}
          <div className="flex items-center bg-gray-100 p-1 rounded-full">
            {['sm', 'base', 'lg', 'xl'].map((sz) => (
              <button
                key={sz}
                onClick={() => setFontSize(sz)}
                className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase cursor-pointer transition-colors ${
                  fontSize === sz ? 'bg-white shadow-xs text-purple-700' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          <Button variant="outline" size="sm" icon={Download} onClick={handleExportTxt}>
            Export TXT
          </Button>

          <Button variant="outline" size="sm" icon={FileDown} onClick={handleExportPrint}>
            Print / PDF
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={Edit3}
            onClick={() => navigate(`/editor/${book._id}`)}
            className="shadow-purple-500/25"
          >
            Edit Studio
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ViewChapterSidebar
          chapters={book.chapters || []}
          activeChapterId={activeChapterId}
          onSelectChapter={setActiveChapterId}
        />

        <div className={`md:col-span-3 rounded-3xl border p-8 sm:p-10 transition-colors ${themeStyles[theme]}`}>
          {activeChapter ? (
            <article className="max-w-3xl mx-auto space-y-6">
              <header className="border-b border-gray-200/50 pb-5 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
                  {book.title}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{activeChapter.title}</h2>
                {activeChapter.description && (
                  <p className="text-sm opacity-75 mt-2 italic">{activeChapter.description}</p>
                )}
              </header>

              <div className={`whitespace-pre-line ${fontSizes[fontSize]} leading-loose`}>
                {activeChapter.content || 'This chapter currently has no content.'}
              </div>
            </article>
          ) : (
            <div className="text-center py-12 text-gray-400">No chapter selected</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
