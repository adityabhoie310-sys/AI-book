import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  Lightbulb,
  Download,
  Library,
  Star,
  Zap,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Navbar from '../components/layout/Navbar';
import DemoModal from '../components/modals/DemoModal';
import CreateBookModal from '../components/modals/CreateBookModal';
import { useAuth } from '../context/AuthContext';

// Social SVG Icons
const TwitterIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LandingPage = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleStartCreating = () => {
    if (isAuthenticated) {
      setIsCreateModalOpen(true);
    } else {
      navigate('/signupPage');
    }
  };

  const handleBookCreated = (newBook) => {
    setIsCreateModalOpen(false);
    navigate(`/editor/${newBook._id}`);
  };

  return (
    <div className="min-h-screen bg-white font-display text-gray-900 antialiased flex flex-col selection:bg-purple-100 selection:text-purple-900">
      {/* Header / Navbar */}
      <Navbar onCreateBookClick={() => setIsCreateModalOpen(true)} />

      {/* Hero Section (Screenshot 1) */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-purple-50/30 via-white to-purple-50/20">
        {/* Soft Translucent Ambient Glowing Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] bg-indigo-300/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[45rem] h-[25rem] bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-7 text-left">
              {/* Badge: AI-Powered Publishing */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-purple-100 shadow-sm text-xs font-semibold text-purple-700">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>AI-Powered Publishing</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold text-gray-900 tracking-tight leading-[1.08]">
                Create Stunning <br />
                <span className="text-purple-600 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Ebooks in Minutes
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-gray-600 max-w-xl font-normal leading-relaxed">
                From idea to published ebook, our AI-powered platform helps you write, design, and export professional-quality books effortlessly.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={handleStartCreating}
                  className="shadow-lg shadow-purple-500/30 text-sm sm:text-base font-semibold px-7 py-3.5 rounded-full"
                >
                  Start Creating for Free
                </Button>

                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-5 py-3 text-sm sm:text-base font-semibold text-gray-800 hover:text-purple-600 transition-colors cursor-pointer group"
                >
                  Watch Demo
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* 3 Metric Social Proof Stats (Bottom Left) */}
              <div className="pt-8 border-t border-gray-100 grid grid-cols-3 gap-6 sm:gap-8 max-w-md">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">50K+</div>
                  <div className="text-xs text-gray-500 font-medium mt-0.5">Books Created</div>
                </div>
                <div className="border-l border-gray-100 pl-6 sm:pl-8">
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">4.9/5</div>
                  <div className="text-xs text-gray-500 font-medium mt-0.5">User Rating</div>
                </div>
                <div className="border-l border-gray-100 pl-6 sm:pl-8">
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">10min</div>
                  <div className="text-xs text-gray-500 font-medium mt-0.5">Avg. Creation</div>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic: Browser Dashboard Mockup matching Screenshot 1 */}
            <div className="lg:col-span-6 relative">
              {/* Background ambient purple circle */}
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />

              {/* Top Floating Badge: Processing AI Generation */}
              <div className="absolute -top-4 -right-2 sm:-right-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-purple-100 flex items-center gap-3 animate-float">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/30">
                  <Zap className="w-5 h-5 fill-white text-white" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Processing</div>
                  <div className="text-xs font-bold text-gray-900">AI Generation</div>
                </div>
              </div>

              {/* Bottom Floating Badge: Completed 247 Pages */}
              <div className="absolute -bottom-4 -left-2 sm:-left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-gray-100 flex items-center gap-3 animate-float-delayed">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Completed</div>
                  <div className="text-xs font-bold text-gray-900">247 Pages</div>
                </div>
              </div>

              {/* Main Browser Mockup Window */}
              <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-purple-500/10">
                {/* Mockup Topbar */}
                <div className="px-5 py-3.5 bg-gray-50/90 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-xs">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-gray-900">AI eBook Creator</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">
                      A
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-[11px] font-bold text-gray-900 leading-none">Alex Doe</div>
                      <div className="text-[9px] text-gray-400">alex@metaprogram.com</div>
                    </div>
                  </div>
                </div>

                {/* Mockup Content Area */}
                <div className="p-5 bg-gray-50/50 space-y-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-900">All eBooks</h3>
                    <p className="text-[11px] text-gray-500">Create, edit, and manage all your AI-generated ebooks.</p>
                  </div>

                  {/* 7 Realistic Book Covers Grid matching Screenshot 1 */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {/* Cover 1: From Chaos to Clarity */}
                    <div className="aspect-[3/4] rounded-xl bg-gradient-to-b from-purple-100 via-indigo-50 to-purple-200 p-2 border border-purple-200/70 shadow-xs flex flex-col justify-between relative overflow-hidden group">
                      <div className="text-[7px] text-purple-600 font-bold uppercase tracking-wider">Alex</div>
                      <div className="my-auto text-center">
                        <div className="font-extrabold text-[9px] text-purple-950 leading-tight">From Chaos to Clarity</div>
                      </div>
                      <div className="w-full h-1 bg-purple-400/40 rounded-full" />
                    </div>

                    {/* Cover 2: The Introvert's Guide to Networking */}
                    <div className="aspect-[3/4] rounded-xl bg-gradient-to-b from-amber-50 via-yellow-100 to-amber-200 p-2 border border-amber-200/70 shadow-xs flex flex-col justify-between relative overflow-hidden">
                      <div className="text-[7px] text-amber-700 font-bold uppercase tracking-wider">Alex</div>
                      <div className="my-auto text-center">
                        <div className="font-extrabold text-[9px] text-amber-950 leading-tight">The Introvert's Guide to Networking</div>
                      </div>
                      <div className="w-full h-1 bg-amber-400/40 rounded-full" />
                    </div>

                    {/* Cover 3: Plant-Based ON A BUDGET */}
                    <div className="aspect-[3/4] rounded-xl bg-gradient-to-b from-emerald-50 via-teal-50 to-emerald-100 p-2 border border-emerald-200/70 shadow-xs flex flex-col justify-between relative overflow-hidden">
                      <div className="text-[7px] text-emerald-700 font-bold uppercase tracking-wider">Alex Doe</div>
                      <div className="my-auto text-center">
                        <div className="font-extrabold text-[9px] text-emerald-950 leading-tight">Plant-Based ON A BUDGET</div>
                      </div>
                      <div className="w-full h-1 bg-emerald-400/40 rounded-full" />
                    </div>

                    {/* Cover 4: THE ART OF DIGITAL MINIMALISM */}
                    <div className="aspect-[3/4] rounded-xl bg-gradient-to-b from-indigo-900 via-purple-950 to-indigo-950 p-2 border border-purple-800 shadow-xs flex flex-col justify-between relative overflow-hidden">
                      <div className="text-[7px] text-purple-300 font-bold uppercase tracking-wider">Alex Doe</div>
                      <div className="my-auto text-center">
                        <div className="font-extrabold text-[9px] text-white leading-tight">THE ART OF DIGITAL MINIMALISM</div>
                      </div>
                      <div className="w-full h-1 bg-purple-400/40 rounded-full" />
                    </div>

                    {/* Cover 5: BLUEPRINT PASSIVE INCOME */}
                    <div className="aspect-[3/4] rounded-xl bg-gradient-to-b from-blue-600 via-indigo-700 to-purple-800 p-2 border border-blue-500 shadow-xs flex flex-col justify-between relative overflow-hidden">
                      <div className="text-[7px] text-blue-200 font-bold uppercase tracking-wider">BLUEPRINT</div>
                      <div className="my-auto text-center">
                        <div className="font-extrabold text-[9px] text-white leading-tight">PASSIVE INCOME</div>
                      </div>
                      <div className="w-full h-1 bg-blue-300/40 rounded-full" />
                    </div>

                    {/* Cover 6: The 5-Minute Morning Reset */}
                    <div className="aspect-[3/4] rounded-xl bg-gradient-to-b from-slate-700 via-cyan-800 to-blue-900 p-2 border border-cyan-700 shadow-xs flex flex-col justify-between relative overflow-hidden">
                      <div className="text-[7px] text-cyan-200 font-bold uppercase tracking-wider">Alex Doe</div>
                      <div className="my-auto text-center">
                        <div className="font-serif italic font-bold text-[9px] text-white leading-tight">The 5-Minute Morning Reset</div>
                      </div>
                      <div className="w-full h-1 bg-cyan-400/40 rounded-full" />
                    </div>

                    {/* Cover 7: 30 Day Productivity */}
                    <div className="aspect-[3/4] rounded-xl bg-gradient-to-b from-amber-400 via-orange-500 to-yellow-500 p-2 border border-orange-400 shadow-xs flex flex-col justify-between relative overflow-hidden">
                      <div className="text-[7px] text-yellow-950 font-bold uppercase tracking-wider">Alex Thomas</div>
                      <div className="my-auto text-center">
                        <div className="font-extrabold text-[9px] text-gray-950 leading-tight">30 DAY PRODUCTIVITY</div>
                      </div>
                      <div className="w-full h-1 bg-yellow-300/40 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (Screenshot 2 & Screenshot 3) */}
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            {/* Pill: • Features */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/70 text-purple-700 text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              Features
            </div>

            {/* Section Headline */}
            <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Everything You Need to <br />
              <span className="text-purple-600 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Create Your Ebook
              </span>
            </h2>

            {/* Section Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 font-normal max-w-2xl mx-auto leading-relaxed">
              Our platform is packed with powerful features to help you write, design, and publish your ebook effortlessly.
            </p>
          </div>

          {/* 4 Feature Cards Grid (Screenshot 3) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: AI-Powered Writing */}
            <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/30 group-hover:scale-105 transition-transform">
                  <Lightbulb className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">AI-Powered Writing</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  Overcome writer's block with our smart assistant that helps you generate ideas, outlines, and content.
                </p>
              </div>
            </div>

            {/* Card 2: Immersive Reader */}
            <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Immersive Reader</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  Preview your ebook in a clean, read-only format. Adjust font sizes for a comfortable reading experience before you export.
                </p>
              </div>
            </div>

            {/* Card 3: One-Click Export */}
            <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                  <Download className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">One-Click Export</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  Export your ebook to PDF, and DOCX formats instantly, ready for publishing.
                </p>
              </div>
            </div>

            {/* Card 4: eBook Management */}
            <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center shadow-md shadow-pink-500/30 group-hover:scale-105 transition-transform">
                  <Library className="w-6 h-6 stroke-[2.2]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">eBook Management</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  Organize all your ebook projects in a personal dashboard. Easily track progress, edit drafts, and manage your library.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Below Feature Cards */}
          <div className="mt-16 text-center space-y-4">
            <div className="text-sm font-semibold text-gray-700">Ready to get started?</div>
            <div>
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                onClick={handleStartCreating}
                className="shadow-lg shadow-purple-500/30 px-8 py-3.5 rounded-full"
              >
                Start Creating Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Screenshot 4 & 5) */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-purple-50/40 via-purple-50/20 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 3 Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative pt-10 flex flex-col justify-between hover:shadow-xl hover:border-purple-200 transition-all">
              {/* Floating Quote Badge */}
              <div className="absolute -top-4 left-6 w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-serif text-lg font-bold shadow-md shadow-purple-500/30">
                ”
              </div>

              <div className="space-y-4">
                {/* 5 Purple Stars */}
                <div className="flex items-center gap-1 text-purple-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-purple-600 text-purple-600" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                  "This platform made it so easy to write and publish my first ebook. The AI assistant is a game-changer!"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-4 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-sm overflow-hidden">
                  <span className="font-bold">JD</span>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-gray-900">Jane Doe</div>
                  <div className="text-[11px] text-gray-500">Bestselling Author</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative pt-10 flex flex-col justify-between hover:shadow-xl hover:border-purple-200 transition-all">
              {/* Floating Quote Badge */}
              <div className="absolute -top-4 left-6 w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-serif text-lg font-bold shadow-md shadow-purple-500/30">
                ”
              </div>

              <div className="space-y-4">
                {/* 5 Purple Stars */}
                <div className="flex items-center gap-1 text-purple-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-purple-600 text-purple-600" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                  "I love the customizable templates. I was able to create a beautiful ebook that matches my brand perfectly."
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-4 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm overflow-hidden">
                  <span className="font-bold">JS</span>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-gray-900">John Smith</div>
                  <div className="text-[11px] text-gray-500">Marketing Expert</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative pt-10 flex flex-col justify-between hover:shadow-xl hover:border-purple-200 transition-all">
              {/* Floating Quote Badge */}
              <div className="absolute -top-4 left-6 w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-serif text-lg font-bold shadow-md shadow-purple-500/30">
                ”
              </div>

              <div className="space-y-4">
                {/* 5 Purple Stars */}
                <div className="flex items-center gap-1 text-purple-600">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-purple-600 text-purple-600" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                  "The one-click export feature saved me so much time. I was able to publish my ebook on multiple platforms in minutes."
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-4 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm overflow-hidden">
                  <span className="font-bold">PJ</span>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-gray-900">Peter Jones</div>
                  <div className="text-[11px] text-gray-500">Indie Publisher</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Row (Screenshot 4 & 5) */}
          <div className="mt-20 pt-10 border-t border-purple-100/80 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">50K+</div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Happy Creators</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">4.9/5</div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">100K+</div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Ebooks Created</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Footer Section (Screenshot 5) */}
      <footer className="bg-[#090A15] text-gray-400 pt-16 pb-12 border-t border-gray-900 relative overflow-hidden">
        {/* Subtle purple bottom glow */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[40rem] h-40 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-gray-800/80">
            {/* Brand Block */}
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl text-white tracking-tight">
                  eBook Creator
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
                Create, design, and publish stunning ebooks with the power of AI.
              </p>

              {/* Social Icons matching Screenshot 5 */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-purple-500/50 hover:bg-gray-800 transition-colors flex items-center justify-center"
                >
                  <TwitterIcon />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-purple-500/50 hover:bg-gray-800 transition-colors flex items-center justify-center"
                >
                  <LinkedinIcon />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-purple-500/50 hover:bg-gray-800 transition-colors flex items-center justify-center"
                >
                  <GithubIcon />
                </a>
              </div>
            </div>

            {/* Navigation Columns */}
            <div className="md:col-span-7 grid grid-cols-3 gap-8">
              {/* Product */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product</h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                  </li>
                  <li>
                    <a href="#features" className="hover:text-white transition-colors">Pricing</a>
                  </li>
                  <li>
                    <a href="#features" className="hover:text-white transition-colors">Templates</a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <a href="#testimonials" className="hover:text-white transition-colors">About</a>
                  </li>
                  <li>
                    <a href="#testimonials" className="hover:text-white transition-colors">Contact</a>
                  </li>
                  <li>
                    <a href="#testimonials" className="hover:text-white transition-colors">Blog</a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal</h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
                  </li>
                  <li>
                    <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div>© 2025 eBook Creator. All rights reserved.</div>
            <div className="flex items-center gap-1 text-gray-400">
              Made with <span className="text-purple-400">♥</span> for creators
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Watch Demo Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onStartCreating={handleStartCreating}
      />

      {/* Create eBook Modal */}
      <CreateBookModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onBookCreated={handleBookCreated}
      />
    </div>
  );
};

export default LandingPage;
