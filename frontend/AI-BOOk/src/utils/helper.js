export const calculateWordCount = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
};

export const calculateReadingTime = (wordCount) => {
  const wordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes === 0 ? '1 min' : `${minutes} min`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const exportAsFile = (filename, content, mimeType = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const GENRE_COLOR_MAP = {
  'Non-Fiction': 'from-amber-500 to-orange-600',
  'Fiction & Sci-Fi': 'from-purple-600 to-indigo-600',
  'Business & Tech': 'from-blue-600 to-cyan-600',
  'Self-Help & Growth': 'from-emerald-500 to-teal-700',
  'Education & Guide': 'from-rose-500 to-pink-600',
};
