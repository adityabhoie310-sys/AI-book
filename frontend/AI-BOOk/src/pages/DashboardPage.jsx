import { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import BookCard from '../components/cards/BookCard';
import CreateBookModal from '../components/modals/CreateBookModal';
import { INITIAL_MOCK_BOOKS, BOOK_GENRES } from '../utils/data';
import { Search, BookOpen, FileText, Layers, Plus } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    let isMounted = true;
    const fetchBooks = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.BOOKS);
        if (isMounted) {
          if (res.data && Array.isArray(res.data) && res.data.length > 0) {
            setBooks(res.data);
          } else {
            setBooks(INITIAL_MOCK_BOOKS);
          }
        }
      } catch (err) {
        console.warn('Backend books fetch fallback:', err.message);
        if (isMounted) {
          setBooks(INITIAL_MOCK_BOOKS);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBooks();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleBookCreated = (newBook) => {
    setBooks([newBook, ...books]);
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axiosInstance.delete(API_PATHS.DELETE_BOOK(bookId));
    } catch (err) {
      console.warn('Backend delete book fallback:', err.message);
    }
    setBooks(books.filter((b) => b._id !== bookId));
    toast.success('eBook deleted');
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (book.subtitle && book.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (book.description && book.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesGenre = selectedGenre === 'All' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const totalWords = books.reduce((sum, b) => sum + (b.wordCount || 0), 0);
  const totalChapters = books.reduce(
    (sum, b) => sum + (b.chapters ? b.chapters.length : 1),
    0
  );

  return (
    <DashboardLayout onCreateBookClick={() => setIsModalOpen(true)}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">{books.length}</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total eBooks
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">{totalWords.toLocaleString()}</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Words Generated
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900">{totalChapters}</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Total Chapters
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search eBooks by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50/50"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {['All', ...BOOK_GENRES].map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedGenre === genre
                    ? 'bg-orange-500 text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500 mx-auto" />
            <p className="mt-4 text-xs font-medium text-gray-500">Loading your eBooks...</p>
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} onDelete={handleDeleteBook} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No eBooks Found</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {searchQuery || selectedGenre !== 'All'
                ? 'No eBooks matched your current filters. Try resetting your search.'
                : 'You have not created any eBooks yet. Get started by creating your first AI-generated eBook!'}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-xs rounded-xl shadow-md hover:from-amber-600 hover:to-orange-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              Create New eBook
            </button>
          </div>
        )}
      </div>

      <CreateBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookCreated={handleBookCreated}
      />
    </DashboardLayout>
  );
};

export default DashboardPage;
