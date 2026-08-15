import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    genre: {
      type: String,
      default: 'Non-Fiction',
    },
    targetAudience: {
      type: String,
      default: 'General Readers',
    },
    tone: {
      type: String,
      default: 'Engaging & Informative',
    },
    description: {
      type: String,
      default: '',
    },
    coverColor: {
      type: String,
      default: 'from-amber-500 to-orange-600',
    },
    status: {
      type: String,
      enum: ['Draft', 'In Progress', 'Completed'],
      default: 'Draft',
    },
    wordCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Book', bookSchema);
