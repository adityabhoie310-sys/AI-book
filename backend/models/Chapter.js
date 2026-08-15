import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 1,
    },
    wordCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

chapterSchema.pre('save', function (next) {
  if (this.content) {
    const words = this.content.trim().split(/\s+/).filter(Boolean);
    this.wordCount = words.length;
  } else {
    this.wordCount = 0;
  }
  next();
});

export default mongoose.model('Chapter', chapterSchema);
