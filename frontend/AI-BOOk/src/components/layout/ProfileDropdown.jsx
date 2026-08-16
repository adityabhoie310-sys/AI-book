import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Dropdown from '../ui/Dropdown';
import { User, Key, LogOut, BookOpen } from 'lucide-react';

const ProfileDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'AD';

  const menuItems = [
    {
      label: 'My eBooks',
      icon: BookOpen,
      onClick: () => navigate('/dashboard'),
    },
    {
      label: 'Profile & Settings',
      icon: User,
      onClick: () => navigate('/profile'),
    },
    {
      label: 'Gemini API Key',
      icon: Key,
      onClick: () => navigate('/profile'),
    },
    {
      label: 'Logout',
      icon: LogOut,
      danger: true,
      onClick: () => {
        logout();
        navigate('/login');
      },
    },
  ];

  const trigger = (
    <button className="flex items-center gap-3 p-1.5 rounded-full hover:bg-purple-50 transition-colors focus:outline-none cursor-pointer">
      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-semibold text-xs flex items-center justify-center shadow-md shadow-purple-500/20 ring-2 ring-white">
        {initials}
      </div>
      <div className="hidden md:block text-left pr-1">
        <div className="text-xs font-semibold text-gray-800 leading-tight">{user.name || 'Alex Doe'}</div>
        <div className="text-[10px] text-gray-500 leading-tight">{user.email || 'alex@metaprogram.com'}</div>
      </div>
    </button>
  );

  return <Dropdown trigger={trigger} items={menuItems} align="right" />;
};

export default ProfileDropdown;
