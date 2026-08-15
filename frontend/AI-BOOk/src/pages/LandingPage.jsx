import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, Wand2, Download, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Navbar from '../components/layout/Navbar';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/40 via-white to-gray-50 font-display text-gray-900 antialiased flex flex-col">
      <Navbar />

      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100/80 text-orange-700 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-6 shadow-2xs">
            <Sparkles className="w-4 h-4 text-orange-500" />
            Powered by Google Gemini AI
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Write & Publish <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 bg-clip-text text-transparent">Complete eBooks</span> in Minutes
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Turn your ideas, outlines, or outlines into professionally formatted, high-quality eBooks with intelligent AI chapter generation and rich studio editing.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signupPage">
              <Button variant="primary" size="lg" icon={Sparkles} className="w-full sm:w-auto text-base">
                Start Writing Free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" icon={ArrowRight} className="w-full sm:w-auto text-base">
                Explore Studio Demo
              </Button>
            </Link>
          </div>

          <div className="mt-14 max-w-5xl mx-auto bg-white rounded-3xl border border-gray-200/80 shadow-2xl p-4 sm:p-6 text-left relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-gray-400 ml-2">AIBookStudio_Editor.v2</span>
              </div>
              <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-orange-100">
                Gemini 1.5 Flash Connected
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Chapters Outline</div>
                <div className="p-3 bg-white rounded-xl shadow-2xs border border-orange-200 text-xs font-semibold text-orange-600 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-orange-500 text-white font-bold flex items-center justify-center text-[10px]">1</span>
                  Introduction to AI Architecture
                </div>
                <div className="p-3 bg-white/60 rounded-xl text-xs font-medium text-gray-600 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-gray-200 text-gray-700 font-bold flex items-center justify-center text-[10px]">2</span>
                  Designing Multi-Agent Networks
                </div>
                <div className="p-3 bg-white/60 rounded-xl text-xs font-medium text-gray-600 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-gray-200 text-gray-700 font-bold flex items-center justify-center text-[10px]">3</span>
                  Scaling RAG Pipelines
                </div>
              </div>

              <div className="md:col-span-2 bg-gray-900 text-gray-100 rounded-2xl p-6 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between text-gray-400 border-b border-gray-800 pb-2">
                  <span># Chapter 1: Introduction to AI Architecture</span>
                  <span className="text-emerald-400 font-sans text-[10px]">AI Generated (1,450 words)</span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  The rapid evolution of Large Language Models (LLMs) has fundamentally transformed software development. Computer systems are no longer passive execution engines...
                </p>
                <div className="bg-gray-800/80 p-3 rounded-xl border border-gray-700 text-orange-400 flex items-center justify-between">
                  <span>✨ AI Action: Expand with practical case studies</span>
                  <span className="bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded text-[10px]">Running</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Everything You Need to Author Bestselling eBooks
            </h2>
            <p className="mt-3 text-base text-gray-600">
              From initial prompt outline generation to full-length chapters and reader formatting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100 space-y-3 hover:border-orange-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                <Wand2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">AI Outline Architect</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Generate structured, multi-chapter eBook outlines tailored to your specified genre, tone, and target audience in seconds.
              </p>
            </div>

            <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100 space-y-3 hover:border-orange-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Chapter Content Studio</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Write comprehensive 1,500+ word Markdown chapters with inline AI writing controls (Expand, Summarize, Rewrite, Fix Grammar).
              </p>
            </div>

            <div className="bg-gray-50/80 p-6 rounded-2xl border border-gray-100 space-y-3 hover:border-orange-200 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Instant Reader & Export</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Preview your eBook in clean light, sepia, or dark reading modes. Export instantly as formatted TXT or PDF documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t border-gray-100 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500">
          © 2026 AIBookStudio. All rights reserved. Powered by Google Gemini AI & MERN Stack.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
