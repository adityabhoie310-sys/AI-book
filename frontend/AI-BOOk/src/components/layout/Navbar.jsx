import { Link, useLocation } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Plus, Sparkles } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onCreateBookClick }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signupPage';

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg text-gray-900 tracking-tight flex items-center gap-1">
              AI<span className="text-orange-500">Book</span> Studio
            </span>
            <span className="text-[10px] text-gray-400 block -mt-1 font-medium tracking-wide">
              Gemini Powered Authoring
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className={`hidden sm:flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors ${
                  location.pathname === '/dashboard'
                    ? 'bg-orange-50 text-orange-600'
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
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/signupPage">
                  <Button variant="primary" size="sm" icon={Sparkles}>
                    Get Started Free
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
