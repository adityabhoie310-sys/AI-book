import { useState } from 'react';
import ViewChapterSidebar from './viewChapterSidebar';
import { Download, Edit3, ArrowLeft, Sun, Moon } from 'lucide-react';
import Button from '../ui/Button';
import { exportAsFile } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';

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
    light: 'bg-white text-gray-900 border-gray-100',
    sepia: 'bg-[#fbf0d9] text-[#433422] border-[#e6d5b8]',
    dark: 'bg-gray-900 text-gray-100 border-gray-800',
  };

  const fontSizes = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
    xl: 'text-xl leading-relaxed',
  };

  const handleExportTxt = () => {
    let fullText = `# ${book.title}\n${book.subtitle ? `## ${book.subtitle}\n` : ''}\nBy ${book.genre}\n\n`;
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
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" icon={ArrowLeft} onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
          <div>
            <h1 className="font-bold text-lg text-gray-900">{book.title}</h1>
            <p className="text-xs text-gray-500">{book.genre} • {book.chapters?.length || 0} Chapters</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded-lg text-xs font-semibold ${theme === 'light' ? 'bg-white shadow-2xs text-gray-900' : 'text-gray-500'}`}
              title="Light Mode"
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme('sepia')}
              className={`p-1.5 rounded-lg text-xs font-semibold ${theme === 'sepia' ? 'bg-[#f5e6ca] text-[#433422]' : 'text-gray-500'}`}
              title="Sepia Mode"
            >
              Sepia
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-lg text-xs font-semibold ${theme === 'dark' ? 'bg-gray-800 text-white' : 'text-gray-500'}`}
              title="Dark Mode"
            >
              <Moon className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center bg-gray-100 p-1 rounded-xl">
            {['sm', 'base', 'lg', 'xl'].map((sz) => (
              <button
                key={sz}
                onClick={() => setFontSize(sz)}
                className={`px-2 py-1 rounded-lg text-xs font-bold uppercase ${fontSize === sz ? 'bg-white shadow-2xs text-gray-900' : 'text-gray-500'}`}
              >
                {sz}
              </button>
            ))}
          </div>

          <Button variant="outline" size="sm" icon={Download} onClick={handleExportTxt}>
            Export TXT
          </Button>
          <Button variant="primary" size="sm" icon={Edit3} onClick={() => navigate(`/editor/${book._id}`)}>
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

        <div className={`md:col-span-3 rounded-2xl border p-8 shadow-sm transition-colors ${themeStyles[theme]}`}>
          {activeChapter ? (
            <article className="prose max-w-none space-y-6">
              <header className="border-b pb-4 mb-6">
                <h2 className="text-2xl font-bold tracking-tight">{activeChapter.title}</h2>
                {activeChapter.description && (
                  <p className="text-sm opacity-75 mt-1 italic">{activeChapter.description}</p>
                )}
              </header>

              <div className={`whitespace-pre-line ${fontSizes[fontSize]}`}>
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
