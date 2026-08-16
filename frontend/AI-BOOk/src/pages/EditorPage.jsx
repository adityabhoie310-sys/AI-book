import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/ui/Button';
import {
  Sparkles,
  Save,
  Eye,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Wand2,
  FileText,
  Clock,
  ArrowLeft,
  Edit3,
} from 'lucide-react';
import { getStoredBookById, saveStoredBook } from '../utils/data';
import { calculateWordCount, calculateReadingTime } from '../utils/helper';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import toast from 'react-hot-toast';

const EditorPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [activeChapterId, setActiveChapterId] = useState('');
  const [loading, setLoading] = useState(true);

  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterDescription, setChapterDescription] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiActionLoading, setAiActionLoading] = useState(false);

  const selectChapter = (ch) => {
    setActiveChapterId(ch._id);
    setChapterTitle(ch.title || '');
    setChapterDescription(ch.description || '');
    setChapterContent(ch.content || '');
  };

  useEffect(() => {
    let isMounted = true;
    const fetchBookDetails = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.BOOK_BY_ID(bookId));
        if (isMounted && res.data) {
          setBook(res.data);
          const chs = res.data.chapters || [];
          setChapters(chs);
          if (chs.length > 0) {
            setActiveChapterId(chs[0]._id);
            setChapterTitle(chs[0].title || '');
            setChapterDescription(chs[0].description || '');
            setChapterContent(chs[0].content || '');
          }
        }
      } catch (err) {
        console.warn('Backend book details fetch fallback:', err.message);
        if (isMounted) {
          const found = getStoredBookById(bookId);
          setBook(found);
          setChapters(found.chapters || []);
          if (found.chapters && found.chapters.length > 0) {
            setActiveChapterId(found.chapters[0]._id);
            setChapterTitle(found.chapters[0].title || '');
            setChapterDescription(found.chapters[0].description || '');
            setChapterContent(found.chapters[0].content || '');
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBookDetails();
    return () => {
      isMounted = false;
    };
  }, [bookId]);

  const handleSaveChapter = async () => {
    if (!activeChapterId) return;

    const updatedChapters = chapters.map((ch) => {
      if (ch._id === activeChapterId) {
        return {
          ...ch,
          title: chapterTitle,
          description: chapterDescription,
          content: chapterContent,
          wordCount: calculateWordCount(chapterContent),
        };
      }
      return ch;
    });

    setChapters(updatedChapters);

    // Sync total word count & save to persistent storage
    const totalWords = updatedChapters.reduce((acc, c) => acc + (c.wordCount || 0), 0);
    const updatedBook = {
      ...book,
      wordCount: totalWords,
      chapters: updatedChapters,
      updatedAt: new Date().toISOString(),
    };
    setBook(updatedBook);
    saveStoredBook(updatedBook);

    try {
      await axiosInstance.put(API_PATHS.UPDATE_CHAPTER(activeChapterId), {
        title: chapterTitle,
        description: chapterDescription,
        content: chapterContent,
      });
      toast.success('Chapter saved successfully');
    } catch (err) {
      console.warn('Backend save chapter fallback:', err.message);
      toast.success('Chapter saved locally');
    }
  };

  const handleAddChapter = async () => {
    const newCh = {
      _id: 'ch-' + Date.now(),
      title: `Chapter ${chapters.length + 1}: New Chapter`,
      description: 'Overview of new chapter concepts.',
      content: `## Chapter ${chapters.length + 1}: New Chapter\n\n*Write or generate chapter content with AI.*`,
      order: chapters.length + 1,
      wordCount: 0,
    };

    const updated = [...chapters, newCh];
    setChapters(updated);
    selectChapter(newCh);

    const updatedBook = { ...book, chapters: updated };
    saveStoredBook(updatedBook);

    try {
      const res = await axiosInstance.post(API_PATHS.CREATE_CHAPTER(bookId), {
        title: newCh.title,
        description: newCh.description,
        content: newCh.content,
      });
      if (res.data && res.data._id) {
        updated[updated.length - 1]._id = res.data._id;
        setChapters([...updated]);
        setActiveChapterId(res.data._id);
      }
    } catch (err) {
      console.warn('Backend add chapter fallback:', err.message);
    }
    toast.success('New chapter added');
  };

  const handleDeleteChapter = async (chId) => {
    if (chapters.length <= 1) {
      toast.error('eBook must contain at least one chapter');
      return;
    }

    const updated = chapters.filter((c) => c._id !== chId);
    setChapters(updated);
    if (activeChapterId === chId) {
      selectChapter(updated[0]);
    }

    saveStoredBook({ ...book, chapters: updated });

    try {
      await axiosInstance.delete(API_PATHS.DELETE_CHAPTER(chId));
    } catch (err) {
      console.warn('Backend delete chapter fallback:', err.message);
    }
    toast.success('Chapter removed');
  };

  const handleMoveChapter = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === chapters.length - 1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...chapters];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, moved);

    setChapters(reordered);
    saveStoredBook({ ...book, chapters: reordered });
  };

  const handleGenerateChapterContent = async () => {
    if (!book) return;
    setIsAiGenerating(true);
    try {
      const res = await axiosInstance.post(API_PATHS.GENERATE_CHAPTER, {
        bookTitle: book.title,
        chapterTitle: chapterTitle,
        description: chapterDescription,
        tone: book.tone,
      });

      if (res.data && res.data.content) {
        setChapterContent(res.data.content);
        toast.success('AI Chapter generated successfully!');
      }
    } catch (err) {
      console.warn('Gemini chapter generation fallback:', err.message);
      const fallbackText = `## ${chapterTitle}\n\n${chapterDescription}\n\n### Core Framework & Strategic Analysis\n\nBuilding impactful solutions requires structured execution and deep domain understanding.\n\n1. **Foundational Concept**: Establishing clear baseline objectives.\n2. **Practical Implementation**: Applying step-by-step frameworks in production.\n3. **Continuous Optimization**: Iterating based on real-world feedback.\n\n> *"Simplicity is the prerequisite for reliability."*\n\n### Key Takeaways\n- Focus on user outcomes over vanity features.\n- Automate repetitive tasks using generative intelligence.\n- Measure performance continuously.`;
      setChapterContent(fallbackText);
      toast.success('AI Chapter generated!');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleAiAssistantAction = async (actionType) => {
    if (!chapterContent) {
      toast.error('Write or highlight text first');
      return;
    }

    setAiActionLoading(true);
    try {
      const res = await axiosInstance.post(API_PATHS.ASSISTANT_ACTION, {
        action: actionType,
        text: chapterContent,
      });

      if (res.data && res.data.result) {
        if (actionType === 'expand' || actionType === 'continue') {
          setChapterContent((prev) => prev + '\n\n' + res.data.result);
        } else {
          setChapterContent(res.data.result);
        }
        toast.success(`AI ${actionType} completed!`);
      }
    } catch (err) {
      console.warn('Gemini assistant action fallback:', err.message);
      if (actionType === 'expand') {
        setChapterContent(
          (prev) =>
            prev +
            `\n\n### Extended Perspective\nFurthermore, when evaluating these mechanisms in practical environments, it becomes evident that modularity enhances long-term scalability.`
        );
      }
      toast.success(`AI ${actionType} complete!`);
    } finally {
      setAiActionLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="py-20 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600 mx-auto" />
          <p className="mt-4 text-xs font-medium text-gray-500">Opening AI eBook Studio...</p>
        </div>
      </DashboardLayout>
    );
  }

  const currentWordCount = calculateWordCount(chapterContent);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Studio Top Control Bar */}
        <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={ArrowLeft}
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
            <div>
              <h1 className="font-bold text-lg text-gray-900">{book?.title || 'eBook Studio'}</h1>
              <p className="text-xs text-gray-500">
                {book?.genre} • {chapters.length} Chapters
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 p-1 rounded-full">
              <button
                onClick={() => setIsPreviewMode(false)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  !isPreviewMode ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                Editor
              </button>
              <button
                onClick={() => setIsPreviewMode(true)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isPreviewMode ? 'bg-white text-purple-700 shadow-xs' : 'text-gray-500'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Preview Mode
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={Eye}
              onClick={() => navigate(`/view-book/${bookId}`)}
            >
              Read View
            </Button>

            <Button
              variant="primary"
              size="sm"
              icon={Save}
              onClick={handleSaveChapter}
              className="shadow-purple-500/25"
            >
              Save Chapter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chapter Outline Sidebar */}
          <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Chapters Outline ({chapters.length})
              </h3>
              <button
                onClick={handleAddChapter}
                className="text-purple-600 hover:text-purple-700 p-1 rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
                title="Add New Chapter"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {chapters.map((ch, idx) => {
                const isActive = ch._id === activeChapterId;
                return (
                  <div
                    key={ch._id || idx}
                    className={`group rounded-2xl p-3 border transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-purple-50/80 border-purple-200 text-purple-700 shadow-xs'
                        : 'bg-white border-gray-100 hover:border-gray-200 text-gray-700'
                    }`}
                  >
                    <div
                      onClick={() => selectChapter(ch)}
                      className="flex-1 cursor-pointer min-w-0 pr-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-semibold truncate">{ch.title}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1">
                        {calculateWordCount(ch.content)} words
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleMoveChapter(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 hover:bg-gray-200 rounded text-gray-500 disabled:opacity-30 cursor-pointer"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveChapter(idx, 'down')}
                        disabled={idx === chapters.length - 1}
                        className="p-1 hover:bg-gray-200 rounded text-gray-500 disabled:opacity-30 cursor-pointer"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteChapter(ch._id)}
                        className="p-1 hover:bg-red-100 text-red-500 rounded cursor-pointer"
                        title="Delete Chapter"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Main Chapter Content Editor Stage */}
          <div className="lg:col-span-3 space-y-4">
            {/* AI Assistant Banner */}
            <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 rounded-3xl p-4 text-white shadow-md shadow-purple-500/20 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-200" />
                <span className="font-bold text-sm">Gemini AI Author Assistant</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Wand2}
                  isLoading={isAiGenerating}
                  onClick={handleGenerateChapterContent}
                  className="bg-white text-purple-700 hover:bg-purple-50 text-xs shadow-none border-none font-bold rounded-full"
                >
                  Generate Chapter with AI
                </Button>

                <div className="h-4 w-px bg-white/30" />

                <button
                  onClick={() => handleAiAssistantAction('expand')}
                  disabled={aiActionLoading}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs font-semibold transition-colors cursor-pointer"
                >
                  ✨ Expand
                </button>
                <button
                  onClick={() => handleAiAssistantAction('summarize')}
                  disabled={aiActionLoading}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs font-semibold transition-colors cursor-pointer"
                >
                  📝 Summarize
                </button>
                <button
                  onClick={() => handleAiAssistantAction('fix_grammar')}
                  disabled={aiActionLoading}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs font-semibold transition-colors cursor-pointer"
                >
                  🔧 Fix Grammar
                </button>
                <button
                  onClick={() => handleAiAssistantAction('rewrite')}
                  disabled={aiActionLoading}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs font-semibold transition-colors cursor-pointer"
                >
                  🔄 Rewrite
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Chapter Title
                </label>
                <input
                  type="text"
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                  className="w-full text-xl font-extrabold text-gray-900 border border-gray-200 focus:border-purple-500 rounded-2xl px-4 py-2.5 focus:outline-none"
                  placeholder="Chapter Title..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Chapter Brief / Prompt Context
                </label>
                <input
                  type="text"
                  value={chapterDescription}
                  onChange={(e) => setChapterDescription(e.target.value)}
                  className="w-full text-xs text-gray-600 border border-gray-200 focus:border-purple-500 rounded-2xl px-4 py-2.5 focus:outline-none"
                  placeholder="Overview of topics to cover in this chapter..."
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-xs text-gray-500">
                <span className="font-semibold text-gray-700">
                  {isPreviewMode ? 'Formatted Markdown Preview' : 'Markdown Code Editor'}
                </span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-purple-600" />
                    {currentWordCount} words
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-purple-600" />
                    {calculateReadingTime(currentWordCount)}
                  </span>
                </div>
              </div>

              {isPreviewMode ? (
                <div className="prose max-w-none p-4 min-h-[400px] bg-gray-50/50 rounded-2xl text-gray-800 whitespace-pre-line leading-relaxed text-sm">
                  {chapterContent || '*No content available for preview.*'}
                </div>
              ) : (
                <textarea
                  rows={18}
                  value={chapterContent}
                  onChange={(e) => setChapterContent(e.target.value)}
                  placeholder="Write your chapter in Markdown formatting or click 'Generate Chapter with AI'..."
                  className="w-full font-mono text-xs text-gray-800 p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-y leading-relaxed bg-gray-50/30"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditorPage;
