import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ViewBook from '../components/view/viewBook';
import { INITIAL_MOCK_BOOKS } from '../utils/data';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

const ViewBookPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchBook = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.BOOK_BY_ID(bookId));
        if (isMounted && res.data) {
          setBook(res.data);
        }
      } catch (err) {
        console.warn('Backend view book fallback:', err.message);
        if (isMounted) {
          const found = INITIAL_MOCK_BOOKS.find((b) => b._id === bookId) || INITIAL_MOCK_BOOKS[0];
          setBook(found);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBook();
    return () => {
      isMounted = false;
    };
  }, [bookId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="py-20 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500 mx-auto" />
          <p className="mt-4 text-xs font-medium text-gray-500">Loading eBook Reader...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!book) {
    return (
      <DashboardLayout>
        <div className="py-20 text-center">
          <h2 className="text-xl font-bold text-gray-900">Book Not Found</h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ViewBook book={book} />
    </DashboardLayout>
  );
};

export default ViewBookPage;
