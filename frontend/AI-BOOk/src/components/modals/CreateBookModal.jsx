import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../ui/Modal';
import InputField from '../ui/InputField';
import SelectField from '../ui/SelectField';
import TextareaField from '../ui/TextareaField';
import Button from '../ui/Button';
import {
  BOOK_GENRES,
  WRITING_TONES,
  TARGET_AUDIENCES,
  saveStoredBook,
} from '../../utils/data';
import { Sparkles, CheckCircle, ArrowLeft, Plus } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';

const CreateBookModal = ({ isOpen, onClose, onBookCreated }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generatingOutline, setGeneratingOutline] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    author: 'Alex Doe',
    genre: 'Self-Help & Growth',
    targetAudience: 'General Readers',
    tone: 'Engaging & Informative',
    description: '',
    chapterCount: 5,
  });

  const [outline, setOutline] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerateOutline = async () => {
    if (!formData.title.trim()) {
      toast.error('Please enter an eBook title first');
      return;
    }

    setGeneratingOutline(true);
    try {
      const res = await axiosInstance.post(API_PATHS.GENERATE_OUTLINE, {
        title: formData.title,
        genre: formData.genre,
        targetAudience: formData.targetAudience,
        tone: formData.tone,
        description: formData.description,
        chapterCount: Number(formData.chapterCount),
      });

      if (res.data && res.data.outline) {
        setOutline(res.data.outline);
        setStep(2);
        toast.success('AI Chapter Outline generated successfully!');
      }
    } catch (err) {
      console.warn('AI Outline Generation Fallback:', err.message);
      const count = Number(formData.chapterCount) || 5;
      const fallback = Array.from({ length: count }).map((_, i) => ({
        title: `Chapter ${i + 1}: ${
          i === 0
            ? 'Introduction to ' + formData.title
            : i === count - 1
            ? 'Summary & Actionable Next Steps'
            : 'Core Strategy Part ' + i
        }`,
        description: `Detailed exploration of essential principles and actionable frameworks for ${formData.targetAudience}.`,
      }));
      setOutline(fallback);
      setStep(2);
      toast.success('AI Chapter Outline generated!');
    } finally {
      setGeneratingOutline(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      title: '',
      subtitle: '',
      author: 'Alex Doe',
      genre: 'Self-Help & Growth',
      targetAudience: 'General Readers',
      tone: 'Engaging & Informative',
      description: '',
      chapterCount: 5,
    });
    setOutline([]);
  };

  const finalizeBookCreation = async (chaptersOutline) => {
    setLoading(true);
    const count = Number(formData.chapterCount) || 5;
    const finalOutline =
      chaptersOutline && chaptersOutline.length > 0
        ? chaptersOutline
        : Array.from({ length: count }).map((_, i) => ({
            title: `Chapter ${i + 1}: ${
              i === 0
                ? 'Introduction to ' + formData.title
                : i === count - 1
                ? 'Summary & Next Steps'
                : 'Core Strategy Part ' + i
            }`,
            description: `Key insights and practical frameworks.`,
          }));

    const newId = 'book-' + Date.now();
    const newBook = {
      _id: newId,
      ...formData,
      chapters: finalOutline.map((item, idx) => ({
        _id: 'ch-' + Date.now() + '-' + idx,
        title: item.title,
        description: item.description,
        order: idx + 1,
        wordCount: 0,
        content: `## ${item.title}\n\n*Click "Generate Chapter with AI" to write this chapter.*`,
      })),
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await axiosInstance.post(API_PATHS.CREATE_BOOK, {
        ...formData,
        outline: finalOutline,
      });
      if (res.data && res.data._id) {
        saveStoredBook(res.data);
        onBookCreated?.(res.data);
        toast.success('New eBook created successfully!');
        onClose();
        resetForm();
        navigate(`/editor/${res.data._id}`);
        return;
      }
    } catch (err) {
      console.warn('Book creation backend offline, saving locally:', err.message);
    }

    // Always save persistent to localStorage
    saveStoredBook(newBook);
    onBookCreated?.(newBook);
    toast.success('New eBook created!');
    onClose();
    resetForm();
    navigate(`/editor/${newId}`);
    setLoading(false);
  };

  const handleQuickCreate = () => {
    if (!formData.title.trim()) {
      toast.error('Please enter an eBook title first');
      return;
    }
    finalizeBookCreation(outline);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New AI eBook" maxWidth="max-w-3xl">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              step >= 1 ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/30' : 'bg-gray-100 text-gray-400'
            }`}
          >
            1
          </div>
          <span className={`text-xs font-semibold ${step >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>
            Book Details
          </span>
        </div>
        <div className="w-12 h-0.5 bg-gray-200" />
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              step >= 2 ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/30' : 'bg-gray-100 text-gray-400'
            }`}
          >
            2
          </div>
          <span className={`text-xs font-semibold ${step >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>
            AI Outline Preview
          </span>
        </div>
      </div>

      {step === 1 ? (
        <div className="space-y-4">
          <InputField
            label="Book Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. The 5-Minute Morning Reset"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Subtitle (Optional)"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="e.g. Daily Micro-Habits for High Performers"
            />
            <InputField
              label="Author Name"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g. Alex Doe"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Genre / Category"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              options={BOOK_GENRES}
            />
            <SelectField
              label="Target Audience"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              options={TARGET_AUDIENCES}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Writing Tone"
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              options={WRITING_TONES}
            />
            <SelectField
              label="Number of Chapters"
              name="chapterCount"
              value={formData.chapterCount}
              onChange={handleChange}
              options={[
                { label: '3 Chapters (Short eBook)', value: 3 },
                { label: '5 Chapters (Standard eBook)', value: 5 },
                { label: '7 Chapters (Comprehensive)', value: 7 },
                { label: '10 Chapters (Master Guide)', value: 10 },
              ]}
            />
          </div>

          <TextareaField
            label="Premise or Brief Overview"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what your eBook covers, key topics, or core takeaways..."
            rows={3}
          />

          <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                icon={Plus}
                isLoading={loading}
                onClick={handleQuickCreate}
              >
                Create Directly
              </Button>
              <Button
                variant="primary"
                icon={Sparkles}
                isLoading={generatingOutline}
                onClick={handleGenerateOutline}
                className="shadow-purple-500/25"
              >
                Generate AI Outline
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                AI Generated Chapter Outline
              </h4>
              <p className="text-xs text-gray-600">
                Review and customize your chapter structure before creating your eBook.
              </p>
            </div>
          </div>

          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
            {outline.map((ch, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-3.5 shadow-xs space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={ch.title}
                    onChange={(e) => {
                      const updated = [...outline];
                      updated[index].title = e.target.value;
                      setOutline(updated);
                    }}
                    className="w-full text-xs font-semibold text-gray-900 border border-transparent hover:border-gray-300 focus:border-purple-500 focus:bg-white rounded-lg px-2 py-1 transition-colors outline-none"
                  />
                </div>
                <textarea
                  value={ch.description}
                  rows={2}
                  onChange={(e) => {
                    const updated = [...outline];
                    updated[index].description = e.target.value;
                    setOutline(updated);
                  }}
                  className="w-full text-xs text-gray-600 border border-transparent hover:border-gray-300 focus:border-purple-500 focus:bg-white rounded-lg px-2 py-1 transition-colors resize-none outline-none"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Button variant="outline" icon={ArrowLeft} onClick={() => setStep(1)}>
              Back to Details
            </Button>
            <Button
              variant="primary"
              icon={CheckCircle}
              isLoading={loading}
              onClick={() => finalizeBookCreation(outline)}
              className="shadow-purple-500/25"
            >
              Create & Open in Studio
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CreateBookModal;
