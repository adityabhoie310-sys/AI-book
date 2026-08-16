import { useState, useEffect } from 'react';
import { X, Play, Pause, Sparkles, BookOpen, Download, Wand2, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const DemoModal = ({ isOpen, onClose, onStartCreating }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [typedText, setTypedText] = useState('');

  const samplePrompt = 'The 10-Minute Morning Reset: Daily Micro-Habits for High Performers';

  const demoSteps = [
    {
      id: 'outline',
      title: '1. AI Outline Generation',
      badge: 'Step 1: Architecting',
      icon: Wand2,
      subtitle: 'Gemini AI transforms a 1-sentence idea into a structured multi-chapter book roadmap.',
      content: {
        chapters: [
          'Ch 1: The First 300 Seconds - Circadian Biology',
          'Ch 2: Micro-Hydration & Dopamine Anchoring',
          'Ch 3: The 3-Minute Cognitive Primer',
          'Ch 4: Designing Frictionless Morning Triggers',
          'Ch 5: The 30-Day Sustained Reset Protocol',
        ],
      },
    },
    {
      id: 'studio',
      title: '2. Chapter Content Studio',
      badge: 'Step 2: AI Writing & Editing',
      icon: Sparkles,
      subtitle: 'Generate rich 1,500+ word markdown chapters with inline AI writing assistant tools.',
      content: {
        chapterTitle: 'Chapter 1: The First 300 Seconds',
        paragraphs: [
          'How you spend the first five minutes after opening your eyes fundamentally sets your neurochemical trajectory for the entire day.',
          'When natural morning sunlight hits your retinal ganglion cells, it triggers an immediate cascade of cortisol and suppresses melatonin production, instantly boosting mental alertness.',
        ],
      },
    },
    {
      id: 'export',
      title: '3. Immersive Reader & Export',
      badge: 'Step 3: Instant Publishing',
      icon: Download,
      subtitle: 'Preview in customizable reading themes and export in 1-click to PDF, DOCX, or Markdown.',
      content: {
        formats: ['PDF Document (Print Ready)', 'DOCX (Editable Word)', 'Markdown / TXT'],
        pageCount: '142 Pages Ready for Amazon KDP & Web',
      },
    },
  ];

  // Auto-play demo step rotation
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % demoSteps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, demoSteps.length]);

  // Simulate typing effect on active step change
  useEffect(() => {
    if (!isOpen) return;
    setTypedText('');
    let i = 0;
    const fullText = samplePrompt;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 30);
    return () => clearInterval(typing);
  }, [isOpen, activeStep]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-purple-50/70 to-indigo-50/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm shadow-purple-500/30">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base leading-tight">AI eBook Creator Interactive Demo</h3>
              <p className="text-xs text-gray-500">See how easy it is to go from idea to published book</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-xl text-gray-600 hover:text-purple-700 hover:bg-white transition-colors cursor-pointer"
              title={isPlaying ? 'Pause auto-play' : 'Play auto-play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-3 border-b border-gray-100 bg-gray-50/60 p-2 gap-2 text-center text-xs font-semibold">
          {demoSteps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStep(idx);
                  setIsPlaying(false);
                }}
                className={`py-2.5 px-3 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-purple-700 shadow-sm border border-purple-100 font-bold'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-600' : 'text-gray-400'}`} />
                <span className="hidden sm:inline">{step.title}</span>
                <span className="sm:hidden">Step {idx + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body / Interactive Stage */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                {demoSteps[activeStep].badge}
              </span>
              <p className="text-xs text-gray-600">{demoSteps[activeStep].subtitle}</p>
            </div>
            <div className="text-xs text-purple-600 font-bold bg-purple-50 px-3 py-1 rounded-lg border border-purple-100 self-start sm:self-auto">
              ⚡ Gemini 2.5 Active
            </div>
          </div>

          {/* Interactive Screen Preview */}
          <div className="bg-gray-950 text-gray-100 rounded-2xl p-5 border border-gray-800 shadow-inner font-mono text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-gray-500 font-sans ml-2 text-[11px]">AI_Studio_Engine.v2</span>
              </div>
              <span className="text-emerald-400 font-sans text-[11px] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Engine
              </span>
            </div>

            {activeStep === 0 && (
              <div className="space-y-4 font-sans">
                <div className="bg-gray-900/90 p-3.5 rounded-xl border border-gray-800">
                  <div className="text-gray-400 text-[11px] mb-1 font-mono">PROMPT INPUT:</div>
                  <div className="text-white font-medium flex items-center">
                    {typedText}
                    <span className="w-2 h-4 bg-purple-400 inline-block ml-1 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-gray-400 text-[11px] font-mono">GENERATED CHAPTER OUTLINE (5/5 Complete):</div>
                  <div className="grid gap-2">
                    {demoSteps[0].content.chapters.map((ch, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-900/70 p-2.5 rounded-xl border border-purple-900/40 flex items-center justify-between text-xs text-gray-200"
                      >
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-purple-400" />
                          {ch}
                        </span>
                        <span className="text-[10px] text-purple-300 font-mono bg-purple-950/80 px-2 py-0.5 rounded">
                          Ready to Write
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="space-y-4 font-sans">
                <div className="flex items-center justify-between text-purple-300 border-b border-gray-800 pb-2 text-xs">
                  <span className="font-bold">{demoSteps[1].content.chapterTitle}</span>
                  <span className="text-emerald-400 font-mono text-[10px]">1,850 words • Markdown</span>
                </div>

                <div className="space-y-2.5 text-gray-300 text-xs leading-relaxed">
                  {demoSteps[1].content.paragraphs.map((p, idx) => (
                    <p key={idx} className="bg-gray-900/60 p-3 rounded-xl border border-gray-800/80">
                      {p}
                    </p>
                  ))}
                </div>

                <div className="bg-purple-950/50 p-3 rounded-xl border border-purple-700/50 text-purple-200 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    AI Action: Expand with practical habit trackers
                  </span>
                  <span className="bg-purple-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold">
                    Applied ✨
                  </span>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-4 font-sans">
                <div className="text-center py-4 bg-gray-900/80 rounded-xl border border-gray-800">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto mb-2">
                    <Download className="w-6 h-6" />
                  </div>
                  <div className="text-white font-bold text-sm">eBook Export Ready</div>
                  <div className="text-xs text-gray-400 mt-1">{demoSteps[2].content.pageCount}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {demoSteps[2].content.formats.map((fmt, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-900/60 p-3 rounded-xl border border-gray-800 text-center text-xs text-purple-200 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
                      {fmt}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-500 text-center sm:text-left">
            Ready to generate your own multi-chapter eBook?
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" size="sm" onClick={onClose} className="flex-1 sm:flex-initial">
              Close Preview
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => {
                onClose();
                onStartCreating?.();
              }}
              className="flex-1 sm:flex-initial shadow-purple-500/25"
            >
              Start Creating Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;
