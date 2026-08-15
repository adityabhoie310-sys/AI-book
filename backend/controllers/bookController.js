import Book from '../models/Book.js';
import Chapter from '../models/Chapter.js';

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }).sort({ updatedAt: -1 });
    return res.json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user._id });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const chapters = await Chapter.find({ book: book._id }).sort({ order: 1 });
    return res.json({ ...book.toObject(), chapters });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, subtitle, genre, targetAudience, tone, description, outline } = req.body;

    const book = await Book.create({
      user: req.user._id,
      title,
      subtitle,
      genre: genre || 'Non-Fiction',
      targetAudience: targetAudience || 'General Readers',
      tone: tone || 'Engaging',
      description,
    });

    let createdChapters = [];
    if (outline && Array.isArray(outline) && outline.length > 0) {
      const chapterDocs = outline.map((item, index) => ({
        book: book._id,
        title: item.title || `Chapter ${index + 1}`,
        description: item.description || '',
        order: index + 1,
        content: item.content || `## ${item.title || `Chapter ${index + 1}`}\n\n*Click "Generate Content with AI" to write this chapter.*`,
      }));
      createdChapters = await Chapter.insertMany(chapterDocs);
    } else {
      const defaultChapter = await Chapter.create({
        book: book._id,
        title: 'Chapter 1: Introduction',
        description: 'Setting the foundation of the book.',
        order: 1,
        content: '# Chapter 1: Introduction\n\nWelcome to your new eBook!',
      });
      createdChapters.push(defaultChapter);
    }

    // Update book total word count
    const totalWords = createdChapters.reduce((acc, c) => acc + (c.wordCount || 0), 0);
    book.wordCount = totalWords;
    await book.save();

    return res.status(201).json({ ...book.toObject(), chapters: createdChapters });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user._id });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    Object.assign(book, req.body);
    await book.save();
    return res.json(book);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await Chapter.deleteMany({ book: book._id });
    return res.json({ message: 'Book and chapters deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createChapter = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.bookId, user: req.user._id });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const count = await Chapter.countDocuments({ book: book._id });
    const chapter = await Chapter.create({
      book: book._id,
      title: req.body.title || `Chapter ${count + 1}`,
      description: req.body.description || '',
      content: req.body.content || '',
      order: count + 1,
    });

    return res.status(201).json(chapter);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    if (req.body.title !== undefined) chapter.title = req.body.title;
    if (req.body.description !== undefined) chapter.description = req.body.description;
    if (req.body.content !== undefined) chapter.content = req.body.content;
    if (req.body.order !== undefined) chapter.order = req.body.order;

    await chapter.save();

    // Recalculate book total word count
    const chapters = await Chapter.find({ book: chapter.book });
    const totalWords = chapters.reduce((sum, ch) => sum + (ch.wordCount || 0), 0);
    await Book.findByIdAndUpdate(chapter.book, { wordCount: totalWords });

    return res.json(chapter);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndDelete(req.params.chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    // Recalculate book total word count
    const chapters = await Chapter.find({ book: chapter.book });
    const totalWords = chapters.reduce((sum, ch) => sum + (ch.wordCount || 0), 0);
    await Book.findByIdAndUpdate(chapter.book, { wordCount: totalWords });

    return res.json({ message: 'Chapter deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
