export const BASE_URL = 'http://localhost:5000/api/v1';

export const API_PATHS = {
  // Auth
  REGISTER: `${BASE_URL}/auth/register`,
  LOGIN: `${BASE_URL}/auth/login`,
  PROFILE: `${BASE_URL}/auth/profile`,
  UPDATE_PROFILE: `${BASE_URL}/auth/profile`,

  // Books
  BOOKS: `${BASE_URL}/books`,
  BOOK_BY_ID: (id) => `${BASE_URL}/books/${id}`,
  CREATE_BOOK: `${BASE_URL}/books`,
  UPDATE_BOOK: (id) => `${BASE_URL}/books/${id}`,
  DELETE_BOOK: (id) => `${BASE_URL}/books/${id}`,

  // Chapters
  CREATE_CHAPTER: (bookId) => `${BASE_URL}/books/${bookId}/chapters`,
  UPDATE_CHAPTER: (chapterId) => `${BASE_URL}/books/chapters/${chapterId}`,
  DELETE_CHAPTER: (chapterId) => `${BASE_URL}/books/chapters/${chapterId}`,

  // AI Generation
  GENERATE_OUTLINE: `${BASE_URL}/ai/generate-outline`,
  GENERATE_CHAPTER: `${BASE_URL}/ai/generate-chapter`,
  ASSISTANT_ACTION: `${BASE_URL}/ai/assistant-action`,
};
