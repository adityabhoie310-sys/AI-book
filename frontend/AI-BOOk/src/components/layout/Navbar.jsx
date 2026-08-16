import { Link, useLocation } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Plus, Sparkles } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onCreateBookClick }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signupPage';
  const isLandingPage = location.pathname === '/';

  const scrollToSection = (id) => {
    if (isLandingPage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo matching screenshot 1 */}
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/25 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">
            AI eBook Creator
          </span>
        </Link>

        {/* Center Nav Links on Landing Page */}
        {isLandingPage && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-purple-600 transition-colors cursor-pointer py-1"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="hover:text-purple-600 transition-colors cursor-pointer py-1"
            >
              Testimonials
            </button>
          </nav>
        )}

        {/* Right Action Buttons */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className={`hidden sm:flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
                  location.pathname === '/dashboard'
                    ? 'bg-purple-50 text-purple-700 font-bold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>

              {onCreateBookClick && (
                <Button
                  variant="primary"
                  size="sm"
                  icon={Plus}
                  onClick={onCreateBookClick}
                  className="shadow-sm"
                >
                  Create eBook
                </Button>
              )}

              <ProfileDropdown />
            </>
          ) : (
            !isAuthPage && (
              <div className="flex items-center gap-3 sm:gap-4">
                <Link to="/login">
                  <button className="text-sm font-semibold text-gray-700 hover:text-purple-600 px-3 py-2 transition-colors cursor-pointer">
                    Login
                  </button>
                </Link>
                <Link to="/signupPage">
                  <Button variant="primary" size="sm" className="font-semibold shadow-purple-500/25">
                    Get Started
                  </Button>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
